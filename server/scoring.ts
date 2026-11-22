import type {
  ListeningSectionData,
  ReadingPassageData,
  ObjectiveQuestionReview,
  TestCategory,
} from '../shared/mockTestTypes.ts';

export function roundToHalfBand(value: number): number {
  const clamped = Math.min(9, Math.max(0, value));
  return Math.round(clamped * 2) / 2;
}

export function calculateOverallBand(moduleBands: number[]): number {
  if (moduleBands.length === 0) return 0;
  const halfUnits = moduleBands.reduce((acc, b) => acc + Math.round(b * 2), 0);
  const count = moduleBands.length;
  // Exact IELTS rounding rule for N modules: average in half-units -> nearest 0.5 (.25 and .75 round up)
  const rawAverage = halfUnits / (count * 2);
  return Math.min(9, Math.max(0, Math.floor(rawAverage * 2 + 0.5) / 2));
}

export function convertListeningRawToBand(correct: number): number {
  if (correct >= 39) return 9.0;
  if (correct >= 37) return 8.5;
  if (correct >= 35) return 8.0;
  if (correct >= 32) return 7.5;
  if (correct >= 30) return 7.0;
  if (correct >= 26) return 6.5;
  if (correct >= 23) return 6.0;
  if (correct >= 18) return 5.5;
  if (correct >= 16) return 5.0;
  if (correct >= 13) return 4.5;
  if (correct >= 10) return 4.0;
  if (correct >= 7) return 3.5;
  if (correct >= 4) return 3.0;
  if (correct >= 1) return 2.5;
  return 0;
}

export function convertReadingRawToBand(correct: number, category: TestCategory): number {
  if (category === 'general') {
    if (correct === 40) return 9.0;
    if (correct === 39) return 8.5;
    if (correct >= 37) return 8.0;
    if (correct >= 36) return 7.5;
    if (correct >= 34) return 7.0;
    if (correct >= 32) return 6.5;
    if (correct >= 30) return 6.0;
    if (correct >= 27) return 5.5;
    if (correct >= 23) return 5.0;
    if (correct >= 19) return 4.5;
    if (correct >= 15) return 4.0;
    if (correct >= 12) return 3.5;
    if (correct >= 9) return 3.0;
    if (correct >= 1) return 2.5;
    return 0;
  }

  // Academic Reading
  if (correct >= 39) return 9.0;
  if (correct >= 37) return 8.5;
  if (correct >= 35) return 8.0;
  if (correct >= 33) return 7.5;
  if (correct >= 30) return 7.0;
  if (correct >= 27) return 6.5;
  if (correct >= 23) return 6.0;
  if (correct >= 19) return 5.5;
  if (correct >= 15) return 5.0;
  if (correct >= 13) return 4.5;
  if (correct >= 10) return 4.0;
  if (correct >= 7) return 3.5;
  if (correct >= 4) return 3.0;
  if (correct >= 1) return 2.5;
  return 0;
}

function normalizeAnswer(val: string): string {
  return val
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/[.,!?;:]+$/, '');
}

export function gradeObjectiveListening(
  sections: ListeningSectionData[],
  userAnswers: Record<string, string>
): {
  correct: number;
  total: number;
  band: number;
  reviews: ObjectiveQuestionReview[];
} {
  const reviews: ObjectiveQuestionReview[] = [];
  let correct = 0;
  let total = 0;

  for (const sec of sections) {
    for (const q of sec.questions) {
      total += 1;
      const rawUser = userAnswers[q.id] ?? '';
      const normUser = normalizeAnswer(rawUser);
      const isCorrect =
        normUser.length > 0 &&
        q.acceptedAnswers.some((ans) => normalizeAnswer(ans) === normUser);

      if (isCorrect) correct += 1;

      reviews.push({
        questionId: q.id,
        number: q.number,
        module: 'listening',
        prompt: q.prompt,
        userAnswer: rawUser.trim() || '(No answer)',
        correctAnswers: q.acceptedAnswers,
        isCorrect,
        explanation: q.explanation,
      });
    }
  }

  // Scale proportionally if custom admin test has fewer/more than 40 questions
  const scaledTo40 = total > 0 ? Math.round((correct / total) * 40) : 0;
  const band = convertListeningRawToBand(scaledTo40);

  return { correct, total, band, reviews };
}

export function gradeObjectiveReading(
  passages: ReadingPassageData[],
  userAnswers: Record<string, string>,
  category: TestCategory
): {
  correct: number;
  total: number;
  band: number;
  reviews: ObjectiveQuestionReview[];
} {
  const reviews: ObjectiveQuestionReview[] = [];
  let correct = 0;
  let total = 0;

  for (const passage of passages) {
    for (const q of passage.questions) {
      total += 1;
      const rawUser = userAnswers[q.id] ?? '';
      const normUser = normalizeAnswer(rawUser);
      const isCorrect =
        normUser.length > 0 &&
        q.acceptedAnswers.some((ans) => normalizeAnswer(ans) === normUser);

      if (isCorrect) correct += 1;

      reviews.push({
        questionId: q.id,
        number: q.number,
        module: 'reading',
        prompt: q.prompt,
        userAnswer: rawUser.trim() || '(No answer)',
        correctAnswers: q.acceptedAnswers,
        isCorrect,
        explanation: q.explanation,
      });
    }
  }

  const scaledTo40 = total > 0 ? Math.round((correct / total) * 40) : 0;
  const band = convertReadingRawToBand(scaledTo40, category);

  return { correct, total, band, reviews };
}
