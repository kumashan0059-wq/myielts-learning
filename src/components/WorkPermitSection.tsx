import React from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  Globe2,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Building,
  UserCheck
} from 'lucide-react';

interface WorkPermitSectionProps {
  onOpenConsultation: () => void;
}

export const WorkPermitSection: React.FC<WorkPermitSectionProps> = ({ onOpenConsultation }) => {
  const permitStreams = [
    {
      title: "Post-Study Work Permits (PGWP / 485 / Graduate Route)",
      desc: "Maximize authorized working years following degree completion in Canada, Australia, and the UK.",
      icon: <Briefcase className="w-5 h-5 text-[#E11D2A]" />
    },
    {
      title: "Employer Sponsorship & LMIA / CoS Assistance",
      desc: "Navigating employer-driven work visas, Labour Market Impact Assessments, and sponsored intra-company transfers.",
      icon: <Building className="w-5 h-5 text-[#E11D2A]" />
    },
    {
      title: "Skilled Migration & Points Maximization (PR)",
      desc: "Strategic credential evaluations (WES/ACS/TRA) and point enhancements to qualify for skilled resident visas.",
      icon: <TrendingUp className="w-5 h-5 text-[#E11D2A]" />
    }
  ];

  return (
    <section id="work-permit" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline, Supporting Text, Key Streams, CTA */}
          <div className="lg:col-span-7">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 text-[#E11D2A] text-xs font-bold uppercase tracking-wider mb-4">
              <Globe2 className="w-3.5 h-3.5" />
              <span>International Career Horizons</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#0D0D11] tracking-tight leading-tight mb-4">
              Build Your Future <span className="text-[#E11D2A]">Beyond Borders.</span>
            </h2>

            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed mb-8">
              Get professional guidance for international work opportunities and work permit applications.
            </p>

            {/* 3 Key Permit Streams */}
            <div className="space-y-4 mb-8">
              {permitStreams.map((stream, idx) => (
                <motion.div
                  key={stream.title}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/90 hover:border-red-300 transition-all flex items-start gap-3.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200/80 flex items-center justify-center flex-shrink-0 shadow-2xs">
                    {stream.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0D0D11] mb-1">
                      {stream.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {stream.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button: Talk to an Expert */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenConsultation}
                id="work-permit-cta"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white font-bold text-base shadow-lg shadow-red-600/25 transition-all active:scale-95 cursor-pointer"
              >
                <UserCheck className="w-5 h-5" />
                <span>Book Free Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Confidential & Certified Assessment</span>
              </div>
            </div>

          </div>

          {/* Right Column: International Career Visual with Red/Black Accent Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative p-3 rounded-3xl bg-gradient-to-tr from-[#0D0D11] via-neutral-900 to-[#E11D2A] shadow-2xl">
              
              <div className="relative h-[420px] sm:h-[480px] rounded-2xl overflow-hidden bg-neutral-900 group">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                  alt="Global Professional Working Internationally"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D11]/90 via-[#0D0D11]/25 to-transparent" />

                {/* Floating overlay chip */}
                <div className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-white/60 shadow-md flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E11D2A]" />
                    <span className="text-xs font-bold text-[#0D0D11]">Skill Shortage List Mapping</span>
                  </div>
                  <span className="text-[11px] font-extrabold text-[#E11D2A]">2026 Updated</span>
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0D0D11]/90 backdrop-blur-sm border border-neutral-700/80 rounded-2xl p-4 text-white">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-neutral-400">Target Jurisdictions:</span>
                    <span className="text-emerald-400 font-bold">100% Legally Aligned</span>
                  </div>
                  <p className="text-sm font-bold text-white mb-2">
                    Canada (PGWP/LMIA) • UK (Graduate/Skilled) • Australia (485/TSS)
                  </p>
                  <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#E11D2A] h-full w-4/5" />
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
