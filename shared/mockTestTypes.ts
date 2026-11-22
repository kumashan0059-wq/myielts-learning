export type TestCategory = 'academic' | 'general';
export type ModuleType = 'listening' | 'reading' | 'writing' | 'speaking' | 'full';
export type SingleModuleKey = 'listening' | 'reading' | 'writing' | 'speaking';
export type UserRole = 'student' | 'admin';

export type ListeningQuestionType =
  | 'mcq'
  | 'matching'
  | 'form_completion'
  | 'gap_fill'
  | 'flow_chart_completion'
  | 'note_completion';

export type ReadingQuestionType =
  | 'mcq'
  | 'tfng'
  | 'ynng'
  | 'matching_headings'
  | 'matching_information'
  | 'matching_features'
  | 'sentence_completion'
  | 'table_completion'
  | 'summary_completion';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  targetBand: number;
  preferredTrack: TestCategory;
  createdAt: string;
}

export interface KeyedOption {
  key: string;
  text: string;
}

export interface ListeningQuestion {
  id: string;
  number: number; // 1..40
  type: ListeningQuestionType;
  prompt: string;
  contextLabel?: string;
  options?: string[]; // for mcq and matching
  acceptedAnswers: string[]; // case-insensitive accepted strings
  explanation: string;
}

export interface ListeningRichGroup {
  id: string;
  type:
    | 'form_completion'
    | 'multiple_choice'
    | 'matching'
    | 'flow_chart_completion'
    | 'note_completion';
  questionRange: string;
  instructions: string;
  wordLimit?: string;
  formTitle?: string;
  formRows?: Array<{ label: string; value: string }>;
  options?: KeyedOption[];
  flowChart?: Array<{ step: number; text: string }>;
  notesTitle?: string;
  notes?: Array<{ heading: string; items: string[] }>;
  questions: Array<{
    id: string;
    number: number;
    text?: string;
    options?: KeyedOption[];
    acceptedAnswers: string[];
    explanation: string;
  }>;
}

export interface ListeningSectionData {
  id: string;
  sectionNumber: 1 | 2 | 3 | 4;
  title: string;
  questionRange?: string;
  context: string;
  instructions: string;
  hasAudioFile?: boolean; // explicit flag: true if real uploaded/generated file, false if script-only
  audioUrl?: string; // uploaded file URL (/api/audio/:id) or generated TTS URL
  transcript: string; // authentic script used for TTS generation or study
  scriptDialogue?: Array<{ speaker: string; text: string }>;
  durationSeconds: number;
  questions: ListeningQuestion[];
  richGroups?: ListeningRichGroup[];
}

export interface ReadingQuestion {
  id: string;
  number: number; // 1..40
  type: ReadingQuestionType;
  prompt: string;
  options?: string[];
  acceptedAnswers: string[];
  explanation: string;
}

