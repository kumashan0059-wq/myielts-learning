import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, Phone, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BRAND_PHONE, BRAND_PHONE_CLEAN } from '../data/content';
import { BrandLogo } from './BrandLogo';

interface FinalCtaSectionProps {
  onOpenConsultation: () => void;
  onOpenBatch: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onOpenConsultation,
  onOpenBatch,
}) => {
  return (
    <section className="relative py-24 bg-[#0D0D11] text-white overflow-hidden">
      
      {/* Background Red + Black Curved Geometric Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Banner inspired curved red light waves */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#E11D2A]/20 blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#E11D2A]/15 blur-3xl" />
        
        {/* Subtle geometric circles */}
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full object-cover opacity-15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="500" cy="250" r="350" stroke="#E11D2A" strokeWidth="1.5" strokeDasharray="10 10" />
          <circle cx="500" cy="250" r="220" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
          <path d="M0 400C300 250 700 250 1000 400" stroke="#E11D2A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Official Brand Logo Lockup */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <BrandLogo variant="dark" size="lg" layout="stacked" showTagline={true} />
        </motion.div>

        {/* Small Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-600/40 text-red-300 text-xs font-bold uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-[#E11D2A] animate-ping" />
          <span>Prepare Smart. Go Global.</span>
        </div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight mb-6"
        >
          Ready to Start Your <span className="text-[#E11D2A]">Global Journey?</span>
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          <span className="font-semibold text-white">Learn today. Lead tomorrow.</span> Let MY IELTS guide your next step toward Band 8.0 and international university admission.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          {/* Primary CTA */}
          <button
            onClick={onOpenConsultation}
            id="final-cta-consultation"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white font-bold text-base shadow-xl shadow-red-600/30 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <Calendar className="w-5 h-5 text-white/90" />
            <span>Book Free Consultation</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={onOpenBatch}
            id="final-cta-batch"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-neutral-100 text-[#0D0D11] hover:text-[#E11D2A] font-bold text-base shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-[#E11D2A]" />
            <span>Join Our Next Batch</span>
          </button>
        </motion.div>

        {/* Clickable Phone Number */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 text-neutral-400 text-sm"
        >
          <span>Prefer direct discussion? Speak with our Academic Advisor:</span>
          <a
            href={`tel:${BRAND_PHONE_CLEAN}`}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-[#E11D2A] text-white hover:text-red-400 font-extrabold text-base transition-colors"
          >
            <Phone className="w-4 h-4 text-[#E11D2A]" />
            <span>{BRAND_PHONE}</span>
          </a>
        </motion.div>

        {/* Trust Badges bottom line */}
        <div className="mt-12 pt-8 border-t border-neutral-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#E11D2A]" />
            <span>Zero Obligation Free Consultation</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#E11D2A]" />
            <span>Certified Mentors & Cambridge Standards</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#E11D2A]" />
            <span>Mirpur Executive Campus, Dhaka</span>
          </div>
        </div>

      </div>
    </section>
  );
};
