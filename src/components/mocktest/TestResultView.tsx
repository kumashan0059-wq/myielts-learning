import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  Download,
  RotateCcw,
  ArrowLeft,
  AlertTriangle,
  TrendingUp,
  Target,
  BookOpen,
  PenTool,
  Mic,
  Info,
} from 'lucide-react';
import type { TestAttemptRecord, MockTestRecord } from '../../../shared/mockTestTypes';
import { AuthAudioPlayer } from './AuthAudioPlayer';

interface TestResultViewProps {
  attempt: TestAttemptRecord;
  test?: MockTestRecord | null;
  onRetake?: (testId: string) => void;
  onClose: () => void;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function downloadAttemptReport(attempt: TestAttemptRecord) {
  const res = attempt.results;
  if (!res) return;

  const overallStr =
    res.overallBand !== undefined ? res.overallBand.toFixed(1) : 'Pending (N/A)';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>MY IELTS Mock Test Report — ${escapeHtml(attempt.testTitle || attempt.testId)}</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #0D0D11; max-width: 860px; margin: 40px auto; padding: 0 24px; line-height: 1.6; }
  .header { background: #0D0D11; color: #fff; padding: 28px; border-radius: 16px; display: flex; justify-content: space-between; align-items: center; }
  .brand { color: #E11D2A; font-weight: 800; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; }
  .score { font-size: 38px; font-weight: 900; color: #fff; }
  .notice { background: #FFF8E6; border: 1px solid #FDE68A; padding: 14px 18px; border-radius: 12px; margin: 20px 0; font-size: 13px; color: #92400E; }
  .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 20px 0; }
  .card { border: 1px solid #E5E5E5; border-radius: 12px; padding: 14px; }
  .card label { font-size: 11px; text-transform: uppercase; color: #666; font-weight: 700; display: block; }
  .card strong { font-size: 24px; color: #0D0D11; }
  h2 { font-size: 18px; margin-top: 28px; border-bottom: 1px solid #E5E5E5; padding-bottom: 6px; }
  ul { padding-left: 20px; }
  table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px; }
  th, td { border: 1px solid #E5E5E5; padding: 8px 10px; text-align: left; }
  th { background: #F8F8F8; }
</style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">MY IELTS · Unofficial Practice Report</div>
      <h1 style="margin:6px 0 4px;font-size:22px;">${escapeHtml(attempt.testTitle || 'IELTS Mock Examination')}</h1>
      <div style="font-size:13px;color:#A3A3A3;">Candidate: ${escapeHtml(attempt.userName || 'Student')} · Track: ${escapeHtml(attempt.category.toUpperCase())} · Completed: ${escapeHtml(new Date(attempt.completedAt || attempt.updatedAt).toLocaleString())}</div>
    </div>
    <div style="text-align:right;">
      <div style="font-size:11px;color:#A3A3A3;">ESTIMATED OVERALL BAND</div>
      <div class="score">${escapeHtml(overallStr)}</div>
    </div>
  </div>

  <div class="notice">${escapeHtml(res.disclaimer)}</div>

  <div class="grid">
    <div class="card"><label>Listening (Est.)</label><strong>${res.listeningBand !== undefined ? res.listeningBand.toFixed(1) : '—'}</strong></div>
    <div class="card"><label>Reading (Est.)</label><strong>${res.readingBand !== undefined ? res.readingBand.toFixed(1) : '—'}</strong></div>
    <div class="card"><label>Writing (Est.)</label><strong>${res.writingBand !== undefined ? res.writingBand.toFixed(1) : 'Pending'}</strong></div>
    <div class="card"><label>Speaking (Est.)</label><strong>${res.speakingBand !== undefined ? res.speakingBand.toFixed(1) : 'Pending'}</strong></div>
  </div>

  <h2>Strengths &amp; Weaknesses</h2>
  <p><strong>Strengths:</strong></p>
  <ul>${res.strengths.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ul>
  <p><strong>Areas to Improve:</strong></p>
  <ul>${res.weaknesses.map((w) => `<li>${escapeHtml(w)}</li>`).join('')}</ul>
  <p><strong>Study Recommendations:</strong></p>
  <ul>${res.suggestions.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ul>

  ${
    res.writingEvaluation
      ? `<h2>Writing Evaluation (AI Estimated: ${res.writingEvaluation.estimatedBand.toFixed(1)})</h2>
         <p>${escapeHtml(res.writingEvaluation.feedback)}</p>
         <p><strong>Task 1:</strong> ${escapeHtml(res.writingEvaluation.task1Feedback || '')}</p>
         <p><strong>Task 2:</strong> ${escapeHtml(res.writingEvaluation.task2Feedback || '')}</p>`
      : res.writingEvaluationNotice
      ? `<h2>Writing Status</h2><p>${escapeHtml(res.writingEvaluationNotice)}</p>`
      : ''
  }

  ${
    res.speakingEvaluation
      ? `<h2>Speaking Evaluation (AI Estimated: ${res.speakingEvaluation.estimatedBand.toFixed(1)})</h2>
         <p>${escapeHtml(res.speakingEvaluation.feedback)}</p>
         <p><strong>Transcript Summary:</strong> ${escapeHtml(res.speakingEvaluation.transcriptSummary)}</p>`
      : res.speakingEvaluationNotice
      ? `<h2>Speaking Status</h2><p>${escapeHtml(res.speakingEvaluationNotice)}</p>`
      : ''
  }

  ${
    res.questionReviews && res.questionReviews.length > 0
      ? `<h2>Objective Question Review (${res.questionReviews.filter((q) => q.isCorrect).length}/${res.questionReviews.length} Correct)</h2>
         <table>
           <thead><tr><th>#</th><th>Module</th><th>Your Answer</th><th>Correct Answer</th><th>Status</th></tr></thead>
           <tbody>
             ${res.questionReviews
               .map(
                 (q) =>
                   `<tr><td>${q.number}</td><td>${escapeHtml(q.module)}</td><td>${escapeHtml(q.userAnswer)}</td><td>${escapeHtml(q.correctAnswers[0] || '')}</td><td>${q.isCorrect ? 'Correct' : 'Incorrect'}</td></tr>`
               )
               .join('')}
           </tbody>
         </table>`
      : ''
  }
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `MY_IELTS_Report_${attempt.id.slice(0, 8)}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export const TestResultView: React.FC<TestResultViewProps> = ({
  attempt,
  test,
  onRetake,
  onClose,
}) => {
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'correct'>('all');
  const results = attempt.results;

  if (!results) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm text-neutral-600 mb-4">Results are not yet available for this attempt.</p>
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2.5 rounded-xl bg-[#0D0D11] text-white text-sm font-bold cursor-pointer"
        >
          Back to Portal
        </button>
      </div>
    );
  }

  const filteredReviews = (results.questionReviews || []).filter((q) => {
    if (reviewFilter === 'incorrect') return !q.isCorrect;
    if (reviewFilter === 'correct') return q.isCorrect;
    return true;
  });

  const writingCriteria = test?.payload?.writingEvaluationCriteria;
  const speakingCriteria = test?.payload?.speaking?.evaluationCriteria;
  const task1Data = test?.payload?.writingTasks?.find((t) => t.taskNumber === 1);
  const task2Data = test?.payload?.writingTasks?.find((t) => t.taskNumber === 2);

  const moduleCards = [
    {
      label: 'Listening (Est.)',
      band: results.listeningBand,
      sub: results.listeningScore
        ? `${results.listeningScore.correct}/${results.listeningScore.total} correct`
        : 'Not included',
    },
    {
      label: 'Reading (Est.)',
      band: results.readingBand,
      sub: results.readingScore
        ? `${results.readingScore.correct}/${results.readingScore.total} correct`
        : 'Not included',
    },
    {
      label: 'Writing (Est.)',
      band: results.writingBand,
      sub:
        results.writingBand !== undefined
          ? 'AI Estimated Score'
          : results.writingEvaluationNotice
          ? 'Pending / Self-Review'
          : 'Not included',
    },
    {
      label: 'Speaking (Est.)',
      band: results.speakingBand,
      sub:
        results.speakingBand !== undefined
          ? 'AI Estimated Score'
          : results.speakingEvaluationNotice
          ? 'Pending / Self-Review'
          : 'Not included',
    },
  ];

  const hasSavedWriting =
    Boolean(attempt.answers.writing?.task1?.text?.trim()) ||
    Boolean(attempt.answers.writing?.task2?.text?.trim());
  const hasSavedSpeaking = (['part1', 'part2', 'part3'] as const).some((pk) =>
    Boolean(attempt.answers.speaking?.[pk]?.audioUrl || attempt.answers.speaking?.[pk]?.transcriptNotes?.trim())
  );

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-bold text-[#0D0D11] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => downloadAttemptReport(attempt)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-bold text-[#0D0D11] cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#E11D2A]" />
            <span>Download Report</span>
          </button>

          {onRetake && (
            <button
              type="button"
              onClick={() => onRetake(attempt.testId)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white text-xs font-bold cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Test</span>
            </button>
          )}
        </div>
      </div>

      {/* Overall Score Hero Card */}
      <div className="bg-[#0D0D11] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#E11D2A] uppercase tracking-wider mb-1.5">
            <Award className="w-4 h-4" />
            <span>
              Unofficial Practice Result · {attempt.category === 'academic' ? 'Academic' : 'General Training'}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
            {attempt.testTitle || 'IELTS Mock Examination'}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Completed on {new Date(attempt.completedAt || attempt.updatedAt).toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-4 bg-neutral-900 border border-neutral-800 rounded-2xl px-6 py-4 shrink-0">
          <div>
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
              Overall Estimated Band
            </span>
            <span className="text-xs text-neutral-400">
              {results.overallBand !== undefined
                ? 'Unofficial 0.5-band rounding'
                : 'Requires all 4 module scores'}
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-black font-display tabular-nums text-[#E11D2A]">
            {results.overallBand !== undefined ? results.overallBand.toFixed(1) : 'N/A'}
          </div>
        </div>
      </div>

      {/* Unofficial Practice Disclaimer */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950">
        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p>
            <strong>Unofficial Practice Score Notice:</strong> {results.disclaimer}
          </p>
          {test?.payload?.meta?.approximateBandConversionUnofficial?.note && (
            <p className="text-xs text-amber-900">
              {test.payload.meta.approximateBandConversionUnofficial.note}
            </p>
          )}
        </div>
      </div>

      {/* 4 Module Score Breakdown */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {moduleCards.map((mc) => (
          <div
            key={mc.label}
            className="bg-white rounded-2xl border border-neutral-200 p-5 flex flex-col justify-between"
          >
            <span className="text-xs font-bold text-neutral-500">{mc.label}</span>
            <div className="text-3xl font-black font-display tabular-nums text-[#0D0D11] my-2">
              {mc.band !== undefined ? mc.band.toFixed(1) : 'N/A'}
            </div>
            <span className="text-[11px] font-semibold text-neutral-600">{mc.sub}</span>
          </div>
        ))}
      </div>

      {/* Instructor Note (if added by Admin) */}
      {results.instructorNote && (
        <div className="bg-white rounded-2xl border border-red-200 p-5">
          <h4 className="text-sm font-bold text-[#E11D2A] mb-1">MY IELTS Instructor Review Note</h4>
          <p className="text-sm text-neutral-800 leading-relaxed">{results.instructorNote}</p>
        </div>
      )}

      {/* Strengths, Weaknesses & Personalized Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-neutral-200 p-5">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0D0D11] mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Key Strengths</span>
          </div>
          <ul className="space-y-2 text-xs text-neutral-700 leading-relaxed list-disc list-inside">
            {results.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-5">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0D0D11] mb-3">
            <Target className="w-4 h-4 text-[#E11D2A]" />
            <span>Focus Areas</span>
          </div>
          <ul className="space-y-2 text-xs text-neutral-700 leading-relaxed list-disc list-inside">
            {results.weaknesses.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-5">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0D0D11] mb-3">
            <TrendingUp className="w-4 h-4 text-[#0D0D11]" />
            <span>Actionable Next Steps</span>
          </div>
          <ul className="space-y-2 text-xs text-neutral-700 leading-relaxed list-disc list-inside">
            {results.suggestions.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Post-Submission Writing Review, Model Answer & Criteria */}
      {(results.writingEvaluation ||
        results.writingEvaluationNotice ||
        hasSavedWriting ||
        task1Data?.modelAnswer ||
        writingCriteria) && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
            <div className="flex items-center gap-2">
              <PenTool className="w-4 h-4 text-[#E11D2A]" />
              <div>
                <h4 className="text-lg font-bold font-display text-[#0D0D11]">
                  Writing Review, Model Answer &amp; Criteria
                </h4>
                <p className="text-xs text-neutral-500">
                  Unlocked after test submission · Task 2 carries double weight of Task 1
                </p>
              </div>
            </div>
            {results.writingEvaluation && (
              <span className="text-xl font-black font-display tabular-nums text-[#E11D2A]">
                Est. Band {results.writingEvaluation.estimatedBand.toFixed(1)}
              </span>
            )}
          </div>

          {results.writingEvaluationNotice && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700">
              <Info className="w-4 h-4 text-[#E11D2A] shrink-0 mt-0.5" />
              <span>{results.writingEvaluationNotice}</span>
            </div>
          )}

          {results.writingEvaluation && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Task Achievement', score: results.writingEvaluation.criteria.taskAchievement },
                  { label: 'Coherence & Cohesion', score: results.writingEvaluation.criteria.coherenceCohesion },
                  { label: 'Lexical Resource', score: results.writingEvaluation.criteria.lexicalResource },
                  { label: 'Grammar & Accuracy', score: results.writingEvaluation.criteria.grammaticalRange },
                ].map((c) => (
                  <div key={c.label} className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                    <span className="text-[11px] font-semibold text-neutral-600 block">{c.label}</span>
                    <span className="text-lg font-black font-display tabular-nums text-[#0D0D11]">
                      {c.score.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-neutral-800 leading-relaxed">
                {results.writingEvaluation.feedback}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-neutral-700">
                {results.writingEvaluation.task1Feedback && (
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                    <strong className="text-[#0D0D11] block mb-1">
                      Task 1 Feedback (Est. {results.writingEvaluation.task1Band?.toFixed(1)})
                    </strong>
                    <p className="leading-relaxed">{results.writingEvaluation.task1Feedback}</p>
                  </div>
                )}
                {results.writingEvaluation.task2Feedback && (
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                    <strong className="text-[#0D0D11] block mb-1">
                      Task 2 Feedback (Est. {results.writingEvaluation.task2Band?.toFixed(1)})
                    </strong>
                    <p className="leading-relaxed">{results.writingEvaluation.task2Feedback}</p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Student Submitted Responses */}
          {hasSavedWriting && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1.5">
                <strong className="text-[#0D0D11] block">
                  Your Task 1 Response ({attempt.answers.writing?.task1?.wordCount ?? 0} words)
                </strong>
                <p className="whitespace-pre-line text-neutral-700 leading-relaxed">
                  {attempt.answers.writing?.task1?.text?.trim() || 'No response entered.'}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1.5">
                <strong className="text-[#0D0D11] block">
                  Your Task 2 Response ({attempt.answers.writing?.task2?.wordCount ?? 0} words)
                </strong>
                <p className="whitespace-pre-line text-neutral-700 leading-relaxed">
                  {attempt.answers.writing?.task2?.text?.trim() || 'No response entered.'}
                </p>
              </div>
            </div>
          )}

          {/* Unlocked Model Answer & Suggested Structure */}
          {(task1Data?.keyFeatures || task1Data?.modelAnswer || task2Data?.suggestedStructure) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
              {(task1Data?.keyFeatures || task1Data?.modelAnswer) && (
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3 text-xs">
                  <strong className="text-sm text-[#0D0D11] block">
                    Task 1 Key Features &amp; Model Answer
                  </strong>
                  {task1Data.keyFeatures && (
                    <ul className="list-disc list-inside space-y-1 text-neutral-700">
                      {task1Data.keyFeatures.map((kf) => (
                        <li key={kf}>{kf}</li>
                      ))}
                    </ul>
                  )}
                  {task1Data.modelAnswer && (
                    <div className="p-3.5 rounded-xl bg-white border border-neutral-200 text-neutral-800 leading-relaxed whitespace-pre-line">
                      {task1Data.modelAnswer}
                    </div>
                  )}
                </div>
              )}

              {task2Data?.suggestedStructure && (
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2.5 text-xs">
                  <strong className="text-sm text-[#0D0D11] block">
                    Task 2 Suggested Band-Ready Structure
                  </strong>
                  <ul className="space-y-2 text-neutral-700">
                    {task2Data.suggestedStructure.map((step) => (
                      <li key={step} className="p-2.5 rounded-lg bg-white border border-neutral-200">
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Verbatim Official-Format Writing Evaluation Criteria */}
          {writingCriteria && (
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4 text-xs">
              <div>
                <h5 className="text-sm font-bold text-[#0D0D11]">Writing Evaluation Criteria</h5>
                <p className="text-neutral-600 mt-0.5">{writingCriteria.note}</p>
                <p className="text-[#E11D2A] font-semibold mt-0.5">{writingCriteria.weighting}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {writingCriteria.criteria.map((cr) => (
                  <div key={cr.name} className="p-3.5 rounded-xl bg-white border border-neutral-200 space-y-1.5">
                    <strong className="text-xs font-bold text-[#0D0D11] block">{cr.name}</strong>
                    <ul className="list-disc list-inside text-neutral-700 space-y-0.5">
                      {cr.whatExaminersLookFor.map((w) => (
                        <li key={w}>{w}</li>
                      ))}
                    </ul>
                    <p className="text-emerald-800 pt-1">
                      <strong>Strong:</strong> {cr.strongPerformance}
                    </p>
                    <p className="text-neutral-600">
                      <strong>Weak:</strong> {cr.weakPerformance}
                    </p>
                  </div>
                ))}
              </div>
              {writingCriteria.selfCheckList?.length > 0 && (
                <div>
                  <strong className="text-[#0D0D11] block mb-1.5">Self-Check List</strong>
                  <ul className="list-disc list-inside space-y-1 text-neutral-700">
                    {writingCriteria.selfCheckList.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Post-Submission Speaking Review & Criteria */}
      {(results.speakingEvaluation ||
        results.speakingEvaluationNotice ||
        hasSavedSpeaking ||
        speakingCriteria) && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-[#E11D2A]" />
              <div>
                <h4 className="text-lg font-bold font-display text-[#0D0D11]">
                  Speaking Review, Playback &amp; Criteria
                </h4>
                <p className="text-xs text-neutral-500">
                  Fluency &amp; Coherence, Lexical Resource, Grammar, and Pronunciation
                </p>
              </div>
            </div>
            {results.speakingEvaluation && (
              <span className="text-xl font-black font-display tabular-nums text-[#E11D2A]">
                Est. Band {results.speakingEvaluation.estimatedBand.toFixed(1)}
              </span>
            )}
          </div>

          {results.speakingEvaluationNotice && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700">
              <Info className="w-4 h-4 text-[#E11D2A] shrink-0 mt-0.5" />
              <span>{results.speakingEvaluationNotice}</span>
            </div>
          )}

          {results.speakingEvaluation && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Fluency & Coherence', score: results.speakingEvaluation.criteria.fluencyCoherence },
                  { label: 'Lexical Resource', score: results.speakingEvaluation.criteria.lexicalResource },
                  { label: 'Grammar Range', score: results.speakingEvaluation.criteria.grammaticalRange },
                  { label: 'Pronunciation', score: results.speakingEvaluation.criteria.pronunciation },
                ].map((c) => (
                  <div key={c.label} className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                    <span className="text-[11px] font-semibold text-neutral-600 block">{c.label}</span>
                    <span className="text-lg font-black font-display tabular-nums text-[#0D0D11]">
                      {c.score.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-neutral-800 leading-relaxed">
                {results.speakingEvaluation.feedback}
              </p>

              {results.speakingEvaluation.transcriptSummary && (
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700">
                  <strong className="text-[#0D0D11] block mb-1">
                    Spoken Response Transcript Summary
                  </strong>
                  <p className="leading-relaxed whitespace-pre-line">
                    {results.speakingEvaluation.transcriptSummary}
                  </p>
                </div>
              )}
            </>
          )}

          {hasSavedSpeaking && (
            <div className="space-y-3">
              <strong className="text-xs uppercase tracking-wider text-neutral-500 block">
                Your Speaking Recordings &amp; Notes
              </strong>
              {(['part1', 'part2', 'part3'] as const).map((pk) => {
                const sub = attempt.answers.speaking?.[pk];
                if (!sub?.audioUrl && !sub?.transcriptNotes?.trim()) return null;
                return (
                  <div key={pk} className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                    {sub.audioUrl && (
                      <AuthAudioPlayer src={sub.audioUrl} label={`${pk.toUpperCase()} Recording`} />
                    )}
                    {sub.transcriptNotes?.trim() && (
                      <p className="text-xs text-neutral-700">
                        <strong className="text-[#0D0D11]">{pk.toUpperCase()} Notes: </strong>
                        {sub.transcriptNotes}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {speakingCriteria && (
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4 text-xs">
              <div>
                <h5 className="text-sm font-bold text-[#0D0D11]">Speaking Evaluation Criteria</h5>
                <p className="text-neutral-600 mt-0.5">{speakingCriteria.note}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {speakingCriteria.criteria.map((cr) => (
                  <div key={cr.name} className="p-3.5 rounded-xl bg-white border border-neutral-200">
                    <strong className="text-xs font-bold text-[#0D0D11] block mb-1">{cr.name}</strong>
                    <p className="text-neutral-700 leading-relaxed">{cr.lookFor}</p>
                  </div>
                ))}
              </div>
              {speakingCriteria.selfReviewChecklist?.length > 0 && (
                <div>
                  <strong className="text-[#0D0D11] block mb-1.5">Self-Review Checklist</strong>
                  <ul className="list-disc list-inside space-y-1 text-neutral-700">
                    {speakingCriteria.selfReviewChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Objective Question-by-Question Review (Listening / Reading) */}
      {results.questionReviews && results.questionReviews.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#E11D2A]" />
              <h4 className="text-lg font-bold font-display text-[#0D0D11]">
                Answer Key &amp; Question Review
              </h4>
            </div>

            <div className="inline-flex p-1 rounded-lg bg-neutral-100 border border-neutral-200">
              {(['all', 'incorrect', 'correct'] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setReviewFilter(f)}
                  className={`px-3 py-1 rounded-md text-xs font-bold capitalize cursor-pointer ${
                    reviewFilter === f ? 'bg-white text-[#0D0D11] shadow-xs' : 'text-neutral-600'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-neutral-200">
            {filteredReviews.map((item) => (
              <div
                key={`${item.module}-${item.questionId}`}
                className="py-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 uppercase">
                      {item.module} Q{item.number}
                    </span>
                    {item.isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Correct
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[#E11D2A]">
                        <XCircle className="w-3.5 h-3.5" />
                        Incorrect
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-[#0D0D11]">{item.prompt}</p>
                  <p className="text-xs text-neutral-600">{item.explanation}</p>
                </div>

                <div className="text-xs sm:text-right shrink-0 space-y-0.5">
                  <div>
                    <span className="text-neutral-500">Your answer: </span>
                    <span
                      className={`font-bold ${
                        item.isCorrect ? 'text-emerald-700' : 'text-[#E11D2A]'
                      }`}
                    >
                      {item.userAnswer}
                    </span>
                  </div>
                  {!item.isCorrect && (
                    <div>
                      <span className="text-neutral-500">Correct: </span>
                      <span className="font-bold text-[#0D0D11]">
                        {item.correctAnswers.join(' / ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
