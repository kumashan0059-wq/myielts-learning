import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  Plane,
  Compass,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  GraduationCap,
  FileCheck,
  Award,
  ShieldCheck,
  Building
} from 'lucide-react';
import { BRAND_PHONE, BRAND_PHONE_CLEAN } from '../data/content';

interface GlobalJourneySectionProps {
  onOpenConsultation: () => void;
  onOpenBatch: () => void;
}

interface DestinationHub {
  id: string;
  name: string;
  flag: string;
  code: string;
  capital: string;
  workPermit: string;
  targetBand: string;
  avgTuition: string;
  pathCoordinates: { cx: number; cy: number; qx: number; qy: number };
}

const DESTINATION_HUBS: DestinationHub[] = [
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    code: 'CA',
    capital: 'Ottawa / Toronto',
    workPermit: 'Up to 3-Year PGWP',
    targetBand: '6.5 - 7.5',
    avgTuition: 'CAD 18,000 - 32,000/yr',
    pathCoordinates: { cx: 48, cy: 55, qx: 95, qy: 25 }
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    code: 'UK',
    capital: 'London',
    workPermit: '2-Year Graduate Route',
    targetBand: '6.0 - 7.0',
    avgTuition: '£14,000 - 26,000/yr',
    pathCoordinates: { cx: 80, cy: 62, qx: 105, qy: 40 }
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    code: 'AU',
    capital: 'Canberra / Sydney',
    workPermit: 'Subclass 485 (2-4 Yrs)',
    targetBand: '6.5 - 7.5',
    avgTuition: 'AUD 24,000 - 38,000/yr',
    pathCoordinates: { cx: 165, cy: 145, qx: 150, qy: 110 }
  },
  {
    id: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    code: 'US',
    capital: 'Washington / New York',
    workPermit: '1-3 Year STEM OPT',
    targetBand: '6.5 - 7.5',
    avgTuition: '$22,000 - 45,000/yr',
    pathCoordinates: { cx: 38, cy: 75, qx: 80, qy: 45 }
  },
  {
    id: 'germany',
    name: 'Germany & EU',
    flag: '🇩🇪',
    code: 'EU',
    capital: 'Berlin',
    workPermit: '18-Month Jobseeker Visa',
    targetBand: '6.0 - 7.0',
    avgTuition: '€0 - 12,000/yr',
    pathCoordinates: { cx: 95, cy: 68, qx: 112, qy: 52 }
  },
  {
    id: 'ireland',
    name: 'Ireland',
    flag: '🇮🇪',
    code: 'IE',
    capital: 'Dublin',
    workPermit: '2-Year Third Level Scheme',
    targetBand: '6.5',
    avgTuition: '€12,000 - 22,000/yr',
    pathCoordinates: { cx: 72, cy: 58, qx: 100, qy: 35 }
  }
];

const JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Diagnostic & Profile Assessment',
    description: 'We evaluate your academic transcripts, budget, and language baseline to build an actionable strategy.',
    icon: Compass,
    badge: 'Foundation'
  },
  {
    step: '02',
    title: 'IELTS & Fluency Training',
    description: 'Targeted preparation in speaking, writing, reading, and listening at our Mirpur campus to clear university cut-offs.',
    icon: Award,
    badge: 'Score Mastery'
  },
  {
    step: '03',
    title: 'University Admission & Offer Letter',
    description: 'Strategic shortlisting of accredited universities, personal statement curation, and securing official admission.',
    icon: Building,
    badge: 'Admissions'
  },
  {
    step: '04',
    title: 'Visa Application & Interview Coaching',
    description: 'Transparent bank statement auditing, documentation compliance, and mock embassy interviews with certified counselors.',
    icon: ShieldCheck,
    badge: 'Visa Filing'
  },
  {
    step: '05',
    title: 'Pre-Departure, Travel & Post-Study Career',
    description: 'Guidance on accommodation, student health insurance, forex cards, and post-study work permit regulations.',
    icon: Plane,
    badge: 'Global Launch'
  }
];

