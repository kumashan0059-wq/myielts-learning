import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  GraduationCap,
  ArrowRight,
  Clock,
  Briefcase,
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Coins,
  ChevronRight,
  Building2,
  RotateCcw
} from 'lucide-react';
import { STUDY_DESTINATIONS } from '../data/content';
import { Destination } from '../types';
import { InteractiveWorldMap } from './InteractiveWorldMap';
import { DestinationDetailModal } from './DestinationDetailModal';

interface StudyAbroadSectionProps {
  onOpenConsultation: (countryName?: string) => void;
  initialCountryId?: string | null;
}

type CriterionFilter = 'all' | 'work-permit' | 'fast-pr' | 'low-tuition' | 'stem-opt';
type SortOption = 'recommended' | 'tuition-low' | 'ielts-low' | 'alphabetical';

export const StudyAbroadSection: React.FC<StudyAbroadSectionProps> = ({
  onOpenConsultation,
  initialCountryId = null,
}) => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCriterion, setSelectedCriterion] = useState<CriterionFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');

  useEffect(() => {
    if (!initialCountryId) return;
    const match = STUDY_DESTINATIONS.find(
      (d) => d.id.toLowerCase() === initialCountryId.toLowerCase()
    );
    if (match) {
      setSelectedDestination(match);
    }
  }, [initialCountryId]);

  // Unique list of regions
  const regions = useMemo(() => {
    const set = new Set<string>();
    STUDY_DESTINATIONS.forEach((d) => {
      if (d.region) set.add(d.region);
    });
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered & Sorted destinations
  const filteredDestinations = useMemo(() => {
    return STUDY_DESTINATIONS.filter((dest) => {
      // 1. Region Filter
      if (selectedRegion !== 'All' && dest.region !== selectedRegion) {
        return false;
      }

      // 2. Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesCountry = dest.country.toLowerCase().includes(q);
        const matchesTagline = dest.tagline.toLowerCase().includes(q);
        const matchesDesc = dest.description.toLowerCase().includes(q);
        const matchesUnis = dest.popularUniversities.some((u) => u.toLowerCase().includes(q));
        const matchesPrograms = dest.featuredUniversitiesDetailed?.some((u) =>
          u.topPrograms.some((p) => p.toLowerCase().includes(q))
        );
        const matchesVisa = dest.visaPathway?.visaSubclass.toLowerCase().includes(q);

        if (!matchesCountry && !matchesTagline && !matchesDesc && !matchesUnis && !matchesPrograms && !matchesVisa) {
          return false;
        }
      }

      // 3. Feature / Criteria Filter
      if (selectedCriterion === 'work-permit') {
        const psw = (dest.postStudyWork || '').toLowerCase();
        if (!psw.includes('3 year') && !psw.includes('4-5 year') && !psw.includes('36 month') && !psw.includes('2 year')) {
          return false;
        }
      } else if (selectedCriterion === 'fast-pr') {
        const pr = (dest.visaPathway?.prPathway || '').toLowerCase();
        if (!pr.includes('express entry') && !pr.includes('permanent') && !pr.includes('blue card') && !pr.includes('stamp 4') && !pr.includes('green list') && !pr.includes('skilled')) {
          return false;
        }
      } else if (selectedCriterion === 'low-tuition') {
        if (dest.id !== 'germany' && dest.id !== 'europe' && dest.id !== 'france' && dest.id !== 'japan' && dest.id !== 'finland' && dest.id !== 'ireland') {
          return false;
        }
      } else if (selectedCriterion === 'stem-opt') {
        if (dest.id !== 'usa') {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'alphabetical') {
        return a.country.localeCompare(b.country);
      }
      if (sortBy === 'ielts-low') {
        const aBand = a.admissionRequirements?.minIeltsUndergrad || '6.5';
        const bBand = b.admissionRequirements?.minIeltsUndergrad || '6.5';
        return aBand.localeCompare(bBand);
      }
      if (sortBy === 'tuition-low') {
        if (a.id === 'germany' || a.id === 'europe' || a.id === 'france' || a.id === 'japan') return -1;
        if (b.id === 'germany' || b.id === 'europe' || b.id === 'france' || b.id === 'japan') return 1;
        return 0;
      }
      return 0;
    });
  }, [selectedRegion, searchQuery, selectedCriterion, sortBy]);

  const handleSelectCountry = (countryId: string) => {
    const match = STUDY_DESTINATIONS.find((d) => d.id === countryId || (countryId === 'europe' && d.id === 'germany'));
    if (match) {
      setSelectedDestination(match);
    }
  };

  const resetFilters = () => {
    setSelectedRegion('All');
    setSearchQuery('');
    setSelectedCriterion('all');
    setSortBy('recommended');
  };

  const isFiltered =
    selectedRegion !== 'All' ||
    searchQuery.trim() !== '' ||
    selectedCriterion !== 'all' ||
    sortBy !== 'recommended';

  return (
    <section id="study-abroad" className="py-20 bg-neutral-50/50 relative overflow-hidden">
      {/* Subtle Coordinate/Latitude Grid Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#0D0D11_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/70 text-[#E11D2A] text-xs font-bold uppercase tracking-wider mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>Global Academic Horizons</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#0D0D11] tracking-tight leading-tight mb-4">
            Your Global Education <span className="text-[#E11D2A]">Journey Starts Here.</span>
          </h2>

          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
            Gain admission into prestigious, accredited institutions with top scholarship options, post-study work authorization, and clear residency pathways.
          </p>
        </div>

        {/* STYLIZED INTERACTIVE WORLD MAP */}
        <InteractiveWorldMap
          onSelectCountry={handleSelectCountry}
          onOpenConsultation={onOpenConsultation}
        />

        {/* DESTINATION BROWSER HEADER & CONTROLS */}
        <div id="destination-browser" className="mt-16 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E11D2A] uppercase tracking-wider mb-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Interactive Program & Pathway Explorer</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-[#0D0D11] tracking-tight">
                Browse Study Destinations & Visa Pathways
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-2xl">
                Filter by continent, admission test requirements, work permit duration, or immigration settlement pathways.
              </p>
            </div>

            <button
              onClick={() => onOpenConsultation()}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E11D2A] hover:text-red-700 transition-colors self-start md:self-auto cursor-pointer"
            >
              <span>Need personalized country profiling?</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* SEARCH & FILTER CONTROLS BAR */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-neutral-200/90 space-y-4">
            
            {/* Top Bar: Search Input & Sort Selector */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search countries, universities (e.g. Toronto, NYU), or subjects..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-[#E11D2A]/30 focus:border-[#E11D2A] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-0.5 rounded-full"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs text-neutral-500 font-semibold whitespace-nowrap">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-semibold text-neutral-800 focus:outline-hidden focus:ring-2 focus:ring-[#E11D2A]/30 focus:border-[#E11D2A] cursor-pointer"
                >
                  <option value="recommended">Featured / High Success</option>
                  <option value="tuition-low">Tuition (Lowest First)</option>
                  <option value="ielts-low">Min. IELTS Band</option>
                  <option value="alphabetical">Country (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Middle Bar: Region Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mr-1 hidden sm:inline">
                Region:
              </span>
              {regions.map((region) => {
                const count =
                  region === 'All'
                    ? STUDY_DESTINATIONS.length
                    : STUDY_DESTINATIONS.filter((d) => d.region === region).length;
                const isActive = selectedRegion === region;

                return (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#E11D2A] text-white shadow-xs'
                        : 'bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700'
                    }`}
                  >
                    <span>{region === 'All' ? 'All Regions' : region}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-neutral-200 text-neutral-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Bar: Key Pathway Filters */}
            <div className="pt-2 border-t border-neutral-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mr-1">
                Pathway Criteria:
              </span>

              <button
                onClick={() => setSelectedCriterion('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  selectedCriterion === 'all'
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                All Pathways
              </button>

              <button
                onClick={() => setSelectedCriterion('work-permit')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 ${
                  selectedCriterion === 'work-permit'
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                <Briefcase className="w-3 h-3" />
                <span>3+ Years Post-Study Work</span>
              </button>

              <button
                onClick={() => setSelectedCriterion('fast-pr')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 ${
                  selectedCriterion === 'fast-pr'
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                <ShieldCheck className="w-3 h-3" />
                <span>Express Entry & PR Settlement</span>
              </button>

              <button
                onClick={() => setSelectedCriterion('low-tuition')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 ${
                  selectedCriterion === 'low-tuition'
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                <Coins className="w-3 h-3" />
                <span>Zero / Low Tuition (Public Unis)</span>
              </button>

              <button
                onClick={() => setSelectedCriterion('stem-opt')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 ${
                  selectedCriterion === 'stem-opt'
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>36-Month STEM OPT</span>
              </button>

              {/* Reset Action */}
              {isFiltered && (
                <button
                  onClick={resetFilters}
                  className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-[#E11D2A] hover:text-red-700 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Results Count Bar */}
          <div className="mt-3 px-1 flex items-center justify-between text-xs text-neutral-500">
            <span>
              Showing <strong>{filteredDestinations.length}</strong> of{' '}
              <strong>{STUDY_DESTINATIONS.length}</strong> verified destinations
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            {isFiltered && (
              <span className="text-[#E11D2A] font-semibold">
                Filters active
              </span>
            )}
          </div>
        </div>

        {/* DESTINATIONS GRID */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredDestinations.map((dest, index) => {
              const adm = dest.admissionRequirements;
              const visa = dest.visaPathway;

              return (
                <motion.div
                  key={dest.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedDestination(dest)}
                  className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/90 hover:border-red-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  {/* Destination Image with Badges */}
                  <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
                    <img
                      src={dest.image}
                      alt={`${dest.country} Study Destination`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-black/20" />

                    {/* Top Row Badges: Flag + Country & Region */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold border border-white/15">
                        <span className="text-base">{dest.flag}</span>
                        <span>{dest.country}</span>
                      </div>

                      <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-neutral-200 text-[11px] font-semibold border border-white/10">
                        {dest.region}
                      </span>
                    </div>

                    {/* Bottom Row Tag: PSW Duration */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-red-600/90 backdrop-blur-md text-white text-xs font-bold border border-red-400/30 flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        <span>{dest.postStudyWork}</span>
                      </span>

                      {dest.avgTuition && (
                        <span className="text-xs font-semibold text-white/90 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md">
                          {dest.avgTuition.split('/')[0].trim()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Destination Body Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="text-xl font-black font-display text-[#0D0D11] group-hover:text-[#E11D2A] transition-colors">
                          Study in {dest.country}
                        </h4>
                      </div>

                      <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2 mb-4">
                        {dest.description}
                      </p>

                      {/* Specs Matrix */}
                      <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200/70 text-xs space-y-2 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-500 flex items-center gap-1.5">
                            <GraduationCap className="w-3.5 h-3.5 text-[#E11D2A]" /> Min. IELTS:
                          </span>
                          <span className="font-bold text-neutral-900">
                            {adm ? adm.minIeltsUndergrad.replace('Overall', 'UG') : 'Band 6.0 - 6.5+'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-neutral-500 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#E11D2A]" /> Intakes:
                          </span>
                          <span className="font-semibold text-neutral-800 truncate max-w-[170px]">
                            {dest.intakes}
                          </span>
                        </div>

                        {visa && (
                          <div className="flex items-center justify-between pt-1 border-t border-neutral-200/60">
                            <span className="text-neutral-500 flex items-center gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5 text-[#E11D2A]" /> Visa Stream:
                            </span>
                            <span className="font-semibold text-neutral-800 truncate max-w-[170px]">
                              {visa.visaSubclass.split('(')[0].trim()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Featured Universities Preview */}
                      <div className="mb-4">
                        <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1.5">
                          Featured Partner Universities:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {dest.popularUniversities.slice(0, 3).map((uni) => (
                            <span
                              key={uni}
                              className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-neutral-100 text-neutral-800 group-hover:bg-red-50 group-hover:text-red-900 transition-colors"
                            >
                              {uni}
                            </span>
                          ))}
                          {dest.popularUniversities.length > 3 && (
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-neutral-100 text-neutral-500">
                              +{dest.popularUniversities.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2 pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDestination(dest);
                        }}
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white font-bold text-xs tracking-wide transition-colors cursor-pointer shadow-xs shadow-red-500/10"
                      >
                        <span>View Admission & Visa Pathways</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenConsultation(dest.country);
                        }}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-bold text-neutral-600 hover:text-[#E11D2A] transition-colors cursor-pointer"
                      >
                        <span>Free Profile Assessment for {dest.country}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200 max-w-lg mx-auto shadow-xs">
            <div className="w-12 h-12 rounded-full bg-red-100 text-[#E11D2A] flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-neutral-900 font-display mb-1">
              No matching destinations found
            </h4>
            <p className="text-xs sm:text-sm text-neutral-500 mb-6">
              We couldn't find any destination matching "{searchQuery}" under the selected criteria. Try adjusting your search query or reset your filters.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E11D2A] text-white font-bold text-xs hover:bg-[#C8102E] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

        {/* COMPREHENSIVE DESTINATION ADMISSION & VISA PATHWAYS MODAL */}
        <DestinationDetailModal
          destination={selectedDestination}
          isOpen={!!selectedDestination}
          onClose={() => setSelectedDestination(null)}
          onOpenConsultation={(country) => onOpenConsultation(country || selectedDestination?.country)}
        />
      </div>
    </section>
  );
};
