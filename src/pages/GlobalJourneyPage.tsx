import React, { useState } from 'react';
import {
  Globe,
  ArrowRight,
  Compass,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Award,
  Calendar,
} from 'lucide-react';
import { GlobalJourneySection } from '../components/GlobalJourneySection';
import { Link, APP_ROUTES, usePageSeo } from '../router/RouterContext';
import { TESTIMONIALS } from '../data/content';

interface GlobalJourneyPageProps {
  onOpenConsultation: (serviceName?: string) => void;
  onOpenBatch: (serviceName?: string) => void;
}

const EDUCATION_PATHWAYS = [
  {
    id: 'undergrad',
    title: 'Undergraduate Degree Abroad',
    subtitle: 'After HSC / A-Levels',
    ieltsTarget: 'Band 6.0 – 6.5',
    timeline: '4–6 Months Prep & Admission',
    highlights: [
      'Direct Foundation, Diploma, or 3–4 Year Bachelor entry',
      'Merit-based scholarship assessment during shortlisting',
      'Co-op and internship degree options in Canada, UK & Australia',
    ],
  },
  {
    id: 'postgrad',
    title: 'Master’s & Research Track',
    subtitle: 'After Bachelor’s Graduation',
    ieltsTarget: 'Band 6.5 – 7.5',
    timeline: '3–5 Months Intake Planning',
    highlights: [
      '1-year accelerated UK Master’s or 2-year STEM Master’s',
      'Research assistantship & SOP structure guidance',
      'Eligible for 2 to 3 years post-study open work permits',
    ],
  },
  {
    id: 'migration',
    title: 'Skilled Career & PR Track',
    subtitle: 'Working Professionals',
    ieltsTarget: 'IELTS General (CLB 9 Focus)',
    timeline: 'Targeted Score & Documentation',
    highlights: [
      'IELTS General Training coaching for maximum Express Entry points',
      'Educational Credential Assessment (ECA / WES) checklist',
      'Long-term post-study or skilled migration alignment',
    ],
  },
];

export const GlobalJourneyPage: React.FC<GlobalJourneyPageProps> = ({
  onOpenConsultation,
  onOpenBatch,
}) => {
  usePageSeo({
    title: 'Global Journey — From IELTS to International Career | MY IELTS',
    description:
      'Plan your complete international education and career roadmap from Dhaka to Canada, UK, Australia, USA, Germany, Ireland, and global study hubs.',
  });

  const [selectedPathway, setSelectedPathway] = useState('postgrad');

  return (
    <div className="bg-white">
      {/* Editorial Pathway Hero */}
      <section className="py-16 sm:py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E11D2A]">
                <Compass className="w-4 h-4" />
                <span>End-to-End Global Roadmap</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-[#0D0D11] tracking-tight leading-[1.06]">
                IELTS to <span className="text-[#E11D2A]">Global Opportunity.</span>
              </h1>
              <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                Navigating language exams, international university admissions, and visa regulations works best under one connected roadmap. Explore how MY IELTS guides each milestone transparently.
              </p>

              {/* 4-Stage Horizontal Chain */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  { label: '01. IELTS Prep', to: APP_ROUTES.ielts },
                  { label: '02. Study Abroad', to: APP_ROUTES.studyAbroad },
                  { label: '03. Visa Filing', to: APP_ROUTES.visaServices },
                  { label: '04. Work Permit', to: APP_ROUTES.workPermit },
                ].map((stage) => (
                  <Link
                    key={stage.label}
                    to={stage.to}
                    className="p-3.5 rounded-2xl bg-neutral-50 hover:bg-[#0D0D11] text-[#0D0D11] hover:text-white border border-neutral-200 transition-all text-xs font-bold flex items-center justify-between group"
                  >
                    <span>{stage.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E11D2A] group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-[#0D0D11] text-white p-7 border border-neutral-800 shadow-2xl space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E11D2A]">
                    Select Your Profile Stage
                  </span>
                  <Globe className="w-5 h-5 text-[#E11D2A]" />
                </div>

                <div className="flex gap-2">
                  {EDUCATION_PATHWAYS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPathway(p.id)}
                      className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        selectedPathway === p.id
                          ? 'bg-[#E11D2A] text-white'
                          : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
                      }`}
                    >
                      {p.id === 'undergrad' ? 'Undergrad' : p.id === 'postgrad' ? 'Master’s' : 'Work & PR'}
                    </button>
                  ))}
                </div>

                {EDUCATION_PATHWAYS.filter((p) => p.id === selectedPathway).map((active) => (
                  <div key={active.id} className="space-y-4">
                    <div>
                      <div className="text-xs text-neutral-400">{active.subtitle}</div>
                      <h2 className="text-xl font-black font-display text-white mt-0.5">{active.title}</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                        <span className="text-neutral-400 block">Typical Target</span>
                        <span className="font-bold text-white mt-0.5 block">{active.ieltsTarget}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                        <span className="text-neutral-400 block">Prep Window</span>
                        <span className="font-bold text-[#E11D2A] mt-0.5 block">{active.timeline}</span>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {active.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-xs text-neutral-300">
                          <CheckCircle2 className="w-4 h-4 text-[#E11D2A] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => onOpenConsultation(`Global Journey - ${active.title}`)}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white font-bold text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Free Pathway Consultation</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Global Hub & 5-Step Transition Framework */}
      <GlobalJourneySection
        onOpenConsultation={() => onOpenConsultation('Global Journey & Admissions')}
        onOpenBatch={() => onOpenBatch('IELTS Preparation')}
      />

      {/* Global Destination Regions & Alumni Outcomes */}
      <section className="py-20 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E11D2A] uppercase tracking-wider mb-2">
                <Award className="w-4 h-4" />
                <span>Candidate Destinations</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-[#0D0D11]">
                Real Student Pathways Across <span className="text-[#E11D2A]">Continents</span>
              </h2>
            </div>
            <Link
              to={APP_ROUTES.studyAbroad}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0D0D11] hover:bg-[#E11D2A] text-white text-xs font-bold transition-colors self-start md:self-auto"
            >
              <span>Browse All 13 Study Destinations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-2xl p-6 border border-neutral-200 flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#E11D2A]">{story.country}</span>
                    <span className="px-2.5 py-0.5 rounded-md bg-neutral-100 text-[#0D0D11] text-xs font-black">
                      {story.scoreBadge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold font-display text-[#0D0D11]">{story.name}</h3>
                  <p className="text-xs text-neutral-500 mb-3">{story.university}</p>
                  <p className="text-xs text-neutral-700 leading-relaxed">“{story.quote}”</p>
                </div>
                <div className="pt-3 border-t border-neutral-100 flex items-center gap-2 text-xs font-semibold text-neutral-700">
                  <GraduationCap className="w-4 h-4 text-[#E11D2A]" />
                  <span>{story.achievement}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Dedicated Guidance Strip */}
          <div className="p-7 rounded-3xl bg-[#0D0D11] text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E11D2A] flex items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-display">Want an Honest Country &amp; Budget Match?</h3>
                <p className="text-xs sm:text-sm text-neutral-300">
                  Bring your academic transcripts to our Mirpur campus or schedule an online advisory call.
                </p>
              </div>
            </div>
            <button
              onClick={() => onOpenConsultation('Global Pathway Counseling')}
              className="px-6 py-3.5 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white text-xs font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap"
            >
              Book Free Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
