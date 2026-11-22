import fs from 'node:fs';
import { GoogleGenAI, Type } from '@google/genai';
import type {
  WritingTaskData,
  WritingEvaluationResult,
  SpeakingData,
  SpeakingEvaluationResult,
  TestCategory,
} from '../shared/mockTestTypes.ts';
import { roundToHalfBand } from './scoring.ts';

function getAiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    throw new Error(
      'GEMINI_API_KEY is not configured. Please add your Gemini API key in Settings > Secrets to enable AI Writing, Speaking, and TTS evaluation.'
    );
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export async function evaluateWritingWithGemini(params: {
  category: TestCategory;
  tasks: WritingTaskData[];
  task1Text: string;
  task2Text: string;
}): Promise<WritingEvaluationResult> {
  const ai = getAiClient();
  const task1Prompt = params.tasks.find((t) => t.taskNumber === 1)?.prompt ?? 'Task 1';
  const task2Prompt = params.tasks.find((t) => t.taskNumber === 2)?.prompt ?? 'Task 2';

  const t1Words = params.task1Text.trim() ? params.task1Text.trim().split(/\s+/).length : 0;
  const t2Words = params.task2Text.trim() ? params.task2Text.trim().split(/\s+/).length : 0;

  const prompt = `Evaluate this IELTS ${params.category === 'academic' ? 'Academic' : 'General Training'} Writing test strictly according to official IELTS public band descriptors (0.0 to 9.0 in 0.5 increments).
Remember: Task 1 minimum is 150 words; Task 2 minimum is 250 words; under-length responses or off-topic responses must be penalized accurately.

TASK 1 PROMPT:
${task1Prompt}

CANDIDATE TASK 1 RESPONSE (${t1Words} words):
${params.task1Text.trim() || '[No response submitted]'}

---

TASK 2 PROMPT:
${task2Prompt}

CANDIDATE TASK 2 RESPONSE (${t2Words} words):
${params.task2Text.trim() || '[No response submitted]'}

Return accurate, constructive, examiner-grade scoring and detailed personalized feedback.`;

  const response = await ai.models.generateContent({
    model: 'gemini-4-hydrogen',
    contents: prompt,
    config: {
      systemInstruction:
        'You are a senior certified IELTS Writing examiner. Score fairly and strictly on the 0.0-9.0 scale in 0.5 increments. Provide concrete, actionable feedback referencing the candidate text.',
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          task1Band: { type: Type.NUMBER, description: 'Estimated band for Task 1 (0 to 9, 0.5 steps)' },
          task2Band: { type: Type.NUMBER, description: 'Estimated band for Task 2 (0 to 9, 0.5 steps)' },
          taskAchievement: { type: Type.NUMBER, description: 'Task Achievement/Response score (0-9)' },
          coherenceCohesion: { type: Type.NUMBER, description: 'Coherence and Cohesion score (0-9)' },
          lexicalResource: { type: Type.NUMBER, description: 'Lexical Resource score (0-9)' },
          grammaticalRange: { type: Type.NUMBER, description: 'Grammatical Range and Accuracy score (0-9)' },
          feedback: { type: Type.STRING, description: 'Comprehensive overall evaluation summary' },
          task1Feedback: { type: Type.STRING, description: 'Specific feedback on Task 1' },
          task2Feedback: { type: Type.STRING, description: 'Specific feedback on Task 2' },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: [
          'task1Band',
          'task2Band',
          'taskAchievement',
          'coherenceCohesion',
          'lexicalResource',
          'grammaticalRange',
          'feedback',
          'task1Feedback',
          'task2Feedback',
          'strengths',
          'weaknesses',
          'suggestions',
        ],
      },
    },
  });

  const rawText = (response.text ?? '{}').trim();
  const parsed = JSON.parse(rawText) as {
    task1Band: number;
    task2Band: number;
    taskAchievement: number;
    coherenceCohesion: number;
    lexicalResource: number;
    grammaticalRange: number;
    feedback: string;
    task1Feedback: string;
    task2Feedback: string;
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };

  const t1Band = t1Words === 0 ? 0 : roundToHalfBand(parsed.task1Band);
  const t2Band = t2Words === 0 ? 0 : roundToHalfBand(parsed.task2Band);
  // Official IELTS Writing weighting: Task 2 carries double the weight of Task 1
  const weighted = t1Words === 0 && t2Words === 0 ? 0 : roundToHalfBand((t1Band + 2 * t2Band) / 3);

  return {
    estimatedBand: weighted,
    task1Band: t1Band,
    task2Band: t2Band,
    criteria: {
      taskAchievement: roundToHalfBand(parsed.taskAchievement),
      coherenceCohesion: roundToHalfBand(parsed.coherenceCohesion),
      lexicalResource: roundToHalfBand(parsed.lexicalResource),
      grammaticalRange: roundToHalfBand(parsed.grammaticalRange),
    },
    feedback: parsed.feedback,
    task1Feedback: parsed.task1Feedback,
    task2Feedback: parsed.task2Feedback,
    strengths: parsed.strengths ?? [],
    weaknesses: parsed.weaknesses ?? [],
    suggestions: parsed.suggestions ?? [],
    isEstimated: true,
  };
}

export interface SpeakingAudioInput {
  partKey: 'part1' | 'part2' | 'part3';
  filePath?: string;
  mimeType?: string;
  transcriptNotes?: string;
}

