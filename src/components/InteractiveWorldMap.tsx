import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  CheckCircle2,
  Clock,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Sparkles,
  Plane,
  Award,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { Destination } from '../types';

interface PartnerCountryData {
  id: string;
  name: string;
  flag: string;
  tagline: string;
  ieltsScore: string;
  postStudyWork: string;
  visaSupport: string;
  intakes: string;
  avgTuition: string;
  popularUniversities: string[];
  pinCoords: { x: number; y: number }; // Percentage in SVG viewBox (0-1000, 0-500)
  labelOffset?: { x: number; y: number };
}

export const PARTNER_COUNTRIES: Record<string, PartnerCountryData> = {
  canada: {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    tagline: 'World-Class Education & Clear PR Pathways',
    ieltsScore: 'Band 6.0 - 6.5+',
    postStudyWork: 'Up to 3 Years PGWP',
    visaSupport: 'SDS & Regular Stream',
    intakes: 'Sep (Fall) & Jan (Winter)',
    avgTuition: 'CAD 18K - 32K / yr',
    popularUniversities: ['Univ. of Toronto', 'UBC', 'McGill', 'Univ. of Alberta'],
    pinCoords: { x: 220, y: 135 },
  },
  uk: {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    tagline: 'Historic Excellence & 2-Year Graduate Route',
    ieltsScore: 'Band 6.0 - 6.5+',
    postStudyWork: '2 Years Graduate Route',
    visaSupport: 'CAS & Financial Audit',
    intakes: 'September & January',
    avgTuition: '£14K - £26K / yr',
    popularUniversities: ['Manchester', "King's College", 'Edinburgh', 'Bristol'],
    pinCoords: { x: 475, y: 135 },
  },
  usa: {
    id: 'usa',
    name: 'USA',
    flag: '🇺🇸',
    tagline: 'Global Innovation Hubs & Generous STEM OPT',
    ieltsScore: 'Band 6.5 - 7.0+',
    postStudyWork: '12 - 36 Months STEM OPT',
    visaSupport: 'F-1 Visa & Interview Drills',
    intakes: 'August (Fall) & January (Spring)',
    avgTuition: '$22K - $42K / yr',
    popularUniversities: ['NYU', 'UC Berkeley', 'Boston Univ.', 'Purdue'],
    pinCoords: { x: 215, y: 195 },
  },
  europe: {
    id: 'europe',
    name: 'Germany & Europe',
    flag: '🇪🇺',
    tagline: 'Affordable Tuitions & Pan-European Mobility',
    ieltsScore: 'Band 6.0 - 6.5',
    postStudyWork: '18 Months Job Seeking Visa',
    visaSupport: 'Blocked Account & Embassy',
    intakes: 'Winter & Summer Sessions',
    avgTuition: '€0 - €12K / yr (Low Tuition)',
    popularUniversities: ['TU Munich', 'Trinity Dublin', 'Univ. Amsterdam', 'Heidelberg'],
    pinCoords: { x: 520, y: 155 },
  },
  australia: {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    tagline: 'High Living Standards & Robust Post-Study Rights',
    ieltsScore: 'Band 6.0 - 6.5+',
    postStudyWork: 'Up to 3 - 5 Years (Regional)',
    visaSupport: 'Subclass 500 & GS Audit',
    intakes: 'February & July',
    avgTuition: 'AUD 24K - 38K / yr',
    popularUniversities: ['Univ. of Melbourne', 'Univ. of Sydney', 'UNSW', 'Monash'],
    pinCoords: { x: 815, y: 355 },
  },
};

// Origin Dhaka Hub coordinates
const DHAKA_COORDS = { x: 672, y: 228 };

interface InteractiveWorldMapProps {
  onSelectCountry: (countryId: string) => void;
  onOpenConsultation: () => void;
}

