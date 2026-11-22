import React from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle2, ArrowRight, Sparkles, BookOpen, Clock, Users } from 'lucide-react';
import { ServiceItem } from '../types';
import { BrandLogo } from './BrandLogo';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onEnroll: (serviceName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onEnroll,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-neutral-200"
      >
        {/* Top Header */}
        <div className="bg-[#0D0D11] text-white p-6 border-b-2 border-[#E11D2A] relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-neutral-800 text-white hover:bg-neutral-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-3 pr-8">
            <BrandLogo variant="dark" size="sm" showTagline={false} />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-widest text-[#E11D2A] mb-1 block">
            {service.tag}
          </span>
          <h3 className="text-2xl font-black font-display text-white">
            {service.title}
          </h3>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-neutral-600 leading-relaxed mb-6">
            {service.details}
          </p>

          <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200/80 mb-6">
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">
              Included Deliverables & Strategy
            </h4>
            <ul className="space-y-2 text-xs text-neutral-700">
              {service.highlights.map((h, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E11D2A] flex-shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E11D2A] flex-shrink-0" />
                <span>Cambridge & Official IDP Curricula Standards</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E11D2A] flex-shrink-0" />
                <span>1-on-1 Personalized Mentor Diagnostics</span>
              </li>
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                onClose();
                onEnroll(service.title);
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white font-bold text-sm shadow-md shadow-red-600/25 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Enroll in {service.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="py-3 px-5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-sm transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