export async function evaluateSpeakingWithGemini(params: {
  speakingData: SpeakingData;
  recordings: SpeakingAudioInput[];
}): Promise<SpeakingEvaluationResult> {
  const ai = getAiClient();

  const parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [];
  const transcripts: string[] = [];

  for (const rec of params.recordings) {
    if (rec.filePath && fs.existsSync(rec.filePath)) {
      const audioBytes = fs.readFileSync(rec.filePath);
      const base64Audio = audioBytes.toString('base64');
      const mimeType = rec.mimeType || 'audio/webm';

      // Transcribe each speaking part accurately using gemini-3.5-transcribe
      try {
        const transRes = await ai.models.generateContent({
          model: 'gemini-3.5-transcribe',
          contents: {
            parts: [
              { inlineData: { mimeType, data: base64Audio } },
              {
                text: 'Transcribe this IELTS Speaking response verbatim, including hesitations or self-corrections if audible.',
              },
            ],
          },
        });
        const text = (transRes.text ?? '').trim();
        transcripts.push(`${rec.partKey.toUpperCase()}: ${text || '[Audio recorded, low speech volume]'}`);
      } catch {
        // If transcribe model is unavailable for a container format, pass audio inline directly to gemini-4-hydrogen
        parts.push({ inlineData: { mimeType, data: base64Audio } });
        transcripts.push(`${rec.partKey.toUpperCase()}: [Audio attached directly for acoustic evaluation]`);
      }

      // Attach audio inline for pronunciation & fluency inspection
      parts.push({ inlineData: { mimeType, data: base64Audio } });
    } else if (rec.transcriptNotes) {
      transcripts.push(`${rec.partKey.toUpperCase()} (Candidate notes): ${rec.transcriptNotes}`);
    }
  }

  if (parts.length === 0 && transcripts.length === 0) {
    throw new Error('Please record at least one Speaking part before submitting for evaluation.');
  }

  const evaluationPrompt = `Evaluate this candidate's IELTS Speaking Mock Test across the 4 official IELTS Speaking criteria (0.0 to 9.0 in 0.5 increments):
1. Fluency & Coherence
2. Lexical Resource
3. Grammatical Range & Accuracy
4. Pronunciation

TEST PROMPTS:
- Part 1 Questions: ${params.speakingData.part1.questions.join(' | ')}
- Part 2 Cue Card Topic: ${params.speakingData.part2.cueCard.topic} (${params.speakingData.part2.cueCard.bullets.join('; ')})
- Part 3 Discussion Questions: ${params.speakingData.part3.questions.join(' | ')}

TRANSCRIPTIONS / RECORDINGS PROVIDED:
${transcripts.join('\n\n')}

Score fairly and strictly based on actual spoken evidence provided in the recordings/transcripts. If any part is missing, reflect that in completeness feedback.`;

  parts.push({ text: evaluationPrompt });

  const response = await ai.models.generateContent({
    model: 'gemini-4-hydrogen',
    contents: { parts },
    config: {
      systemInstruction:
        'You are a certified IELTS Speaking examiner. Provide realistic, encouraging yet strict 0.0-9.0 band estimates in 0.5 increments, plus clear pronunciation, fluency, lexical, and grammar coaching.',
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          fluencyCoherence: { type: Type.NUMBER },
          lexicalResource: { type: Type.NUMBER },
          grammaticalRange: { type: Type.NUMBER },
          pronunciation: { type: Type.NUMBER },
          transcriptSummary: { type: Type.STRING, description: 'Clean summary of what the candidate said across parts' },
          feedback: { type: Type.STRING, description: 'Detailed examiner assessment' },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: [
          'fluencyCoherence',
          'lexicalResource',
          'grammaticalRange',
          'pronunciation',
          'transcriptSummary',
          'feedback',
          'strengths',
          'weaknesses',
          'suggestions',
        ],
      },
    },
  });

  const raw = (response.text ?? '{}').trim();
  const parsed = JSON.parse(raw) as {
    fluencyCoherence: number;
    lexicalResource: number;
    grammaticalRange: number;
    pronunciation: number;
    transcriptSummary: string;
    feedback: string;
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };

  const fc = roundToHalfBand(parsed.fluencyCoherence);
  const lr = roundToHalfBand(parsed.lexicalResource);
  const gr = roundToHalfBand(parsed.grammaticalRange);
  const pr = roundToHalfBand(parsed.pronunciation);
  const overall = roundToHalfBand((fc + lr + gr + pr) / 4);

  return {
    estimatedBand: overall,
    criteria: {
      fluencyCoherence: fc,
      lexicalResource: lr,
      grammaticalRange: gr,
      pronunciation: pr,
    },
    transcriptSummary: parsed.transcriptSummary || transcripts.join('\n'),
    feedback: parsed.feedback,
    strengths: parsed.strengths ?? [],
    weaknesses: parsed.weaknesses ?? [],
    suggestions: parsed.suggestions ?? [],
    isEstimated: true,
  };
}

export async function generateListeningSectionWav(transcript: string, sectionNumber: number): Promise<Buffer> {
  const ai = getAiClient();
  const voiceBySection: Record<number, string> = {
    1: 'Kore',
    2: 'Charon',
    3: 'Zephyr',
    4: 'Fenrir',
  };
  const voiceName = voiceBySection[sectionNumber] || 'Kore';

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash-lite-tts',
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: transcript,
            speechMetadata: {
              style: 'Clear, natural, paced IELTS Listening exam narration with brief pauses between speakers and topics.',
            },
          },
        ],
      },
    ],
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) {
    throw new Error('Gemini TTS did not return audio data for this listening section.');
  }
  return Buffer.from(base64Audio, 'base64');
}
