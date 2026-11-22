import React, { useState } from 'react';
import {
  Mic,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Volume2,
  Users,
  Layers,
  Award,
  MessageSquare,
} from 'lucide-react';
import { SpokenEnglishSection } from '../components/SpokenEnglishSection';
import { usePageSeo } from '../router/RouterContext';
import spokenEnglishImg from '../assets/images/spoken_english_session_1795289556883.jpg';

interface SpokenEnglishPageProps {
  onOpenConsultation: (serviceName?: string) => void;
  onOpenBatch: (serviceName?: string) => void;
}

const COURSE_TRACKS = [
  {
    id: 'beginner',
    level: 'Level 1 · Foundation',
    title: 'Everyday Spoken English',
    duration: '6 Weeks · Small Interactive Batch',
    summary: 'Ideal if you understand basic English but hesitate when forming sentences in real conversations.',
    focus: [
      'Core sentence construction & natural tense usage',
      'Overcoming translation-in-your-head habits',
      '500+ high-frequency everyday expressions',
      'Guided pair dialogues in a supportive classroom',
    ],
  },
  {
    id: 'intermediate',
    level: 'Level 2 · Fluency',
    title: 'Fluency & Pronunciation Lab',
    duration: '6 Weeks · Speaking Club Access',
    summary: 'Designed for university applicants and IELTS candidates who want smoother pace, clarity, and richer vocabulary.',
    focus: [
      'Word stress, connected speech & clear articulation',
      'Discourse markers for longer coherent answers',
      'Impromptu 2-minute topic speaking drills',
      'Daily group debates & situational role-play',
    ],
  },
  {
    id: 'advanced',
    level: 'Level 3 · Executive',
    title: 'Corporate & Interview Mastery',
    duration: '4 Weeks · Presentation & Interview Focus',
    summary: 'Built for job seekers, corporate professionals, and embassy/university interview candidates.',
    focus: [
      'Professional presentation & meeting leadership skills',
      'Mock university & visa interview questioning',
      'Formal email & persuasive speaking etiquette',
      'Recorded video self-review with mentor feedback',
    ],
  },
];

const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'comfort',
    prompt: '1. When asked an unexpected question in English, how do you usually respond?',
    options: [
      { label: 'I pause often and translate mentally first', score: 1 },
      { label: 'I get my point across using simple words', score: 2 },
      { label: 'I respond comfortably with supporting details', score: 3 },
    ],
  },
  {
    id: 'pronunciation',
    prompt: '2. How confident are you with English word stress and pronunciation?',
    options: [
      { label: 'People sometimes ask me to repeat myself', score: 1 },
      { label: 'Understandable, though I want smoother intonation', score: 2 },
      { label: 'Clear and confident, aiming for executive polish', score: 3 },
    ],
  },
  {
    id: 'goal',
    prompt: '3. What is your primary outcome for joining Spoken English?',
    options: [
      { label: 'Speak daily English without shyness or fear', score: 1 },
      { label: 'Prepare for IELTS Speaking & university life abroad', score: 2 },
      { label: 'Excel in job interviews & global workplace meetings', score: 3 },
    ],
  },
];

