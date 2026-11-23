import fs from 'node:fs';
import path from 'node:path';
import { db } from './db.ts';
import type {
  ListeningSectionData,
  ListeningRichGroup,
  ListeningQuestion,
  ReadingPassageData,
  ReadingRichGroup,
  ReadingQuestion,
  WritingTaskData,
  SpeakingData,
  MockTestPayload,
  KeyedOption,
} from '../shared/mockTestTypes.ts';

interface RawJsonTest {
  meta: {
    title: string;
    label: string;
    version: string;
    createdDate: string;
    originality: string;
    modules: string[];
    approximateBandConversionUnofficial: {
      note: string;
      reading: Record<string, number>;
      listening: Record<string, number>;
    };
  };
  reading: {
    timeMinutes: number;
    totalQuestions: number;
    passages: Array<{
      id: string;
      title: string;
      questionRange: string;
      note?: string;
      paragraphs: Array<{ label: string; text: string }>;
      questionGroups: Array<{
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
        table?: { headers: string[]; rows: string[][] };
        summaryText?: string;
        questions: Array<{
          number: number;
          paragraph?: string;
          text?: string;
          options?: KeyedOption[];
          answer: string;
          acceptedAnswers?: string[];
          explanation: string;
        }>;
      }>;
    }>;
  };
  listening: {
    timeMinutes: number;
    transferTimeMinutes: number;
    totalQuestions: number;
    audioNote: string;
    sections: Array<{
      id: string;
      title: string;
      questionRange: string;
      context: string;
      script: Array<{ speaker: string; text: string }>;
      questionGroups: Array<{
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
          number: number;
          text?: string;
          options?: KeyedOption[];
          answer: string;
          acceptedAnswers?: string[];
          explanation: string;
        }>;
      }>;
    }>;
  };
  writing: {
    timeMinutes: number;
    task1: {
      id: string;
      timeSuggestedMinutes: number;
      minWords: number;
      prompt: string;
      chartData: {
        type: string;
        title: string;
        yAxisLabel: string;
        categories: string[];
        series: Array<{ name: string; values: number[] }>;
        note?: string;
      };
      keyFeatures: string[];
      modelAnswer: string;
    };
    task2: {
      id: string;
      timeSuggestedMinutes: number;
      minWords: number;
      prompt: string;
      essayType: string;
      suggestedStructure: string[];
    };
    evaluationCriteria: {
      note: string;
      weighting: string;
      criteria: Array<{
        name: string;
        whatExaminersLookFor: string[];
        strongPerformance: string;
        weakPerformance: string;
      }>;
      selfCheckList: string[];
    };
  };
  speaking: {
    durationMinutes: string;
    format: string;
    part1: {
      durationMinutes: string;
      instructions: string;
      introQuestions: string[];
      topics: Array<{ topic: string; questions: string[] }>;
    };
    part2: {
      durationMinutes: string;
      instructions: string;
      cueCard: {
        title: string;
        bulletPoints: string[];
      };
      roundingOffQuestions: string[];
      tips: string[];
    };
    part3: {
      durationMinutes: string;
      instructions: string;
      themes: Array<{ theme: string; questions: string[] }>;
    };
    evaluationCriteria: {
      note: string;
      criteria: Array<{ name: string; lookFor: string }>;
      selfReviewChecklist: string[];
    };
  };
}

export const PRACTICE_MOCK_TEST_1_ID = 'academic-practice-mock-test-1';

function extractSentenceWithToken(text: string, qNum: number): string {
  const token = `{{${qNum}}}`;
  const sentences = text.split(/(?<=[.!?])\s+/);
  const found = sentences.find((s) => s.includes(token));
  return found ? found.trim() : text;
}

function buildListeningPromptLookup(
  grp: RawJsonTest['listening']['sections'][0]['questionGroups'][0],
  qNum: number
): string {
  const token = `{{${qNum}}}`;
  if (grp.formRows) {
    const row = grp.formRows.find((r) => r.value.includes(token));
    if (row) return `${row.label}: ${row.value}`;
  }
  if (grp.flowChart) {
    const step = grp.flowChart.find((s) => s.text.includes(token));
    if (step) return `Step ${step.step}: ${step.text}`;
  }
  if (grp.notes) {
    for (const block of grp.notes) {
      const item = block.items.find((it) => it.includes(token));
      if (item) return `${block.heading} — ${item}`;
    }
  }
  return `Question ${qNum}`;
}

