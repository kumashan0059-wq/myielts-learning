import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  Square,
  RotateCcw,
  Clock,
  CheckCircle2,
  Loader2,
  AlertCircle,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import type { SpeakingData, SpeakingPartSubmission } from '../../../shared/mockTestTypes';
import { useMockTestAuth } from './MockTestAuthContext';
import { AuthAudioPlayer } from './AuthAudioPlayer';

interface SpeakingExamViewProps {
  attemptId: string;
  speaking: SpeakingData;
  submissions: {
    part1?: SpeakingPartSubmission;
    part2?: SpeakingPartSubmission;
    part3?: SpeakingPartSubmission;
  };
  onUpdatePart: (partKey: 'part1' | 'part2' | 'part3', data: SpeakingPartSubmission) => void;
}

type SpeakingPartKey = 'part1' | 'part2' | 'part3';

function formatClock(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export const SpeakingExamView: React.FC<SpeakingExamViewProps> = ({
  attemptId,
  speaking,
  submissions,
  onUpdatePart,
}) => {
  const { apiFetch } = useMockTestAuth();
  const [activePart, setActivePart] = useState<SpeakingPartKey>('part1');
  const [part1Idx, setPart1Idx] = useState(0);
  const [part3Idx, setPart3Idx] = useState(0);

  // Part 2 Cue Card preparation & speaking timers
  const [part2Phase, setPart2Phase] = useState<'idle' | 'prep' | 'speak' | 'done'>('idle');
  const [part2PrepLeft, setPart2PrepLeft] = useState(speaking.part2.prepSeconds || 60);
  const [part2SpeakLeft, setPart2SpeakLeft] = useState(speaking.part2.speakSeconds || 120);

  // Microphone recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recordTimerRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const recordingSecondsRef = useRef(0);

  const cleanupMedia = () => {
    if (recordTimerRef.current) {
      window.clearInterval(recordTimerRef.current);
      recordTimerRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setAudioLevel(0);
  };

  useEffect(() => {
    return () => {
      cleanupMedia();
    };
  }, []);

  // Part 2 Prep & Speaking automated countdown
  useEffect(() => {
    if (part2Phase === 'prep') {
      const id = window.setInterval(() => {
        setPart2PrepLeft((prev) => {
          if (prev <= 1) {
            window.clearInterval(id);
            setPart2Phase('speak');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => window.clearInterval(id);
    }

    if (part2Phase === 'speak') {
      const id = window.setInterval(() => {
        setPart2SpeakLeft((prev) => {
          if (prev <= 1) {
            window.clearInterval(id);
            setPart2Phase('done');
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
              mediaRecorderRef.current.stop();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => window.clearInterval(id);
    }
  }, [part2Phase]);

  const uploadRecordingBlob = async (partKey: SpeakingPartKey, blob: Blob, durationSec: number) => {
    setIsUploading(true);
    setMicError(null);
    try {
      const formData = new FormData();
      const ext = blob.type.includes('wav') ? 'wav' : blob.type.includes('mp4') ? 'm4a' : 'webm';
      formData.append('audio', blob, `${partKey}.${ext}`);
      formData.append('attemptId', attemptId);
      formData.append('partKey', partKey);

      const data = await apiFetch<{
        audioId: string;
        url: string;
        mimeType: string;
      }>('/api/audio/speaking', {
        method: 'POST',
        body: formData,
      });

      onUpdatePart(partKey, {
        ...submissions[partKey],
        audioId: data.audioId,
        audioUrl: data.url,
        mimeType: data.mimeType,
        durationSeconds: durationSec,
      });
    } catch (err) {
      setMicError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  const startRecording = async (partKey: SpeakingPartKey) => {
    setMicError(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setMicError('Microphone recording is not supported in this browser. You may type spoken response notes below.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];

      // Live audio level meter
      const audioCtx = new AudioContext();
      audioCtxRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      const dataArr = new Uint8Array(analyser.frequencyBinCount);

      const updateMeter = () => {
        analyser.getByteFrequencyData(dataArr);
        const avg = dataArr.reduce((a, b) => a + b, 0) / dataArr.length;
        setAudioLevel(Math.min(100, Math.round((avg / 128) * 100)));
        animFrameRef.current = requestAnimationFrame(updateMeter);
      };
      updateMeter();

      const preferredMime = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : '';

      const recorder = preferredMime
        ? new MediaRecorder(stream, { mimeType: preferredMime })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;
      recordingSecondsRef.current = 0;
      setRecordingSeconds(0);

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const finalDuration = Math.max(1, recordingSecondsRef.current);
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        cleanupMedia();
        setIsRecording(false);
        void uploadRecordingBlob(partKey, blob, finalDuration);
      };

      recorder.start(500);
      setIsRecording(true);
      recordTimerRef.current = window.setInterval(() => {
        recordingSecondsRef.current += 1;
        setRecordingSeconds(recordingSecondsRef.current);
      }, 1000);
    } catch {
      cleanupMedia();
      setMicError(
        'Microphone permission denied or no microphone detected. Allow mic access in your browser or enter spoken notes below.'
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const startPart2WithPrep = () => {
    setPart2PrepLeft(speaking.part2.prepSeconds || 60);
    setPart2SpeakLeft(speaking.part2.speakSeconds || 120);
    setPart2Phase('prep');
  };

  const skipPrepAndSpeak = () => {
    setPart2PrepLeft(0);
    setPart2Phase('speak');
    void startRecording('part2');
  };

  const currentSub = submissions[activePart];

  const part1Items: Array<{ label: string; text: string }> = (() => {
    const items: Array<{ label: string; text: string }> = [];
    if (speaking.part1.introQuestions?.length) {
      speaking.part1.introQuestions.forEach((q) => items.push({ label: 'Introduction', text: q }));
    }
    if (speaking.part1.topics?.length) {
      speaking.part1.topics.forEach((t) =>
        t.questions.forEach((q) => items.push({ label: t.topic, text: q }))
      );
    }
    if (items.length === 0) {
      speaking.part1.questions.forEach((q) => items.push({ label: 'Part 1 Prompt', text: q }));
    }
    return items;
  })();

  const part3Items: Array<{ label: string; text: string }> = (() => {
    const items: Array<{ label: string; text: string }> = [];
    if (speaking.part3.themes?.length) {
      speaking.part3.themes.forEach((th) =>
        th.questions.forEach((q) => items.push({ label: th.theme, text: q }))
      );
    }
    if (items.length === 0) {
      speaking.part3.questions.forEach((q) => items.push({ label: 'Discussion Prompt', text: q }));
    }
    return items;
  })();

  const safePart1Idx = Math.min(part1Idx, Math.max(0, part1Items.length - 1));
  const safePart3Idx = Math.min(part3Idx, Math.max(0, part3Items.length - 1));

  return (
    <div className="flex flex-col h-full bg-neutral-50">
      {/* Part Tabs */}
      <div className="bg-white border-b border-neutral-200 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {(['part1', 'part2', 'part3'] as const).map((pk, idx) => {
            const hasRec = Boolean(submissions[pk]?.audioId || submissions[pk]?.transcriptNotes?.trim());
            return (
              <button
                key={pk}
                type="button"
                disabled={isRecording}
                onClick={() => setActivePart(pk)}
                className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap inline-flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 ${
                  activePart === pk
                    ? 'bg-[#0D0D11] text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                <span>Part {idx + 1}</span>
                {hasRec && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
              </button>
            );
          })}
        </div>

        <span className="text-xs text-neutral-500 font-medium">
          Record each part clearly for AI Fluency & Pronunciation scoring
        </span>
      </div>

      {/* Main Speaking Stage */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Prompt Block */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6">
            <div className="flex items-center gap-2 text-xs font-bold text-[#E11D2A] mb-2">
              <MessageSquare className="w-4 h-4" />
              <span>
                {activePart === 'part1'
                  ? speaking.part1.title
                  : activePart === 'part2'
                  ? speaking.part2.title
                  : speaking.part3.title}
              </span>
            </div>

            <p className="text-xs text-neutral-600 mb-4">
              {activePart === 'part1'
                ? speaking.part1.instructions
                : activePart === 'part2'
                ? speaking.part2.instructions
                : speaking.part3.instructions}
            </p>

            {activePart === 'part1' && part1Items.length > 0 && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Topic: <span className="text-[#0D0D11]">{part1Items[safePart1Idx].label}</span>
                  </span>
                  <span className="text-xs font-bold tabular-nums text-[#E11D2A]">
                    Question {safePart1Idx + 1} of {part1Items.length}
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <p className="text-base sm:text-lg font-bold text-[#0D0D11] leading-snug">
                    {part1Items[safePart1Idx].text}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1">
                    {part1Items.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPart1Idx(idx)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold tabular-nums cursor-pointer transition-colors ${
                          idx === safePart1Idx
                            ? 'bg-[#E11D2A] text-white'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={safePart1Idx === 0}
                      onClick={() => setPart1Idx((i) => Math.max(0, i - 1))}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-neutral-300 text-xs font-bold text-[#0D0D11] hover:bg-neutral-50 disabled:opacity-40 cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </button>
                    <button
                      type="button"
                      disabled={safePart1Idx >= part1Items.length - 1}
                      onClick={() => setPart1Idx((i) => Math.min(part1Items.length - 1, i + 1))}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0D0D11] text-xs font-bold text-white hover:bg-neutral-800 disabled:opacity-40 cursor-pointer"
                    >
                      <span>Next Question</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activePart === 'part2' && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-[#0D0D11] text-white">
                  <span className="text-[11px] font-bold text-[#E11D2A] uppercase tracking-wider block mb-1">
                    Candidate Cue Card
                  </span>
                  <h4 className="text-lg font-bold font-display mb-3">
                    {speaking.part2.cueCard.topic}
                  </h4>
                  <p className="text-xs text-neutral-400 mb-2">You should say:</p>
                  <ul className="space-y-1.5 text-sm text-neutral-200 list-disc list-inside">
                    {speaking.part2.cueCard.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  {(speaking.part2.roundingOffQuestions?.length ||
                    speaking.part2.cueCard.followUpQuestion) && (
                    <div className="mt-4 pt-3 border-t border-neutral-800 text-xs text-neutral-300 space-y-1">
                      <span className="font-bold text-white block">Rounding-off Questions:</span>
                      {speaking.part2.roundingOffQuestions?.length ? (
                        <ul className="list-disc list-inside space-y-0.5">
                          {speaking.part2.roundingOffQuestions.map((rq) => (
                            <li key={rq}>{rq}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{speaking.part2.cueCard.followUpQuestion}</p>
                      )}
                    </div>
                  )}
                </div>

                {speaking.part2.tips && speaking.part2.tips.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 space-y-1">
                    <span className="font-bold text-[#0D0D11] block">Part 2 Guidance:</span>
                    <ul className="list-disc list-inside space-y-0.5">
                      {speaking.part2.tips.map((tip) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Part 2 Prep & Speaking Timers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-neutral-500 block">
                        Preparation Timer
                      </span>
                      <span className="text-xl font-black font-display tabular-nums text-[#0D0D11]">
                        {formatClock(part2PrepLeft)}
                      </span>
                    </div>
                    {part2Phase === 'idle' && (
                      <button
                        type="button"
                        onClick={startPart2WithPrep}
                        className="px-3.5 py-2 rounded-lg bg-[#0D0D11] text-white text-xs font-bold cursor-pointer"
                      >
                        Start 1-Min Prep
                      </button>
                    )}
                    {part2Phase === 'prep' && (
                      <button
                        type="button"
                        onClick={skipPrepAndSpeak}
                        className="px-3.5 py-2 rounded-lg bg-[#E11D2A] text-white text-xs font-bold cursor-pointer"
                      >
                        Speak Now
                      </button>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-neutral-500 block">
                        Speaking Timer
                      </span>
                      <span className="text-xl font-black font-display tabular-nums text-[#E11D2A]">
                        {formatClock(part2SpeakLeft)}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-neutral-600 inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {part2Phase === 'speak'
                        ? 'Speaking'
                        : part2Phase === 'done'
                        ? 'Completed'
                        : '2:00 Max'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activePart === 'part3' && part3Items.length > 0 && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Theme: <span className="text-[#0D0D11]">{part3Items[safePart3Idx].label}</span>
                  </span>
                  <span className="text-xs font-bold tabular-nums text-[#E11D2A]">
                    Question {safePart3Idx + 1} of {part3Items.length}
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <p className="text-base sm:text-lg font-bold text-[#0D0D11] leading-snug">
                    {part3Items[safePart3Idx].text}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1">
                    {part3Items.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPart3Idx(idx)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold tabular-nums cursor-pointer transition-colors ${
                          idx === safePart3Idx
                            ? 'bg-[#E11D2A] text-white'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={safePart3Idx === 0}
                      onClick={() => setPart3Idx((i) => Math.max(0, i - 1))}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-neutral-300 text-xs font-bold text-[#0D0D11] hover:bg-neutral-50 disabled:opacity-40 cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </button>
                    <button
                      type="button"
                      disabled={safePart3Idx >= part3Items.length - 1}
                      onClick={() => setPart3Idx((i) => Math.min(part3Items.length - 1, i + 1))}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0D0D11] text-xs font-bold text-white hover:bg-neutral-800 disabled:opacity-40 cursor-pointer"
                    >
                      <span>Next Question</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Microphone Recorder Card */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-[#0D0D11]">
                  Voice Recording — {activePart.toUpperCase()}
                </h4>
                <p className="text-xs text-neutral-600">
                  Press Record, speak your answers aloud, then press Stop to upload and preview playback.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {!isRecording ? (
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={() => startRecording(activePart)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white text-sm font-bold shadow-sm transition-colors cursor-pointer disabled:opacity-60"
                  >
                    <Mic className="w-4 h-4" />
                    <span>{currentSub?.audioUrl ? 'Re-record Answer' : 'Start Recording'}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0D0D11] hover:bg-neutral-800 text-white text-sm font-bold transition-colors cursor-pointer"
                  >
                    <Square className="w-4 h-4 fill-current text-[#E11D2A]" />
                    <span>Stop ({formatClock(recordingSeconds)})</span>
                  </button>
                )}
              </div>
            </div>

            {/* Live Waveform Level Indicator */}
            {isRecording && (
              <div className="p-4 rounded-xl bg-neutral-900 text-white flex items-center gap-4">
                <span className="text-xs font-bold text-[#E11D2A] uppercase tracking-wider shrink-0">
                  Recording
                </span>
                <div className="flex-1 h-3 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#E11D2A] transition-all duration-75"
                    style={{ width: `${Math.max(8, audioLevel)}%` }}
                  />
                </div>
                <span className="font-mono text-xs tabular-nums shrink-0">
                  {formatClock(recordingSeconds)}
                </span>
              </div>
            )}

            {isUploading && (
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700 py-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#E11D2A]" />
                <span>Saving audio recording securely...</span>
              </div>
            )}

            {micError && (
              <div className="flex items-start gap-2 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{micError}</span>
              </div>
            )}

            {/* Playback Saved Recording */}
            {currentSub?.audioUrl && !isRecording && (
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <AuthAudioPlayer
                  src={currentSub.audioUrl}
                  label={`Recorded ${activePart.toUpperCase()} (${formatClock(currentSub.durationSeconds || 0)})`}
                />
                <button
                  type="button"
                  onClick={() => startRecording(activePart)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-[#E11D2A] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Record Again</span>
                </button>
              </div>
            )}

            {/* Optional Written Preparation Notes / Text Fallback */}
            <div className="pt-2 border-t border-neutral-100">
              <label
                htmlFor={`speaking-notes-${activePart}`}
                className="block text-xs font-bold text-neutral-700 mb-1.5"
              >
                {activePart === 'part2'
                  ? 'Cue Card Preparation Notes (optional)'
                  : 'Optional Spoken Notes / Accessibility Transcript'}
              </label>
              <textarea
                id={`speaking-notes-${activePart}`}
                rows={3}
                value={currentSub?.transcriptNotes || ''}
                onChange={(e) =>
                  onUpdatePart(activePart, {
                    ...currentSub,
                    transcriptNotes: e.target.value,
                  })
                }
                placeholder="Jot down keywords or type your spoken response if testing without a microphone..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm text-[#0D0D11] focus:outline-none focus:ring-2 focus:ring-[#E11D2A]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