export interface ReadingRichGroup {
  id: string;
  type:
    | 'true_false_not_given'
    | 'yes_no_not_given'
    | 'sentence_completion'
    | 'multiple_choice'
    | 'matching_headings'
    | 'matching_information'
    | 'table_completion'
    | 'matching_features'
    | 'summary_completion';
  questionRange: string;
  instructions: string;
  wordLimit?: string;
  headings?: KeyedOption[];
  paragraphOptions?: string[];
  options?: KeyedOption[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  summaryText?: string;
  questions: Array<{
    id: string;
    number: number;
    paragraph?: string;
    text?: string;
    options?: KeyedOption[];
    acceptedAnswers: string[];
    explanation: string;
  }>;
}

export interface ReadingParagraph {
  label: string; // e.g. "A", "B", "C"
  text: string;
}

export interface ReadingPassageData {
  id: string;
  passageNumber: 1 | 2 | 3;
  title: string;
  subtitle: string;
  note?: string;
  instructions: string;
  paragraphs: ReadingParagraph[];
  headingOptions?: string[]; // shared heading list for matching_headings
  questions: ReadingQuestion[];
  richGroups?: ReadingRichGroup[];
}

export interface WritingChartBar {
  label: string;
  valueA: number;
  valueB?: number;
}

export interface WritingGroupedChartData {
  type: string;
  title: string;
  yAxisLabel: string;
  categories: string[];
  series: Array<{ name: string; values: number[] }>;
  note?: string;
}

export interface WritingTaskData {
  id: string;
  taskNumber: 1 | 2;
  title: string;
  prompt: string;
  instructions: string;
  minWords: number;
  recommendedMinutes: number;
  essayType?: string;
  visualData?: {
    caption: string;
    unit: string;
    seriesALabel: string;
    seriesBLabel?: string;
    bars: WritingChartBar[];
  };
  chartData?: WritingGroupedChartData;
  keyFeatures?: string[];
  modelAnswer?: string;
  suggestedStructure?: string[];
}

export interface WritingEvaluationCriteriaBlock {
  note: string;
  weighting: string;
  criteria: Array<{
    name: string;
    whatExaminersLookFor: string[];
    strongPerformance: string;
    weakPerformance: string;
  }>;
  selfCheckList: string[];
}

export interface SpeakingEvaluationCriteriaBlock {
  note: string;
  criteria: Array<{
    name: string;
    lookFor: string;
  }>;
  selfReviewChecklist: string[];
}

export interface SpeakingCueCard {
  topic: string;
  bullets: string[];
  followUpQuestion: string;
}

export interface SpeakingData {
  durationMinutes?: string;
  format?: string;
  part1: {
    title: string;
    durationMinutes?: string;
    instructions: string;
    introQuestions?: string[];
    topics?: Array<{ topic: string; questions: string[] }>;
    questions: string[];
  };
  part2: {
    title: string;
    durationMinutes?: string;
    instructions: string;
    prepSeconds: number;
    speakSeconds: number;
    cueCard: SpeakingCueCard;
    roundingOffQuestions?: string[];
    tips?: string[];
  };
  part3: {
    title: string;
    durationMinutes?: string;
    instructions: string;
    themes?: Array<{ theme: string; questions: string[] }>;
    questions: string[];
  };
  evaluationCriteria?: SpeakingEvaluationCriteriaBlock;
}

export interface MockTestMetaInfo {
  title?: string;
  label?: string;
  version?: string;
  createdDate?: string;
  originality?: string;
  audioNote?: string;
  approximateBandConversionUnofficial?: {
    note?: string;
    reading?: Record<string, number>;
    listening?: Record<string, number>;
  };
}

export interface MockTestPayload {
  meta?: MockTestMetaInfo;
  listeningSections?: ListeningSectionData[];
  readingPassages?: ReadingPassageData[];
  writingTasks?: WritingTaskData[];
  writingEvaluationCriteria?: WritingEvaluationCriteriaBlock;
  speaking?: SpeakingData;
}

export interface MockTestRecord {
  id: string;
  title: string;
  category: TestCategory;
  moduleType: ModuleType;
  description: string;
  durationMinutes: number;
  questionCount: number;
  isPublished: boolean;
  payload: MockTestPayload;
  createdAt: string;
  updatedAt: string;
}

export interface WritingTaskSubmission {
  text: string;
  wordCount: number;
  savedAt?: string;
}

export interface SpeakingPartSubmission {
  audioId?: string;
  audioUrl?: string;
  durationSeconds?: number;
  mimeType?: string;
  transcriptNotes?: string;
}

export interface AttemptAnswers {
  listening: Record<string, string>; // questionId -> answer string
  reading: Record<string, string>; // questionId -> answer string
  writing: {
    task1?: WritingTaskSubmission;
    task2?: WritingTaskSubmission;
  };
  speaking: {
    part1?: SpeakingPartSubmission;
    part2?: SpeakingPartSubmission;
    part3?: SpeakingPartSubmission;
  };
  flaggedQuestions?: string[];
}

export interface ObjectiveQuestionReview {
  questionId: string;
  number: number;
  module: 'listening' | 'reading';
  prompt: string;
  userAnswer: string;
  correctAnswers: string[];
  isCorrect: boolean;
  explanation: string;
}

export interface WritingEvaluationResult {
  estimatedBand: number;
  task1Band?: number;
  task2Band?: number;
  criteria: {
    taskAchievement: number;
    coherenceCohesion: number;
    lexicalResource: number;
    grammaticalRange: number;
  };
  feedback: string;
  task1Feedback?: string;
  task2Feedback?: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  isEstimated: true;
}

export interface SpeakingEvaluationResult {
  estimatedBand: number;
  criteria: {
    fluencyCoherence: number;
    lexicalResource: number;
    grammaticalRange: number;
    pronunciation: number;
  };
  transcriptSummary: string;
  feedback: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  isEstimated: true;
}

export interface AttemptResults {
  overallBand?: number;
  listeningBand?: number;
  readingBand?: number;
  writingBand?: number;
  speakingBand?: number;
  listeningScore?: { correct: number; total: number };
  readingScore?: { correct: number; total: number };
  questionReviews?: ObjectiveQuestionReview[];
  writingEvaluation?: WritingEvaluationResult;
  speakingEvaluation?: SpeakingEvaluationResult;
  writingEvaluationNotice?: string;
  speakingEvaluationNotice?: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  instructorNote?: string;
  evaluatedAt: string;
  disclaimer: string;
}

export interface TestAttemptRecord {
  id: string;
  userId: string;
  userName?: string;
  userEmail?: string;
  testId: string;
  testTitle?: string;
  category: TestCategory;
  moduleType: ModuleType;
  status: 'in_progress' | 'completed';
  currentStage: SingleModuleKey;
  answers: AttemptAnswers;
  remainingSeconds: Record<SingleModuleKey, number>;
  results?: AttemptResults;
  overallBand?: number;
  listeningBand?: number;
  readingBand?: number;
  writingBand?: number;
  speakingBand?: number;
  startedAt: string;
  completedAt?: string;
  updatedAt: string;
}

export interface AudioAssetRecord {
  id: string;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  kind: 'listening_upload' | 'listening_tts' | 'speaking_recording';
  ownerUserId?: string;
  attemptId?: string;
  partKey?: string;
  url: string;
  createdAt: string;
}
