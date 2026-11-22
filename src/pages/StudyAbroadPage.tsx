import React, { useMemo } from 'react';
import {
  Globe,
  GraduationCap,
  Coins,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Building2,
  Award,
} from 'lucide-react';
import { StudyAbroadSection } from '../components/StudyAbroadSection';
import { useRouter, usePageSeo } from '../router/RouterContext';
import studyAbroadImg from '../assets/images/study_abroad_campus_1795289557367.jpg';

interface StudyAbroadPageProps {
  onOpenConsultation: (serviceName?: string) => void;
}

const SCHOLARSHIP_STREAMS = [
  {
    title: 'Merit & Early-Bird Waivers',
    range: '10% – 50% Tuition Reduction',
    description: 'Available across UK, Australian, and Finnish universities for strong HSC / Bachelor GPA scores.',
  },
  {
    title: 'Public Zero-Tuition Options',
    range: '€0 – €3,000 / Year',
    description: 'German public institutions offer internationally accredited English-taught degrees with minimal semester fees.',
  },
  {
    title: 'Graduate Assistantships',
    range: 'Tuition + Living Stipends',
    description: 'Teaching and research assistantships for qualified Master’s and STEM applicants in the USA and Canada.',
  },
];

const ADMISSION_TIMELINE = [
  {
    phase: '6–8 Months Before Intake',
    title: 'Profile & IELTS Alignment',
    detail: 'Complete IELTS Academic target score, verify transcript grading scales, and shortlist 4–5 target universities.',
  },
  {
    phase: '4–5 Months Before Intake',
    title: 'Applications & SOP Architecture',
    detail: 'Submit university portals with tailored Statements of Purpose, academic LORs, and CV documentation.',
  },
  {
    phase: '2–3 Months Before Intake',
    title: 'Offer Acceptance & Deposit',
    detail: 'Satisfy offer conditions, review scholarship deductions, and obtain official LOA, CAS, CoE, or Form I-20.',
  },
  {
    phase: '1–2 Months Before Intake',
    title: 'Visa Lodgment & Pre-Departure',
    detail: 'Prepare financial solvency proof, complete medical/biometrics, and attend pre-departure briefing.',
  },
];

export const StudyAbroadPage: React.FC<StudyAbroadPageProps> = ({ onOpenConsultation }) => {
  const { search } = useRouter();

  const initialCountryId = useMemo(() => {
    const params = new URLSearchParams(search);
    return params.get('country');
  }, [search]);

  usePageSeo({
    title: 'Study Abroad Destinations, Universities & Scholarships | MY IELTS',
    description:
      'Explore study abroad pathways in Canada, UK, Australia, USA, Germany, Ireland, New Zealand, Japan, and Europe with transparent admission requirements, tuition costs, and visa guidance.',
  });

  return (
    <div className="bg-white">
      {/* Architectural Campus Hero */}
      <section className="py-14 sm:py-20 bg-[#0D0D11] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#E11D2A]/15 blur-3xl rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E11D2A]">
                <Globe className="w-4 h-4" />
                <span>International University Admissions</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight leading-[1.08]">
                Choose the Right <span className="text-[#E11D2A]">Country &amp; Degree.</span>
              </h1>
              <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
                Compare verified IELTS cutoffs, annual tuition estimates, living cost standards, scholarship opportunities, and post-study work rights across 11 global destinations.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800">
                  <div className="text-xs text-neutral-400">Destinations</div>
                  <div className="text-base font-black text-white mt-0.5 tabular-nums">11 Countries</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800">
                  <div className="text-xs text-neutral-400">Advisory</div>
                  <div className="text-base font-black text-white mt-0.5">Honest Match</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800">
                  <div className="text-xs text-neutral-400">Funding</div>
                  <div className="text-base font-black text-[#E11D2A] mt-0.5">Scholarship Check</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => onOpenConsultation('Study Abroad Profile Assessment')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white font-bold text-sm shadow-lg shadow-red-600/25 cursor-pointer transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book University Shortlisting Call</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#destination-browser"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm transition-all"
                >
                  <span>Filter All Destinations</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl p-2.5 bg-gradient-to-tr from-neutral-800 via-[#E11D2A] to-neutral-900 shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <img
                    src={studyAbroadImg}
                    alt="International university quadrangle and library campus"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D11]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 text-white">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#E11D2A] block">
                        Canada · UK · Australia · USA · Europe
                      </span>
                      <span className="text-sm font-bold">
                        Click any country card below for full admission &amp; visa specs
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map + Search & Filter Country Explorer */}
      <StudyAbroadSection
        initialCountryId={initialCountryId}
        onOpenConsultation={(countryName) =>
          onOpenConsultation(countryName ? `Study in ${countryName}` : 'Study Abroad Consultation')
        }
      />

      {/* Scholarship & Funding Guide */}
      <section className="py-20 bg-white border-t border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E11D2A] uppercase tracking-wider">
                <Coins className="w-4 h-4" />
                <span>Tuition &amp; Scholarships</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-[#0D0D11]">
                Smart Financial Planning &amp; <span className="text-[#E11D2A]">Scholarships</span>
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Higher education abroad is a major investment. We match students with accredited universities that align realistically with family budget, scholarship merit, and part-time living affordability.
              </p>
              <button
                onClick={() => onOpenConsultation('Scholarship & Tuition Guidance')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0D0D11] hover:bg-[#E11D2A] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Check Scholarship Eligibility</span>
              </button>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
              {SCHOLARSHIP_STREAMS.map((s) => (
                <div key={s.title} className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <div className="text-xs font-bold text-[#E11D2A] mb-1">{s.range}</div>
                  <h3 className="text-base font-bold font-display text-[#0D0D11] mb-2">{s.title}</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4-Phase Application Timeline */}
          <div className="mt-16 pt-14 border-t border-neutral-200">
            <div className="flex items-center gap-2 text-xs font-bold text-[#E11D2A] uppercase tracking-wider mb-2">
              <Building2 className="w-4 h-4" />
              <span>Application Roadmap</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-[#0D0D11] mb-8">
              When Should You Start Preparing?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {ADMISSION_TIMELINE.map((step, i) => (
                <div key={step.phase} className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black text-[#E11D2A]">{step.phase}</span>
                      <GraduationCap className="w-4 h-4 text-neutral-400" />
                    </div>
                    <h3 className="text-base font-bold font-display text-[#0D0D11] mb-2">{step.title}</h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">{step.detail}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-200/70 flex items-center gap-1.5 text-[11px] font-bold text-neutral-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E11D2A]" />
                    <span>Milestone 0{i + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