function buildReadingPromptLookup(
  grp: RawJsonTest['reading']['passages'][0]['questionGroups'][0],
  qNum: number
): string {
  const token = `{{${qNum}}}`;
  if (grp.table) {
    const row = grp.table.rows.find((r) => r.some((cell) => cell.includes(token)));
    if (row) return row.join(' — ');
  }
  if (grp.summaryText) {
    return extractSentenceWithToken(grp.summaryText, qNum);
  }
  return `Question ${qNum}`;
}

export function loadAcademicPracticeMockTest1Payload(): {
  title: string;
  description: string;
  durationMinutes: number;
  questionCount: number;
  payload: MockTestPayload;
} {
  const moduleDir =
    typeof import.meta !== 'undefined' && typeof import.meta.url === 'string'
      ? path.dirname(new URL(import.meta.url).pathname)
      : process.cwd();
  const candidatePaths = [
    path.resolve(process.cwd(), 'server/data/academic_practice_mock_test_1.json'),
    path.resolve('/var/task/server/data/academic_practice_mock_test_1.json'),
    path.resolve(moduleDir, 'data/academic_practice_mock_test_1.json'),
    path.resolve(moduleDir, '../../server/data/academic_practice_mock_test_1.json'),
    path.resolve(process.cwd(), 'public/assets/aistudio/Paste_November_22__2026_-_10_45PM_3c4cedb0'),
  ];
  const jsonPath = candidatePaths.find((p) => fs.existsSync(p));
  if (!jsonPath) {
    throw new Error('Could not locate academic_practice_mock_test_1.json in server/data/.');
  }
  const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf8')) as RawJsonTest;

  const listeningSections: ListeningSectionData[] = raw.listening.sections.map((sec, sIdx) => {
    const richGroups: ListeningRichGroup[] = [];
    const flatQuestions: ListeningQuestion[] = [];

    for (const grp of sec.questionGroups) {
      const richQs: ListeningRichGroup['questions'] = [];

      for (const q of grp.questions) {
        const qId = `apmt1-lq${q.number}`;
        const acceptedAnswers = Array.from(
          new Set([...(q.acceptedAnswers ?? []), q.answer].filter(Boolean))
        );

        richQs.push({
          id: qId,
          number: q.number,
          text: q.text,
          options: q.options,
          acceptedAnswers,
          explanation: q.explanation,
        });

        const mappedType: ListeningQuestion['type'] =
          grp.type === 'multiple_choice'
            ? 'mcq'
            : grp.type === 'matching'
            ? 'matching'
            : grp.type === 'form_completion'
            ? 'form_completion'
            : grp.type === 'flow_chart_completion'
            ? 'flow_chart_completion'
            : 'note_completion';

        const promptText = q.text || buildListeningPromptLookup(grp, q.number);
        const flatOpts = (q.options || grp.options)?.map((o) => `${o.key}. ${o.text}`);

        flatQuestions.push({
          id: qId,
          number: q.number,
          type: mappedType,
          prompt: promptText,
          options: flatOpts,
          acceptedAnswers,
          explanation: q.explanation,
        });
      }

      richGroups.push({
        id: grp.id,
        type: grp.type,
        questionRange: grp.questionRange,
        instructions: grp.instructions,
        wordLimit: grp.wordLimit,
        formTitle: grp.formTitle,
        formRows: grp.formRows,
        options: grp.options,
        flowChart: grp.flowChart,
        notesTitle: grp.notesTitle,
        notes: grp.notes,
        questions: richQs,
      });
    }

    const transcript = sec.script.map((line) => `${line.speaker}: ${line.text}`).join('\n');

    return {
      id: `apmt1-${sec.id.toLowerCase()}`,
      sectionNumber: (sIdx + 1) as 1 | 2 | 3 | 4,
      title: sec.title,
      questionRange: sec.questionRange,
      context: sec.context,
      instructions: `Questions ${sec.questionRange}. ${sec.questionGroups[0]?.instructions ?? ''}`,
      hasAudioFile: false,
      transcript,
      scriptDialogue: sec.script,
      durationSeconds: 450,
      questions: flatQuestions,
      richGroups,
    };
  });

  const readingPassages: ReadingPassageData[] = raw.reading.passages.map((pas, pIdx) => {
    const richGroups: ReadingRichGroup[] = [];
    const flatQuestions: ReadingQuestion[] = [];
    let headingList: string[] | undefined;

    for (const grp of pas.questionGroups) {
      const richQs: ReadingRichGroup['questions'] = [];
      if (grp.headings) {
        headingList = grp.headings.map((h) => `${h.key}. ${h.text}`);
      }

      for (const q of grp.questions) {
        const qId = `apmt1-rq${q.number}`;
        const acceptedAnswers = Array.from(
          new Set([...(q.acceptedAnswers ?? []), q.answer].filter(Boolean))
        );

        richQs.push({
          id: qId,
          number: q.number,
          paragraph: q.paragraph,
          text: q.text,
          options: q.options,
          acceptedAnswers,
          explanation: q.explanation,
        });

        const mappedType: ReadingQuestion['type'] =
          grp.type === 'true_false_not_given'
            ? 'tfng'
            : grp.type === 'yes_no_not_given'
            ? 'ynng'
            : grp.type === 'multiple_choice'
            ? 'mcq'
            : grp.type === 'matching_headings'
            ? 'matching_headings'
            : grp.type === 'matching_information'
            ? 'matching_information'
            : grp.type === 'matching_features'
            ? 'matching_features'
            : grp.type === 'table_completion'
            ? 'table_completion'
            : grp.type === 'summary_completion'
            ? 'summary_completion'
            : 'sentence_completion';

        let flatOpts: string[] | undefined;
        if (grp.type === 'true_false_not_given') flatOpts = ['TRUE', 'FALSE', 'NOT GIVEN'];
        else if (grp.type === 'yes_no_not_given') flatOpts = ['YES', 'NO', 'NOT GIVEN'];
        else if (grp.type === 'matching_headings' && grp.headings) {
          flatOpts = grp.headings.map((h) => h.key);
        } else if (grp.type === 'matching_information' && grp.paragraphOptions) {
          flatOpts = grp.paragraphOptions;
        } else if (q.options || grp.options) {
          flatOpts = (q.options || grp.options)?.map((o) => `${o.key}. ${o.text}`);
        }

        flatQuestions.push({
          id: qId,
          number: q.number,
          type: mappedType,
          prompt: q.text || buildReadingPromptLookup(grp, q.number),
          options: flatOpts,
          acceptedAnswers,
          explanation: q.explanation,
        });
      }

      richGroups.push({
        id: grp.id,
        type: grp.type,
        questionRange: grp.questionRange,
        instructions: grp.instructions,
        wordLimit: grp.wordLimit,
        headings: grp.headings,
        paragraphOptions: grp.paragraphOptions,
        options: grp.options,
        table: grp.table,
        summaryText: grp.summaryText,
        questions: richQs,
      });
    }

    return {
      id: `apmt1-${pas.id.toLowerCase()}`,
      passageNumber: (pIdx + 1) as 1 | 2 | 3,
      title: pas.title,
      subtitle: `Reading Passage ${pIdx + 1} · Questions ${pas.questionRange}`,
      note: pas.note,
      instructions: `Questions ${pas.questionRange}`,
      paragraphs: pas.paragraphs,
      headingOptions: headingList,
      questions: flatQuestions,
      richGroups,
    };
  });

  const writingTasks: WritingTaskData[] = [
    {
      id: raw.writing.task1.id,
      taskNumber: 1,
      title: 'Academic Writing Task 1',
      instructions: `You should spend about ${raw.writing.task1.timeSuggestedMinutes} minutes on this task. Write at least ${raw.writing.task1.minWords} words.`,
      prompt: raw.writing.task1.prompt,
      minWords: raw.writing.task1.minWords,
      recommendedMinutes: raw.writing.task1.timeSuggestedMinutes,
      chartData: raw.writing.task1.chartData,
      keyFeatures: raw.writing.task1.keyFeatures,
      modelAnswer: raw.writing.task1.modelAnswer,
    },
    {
      id: raw.writing.task2.id,
      taskNumber: 2,
      title: 'Writing Task 2',
      instructions: `You should spend about ${raw.writing.task2.timeSuggestedMinutes} minutes on this task. Write at least ${raw.writing.task2.minWords} words.`,
      prompt: raw.writing.task2.prompt,
      minWords: raw.writing.task2.minWords,
      recommendedMinutes: raw.writing.task2.timeSuggestedMinutes,
      essayType: raw.writing.task2.essayType,
      suggestedStructure: raw.writing.task2.suggestedStructure,
    },
  ];

  const part1FlatQuestions = [
    ...raw.speaking.part1.introQuestions,
    ...raw.speaking.part1.topics.flatMap((t) => t.questions),
  ];

  const part3FlatQuestions = raw.speaking.part3.themes.flatMap((th) => th.questions);

  const speaking: SpeakingData = {
    durationMinutes: raw.speaking.durationMinutes,
    format: raw.speaking.format,
    part1: {
      title: `Part 1: Introduction and Interview (${raw.speaking.part1.durationMinutes} Minutes)`,
      durationMinutes: raw.speaking.part1.durationMinutes,
      instructions: raw.speaking.part1.instructions,
      introQuestions: raw.speaking.part1.introQuestions,
      topics: raw.speaking.part1.topics,
      questions: part1FlatQuestions,
    },
    part2: {
      title: `Part 2: Individual Long Turn / Cue Card (${raw.speaking.part2.durationMinutes} Minutes)`,
      durationMinutes: raw.speaking.part2.durationMinutes,
      instructions: raw.speaking.part2.instructions,
      prepSeconds: 60,
      speakSeconds: 120,
      cueCard: {
        topic: raw.speaking.part2.cueCard.title,
        bullets: raw.speaking.part2.cueCard.bulletPoints,
        followUpQuestion: raw.speaking.part2.roundingOffQuestions[0] || '',
      },
      roundingOffQuestions: raw.speaking.part2.roundingOffQuestions,
      tips: raw.speaking.part2.tips,
    },
    part3: {
      title: `Part 3: Two-Way Discussion (${raw.speaking.part3.durationMinutes} Minutes)`,
      durationMinutes: raw.speaking.part3.durationMinutes,
      instructions: raw.speaking.part3.instructions,
      themes: raw.speaking.part3.themes,
      questions: part3FlatQuestions,
    },
    evaluationCriteria: raw.speaking.evaluationCriteria,
  };

  const payload: MockTestPayload = {
    meta: {
      title: raw.meta.title,
      label: raw.meta.label,
      version: raw.meta.version,
      createdDate: raw.meta.createdDate,
      originality: raw.meta.originality,
      audioNote: raw.listening.audioNote,
      approximateBandConversionUnofficial: raw.meta.approximateBandConversionUnofficial,
    },
    listeningSections,
    readingPassages,
    writingTasks,
    writingEvaluationCriteria: raw.writing.evaluationCriteria,
    speaking,
  };

  return {
    title: raw.meta.title,
    description:
      'Complete 4-module Academic IELTS practice test (Listening 40 Qs, Reading 40 Qs, Writing Tasks 1 & 2, Speaking Parts 1–3) with original passages, scripts, answer keys, model answers, and evaluation criteria.',
    durationMinutes:
      raw.listening.timeMinutes + raw.reading.timeMinutes + raw.writing.timeMinutes + 14,
    questionCount:
      raw.listening.totalQuestions + raw.reading.totalQuestions + 2 + 3,
    payload,
  };
}

