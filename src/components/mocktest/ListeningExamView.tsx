import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  Flag,
  Loader2,
  Headphones,
  AlertCircle,
  Sparkles,
  FileText,
  ArrowDown,
} from 'lucide-react';
import type { ListeningSectionData, ListeningRichGroup } from '../../../shared/mockTestTypes';
import { useMockTestAuth } from './MockTestAuthContext';
import { buildApiUrl } from '../../utils/apiClient';

interface ListeningExamViewProps {
  testId: string;
  sections: ListeningSectionData[];
  answers: Record<string, string>;
  flagged: string[];
  onAnswerChange: (questionId: string, value: string) => void;
  onToggleFlag: (questionId: string) => void;
}

function formatTimeSec(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export const ListeningExamView: React.FC<ListeningExamViewProps> = ({
  testId,
  sections,
  answers,
  flagged,
  onAnswerChange,
  onToggleFlag,
}) => {
  const { apiFetch } = useMockTestAuth();
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [sectionAudioUrls, setSectionAudioUrls] = useState<Record<number, string>>(() => {
    const init: Record<number, string> = {};
    sections.forEach((s, idx) => {
      if (s.audioUrl) init[idx] = s.audioUrl;
    });
    return init;
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  // Browser Speech Synthesis TTS narration when no audio file is attached
  const [speechPlaying, setSpeechPlaying] = useState(false);
  const [speechProgress, setSpeechProgress] = useState(0);
  const speechIntervalRef = useRef<number | null>(null);
  const [showTranscriptHelper, setShowTranscriptHelper] = useState<boolean>(
    () => Boolean(sections[0] && sections[0].hasAudioFile === false && !sections[0].audioUrl)
  );

  const activeSection = sections[activeSectionIdx];
  const activeAudioUrl = sectionAudioUrls[activeSectionIdx] || activeSection?.audioUrl;
  const isScriptOnly = activeSection?.hasAudioFile === false && !activeAudioUrl;

  const stopSpeechNarration = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (speechIntervalRef.current) {
      window.clearInterval(speechIntervalRef.current);
      speechIntervalRef.current = null;
    }
    setSpeechPlaying(false);
  };

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setAudioError(null);
    setSpeechProgress(0);
    stopSpeechNarration();
    const cur = sections[activeSectionIdx];
    if (cur && cur.hasAudioFile === false && !sectionAudioUrls[activeSectionIdx] && !cur.audioUrl) {
      setShowTranscriptHelper(true);
    }
  }, [activeSectionIdx, sections, sectionAudioUrls]);

  useEffect(() => {
    return () => {
      stopSpeechNarration();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const handleGenerateTtsAudio = async () => {
    if (!activeSection) return;
    setIsGeneratingAudio(true);
    setAudioError(null);
    try {
      const res = await apiFetch<{ audioUrl: string }>(
        `/api/tests/${testId}/listening-audio/${activeSection.sectionNumber}`,
        { method: 'POST' }
      );
      setSectionAudioUrls((prev) => ({ ...prev, [activeSectionIdx]: res.audioUrl }));
    } catch (err) {
      setAudioError(
        err instanceof Error
          ? err.message
          : 'Could not generate studio WAV audio. Use the provided Section Script or Browser Text-to-Speech below.'
      );
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  const toggleAudioPlay = async () => {
    if (activeAudioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
      return;
    }

    // Browser speech synthesis TTS narration of the written script (clearly labeled as TTS)
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && activeSection?.transcript) {
      if (speechPlaying) {
        stopSpeechNarration();
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(activeSection.transcript);
      utterance.rate = playbackRate;
      utterance.lang = 'en-GB';
      const estimatedSeconds = Math.max(
        20,
        Math.round(activeSection.transcript.split(/\s+/).length / 2.5)
      );
      let elapsed = 0;
      setSpeechPlaying(true);
      setSpeechProgress(0);

      utterance.onend = () => {
        stopSpeechNarration();
        setSpeechProgress(100);
      };
      utterance.onerror = () => {
        stopSpeechNarration();
      };

      window.speechSynthesis.speak(utterance);
      speechIntervalRef.current = window.setInterval(() => {
        elapsed += 1;
        setSpeechProgress(Math.min(99, Math.round((elapsed / estimatedSeconds) * 100)));
      }, 1000);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = parseFloat(e.target.value);
    if (audioRef.current && Number.isFinite(next)) {
      audioRef.current.currentTime = next;
      setCurrentTime(next);
    }
  };

  const jumpToQuestion = (sectionIdx: number, questionId: string) => {
    setActiveSectionIdx(sectionIdx);
    window.setTimeout(() => {
      const el = document.getElementById(`question-block-${questionId}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 60);
  };

  const renderInlineBlankString = (
    text: string,
    qByNumber: Map<number, ListeningRichGroup['questions'][0]>
  ) => {
    const parts = text.split(/(\{\{\d+\}\})/g);
    return (
      <span className="inline-flex flex-wrap items-center gap-1.5 leading-relaxed">
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
              id={`question-block-${qObj.id}`}
              className="inline-flex items-center gap-1 mx-0.5"
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
                className="w-40 sm:w-48 px-2.5 py-1 rounded-lg border border-neutral-300 bg-white text-sm font-semibold text-[#0D0D11] focus:outline-none focus:ring-2 focus:ring-[#E11D2A]"
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

  if (!activeSection) {
    return (
      <div className="p-8 text-center text-sm text-neutral-600">
        No listening sections configured for this test.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-neutral-50">
      {/* Section Tabs + Synchronized Player */}
      <div className="bg-white border-b border-neutral-200 px-4 sm:px-6 py-4 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {sections.map((sec, idx) => {
              const answeredCount = sec.questions.filter(
                (q) => (answers[q.id] || '').trim().length > 0
              ).length;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveSectionIdx(idx)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    idx === activeSectionIdx
                      ? 'bg-[#0D0D11] text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  Section {sec.sectionNumber} · {answeredCount}/{sec.questions.length}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {!activeAudioUrl && (
              <button
                type="button"
                onClick={handleGenerateTtsAudio}
                disabled={isGeneratingAudio}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-semibold text-[#0D0D11] cursor-pointer disabled:opacity-60"
              >
                {isGeneratingAudio ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E11D2A]" />
                    <span>Generating Studio Audio...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-[#E11D2A]" />
                    <span>Generate Studio WAV</span>
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowTranscriptHelper((v) => !v)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{showTranscriptHelper ? 'Hide Script' : 'View Audio Script'}</span>
            </button>
          </div>
        </div>

        {/* Custom Audio / TTS Narrator Bar */}
        <div className="bg-[#0D0D11] text-white rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-4">
          {activeAudioUrl && (
            <audio
              ref={audioRef}
              src={buildApiUrl(activeAudioUrl)}
              onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
              onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
              onEnded={() => setIsPlaying(false)}
              preload="metadata"
            />
          )}

          <button
            type="button"
            onClick={toggleAudioPlay}
            aria-label={isPlaying || speechPlaying ? 'Pause narration' : 'Play narration'}
            className="w-11 h-11 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
          >
            {isPlaying || speechPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-neutral-200 truncate flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5 text-[#E11D2A] shrink-0" />
                {activeSection.title}
                {!activeAudioUrl && (
                  <span className="text-amber-300 font-normal">
                    {' '}
                    · Script Text-to-Speech (No Audio File Attached)
                  </span>
                )}
              </span>
              <span className="font-mono tabular-nums text-neutral-300 shrink-0 ml-2">
                {activeAudioUrl
                  ? `${formatTimeSec(currentTime)} / ${formatTimeSec(
                      duration || activeSection.durationSeconds
                    )}`
                  : `${speechProgress}%`}
              </span>
            </div>

            {activeAudioUrl ? (
              <input
                type="range"
                min={0}
                max={duration || activeSection.durationSeconds || 100}
                step={0.5}
                value={currentTime}
                onChange={handleSeek}
                aria-label="Audio playback progress"
                className="w-full h-2 rounded-full accent-[#E11D2A] cursor-pointer"
              />
            ) : (
              <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                <div
                  className="h-full bg-[#E11D2A] transition-all duration-300"
                  style={{ width: `${speechProgress}%` }}
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Volume2 className="w-4 h-4 text-neutral-400" />
            <select
              aria-label="Playback speed"
              value={playbackRate}
              onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
              className="bg-neutral-800 border border-neutral-700 text-white text-xs font-bold rounded-lg px-2.5 py-1.5 cursor-pointer"
            >
              <option value={0.9}>0.9x</option>
              <option value={1.0}>1.0x</option>
              <option value={1.1}>1.1x</option>
            </select>
          </div>
        </div>

        {isScriptOnly && (
          <div className="flex items-start gap-2 text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
            <span>
              <strong>Script-Based Practice Section:</strong> No pre-recorded audio file is included for this section. Use the complete speaker-by-speaker script below or press Play for Browser Text-to-Speech narration.
            </span>
          </div>
        )}

        {audioError && (
          <div className="flex items-center gap-2 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{audioError}</span>
          </div>
        )}
      </div>

      {/* Main Questions Workspace */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-base font-bold text-[#0D0D11]">{activeSection.title}</h4>
              {activeSection.questionRange && (
                <span className="text-xs font-bold text-[#E11D2A]">
                  Questions {activeSection.questionRange}
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-600 mt-1">{activeSection.context}</p>
            {!activeSection.richGroups && (
              <p className="text-xs font-semibold text-[#E11D2A] mt-2">
                {activeSection.instructions}
              </p>
            )}

            {showTranscriptHelper && (
              <div className="mt-4 pt-4 border-t border-neutral-200 text-xs text-neutral-800 leading-relaxed space-y-2">
                <strong className="block text-[#0D0D11]">
                  Section {activeSection.sectionNumber} Script:
                </strong>
                {activeSection.scriptDialogue && activeSection.scriptDialogue.length > 0 ? (
                  <div className="space-y-2 bg-neutral-50 border border-neutral-200 rounded-xl p-4">
                    {activeSection.scriptDialogue.map((line, i) => (
                      <div key={i} className="leading-relaxed">
                        <span className="font-bold text-[#E11D2A]">{line.speaker}: </span>
                        <span>{line.text}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="whitespace-pre-line bg-neutral-50 border border-neutral-200 rounded-xl p-4">
                    {activeSection.transcript}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Rich Question Groups (for structured IELTS Practice Mock Test) */}
          {activeSection.richGroups && activeSection.richGroups.length > 0 ? (
            <div className="space-y-6">
              {activeSection.richGroups.map((grp) => {
                const qByNumber = new Map<number, ListeningRichGroup['questions'][0]>(
                  grp.questions.map((q) => [q.number, q])
                );

                return (
                  <div
                    key={grp.id}
                    className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 space-y-4"
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

                    {/* 1. Form Completion */}
                    {grp.type === 'form_completion' && grp.formRows && (
                      <div className="rounded-2xl border border-neutral-200 overflow-hidden">
                        {grp.formTitle && (
                          <div className="bg-[#0D0D11] text-white px-4 py-2.5 text-sm font-bold">
                            {grp.formTitle}
                          </div>
                        )}
                        <div className="divide-y divide-neutral-200">
                          {grp.formRows.map((row, rIdx) => (
                            <div
                              key={rIdx}
                              className="grid grid-cols-1 sm:grid-cols-12 gap-2 px-4 py-3 text-sm bg-white odd:bg-neutral-50/40"
                            >
                              <div className="sm:col-span-4 font-bold text-neutral-700">
                                {row.label}
                              </div>
                              <div className="sm:col-span-8 text-[#0D0D11]">
                                {renderInlineBlankString(row.value, qByNumber)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 2. Multiple Choice */}
                    {grp.type === 'multiple_choice' && (
                      <div className="space-y-4">
                        {grp.questions.map((q) => {
                          const currentAns = answers[q.id] ?? '';
                          const isFlagged = flagged.includes(q.id);
                          return (
                            <div
                              key={q.id}
                              id={`question-block-${q.id}`}
                              className="rounded-xl border border-neutral-200 p-4 space-y-3"
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
                                      : 'bg-white border-neutral-200 text-neutral-500 hover:text-[#0D0D11]'
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
                                      className={`flex items-center gap-3 p-2.5 rounded-xl border text-sm cursor-pointer transition-colors ${
                                        selected
                                          ? 'bg-red-50/70 border-[#E11D2A] text-[#0D0D11] font-semibold'
                                          : 'bg-neutral-50 border-neutral-200 text-neutral-800 hover:bg-neutral-100'
                                      }`}
                                    >
                                      <input
                                        type="radio"
                                        name={`listening-${q.id}`}
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

                    {/* 3. Matching */}
                    {grp.type === 'matching' && (
                      <div className="space-y-4">
                        {grp.options && (
                          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                            <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 block mb-2">
                              Options List
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#0D0D11]">
                              {grp.options.map((opt) => (
                                <div key={opt.key}>
                                  <strong className="text-[#E11D2A]">{opt.key}.</strong> {opt.text}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="space-y-2.5">
                          {grp.questions.map((q) => {
                            const currentAns = answers[q.id] ?? '';
                            const isFlagged = flagged.includes(q.id);
                            return (
                              <div
                                key={q.id}
                                id={`question-block-${q.id}`}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-neutral-200 bg-white"
                              >
                                <div className="flex items-center gap-2.5">
                                  <span className="w-7 h-7 rounded-lg bg-[#0D0D11] text-white font-bold text-xs tabular-nums flex items-center justify-center shrink-0">
                                    {q.number}
                                  </span>
                                  <span className="text-sm font-semibold text-[#0D0D11]">
                                    {q.text}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  <select
                                    value={currentAns}
                                    aria-label={`Select option for question ${q.number}`}
                                    onChange={(e) => onAnswerChange(q.id, e.target.value)}
                                    className="px-3 py-2 rounded-lg border border-neutral-300 text-xs font-bold text-[#0D0D11] bg-white focus:outline-none focus:ring-2 focus:ring-[#E11D2A]"
                                  >
                                    <option value="">Select letter...</option>
                                    {grp.options?.map((opt) => (
                                      <option key={opt.key} value={opt.key}>
                                        {opt.key} — {opt.text}
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
                      </div>
                    )}

                    {/* 4. Flow-Chart Completion */}
                    {grp.type === 'flow_chart_completion' && grp.flowChart && (
                      <div className="space-y-2">
                        {grp.flowChart.map((st, idx) => (
                          <React.Fragment key={st.step}>
                            <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/70 flex items-start gap-3">
                              <span className="px-2.5 py-1 rounded-lg bg-[#0D0D11] text-white text-xs font-bold shrink-0">
                                Step {st.step}
                              </span>
                              <div className="text-sm text-[#0D0D11]">
                                {renderInlineBlankString(st.text, qByNumber)}
                              </div>
                            </div>
                            {idx < grp.flowChart!.length - 1 && (
                              <div className="flex justify-center py-0.5 text-neutral-400">
                                <ArrowDown className="w-4 h-4" />
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}

                    {/* 5. Note Completion */}
                    {grp.type === 'note_completion' && grp.notes && (
                      <div className="rounded-2xl border border-neutral-200 p-4 sm:p-5 bg-neutral-50/60 space-y-4">
                        {grp.notesTitle && (
                          <h5 className="text-base font-bold font-display text-[#0D0D11] border-b border-neutral-200 pb-2">
                            {grp.notesTitle}
                          </h5>
                        )}
                        {grp.notes.map((block, bIdx) => (
                          <div key={bIdx} className="space-y-2">
                            <h6 className="text-xs font-black uppercase tracking-wider text-[#E11D2A]">
                              {block.heading}
                            </h6>
                            <ul className="space-y-2 list-disc list-inside text-sm text-[#0D0D11]">
                              {block.items.map((item, iIdx) => (
                                <li key={iIdx} className="leading-relaxed">
                                  {renderInlineBlankString(item, qByNumber)}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Existing Flat Listening Questions Fallback (unchanged) */
            <div className="space-y-4">
              {activeSection.questions.map((q) => {
                const currentAns = answers[q.id] ?? '';
                const isFlagged = flagged.includes(q.id);

                return (
                  <div
                    key={q.id}
                    id={`question-block-${q.id}`}
                    className="bg-white rounded-2xl border border-neutral-200 p-5 transition-colors hover:border-neutral-300"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-lg bg-[#0D0D11] text-white font-bold text-xs tabular-nums flex items-center justify-center shrink-0 mt-0.5">
                          {q.number}
                        </span>
                        <div>
                          {q.contextLabel && (
                            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide block mb-0.5">
                              {q.contextLabel}
                            </span>
                          )}
                          <p className="text-sm font-semibold text-[#0D0D11]">{q.prompt}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onToggleFlag(q.id)}
                        aria-label={`Flag question ${q.number} for review`}
                        className={`p-2 rounded-lg border text-xs font-semibold inline-flex items-center gap-1 shrink-0 cursor-pointer transition-colors ${
                          isFlagged
                            ? 'bg-amber-50 border-amber-300 text-amber-800'
                            : 'bg-white border-neutral-200 text-neutral-500 hover:text-[#0D0D11]'
                        }`}
                      >
                        <Flag className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="pl-10">
                      {(q.type === 'mcq' || q.type === 'matching') && q.options ? (
                        <div className="space-y-2">
                          {q.options.map((opt) => {
                            const selected = currentAns === opt;
                            return (
                              <label
                                key={opt}
                                className={`flex items-center gap-3 p-3 rounded-xl border text-sm cursor-pointer transition-colors ${
                                  selected
                                    ? 'bg-red-50/70 border-[#E11D2A] text-[#0D0D11] font-semibold'
                                    : 'bg-neutral-50 border-neutral-200 text-neutral-800 hover:bg-neutral-100'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`listening-${q.id}`}
                                  checked={selected}
                                  onChange={() => onAnswerChange(q.id, opt)}
                                  className="accent-[#E11D2A]"
                                />
                                <span>{opt}</span>
                              </label>
                            );
                          })}
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={currentAns}
                          onChange={(e) => onAnswerChange(q.id, e.target.value)}
                          placeholder="Type your answer..."
                          className="w-full max-w-md px-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm font-medium text-[#0D0D11] focus:outline-none focus:ring-2 focus:ring-[#E11D2A]"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Question Navigator Strip */}
      <div className="bg-white border-t border-neutral-200 px-4 sm:px-6 py-3">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold text-neutral-500 mr-2">Question Navigator:</span>
          {sections.flatMap((sec, secIdx) =>
            sec.questions.map((q) => {
              const isAnswered = (answers[q.id] || '').trim().length > 0;
              const isFlagged = flagged.includes(q.id);
              const isInActiveSec = secIdx === activeSectionIdx;

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => jumpToQuestion(secIdx, q.id)}
                  className={`w-7 h-7 rounded-md text-[11px] font-bold tabular-nums transition-colors cursor-pointer ${
                    isFlagged
                      ? 'bg-amber-100 text-amber-900 border border-amber-400'
                      : isAnswered
                      ? 'bg-[#0D0D11] text-white'
                      : isInActiveSec
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
