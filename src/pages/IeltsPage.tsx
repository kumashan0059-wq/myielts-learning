import React, { useState } from 'react';
import {
  Award,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FileCheck2,
  GraduationCap,
  Headphones,
  MessageSquare,
  PenTool,
  Sparkles,
  Users,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import { IeltsSection } from '../components/IeltsSection';
import { IeltsProcessSection } from '../components/IeltsProcessSection';
import { Link, APP_ROUTES, usePageSeo } from '../router/RouterContext';
import { TESTIMONIALS, FAQ_ITEMS } from '../data/content';
import ieltsHeroImg from '../assets/images/ielts_prep_hero_1795289556731.jpg';

interface IeltsPageProps {
  onOpenConsultation: (serviceName?: string) => void;
  onOpenBatch: (serviceName?: string) => void;
}

const BATCH_PROGRAMS = [
  {
    id: 'regular',
    name: 'IELTS Regular Comprehensive',
    duration: '8 Weeks · 24 Live Classes',
    schedule: 'Morning / Afternoon / Evening Slots',
    idealFor: 'Students & professionals building strong Academic or GT fundamentals',
    features: [
      'Complete coverage of Listening, Reading, Writing & Speaking',
      'Weekly Cambridge-aligned mock exams with score diagnostics',
      'Small classroom cohort capped at 12 learners',
      '1-on-1 Writing Task 1 & Task 2 script evaluations',
    ],
  },
  {
    id: 'fast-track',
    name: 'IELTS Fast-Track Crash',
    duration: '4 Weeks · Intensive Daily Drills',
    schedule: 'Sun–Thu Focused Sessions',
    idealFor: 'Applicants targeting upcoming university intake deadlines',
    features: [
      'High-yield question patterns & timed speed strategies',
      'Daily speaking interview labs & cue card drills',
      'Repeated practice on True/False/Not Given & Matching',
      'Full final readiness audit before test booking',
    ],
  },
  {
    id: 'executive',
    name: 'Weekend & 1-on-1 Mentoring',
    duration: '6 Weeks Flexible · Custom Pacing',
    schedule: 'Friday & Saturday + Custom Hours',
    idealFor: 'Working professionals & General Training migration applicants',
    features: [
      'Dedicated mentor assigned to target weak module scores',
      'CLB 9+ strategy for Express Entry & skilled visas',
      'Flexible rescheduling around work commitments',
      'Full access to digital computer-delivered mock tests',
    ],
  },
];

const MENTOR_PROFILES = [
  {
    role: 'Senior Writing & Grammar Lead',
    specialty: 'IELTS Academic Task 1 Data Analysis & Task 2 Essay Coherence',
    method: 'Line-by-line rubric annotation covering Task Achievement, Cohesion, and Lexical Precision.',
    icon: PenTool,
  },
  {
    role: 'Speaking & Phonetics Coach',
    specialty: 'Fluency Conditioning, Cue Card Storytelling & Part 3 Discussion',
    method: 'Daily live 1-on-1 simulated interviews designed to eliminate hesitation and build natural intonation.',
    icon: MessageSquare,
  },
  {
    role: 'Reading & Listening Strategist',
    specialty: 'Distractor Detection, Time Allocation & Speed Scanning',
    method: 'Timed audio-lab sessions and systematic passage breakdowns under authentic exam pressure.',
    icon: Headphones,
  },
];

export const IeltsPage: React.FC<IeltsPageProps> = ({ onOpenConsultation, onOpenBatch }) => {
  usePageSeo({
    title: 'IELTS Preparation (Academic & General Training) | MY IELTS',
    description:
      'Structured IELTS Academic and General Training classes in Mirpur, Dhaka with Cambridge-aligned diagnostics, small batches, 1-on-1 Speaking drills, and Band Score Calculator.',
  });

  const [selectedBatch, setSelectedBatch] = useState<string>('regular');
  const [openFaq, setOpenFaq] = useState<string>('q1');

  const ieltsStories = TESTIMONIALS.filter((t) =>
    t.course.toLowerCase().includes('ielts')
  );
  const ieltsFaqs = FAQ_ITEMS.filter((f) =>
    ['IELTS', 'Admission', 'Consultation'].includes(f.category)
  );

  return (
    <div className="bg-white">
      {/* Unique Split Editorial Hero for /ielts */}
      <section className="relative bg-[#0D0D11] text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[460px] h-[460px] bg-[#E11D2A]/15 blur-3xl rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E11D2A]">
                <GraduationCap className="w-4 h-4" />
                <span>IELTS Academic &amp; General Training</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-[1.06]">
                Structured Coaching for <span className="text-[#E11D2A]">Band 7.5+</span> Results.
              </h1>

              <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-xl">
                Master Listening, Reading, Writing, and Speaking through small classroom cohorts, Cambridge-aligned mock tests, and personalized 1-on-1 feedback at our Mirpur Executive Campus.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800">
                  <div className="text-xs text-neutral-400">Batch Size</div>
                  <div className="text-base font-black text-white mt-0.5 tabular-nums">Max 12 Students</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800">
                  <div className="text-xs text-neutral-400">Practice Formats</div>
                  <div className="text-base font-black text-white mt-0.5">Paper &amp; Computer</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 col-span-2 sm:col-span-1">
                  <div className="text-xs text-neutral-400">Diagnostic Review</div>
                  <div className="text-base font-black text-[#E11D2A] mt-0.5">1-on-1 Feedback</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => onOpenBatch('IELTS Academic Preparation')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white font-bold text-sm sm:text-base shadow-lg shadow-red-600/25 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Enroll in Next IELTS Batch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to={APP_ROUTES.mockTests}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm sm:text-base transition-all"
                >
                  <FileCheck2 className="w-4 h-4 text-[#E11D2A]" />
                  <span>Try Online Mock Test</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl p-2.5 bg-gradient-to-br from-[#E11D2A] via-neutral-800 to-neutral-900 shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-900">
                  <img
                    src={ieltsHeroImg}
                    alt="Student practicing IELTS Academic writing and listening at MY IELTS studio"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D11]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 text-[#0D0D11] rounded-2xl p-4 flex items-center justify-between gap-4 shadow-lg">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#E11D2A]">
                        Classroom &amp; Lab Methodology
                      </div>
                      <div className="text-sm sm:text-base font-black font-display">
                        Real Classroom Learning with Expert Mentors
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenConsultation('IELTS Assessment')}
                      className="shrink-0 px-3.5 py-2 rounded-xl bg-[#0D0D11] hover:bg-[#E11D2A] text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Free Level Check
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Modules & Band Score Calculator */}
      <IeltsSection onOpenBatch={() => onOpenBatch('IELTS Preparation')} />

      {/* Batch Programs & Schedule Options */}
      <section className="py-20 bg-white border-b border-neutral-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E11D2A] uppercase tracking-wider mb-2">
                <Calendar className="w-4 h-4" />
                <span>Course Formats &amp; Batches</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-[#0D0D11]">
                Choose Your IELTS <span className="text-[#E11D2A]">Learning Track</span>
              </h2>
            </div>
            <p className="text-sm text-neutral-600 max-w-md">
              Select a program pace tailored to your current baseline score, study schedule, and university or visa deadline.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {BATCH_PROGRAMS.map((prog) => {
              const isSelected = selectedBatch === prog.id;
              return (
                <div
                  key={prog.id}
                  onClick={() => setSelectedBatch(prog.id)}
                  className={`rounded-3xl p-7 border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#0D0D11] text-white border-[#E11D2A] shadow-xl'
                      : 'bg-neutral-50 text-[#0D0D11] border-neutral-200 hover:border-red-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider ${
                          isSelected ? 'text-[#E11D2A]' : 'text-[#E11D2A]'
                        }`}
                      >
                        {prog.duration}
                      </span>
                      <Clock className={`w-4 h-4 ${isSelected ? 'text-neutral-400' : 'text-neutral-500'}`} />
                    </div>

                    <h3 className="text-xl font-black font-display mb-2">{prog.name}</h3>
                    <p className={`text-xs font-semibold mb-3 ${isSelected ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      {prog.schedule}
                    </p>
                    <p className={`text-xs leading-relaxed mb-6 ${isSelected ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      {prog.idealFor}
                    </p>

                    <ul className="space-y-2.5 mb-8">
                      {prog.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-xs">
                          <CheckCircle2 className="w-4 h-4 text-[#E11D2A] shrink-0 mt-0.5" />
                          <span className={isSelected ? 'text-neutral-200' : 'text-neutral-700'}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenBatch(prog.name);
                    }}
                    className={`w-full py-3.5 px-5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                      isSelected
                        ? 'bg-[#E11D2A] hover:bg-[#C8102E] text-white'
                        : 'bg-[#0D0D11] hover:bg-[#E11D2A] text-white'
                    }`}
                  >
                    <span>Reserve Seat in {prog.name.split(' ')[1]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6-Step IELTS Methodology */}
      <IeltsProcessSection onOpenBatch={() => onOpenBatch('IELTS Preparation')} />

      {/* Expert Mentor Specialization */}
      <section className="py-20 bg-neutral-50 border-t border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E11D2A] uppercase tracking-wider mb-2">
              <Users className="w-4 h-4" />
              <span>Dedicated Academic Faculty</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-[#0D0D11] mb-3">
              Learn With Specialized <span className="text-[#E11D2A]">Module Mentors</span>
            </h2>
            <p className="text-sm text-neutral-600">
              Every candidate receives targeted guidance from trainers focused on Cambridge scoring criteria rather than generic lectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MENTOR_PROFILES.map((mentor) => {
              const Icon = mentor.icon;
              return (
                <div
                  key={mentor.role}
                  className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-[#E11D2A] flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold font-display text-[#0D0D11] mb-1">{mentor.role}</h3>
                    <p className="text-xs font-semibold text-[#E11D2A] mb-3">{mentor.specialty}</p>
                    <p className="text-xs text-neutral-600 leading-relaxed">{mentor.method}</p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-700">
                    <span>Mirpur Campus &amp; Live Coaching</span>
                    <BookOpen className="w-4 h-4 text-[#E11D2A]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* IELTS Student Results & Focused FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E11D2A] uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>IELTS Candidate Stories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-[#0D0D11]">
              How Our Candidates Reach Their Target Band
            </h2>
            <div className="space-y-4">
              {ieltsStories.map((story) => (
                <div key={story.id} className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-sm font-bold text-[#0D0D11]">{story.name}</h3>
                      <p className="text-xs text-neutral-500">{story.course}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-[#E11D2A] text-white text-xs font-black">
                      {story.scoreBadge || story.achievement}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
                    “{story.quote}”
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E11D2A] uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Course Admissions FAQ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-[#0D0D11]">
              Common IELTS Questions
            </h2>
            <div className="space-y-3">
              {ieltsFaqs.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div key={faq.id} className="rounded-2xl border border-neutral-200 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(isOpen ? '' : faq.id)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left bg-neutral-50/70 hover:bg-neutral-50 cursor-pointer"
                    >
                      <span className="text-sm font-bold text-[#0D0D11]">{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#E11D2A] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 py-4 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 bg-white">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-6 rounded-2xl bg-[#0D0D11] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold font-display">Ready for a Free Diagnostic Test?</h3>
                <p className="text-xs text-neutral-400">Speak with an IELTS mentor before joining a batch.</p>
              </div>
              <button
                onClick={() => onOpenConsultation('IELTS Preparation')}
                className="px-5 py-3 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white text-xs font-bold cursor-pointer whitespace-nowrap"
              >
                Book Free Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