export const InteractiveWorldMap: React.FC<InteractiveWorldMapProps> = ({
  onSelectCountry,
  onOpenConsultation,
}) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>('canada');
  const activeCountry = hoveredCountry ? PARTNER_COUNTRIES[hoveredCountry] : null;

  return (
    <div className="w-full bg-[#0D0D11] rounded-3xl border border-neutral-800 p-4 sm:p-7 shadow-2xl relative overflow-hidden mb-12">
      
      {/* Background Geodetic Grid Accent */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#E11D2A_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Top Header Bar inside the Map Container */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E11D2A] animate-ping" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-red-400">
              Interactive Global Campus Grid
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-display text-white">
            Hover to Explore Partner Nations & Post-Study Work Pathways
          </h3>
        </div>

        {/* Quick Country Selector Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {Object.values(PARTNER_COUNTRIES).map((country) => {
            const isSelected = hoveredCountry === country.id;
            return (
              <button
                key={country.id}
                onClick={() => setHoveredCountry(country.id)}
                onMouseEnter={() => setHoveredCountry(country.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#E11D2A] text-white shadow-md shadow-red-600/30 scale-105'
                    : 'bg-neutral-800/80 hover:bg-neutral-700/80 text-neutral-300 hover:text-white border border-neutral-700/60'
                }`}
              >
                <span>{country.flag}</span>
                <span>{country.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Map Graphic Canvas */}
      <div className="relative mt-4 w-full aspect-[16/9] sm:aspect-[2.1/1] max-h-[480px]">
        <svg
          viewBox="0 0 1000 480"
          className="w-full h-full select-none"
          style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.4))' }}
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="flightLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E11D2A" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FF4D5E" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#E11D2A" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="activeCountryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E11D2A" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#800B14" stopOpacity="0.95" />
            </linearGradient>

            <radialGradient id="haloGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E11D2A" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#E11D2A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Latitude and Longitude Reference Lines */}
          <g opacity="0.12" stroke="#FFFFFF" strokeWidth="0.75" strokeDasharray="3 4">
            <line x1="50" y1="120" x2="950" y2="120" />
            <line x1="50" y1="240" x2="950" y2="240" />
            <line x1="50" y1="360" x2="950" y2="360" />
            <line x1="250" y1="50" x2="250" y2="440" />
            <line x1="500" y1="50" x2="500" y2="440" />
            <line x1="750" y1="50" x2="750" y2="440" />
          </g>

          {/* ================= CONTINENTS LAYER (Stylized Base Geometry) ================= */}
          <g className="landmass-base">
            {/* North America Base */}
            <path
              d="M 120 70 
                 L 190 60 L 260 65 L 310 90 L 330 110 L 290 140 L 260 140 L 230 170 L 270 190 L 280 230 
                 L 220 260 L 190 280 L 180 260 L 150 210 L 130 150 L 100 120 Z"
              fill="#1C212D"
              stroke="#2C3548"
              strokeWidth="1"
            />

            {/* Greenland */}
            <path
              d="M 330 45 L 390 40 L 400 70 L 360 85 L 330 65 Z"
              fill="#171C26"
              stroke="#242C3C"
              strokeWidth="0.8"
            />

            {/* South America Base */}
            <path
              d="M 230 275 L 290 270 L 330 310 L 340 360 L 300 440 L 270 440 L 250 370 L 220 310 Z"
              fill="#171C26"
              stroke="#242C3C"
              strokeWidth="0.8"
            />

            {/* Europe Base */}
            <path
              d="M 450 90 L 510 80 L 570 95 L 560 140 L 580 180 L 520 210 L 470 190 L 460 140 Z"
              fill="#1C212D"
              stroke="#2C3548"
              strokeWidth="1"
            />

            {/* Scandinavia */}
            <path
              d="M 490 60 L 530 50 L 540 85 L 510 100 L 485 85 Z"
              fill="#1C212D"
              stroke="#2C3548"
              strokeWidth="0.8"
            />

            {/* Africa Base */}
            <path
              d="M 450 200 L 540 195 L 590 250 L 570 330 L 530 410 L 480 390 L 440 290 L 430 230 Z"
              fill="#171C26"
              stroke="#242C3C"
              strokeWidth="0.8"
            />

            {/* Asia Base */}
            <path
              d="M 570 90 L 720 70 L 870 95 L 890 140 L 850 180 L 810 160 L 790 200 L 760 250 
                 L 700 280 L 660 250 L 620 250 L 580 200 Z"
              fill="#1C212D"
              stroke="#2C3548"
              strokeWidth="1"
            />

            {/* South Asia & India subcontinent */}
            <path
              d="M 640 210 L 700 210 L 690 280 L 665 300 L 635 250 Z"
              fill="#222837"
              stroke="#2E374D"
              strokeWidth="1"
            />

            {/* Southeast Asia Islands */}
            <path
              d="M 740 270 L 770 280 L 760 300 L 730 290 Z M 770 295 L 810 305 L 790 320 Z"
              fill="#1C212D"
              stroke="#2C3548"
              strokeWidth="0.8"
            />

            {/* Australia Base */}
            <path
              d="M 770 330 L 840 320 L 880 350 L 870 410 L 820 420 L 770 380 Z"
              fill="#1C212D"
              stroke="#2C3548"
              strokeWidth="1"
            />

            {/* New Zealand */}
            <path
              d="M 890 395 L 910 405 L 900 430 Z"
              fill="#171C26"
              stroke="#242C3C"
              strokeWidth="0.8"
            />
          </g>

          {/* ================= INTERACTIVE PARTNER COUNTRIES (Highlighted Overlays) ================= */}

          {/* 1. CANADA HIGHLIGHT REGION */}
          <g
            className="cursor-pointer group"
            onMouseEnter={() => setHoveredCountry('canada')}
            onClick={() => {
              setHoveredCountry('canada');
              onSelectCountry('canada');
            }}
          >
            <path
              d="M 125 75 L 195 62 L 265 67 L 315 92 L 325 110 L 290 135 L 230 140 L 150 145 L 125 105 Z"
              fill={hoveredCountry === 'canada' ? 'url(#activeCountryGrad)' : '#9F1239'}
              fillOpacity={hoveredCountry === 'canada' ? 0.9 : 0.35}
              stroke="#E11D2A"
              strokeWidth={hoveredCountry === 'canada' ? '2.5' : '1.2'}
              className="transition-all duration-300"
            />
          </g>

          {/* 2. USA HIGHLIGHT REGION */}
          <g
            className="cursor-pointer group"
            onMouseEnter={() => setHoveredCountry('usa')}
            onClick={() => {
              setHoveredCountry('usa');
              onSelectCountry('usa');
            }}
          >
            <path
              d="M 150 145 L 230 140 L 290 135 L 280 200 L 255 225 L 205 235 L 180 220 L 140 185 Z"
              fill={hoveredCountry === 'usa' ? 'url(#activeCountryGrad)' : '#9F1239'}
              fillOpacity={hoveredCountry === 'usa' ? 0.9 : 0.35}
              stroke="#E11D2A"
              strokeWidth={hoveredCountry === 'usa' ? '2.5' : '1.2'}
              className="transition-all duration-300"
            />
          </g>

          {/* 3. UNITED KINGDOM & IRELAND */}
          <g
            className="cursor-pointer group"
            onMouseEnter={() => setHoveredCountry('uk')}
            onClick={() => {
              setHoveredCountry('uk');
              onSelectCountry('uk');
            }}
          >
            <path
              d="M 465 115 L 485 110 L 490 145 L 475 160 L 460 145 Z"
              fill={hoveredCountry === 'uk' ? 'url(#activeCountryGrad)' : '#9F1239'}
              fillOpacity={hoveredCountry === 'uk' ? 0.9 : 0.45}
              stroke="#E11D2A"
              strokeWidth={hoveredCountry === 'uk' ? '2.5' : '1.5'}
              className="transition-all duration-300"
            />
          </g>

          {/* 4. GERMANY & CENTRAL EUROPE */}
          <g
            className="cursor-pointer group"
            onMouseEnter={() => setHoveredCountry('europe')}
            onClick={() => {
              setHoveredCountry('europe');
              onSelectCountry('europe');
            }}
          >
            <path
              d="M 500 130 L 545 125 L 560 155 L 540 180 L 495 170 Z"
              fill={hoveredCountry === 'europe' ? 'url(#activeCountryGrad)' : '#9F1239'}
              fillOpacity={hoveredCountry === 'europe' ? 0.9 : 0.4}
              stroke="#E11D2A"
              strokeWidth={hoveredCountry === 'europe' ? '2.5' : '1.3'}
              className="transition-all duration-300"
            />
          </g>

          {/* 5. AUSTRALIA */}
          <g
            className="cursor-pointer group"
            onMouseEnter={() => setHoveredCountry('australia')}
            onClick={() => {
              setHoveredCountry('australia');
              onSelectCountry('australia');
            }}
          >
            <path
              d="M 770 330 L 840 320 L 880 350 L 870 410 L 820 420 L 770 380 Z"
              fill={hoveredCountry === 'australia' ? 'url(#activeCountryGrad)' : '#9F1239'}
              fillOpacity={hoveredCountry === 'australia' ? 0.9 : 0.4}
              stroke="#E11D2A"
              strokeWidth={hoveredCountry === 'australia' ? '2.5' : '1.4'}
              className="transition-all duration-300"
            />
          </g>

          {/* ================= FLIGHT PATH ARCS RADIATING FROM DHAKA ================= */}
          <g className="flight-routes" stroke="url(#flightLineGrad)" fill="none" strokeWidth="1.5">
            {/* Dhaka to Canada */}
            <path
              d="M 672 228 Q 450 50 220 135"
              strokeDasharray="6 4"
              opacity={hoveredCountry === 'canada' ? 1 : 0.3}
              strokeWidth={hoveredCountry === 'canada' ? 2.5 : 1.2}
              className="transition-all duration-500"
            />

            {/* Dhaka to UK */}
            <path
              d="M 672 228 Q 570 120 475 135"
              strokeDasharray="6 4"
              opacity={hoveredCountry === 'uk' ? 1 : 0.3}
              strokeWidth={hoveredCountry === 'uk' ? 2.5 : 1.2}
              className="transition-all duration-500"
            />

            {/* Dhaka to USA */}
            <path
              d="M 672 228 Q 440 80 215 195"
              strokeDasharray="6 4"
              opacity={hoveredCountry === 'usa' ? 1 : 0.3}
              strokeWidth={hoveredCountry === 'usa' ? 2.5 : 1.2}
              className="transition-all duration-500"
            />

            {/* Dhaka to Germany/Europe */}
            <path
              d="M 672 228 Q 600 150 520 155"
              strokeDasharray="6 4"
              opacity={hoveredCountry === 'europe' ? 1 : 0.3}
              strokeWidth={hoveredCountry === 'europe' ? 2.5 : 1.2}
              className="transition-all duration-500"
            />

            {/* Dhaka to Australia */}
            <path
              d="M 672 228 Q 750 280 815 355"
              strokeDasharray="6 4"
              opacity={hoveredCountry === 'australia' ? 1 : 0.3}
              strokeWidth={hoveredCountry === 'australia' ? 2.5 : 1.2}
              className="transition-all duration-500"
            />
          </g>

          {/* ================= DHAKA ORIGIN HUB (MY IELTS MIRPUR) ================= */}
          <g>
            <circle cx={DHAKA_COORDS.x} cy={DHAKA_COORDS.y} r="14" fill="url(#haloGlow)" />
            <circle cx={DHAKA_COORDS.x} cy={DHAKA_COORDS.y} r="4.5" fill="#E11D2A" />
            <circle cx={DHAKA_COORDS.x} cy={DHAKA_COORDS.y} r="2" fill="#FFFFFF" />
            
            {/* Dhaka Pin Marker Label */}
            <rect
              x={DHAKA_COORDS.x - 45}
              y={DHAKA_COORDS.y + 12}
              width="90"
              height="18"
              rx="4"
              fill="#0D0D11"
              stroke="#E11D2A"
              strokeWidth="0.8"
            />
            <text
              x={DHAKA_COORDS.x}
              y={DHAKA_COORDS.y + 24}
              fill="#FFFFFF"
              fontSize="9"
              fontWeight="bold"
              textAnchor="middle"
            >
              DHAKA (Mirpur Hub)
            </text>
          </g>

          {/* ================= TARGET COUNTRY PINS & RINGS ================= */}
          {Object.entries(PARTNER_COUNTRIES).map(([id, country]) => {
            const isHovered = hoveredCountry === id;
            return (
              <g
                key={id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredCountry(id)}
                onClick={() => {
                  setHoveredCountry(id);
                  onSelectCountry(id);
                }}
              >
                {/* Outer Glow Halo */}
                {isHovered && (
                  <circle
                    cx={country.pinCoords.x}
                    cy={country.pinCoords.y}
                    r="20"
                    fill="url(#haloGlow)"
                    className="animate-pulse"
                  />
                )}

                {/* Pulsing Target Ring */}
                <circle
                  cx={country.pinCoords.x}
                  cy={country.pinCoords.y}
                  r={isHovered ? '9' : '6'}
                  fill="none"
                  stroke={isHovered ? '#FFFFFF' : '#E11D2A'}
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                />

                {/* Center Solid Dot */}
                <circle
                  cx={country.pinCoords.x}
                  cy={country.pinCoords.y}
                  r={isHovered ? '4.5' : '3'}
                  fill={isHovered ? '#E11D2A' : '#FF4D5E'}
                  className="transition-all duration-300"
                />

                {/* Country Name Tag Overlay in SVG */}
                <rect
                  x={country.pinCoords.x - 30}
                  y={country.pinCoords.y - 24}
                  width="60"
                  height="16"
                  rx="4"
                  fill={isHovered ? '#E11D2A' : '#171C26'}
                  stroke={isHovered ? '#FFFFFF' : '#333D52'}
                  strokeWidth="0.8"
                  className="transition-all duration-200"
                />
                <text
                  x={country.pinCoords.x}
                  y={country.pinCoords.y - 13}
                  fill="#FFFFFF"
                  fontSize="8.5"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {country.flag} {country.name.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* ================= INTERACTIVE FLOATING TOOLTIP HUD ================= */}
        <AnimatePresence>
          {activeCountry && (
            <motion.div
              key={activeCountry.id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25 }}
              className="absolute top-3 left-3 sm:top-5 sm:left-5 max-w-xs sm:max-w-sm w-full bg-[#121620]/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-red-500/40 shadow-2xl z-20"
            >
              {/* Tooltip Header */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{activeCountry.flag}</span>
                  <div>
                    <h4 className="text-base sm:text-lg font-black font-display text-white flex items-center gap-2">
                      {activeCountry.name}
                      <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-red-600/30 text-red-300 border border-red-500/30">
                        Active Partner
                      </span>
                    </h4>
                    <p className="text-[11px] text-neutral-400 font-medium">
                      {activeCountry.tagline}
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Facts Grid */}
              <div className="grid grid-cols-2 gap-2 my-3 py-2.5 border-t border-b border-neutral-800 text-xs">
                <div className="bg-neutral-900/80 p-2 rounded-lg border border-neutral-800/80">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                    Visa Stream
                  </span>
                  <span className="text-xs font-extrabold text-red-400">
                    {activeCountry.visaSupport}
                  </span>
                </div>

                <div className="bg-neutral-900/80 p-2 rounded-lg border border-neutral-800/80">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                    IELTS Target
                  </span>
                  <span className="text-sm font-extrabold text-white">
                    {activeCountry.ieltsScore}
                  </span>
                </div>

                <div className="bg-neutral-900/80 p-2 rounded-lg border border-neutral-800/80 col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-[#E11D2A]" /> Post-Study Work:
                    </span>
                    <span className="font-bold text-red-300 text-xs">
                      {activeCountry.postStudyWork}
                    </span>
                  </div>
                </div>

                <div className="bg-neutral-900/80 p-2 rounded-lg border border-neutral-800/80 col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#E11D2A]" /> Intakes:
                    </span>
                    <span className="font-semibold text-neutral-300 text-xs">
                      {activeCountry.intakes}
                    </span>
                  </div>
                </div>
              </div>

              {/* Top Partner Campuses */}
              <div className="mb-3">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-[#E11D2A]" /> Top Institutions:
                </span>
                <div className="flex flex-wrap gap-1">
                  {activeCountry.popularUniversities.map((uni) => (
                    <span
                      key={uni}
                      className="px-2 py-0.5 rounded-md bg-neutral-800 text-[10px] font-semibold text-neutral-200 border border-neutral-700/60"
                    >
                      {uni}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => onSelectCountry(activeCountry.id)}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#E11D2A] hover:bg-red-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-red-950/40"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onOpenConsultation}
                  className="py-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs transition-colors cursor-pointer border border-neutral-700"
                >
                  Book Session
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Global Mobility Footnotes / Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 mt-4 border-t border-neutral-800 text-center text-xs">
        <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
          <div className="text-base sm:text-lg font-black text-white font-display">5 Major Regions</div>
          <div className="text-[11px] text-neutral-400">Canada, UK, USA, AUS, EU</div>
        </div>
        <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
          <div className="text-base sm:text-lg font-black text-[#E11D2A] font-display">University Alignment</div>
          <div className="text-[11px] text-neutral-400">Accredited Global Institutions</div>
        </div>
        <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
          <div className="text-base sm:text-lg font-black text-white font-display">Visa Guidance</div>
          <div className="text-[11px] text-neutral-400">Document Audit & Lodgment</div>
        </div>
        <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
          <div className="text-base sm:text-lg font-black text-[#E11D2A] font-display">Mirpur Hub</div>
          <div className="text-[11px] text-neutral-400">In-Person Diagnostic Center</div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveWorldMap;
