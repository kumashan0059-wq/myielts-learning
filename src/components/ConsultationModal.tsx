import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  X,
  CheckCircle2,
  Sparkles,
  Phone,
  MessageCircle,
  ArrowRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { BRAND_PHONE, BRAND_PHONE_CLEAN } from '../data/content';
import { ModalType } from '../types';
import { BrandLogo } from './BrandLogo';
import { fetchJson } from '../utils/apiClient';

interface ConsultationModalProps {
  type: ModalType;
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  type,
  isOpen,
  onClose,
  defaultService = 'IELTS Academic Preparation',
}) => {
  const [activeTab, setActiveTab] = useState<'consultation' | 'batch'>(
    type === 'batch' ? 'batch' : 'consultation'
  );

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: defaultService,
    destination: 'Canada',
    timing: 'Evening (6:30 PM - 8:30 PM)',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(type === 'batch' ? 'batch' : 'consultation');
      setIsSubmitted(false);
      setSubmitError(null);
      if (defaultService) {
        setFormData((prev) => ({ ...prev, service: defaultService }));
      }
    }
  }, [isOpen, type, defaultService]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await fetchJson('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryType: activeTab,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          destination: formData.destination,
          timing: formData.timing,
          message: formData.message,
        }),
      });
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Unable to connect. Please try again or call our hotline.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmitError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-neutral-200 my-8"
      >
        {/* Top Header Banner in Brand Red + Black */}
        <div className="relative bg-gradient-to-r from-[#0D0D11] via-neutral-900 to-[#E11D2A] text-white p-6 sm:p-7">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-between mb-3 pr-8">
            <BrandLogo variant="dark" size="sm" showTagline={false} />
            <span className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-widest text-red-300 bg-red-950/60 px-2.5 py-0.5 rounded-full border border-red-700/40">
              Admissions
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black font-display text-white">
            {activeTab === 'batch' ? 'Join Our Next Batch' : 'Book Free 1-on-1 Consultation'}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1">
            {activeTab === 'batch'
              ? 'Lock in early-bird tuition discounts and Cambridge study kits.'
              : 'Meet with senior counselors for customized country profiling and diagnostic testing.'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="flex gap-2 mt-4 pt-3 border-t border-white/15">
            <button
              onClick={() => {
                setActiveTab('consultation');
                setIsSubmitted(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'consultation'
                  ? 'bg-[#E11D2A] text-white shadow-sm'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              Free Consultation
            </button>
            <button
              onClick={() => {
                setActiveTab('batch');
                setIsSubmitted(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'batch'
                  ? 'bg-[#E11D2A] text-white shadow-sm'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              Next Batch Enrollment
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-red-50 text-[#E11D2A] flex items-center justify-center mx-auto mb-4 border-2 border-red-200">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h4 className="text-2xl font-bold font-display text-[#0D0D11] mb-2">
                Application Received!
              </h4>

              <p className="text-sm text-neutral-600 mb-6 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-[#0D0D11]">{formData.name || 'Candidate'}</strong>! An academic counselor from MY IELTS will contact you at <strong className="text-[#E11D2A]">{formData.phone || BRAND_PHONE}</strong> within 30 minutes to confirm your slot.
              </p>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 max-w-sm mx-auto mb-6 text-left space-y-1.5">
                <p><strong>Service:</strong> {formData.service}</p>
                <p><strong>Country Priority:</strong> {formData.destination}</p>
                <p><strong>Preferred Timing:</strong> {formData.timing}</p>
                <p><strong>Diagnostic Kit:</strong> Complimentary Cambridge Mock Test included</p>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-[#0D0D11] text-white font-bold text-xs hover:bg-neutral-800 transition-colors"
                >
                  Done
                </button>
                <a
                  href={`https://wa.me/8801754544508?text=Hi%20MY%20IELTS,%20I%20just%20submitted%20my%20request%20for%20${encodeURIComponent(formData.service)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Tanvir Ahmed"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-[#E11D2A] focus:ring-2 focus:ring-red-100 text-sm text-neutral-900 outline-none transition-all"
                  />
                </div>

                {/* Mobile Phone */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g., 01700 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-[#E11D2A] focus:ring-2 focus:ring-red-100 text-sm text-neutral-900 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Service Needed */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Program / Service
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-[#E11D2A] focus:ring-2 focus:ring-red-100 text-sm text-neutral-900 outline-none bg-white transition-all"
                  >
                    <option value="IELTS Academic Preparation">IELTS Academic Preparation</option>
                    <option value="IELTS General Training">IELTS General Training</option>
                    <option value="Spoken English & Fluency">Spoken English & Fluency</option>
                    <option value="Study Abroad Consultation">Study Abroad Consultation</option>
                    <option value="Student Visa Filing">Student Visa Filing</option>
                    <option value="Work Permit Guidance">Work Permit Guidance</option>
                  </select>
                </div>

                {/* Target Destination */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Target Destination
                  </label>
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-[#E11D2A] focus:ring-2 focus:ring-red-100 text-sm text-neutral-900 outline-none bg-white transition-all"
                  >
                    <option value="Canada">Canada 🇨🇦</option>
                    <option value="United Kingdom">United Kingdom 🇬🇧</option>
                    <option value="Australia">Australia 🇦🇺</option>
                    <option value="USA">USA 🇺🇸</option>
                    <option value="Europe">Europe (Germany/Schengen) 🇪🇺</option>
                    <option value="Other">Other Global Country 🌍</option>
                  </select>
                </div>
              </div>

              {/* Timing Preference */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Preferred Batch Timing
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    'Morning (10:00 AM - 12:00 PM)',
                    'Afternoon (3:00 PM - 5:00 PM)',
                    'Evening (6:30 PM - 8:30 PM)',
                    'Weekend Batch (Fri & Sat)'
                  ].map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setFormData({ ...formData, timing: t })}
                      className={`p-2 rounded-lg border text-left transition-all ${
                        formData.timing === t
                          ? 'border-[#E11D2A] bg-red-50 text-[#E11D2A] font-bold'
                          : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {submitError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white font-bold text-sm shadow-md shadow-red-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>
                        {activeTab === 'batch'
                          ? 'Reserve Next Batch Seat'
                          : 'Confirm Free Consultation'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Instant Call / WhatsApp Direct Links */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span>Or connect immediately:</span>
                <div className="flex items-center gap-3">
                  <a
                    href={`tel:${BRAND_PHONE_CLEAN}`}
                    className="inline-flex items-center gap-1 font-bold text-neutral-800 hover:text-[#E11D2A]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#E11D2A]" />
                    <span>{BRAND_PHONE}</span>
                  </a>
                  <span>•</span>
                  <a
                    href="https://wa.me/8801754544508"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
