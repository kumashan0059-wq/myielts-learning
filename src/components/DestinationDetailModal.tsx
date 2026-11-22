import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  GraduationCap,
  ShieldCheck,
  Building2,
  Coins,
  Clock,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  FileText,
  Plane,
  Award,
  Calendar,
  Sparkles,
  Info,
  Check
} from 'lucide-react';
import { Destination } from '../types';

interface DestinationDetailModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: (countryName?: string) => void;
}

type DetailTab = 'admissions' | 'visa' | 'universities' | 'costs';

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  isOpen,
  onClose,
  onOpenConsultation,
}) => {
  const [activeTab, setActiveTab] = useState<DetailTab>('admissions');

  // Reset tab when destination changes
  useEffect(() => {
    if (isOpen) {
      setActiveTab('admissions');
    }
  }, [destination?.id, isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !destination) return null;

  const adm = destination.admissionRequirements;
  const visa = destination.visaPathway;

  return (
    <AnimatePresence>
      <div
        id="destination-modal-backdrop"
        className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-neutral-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="destination-modal-title"
        >
          {/* Header Banner */}
          <div className="relative h-44 sm:h-52 w-full flex-shrink-0 bg-neutral-900 overflow-hidden">
            <img
              src={destination.image}
              alt={`${destination.country} Study Destination`}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-black/30" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-[#E11D2A] text-white flex items-center justify-center transition-all duration-200 cursor-pointer border border-white/20 shadow-lg"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Region & Visa Category Badges */}
            <div className="absolute top-4 left-4 sm:left-6 flex flex-wrap items-center gap-2 z-10">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                {destination.region}
              </span>
              {visa && (
                <span className="px-3 py-1 rounded-full bg-red-600/90 backdrop-blur-md text-white text-xs font-bold border border-red-400/30 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{visa.visaSubclass.split('(')[0].trim()}</span>
                </span>
              )}
            </div>

            {/* Country Title and Tagline */}
            <div className="absolute bottom-4 left-4 sm:left-6 right-16 z-10 text-white">
              <div className="flex items-center gap-2.5 mb-1">
                <span className="text-3xl sm:text-4xl">{destination.flag}</span>
                <h3
                  id="destination-modal-title"
                  className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-white"
                >
                  Study in {destination.country}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-200 line-clamp-1 max-w-2xl font-medium">
                {destination.tagline}
              </p>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="bg-neutral-900 text-white px-4 sm:px-6 py-2.5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-b border-neutral-800 flex-shrink-0">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#FF384D] flex-shrink-0" />
              <div>
                <span className="text-neutral-400 text-[10px] block uppercase">Min. IELTS</span>
                <span className="font-bold text-white truncate">
                  {adm ? adm.minIeltsUndergrad.replace('Overall', 'UG') : 'Band 6.0 - 6.5+'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#FF384D] flex-shrink-0" />
              <div>
                <span className="text-neutral-400 text-[10px] block uppercase">Post-Study Work</span>
                <span className="font-bold text-white truncate">{destination.postStudyWork}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FF384D] flex-shrink-0" />
              <div>
                <span className="text-neutral-400 text-[10px] block uppercase">Intakes</span>
                <span className="font-bold text-white truncate">{destination.intakes}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-[#FF384D] flex-shrink-0" />
              <div>
                <span className="text-neutral-400 text-[10px] block uppercase">Est. Tuition</span>
                <span className="font-bold text-white truncate">
                  {destination.avgTuition ? destination.avgTuition.split('/')[0].trim() : 'Competitive'}
                </span>
              </div>
            </div>
          </div>

          {/* Tab Navigation Controls */}
          <div className="px-4 sm:px-6 pt-3 pb-2 border-b border-neutral-200 bg-neutral-50/70 flex items-center gap-1.5 sm:gap-2 overflow-x-auto flex-shrink-0 no-scrollbar">
            <button
              onClick={() => setActiveTab('admissions')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'admissions'
                  ? 'bg-[#E11D2A] text-white shadow-sm shadow-red-500/20'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200/80 hover:bg-neutral-100'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Admission Requirements</span>
            </button>

            <button
              onClick={() => setActiveTab('visa')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'visa'
                  ? 'bg-[#E11D2A] text-white shadow-sm shadow-red-500/20'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200/80 hover:bg-neutral-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Visa Pathways & PR</span>
            </button>

            <button
              onClick={() => setActiveTab('universities')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'universities'
                  ? 'bg-[#E11D2A] text-white shadow-sm shadow-red-500/20'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200/80 hover:bg-neutral-100'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Partner Universities</span>
            </button>

            <button
              onClick={() => setActiveTab('costs')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'costs'
                  ? 'bg-[#E11D2A] text-white shadow-sm shadow-red-500/20'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200/80 hover:bg-neutral-100'
              }`}
            >
              <Coins className="w-4 h-4" />
              <span>Tuition & Living Costs</span>
            </button>
          </div>

          {/* Scrollable Tab Content Body */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
            
            {/* TAB 1: ADMISSION REQUIREMENTS */}
            {activeTab === 'admissions' && adm && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Overview Note */}
                <div className="p-4 rounded-2xl bg-red-50/70 border border-red-100 flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#E11D2A] flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                    <strong className="text-neutral-900 font-bold block mb-0.5">
                      Target Admission Criteria for {destination.country}:
                    </strong>
                    {destination.description} {adm.notes}
                  </div>
                </div>

                {/* Score & Academic Qualifications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Language Test Cutoffs */}
                  <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/90">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#E11D2A] uppercase tracking-wider mb-3">
                      <GraduationCap className="w-4 h-4" />
                      <span>English Proficiency Standards</span>
                    </div>

                    <div className="space-y-2.5 text-xs sm:text-sm">
                      <div className="p-2.5 rounded-xl bg-white border border-neutral-200/70">
                        <span className="text-neutral-500 text-[11px] block uppercase font-semibold">Undergraduate / Bachelor's:</span>
                        <span className="font-bold text-neutral-900">{adm.minIeltsUndergrad}</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-neutral-200/70">
                        <span className="text-neutral-500 text-[11px] block uppercase font-semibold">Postgraduate / Master's:</span>
                        <span className="font-bold text-neutral-900">{adm.minIeltsPostgrad}</span>
                      </div>

                      <div className="pt-2">
                        <span className="text-neutral-500 text-[11px] block mb-1 font-semibold">Accepted Alternative Tests:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {adm.alternateTests.map((test) => (
                            <span
                              key={test}
                              className="px-2.5 py-1 rounded-lg bg-neutral-200/80 text-neutral-800 text-xs font-medium"
                            >
                              {test}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Academic GPA & Standardized Tests */}
                  <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/90">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#E11D2A] uppercase tracking-wider mb-3">
                      <Award className="w-4 h-4" />
                      <span>Academic GPA & Standardized Tests</span>
                    </div>

                    <div className="space-y-2.5 text-xs sm:text-sm">
                      <div className="p-2.5 rounded-xl bg-white border border-neutral-200/70">
                        <span className="text-neutral-500 text-[11px] block uppercase font-semibold">Minimum Academic Grade / GPA:</span>
                        <span className="font-bold text-neutral-900">{adm.minGpa}</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-neutral-200/70">
                        <span className="text-neutral-500 text-[11px] block uppercase font-semibold">GRE / GMAT / SAT Policy:</span>
                        <span className="text-neutral-800 font-medium">{adm.standardizedTests}</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-neutral-200/70">
                        <span className="text-neutral-500 text-[11px] block uppercase font-semibold">Key Application Deadlines:</span>
                        <span className="font-bold text-[#E11D2A]">{adm.applicationDeadlines}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mandatory Application Documents Checklist */}
                <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#E11D2A]" />
                      <h4 className="font-bold text-sm sm:text-base text-neutral-900 font-display">
                        Mandatory Application Document Dossier
                      </h4>
                    </div>
                    <span className="text-xs font-semibold text-neutral-500">
                      {adm.mandatoryDocuments.length} Required Items
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {adm.mandatoryDocuments.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-200/60 text-xs sm:text-sm text-neutral-800"
                      >
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="leading-snug">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: VISA PATHWAYS & PR */}
            {activeTab === 'visa' && visa && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Visa Subclass Card */}
                <div className="p-5 rounded-2xl bg-neutral-900 text-white relative overflow-hidden shadow-md">
                  <div className="relative z-10">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF384D] block mb-1">
                      Official Student Visa Category
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black font-display text-white mb-2">
                      {visa.visaSubclass}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed mb-4">
                      Comprehensive visa filing support, Genuine Student (GS) compliance, financial verification, and priority lodgment via certified educational agents.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-neutral-800 text-xs">
                      <div>
                        <span className="text-neutral-400 block text-[10px] uppercase">Standard Visa Processing Time:</span>
                        <span className="font-bold text-white text-sm">{visa.processingTimeline}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[10px] uppercase">Financial Solvency Proof:</span>
                        <span className="font-bold text-[#FF384D] text-sm">{visa.financialSolvency}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Work Rights & Post-Study Work Permit Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Working Hours during Studies */}
                  <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/90 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#E11D2A] uppercase tracking-wider mb-2">
                        <Clock className="w-4 h-4" />
                        <span>Work Rights During Studies</span>
                      </div>
                      <h5 className="font-bold text-neutral-900 text-base mb-2 font-display">
                        Campus & Off-Campus Employment
                      </h5>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                        {visa.workingHoursDuringTerm}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-neutral-200/70 text-[11px] text-neutral-500">
                      Minimum hourly wage protected by national labor regulations.
                    </div>
                  </div>

                  {/* Post-Study Work Permit & PR */}
                  <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/90 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#E11D2A] uppercase tracking-wider mb-2">
                        <Briefcase className="w-4 h-4" />
                        <span>Post-Study Work Permit (PSW)</span>
                      </div>
                      <h5 className="font-bold text-neutral-900 text-base mb-2 font-display">
                        {visa.postStudyWorkPermit.split('—')[0].trim()}
                      </h5>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                        {visa.postStudyWorkPermit}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-neutral-200/70 text-[11px] font-semibold text-[#E11D2A]">
                      Direct transition to permanent residency pathways.
                    </div>
                  </div>
                </div>

                {/* Permanent Residency Route */}
                <div className="p-5 rounded-2xl bg-red-50/70 border border-red-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#E11D2A] uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Permanent Residency (PR) Pathway</span>
                  </div>
                  <h5 className="font-bold text-neutral-900 text-base mb-2 font-display">
                    Settlement & Career Pathways for International Graduates
                  </h5>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                    {visa.prPathway}
                  </p>
                </div>

                {/* Step-by-Step Visa Process Timeline */}
                <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-xs">
                  <h4 className="font-bold text-sm sm:text-base text-neutral-900 font-display mb-4">
                    Step-by-Step Visa Application Roadmap
                  </h4>

                  <div className="space-y-3">
                    {visa.keySteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#E11D2A] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed pt-0.5">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: PARTNER UNIVERSITIES */}
            {activeTab === 'universities' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="font-bold text-base sm:text-lg text-neutral-900 font-display mb-1">
                    Featured Partner Institutions in {destination.country}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600">
                    Direct academic liaisons, faster offer letters, scholarship evaluations, and credit transfer approvals.
                  </p>
                </div>

                {destination.featuredUniversitiesDetailed && destination.featuredUniversitiesDetailed.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {destination.featuredUniversitiesDetailed.map((uni, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/90 hover:border-red-200 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h5 className="font-bold text-sm sm:text-base text-neutral-900 font-display">
                            {uni.name}
                          </h5>
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-red-100 text-[#E11D2A] flex-shrink-0">
                            Partner
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 mb-3 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{uni.location}</span>
                        </p>

                        <div>
                          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1.5">
                            High-Demand Programs:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {uni.topPrograms.map((prog) => (
                              <span
                                key={prog}
                                className="px-2 py-0.5 rounded-md bg-white border border-neutral-200/80 text-neutral-700 text-xs font-medium"
                              >
                                {prog}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {destination.popularUniversities.map((uni) => (
                      <div
                        key={uni}
                        className="px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-sm font-semibold text-neutral-800"
                      >
                        {uni}
                      </div>
                    ))}
                  </div>
                )}

                {/* Intake Cycle Information */}
                <div className="p-4 rounded-2xl bg-neutral-100/70 border border-neutral-200 text-xs sm:text-sm text-neutral-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#E11D2A]" />
                    <span><strong>Upcoming Intakes:</strong> {destination.intakes}</span>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenConsultation(destination.country);
                    }}
                    className="text-[#E11D2A] hover:text-red-700 font-bold cursor-pointer"
                  >
                    Check Eligibility &rarr;
                  </button>
                </div>
              </motion.div>
            )}

            {/* TAB 4: COSTS & LIVING EXPENSES */}
            {activeTab === 'costs' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Tuition Estimates */}
                  <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/90">
                    <span className="text-[11px] font-bold text-[#E11D2A] uppercase tracking-wider block mb-1">
                      Annual Tuition Estimates
                    </span>
                    <h5 className="text-xl sm:text-2xl font-black font-display text-neutral-900 mb-2">
                      {destination.avgTuition || 'Varies by Institution'}
                    </h5>
                    <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                      Tuition fees depend upon degree level (Undergraduate vs Master's) and academic faculty (STEM, Business, Medicine).
                    </p>

                    <div className="p-3 rounded-xl bg-white border border-neutral-200/70 text-xs space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Business & Humanities:</span>
                        <span className="font-semibold text-neutral-800">Lower to Mid Range</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">STEM, Data Science, AI:</span>
                        <span className="font-semibold text-neutral-800">Mid to Upper Range</span>
                      </div>
                    </div>
                  </div>

                  {/* Living Expenses */}
                  <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/90">
                    <span className="text-[11px] font-bold text-[#E11D2A] uppercase tracking-wider block mb-1">
                      Mandated Living Solvency
                    </span>
                    <h5 className="text-xl sm:text-2xl font-black font-display text-neutral-900 mb-2">
                      {destination.livingExpenses || 'Official Standard'}
                    </h5>
                    <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                      Required living cost verification required by national immigration authorities for student visa clearance.
                    </p>

                    <div className="p-3 rounded-xl bg-white border border-neutral-200/70 text-xs">
                      <span className="text-neutral-500 block mb-1">Financial Format:</span>
                      <span className="font-medium text-neutral-800">
                        {destination.visaPathway?.financialSolvency || 'Bank Balance / Solvency Certificate'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Scholarship Guidance */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-[#E11D2A]" />
                    <h5 className="font-bold text-base text-neutral-900 font-display">
                      Scholarship & Financial Aid Opportunities
                    </h5>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed mb-3">
                    Merit-based scholarships, Vice-Chancellor awards, early-bird fee reductions, and research assistantships ranging from 10% to 50% tuition reduction are available for high-achieving applicants.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenConsultation(destination.country);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E11D2A] hover:text-red-700 transition-colors cursor-pointer"
                  >
                    <span>Check your scholarship eligibility with our team</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

          </div>

          {/* Footer Sticky Actions */}
          <div className="p-4 sm:p-5 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
            <div className="text-xs text-neutral-500 text-center sm:text-left">
              <span>Applying for <strong>{destination.country}</strong>? Free 1-on-1 counseling available.</span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-neutral-700 font-bold text-xs hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenConsultation(destination.country);
                }}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
              >
                <span>Apply for {destination.country}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
