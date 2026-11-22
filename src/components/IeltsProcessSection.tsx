import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { IELTS_PROCESS_STEPS } from '../data/content';

interface IeltsProcessSectionProps {
  onOpenBatch: () => void;
}

export const IeltsProcessSection: React.FC<IeltsProcessSectionProps> = ({ onOpenBatch }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#E11D2A] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Methodology</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#0D0D11] tracking-tight leading-tight mb-4">
            Your <span className="text-[#E11D2A]">IELTS Journey</span>
          </h2>

          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
            A battle-tested 6-step framework designed to take you from your initial diagnostic assessment to your target band score with absolute clarity.
          </p>
        </div>

        {/* Process Steps with Connecting Red Line */}
        <div className="relative">
          
          {/* Desktop Connecting Red Line */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-neutral-200 -translate-y-6 z-0">
            <motion.div
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-[#E11D2A] via-[#C8102E] to-[#E11D2A]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
            {IELTS_PROCESS_STEPS.map((step, index) => {
              const isActive = activeStepIndex === index;

              return (
                <motion.div
                  key={step.stepNumber}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  onMouseEnter={() => setActiveStepIndex(index)}
                  className={`relative p-5 rounded-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    isActive
                      ? 'bg-white border-2 border-[#E11D2A] shadow-xl shadow-red-500/10 transform -translate-y-2'
                      : 'bg-white border border-neutral-200/90 hover:border-red-200 hover:shadow-md'
                  }`}
                >
                  {/* Step Number Circle / Node */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-display font-black text-lg transition-all duration-300 ${
                        isActive
                          ? 'bg-[#E11D2A] text-white shadow-md shadow-red-500/30 scale-110'
                          : 'bg-neutral-100 text-[#0D0D11] border border-neutral-200'
                      }`}
                    >
                      {step.stepNumber}
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
                      Step {index + 1}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className={`text-base font-bold font-display mb-2 transition-colors ${
                      isActive ? 'text-[#E11D2A]' : 'text-[#0D0D11]'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  {/* Milestone tag */}
                  <div className="pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] font-semibold text-neutral-700">
                    <CheckCircle2 className={`w-3.5 h-3.5 ${isActive ? 'text-[#E11D2A]' : 'text-neutral-400'}`} />
                    <span className="truncate">{step.milestone}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Process Bottom Interactive Banner */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-5 rounded-2xl bg-red-50/70 border border-red-200/60 max-w-2xl mx-auto">
            <div className="text-left">
              <h4 className="text-sm font-bold text-[#0D0D11]">Ready to know where you stand today?</h4>
              <p className="text-xs text-neutral-600">Take a 30-minute diagnostic test and get your predicted band score breakdown.</p>
            </div>
            <button
              onClick={onOpenBatch}
              className="px-5 py-2.5 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white text-xs font-bold whitespace-nowrap transition-colors shadow-sm cursor-pointer"
            >
              Book Diagnostic Test
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
