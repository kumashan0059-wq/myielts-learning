import React from 'react';
import { motion } from 'motion/react';
import {
  Mic,
  Smile,
  Users,
  Volume2,
  Layers,
  CheckCircle2,
  Zap,
  ArrowRight,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { SPOKEN_ENGLISH_AREAS } from '../data/content';

interface SpokenEnglishSectionProps {
  onOpenBatch: () => void;
}

export const SpokenEnglishSection: React.FC<SpokenEnglishSectionProps> = ({ onOpenBatch }) => {
  const renderIcon = (name: string) => {
    switch (name) {
      case 'Smile':
        return <Smile className="w-5 h-5" />;
      case 'Users':
        return <Users className="w-5 h-5" />;
      case 'Volume2':
        return <Volume2 className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      default:
        return <Mic className="w-5 h-5" />;
    }
  };

  return (
    <section id="spoken-english" className="py-20 bg-white relative overflow-hidden border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#E11D2A] text-xs font-bold uppercase tracking-wider mb-3">
            <Mic className="w-3.5 h-3.5" />
            <span>Fluency & Pronunciation Immersion</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#0D0D11] tracking-tight leading-tight mb-4">
            Speak With <span className="text-[#E11D2A]">Confidence.</span>
          </h2>

          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
            Eliminate hesitation, correct your pronunciation, and develop the natural fluency needed for university interviews, workplace presentations, and social life abroad.
          </p>
        </div>

        {/* Main Grid: Visual with Animated Speech Bubbles on Left, 6 Core Pillars on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Visual with Animated Speech Bubbles */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden p-3 bg-gradient-to-br from-[#0D0D11] via-neutral-900 to-[#E11D2A] shadow-2xl">
              
              {/* Inner container */}
              <div className="relative h-[420px] sm:h-[460px] rounded-2xl overflow-hidden bg-neutral-900 group">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
                  alt="Students engaged in English conversation workshop"
                  className="w-full h-full object-cover object-center opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D11] via-black/30 to-transparent" />

                {/* ANIMATED SPEECH BUBBLE 1 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="absolute top-8 left-4 right-10 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-white/60 animate-float-slow"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#E11D2A] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0D0D11]">“How do I deliver my ideas fluently?”</p>
                      <p className="text-[10px] text-neutral-500">Student • First Week Diagnostic</p>
                    </div>
                  </div>
                </motion.div>

                {/* ANIMATED SPEECH BUBBLE 2 (Trainer Answer) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="absolute bottom-20 left-8 right-4 bg-[#0D0D11]/95 text-white backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-red-500/40"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-white text-[#0D0D11] flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      <Sparkles className="w-4 h-4 text-[#E11D2A]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">“Think in phrases, master signposting, and pace your tone!”</p>
                      <p className="text-[10px] text-red-300">Senior Native-Trained Coach</p>
                    </div>
                  </div>
                </motion.div>

                {/* Bottom Stats strip */}
                <div className="absolute bottom-3 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-2.5 flex items-center justify-between text-xs font-bold text-neutral-900">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Daily Speaking Clubs
                  </span>
                  <span className="text-[#E11D2A]">100% Hesitation-Free</span>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: 6 Core Growth Areas */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {SPOKEN_ENGLISH_AREAS.map((area, idx) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-4 rounded-xl bg-neutral-50 hover:bg-red-50/40 border border-neutral-200/80 hover:border-red-200 transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white group-hover:bg-[#E11D2A] text-[#E11D2A] group-hover:text-white flex items-center justify-center shadow-2xs mb-3 transition-colors border border-neutral-200/60 group-hover:border-[#E11D2A]">
                    {renderIcon(area.icon)}
                  </div>
                  <h3 className="text-base font-bold font-display text-[#0D0D11] group-hover:text-[#E11D2A] transition-colors mb-1">
                    {area.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {area.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Course CTA & details */}
            <div className="p-6 rounded-2xl bg-[#0D0D11] text-white flex flex-col sm:flex-row items-center justify-between gap-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#E11D2A] mb-1">
                  Weekend & Evening Batches Available
                </p>
                <h4 className="text-lg font-bold font-display text-white">Join Spoken English Course</h4>
                <p className="text-xs text-neutral-400">Suitable for beginners, university aspirants & corporate executives.</p>
              </div>

              <button
                onClick={onOpenBatch}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white font-bold text-sm shadow-md shadow-red-600/25 transition-all active:scale-95 whitespace-nowrap cursor-pointer"
              >
                <span>Join Spoken English Course</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
