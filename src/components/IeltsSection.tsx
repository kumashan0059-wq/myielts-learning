import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  MessageSquare,
  PenTool,
  Eye,
  Headphones,
  CheckCircle,
  ArrowRight,
  Award,
  Sparkles,
  Users
} from 'lucide-react';
import { IELTS_MODULES } from '../data/content';
import { BandScoreCalculator } from './BandScoreCalculator';

interface IeltsSectionProps {
  onOpenBatch: () => void;
}

export const IeltsSection: React.FC<IeltsSectionProps> = ({ onOpenBatch }) => {
  const [activeTab, setActiveTab] = useState<'academic' | 'general'>('academic');

  return (
    <section id="ielts" className="py-20 bg-neutral-50/60 relative overflow-hidden border-t border-b border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100/70 text-[#E11D2A] text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Signature IELTS Program</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#0D0D11] tracking-tight leading-tight mb-4">
            Achieve the <span className="text-[#E11D2A]">Score You Need.</span>
          </h2>

          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
            Build the skills, confidence and strategies you need to perform at your best.
          </p>
        </div>

        {/* Academic vs General Training Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-xl bg-white border border-neutral-200 shadow-xs">
            <button
              onClick={() => setActiveTab('academic')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'academic'
                  ? 'bg-[#E11D2A] text-white shadow-md shadow-red-500/25'
                  : 'text-neutral-700 hover:text-[#0D0D11]'
              }`}
            >
              IELTS Academic
              <span className="text-xs font-normal opacity-90 block text-[11px]">For Universities & Higher Ed</span>
            </button>
            <button
              onClick={() => setActiveTab('general')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'general'
                  ? 'bg-[#0D0D11] text-white shadow-md'
                  : 'text-neutral-700 hover:text-[#0D0D11]'
              }`}
            >
              IELTS General Training
              <span className="text-xs font-normal opacity-90 block text-[11px]">For Work Visas & PR Pathways</span>
            </button>
          </div>
        </div>

        {/* Highlighted Banner with Classroom Image & Band Target Circular Indicators */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left Visual with Classroom/Student Image & Curved Accent */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-white shadow-xl bg-white p-2">
              <div className="relative h-[340px] sm:h-[400px] rounded-2xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1000&q=80"
                  alt="IELTS Training Session"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D11]/90 via-black/20 to-transparent" />
                
                {/* Visual badge inside image */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="px-2.5 py-1 rounded-md bg-[#E11D2A] text-white font-bold text-xs uppercase tracking-wider mb-2 inline-block">
                    Interactive Audio-Visual Labs
                  </span>
                  <p className="text-base sm:text-lg font-bold">
                    Official Cambridge Diagnostic Material & Simulated Exam Environments
                  </p>
                </div>
              </div>
            </div>

            {/* Corner Red Glow */}
            <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-[#E11D2A]/15 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Right Side: Visual Score Indicators (Band 6+, Band 7+, Band 8+) & Track Details */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="mb-6">
              <h3 className="text-2xl font-bold font-display text-[#0D0D11] mb-2">
                {activeTab === 'academic' ? 'Academic IELTS Track' : 'General Training IELTS Track'}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                {activeTab === 'academic'
                  ? 'Engineered for undergraduate, postgraduate, and professional medical licenses requiring complex graph analysis and rigorous academic discourse.'
                  : 'Tailored for skilled worker programs (Express Entry, Subclass 482/189/190), focusing on workplace letters, procedural texts, and social interaction.'}
              </p>
            </div>

            {/* VISUAL SCORE INDICATORS: Band 6+, Band 7+, Band 8+ with Animated Circular Progress */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
              
              {/* Band 6+ Indicator */}
              <div className="bg-white rounded-2xl p-4 border border-neutral-200 text-center shadow-xs hover:border-red-300 transition-colors">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-neutral-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-neutral-800"
                      strokeDasharray="65, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute font-black text-sm sm:text-base text-[#0D0D11] font-display">
                    Band 6+
                  </span>
                </div>
                <p className="text-xs font-bold text-neutral-800">Competent</p>
                <p className="text-[11px] text-neutral-600">Foundation</p>
              </div>

              {/* Band 7+ Indicator */}
              <div className="bg-white rounded-2xl p-4 border-2 border-red-200 text-center shadow-md shadow-red-500/10">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-neutral-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#E11D2A]"
                      strokeDasharray="80, 100"
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute font-black text-sm sm:text-base text-[#E11D2A] font-display">
                    Band 7+
                  </span>
                </div>
                <p className="text-xs font-bold text-[#E11D2A]">Good User</p>
                <p className="text-[11px] text-neutral-600">Top Universities</p>
              </div>

              {/* Band 8+ Indicator */}
              <div className="bg-[#0D0D11] rounded-2xl p-4 text-center shadow-lg text-white">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-neutral-800"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-white"
                      strokeDasharray="92, 100"
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute font-black text-sm sm:text-base text-white font-display">
                    Band 8+
                  </span>
                </div>
                <p className="text-xs font-bold text-white">Very Good</p>
                <p className="text-[11px] text-neutral-400">Ivy & Elite PR</p>
              </div>

            </div>

            {/* Quick Benefits */}
            <div className="space-y-2.5 mb-8">
              <div className="flex items-center gap-2.5 text-sm text-neutral-800 font-medium">
                <CheckCircle className="w-4 h-4 text-[#E11D2A] flex-shrink-0" />
                <span>Small batch sizes (Max 12 students) for dedicated attention</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-800 font-medium">
                <CheckCircle className="w-4 h-4 text-[#E11D2A] flex-shrink-0" />
                <span>Official Cambridge practice tests & full computer-delivered mock exams</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-800 font-medium">
                <CheckCircle className="w-4 h-4 text-[#E11D2A] flex-shrink-0" />
                <span>Unlimited 1-on-1 Speaking interviews until test day</span>
              </div>
            </div>

            {/* CTA: Start IELTS Preparation */}
            <div>
              <button
                onClick={onOpenBatch}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white font-bold text-base shadow-lg shadow-red-600/25 transition-all active:scale-95 cursor-pointer"
              >
                <span>Start IELTS Preparation</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>

        {/* 4 CORE IELTS MODULES GRID: Speaking, Writing, Reading, Listening */}
        <div className="mt-8">
          <h3 className="text-xl font-bold font-display text-[#0D0D11] text-center mb-6">
            Master All 4 Test Components Under Cambridge Standards
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {IELTS_MODULES.map((mod, idx) => {
              const icons = {
                Speaking: <MessageSquare className="w-5 h-5" />,
                Writing: <PenTool className="w-5 h-5" />,
                Reading: <Eye className="w-5 h-5" />,
                Listening: <Headphones className="w-5 h-5" />,
              };

              return (
                <div
                  key={mod.name}
                  className="bg-white rounded-xl p-5 border border-neutral-200/90 hover:border-red-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-red-50 text-[#E11D2A] flex items-center justify-center">
                        {icons[mod.name as keyof typeof icons] || <BookOpen className="w-5 h-5" />}
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                        {mod.highlight}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-[#0D0D11] mb-1">
                      IELTS {mod.name}
                    </h4>
                    <p className="text-xs font-semibold text-[#E11D2A] mb-2">
                      {mod.bandFocus}
                    </p>
                    <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                      {mod.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-bold text-neutral-500">
                    <span>Includes 1-on-1 Feedback</span>
                    <span className="text-[#E11D2A]">&rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive IELTS Band Score Calculator */}
        <BandScoreCalculator track={activeTab} onOpenBatch={onOpenBatch} />

      </div>
    </section>
  );
};
