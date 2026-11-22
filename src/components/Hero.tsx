import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  ArrowRight,
  Globe,
  Sparkles,
  Calendar,
  CheckCircle2,
  BookOpen,
  Compass,
  Plane
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import {
  BRAND_PHONE,
  BRAND_PHONE_CLEAN,
  BRAND_TAGLINE
} from '../data/content';

interface HeroProps {
  onOpenConsultation: () => void;
  onOpenBatch: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onOpenBatch }) => {
  const [visualMode, setVisualMode] = useState<'classroom' | 'globe'>('classroom');
  // Smooth spring / cubic-bezier transition curves for ultra-refined motion
  const smoothEase = [0.16, 1, 0.3, 1];

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white pt-5 sm:pt-10 pb-12 sm:pb-16 lg:pb-24 border-b border-neutral-100"
    >
      {/* Background Soft Ambient Light Gradients */}
      <div className="absolute top-8 right-1/4 w-[420px] h-[420px] rounded-full bg-red-600/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 left-8 w-[360px] h-[360px] rounded-full bg-neutral-900/[0.02] blur-3xl pointer-events-none" />

      {/* Subtle Geometric Background Watermark */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full pointer-events-none overflow-hidden select-none opacity-20">
        <svg
          viewBox="0 0 800 800"
          className="w-full h-full object-cover transform translate-x-1/4 -translate-y-12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="400" cy="400" r="360" stroke="#E11D2A" strokeWidth="1.5" strokeDasharray="8 8" />
          <circle cx="400" cy="400" r="280" stroke="#0D0D11" strokeWidth="1" strokeOpacity="0.3" />
          <path
            d="M180 620C290 460 440 360 720 310"
            stroke="#E11D2A"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-10 items-center">
          
          {/* ================= LEFT SIDE: HEADLINE, CTAs & TRUST POINTS ================= */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Top Brand Logo + Tagline Chip */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: smoothEase }}
              className="flex flex-wrap items-center gap-3.5 mb-5"
            >
              <BrandLogo size="md" showTagline={false} />
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50/90 border border-red-200/80 text-[#E11D2A] text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#E11D2A] inline-block animate-pulse" />
                <span>{BRAND_TAGLINE}</span>
              </div>
            </motion.div>

            {/* MAIN HEADLINE WITH BOLD BLACK & CRIMSON COLOR SPLIT */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-black font-display tracking-[-0.03em] leading-[1.08] sm:leading-[1.05] mb-5 sm:mb-6">
              {/* Part 1: Bold Black */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.22, ease: smoothEase }}
                className="text-[#0D0D11] block"
              >
                Learn Today,
              </motion.span>
              
              {/* Part 2: Bold Crimson Red */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.38, ease: smoothEase }}
                className="relative inline-block text-[#E11D2A]"
              >
                Lead Tomorrow.
                
                {/* Elegant Curved Crimson Sweep Underline */}
                <svg
                  className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[#E11D2A]"
                  viewBox="0 0 320 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.75, delay: 0.52, ease: 'easeInOut' }}
                    d="M3 12C70 4 190 2 317 7"
                    stroke="#E11D2A"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 0.75, delay: 0.62, ease: 'easeInOut' }}
                    d="M100 13C160 8 240 7 305 10"
                    stroke="#0D0D11"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.span>
            </h1>

            {/* Refined Supporting Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.52, ease: smoothEase }}
              className="text-base sm:text-[17px] text-neutral-600 font-normal leading-[1.65] max-w-xl mb-7 sm:mb-8"
            >
              Expert IELTS preparation, Spoken English training and complete guidance for your global journey.
            </motion.p>

            {/* REFINED CTA BUTTONS ROW WITH SMOOTH REVEAL */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6">
              
              {/* Primary CTA: "Book Free Consultation" */}
              <motion.button
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.68, ease: smoothEase }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenConsultation}
                id="hero-primary-cta"
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white font-bold text-base shadow-lg shadow-red-600/25 hover:shadow-red-600/35 transition-all duration-200 cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-white/90" />
                <span>Book Free Consultation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>

              {/* Secondary CTA: "Join Our Next Batch" */}
              <motion.button
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.78, ease: smoothEase }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenBatch}
                id="hero-secondary-cta"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white hover:bg-neutral-50 text-[#0D0D11] hover:text-[#E11D2A] font-bold text-base border-2 border-neutral-300 hover:border-[#E11D2A] shadow-xs transition-all duration-200 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-[#E11D2A]" />
                <span>Join Our Next Batch</span>
              </motion.button>
            </div>

            {/* Direct Phone Assistance Helpline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.88, ease: smoothEase }}
              className="flex items-center gap-2.5 text-sm font-semibold text-neutral-700"
            >
              <span className="text-neutral-500 font-medium">Have questions? Call direct:</span>
              <a
                href={`tel:${BRAND_PHONE_CLEAN}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-[#E11D2A] font-extrabold tracking-wide transition-colors group cursor-pointer"
                aria-label={`Call MY IELTS at ${BRAND_PHONE}`}
              >
                <div className="w-6 h-6 rounded-full bg-[#E11D2A] text-white flex items-center justify-center shadow-xs">
                  <Phone className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                </div>
                <span>{BRAND_PHONE}</span>
              </a>
            </motion.div>

          </div>

          {/* ================= RIGHT SIDE: CURVED RED-AND-BLACK DECORATIVE FRAME ================= */}
          <div className="lg:col-span-5 relative flex justify-center items-center w-full px-2 sm:px-4 lg:px-0">
            
            <div className="relative w-full max-w-[360px] sm:max-w-[490px] lg:max-w-none mx-auto py-5 sm:py-6">
              
              {/* Premium Curved Red-and-Black Decorative Frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.45, ease: smoothEase }}
                className="relative"
              >
                {/* 1. Outer Asymmetric Curved Red-and-Black Backdrop Frame */}
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-br from-[#E11D2A] via-[#C8102E] to-[#0D0D11] rounded-[34px] sm:rounded-[52px] rounded-tr-[75px] sm:rounded-tr-[130px] rounded-bl-[60px] sm:rounded-bl-[100px] shadow-xl sm:shadow-2xl shadow-red-950/25 -z-10" />

                {/* 2. Secondary Offset Jet-Black Accent Contour at Top-Right */}
                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-20 h-20 sm:w-28 sm:h-28 bg-[#0D0D11] rounded-[24px] sm:rounded-[36px] rounded-tr-[50px] sm:rounded-tr-[70px] -z-20 border sm:border-2 border-red-600/30 shadow-md sm:shadow-lg" />

                {/* 3. Secondary Offset Crimson Accent Contour at Bottom-Left */}
                <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-20 h-20 sm:w-32 sm:h-32 bg-[#E11D2A] rounded-[24px] sm:rounded-[38px] rounded-bl-[50px] sm:rounded-bl-[70px] -z-20 opacity-80 shadow-sm sm:shadow-md" />

                {/* 4. Decorative Dynamic Curved Arcs (SVG) */}
                <svg
                  className="absolute -inset-2 sm:-inset-6 w-[calc(100%+16px)] sm:w-[calc(100%+48px)] h-[calc(100%+16px)] sm:h-[calc(100%+48px)] pointer-events-none -z-5"
                  viewBox="0 0 520 540"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Top-right swooping contour */}
                  <path
                    d="M320 18C440 24 496 70 502 190"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    opacity="0.35"
                  />
                  {/* Bottom-left swooping contour */}
                  <path
                    d="M18 360C26 460 80 508 190 518"
                    stroke="#E11D2A"
                    strokeWidth="3"
                    opacity="0.6"
                  />
                  {/* Outer sweeping arc */}
                  <path
                    d="M60 40C200 -20 420 30 480 150"
                    stroke="#0D0D11"
                    strokeWidth="1.5"
                    opacity="0.25"
                  />
                </svg>

                {/* 5. Inner Pristine White Framing Margin */}
                <div className="relative overflow-hidden rounded-[28px] sm:rounded-[44px] rounded-tr-[68px] sm:rounded-tr-[116px] rounded-bl-[52px] sm:rounded-bl-[88px] bg-white p-2 sm:p-3.5 border sm:border-2 border-white shadow-inner">
                  
                  {/* View Mode Switcher Pill */}
                  <div className="absolute top-4 right-4 sm:top-5 sm:right-6 z-30 flex items-center bg-black/75 backdrop-blur-md p-1 rounded-full border border-white/20 shadow-lg">
                    <button
                      onClick={() => setVisualMode('classroom')}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        visualMode === 'classroom'
                          ? 'bg-[#E11D2A] text-white shadow-sm'
                          : 'text-neutral-300 hover:text-white'
                      }`}
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Classroom</span>
                    </button>
                    <button
                      onClick={() => setVisualMode('globe')}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        visualMode === 'globe'
                          ? 'bg-[#E11D2A] text-white shadow-sm'
                          : 'text-neutral-300 hover:text-white'
                      }`}
                    >
                      <Globe className="w-3 h-3" />
                      <span>Global Paths</span>
                    </button>
                  </div>

                  {/* Dual-Mode Visual Container */}
                  <div className="relative h-[280px] sm:h-[420px] lg:h-[490px] w-full rounded-[22px] sm:rounded-[34px] rounded-tr-[58px] sm:rounded-tr-[100px] rounded-bl-[42px] sm:rounded-bl-[74px] overflow-hidden group">
                    <AnimatePresence mode="wait">
                      {visualMode === 'classroom' ? (
                        <motion.div
                          key="classroom-view"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="w-full h-full relative"
                        >
                          <img
                            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
                            alt="MY IELTS Active Classroom Learning and Academic Environment"
                            className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                          />

                          {/* Gradient Overlay for high text legibility */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D11]/90 via-[#0D0D11]/25 to-transparent" />

                          {/* Signature MY IELTS Curved Crimson Ribbon Sweep at base of photo */}
                          <svg
                            viewBox="0 0 400 200"
                            className="absolute -bottom-2 left-0 w-full pointer-events-none"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M-20 175C110 85 270 95 420 165L420 220L-20 220Z"
                              fill="#E11D2A"
                            />
                            <path
                              d="M-20 190C120 120 260 125 420 185"
                              stroke="#FFFFFF"
                              strokeWidth="2.5"
                              strokeDasharray="5 5"
                            />
                          </svg>

                          {/* Classroom Badge at the bottom of the photo */}
                          <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 z-10 text-white">
                            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white text-[#0D0D11] text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-1.5 sm:mb-2 shadow-md">
                              <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E11D2A]" />
                              <span>Real Classroom Learning</span>
                            </div>
                            <p className="text-xs sm:text-base font-black text-white tracking-tight">
                              Mirpur Executive Campus • Interactive Spoken Lab
                            </p>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="globe-view"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="w-full h-full bg-[#0D0D11] relative flex flex-col items-center justify-center p-6 text-white overflow-hidden"
                        >
                          {/* Radial Background Glow */}
                          <div className="absolute inset-0 bg-radial from-red-600/20 via-transparent to-transparent opacity-70" />

                          {/* Compact Elegant Rotating Globe SVG (40-50% visual area) */}
                          <div className="relative w-44 h-44 sm:w-56 sm:h-56 my-auto flex items-center justify-center">
                            {/* Outer Orbit Ring */}
                            <div className="absolute inset-0 rounded-full border border-red-500/20 animate-spin" style={{ animationDuration: '30s' }} />
                            
                            {/* Inner Globe Sphere with Meridians */}
                            <svg className="w-full h-full" viewBox="0 0 200 200">
                              {/* Globe outline circle */}
                              <circle cx="100" cy="100" r="80" fill="#141419" stroke="#E11D2A" strokeWidth="2" strokeOpacity="0.4" />
                              
                              {/* Animated Parallels / Latitudes */}
                              <ellipse cx="100" cy="100" rx="80" ry="24" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.2" />
                              <ellipse cx="100" cy="100" rx="80" ry="52" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.15" />
                              <line x1="20" y1="100" x2="180" y2="100" stroke="#E11D2A" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="3 3" />

                              {/* Meridians (Longitudes) */}
                              <ellipse cx="100" cy="100" rx="30" ry="80" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.25" />
                              <ellipse cx="100" cy="100" rx="60" ry="80" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.15" />
                              <line x1="100" y1="20" x2="100" y2="180" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.2" />

                              {/* Flight Arcs originating from Dhaka (approx center-east) */}
                              {/* Dhaka to UK */}
                              <path d="M 125,95 Q 100,55 75,70" fill="none" stroke="#E11D2A" strokeWidth="2" strokeDasharray="4 2" className="animate-pulse" />
                              {/* Dhaka to Canada */}
                              <path d="M 125,95 Q 85,35 45,65" fill="none" stroke="#E11D2A" strokeWidth="1.5" strokeDasharray="3 2" />
                              {/* Dhaka to Australia */}
                              <path d="M 125,95 Q 145,130 150,145" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 2" />

                              {/* Dhaka Beacon Node */}
                              <circle cx="125" cy="95" r="4" fill="#E11D2A" />
                              <circle cx="125" cy="95" r="8" fill="none" stroke="#E11D2A" strokeWidth="1.5" className="animate-ping" style={{ transformOrigin: '125px 95px' }} />

                              {/* Destination Nodes */}
                              <circle cx="75" cy="70" r="3" fill="#FFFFFF" />
                              <circle cx="45" cy="65" r="3" fill="#FFFFFF" />
                              <circle cx="150" cy="145" r="3" fill="#FFFFFF" />
                            </svg>

                            {/* Center Logo Pin */}
                            <div className="absolute w-7 h-7 rounded-full bg-[#0D0D11] border border-red-500 flex items-center justify-center text-white shadow-md">
                              <Compass className="w-4 h-4 text-[#E11D2A] animate-spin" style={{ animationDuration: '12s' }} />
                            </div>
                          </div>

                          {/* Globe Footer Tag */}
                          <div className="relative z-10 text-center mt-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/80 text-white text-xs font-bold mb-1">
                              <Plane className="w-3.5 h-3.5 text-[#E11D2A]" />
                              <span>Global Pathways from Mirpur, Dhaka</span>
                            </div>
                            <p className="text-[11px] text-neutral-400">
                              Canada • UK • Australia • USA • Germany • Ireland
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Shimmer Light Accent sweeping on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                  </div>
                </div>

                {/* TOP FLOATING PILL: Quality Learning Standard - Safely positioned on mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.95, ease: smoothEase }}
                  className="absolute -top-3 sm:-top-4 left-1 sm:-left-5 bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3.5 shadow-lg sm:shadow-xl border border-neutral-100 flex items-center gap-2 sm:gap-3 z-20 max-w-[85%] sm:max-w-none"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#E11D2A] text-white flex items-center justify-center shadow-md shadow-red-500/30 flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Certified Mentorship</span>
                    <p className="text-[11px] sm:text-sm font-black text-[#0D0D11] leading-tight font-display">Cambridge Test Standards</p>
                  </div>
                </motion.div>

                {/* BOTTOM FLOATING PILL: Global Support - Safely positioned on mobile */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55, delay: 1.1, ease: smoothEase }}
                  className="absolute -bottom-3 sm:-bottom-4 right-1 sm:-right-5 bg-[#0D0D11] text-white rounded-xl sm:rounded-2xl p-2 sm:p-3.5 shadow-xl sm:shadow-2xl border border-neutral-800 flex items-center gap-2 sm:gap-3 z-20 max-w-[85%] sm:max-w-none"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-red-950/60 border border-red-800 text-[#E11D2A] flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-medium text-neutral-400 block">Global Study Support</span>
                    <p className="text-[11px] sm:text-sm font-black text-white leading-tight font-display">Dedicated Visa Mentorship</p>
                  </div>
                </motion.div>

              </motion.div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
