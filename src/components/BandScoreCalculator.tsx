import React, { useMemo, useState } from 'react';
import {
  Headphones,
  Eye,
  PenTool,
  MessageSquare,
  Minus,
  Plus,
  RotateCcw,
  Calculator,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface BandScoreCalculatorProps {
  track?: 'academic' | 'general';
  onOpenBatch: () => void;
}

type ModuleKey = 'listening' | 'reading' | 'writing' | 'speaking';

interface ModuleConfig {
  key: ModuleKey;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
}

const MODULES: ModuleConfig[] = [
  {
    key: 'listening',
    label: 'Listening',
    subtitle: '40 questions · 30 mins',
    icon: <Headphones className="w-4 h-4" />,
  },
  {
    key: 'reading',
    label: 'Reading',
    subtitle: '40 questions · 60 mins',
    icon: <Eye className="w-4 h-4" />,
  },
  {
    key: 'writing',
    label: 'Writing',
    subtitle: 'Task 1 & Task 2 · 60 mins',
    icon: <PenTool className="w-4 h-4" />,
  },
  {
    key: 'speaking',
    label: 'Speaking',
    subtitle: '3-part interview · 11–14 mins',
    icon: <MessageSquare className="w-4 h-4" />,
  },
];

const BAND_OPTIONS: number[] = Array.from({ length: 19 }, (_, idx) => idx * 0.5);

const DEFAULT_SCORES: Record<ModuleKey, number> = {
  listening: 7.5,
  reading: 7.0,
  writing: 6.5,
  speaking: 7.0,
};

const PRESETS: { label: string; scores: Record<ModuleKey, number> }[] = [
  {
    label: 'Target 6.5',
    scores: { listening: 6.5, reading: 6.5, writing: 6.0, speaking: 6.5 },
  },
  {
    label: 'Target 7.0',
    scores: { listening: 7.5, reading: 7.0, writing: 6.5, speaking: 7.0 },
  },
  {
    label: 'Target 8.0',
    scores: { listening: 8.5, reading: 8.0, writing: 7.5, speaking: 8.0 },
  },
];

/**
 * Official IELTS rounding using exact integer half-band units:
 * - .25 and .75 round UP to the next .5 or whole band
 * - .125 and .625 round DOWN to .0 or .5
 * - .375 and .875 round UP to .5 or next whole band
 */
function calculateOfficialBand(scores: Record<ModuleKey, number>) {
  const halfUnits =
    Math.round(scores.listening * 2) +
    Math.round(scores.reading * 2) +
    Math.round(scores.writing * 2) +
    Math.round(scores.speaking * 2);

  const rawAverage = halfUnits / 8;
  const baseWhole = Math.floor(halfUnits / 8);
  const rem = halfUnits % 8;

  let overall = baseWhole;
  let roundingNote = 'Exact band average';

  if (rem === 1) {
    overall = baseWhole;
    roundingNote = 'Ends in .125 — rounds down to nearest whole band';
  } else if (rem === 2) {
    overall = baseWhole + 0.5;
    roundingNote = 'Ends in .25 — rounds up to .5 per IELTS rules';
  } else if (rem === 3) {
    overall = baseWhole + 0.5;
    roundingNote = 'Ends in .375 — rounds up to .5';
  } else if (rem === 4) {
    overall = baseWhole + 0.5;
    roundingNote = 'Exact half-band average';
  } else if (rem === 5) {
    overall = baseWhole + 0.5;
    roundingNote = 'Ends in .625 — rounds down to .5';
  } else if (rem === 6) {
    overall = baseWhole + 1;
    roundingNote = 'Ends in .75 — rounds up to next whole band per IELTS rules';
  } else if (rem === 7) {
    overall = baseWhole + 1;
    roundingNote = 'Ends in .875 — rounds up to next whole band';
  }

  return {
    rawAverage,
    overall: Math.min(9, Math.max(0, overall)),
    roundingNote,
  };
}

function getBandDescriptor(band: number) {
  if (band >= 8.5) {
    return {
      title: band === 9 ? 'Expert User' : 'Very Good User',
      cefr: 'CEFR C2',
      summary: 'Full operational command of English; eligible for top global universities and maximum Express Entry language points.',
    };
  }
  if (band >= 7.5) {
    return {
      title: 'Very Good User',
      cefr: 'CEFR C1',
      summary: 'Handles complex academic reasoning accurately; competitive for Russell Group, Group of Eight, and merit scholarships.',
    };
  }
  if (band >= 7.0) {
    return {
      title: 'Good User',
      cefr: 'CEFR C1',
      summary: 'Operational command with occasional inaccuracies; meets standard postgraduate and skilled migration cutoffs.',
    };
  }
  if (band >= 6.0) {
    return {
      title: 'Competent User',
      cefr: 'CEFR B2',
      summary: 'Effective command in familiar contexts; meets most undergraduate direct-entry requirements worldwide.',
    };
  }
  if (band >= 5.0) {
    return {
      title: 'Modest User',
      cefr: 'CEFR B1',
      summary: 'Partial command of the language; pathway or foundation English preparation is typically recommended.',
    };
  }
  return {
    title: band >= 4.0 ? 'Limited User' : 'Foundation Stage',
    cefr: band >= 4.0 ? 'CEFR A2' : 'Pre-A2',
    summary: 'Structured foundation training across grammar, vocabulary, and test strategy will build core fluency quickly.',
  };
}

export const BandScoreCalculator: React.FC<BandScoreCalculatorProps> = ({
  track = 'academic',
  onOpenBatch,
}) => {
  const [scores, setScores] = useState<Record<ModuleKey, number>>(DEFAULT_SCORES);

  const handleScoreChange = (key: ModuleKey, nextValue: number) => {
    const clamped = Math.min(9, Math.max(0, Math.round(nextValue * 2) / 2));
    setScores((prev) => ({ ...prev, [key]: clamped }));
  };

  const handleReset = () => {
    setScores(DEFAULT_SCORES);
  };

  const { rawAverage, overall, roundingNote } = useMemo(
    () => calculateOfficialBand(scores),
    [scores]
  );

  const descriptor = useMemo(() => getBandDescriptor(overall), [overall]);

  // Identify lowest module(s) and impact of +0.5 improvement
  const improvementInsight = useMemo(() => {
    const entries = (Object.entries(scores) as [ModuleKey, number][]);
    const minScore = Math.min(...entries.map(([, val]) => val));
    const lowestModules = entries.filter(([, val]) => val === minScore).map(([k]) => k);

    if (minScore >= 9) {
      return {
        label: 'Maximum Band Achieved',
        detail: 'All four components are at Band 9.0.',
      };
    }

    const boostedKey = lowestModules[0];
    const nextModuleScore = Math.min(9, minScore + 0.5);
    const simulated = calculateOfficialBand({ ...scores, [boostedKey]: nextModuleScore });
    const boostedLabel = MODULES.find((m) => m.key === boostedKey)?.label || boostedKey;

    if (simulated.overall > overall) {
      return {
        label: `Focus Area: ${boostedLabel} (${minScore.toFixed(1)})`,
        detail: `Improving ${boostedLabel} by +0.5 to ${nextModuleScore.toFixed(1)} lifts your Overall Band to ${simulated.overall.toFixed(1)}.`,
      };
    }

    const plusOneScore = Math.min(9, minScore + 1.0);
    const simulatedPlusOne = calculateOfficialBand({ ...scores, [boostedKey]: plusOneScore });
    if (simulatedPlusOne.overall > overall) {
      return {
        label: `Focus Area: ${boostedLabel} (${minScore.toFixed(1)})`,
        detail: `Raising ${boostedLabel} to ${plusOneScore.toFixed(1)} lifts your Overall Band to ${simulatedPlusOne.overall.toFixed(1)}.`,
      };
    }

    return {
      label: `Lowest Module: ${boostedLabel} (${minScore.toFixed(1)})`,
      detail: `Raising ${boostedLabel} strengthens sub-score minimums required by universities and visa boards.`,
    };
  }, [scores, overall]);

  const lowestScoreValue = Math.min(
    scores.listening,
    scores.reading,
    scores.writing,
    scores.speaking
  );

  // Arc math for SVG circular gauge (circumference = 2 * pi * 54 ≈ 339.292)
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = overall / 9;
  const strokeDashoffset = circumference * (1 - progressRatio);

  const trackReadiness = useMemo(() => {
    if (track === 'general') {
      if (overall >= 8.0 && lowestScoreValue >= 7.0) {
        return {
          status: 'High PR Competitiveness',
          detail: 'Strong score profile for Canada Express Entry (CLB 9+) and Australian skilled points.',
          met: true,
        };
      }
      if (overall >= 6.5 && lowestScoreValue >= 6.0) {
        return {
          status: 'Standard Skilled Visa Range',
          detail: 'Meets baseline skilled migration requirements; higher writing/listening boosts points.',
          met: true,
        };
      }
      return {
        status: 'Score Preparation Recommended',
        detail: 'Most PR and work visa streams require at least 6.0 in each individual component.',
        met: false,
      };
    }

    if (overall >= 7.0 && lowestScoreValue >= 6.5) {
      return {
        status: 'Postgraduate & Top-Tier Ready',
        detail: 'Meets direct admission thresholds for most Master’s, MBA, and competitive Honours programs.',
        met: true,
      };
    }
    if (overall >= 6.0 && lowestScoreValue >= 5.5) {
      return {
        status: 'Undergraduate Direct-Entry Range',
        detail: 'Satisfies standard Bachelor’s entry requirements in the UK, Canada, Australia, and Europe.',
        met: true,
      };
    }
    return {
      status: 'Bridge Coaching Recommended',
      detail: 'Aim for at least 6.0 overall with no band below 5.5 for direct degree admission.',
      met: false,
    };
  }, [track, overall, lowestScoreValue]);

  return (
    <div
      id="band-calculator"
      className="mt-16 bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden"
    >
      {/* Top Header Strip */}
      <div className="px-6 py-5 sm:px-8 sm:py-6 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#0D0D11] text-white flex items-center justify-center shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#0D0D11] tracking-tight">
              Interactive IELTS Band Score Calculator
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
              Official Cambridge 0.5-band rounding · {track === 'academic' ? 'Academic Track' : 'General Training Track'}
            </p>
          </div>
        </div>

        {/* Preset & Reset Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center p-1 rounded-lg bg-neutral-100 border border-neutral-200">
            {PRESETS.map((preset) => {
              const isMatch =
                scores.listening === preset.scores.listening &&
                scores.reading === preset.scores.reading &&
                scores.writing === preset.scores.writing &&
                scores.speaking === preset.scores.speaking;

              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setScores(preset.scores)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2A] ${
                    isMatch
                      ? 'bg-[#0D0D11] text-white shadow-xs'
                      : 'text-neutral-700 hover:text-[#0D0D11]'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleReset}
            aria-label="Reset band scores to default"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 hover:text-[#0D0D11] text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2A]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Two-Zone Calculator Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Zone: 4 Interactive Module Controls */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:border-r border-b lg:border-b-0 border-neutral-200 flex flex-col justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
            {MODULES.map((mod) => {
              const value = scores[mod.key];
              const sliderPercent = (value / 9) * 100;

              return (
                <div
                  key={mod.key}
                  className="pb-5 border-b border-neutral-200/75 flex flex-col justify-between gap-4"
                >
                  {/* Module Title & Current Score Select */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-red-50 text-[#E11D2A] flex items-center justify-center shrink-0">
                        {mod.icon}
                      </div>
                      <div className="min-w-0">
                        <label
                          htmlFor={`band-select-${mod.key}`}
                          className="block text-sm font-bold text-[#0D0D11]"
                        >
                          {mod.label}
                        </label>
                        <span className="block text-[11px] text-neutral-500 truncate">
                          {mod.subtitle}
                        </span>
                      </div>
                    </div>

                    <select
                      id={`band-select-${mod.key}`}
                      aria-label={`${mod.label} band score`}
                      value={value}
                      onChange={(e) => handleScoreChange(mod.key, parseFloat(e.target.value))}
                      className="px-2.5 py-1.5 rounded-lg bg-neutral-50 border border-neutral-300 text-[#0D0D11] font-display font-extrabold text-base tabular-nums cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2A]"
                    >
                      {BAND_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt.toFixed(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Range Slider + Step Controls */}
                  <div>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleScoreChange(mod.key, value - 0.5)}
                        disabled={value <= 0}
                        aria-label={`Decrease ${mod.label} band score`}
                        className="w-10 h-10 rounded-lg bg-white border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-[#0D0D11] transition-colors shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2A]"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <div className="flex-1 flex flex-col gap-1.5">
                        <input
                          id={`band-range-${mod.key}`}
                          type="range"
                          min={0}
                          max={9}
                          step={0.5}
                          value={value}
                          aria-label={`${mod.label} score slider`}
                          onChange={(e) => handleScoreChange(mod.key, parseFloat(e.target.value))}
                          style={{
                            background: `linear-gradient(to right, #E11D2A 0%, #E11D2A ${sliderPercent}%, #E5E5E5 ${sliderPercent}%, #E5E5E5 100%)`,
                          }}
                          className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[#E11D2A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2A] focus-visible:ring-offset-2"
                        />
                        <div className="flex justify-between text-[10px] font-medium text-neutral-500 tabular-nums px-0.5">
                          <span>0.0</span>
                          <span>4.5</span>
                          <span>7.0</span>
                          <span>9.0</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleScoreChange(mod.key, value + 0.5)}
                        disabled={value >= 9}
                        aria-label={`Increase ${mod.label} band score`}
                        className="w-10 h-10 rounded-lg bg-white border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-[#0D0D11] transition-colors shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2A]"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Calculation Formula Strip */}
          <div className="mt-6 pt-5 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-neutral-600">
            <div className="font-mono tabular-nums">
              ({scores.listening.toFixed(1)} + {scores.reading.toFixed(1)} + {scores.writing.toFixed(1)} + {scores.speaking.toFixed(1)}) / 4 ={' '}
              <span className="font-bold text-[#0D0D11]">{rawAverage.toFixed(3).replace(/0+$/, '').replace(/\.$/, '.0')}</span>
            </div>
            <div className="text-neutral-600">
              {roundingNote}
            </div>
          </div>
        </div>

        {/* Right Zone: Overall Band Result & Readiness Assessment */}
        <div className="lg:col-span-5 bg-[#0D0D11] text-white p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div>
            {/* Gauge + Descriptor Row */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-6 pb-6 border-b border-neutral-800">
              <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 124 124" aria-hidden="true">
                  <circle
                    cx="62"
                    cy="62"
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="9"
                  />
                  <circle
                    cx="62"
                    cy="62"
                    r={radius}
                    fill="none"
                    stroke="#E11D2A"
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-[stroke-dashoffset] duration-300 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[11px] font-semibold text-neutral-400 tracking-wide">
                    Overall
                  </span>
                  <span
                    data-testid="overall-band-score"
                    className="text-4xl font-black font-display tabular-nums leading-none mt-0.5 text-white"
                  >
                    {overall.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="text-center sm:text-left lg:text-center xl:text-left">
                <div className="flex items-center justify-center sm:justify-start lg:justify-center xl:justify-start gap-2 text-xs text-neutral-300 font-semibold mb-1.5">
                  <span className="text-[#E11D2A] font-bold">{descriptor.title}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{descriptor.cefr}</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {descriptor.summary}
                </p>
              </div>
            </div>

            {/* Readiness & Improvement Insights */}
            <div className="pt-6 space-y-4">
              <div className="flex items-start gap-3">
                {trackReadiness.met ? (
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-[#E11D2A] shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-xs font-bold text-white tracking-wide">
                    {trackReadiness.status}
                  </p>
                  <p className="text-xs text-neutral-400 leading-relaxed mt-0.5">
                    {trackReadiness.detail}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <TrendingUp className="w-4 h-4 text-[#E11D2A] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white tracking-wide">
                    {improvementInsight.label}
                  </p>
                  <p className="text-xs text-neutral-400 leading-relaxed mt-0.5">
                    {improvementInsight.detail}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onOpenBatch}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white font-bold text-sm whitespace-nowrap transition-colors active:scale-[0.99] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D11]"
            >
              <span>Join Our Next Batch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
