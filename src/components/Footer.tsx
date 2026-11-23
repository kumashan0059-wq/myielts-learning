import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  ArrowUp
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { Link, APP_ROUTES } from '../router/RouterContext';
import {
  BRAND_PHONE,
  BRAND_PHONE_CLEAN,
  BRAND_EMAIL,
  BRAND_LOCATION,
  BRAND_CORE_PROMISE,
  BRAND_SECONDARY_TAGLINE,
  FACEBOOK_FOLLOWERS,
  BRAND_FACEBOOK_URL
} from '../data/content';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Home', to: APP_ROUTES.home },
    { label: 'IELTS', to: APP_ROUTES.ielts },
    { label: 'Mock Tests', to: APP_ROUTES.mockTests },
    { label: 'Spoken English', to: APP_ROUTES.spokenEnglish },
    { label: 'Global Journey', to: APP_ROUTES.globalJourney },
    { label: 'Study Abroad', to: APP_ROUTES.studyAbroad },
    { label: 'Visa Services', to: APP_ROUTES.visaServices },
    { label: 'Work Permit', to: APP_ROUTES.workPermit },
    { label: 'About Us', to: APP_ROUTES.about },
    { label: 'Contact', to: APP_ROUTES.contact },
  ];

  const countries = [
    { label: 'Study in Canada (PGWP & SDS)', to: `${APP_ROUTES.studyAbroad}?country=canada` },
    { label: 'Study in UK (Graduate Route)', to: `${APP_ROUTES.studyAbroad}?country=uk` },
    { label: 'Study in Australia (Subclass 500)', to: `${APP_ROUTES.studyAbroad}?country=australia` },
    { label: 'Study in USA (F-1 & STEM OPT)', to: `${APP_ROUTES.studyAbroad}?country=usa` },
    { label: 'Study in Germany (Zero Tuition)', to: `${APP_ROUTES.studyAbroad}?country=germany` },
    { label: 'Study in Japan (High-Tech & PR)', to: `${APP_ROUTES.studyAbroad}?country=japan` },
    { label: 'Study in Ireland (Tech Hub)', to: `${APP_ROUTES.studyAbroad}?country=ireland` },
  ];

  return (
    <footer id="contact" className="bg-[#0D0D11] text-white pt-16 pb-12 border-t-2 border-[#E11D2A] relative overflow-hidden">
      
      {/* Top Red Accent Decorative Sweep */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-[#E11D2A] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Column 1: Brand & Tagline (lg:col-span-4) */}
          <div className="lg:col-span-4">
            <Link
              to={APP_ROUTES.home}
              aria-label="MY IELTS Home"
              className="inline-block mb-4 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2A] transition-transform hover:scale-[1.01]"
            >
              <BrandLogo variant="dark" size="lg" showTagline={true} />
            </Link>

            <p className="text-neutral-300 text-xs font-semibold mb-2">
              {BRAND_CORE_PROMISE}
            </p>
            <p className="text-neutral-400 text-xs leading-relaxed mb-4 max-w-sm">
              {BRAND_SECONDARY_TAGLINE} Certified Cambridge-aligned mentors in Mirpur, Dhaka.
            </p>

            {/* Official Facebook Community Pill (Strictly Red + Black + White) */}
            <a
              href={BRAND_FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-600/60 text-white transition-all text-xs mb-6 group cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-[#E11D2A] text-white flex items-center justify-center flex-shrink-0">
                <Facebook className="w-3 h-3 fill-current" />
              </div>
              <span className="font-bold text-white">{FACEBOOK_FOLLOWERS} Facebook Followers</span>
              <span className="text-[#E11D2A] text-[10px] uppercase font-bold tracking-wider group-hover:translate-x-0.5 transition-transform">
                Visit Community &rarr;
              </span>
            </a>

            {/* Social Media Icons with Red Accent */}
            <div className="flex items-center gap-3">
              <a
                href={BRAND_FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-[#E11D2A] text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Facebook (7.7K Followers)"
              >
                <Facebook className="w-4 h-4 fill-current" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-[#E11D2A] text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-[#E11D2A] text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-[#E11D2A] text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold font-display uppercase tracking-wider text-white mb-4 border-l-2 border-[#E11D2A] pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-neutral-400 hover:text-[#E11D2A] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-neutral-600 text-xs">&rsaquo;</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Global Destinations (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold font-display uppercase tracking-wider text-white mb-4 border-l-2 border-[#E11D2A] pl-2.5">
              Global Portals
            </h4>
            <ul className="space-y-2 text-xs">
              {countries.map((c) => (
                <li key={c.label}>
                  <Link
                    to={c.to}
                    className="text-neutral-400 hover:text-[#E11D2A] transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold font-display uppercase tracking-wider text-white mb-4 border-l-2 border-[#E11D2A] pl-2.5">
              Contact & Hotline
            </h4>

            <div className="space-y-3.5 text-sm">
              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-950/60 text-[#E11D2A] border border-red-800/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block">Admissions & Help Desk</span>
                  <a
                    href={`tel:${BRAND_PHONE_CLEAN}`}
                    className="text-base font-bold text-white hover:text-[#E11D2A] transition-colors block"
                  >
                    {BRAND_PHONE}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-[#E11D2A]" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block">Email Inquiries</span>
                  <a
                    href={`mailto:${BRAND_EMAIL}`}
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    {BRAND_EMAIL}
                  </a>
                </div>
              </div>

              {/* WhatsApp Direct */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block">WhatsApp Direct Hotline</span>
                  <a
                    href={`https://wa.me/8801754544508`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-200 hover:text-emerald-400 font-semibold text-xs transition-colors"
                  >
                    +880 1754-544508 (Instant Chat)
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#E11D2A]" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block">Campus Location</span>
                  <p className="text-neutral-300 text-xs leading-relaxed">
                    {BRAND_LOCATION}
                  </p>
                </div>
              </div>

              {/* Consultation Hours */}
              <div className="pt-2 border-t border-neutral-800/80">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                  Consultation & Office Hours
                </span>
                <p className="text-neutral-300 text-xs leading-relaxed">
                  Sat – Thu: 9:00 AM – 8:30 PM<br />
                  Friday: 2:30 PM – 8:00 PM
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Official Disclaimer Banner */}
        <div className="py-6 border-b border-neutral-800/80 text-center max-w-4xl mx-auto">
          <p className="text-[11px] text-neutral-400 leading-relaxed">
            <strong className="text-neutral-300">Official Advisory:</strong> MY IELTS provides test preparation, admissions counseling, and visa guidance. Final visa decisions rest solely with respective embassies and immigration authorities.
          </p>
        </div>

        {/* Bottom Bar: Copyright + Scroll to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} <strong className="text-neutral-300">MY IELTS</strong>. All Rights Reserved. “Learn Today, Lead Tomorrow.”
          </div>

          <div className="flex items-center gap-6">
            <span className="text-neutral-400">Mirpur Executive Campus • Dhaka, Bangladesh</span>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-lg bg-neutral-800 hover:bg-[#E11D2A] text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
