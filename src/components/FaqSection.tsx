import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Plus, Minus, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { FAQ_ITEMS, BRAND_PHONE, BRAND_PHONE_CLEAN } from '../data/content';

interface FaqSectionProps {
  onOpenConsultation: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenConsultation }) => {
  const [openId, setOpenId] = useState<string | null>('q1');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#E11D2A] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#0D0D11] tracking-tight leading-tight mb-4">
            Frequently Asked <span className="text-[#E11D2A]">Questions</span>
          </h2>

          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
            Everything you need to know about our batches, exam strategies, destination countries, and visa support.
          </p>
        </div>

        {/* 7 Accordion Items */}
        <div className="space-y-3.5 mb-14">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#E11D2A] bg-white shadow-md shadow-red-500/5 ring-1 ring-red-100'
                    : 'border-neutral-200/90 bg-neutral-50/50 hover:bg-neutral-50'
                }`}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full py-4 px-6 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-display font-bold text-xs flex-shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-[#E11D2A] text-white'
                        : 'bg-neutral-200/80 text-neutral-700'
                    }`}>
                      0{index + 1}
                    </span>
                    <span className={`font-display font-bold text-base sm:text-lg transition-colors ${
                      isOpen ? 'text-[#E11D2A]' : 'text-[#0D0D11] group-hover:text-[#E11D2A]'
                    }`}>
                      {item.question}
                    </span>
                  </div>

                  {/* Smooth Rotating Plus-to-Minus Accordion Icon */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      isOpen
                        ? 'bg-red-50 text-[#E11D2A]'
                        : 'text-neutral-400 bg-white border border-neutral-200/90 group-hover:text-neutral-700 group-hover:border-neutral-300'
                    }`}
                  >
                    <motion.div
                      animate={{
                        opacity: isOpen ? 0 : 1,
                        rotate: isOpen ? 90 : 0,
                        scale: isOpen ? 0.6 : 1,
                      }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.div>

                    <motion.div
                      animate={{
                        opacity: isOpen ? 1 : 0,
                        rotate: isOpen ? 0 : -90,
                        scale: isOpen ? 1 : 0.6,
                      }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </motion.div>
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-5 pt-1 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pl-16">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Quick Contact Bar below FAQs */}
        <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E11D2A] flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#0D0D11]">Still have questions?</p>
              <p className="text-xs text-neutral-500">Our counselors are available daily from 9:00 AM to 8:00 PM.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${BRAND_PHONE_CLEAN}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-300 hover:border-[#E11D2A] bg-white text-[#0D0D11] text-xs font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E11D2A]" />
              <span>{BRAND_PHONE}</span>
            </a>
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#E11D2A] text-white hover:bg-[#C8102E] text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              <span>Ask an Advisor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
