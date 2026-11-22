import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  Globe
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface AboutSectionProps {
  onOpenConsultation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenConsultation }) => {
  const pillars = [
    { name: "IELTS Preparation", desc: "Cambridge-certified mentors, simulated test chambers, and guaranteed score strategies." },
    { name: "Spoken English Training", desc: "Interactive phonetics, corporate communication, and spontaneous speaking fluency." },
    { name: "Study Abroad Guidance", desc: "Direct liaisons with accredited universities across Canada, UK, Australia, USA, & Europe." },
    { name: "Visa Processing Support", desc: "Meticulous SOP drafting, financial solvency verification, and embassy interview drills." },
    { name: "Work Permit Guidance", desc: "Post-study work permit navigation (PGWP/485) and skilled career sponsorship pathways." }
  ];

  return (
    <section id="about" className="py-20 bg-neutral-50/60 relative overflow-hidden border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image with Curved Frame and Experience Tag */}
          <div className="lg:col-span-5 relative">
            <div className="relative p-3 rounded-3xl bg-gradient-to-bl from-[#E11D2A] via-[#C8102E] to-[#0D0D11] shadow-2xl">
              <div className="relative h-[440px] sm:h-[480px] rounded-2xl overflow-hidden bg-neutral-900 group">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80"
                  alt="MY IELTS Faculty and Mentors"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D11]/90 via-[#0D0D11]/25 to-transparent" />
                
                {/* Floating Experience Badge */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-white/60 shadow-lg flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#E11D2A] text-white flex items-center justify-center font-display font-black text-sm flex-shrink-0">
                    DHAKA
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0D0D11]">Mirpur Executive Campus</h4>
                    <p className="text-xs text-neutral-600">Personalized IELTS & Spoken English mentorship in Dhaka.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, 5 Core Offerings, CTA */}
          <div className="lg:col-span-7">
            
            <div className="mb-4">
              <BrandLogo size="sm" showTagline={true} />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100/70 text-[#E11D2A] text-xs font-bold uppercase tracking-wider mb-4">
              <Globe className="w-3.5 h-3.5" />
              <span>Our Vision & Legacy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#0D0D11] tracking-tight leading-tight mb-4">
              Your Trusted <span className="text-[#E11D2A]">Educational Consultant</span> in Dhaka
            </h2>

            <p className="text-neutral-700 text-base font-semibold mb-2">
              Real Classroom Learning with Expert Mentors. Build Confidence. Score Better. Go Global.
            </p>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6">
              Located at the heart of <strong className="text-[#0D0D11]">Mirpur, Dhaka</strong> and supported by a community of over <strong className="text-[#E11D2A]">7.7K+ Facebook followers</strong>, <strong className="text-[#0D0D11]">MY IELTS</strong> provides an empowering, stress-free bridge from your diagnostic assessment to your university offer letters and visa approvals across Canada, the UK, Australia, the USA, and Europe.
            </p>

            {/* 5 Offerings List */}
            <div className="space-y-3 mb-8">
              {pillars.map((pillar) => (
                <div key={pillar.name} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-neutral-200/80 shadow-2xs">
                  <div className="w-5 h-5 rounded-full bg-red-50 text-[#E11D2A] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0D0D11] block">{pillar.name}</span>
                    <span className="text-xs text-neutral-500 leading-normal">{pillar.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA: Standardized Action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenConsultation}
                id="about-cta-btn"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white font-bold text-sm shadow-md shadow-red-500/20 transition-all active:scale-95 cursor-pointer"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-600">
                <ShieldCheck className="w-4 h-4 text-[#E11D2A]" />
                <span>Certified Mentorship & Cambridge Test Standards</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