export function ensureCustomAcademicMockTest(): void {
  const data = loadAcademicPracticeMockTest1Payload();
  const now = new Date().toISOString();

  const existing = db
    .prepare('SELECT id, payload_json FROM mock_tests WHERE id = ?')
    .get(PRACTICE_MOCK_TEST_1_ID) as { id: string; payload_json: string } | undefined;

  if (!existing) {
    db.prepare(`
      INSERT INTO mock_tests (
        id, title, category, module_type, description,
        duration_minutes, question_count, is_published, payload_json, created_at, updated_at
      ) VALUES (?, ?, 'academic', 'full', ?, ?, ?, 1, ?, ?, ?)
    `).run(
      PRACTICE_MOCK_TEST_1_ID,
      data.title,
      data.description,
      data.durationMinutes,
      data.questionCount,
      JSON.stringify(data.payload),
      now,
      now
    );
  } else {
    // Preserve any uploaded/generated audioUrls on listening sections if already saved on this test
    try {
      const prevPayload = JSON.parse(existing.payload_json) as MockTestPayload;
      if (prevPayload.listeningSections && data.payload.listeningSections) {
        data.payload.listeningSections.forEach((sec) => {
          const prevSec = prevPayload.listeningSections?.find(
            (p) => p.sectionNumber === sec.sectionNumber
          );
          if (prevSec?.audioUrl) {
            sec.audioUrl = prevSec.audioUrl;
            sec.hasAudioFile = true;
          }
        });
      }
    } catch {
      // Ignore malformed previous payload
    }

    db.prepare(`
      UPDATE mock_tests
      SET title = ?, description = ?, duration_minutes = ?, question_count = ?, payload_json = ?, updated_at = ?
      WHERE id = ?
    `).run(
      data.title,
      data.description,
      data.durationMinutes,
      data.questionCount,
      JSON.stringify(data.payload),
      now,
      PRACTICE_MOCK_TEST_1_ID
    );
  }
}
