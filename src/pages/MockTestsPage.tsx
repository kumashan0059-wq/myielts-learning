import React from 'react';
import { Headphones, BookOpen, PenTool, Mic, ShieldCheck, ArrowRight, Calendar } from 'lucide-react';
import { MockTestHub } from '../components/mocktest/MockTestHub';
import { usePageSeo, Link, APP_ROUTES } from '../router/RouterContext';

interface MockTestsPageProps {
  onOpenConsultation: (serviceName?: string) => void;
}

export const MockTestsPage: React.FC<MockTestsPageProps> = ({ onOpenConsultation }) => {
  usePageSeo({
    title: 'IELTS Mock Tests Portal (Listening, Reading, Writing, Speaking) | MY IELTS',
    description:
      'Practice full 4-module computer-delivered IELTS Academic and General Training mock tests with real audio playback, split-screen reading, AI writing & speaking evaluation, and downloadable reports.',
  });

  const examModules = [
    { icon: Headphones, title: 'Listening Simulation', spec: '30 Mins · 40 Questions' },
    { icon: BookOpen, title: 'Split-Screen Reading', spec: '60 Mins · 3 Passages' },
    { icon: PenTool, title: 'AI Writing Grader', spec: '60 Mins · Task 1 & 2' },
    { icon: Mic, title: 'Mic Speaking Lab', spec: '14 Mins · Parts 1–3' },
  ];

  return (
    <div className="bg-white">
      {/* Dedicated Exam Hall Header */}
      <section className="bg-[#0D0D11] text-white py-12 sm:py-16 border-b border-neutral-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E11D2A]/15 blur-3xl rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E11D2A]">
                <ShieldCheck className="w-4 h-4" />
                <span>Computer-Delivered Practice Lab</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight leading-tight">
                Timed <span className="text-[#E11D2A]">IELTS Mock Test</span> Platform
              </h1>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Simulate official Academic and General Training exam conditions. Complete individual modules or a full 4-part test with auto-saved answers, band estimates, and instructor feedback notes.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => onOpenConsultation('Mock Test Feedback Session')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book 1-on-1 Score Review</span>
                </button>
                <Link
                  to={APP_ROUTES.ielts}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-bold transition-colors"
                >
                  <span>Explore IELTS Coaching Batches</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E11D2A]" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              {examModules.map((mod) => {
                const Icon = mod.icon;
                return (
                  <div
                    key={mod.title}
                    className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800"
                  >
                    <div className="w-9 h-9 rounded-lg bg-red-950/60 border border-red-900/50 text-[#E11D2A] flex items-center justify-center mb-2.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-white">{mod.title}</div>
                    <div className="text-[11px] text-neutral-400 mt-0.5 tabular-nums">{mod.spec}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Full Interactive Mock Test System */}
      <MockTestHub />
    </div>
  );
};
