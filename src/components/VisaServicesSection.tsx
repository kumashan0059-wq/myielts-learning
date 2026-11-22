import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileCheck,
  GraduationCap,
  FileText,
  FolderCheck,
  PenTool,
  ShieldCheck,
  Plane,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Clock
} from 'lucide-react';
import { VISA_SERVICES_LIST, VISA_TIMELINE } from '../data/content';

interface VisaServicesSectionProps {
  onOpenConsultation: () => void;
}

export const VisaServicesSection: React.FC<VisaServicesSectionProps> = ({ onOpenConsultation }) => {
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);

  const renderServiceIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5" />;
      case 'FileText':
        return <FileText className="w-5 h-5" />;
      case 'FolderCheck':
        return <FolderCheck className="w-5 h-5" />;
      case 'PenTool':
        return <PenTool className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Plane':
        return <Plane className="w-5 h-5" />;
      default:
        return <FileCheck className="w-5 h-5" />;
    }
  };

  return (
    <section id="visa" className="py-20 bg-white relative overflow-hidden border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#E11D2A] text-xs font-bold uppercase tracking-wider mb-3">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Meticulous Compliance & High Visa Success</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#0D0D11] tracking-tight leading-tight mb-4">
            Flawless Visa Guidance & <span className="text-[#E11D2A]">Filing Processing</span>
          </h2>

          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
            Eliminate document ambiguities, avoid embassy refusals, and secure your student permit with strategic case architecture and mock interview conditioning.
          </p>
        </div>

        {/* 6 Visa Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {VISA_SERVICES_LIST.map((srv, idx) => (
            <motion.div
              key={srv.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-5 rounded-2xl bg-neutral-50/70 border border-neutral-200/80 hover:border-red-300 hover:bg-white transition-all duration-300 shadow-2xs hover:shadow-md group"
            >
              <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-[#E11D2A] text-[#E11D2A] group-hover:text-white flex items-center justify-center shadow-xs border border-neutral-200/80 group-hover:border-[#E11D2A] transition-colors mb-3.5">
                {renderServiceIcon(srv.icon)}
              </div>
              <h3 className="text-base font-bold font-display text-[#0D0D11] group-hover:text-[#E11D2A] transition-colors mb-1.5">
                {srv.title}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {srv.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ANIMATED VISA TIMELINE: 01 to 06 */}
        <div className="bg-[#0D0D11] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          
          {/* Subtle Red Ambient Light in Corner */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 mb-10 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-[#E11D2A] uppercase mb-2 block">
              Step-by-Step Transparency
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-white">
              The 6-Stage Visa Roadmap
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm mt-2">
              Every applicant receives a dedicated legal officer and transparent milestone updates at each phase.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5 relative z-10">
            {VISA_TIMELINE.map((item, index) => {
              const isSelected = activeTimelineStep === index;

              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => setActiveTimelineStep(index)}
                  className={`p-4 rounded-2xl transition-all duration-300 border cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-neutral-800/90 border-[#E11D2A] shadow-lg shadow-red-950/40 ring-1 ring-[#E11D2A]'
                      : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`font-display font-black text-xl ${
                        isSelected ? 'text-[#E11D2A]' : 'text-neutral-500'
                      }`}>
                        {item.step}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
                        {item.duration}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-neutral-800/60 flex items-center justify-between text-[10px] font-medium text-neutral-400">
                    <span>Phase {index + 1}</span>
                    <CheckCircle className={`w-3.5 h-3.5 ${isSelected ? 'text-[#E11D2A]' : 'text-neutral-600'}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Timeline Action footer */}
          <div className="mt-10 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-neutral-300 text-xs">
              <Sparkles className="w-4 h-4 text-[#E11D2A]" />
              <span>Have a prior visa refusal? Our senior appellate counselors conduct refusal re-filings.</span>
            </div>

            <button
              onClick={onOpenConsultation}
              className="px-6 py-3 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shadow-md"
            >
              Book Free Consultation
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