export const GlobalJourneySection: React.FC<GlobalJourneySectionProps> = ({
  onOpenConsultation,
  onOpenBatch
}) => {
  const [selectedHub, setSelectedHub] = useState<DestinationHub>(DESTINATION_HUBS[0]);
  const [isRotating, setIsRotating] = useState(true);

  return (
    <section
      id="global-journey"
      className="py-20 lg:py-28 bg-[#0D0D11] text-white relative overflow-hidden border-t border-b border-neutral-800"
    >
      {/* Background Subtle Red & Black Radial Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#E11D2A]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#E11D2A]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/70 border border-red-800/60 text-[#E11D2A] text-xs font-bold uppercase tracking-wider mb-4">
            <Globe className="w-3.5 h-3.5" />
            <span>International Education Roadmap</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight leading-tight mb-4">
            From Dhaka to Your <span className="text-[#E11D2A]">Dream University.</span>
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
            A transparent, milestone-driven pathway connecting classroom learning in Mirpur directly to world-class academic institutions abroad.
          </p>
        </div>

        {/* Interactive Global Hub & Rotating Globe Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          
          {/* Left: Rotating 3D Illuminated Wireframe Globe with Dynamic Connection Lines */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* Country Selector Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-6 w-full">
              {DESTINATION_HUBS.map((hub) => (
                <button
                  key={hub.id}
                  onClick={() => setSelectedHub(hub)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedHub.id === hub.id
                      ? 'bg-[#E11D2A] text-white shadow-lg shadow-red-900/40 border border-red-500 scale-105'
                      : 'bg-neutral-900/90 text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <span>{hub.flag}</span>
                  <span>{hub.name}</span>
                </button>
              ))}
            </div>

            {/* Globe Visualization Canvas */}
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-square rounded-3xl bg-neutral-950/80 border border-neutral-800 p-6 flex flex-col items-center justify-center shadow-2xl overflow-hidden group">
              
              {/* Radial Center Glow */}
              <div className="absolute inset-0 bg-radial from-[#E11D2A]/15 via-transparent to-transparent pointer-events-none" />

              {/* Rotating Wireframe Globe SVG */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72">
                
                {/* Orbital Boundary Rings */}
                <div
                  className={`absolute inset-0 rounded-full border border-red-500/20 ${
                    isRotating ? 'animate-spin' : ''
                  }`}
                  style={{ animationDuration: '40s' }}
                />

                <svg className="w-full h-full" viewBox="0 0 200 200">
                  {/* Globe Sphere Base */}
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    fill="#111116"
                    stroke="#E11D2A"
                    strokeWidth="1.5"
                    strokeOpacity="0.3"
                  />

                  {/* Parallels (Latitudes) */}
                  <ellipse cx="100" cy="100" rx="85" ry="26" fill="none" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.15" />
                  <ellipse cx="100" cy="100" rx="85" ry="55" fill="none" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.12" />
                  <line x1="15" y1="100" x2="185" y2="100" stroke="#E11D2A" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />

                  {/* Meridians (Longitudes) */}
                  <ellipse cx="100" cy="100" rx="32" ry="85" fill="none" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.2" />
                  <ellipse cx="100" cy="100" rx="64" ry="85" fill="none" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.12" />
                  <line x1="100" y1="15" x2="100" y2="185" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.15" />

                  {/* Flight Arcs Originating from Dhaka (Node: 130, 95) to selected destination */}
                  <path
                    d={`M 130,95 Q ${selectedHub.pathCoordinates.qx},${selectedHub.pathCoordinates.qy} ${selectedHub.pathCoordinates.cx},${selectedHub.pathCoordinates.cy}`}
                    fill="none"
                    stroke="#E11D2A"
                    strokeWidth="2.5"
                    strokeDasharray="5 3"
                    className="animate-pulse"
                  />

                  {/* Other subtle background flight arcs */}
                  <path d="M 130,95 Q 95,25 48,55" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.2" />
                  <path d="M 130,95 Q 105,40 80,62" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.2" />
                  <path d="M 130,95 Q 150,110 165,145" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.2" />

                  {/* Dhaka Origin Node (Mirpur) */}
                  <circle cx="130" cy="95" r="4.5" fill="#E11D2A" />
                  <circle cx="130" cy="95" r="9" fill="none" stroke="#E11D2A" strokeWidth="1.5" className="animate-ping" style={{ transformOrigin: '130px 95px' }} />

                  {/* Selected Target Node */}
                  <circle
                    cx={selectedHub.pathCoordinates.cx}
                    cy={selectedHub.pathCoordinates.cy}
                    r="5"
                    fill="#FFFFFF"
                    stroke="#E11D2A"
                    strokeWidth="2"
                  />
                </svg>

                {/* Center Compass Widget */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0D0D11] border border-red-500/80 flex items-center justify-center text-white shadow-lg pointer-events-none">
                  <Plane className="w-4 h-4 text-[#E11D2A] -rotate-45" />
                </div>
              </div>

              {/* Status Bar for Active Flight Corridor */}
              <div className="mt-4 w-full bg-neutral-900/90 rounded-xl p-3 border border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-white">Dhaka ➔ {selectedHub.name} Pathway</span>
                </div>
                <span className="text-[11px] font-bold text-[#E11D2A] bg-red-950/60 px-2 py-0.5 rounded border border-red-900/60">
                  {selectedHub.workPermit}
                </span>
              </div>

            </div>

          </div>

          {/* Right: Selected Hub Details & Visa Insight Card */}
          <div className="lg:col-span-6">
            <div className="bg-neutral-900/90 rounded-3xl p-6 sm:p-8 border border-neutral-800 shadow-2xl relative">
              <div className="flex items-center justify-between pb-5 border-b border-neutral-800 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedHub.flag}</span>
                  <div>
                    <h3 className="text-2xl font-black font-display text-white">
                      Study in {selectedHub.name}
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Targeted admissions & direct student visa filing
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-red-950 text-[#E11D2A] border border-red-900">
                  {selectedHub.code}
                </span>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mb-6">
                <div className="bg-black/60 rounded-xl p-3 border border-neutral-800">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Target IELTS</span>
                  <p className="text-sm font-black text-white">{selectedHub.targetBand} Band</p>
                </div>
                <div className="bg-black/60 rounded-xl p-3 border border-neutral-800">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Post-Study Work</span>
                  <p className="text-sm font-black text-[#E11D2A]">{selectedHub.workPermit}</p>
                </div>
                <div className="bg-black/60 rounded-xl p-3 border border-neutral-800 col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Est. Tuition</span>
                  <p className="text-sm font-black text-white">{selectedHub.avgTuition}</p>
                </div>
              </div>

              {/* Verified Value Deliverables */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2.5 text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#E11D2A] flex-shrink-0 mt-0.5" />
                  <span>Accredited university shortlisting matching your academic GPA & budget</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#E11D2A] flex-shrink-0 mt-0.5" />
                  <span>Statement of Purpose (SOP) & Letter of Explanation (LOE) editing</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#E11D2A] flex-shrink-0 mt-0.5" />
                  <span>Embassy visa appointment booking and biometric preparation</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onOpenConsultation}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all active:scale-95 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Free Consultation</span>
                </button>
                <button
                  onClick={onOpenBatch}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-transparent hover:bg-neutral-800 text-white font-bold text-sm border border-neutral-700 hover:border-neutral-500 transition-all active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#E11D2A]" />
                  <span>Join Our Next Batch</span>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* 5-Step Milestone Framework */}
        <div className="pt-8 border-t border-neutral-800">
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-black font-display text-white mb-2">
              The MY IELTS 5-Step Transition Framework
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Clear accountability at every phase with no hidden steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {JOURNEY_STEPS.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-neutral-900/70 border border-neutral-800 hover:border-red-900/80 rounded-2xl p-5 flex flex-col justify-between transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-black font-display text-[#E11D2A]">
                        {item.step}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                        {item.badge}
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-neutral-800 group-hover:bg-[#E11D2A] text-white flex items-center justify-center mb-3 transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>

                    <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-4 border-t border-neutral-800/80 flex items-center text-[11px] font-semibold text-neutral-500 group-hover:text-red-400 transition-colors">
                    <span>Phase {idx + 1} Milestone</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
export default GlobalJourneySection;
