import React from 'react';
import { motion } from 'motion/react';
import {
  Award,
  Target,
  UserCheck,
  Sparkles,
  Shield,
  TrendingUp,
  Check
} from 'lucide-react';
import { WHY_CHOOSE_ITEMS } from '../data/content';

export const WhyChooseUs: React.FC = () => {
  const renderIcon = (name: string) => {
    switch (name) {
      case 'Award':
        return <Award className="w-6 h-6" />;
      case 'Target':
        return <Target className="w-6 h-6" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      case 'Shield':
        return <Shield className="w-6 h-6" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6" />;
      default:
        return <Award className="w-6 h-6" />;
    }
  };

  return (
    <section id="why-us" className="py-20 bg-neutral-50/70 relative overflow-hidden border-t border-b border-neutral-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100/70 text-[#E11D2A] text-xs font-bold uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>The MY IELTS Advantage</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#0D0D11] tracking-tight leading-tight mb-4">
            Why Students Choose <span className="text-[#E11D2A]">MY IELTS</span>
          </h2>

          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
            We reject mass, impersonal coaching mills. Our high band rate stems from rigorous diagnostics, bespoke mentorship, and unwavering student accountability.
          </p>
        </div>

        {/* 6 Circular-Icon Feature Blocks Inspired by Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_CHOOSE_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-2xl p-7 border border-neutral-200/90 hover:border-red-300 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Circular Icon in banner style (Red + White + Black outline) */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E11D2A] to-[#B91420] text-white flex items-center justify-center shadow-md shadow-red-500/25 mb-6 group-hover:scale-110 transition-transform duration-300 border-2 border-white ring-2 ring-red-100">
                  {renderIcon(item.iconName)}
                </div>

                <h3 className="text-lg font-bold font-display text-[#0D0D11] group-hover:text-[#E11D2A] transition-colors mb-2.5">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-neutral-100 flex items-center gap-2 text-xs font-semibold text-[#0D0D11]">
                <div className="w-4 h-4 rounded-full bg-red-50 text-[#E11D2A] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>Guaranteed Standard</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
