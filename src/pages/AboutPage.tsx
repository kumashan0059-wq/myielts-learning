import React from 'react';
import {
  Globe,
  ShieldCheck,
  GraduationCap,
  Users,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Facebook,
  Target,
  Compass,
} from 'lucide-react';
import { AboutSection } from '../components/AboutSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { usePageSeo, Link, APP_ROUTES } from '../router/RouterContext';
import {
  BRAND_FACEBOOK_URL,
  FACEBOOK_FOLLOWERS,
  BRAND_LOCATION,
} from '../data/content';
import aboutCampusImg from '../assets/images/about_mentors_campus_1795289556719.jpg';

interface AboutPageProps {
  onOpenConsultation: (serviceName?: string) => void;
}

const DIVISIONS = [
  {
    title: 'IELTS Academic & GT Faculty',
    desc: 'Small-cohort classroom instructors focused on Cambridge rubrics, Listening distractors, Reading speed strategies, Writing annotation, and daily Speaking interviews.',
    icon: GraduationCap,
  },
  {
    title: 'Spoken English & Fluency Coaches',
    desc: 'Interactive conversation leads helping students break speaking anxiety through phonetics practice, structured debates, and practical everyday communication.',
    icon: Users,
  },
  {
    title: 'Global Admissions & Visa Advisors',
    desc: 'Dedicated counseling staff guiding realistic university selection, SOP structuring, financial document audits, and honest embassy interview prep.',
    icon: Compass,
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenConsultation }) => {
  usePageSeo({
    title: 'About MY IELTS — Educational Consultancy in Mirpur, Dhaka',
    description:
      'Learn about MY IELTS in Mirpur, Dhaka: our mission, educational approach, classroom faculty, transparent study abroad and visa guidance, and student commitment.',
  });

  return (
    <div className="bg-white">
      {/* Campus Editorial Hero */}
      <section className="py-14 sm:py-20 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E11D2A]">
                <Globe className="w-4 h-4" />
                <span>About MY IELTS · {BRAND_LOCATION}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black font-display text-[#0D0D11] tracking-tight leading-[1.08]">
                Prepare Smart. <span className="text-[#E11D2A]">Go Global.</span>
              </h1>
              <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
                MY IELTS is a Dhaka-based English language academy and international education consultancy built around real classroom mentorship, honest eligibility advice, and practical exam strategy.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-5 rounded-2xl bg-white border border-neutral-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#E11D2A] uppercase tracking-wider mb-1.5">
                    <Target className="w-4 h-4" />
                    <span>Our Mission</span>
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    Equip every candidate with authentic English proficiency and accurate international admission guidance without exaggerated promises.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#0D0D11] text-white">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#E11D2A] uppercase tracking-wider mb-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Our Vision</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Become the most trusted student mentorship hub connecting Bangladeshi learners to global universities and careers.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenConsultation('Campus Visit & Counseling')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white font-bold text-sm cursor-pointer transition-colors"
                >
                  <span>Schedule a Campus Visit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={BRAND_FACEBOOK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-neutral-300 hover:border-[#E11D2A] text-[#0D0D11] text-sm font-bold transition-colors"
                >
                  <Facebook className="w-4 h-4 text-[#E11D2A]" />
                  <span>{FACEBOOK_FOLLOWERS} Community</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl p-2.5 bg-[#0D0D11] shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <img
                    src={aboutCampusImg}
                    alt="MY IELTS Executive Classroom and Counseling Lounge in Mirpur, Dhaka"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D11]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E11D2A] block">
                      Mirpur Executive Campus
                    </span>
                    <span className="text-sm sm:text-base font-bold">
                      Real Classroom Learning · Personalized Mentorship
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Educational Approach & Team Divisions */}
      <section className="py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E11D2A] uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Team &amp; Teaching Divisions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-[#0D0D11] mb-3">
              How Our Mentors <span className="text-[#E11D2A]">Support Your Goal</span>
            </h2>
            <p className="text-sm text-neutral-600">
              Instead of oversized lecture halls, we organize instruction into focused coaching and counseling units.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {DIVISIONS.map((div) => {
              const Icon = div.icon;
              return (
                <div key={div.title} className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-[#E11D2A] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-[#0D0D11] mb-2">{div.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{div.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="rounded-3xl bg-[#0D0D11] text-white p-7 sm:p-9 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E11D2A]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Commitment to Students</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display">
                Honest Guidance Over Unverified Promises
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                We assess your academic grades, financial readiness, and language level realistically before recommending any test batch or country pathway.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to={APP_ROUTES.contact}
                className="px-6 py-3.5 rounded-xl bg-[#E11D2A] hover:bg-[#C8102E] text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Visit Contact Page
              </Link>
              <Link
                to={APP_ROUTES.mockTests}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Try Mock Test Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Existing Vision & Offerings Section */}
      <AboutSection onOpenConsultation={() => onOpenConsultation('About MY IELTS Inquiry')} />

      {/* Why Students Choose MY IELTS */}
      <WhyChooseUs />
    </div>
  );
};
