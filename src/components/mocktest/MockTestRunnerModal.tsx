import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Clock,
  CheckCircle2,
  ArrowRight,
  X,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Save,
} from 'lucide-react';
import type {
  TestAttemptRecord,
  MockTestRecord,
  AttemptAnswers,
  SingleModuleKey,
} from '../../../shared/mockTestTypes';
import { useMockTestAuth } from './MockTestAuthContext';
import { ListeningExamView } from './ListeningExamView';
import { ReadingExamView } from './ReadingExamView';
import { WritingExamView } from './WritingExamView';
import { SpeakingExamView } from './SpeakingExamView';
import { TestResultView } from './TestResultView';

interface MockTestRunnerModalProps {
  attempt: TestAttemptRecord;
  test: MockTestRecord;
  onClose: () => void;
  onCompleted: (completedAttempt: TestAttemptRecord) => void;
  onRetake?: (testId: string) => void;
}

const FULL_STAGE_ORDER: SingleModuleKey[] = ['listening', 'reading', 'writing', 'speaking'];

function formatCountdown(totalSec: number): string {
  const safe = Math.max(0, Math.floor(totalSec));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export const MockTestRunnerModal: React.FC<MockTestRunnerModalProps> = ({
  attempt: initialAttempt,
  test,
  onClose,
  onCompleted,
  onRetake,
}) => {
  const { apiFetch } = useMockTestAuth();

  const [attempt, setAttempt] = useState<TestAttemptRecord>(initialAttempt);
  const [submittedTest, setSubmittedTest] = useState<MockTestRecord>(test);
  const [phase, setPhase] = useState<'instructions' | 'exam' | 'results'>(
    initialAttempt.status === 'completed' ? 'results' : 'instructions'
  );

  const [currentStage, setCurrentStage] = useState<SingleModuleKey>(
    initialAttempt.currentStage || (test.moduleType === 'full' ? 'listening' : test.moduleType)
  );
  const [answers, setAnswers] = useState<AttemptAnswers>(initialAttempt.answers);
  const [remainingSeconds, setRemainingSeconds] = useState<Record<SingleModuleKey, number>>(
    initialAttempt.remainingSeconds
  );

  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Refs for reliable autosave & timer callbacks without stale closures
  const answersRef = useRef(answers);
  const remainingRef = useRef(remainingSeconds);
  const stageRef = useRef(currentStage);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    remainingRef.current = remainingSeconds;
  }, [remainingSeconds]);

  useEffect(() => {
    stageRef.current = currentStage;
  }, [currentStage]);

  const activeStages: SingleModuleKey[] =
    test.moduleType === 'full' ? FULL_STAGE_ORDER : [test.moduleType as SingleModuleKey];

  const performAutosave = useCallback(async () => {
    if (phase !== 'exam') return;
    setIsSavingDraft(true);
    try {
      const res = await apiFetch<{ savedAt: string }>(`/api/attempts/${attempt.id}/autosave`, {
        method: 'PUT',
        body: JSON.stringify({
          answers: answersRef.current,
          remainingSeconds: remainingRef.current,
          currentStage: stageRef.current,
        }),
      });
      setLastSavedAt(res.savedAt);
    } catch {
      // Silent retry on next cycle
    } finally {
      setIsSavingDraft(false);
    }
  }, [apiFetch, attempt.id, phase]);

  const handleFinalSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await apiFetch<{ attempt: TestAttemptRecord; test?: MockTestRecord }>(
        `/api/attempts/${attempt.id}/submit`,
        {
          method: 'POST',
          body: JSON.stringify({ answers: answersRef.current }),
        }
      );
      setAttempt(res.attempt);
      if (res.test) {
        setSubmittedTest(res.test);
      }
      setShowConfirmSubmit(false);
      setPhase('results');
      onCompleted(res.attempt);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Unable to grade submission. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [apiFetch, attempt.id, onCompleted]);

  // Countdown tick every 1 second when exam is active
  useEffect(() => {
    if (phase !== 'exam' || isSubmitting) return;

    const timerId = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        const cur = prev[stageRef.current] ?? 0;
        if (cur <= 1) {
          // Time expired for current stage
          const currentIdx = activeStages.indexOf(stageRef.current);
          if (currentIdx >= 0 && currentIdx < activeStages.length - 1) {
            const nextStage = activeStages[currentIdx + 1];
            setCurrentStage(nextStage);
          } else {
            // Auto-submit final stage
            void handleFinalSubmit();
          }
          return { ...prev, [stageRef.current]: 0 };
        }
        return { ...prev, [stageRef.current]: cur - 1 };
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [phase, isSubmitting, activeStages, handleFinalSubmit]);

  // Periodic automatic answer saving every 15 seconds
  useEffect(() => {
    if (phase !== 'exam') return;
    const saveId = window.setInterval(() => {
      void performAutosave();
    }, 15000);
    return () => window.clearInterval(saveId);
  }, [phase, performAutosave]);

  const handleAdvanceOrFinish = async () => {
    await performAutosave();
    const currentIdx = activeStages.indexOf(currentStage);
    if (currentIdx >= 0 && currentIdx < activeStages.length - 1) {
      setCurrentStage(activeStages[currentIdx + 1]);
    } else {
      setShowConfirmSubmit(true);
    }
  };

  const handleToggleFlag = (questionId: string) => {
    setAnswers((prev) => {
      const existing = prev.flaggedQuestions || [];
      const next = existing.includes(questionId)
        ? existing.filter((id) => id !== questionId)
        : [...existing, questionId];
      return { ...prev, flaggedQuestions: next };
    });
  };

  if (phase === 'results') {
    return (
      <div className="fixed inset-0 z-50 bg-neutral-50 overflow-y-auto">
        <TestResultView
          attempt={attempt}
          test={submittedTest}
          onRetake={onRetake}
          onClose={onClose}
        />
      </div>
    );
  }

  if (phase === 'instructions') {
    return (
      <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl w-full max-w-2xl overflow-hidden my-8">
          <div className="px-6 py-5 bg-[#0D0D11] text-white flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#E11D2A] uppercase tracking-wider">
                Official Computer-Delivered Simulation
              </span>
              <h3 className="text-xl font-bold font-display mt-0.5">{test.title}</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Exit instructions"
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-5">
            <p className="text-sm text-neutral-700 leading-relaxed">{test.description}</p>

            {(test.payload.meta?.label || test.payload.meta?.originality || test.payload.meta?.audioNote) && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
                {test.payload.meta?.label && (
                  <p className="font-bold">{test.payload.meta.label}</p>
                )}
                {test.payload.meta?.originality && (
                  <p>{test.payload.meta.originality}</p>
                )}
                {test.payload.meta?.audioNote && (
                  <p>{test.payload.meta.audioNote}</p>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeStages.map((stage) => (
                <div
                  key={stage}
                  className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-bold uppercase text-[#0D0D11] block">
                      {stage} Module
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      {stage === 'listening' && '4 sections · 40 questions'}
                      {stage === 'reading' && '3 passages · 40 questions'}
                      {stage === 'writing' && 'Task 1 (150w) & Task 2 (250w)'}
                      {stage === 'speaking' && '3-part interview with mic'}
                    </span>
                  </div>
                  <span className="text-sm font-black font-display tabular-nums text-[#E11D2A]">
                    {stage === 'listening'
                      ? '30 min'
                      : stage === 'speaking'
                      ? '14 min'
                      : '60 min'}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs text-neutral-700">
              <div className="flex items-center gap-2 font-bold text-[#0D0D11]">
                <ShieldCheck className="w-4 h-4 text-[#E11D2A]" />
                <span>Exam Rules &amp; Auto-Save Protection</span>
              </div>
              <ul className="list-disc list-inside space-y-1">
                <li>Your answers save automatically every 15 seconds while the test is running.</li>
                <li>When a module timer reaches 00:00, the exam automatically advances or submits.</li>
                <li>Scores are unofficial practice estimates generated for preparation purposes.</li>
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-700 hover:bg-neutral-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setPhase('exam')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white text-sm font-bold shadow-md shadow-red-600/20 cursor-pointer"
              >
                <span>Begin Timed Exam</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stageSecondsLeft = remainingSeconds[currentStage] ?? 0;
  const isLowTime = stageSecondsLeft <= 120;
  const isLastStage = activeStages.indexOf(currentStage) === activeStages.length - 1;

  const moduleProgress = (() => {
    const lQs = (test.payload.listeningSections || []).flatMap((s) => s.questions);
    const lDone = lQs.filter((q) => (answers.listening?.[q.id] || '').trim().length > 0).length;

    const rQs = (test.payload.readingPassages || []).flatMap((p) => p.questions);
    const rDone = rQs.filter((q) => (answers.reading?.[q.id] || '').trim().length > 0).length;

    const wTotal = test.payload.writingTasks?.length || 0;
    const wDone =
      (answers.writing?.task1?.text?.trim() ? 1 : 0) +
      (answers.writing?.task2?.text?.trim() ? 1 : 0);

    const sTotal = test.payload.speaking ? 3 : 0;
    const sDone = (['part1', 'part2', 'part3'] as const).filter((pk) =>
      Boolean(answers.speaking?.[pk]?.audioId || answers.speaking?.[pk]?.transcriptNotes?.trim())
    ).length;

    const map: Record<SingleModuleKey, { done: number; total: number }> = {
      listening: { done: lDone, total: lQs.length },
      reading: { done: rDone, total: rQs.length },
      writing: { done: Math.min(wDone, wTotal), total: wTotal },
      speaking: { done: sDone, total: sTotal },
    };

    const overallTotal = activeStages.reduce((acc, st) => acc + map[st].total, 0);
    const overallDone = activeStages.reduce((acc, st) => acc + map[st].done, 0);
    const currentStat = map[currentStage];

    return {
      byModule: map,
      currentDone: currentStat.done,
      currentTotal: currentStat.total,
      currentRemaining: Math.max(0, currentStat.total - currentStat.done),
      overallDone,
      overallTotal,
      overallUnanswered: Math.max(0, overallTotal - overallDone),
      overallPct: overallTotal > 0 ? Math.round((overallDone / overallTotal) * 100) : 0,
    };
  })();

  return (
    <div className="fixed inset-0 z-50 bg-neutral-50 flex flex-col">
      {/* Distraction-Free Exam Top Bar */}
      <header className="bg-[#0D0D11] text-white px-4 sm:px-6 py-2.5 border-b border-neutral-800 shrink-0 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="px-2.5 py-1 rounded-md bg-[#E11D2A] text-white text-[11px] font-black uppercase tracking-wider shrink-0">
              MY IELTS Exam
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-bold truncate">{test.title}</h3>
              {test.payload.meta?.label && (
                <span className="text-[11px] text-neutral-400 block truncate">
                  {test.payload.meta.label}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Countdown Clock */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono text-sm font-bold tabular-nums ${
                isLowTime
                  ? 'bg-red-950/70 border-[#E11D2A] text-red-300'
                  : 'bg-neutral-900 border-neutral-700 text-white'
              }`}
            >
              <Clock className={`w-4 h-4 ${isLowTime ? 'text-[#E11D2A]' : 'text-neutral-400'}`} />
              <span>{formatCountdown(stageSecondsLeft)}</span>
            </div>

            <button
              type="button"
              onClick={performAutosave}
              disabled={isSavingDraft}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSavingDraft ? 'Saving...' : 'Save'}</span>
            </button>

            <button
              type="button"
              onClick={handleAdvanceOrFinish}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white text-xs font-bold whitespace-nowrap cursor-pointer"
            >
              <span>{isLastStage ? 'Submit Exam' : 'Next Module'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => {
                void performAutosave();
                onClose();
              }}
              aria-label="Save and exit exam"
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 4-Module Navigation Tabs & Live Progress Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-neutral-800/80">
          <nav aria-label="Exam modules" className="flex flex-wrap items-center gap-1.5">
            {activeStages.map((s, idx) => {
              const stat = moduleProgress.byModule[s];
              const active = s === currentStage;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    void performAutosave();
                    setCurrentStage(s);
                  }}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#E11D2A] text-white'
                      : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white border border-neutral-800'
                  }`}
                >
                  <span>
                    {idx + 1}. {s}
                  </span>
                  <span
                    className={`text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded ${
                      active ? 'bg-black/25 text-white' : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {stat.done}/{stat.total}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-neutral-300">
            <span className="tabular-nums">
              Module: <strong className="text-white capitalize">{currentStage}</strong> · Completed:{' '}
              <strong className="text-emerald-400">{moduleProgress.currentDone}</strong> · Unanswered:{' '}
              <strong className="text-amber-300">{moduleProgress.currentRemaining}</strong>
            </span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                <div
                  className="h-full bg-[#E11D2A] transition-all duration-300"
                  style={{ width: `${moduleProgress.overallPct}%` }}
                />
              </div>
              <span className="font-mono tabular-nums text-white font-bold">
                {moduleProgress.overallPct}%
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Active Exam Module Body */}
      <div className="flex-1 min-h-0">
        {currentStage === 'listening' && (
          <ListeningExamView
            testId={test.id}
            sections={test.payload.listeningSections || []}
            answers={answers.listening || {}}
            flagged={answers.flaggedQuestions || []}
            onAnswerChange={(qId, val) =>
              setAnswers((prev) => ({
                ...prev,
                listening: { ...(prev.listening || {}), [qId]: val },
              }))
            }
            onToggleFlag={handleToggleFlag}
          />
        )}

        {currentStage === 'reading' && (
          <ReadingExamView
            passages={test.payload.readingPassages || []}
            answers={answers.reading || {}}
            flagged={answers.flaggedQuestions || []}
            onAnswerChange={(qId, val) =>
              setAnswers((prev) => ({
                ...prev,
                reading: { ...(prev.reading || {}), [qId]: val },
              }))
            }
            onToggleFlag={handleToggleFlag}
          />
        )}

        {currentStage === 'writing' && (
          <WritingExamView
            tasks={test.payload.writingTasks || []}
            task1={answers.writing?.task1 || { text: '', wordCount: 0 }}
            task2={answers.writing?.task2 || { text: '', wordCount: 0 }}
            onChangeTask={(taskNum, text, wordCount) =>
              setAnswers((prev) => ({
                ...prev,
                writing: {
                  ...(prev.writing || {}),
                  [taskNum === 1 ? 'task1' : 'task2']: {
                    text,
                    wordCount,
                    savedAt: new Date().toISOString(),
                  },
                },
              }))
            }
            onSaveDraft={performAutosave}
            isSavingDraft={isSavingDraft}
            lastSavedAt={lastSavedAt}
          />
        )}

        {currentStage === 'speaking' && test.payload.speaking && (
          <SpeakingExamView
            attemptId={attempt.id}
            speaking={test.payload.speaking}
            submissions={answers.speaking || {}}
            onUpdatePart={(partKey, data) =>
              setAnswers((prev) => ({
                ...prev,
                speaking: { ...(prev.speaking || {}), [partKey]: data },
              }))
            }
          />
        )}
      </div>

      {/* Final Submission Confirmation Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E11D2A] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold font-display text-[#0D0D11]">
                  Submit Mock Test?
                </h4>
                <p className="text-xs text-neutral-600">
                  Your objective sections and AI Writing/Speaking responses will be evaluated immediately.
                </p>
              </div>
            </div>

            {submitError && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setShowConfirmSubmit(false)}
                className="px-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-700 hover:bg-neutral-50 cursor-pointer disabled:opacity-50"
              >
                Continue Reviewing
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleFinalSubmit}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white text-xs font-bold cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Evaluating &amp; Scoring...</span>
                  </>
                ) : (
                  <span>Confirm &amp; View Results</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
