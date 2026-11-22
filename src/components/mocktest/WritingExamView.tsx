import React, { useState } from 'react';
import { PenTool, Save, CheckCircle2, Clock, FileText } from 'lucide-react';
import type { WritingTaskData, WritingTaskSubmission } from '../../../shared/mockTestTypes';

interface WritingExamViewProps {
  tasks: WritingTaskData[];
  task1: WritingTaskSubmission;
  task2: WritingTaskSubmission;
  onChangeTask: (taskNumber: 1 | 2, text: string, wordCount: number) => void;
  onSaveDraft: () => Promise<void>;
  isSavingDraft: boolean;
  lastSavedAt: string | null;
}

function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

export const WritingExamView: React.FC<WritingExamViewProps> = ({
  tasks,
  task1,
  task2,
  onChangeTask,
  onSaveDraft,
  isSavingDraft,
  lastSavedAt,
}) => {
  const [activeTaskNum, setActiveTaskNum] = useState<1 | 2>(1);

  const activeTask = tasks.find((t) => t.taskNumber === activeTaskNum) || tasks[0];
  const currentSub = activeTaskNum === 1 ? task1 : task2;
  const wordCount = currentSub?.wordCount ?? countWords(currentSub?.text || '');
  const minWords = activeTask?.minWords ?? (activeTaskNum === 1 ? 150 : 250);
  const meetsMinimum = wordCount >= minWords;

  if (!activeTask) {
    return (
      <div className="p-8 text-center text-sm text-neutral-600">
        No writing tasks configured for this test.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-neutral-50">
      {/* Task Switcher & Save Draft Header */}
      <div className="bg-white border-b border-neutral-200 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {tasks.map((t) => {
            const sub = t.taskNumber === 1 ? task1 : task2;
            const wc = sub?.wordCount ?? 0;
            const active = t.taskNumber === activeTaskNum;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTaskNum(t.taskNumber)}
                className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#0D0D11] text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Task {t.taskNumber} · <span className="tabular-nums">{wc}/{t.minWords}w</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {lastSavedAt && (
            <span className="text-[11px] text-neutral-500 hidden sm:inline tabular-nums">
              Draft saved at {new Date(lastSavedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          )}
          <button
            type="button"
            onClick={onSaveDraft}
            disabled={isSavingDraft}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-bold text-[#0D0D11] cursor-pointer disabled:opacity-60"
          >
            <Save className="w-3.5 h-3.5 text-[#E11D2A]" />
            <span>{isSavingDraft ? 'Saving...' : 'Save Draft'}</span>
          </button>
        </div>
      </div>

      {/* Split-Screen Prompt & Writing Editor */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12">
        {/* Left: Task Prompt & Visual Chart */}
        <div className="lg:col-span-5 h-full overflow-y-auto bg-white lg:border-r border-b lg:border-b-0 border-neutral-200 p-5 sm:p-7">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs font-semibold text-neutral-600">
              <span className="inline-flex items-center gap-1 text-[#E11D2A] font-bold">
                <FileText className="w-4 h-4" />
                {activeTask.title}
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 tabular-nums">
                <Clock className="w-3.5 h-3.5" />
                {activeTask.recommendedMinutes} mins recommended
              </span>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed bg-neutral-50 p-3.5 rounded-xl border border-neutral-200">
              {activeTask.instructions}
            </p>

            <div className="text-sm sm:text-base font-medium text-[#0D0D11] leading-relaxed whitespace-pre-line">
              {activeTask.prompt}
            </div>

            {/* Academic Task 1 Chart Visualization (legacy 2-series format) */}
            {activeTask.visualData && (
              <div className="mt-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                <p className="text-xs font-bold text-[#0D0D11] mb-3">
                  {activeTask.visualData.caption}
                </p>

                <div className="flex items-center gap-4 text-[11px] font-semibold mb-3">
                  <span className="inline-flex items-center gap-1.5 text-neutral-700">
                    <span className="w-3 h-3 rounded-xs bg-[#0D0D11] inline-block" />
                    {activeTask.visualData.seriesALabel}
                  </span>
                  {activeTask.visualData.seriesBLabel && (
                    <span className="inline-flex items-center gap-1.5 text-neutral-700">
                      <span className="w-3 h-3 rounded-xs bg-[#E11D2A] inline-block" />
                      {activeTask.visualData.seriesBLabel}
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  {activeTask.visualData.bars.map((bar) => (
                    <div key={bar.label} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-neutral-800">
                        <span>{bar.label}</span>
                        <span className="tabular-nums text-neutral-600">
                          {bar.valueA}
                          {activeTask.visualData?.unit}
                          {bar.valueB !== undefined ? ` → ${bar.valueB}${activeTask.visualData?.unit}` : ''}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="w-full h-2.5 bg-neutral-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#0D0D11] rounded-full"
                            style={{ width: `${Math.min(100, bar.valueA)}%` }}
                          />
                        </div>
                        {bar.valueB !== undefined && (
                          <div className="w-full h-2.5 bg-neutral-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#E11D2A] rounded-full"
                              style={{ width: `${Math.min(100, bar.valueB)}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Academic Task 1 Multi-Series Grouped Bar Chart & Data Table */}
            {activeTask.chartData && (
              <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#0D0D11]">
                    {activeTask.chartData.title}
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Unit: {activeTask.chartData.yAxisLabel}
                  </p>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold">
                  {activeTask.chartData.series.map((ser, sIdx) => {
                    const colorClass =
                      sIdx === 0 ? 'bg-neutral-500' : sIdx === 1 ? 'bg-[#0D0D11]' : 'bg-[#E11D2A]';
                    return (
                      <span key={ser.name} className="inline-flex items-center gap-1.5 text-neutral-800">
                        <span className={`w-3 h-3 rounded-xs inline-block ${colorClass}`} />
                        {ser.name}
                      </span>
                    );
                  })}
                </div>

                {/* Horizontal Grouped Percentage Bars */}
                <div className="space-y-3.5">
                  {activeTask.chartData.categories.map((cat, cIdx) => {
                    const maxVal = Math.max(
                      10,
                      ...activeTask.chartData!.series.flatMap((s) => s.values)
                    );
                    return (
                      <div key={cat} className="space-y-1.5">
                        <div className="text-xs font-bold text-[#0D0D11]">{cat}</div>
                        <div className="space-y-1">
                          {activeTask.chartData!.series.map((ser, sIdx) => {
                            const val = ser.values[cIdx] ?? 0;
                            const pctWidth = Math.min(100, Math.round((val / Math.max(60, maxVal)) * 100));
                            const barColor =
                              sIdx === 0 ? 'bg-neutral-500' : sIdx === 1 ? 'bg-[#0D0D11]' : 'bg-[#E11D2A]';
                            return (
                              <div key={ser.name} className="flex items-center gap-2">
                                <span className="w-10 text-[11px] font-semibold text-neutral-600 tabular-nums shrink-0">
                                  {ser.name}
                                </span>
                                <div className="flex-1 h-2.5 bg-neutral-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${barColor}`}
                                    style={{ width: `${pctWidth}%` }}
                                  />
                                </div>
                                <span className="w-10 text-right text-[11px] font-bold text-[#0D0D11] tabular-nums shrink-0">
                                  {val}%
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {activeTask.chartData.note && (
                  <p className="text-[11px] text-neutral-500 pt-2 border-t border-neutral-200">
                    {activeTask.chartData.note}
                  </p>
                )}
              </div>
            )}

            {activeTask.essayType && (
              <div className="text-xs font-semibold text-neutral-600 bg-neutral-50 px-3.5 py-2 rounded-xl border border-neutral-200">
                Essay Type: <span className="text-[#0D0D11] font-bold">{activeTask.essayType}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Distraction-Free Editor */}
        <div className="lg:col-span-7 h-full flex flex-col p-5 sm:p-7">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0D0D11]">
              <PenTool className="w-4 h-4 text-[#E11D2A]" />
              <span>Your Response — Task {activeTaskNum}</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold tabular-nums">
              {meetsMinimum ? (
                <span className="inline-flex items-center gap-1 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {wordCount} words (Min {minWords} met)
                </span>
              ) : (
                <span className="text-neutral-600">
                  <span className="text-[#E11D2A]">{wordCount}</span> / {minWords} minimum words
                </span>
              )}
            </div>
          </div>

          <textarea
            value={currentSub?.text || ''}
            onChange={(e) => {
              const nextText = e.target.value;
              onChangeTask(activeTaskNum, nextText, countWords(nextText));
            }}
            placeholder={`Begin writing your Task ${activeTaskNum} response here...`}
            spellCheck={false}
            className="flex-1 w-full min-h-[340px] p-5 rounded-2xl border border-neutral-300 bg-white text-[15px] leading-relaxed text-[#0D0D11] resize-none focus:outline-none focus:ring-2 focus:ring-[#E11D2A]"
          />

          <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-500">
            <span>Spellcheck disabled to simulate official computer-delivered IELTS conditions.</span>
            <span className="tabular-nums">{(currentSub?.text || '').length} characters</span>
          </div>
        </div>
      </div>
    </div>
  );
};
