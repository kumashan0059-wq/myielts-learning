import React, { useState, useEffect } from 'react';
import { Calendar, MessageCircle, ArrowUp } from 'lucide-react';

interface FloatingActionsProps {
  onOpenConsultation: () => void;
  onOpenBatch: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenConsultation,
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      id="floating-actions-container"
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5 pointer-events-none"
    >
      {/* Subtle Unobtrusive Back-to-top (Desktop only, tiny) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="hidden md:flex w-7 h-7 rounded-full bg-white/90 hover:bg-white text-neutral-700 hover:text-black border border-neutral-300 items-center justify-center shadow-sm transition-all cursor-pointer pointer-events-auto active:scale-95"
          aria-label="Scroll back to top"
          title="Back to top"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Secondary Action: Subtle Consultation Pill (Desktop only to prevent mobile clutter) */}
      <button
        onClick={onOpenConsultation}
        className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0D0D11] hover:bg-[#E11D2A] text-white text-xs font-semibold shadow-md border border-neutral-700/60 hover:border-red-600 transition-all cursor-pointer pointer-events-auto active:scale-95 group"
      >
        <Calendar className="w-3.5 h-3.5 text-[#E11D2A] group-hover:text-white transition-colors" />
        <span>Free Consultation</span>
      </button>

      {/* PRIMARY FLOATING ACTION: WhatsApp (Compact, unobtrusive, clean) */}
      <a
        href="https://wa.me/8801754544508?text=Hello%20MY%20IELTS,%20I%20would%20like%20to%20know%20more%20about%20your%20IELTS%20courses%20and%20consultations."
        target="_blank"
        rel="noreferrer"
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-lg shadow-emerald-950/25 hover:scale-105 active:scale-95 transition-all cursor-pointer pointer-events-auto group relative"
        aria-label="Chat with MY IELTS on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
        
        {/* Hover Tooltip (Desktop only) */}
        <span className="hidden sm:block absolute right-14 bg-[#0D0D11] text-white text-[11px] font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md border border-neutral-700">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
};

export default FloatingActions;