export const SpokenEnglishPage: React.FC<SpokenEnglishPageProps> = ({
  onOpenConsultation,
  onOpenBatch,
}) => {
  usePageSeo({
    title: 'Spoken English & Fluency Courses (Beginner to Advanced) | MY IELTS',
    description:
      'Interactive Spoken English classes in Mirpur, Dhaka covering pronunciation labs, grammar accuracy, vocabulary expansion, daily speaking clubs, and interview confidence.',
  });

  const [activeTrack, setActiveTrack] = useState('intermediate');
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});

  const answeredCount = Object.keys(quizScores).length;
  const totalQuizScore: number = (Object.values(quizScores) as number[]).reduce(
    (sum, val) => sum + val,
    0
  );
  const recommendedTrack =
    totalQuizScore <= 4
      ? COURSE_TRACKS[0]
      : totalQuizScore <= 7
      ? COURSE_TRACKS[1]
      : COURSE_TRACKS[2];

  return (
    <div className="bg-white">
      {/* Light Editorial Split Hero for /spoken-english */}
      <section className="py-14 sm:py-20 bg-neutral-50 border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E11D2A]">
                <Mic className="w-4 h-4" />
                <span>Beginner to Advanced Fluency Tracks</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black font-display text-[#0D0D11] tracking-tight leading-[1.08]">
                Turn Hesitation Into <span className="text-[#E11D2A]">Natural Fluency.</span>
              </h1>

              <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
                Practice real conversations in small, encouraging classroom groups. Master pronunciation, functional grammar, and active vocabulary with daily guided speaking clubs.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-white border border-neutral-200">
                  <div className="text-xs font-bold text-[#E11D2A]">Speaking Labs</div>
                  <div className="text-sm font-black text-[#0D0D11] mt-0.5">Live Role-Play</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-neutral-200">
                  <div className="text-xs font-bold text-[#E11D2A]">Pronunciation</div>
                  <div className="text-sm font-black text-[#0D0D11] mt-0.5">Phonetics Clinic</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-neutral-200">
                  <div className="text-xs font-bold text-[#E11D2A]">Feedback</div>
                  <div className="text-sm font-black text-[#0D0D11] mt-0.5">1-on-1 Coaching</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => onOpenBatch('Spoken English & Fluency')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white font-bold text-sm sm:text-base shadow-lg shadow-red-600/20 cursor-pointer transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Join Spoken English Batch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenConsultation('Spoken English Placement Assessment')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-300 text-[#0D0D11] font-bold text-sm sm:text-base cursor-pointer transition-all"
                >
                  <span>Book Speaking Placement Test</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl p-2.5 bg-[#0D0D11] shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <img
                    src={spokenEnglishImg}
                    alt="Small-group Spoken English conversation workshop at MY IELTS"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D11]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#E11D2A] block">
                        Interactive Speaking Environment
                      </span>
                      <span className="text-sm sm:text-base font-bold">
                        Debates, Pronunciation Coaching &amp; Everyday Fluency
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Tracks: Beginner -> Intermediate -> Advanced */}
      <section className="py-20 bg-white border-b border-neutral-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E11D2A] uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4" />
              <span>Progressive Curriculum</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-[#0D0D11] mb-3">
              Structured Tracks From <span className="text-[#E11D2A]">Beginner to Executive</span>
            </h2>
            <p className="text-sm text-neutral-600">
              Every learner starts at the right pace based on a friendly speaking diagnostic.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {COURSE_TRACKS.map((track) => {
              const isSelected = activeTrack === track.id;
              return (
                <div
                  key={track.id}
                  onClick={() => setActiveTrack(track.id)}
                  className={`rounded-3xl p-7 border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#0D0D11] text-white border-[#E11D2A] shadow-xl'
                      : 'bg-neutral-50 border-neutral-200 text-[#0D0D11] hover:border-red-300'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E11D2A]">
                      {track.level}
                    </span>
                    <h3 className="text-xl font-black font-display mt-1 mb-1">{track.title}</h3>
                    <p className={`text-xs font-semibold mb-3 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {track.duration}
                    </p>
                    <p className={`text-xs leading-relaxed mb-5 ${isSelected ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      {track.summary}
                    </p>
                    <ul className="space-y-2.5 mb-8">
                      {track.focus.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-xs">
                          <CheckCircle2 className="w-4 h-4 text-[#E11D2A] shrink-0 mt-0.5" />
                          <span className={isSelected ? 'text-neutral-200' : 'text-neutral-700'}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenBatch(track.title);
                    }}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#E11D2A] hover:bg-[#C8102E] text-white'
                        : 'bg-[#0D0D11] hover:bg-[#E11D2A] text-white'
                    }`}
                  >
                    Enroll in {track.title}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Spoken Level Check */}
      <section className="py-20 bg-neutral-50 border-b border-neutral-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E11D2A] uppercase tracking-wider mb-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>Quick Fluency Placement Check</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-display text-[#0D0D11]">
                  Find Your Recommended Speaking Track
                </h2>
              </div>
              <span className="text-xs font-bold text-neutral-500 tabular-nums">
                {answeredCount} of {DIAGNOSTIC_QUESTIONS.length} answered
              </span>
            </div>

            <div className="space-y-6">
              {DIAGNOSTIC_QUESTIONS.map((q) => (
                <div key={q.id} className="space-y-2.5">
                  <p className="text-sm font-bold text-[#0D0D11]">{q.prompt}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    {q.options.map((opt) => {
                      const chosen = quizScores[q.id] === opt.score;
                      return (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => setQuizScores((prev) => ({ ...prev, [q.id]: opt.score }))}
                          className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                            chosen
                              ? 'bg-[#0D0D11] text-white border-[#E11D2A] font-semibold'
                              : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-red-300'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {answeredCount === DIAGNOSTIC_QUESTIONS.length && (
              <div className="mt-8 p-5 rounded-2xl bg-[#0D0D11] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E11D2A]">
                    Recommended Program Match
                  </span>
                  <h3 className="text-lg sm:text-xl font-black font-display mt-0.5">
                    {recommendedTrack.title} ({recommendedTrack.level})
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1">{recommendedTrack.summary}</p>
                </div>
                <button
                  onClick={() => onOpenBatch(recommendedTrack.title)}
                  className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white text-xs font-bold cursor-pointer whitespace-nowrap"
                >
                  <span>Join This Track</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Core Spoken English Skill Areas */}
      <SpokenEnglishSection onOpenBatch={() => onOpenBatch('Spoken English & Fluency')} />

      {/* Practice Activities & Mentor Support Strip */}
      <section className="py-16 bg-neutral-50 border-t border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-neutral-200">
            <Volume2 className="w-6 h-6 text-[#E11D2A] mb-3" />
            <h3 className="text-base font-bold font-display text-[#0D0D11] mb-1.5">
              Phonetics &amp; Accent Clarity
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Targeted drills on vowel length, consonant clusters, and natural sentence rhythm for global intelligibility.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-neutral-200">
            <Users className="w-6 h-6 text-[#E11D2A] mb-3" />
            <h3 className="text-base font-bold font-display text-[#0D0D11] mb-1.5">
              Interactive Debate Clubs
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Weekly moderated discussion panels encouraging spontaneous speaking without fear of making mistakes.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-neutral-200">
            <Award className="w-6 h-6 text-[#E11D2A] mb-3" />
            <h3 className="text-base font-bold font-display text-[#0D0D11] mb-1.5">
              Mentor Feedback Reports
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Individual corrections on recurring grammar patterns, vocabulary upgrades, and body language confidence.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
