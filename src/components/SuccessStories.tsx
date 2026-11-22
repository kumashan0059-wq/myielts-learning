import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Award,
  CheckCircle,
  GraduationCap
} from 'lucide-react';
import { TESTIMONIALS } from '../data/content';
import { Testimonial } from '../types';

export const SuccessStories: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState<Testimonial[]>(TESTIMONIALS);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const current = items[currentIndex];

  return (
    <section id="stories" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#E11D2A] text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Alumni Milestone Hall</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#0D0D11] tracking-tight leading-tight mb-4">
            Success Stories That <span className="text-[#E11D2A]">Inspire Us</span>
          </h2>

          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
            Real scores, real visas, and real global careers. Read how our candidates achieved life-changing band scores and admissions.
          </p>
        </div>

        {/* Testimonial Showcase Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-neutral-50 via-white to-red-50/30 rounded-3xl p-6 sm:p-10 border border-neutral-200/90 shadow-xl overflow-hidden">
            
            {/* Top Red Graphic Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E11D2A] via-[#C8102E] to-[#0D0D11]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                {/* Left: Student Photo & Badges */}
                <div className="md:col-span-4 flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-xl ring-4 ring-red-100">
                      <img
                        src={current.photo}
                        alt={current.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* IELTS Score Badge */}
                    {current.scoreBadge && (
                      <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-[#E11D2A] text-white text-xs font-black font-display shadow-md flex items-center gap-1 border-2 border-white">
                        <Award className="w-3.5 h-3.5" />
                        <span>{current.scoreBadge}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-bold font-display text-[#0D0D11]">
                    {current.name}
                  </h3>

                  <p className="text-xs text-neutral-500 font-medium">
                    {current.course}
                  </p>

                  <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>{current.achievement}</span>
                  </div>

                  {current.university && (
                    <p className="text-[11px] text-neutral-600 font-medium mt-1">
                      {current.university}, {current.country}
                    </p>
                  )}
                </div>

                {/* Right: Quote Content */}
                <div className="md:col-span-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Quote className="w-10 h-10 text-red-200" />
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>

                    <p className="text-base sm:text-lg text-neutral-700 italic leading-relaxed mb-6 font-medium">
                      “{current.quote}”
                    </p>
                  </div>

                  {/* Alumni Badge */}
                  <div className="pt-4 border-t border-neutral-200/60 flex items-center justify-between text-xs text-neutral-500">
                    <span className="flex items-center gap-1.5 font-semibold text-neutral-700">
                      <GraduationCap className="w-4 h-4 text-[#E11D2A]" /> Verified MY IELTS Graduate
                    </span>
                    <span className="text-[11px] font-bold text-[#E11D2A]">
                      Cohort Story {currentIndex + 1} of {items.length}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls: Arrows & Dots */}
            <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between">
              
              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx
                        ? 'w-7 bg-[#E11D2A]'
                        : 'w-2.5 bg-neutral-200 hover:bg-neutral-300'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="p-2.5 rounded-xl border border-neutral-200 hover:border-[#E11D2A] bg-white hover:bg-red-50 text-neutral-700 hover:text-[#E11D2A] transition-colors cursor-pointer shadow-xs"
                  aria-label="Previous story"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2.5 rounded-xl border border-neutral-200 hover:border-[#E11D2A] bg-white hover:bg-red-50 text-neutral-700 hover:text-[#E11D2A] transition-colors cursor-pointer shadow-xs"
                  aria-label="Next story"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
