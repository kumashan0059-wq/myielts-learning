import React, { useState } from 'react';
import {
  FileCheck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ArrowRight,
  Clock,
  FolderCheck,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import { VisaServicesSection } from '../components/VisaServicesSection';
import { usePageSeo } from '../router/RouterContext';
import { STUDY_DESTINATIONS, FAQ_ITEMS } from '../data/content';
import visaAdvisoryImg from '../assets/images/visa_advisory_desk_1795289557359.jpg';

interface VisaServicesPageProps {
  onOpenConsultation: (serviceName?: string) => void;
}

const CHECKLIST_ITEMS = [
  { id: 'passport', label: 'Valid International Passport (18+ months validity)' },
  { id: 'offer', label: 'Unconditional University Offer / LOA / CAS / CoE / I-20' },
  { id: 'ielts', label: 'Official English Proficiency Score Report (IELTS / PTE)' },
  { id: 'academic', label: 'Certified Academic Transcripts & Certificates' },
  { id: 'finance', label: 'Bank Solvency, Sponsor Tax Returns & Tuition / GIC Receipt' },
  { id: 'sop', label: 'Statement of Purpose (SOP) / Genuine Student Statement' },
  { id: 'medical', label: 'Panel Medical Exam / TB Clearance & Biometrics Booking' },
];

export const VisaServicesPage: React.FC<VisaServicesPageProps> = ({ onOpenConsultation }) => {
  usePageSeo({
    title: 'Student Visa Consultation & Document Preparation | MY IELTS',
    description:
      'Transparent student visa guidance, SOP structuring, financial document verification, and embassy interview preparation for Canada, UK, Australia, USA, Germany, and Europe.',
  });

  const [selectedCountryId, setSelectedCountryId] = useState('canada');
  const [checkedDocs, setCheckedDocs] = useState<string[]>(['passport', 'ielts']);
  const [openFaq, setOpenFaq] = useState('q3');

  const visaCountries = STUDY_DESTINATIONS.slice(0, 6);
  const activeCountry =
    visaCountries.find((c) => c.id === selectedCountryId) || visaCountries[0];

  const toggleDoc = (id: string) => {
    setCheckedDocs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const readinessPercent = Math.round((checkedDocs.length / CHECKLIST_ITEMS.length) * 100);
  const visaFaqs = FAQ_ITEMS.filter((f) => ['Visa', 'Study Abroad', 'Consultation'].includes(f.category));

  return (
    <div className="bg-white">
      {/* Split Advisory Hero */}
      <section className="py-14 sm:py-20 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E11D2A]">
                <FileCheck className="w-4 h-4" />
                <span>Ethical &amp; Transparent Visa Advisory</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black font-display text-[#0D0D11] tracking-tight leading-[1.08]">
                Clear Document Prep &amp; <span className="text-[#E11D2A]">Visa Guidance.</span>
              </h1>
              <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
                Prepare complete, embassy-compliant student visa files with structured SOP feedback, financial documentation checks, and realistic mock interview practice.
              </p>

              {/* Honest Compliance Notice */}
              <div className="p-4 rounded-2xl bg-white border border-neutral-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#E11D2A] shrink-0 mt-0.5" />
                <p className="text-xs text-neutral-700 leading-relaxed">
                  <strong className="text-[#0D0D11]">Transparent Advisory Policy:</strong> No consultancy can guarantee a visa approval. All visa decisions rest solely with respective embassies and immigration officers; our commitment is thorough preparation and accurate documentation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  onClick={() => onOpenConsultation('Student Visa Consultation')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white font-bold text-sm shadow-lg shadow-red-600/20 cursor-pointer transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Visa Document Review</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#country-visa-guide"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-300 text-[#0D0D11] font-bold text-sm transition-all"
                >
                  <span>Check Country Requirements</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl p-2.5 bg-[#0D0D11] shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <img
                    src={visaAdvisoryImg}
                    alt="Student reviewing academic and visa application dossier with counselor"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D11]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E11D2A] block">
                      File Verification · SOP Guidance · Interview Drills
                    </span>
                    <span className="text-sm sm:text-base font-bold">
                      Step-by-Step Support Across Major Study Destinations
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Country Visa Requirement Explorer + Interactive Checklist */}
      <section id="country-visa-guide" className="py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Country Visa Guide */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E11D2A]">
                Country-Specific Visa Overview
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-[#0D0D11] mt-1">
                Explore Student Visa Pathways by Destination
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {visaCountries.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCountryId(c.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedCountryId === c.id
                      ? 'bg-[#E11D2A] text-white shadow-sm'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <span>{c.flag}</span>
                  <span>{c.country}</span>
                </button>
              ))}
            </div>

            {activeCountry.visaPathway && (
              <div className="rounded-3xl bg-[#0D0D11] text-white p-6 sm:p-7 space-y-5">
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-800">
                  <div>
                    <span className="text-xs font-bold text-[#E11D2A] uppercase tracking-wider">
                      {activeCountry.flag} {activeCountry.country} Student Stream
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black font-display mt-1">
                      {activeCountry.visaPathway.visaSubclass}
                    </h3>
                  </div>
                  <Clock className="w-5 h-5 text-[#E11D2A] shrink-0" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800">
                    <span className="text-neutral-400 block mb-1">Typical Processing</span>
                    <span className="font-bold text-white">{activeCountry.visaPathway.processingTimeline}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800">
                    <span className="text-neutral-400 block mb-1">Financial Solvency Standard</span>
                    <span className="font-bold text-white">{activeCountry.visaPathway.financialSolvency}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2.5">
                    Key Application Sequence
                  </span>
                  <div className="space-y-2">
                    {activeCountry.visaPathway.keySteps.map((st, idx) => (
                      <div key={st} className="flex items-start gap-2.5 text-xs text-neutral-200">
                        <span className="w-5 h-5 rounded-full bg-[#E11D2A] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                          {idx + 1}
                        </span>
                        <span className="pt-0.5">{st}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onOpenConsultation(`${activeCountry.country} Student Visa`)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white text-xs font-bold cursor-pointer transition-colors"
                  >
                    <span>Consult on {activeCountry.country} Visa File</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Interactive Document Readiness Checklist */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-neutral-50 border border-neutral-200 p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E11D2A] uppercase tracking-wider">
                    <FolderCheck className="w-4 h-4" />
                    <span>Readiness Self-Check</span>
                  </div>
                  <h3 className="text-xl font-black font-display text-[#0D0D11] mt-1">
                    Visa Document Checklist
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black font-display text-[#E11D2A] tabular-nums">
                    {readinessPercent}%
                  </div>
                  <div className="text-[11px] text-neutral-500 font-semibold">Prepared</div>
                </div>
              </div>

              <div className="w-full h-2 rounded-full bg-neutral-200 overflow-hidden">
                <div
                  className="h-full bg-[#E11D2A] transition-all duration-300"
                  style={{ width: `${readinessPercent}%` }}
                />
              </div>

              <div className="space-y-2.5">
                {CHECKLIST_ITEMS.map((item) => {
                  const isChecked = checkedDocs.includes(item.id);
                  return (
                    <label
                      key={item.id}
                      onClick={() => toggleDoc(item.id)}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-white border-[#E11D2A]/50'
                          : 'bg-neutral-100/70 border-neutral-200 hover:bg-white'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                          isChecked
                            ? 'bg-[#E11D2A] border-[#E11D2A] text-white'
                            : 'bg-white border-neutral-300'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-xs font-medium text-neutral-800">{item.label}</span>
                    </label>
                  );
                })}
              </div>

              <button
                onClick={() => onOpenConsultation('Visa Document Checklist Audit')}
                className="w-full py-3.5 px-4 rounded-xl bg-[#0D0D11] hover:bg-[#E11D2A] text-white text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
              >
                Request Counselor Verification
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Visa Services + 6-Stage Visa Timeline */}
      <VisaServicesSection onOpenConsultation={() => onOpenConsultation('Student Visa Filing')} />

      {/* Focused Visa FAQs */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E11D2A] uppercase tracking-wider mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>Visa Advisory FAQ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-[#0D0D11]">
              Questions About Visa Preparation
            </h2>
          </div>

          <div className="space-y-3">
            {visaFaqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div key={faq.id} className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? '' : faq.id)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer"
                  >
                    <span className="text-sm font-bold text-[#0D0D11]">{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-[#E11D2A] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
