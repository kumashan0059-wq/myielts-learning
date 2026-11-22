import React, { useState } from 'react';
import {
  Briefcase,
  Globe2,
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Building,
  Calendar,
} from 'lucide-react';
import { WorkPermitSection } from '../components/WorkPermitSection';
import { usePageSeo } from '../router/RouterContext';
import workPermitImg from '../assets/images/work_permit_career_1795289556894.jpg';

interface WorkPermitPageProps {
  onOpenConsultation: (serviceName?: string) => void;
}

const COUNTRY_PERMIT_GUIDES = [
  {
    id: 'canada',
    country: 'Canada',
    flag: '🇨🇦',
    primaryPermit: 'Post-Graduation Work Permit (PGWP) & Express Entry',
    duration: '8 Months to 3 Years Open Work Permit',
    languageRequirement: 'IELTS General (CLB 7–9 depending on stream)',
    eligibility: [
      'Completion of qualifying full-time DLI academic program for PGWP',
      'Employer LMIA or provincial nomination for direct work permit streams',
      'Educational Credential Assessment (WES / IQAS) for skilled workers',
    ],
    documents: [
      'Valid passport & academic completion transcripts',
      'Official IELTS General Training or CELPIP scorecard',
      'Employer offer letter / LMIA reference (if employer-sponsored)',
      'Police clearance certificate & medical examination record',
    ],
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    flag: '🇬🇧',
    primaryPermit: 'Graduate Route & Skilled Worker Visa',
    duration: '2 Years (3 Years PhD) Graduate Route',
    languageRequirement: 'IELTS UKVI / Academic B1–B2 level',
    eligibility: [
      'Eligible UK Bachelor’s, Master’s, or PhD completion for Graduate Route',
      'Certificate of Sponsorship (CoS) from licensed UK employer for Skilled Worker',
      'Meeting minimum eligible occupation salary threshold',
    ],
    documents: [
      'Passport & current UK eVisa / BRP records',
      'Licensed sponsor CoS reference number (for Skilled Worker)',
      'Proof of English proficiency or UK degree exemption',
      'TB screening & criminal record certificate (regulated sectors)',
    ],
  },
  {
    id: 'australia',
    country: 'Australia',
    flag: '🇦🇺',
    primaryPermit: 'Temporary Graduate (Subclass 485) & Skills in Demand',
    duration: '2 to 4+ Years (Regional Extensions)',
    languageRequirement: 'IELTS Academic / General 6.5 Overall (min 5.5)',
    eligibility: [
      'Completion of CRICOS-registered Australian degree (2+ academic years)',
      'Skills assessment by relevant assessing authority (ACS, Engineers Australia, etc.)',
      'Clean character and health clearance meeting Home Affairs rules',
    ],
    documents: [
      'Academic completion letter & transcripts',
      'Valid IELTS / PTE score report',
      'Australian Federal Police (AFP) check & OSHC/OVHC health cover',
      'Positive skills assessment outcome (for skilled migration visas)',
    ],
  },
  {
    id: 'germany',
    country: 'Germany & EU',
    flag: '🇩🇪',
    primaryPermit: '18-Month Job Seeker & EU Blue Card',
    duration: '18 Months Search + 4-Year EU Blue Card',
    languageRequirement: 'English B2/IELTS 6.5 (German A2/B1 helpful)',
    eligibility: [
      'Recognized Bachelor’s/Master’s degree listed on Anabin database',
      'Binding German employment contract meeting Blue Card salary floor',
      'Health insurance & blocked account / financial sustainability',
    ],
    documents: [
      'Apostilled university degree certificates & Anabin printout',
      'Detailed Europass CV & employment verification letters',
      'Employment contract or job-search financial proof',
      'Statutory or recognized health coverage certificate',
    ],
  },
];

