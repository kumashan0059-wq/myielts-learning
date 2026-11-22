import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Menu, X, ArrowRight, Calendar, Sparkles, Facebook, MapPin } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { Link, useRouter, APP_ROUTES } from '../router/RouterContext';
import {
  BRAND_PHONE,
  BRAND_PHONE_CLEAN,
  FACEBOOK_FOLLOWERS,
  BRAND_FACEBOOK_URL
} from '../data/content';

interface NavbarProps {
  onOpenConsultation: () => void;
  onOpenBatch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation, onOpenBatch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPath } = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', to: APP_ROUTES.home, id: 'home' },
    { label: 'IELTS', to: APP_ROUTES.ielts, id: 'ielts' },
    { label: 'Mock Tests', to: APP_ROUTES.mockTests, id: 'mock-tests' },
    { label: 'Spoken English', to: APP_ROUTES.spokenEnglish, id: 'spoken-english' },
    { label: 'Global Journey', to: APP_ROUTES.globalJourney, id: 'global-journey' },
    { label: 'Study Abroad', to: APP_ROUTES.studyAbroad, id: 'study-abroad' },
    { label: 'Visa Services', to: APP_ROUTES.visaServices, id: 'visa-services' },
    { label: 'Work Permit', to: APP_ROUTES.workPermit, id: 'work-permit' },
    { label: 'About Us', to: APP_ROUTES.about, id: 'about' },
    { label: 'Contact', to: APP_ROUTES.contact, id: 'contact' },
  ];

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-[#0D0D11] text-white text-xs py-2 px-4 border-b border-neutral-800 z-50 relative">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#E11D2A] text-white text-[11px] font-bold uppercase tracking-wider animate-pulse">
              <Sparkles className="w-3 h-3" /> Next Batch Starting
            </span>
            <span className="text-neutral-300 hidden sm:inline">
              Admissions Open for Next IELTS &amp; Spoken English Batches!
            </span>
            <button
              onClick={onOpenBatch}
              className="text-[#E11D2A] hover:text-red-400 font-semibold underline underline-offset-2 ml-1 cursor-pointer transition-colors text-[11px] sm:text-xs"
            >
              Reserve Seat &rarr;
            </button>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-neutral-300">
            <a
              href={BRAND_FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors group"
            >
              <Facebook className="w-3.5 h-3.5 fill-[#E11D2A] text-[#E11D2A] group-hover:scale-110 transition-transform" />
              <span className="font-bold">{FACEBOOK_FOLLOWERS} Community</span>
            </a>
            <span className="hidden lg:inline text-neutral-700">&bull;</span>
            <span className="hidden md:inline-flex items-center gap-1 text-neutral-300">
              <MapPin className="w-3 h-3 text-[#E11D2A]" />
              <span>Mirpur, Dhaka</span>
            </span>
            <span className="hidden md:inline text-neutral-700">&bull;</span>
            <a
              href={`tel:${BRAND_PHONE_CLEAN}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors group"
            >
              <Phone className="w-3.5 h-3.5 text-[#E11D2A] group-hover:scale-110 transition-transform" />
              <span className="font-semibold">{BRAND_PHONE}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        id="navbar"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-neutral-100'
            : 'bg-white/90 backdrop-blur-sm py-3.5 border-b border-neutral-100/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          {/* Logo */}
          <Link
            to={APP_ROUTES.home}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2A] rounded-lg shrink-0"
          >
            <BrandLogo size="md" showTagline={true} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentPath === link.to;
              return (
                <Link
                  key={link.id}
                  to={link.to}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-2 2xl:px-2.5 py-2 text-[13px] font-medium rounded-md transition-all relative whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#E11D2A] font-semibold'
                      : 'text-neutral-700 hover:text-[#E11D2A] hover:bg-neutral-50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#E11D2A] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="hidden xl:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenConsultation}
              id="navbar-cta-btn"
              className="group relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#E11D2A] hover:bg-[#C8102E] text-white text-[13px] font-semibold shadow-md shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Free Consultation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Tablet / Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenConsultation}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#E11D2A] hover:bg-[#C8102E] text-white text-xs font-semibold shadow-sm cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Free Consultation</span>
            </button>
            <a
              href={`tel:${BRAND_PHONE_CLEAN}`}
              className="p-2 rounded-lg bg-neutral-100 text-[#E11D2A] hover:bg-red-50 transition-colors"
              aria-label="Call Us"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-neutral-800 hover:text-[#E11D2A] hover:bg-neutral-100 focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="xl:hidden border-t border-neutral-200 bg-white/98 backdrop-blur-lg px-4 pt-3 pb-6 shadow-xl max-h-[82vh] overflow-y-auto"
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive = currentPath === link.to;
                  return (
                    <Link
                      key={link.id}
                      to={link.to}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-red-50 text-[#E11D2A] font-bold'
                          : 'text-neutral-800 hover:text-[#E11D2A] hover:bg-red-50/50'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className={`w-4 h-4 ${isActive ? 'text-[#E11D2A]' : 'text-neutral-400'}`} />
                    </Link>
                  );
                })}

                <div className="pt-4 border-t border-neutral-100 space-y-2.5">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenConsultation();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#E11D2A] text-white font-semibold shadow-md shadow-red-500/20 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Free Consultation</span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenBatch();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0D0D11] text-white font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#E11D2A]" />
                    <span>Join Our Next Batch</span>
                  </button>

                  <a
                    href={`tel:${BRAND_PHONE_CLEAN}`}
                    className="flex items-center justify-center gap-2 py-2.5 text-neutral-800 font-semibold text-sm hover:text-[#E11D2A]"
                  >
                    <Phone className="w-4 h-4 text-[#E11D2A]" />
                    <span>Call Hotline: {BRAND_PHONE}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

