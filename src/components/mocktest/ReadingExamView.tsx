import React, { useState } from 'react';
import { Flag, BookOpen, Highlighter, Type, Info } from 'lucide-react';
import type { ReadingPassageData, ReadingRichGroup } from '../../../shared/mockTestTypes';

interface ReadingExamViewProps {
  passages: ReadingPassageData[];
  answers: Record<string, string>;
  flagged: string[];
  onAnswerChange: (questionId: string, value: string) => void;
  onToggleFlag: (questionId: string) => void;
}

export const ReadingExamView: React.FC<ReadingExamViewProps> = ({
  passages,
  answers,
  flagged,
  onAnswerChange,
  onToggleFlag,
}) => {
  const [activePassageIdx, setActivePassageIdx] = useState(0);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [highlightedParagraphs, setHighlightedParagraphs] = useState<Record<string, boolean>>({});

  const activePassage = passages[activePassageIdx];

  const toggleHighlightPara = (key: string) => {
    setHighlightedParagraphs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const jumpToQuestion = (passageIdx: number, questionId: string) => {
    setActivePassageIdx(passageIdx);
    window.setTimeout(() => {
      const el = document.getElementById(`reading-q-${questionId}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 60);
  };

  const renderInlineBlankString = (
    text: string,
    qByNumber: Map<number, ReadingRichGroup['questions'][0]>
  ) => {
    const parts = text.split(/(\{\{\d+\}\})/g);
    return (
      <span className="inline leading-loose">
        {parts.map((part, idx) => {
          const match = /^\{\{(\d+)\}\}$/.exec(part);
          if (!match) {
            return <span key={idx}>{part}</span>;
          }
          const qNum = Number(match[1]);
          const qObj = qByNumber.get(qNum);
          if (!qObj) return <span key={idx}>{part}</span>;
          const val = answers[qObj.id] ?? '';
          const isFlagged = flagged.includes(qObj.id);

          return (
            <span
              key={qObj.id}
              id={`reading-q-${qObj.id}`}
              className="inline-flex items-center gap-1 mx-1 align-middle"
            >
              <span className="px-1.5 py-0.5 rounded bg-[#0D0D11] text-white font-bold text-[11px] tabular-nums">
                {qNum}
              </span>
              <input
                type="text"
                value={val}
                aria-label={`Question ${qNum}`}
                onChange={(e) => onAnswerChange(qObj.id, e.target.value)}
                placeholder={`Answer ${qNum}`}
                className="w-36 sm:w-44 px-2.5 py-1 rounded-lg border border-neutral-300 bg-white text-sm font-semibold text-[#0D0D11] focus:outline-none focus:ring-2 focus:ring-[#E11D2A]"
              />
              <button
                type="button"
                onClick={() => onToggleFlag(qObj.id)}
                title={`Flag question ${qNum}`}
                className={`p-1 rounded border cursor-pointer ${
                  isFlagged
                    ? 'bg-amber-50 border-amber-300 text-amber-800'
                    : 'bg-white border-neutral-200 text-neutral-400 hover:text-[#0D0D11]'
                }`}
              >
                <Flag className="w-3 h-3" />
              </button>
            </span>
          );
        })}
      </span>
    );
  };

  if (!activePassage) {
    return (
      <div className="p-8 text-center text-sm text-neutral-600">
        No reading passages configured for this test.
      </div>
    );
  }

  const textSizeClass =
    fontSize === 'sm'
      ? 'text-sm leading-relaxed'
      : fontSize === 'lg'
      ? 'text-lg leading-relaxed'
      : 'text-[15px] leading-relaxed';

  return (
    <div className="flex flex-col h-full bg-neutral-50">
      {/* Passage Tabs & Reading Controls */}
      <div className="bg-white border-b border-neutral-200 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {passages.map((p, idx) => {
            const answeredCount = p.questions.filter(
              (q) => (answers[q.id] || '').trim().length > 0
            ).length;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePassageIdx(idx)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  idx === activePassageIdx
                    ? 'bg-[#0D0D11] text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Passage {p.passageNumber} · {answeredCount}/{p.questions.length}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-neutral-500 hidden sm:inline">
            Click a paragraph badge to highlight
          </span>
          <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-neutral-100 border border-neutral-200">
            <Type className="w-3.5 h-3.5 text-neutral-500 mx-1" />
            {(['sm', 'base', 'lg'] as const).map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => setFontSize(sz)}
                className={`px-2 py-1 rounded text-[11px] font-bold uppercase cursor-pointer ${
                  fontSize === sz ? 'bg-white text-[#0D0D11] shadow-xs' : 'text-neutral-600'
                }`}
              >
                {sz === 'sm' ? 'A-' : sz === 'base' ? 'A' : 'A+'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Split-Screen Passage & Questions */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12">
        {/* Left Pane: Reading Passage */}
        <div className="lg:col-span-6 h-full overflow-y-auto bg-white lg:border-r border-b lg:border-b-0 border-neutral-200 p-5 sm:p-7">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2 text-xs font-bold text-[#E11D2A] mb-2">
              <BookOpen className="w-4 h-4" />
              <span>{activePassage.subtitle}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#0D0D11] mb-3">
              {activePassage.title}
            </h3>

            {activePassage.note && (
              <div className="mb-4 flex items-start gap-2 p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600">
                <Info className="w-4 h-4 text-[#E11D2A] shrink-0 mt-0.5" />
                <span>{activePassage.note}</span>
              </div>
            )}

            <div className="space-y-4">
              {activePassage.paragraphs.map((para) => {
                const pKey = `${activePassage.id}-${para.label}`;
                const isHighlighted = Boolean(highlightedParagraphs[pKey]);
                return (
                  <div
                    key={para.label}
                    className={`p-3.5 rounded-xl transition-colors ${
                      isHighlighted ? 'bg-amber-50/90 border border-amber-200' : 'bg-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => toggleHighlightPara(pKey)}
                        title="Toggle paragraph highlight"
                        className={`px-2 py-0.5 rounded text-xs font-bold shrink-0 mt-0.5 cursor-pointer inline-flex items-center gap-1 ${
                          isHighlighted
                            ? 'bg-amber-300 text-amber-950'
                            : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                        }`}
                      >
                        <span>{para.label}</span>
                        <Highlighter className="w-3 h-3 opacity-70" />
                      </button>
                      <p className={`text-neutral-800 ${textSizeClass}`}>{para.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {activePassage.headingOptions && activePassage.headingOptions.length > 0 && (
              <div className="mt-6 p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                <h4 className="text-xs font-bold text-[#0D0D11] uppercase tracking-wider mb-2">
                  List of Headings
                </h4>
                <ul className="space-y-1.5 text-xs text-neutral-700">
                  {activePassage.headingOptions.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: Questions */}
        <div className="lg:col-span-6 h-full overflow-y-auto p-5 sm:p-7">
          <div className="max-w-2xl mx-auto space-y-5">
            <div className="bg-white rounded-xl border border-neutral-200 p-4">
              <p className="text-xs font-semibold text-[#E11D2A]">
                {activePassage.instructions}
              </p>
            </div>

            {activePassage.richGroups && activePassage.richGroups.length > 0 ? (
              activePassage.richGroups.map((grp) => {
                const qByNumber = new Map<number, ReadingRichGroup['questions'][0]>(
                  grp.questions.map((q) => [q.number, q])
                );

                return (
                  <div
                    key={grp.id}
                    className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4"
                  >
                    <div className="border-b border-neutral-100 pb-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-black uppercase tracking-wider text-[#E11D2A]">
                          Questions {grp.questionRange}
                        </span>
                        {grp.wordLimit && (
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-red-50 text-[#E11D2A] border border-red-200">
                            {grp.wordLimit}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-[#0D0D11]">
                        {grp.instructions}
                      </p>
                    </div>

                    {/* TFNG / YNNG */}
                    {(grp.type === 'true_false_not_given' || grp.type === 'yes_no_not_given') && (
                      <div className="space-y-3">
                        {grp.questions.map((q) => {
                          const choices =
                            grp.type === 'true_false_not_given'
                              ? ['TRUE', 'FALSE', 'NOT GIVEN']
                              : ['YES', 'NO', 'NOT GIVEN'];
                          const currentAns = answers[q.id] ?? '';
                          const isFlagged = flagged.includes(q.id);

                          return (
                            <div
                              key={q.id}
                              id={`reading-q-${q.id}`}
                              className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/40 space-y-2.5"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-2.5">
                                  <span className="w-7 h-7 rounded-lg bg-[#0D0D11] text-white font-bold text-xs tabular-nums flex items-center justify-center shrink-0">
                                    {q.number}
                                  </span>
                                  <p className="text-sm font-semibold text-[#0D0D11]">{q.text}</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => onToggleFlag(q.id)}
                                  className={`p-1.5 rounded-lg border shrink-0 cursor-pointer ${
                                    isFlagged
                                      ? 'bg-amber-50 border-amber-300 text-amber-800'
                                      : 'bg-white border-neutral-200 text-neutral-500'
                                  }`}
                                >
                                  <Flag className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="pl-9 flex flex-wrap gap-2">
                                {choices.map((opt) => {
                                  const selected = currentAns === opt;
                                  return (
                                    <label
                                      key={opt}
                                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold cursor-pointer ${
                                        selected
                                          ? 'bg-red-50 border-[#E11D2A] text-[#0D0D11]'
                                          : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                                      }`}
                                    >
                                      <input
                                        type="radio"
                                        name={`reading-${q.id}`}
                                        checked={selected}
                                        onChange={() => onAnswerChange(q.id, opt)}
                                        className="accent-[#E11D2A]"
                                      />
                                      <span>{opt}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Sentence Completion */}
                    {grp.type === 'sentence_completion' && (
                      <div className="space-y-3">
                        {grp.questions.map((q) => (
                          <div
                            key={q.id}
                            className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/40 text-sm text-[#0D0D11]"
                          >
                            {renderInlineBlankString(q.text || '', qByNumber)}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Multiple Choice */}
                    {grp.type === 'multiple_choice' && (
                      <div className="space-y-4">
                        {grp.questions.map((q) => {
                          const currentAns = answers[q.id] ?? '';
                          const isFlagged = flagged.includes(q.id);
                          return (
                            <div
                              key={q.id}
                              id={`reading-q-${q.id}`}
                              className="p-4 rounded-xl border border-neutral-200 space-y-2.5"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-2.5">
                                  <span className="w-7 h-7 rounded-lg bg-[#0D0D11] text-white font-bold text-xs tabular-nums flex items-center justify-center shrink-0">
                                    {q.number}
                                  </span>
                                  <p className="text-sm font-semibold text-[#0D0D11]">{q.text}</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => onToggleFlag(q.id)}
                                  className={`p-1.5 rounded-lg border shrink-0 cursor-pointer ${
                                    isFlagged
                                      ? 'bg-amber-50 border-amber-300 text-amber-800'
                                      : 'bg-white border-neutral-200 text-neutral-500'
                                  }`}
                                >
                                  <Flag className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="pl-9 space-y-2">
                                {q.options?.map((opt) => {
                                  const selected = currentAns === opt.key;
                                  return (
                                    <label
                                      key={opt.key}
                                      className={`flex items-center gap-3 p-2.5 rounded-xl border text-xs sm:text-sm cursor-pointer ${
                                        selected
                                          ? 'bg-red-50 border-[#E11D2A] text-[#0D0D11] font-semibold'
                                          : 'bg-neutral-50 border-neutral-200 text-neutral-800 hover:bg-neutral-100'
                                      }`}
                                    >
                                      <input
                                        type="radio"
                                        name={`reading-${q.id}`}
                                        checked={selected}
                                        onChange={() => onAnswerChange(q.id, opt.key)}
                                        className="accent-[#E11D2A]"
                                      />
                                      <span>
                                        <strong>{opt.key}.</strong> {opt.text}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Matching Headings */}
                    {grp.type === 'matching_headings' && (
                      <div className="space-y-3">
                        {grp.headings && (
                          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-1">
                            <span className="font-bold uppercase text-neutral-600 block mb-1">
                              Headings
                            </span>
                            {grp.headings.map((h) => (
                              <div key={h.key}>
                                <strong className="text-[#E11D2A]">{h.key}.</strong> {h.text}
                              </div>
                            ))}
                          </div>
                        )}
                        {grp.questions.map((q) => {
                          const currentAns = answers[q.id] ?? '';
                          const isFlagged = flagged.includes(q.id);
                          return (
                            <div
                              key={q.id}
                              id={`reading-q-${q.id}`}
                              className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-neutral-200"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="w-7 h-7 rounded-lg bg-[#0D0D11] text-white font-bold text-xs tabular-nums flex items-center justify-center shrink-0">
                                  {q.number}
                                </span>
                                <span className="text-sm font-bold text-[#0D0D11]">
                                  {q.paragraph || `Paragraph ${q.number}`}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <select
                                  value={currentAns}
                                  onChange={(e) => onAnswerChange(q.id, e.target.value)}
                                  className="max-w-[240px] px-3 py-2 rounded-lg border border-neutral-300 text-xs font-bold text-[#0D0D11] bg-white focus:outline-none focus:ring-2 focus:ring-[#E11D2A]"
                                >
                                  <option value="">Select heading...</option>
                                  {grp.headings?.map((h) => (
                                    <option key={h.key} value={h.key}>
                                      {h.key}. {h.text}
                                    </option>
                                  ))}
                                </select>
                                <button
                                  type="button"
                                  onClick={() => onToggleFlag(q.id)}
                                  className={`p-1.5 rounded-lg border cursor-pointer ${
                                    isFlagged
                                      ? 'bg-amber-50 border-amber-300 text-amber-800'
                                      : 'bg-white border-neutral-200 text-neutral-500'
                                  }`}
                                >
                                  <Flag className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Matching Information */}
                    {grp.type === 'matching_information' && (
                      <div className="space-y-3">
                        {grp.questions.map((q) => {
                          const currentAns = answers[q.id] ?? '';
                          const isFlagged = flagged.includes(q.id);
                          return (
                            <div
                              key={q.id}
                              id={`reading-q-${q.id}`}
                              className="p-3.5 rounded-xl border border-neutral-200 space-y-2.5"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-2.5">
                                  <span className="w-7 h-7 rounded-lg bg-[#0D0D11] text-white font-bold text-xs tabular-nums flex items-center justify-center shrink-0">
                                    {q.number}
                                  </span>
                                  <p className="text-sm font-medium text-[#0D0D11]">{q.text}</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => onToggleFlag(q.id)}
                                  className={`p-1.5 rounded-lg border shrink-0 cursor-pointer ${
                                    isFlagged
                                      ? 'bg-amber-50 border-amber-300 text-amber-800'
                                      : 'bg-white border-neutral-200 text-neutral-500'
                                  }`}
                                >
                                  <Flag className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <div className="pl-9 flex flex-wrap gap-1.5">
                                {(grp.paragraphOptions || ['A', 'B', 'C', 'D', 'E', 'F']).map(
                                  (letter) => (
                                    <button
                                      key={letter}
                                      type="button"
                                      onClick={() => onAnswerChange(q.id, letter)}
                                      className={`w-9 h-8 rounded-lg border text-xs font-bold cursor-pointer transition-colors ${
                                        currentAns === letter
                                          ? 'bg-[#E11D2A] border-[#E11D2A] text-white'
                                          : 'bg-neutral-50 border-neutral-200 text-neutral-800 hover:bg-neutral-100'
                                      }`}
                                    >
                                      {letter}
                                    </button>
                                  )
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Table Completion */}
                    {grp.type === 'table_completion' && grp.table && (
                      <div className="overflow-x-auto rounded-xl border border-neutral-200">
                        <table className="w-full text-left text-xs sm:text-sm">
                          <thead className="bg-[#0D0D11] text-white">
                            <tr>
                              {grp.table.headers.map((h, i) => (
                                <th key={i} className="py-2.5 px-3 font-bold">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-200">
                            {grp.table.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="bg-white odd:bg-neutral-50/50">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="py-2.5 px-3 align-top text-neutral-800">
                                    {renderInlineBlankString(cell, qByNumber)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Matching Features */}
                    {grp.type === 'matching_features' && (
                      <div className="space-y-3">
                        {grp.options && (
                          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-1">
                            <span className="font-bold uppercase text-neutral-600 block mb-1">
                              List of Researchers
                            </span>
                            {grp.options.map((opt) => (
                              <div key={opt.key}>
                                <strong className="text-[#E11D2A]">{opt.key}.</strong> {opt.text}
                              </div>
                            ))}
                          </div>
                        )}
                        {grp.questions.map((q) => {
                          const currentAns = answers[q.id] ?? '';
                          const isFlagged = flagged.includes(q.id);
                          return (
                            <div
                              key={q.id}
                              id={`reading-q-${q.id}`}
                              className="p-3.5 rounded-xl border border-neutral-200 space-y-2.5"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-2.5">
                                  <span className="w-7 h-7 rounded-lg bg-[#0D0D11] text-white font-bold text-xs tabular-nums flex items-center justify-center shrink-0">
                                    {q.number}
                                  </span>
                                  <p className="text-sm font-medium text-[#0D0D11]">{q.text}</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => onToggleFlag(q.id)}
                                  className={`p-1.5 rounded-lg border shrink-0 cursor-pointer ${
                                    isFlagged
                                      ? 'bg-amber-50 border-amber-300 text-amber-800'
                                      : 'bg-white border-neutral-200 text-neutral-500'
                                  }`}
                                >
                                  <Flag className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <div className="pl-9 flex flex-wrap gap-2">
                                {grp.options?.map((opt) => (
                                  <button
                                    key={opt.key}
                                    type="button"
                                    onClick={() => onAnswerChange(q.id, opt.key)}
                                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold cursor-pointer transition-colors ${
                                      currentAns === opt.key
                                        ? 'bg-[#E11D2A] border-[#E11D2A] text-white'
                                        : 'bg-neutral-50 border-neutral-200 text-neutral-800 hover:bg-neutral-100'
                                    }`}
                                  >
                                    {opt.key}
                                  </button>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Summary Completion */}
                    {grp.type === 'summary_completion' && grp.summaryText && (
                      <div className="p-4 sm:p-5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm text-[#0D0D11]">
                        {renderInlineBlankString(grp.summaryText, qByNumber)}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              /* Existing Flat Reading Questions Fallback (unchanged) */
              activePassage.questions.map((q) => {
                const currentAns = answers[q.id] ?? '';
                const isFlagged = flagged.includes(q.id);

                return (
                  <div
                    key={q.id}
                    id={`reading-q-${q.id}`}
                    className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-lg bg-[#0D0D11] text-white font-bold text-xs tabular-nums flex items-center justify-center shrink-0 mt-0.5">
                          {q.number}
                        </span>
                        <p className="text-sm font-semibold text-[#0D0D11]">{q.prompt}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => onToggleFlag(q.id)}
                        aria-label={`Flag question ${q.number} for review`}
                        className={`p-1.5 rounded-lg border shrink-0 cursor-pointer ${
                          isFlagged
                            ? 'bg-amber-50 border-amber-300 text-amber-800'
                            : 'bg-white border-neutral-200 text-neutral-500 hover:text-[#0D0D11]'
                        }`}
                      >
                        <Flag className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="pl-10">
                      {q.type === 'sentence_completion' ? (
                        <input
                          type="text"
                          value={currentAns}
                          onChange={(e) => onAnswerChange(q.id, e.target.value)}
                          placeholder="Type your answer..."
                          className="w-full max-w-sm px-3.5 py-2 rounded-xl border border-neutral-300 text-sm text-[#0D0D11] focus:outline-none focus:ring-2 focus:ring-[#E11D2A]"
                        />
                      ) : q.type === 'matching_headings' && q.options ? (
                        <select
                          value={currentAns}
                          onChange={(e) => onAnswerChange(q.id, e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium text-[#0D0D11] bg-white focus:outline-none focus:ring-2 focus:ring-[#E11D2A]"
                        >
                          <option value="">Select heading...</option>
                          {q.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : q.options ? (
                        <div className="flex flex-wrap gap-2">
                          {q.options.map((opt) => {
                            const selected = currentAns === opt;
                            return (
                              <label
                                key={opt}
                                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs sm:text-sm cursor-pointer transition-colors ${
                                  selected
                                    ? 'bg-red-50 border-[#E11D2A] text-[#0D0D11] font-bold'
                                    : 'bg-neutral-50 border-neutral-200 text-neutral-800 hover:bg-neutral-100'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`reading-${q.id}`}
                                  checked={selected}
                                  onChange={() => onAnswerChange(q.id, opt)}
                                  className="accent-[#E11D2A]"
                                />
                                <span>{opt}</span>
                              </label>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Bottom Question Navigator */}
      <div className="bg-white border-t border-neutral-200 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold text-neutral-500 mr-2">Question Review:</span>
          {passages.flatMap((p, pIdx) =>
            p.questions.map((q) => {
              const isAnswered = (answers[q.id] || '').trim().length > 0;
              const isFlagged = flagged.includes(q.id);
              const isInActivePassage = pIdx === activePassageIdx;

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => jumpToQuestion(pIdx, q.id)}
                  className={`w-7 h-7 rounded-md text-[11px] font-bold tabular-nums transition-colors cursor-pointer ${
                    isFlagged
                      ? 'bg-amber-100 text-amber-900 border border-amber-400'
                      : isAnswered
                      ? 'bg-[#0D0D11] text-white'
                      : isInActivePassage
                      ? 'bg-red-50 text-[#E11D2A] border border-red-200'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {q.number}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