export const WorkPermitPage: React.FC<WorkPermitPageProps> = ({ onOpenConsultation }) => {
  usePageSeo({
    title: 'International Work Permit & Post-Study Career Guidance | MY IELTS',
    description:
      'Guidance on post-study work rights (PGWP, Graduate Route, Subclass 485), employer sponsorship requirements, IELTS General Training CLB alignment, and documentation.',
  });

  const [selectedPermitId, setSelectedPermitId] = useState('canada');
  const activeGuide =
    COUNTRY_PERMIT_GUIDES.find((g) => g.id === selectedPermitId) || COUNTRY_PERMIT_GUIDES[0];

  return (
    <div className="bg-white">
      {/* Dark Executive Career Hero */}
      <section className="py-14 sm:py-20 bg-[#0D0D11] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E11D2A]/15 blur-3xl rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E11D2A]">
                <Globe2 className="w-4 h-4" />
                <span>Post-Study Work &amp; Skilled Career Pathways</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight leading-[1.08]">
                Navigate Global <span className="text-[#E11D2A]">Work Permits</span> With Clarity.
              </h1>
              <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
                Understand country-specific post-study work rights, skilled migration eligibility criteria, language score benchmarks, and verified documentation steps before applying.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => onOpenConsultation('Work Permit & Career Consultation')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white font-bold text-sm shadow-lg shadow-red-600/25 cursor-pointer transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Eligibility Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#permit-explorer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm transition-all"
                >
                  <span>Compare Country Permits</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl p-2.5 bg-gradient-to-br from-[#E11D2A] via-neutral-800 to-neutral-900 shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <img
                    src={workPermitImg}
                    alt="International graduate working in a modern global corporate office"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D11]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E11D2A] block">
                      PGWP · Graduate Route · Subclass 485 · EU Blue Card
                    </span>
                    <span className="text-sm sm:text-base font-bold">
                      Aligning IELTS General Scores &amp; Academic Credentials
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Country Permit Eligibility & Documentation Explorer */}
      <section id="permit-explorer" className="py-20 bg-neutral-50 border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E11D2A] uppercase tracking-wider mb-1">
                <Briefcase className="w-4 h-4" />
                <span>Jurisdiction Requirements</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-[#0D0D11]">
                Country-Specific <span className="text-[#E11D2A]">Work Permit Guide</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {COUNTRY_PERMIT_GUIDES.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setSelectedPermitId(g.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedPermitId === g.id
                      ? 'bg-[#E11D2A] text-white shadow-sm'
                      : 'bg-white border border-neutral-200 text-neutral-700 hover:border-red-300'
                  }`}
                >
                  <span>{g.flag}</span>
                  <span>{g.country}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-xs font-bold text-[#E11D2A] uppercase tracking-wider">
                  {activeGuide.flag} {activeGuide.country} Pathway
                </span>
                <h3 className="text-2xl font-black font-display text-[#0D0D11] mt-1">
                  {activeGuide.primaryPermit}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="text-neutral-500 block mb-1">Authorized Duration</span>
                  <span className="font-bold text-[#0D0D11]">{activeGuide.duration}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="text-neutral-500 block mb-1">Language Standard</span>
                  <span className="font-bold text-[#E11D2A]">{activeGuide.languageRequirement}</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#0D0D11] mb-2.5 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E11D2A]" />
                  <span>Core Eligibility Criteria</span>
                </h4>
                <ul className="space-y-2">
                  {activeGuide.eligibility.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-xs text-neutral-700">
                      <CheckCircle2 className="w-4 h-4 text-[#E11D2A] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-between bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
              <div>
                <h4 className="text-sm font-bold text-[#0D0D11] mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#E11D2A]" />
                  <span>Typical Required Documentation</span>
                </h4>
                <ul className="space-y-2.5 mb-6">
                  {activeGuide.documents.map((doc) => (
                    <li
                      key={doc}
                      className="p-3 rounded-xl bg-white border border-neutral-200/80 text-xs font-medium text-neutral-800 flex items-start gap-2.5"
                    >
                      <Building className="w-4 h-4 text-[#E11D2A] shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onOpenConsultation(`${activeGuide.country} Work Permit Guidance`)}
                className="w-full py-3.5 px-5 rounded-xl bg-[#0D0D11] hover:bg-[#E11D2A] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Assess Your {activeGuide.country} Permit Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Existing Work Permit Overview Section */}
      <WorkPermitSection onOpenConsultation={() => onOpenConsultation('Work Permit Guidance')} />
    </div>
  );
};
