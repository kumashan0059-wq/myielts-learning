import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Smooth spring physics for fluid progress filling
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div
      id="scroll-progress-wrapper"
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] pointer-events-none select-none"
      role="progressbar"
      aria-label="Page scroll progress"
    >
      {/* Background subtle track */}
      <div className="absolute inset-0 bg-neutral-900/5 backdrop-blur-[0.5px]" />

      {/* Main Animated Crimson Filling Bar */}
      <motion.div
        id="scroll-progress-indicator"
        className="relative h-full w-full origin-left bg-gradient-to-r from-[#990B18] via-[#C8102E] to-[#E11D2A] shadow-[0_1px_6px_rgba(225,29,42,0.6)]"
        style={{ scaleX }}
      >
        {/* Subtle glowing tip flare */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_6px_#E11D2A,0_0_10px_#FF384D] opacity-90" />
      </motion.div>
    </div>
  );
};

export default ScrollProgressBar;
