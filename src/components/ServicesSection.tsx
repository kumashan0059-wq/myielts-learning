import React from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  Mic,
  Compass,
  Award,
  FileCheck2,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { SERVICES } from '../data/content';
import { ServiceItem } from '../types';
import { Link, APP_ROUTES } from '../router/RouterContext';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenConsultation: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenConsultation,
}) => {
  // Map icon names to Lucide icons
  const renderIcon = (name: string) => {
    switch (name) {
      case 'BookOpen':
        return <BookOpen className="w-6 h-6" />;
      case 'Mic':
        return <Mic className="w-6 h-6" />;
      case 'Compass':
        return <Compass className="w-6 h-6" />;
      case 'Award':
        return <Award className="w-6 h-6" />;
      case 'FileCheck2':
        return <FileCheck2 className="w-6 h-6" />;
      default:
        return <BookOpen className="w-6 h-6" />;
    }
  };

  // Dedicated landing page target map
  const getPageTarget = (id: string) => {
    switch (id) {
      case 'ielts-prep':
        return APP_ROUTES.ielts;
      case 'spoken-english':
        return APP_ROUTES.spokenEnglish;
      case 'study-abroad':
        return APP_ROUTES.studyAbroad;
      case 'our-success':
        return `${APP_ROUTES.home}#stories`;
      case 'ielts-mock-test':
        return APP_ROUTES.mockTests;
      default:
        return APP_ROUTES.ielts;
    }
  };

  return (
    <section id="services" className="py-20 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-[#0D0D11] text-xs font-bold uppercase tracking-wider mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-[#E11D2A]" />
            Our Comprehensive Solutions
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#0D0D11] tracking-tight leading-tight mb-4"
          >
            Everything You Need to <span className="text-[#E11D2A]">Go Global</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-600 text-base sm:text-lg leading-relaxed"
          >
            From high-scoring language proficiency coaching to university admissions, visa applications, and international career paths — we guide you at every milestone.
          </motion.p>
        </div>

        {/* Service Cards (4 core cards + balanced 5th IELTS Mock Test card) */}
        <div className="flex flex-wrap justify-center gap-6">
          {SERVICES.map((service, index) => {
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="w-full md:w-[calc(50%-12px)] xl:w-[calc(25%-18px)] group relative bg-white rounded-2xl p-6 border border-neutral-200/90 hover:border-red-300 shadow-sm hover:shadow-xl hover:shadow-red-950/10 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Expanding Red Accent Line on Top */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-neutral-100 rounded-t-2xl overflow-hidden">
                  <div className="h-full w-0 group-hover:w-full bg-[#E11D2A] transition-all duration-500 ease-out" />
                </div>

                <div>
                  {/* Top Bar: Icon + Tag */}
                  <div className="flex items-center justify-between gap-2 mb-6 pt-2">
                    {/* Animated Circular Icon */}
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#E11D2A] group-hover:bg-[#E11D2A] group-hover:text-white flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-xs shrink-0">
                      {renderIcon(service.iconName)}
                    </div>

                    <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 group-hover:bg-red-50 group-hover:text-[#E11D2A] transition-colors whitespace-nowrap">
                      {service.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold font-display text-[#0D0D11] group-hover:text-[#E11D2A] transition-colors mb-3">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-neutral-600 text-sm leading-relaxed mb-5">
                    {service.shortDescription}
                  </p>

                  {/* Key Highlights Bullet points */}
                  <ul className="space-y-2 mb-6 text-xs font-medium text-neutral-700">
                    {service.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E11D2A] flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action: Learn More linking directly to dedicated page */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <Link
                    to={getPageTarget(service.id)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#0D0D11] group-hover:text-[#E11D2A] transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 text-[#E11D2A] transform group-hover:translate-x-1.5 transition-transform duration-200" />
                  </Link>

                  <button
                    onClick={() => onSelectService(service)}
                    className="text-xs font-semibold text-neutral-400 hover:text-neutral-900 cursor-pointer"
                  >
                    Details
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Fast Assistance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#0D0D11] text-white flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 text-[#E11D2A] border border-red-600/40 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h4 className="text-lg font-bold font-display text-white">Unsure which program fits your current qualifications?</h4>
              <p className="text-neutral-400 text-sm">Take a free 15-minute diagnostic profile evaluation with our head consultant.</p>
            </div>
          </div>
          <button
            onClick={onOpenConsultation}
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white text-sm font-bold transition-all shadow-md shadow-red-600/20 whitespace-nowrap cursor-pointer"
          >
            Request Free Evaluation
          </button>
        </motion.div>

      </div>
    </section>
  );
};
