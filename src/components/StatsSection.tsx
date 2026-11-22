import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  ShieldCheck,
  Facebook,
  MapPin,
  ArrowRight
} from 'lucide-react';
import {
  FACEBOOK_FOLLOWERS,
  BRAND_FACEBOOK_URL,
  BRAND_LOCATION
} from '../data/content';

export const StatsSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="trust-pillars" ref={ref} className="py-16 sm:py-20 bg-[#0D0D11] text-white relative overflow-hidden">
      {/* Background Subtle Red Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[360px] bg-red-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/40 text-red-400 text-xs font-bold uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E11D2A]" />
            <span>Academic Credibility & Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight leading-tight mb-4">
            Built on Integrity, Mentorship & <span className="text-[#E11D2A]">Proven Techniques</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            We focus on genuine student progress, certified classroom coaching, and transparent international educational guidance without exaggerated claims.
          </p>
        </div>

        {/* BRANDED SOCIAL PROOF SECTION (Strict Red + Black + White, NO large blue background) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-6 sm:p-7 rounded-2xl bg-neutral-900/95 border border-neutral-800 hover:border-red-600/40 transition-all flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
        >
          {/* Left info with stylized brand-aligned Facebook icon (strictly Red/Black/White) */}
          <div className="flex items-center gap-4 text-left w-full md:w-auto">
            <div className="w-12 h-12 rounded-xl bg-[#E11D2A] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-red-950/40">
              <Facebook className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h4 className="text-lg font-black text-white font-display">
                  Official MY IELTS Community
                </h4>
                <span className="px-2.5 py-0.5 rounded-full bg-red-950/80 border border-red-800/80 text-white text-xs font-black tracking-wide">
                  {FACEBOOK_FOLLOWERS} Followers
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300">
                Official updates, daily IELTS vocabulary, speaking topics & visa alerts.
              </p>
            </div>
          </div>

          {/* Right action & location */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap sm:flex-nowrap">
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-neutral-400 bg-neutral-800/80 px-3 py-2 rounded-xl border border-neutral-700">
              <MapPin className="w-3.5 h-3.5 text-[#E11D2A]" />
              <span>{BRAND_LOCATION}</span>
            </div>
            <a
              href={BRAND_FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white text-xs sm:text-sm font-bold transition-all shadow-lg shadow-red-950/40 hover:shadow-red-600/20 active:scale-98 cursor-pointer w-full sm:w-auto"
            >
              <span>Follow MY IELTS on Facebook</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default StatsSection;
