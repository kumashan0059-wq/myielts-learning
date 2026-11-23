import {
  ServiceItem,
  ProcessStep,
  Destination,
  VisaTimelineStep,
  Testimonial,
  FaqItem,
  StatItem,
  FeatureItem,
  TrustPillarItem
} from '../types';

export const BRAND_PHONE = "01754 544 508";
export const BRAND_PHONE_CLEAN = "01754544508";
export const BRAND_EMAIL = "info@myielts.org";
export const BRAND_LOCATION = "Mirpur, Dhaka, Bangladesh";
export const BRAND_TAGLINE = "Prepare Smart. Go Global.";
export const BRAND_SECONDARY_TAGLINE = "Build Confidence. Score Better. Go Global.";
export const BRAND_CORE_PROMISE = "Real Classroom Learning with Expert Mentors.";
export const BRAND_MOTTO = "Learn Today, Lead Tomorrow.";
export const FACEBOOK_FOLLOWERS = "7.7K+";
export const FACEBOOK_FOLLOWERS_COUNT = 7700;
export const FACEBOOK_FOLLOWING = "9";
export const FACEBOOK_PAGE_CATEGORY = "Educational Consultant";
export const FACEBOOK_PILLARS = "IELTS | Spoken English | Study Abroad Guidance";
export const BRAND_FACEBOOK_URL = "https://www.facebook.com/myieltsofficial";

export const TRUST_POINTS = [
  {
    id: "guidance",
    title: "Expert Guidance",
    description: "Experienced, certified instructors guiding every module with personalized attention.",
    icon: "GraduationCap"
  },
  {
    id: "scores",
    title: "Better Scores",
    description: "Strategic exam techniques, timed practice drills, and detailed diagnostic roadmaps.",
    icon: "TrendingUp"
  },
  {
    id: "opportunities",
    title: "Global Opportunities",
    description: "Dedicated study abroad counseling, document guidance, and student visa support.",
    icon: "Globe"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "ielts-prep",
    title: "IELTS Preparation",
    shortDescription: "Comprehensive training for Academic & General Training with verified band-boosting techniques.",
    details: "Master Reading, Writing, Listening, and Speaking with daily live practice, mock tests evaluated under Cambridge rubrics, and personalized feedback.",
    iconName: "BookOpen",
    tag: "Core Program",
    highlights: ["Band 7.5+ Target Focus", "Unlimited Mock Examinations", "1-on-1 Speaking Interviews"]
  },
  {
    id: "spoken-english",
    title: "Spoken English",
    shortDescription: "Interactive fluency training designed to eliminate hesitation and elevate corporate communication.",
    details: "Overcome fear of speaking through real-world debates, phonetics and accent reduction, situational dialogues, and dynamic presentations.",
    iconName: "Mic",
    tag: "Fluency & Confidence",
    highlights: ["Pronunciation Labs", "Native Idiom Immersion", "Public Speaking Confidence"]
  },
  {
    id: "study-abroad",
    title: "Study Abroad",
    shortDescription: "End-to-end international education consulting from university profiling to guaranteed enrollment.",
    details: "Discover top-ranking global institutions matching your career goals, budget, and scholarship profile with complete application management.",
    iconName: "Compass",
    tag: "Global Admissions",
    highlights: ["500+ Partner Universities", "Scholarship Profiling", "Zero File Opening Hidden Fees"]
  },
  {
    id: "our-success",
    title: "Our Success",
    shortDescription: "Real student achievements, IELTS band score breakthroughs, and international university placements.",
    details: "See how structured diagnostics, targeted practice, and personalized mentorship translate into stronger band scores and confident global study transitions.",
    iconName: "Award",
    tag: "Student Outcomes",
    highlights: ["Band Score Breakthroughs", "Verified Student Stories", "Global University Offers"]
  }
];

export const IELTS_MODULES = [
  {
    name: "Speaking",
    bandFocus: "Fluency & Lexical Range",
    description: "One-on-one live interview drills, fluency pacing, idiomatic phrases, and cue card mastery.",
    icon: "MessageSquare",
    highlight: "15+ Mock Interviews"
  },
  {
    name: "Writing",
    bandFocus: "Task 1 & Task 2 Mastery",
    description: "Detailed breakdown of academic graphs, formal letters, essay structures, and cohesion techniques.",
    icon: "PenTool",
    highlight: "Daily Essay Grading"
  },
  {
    name: "Reading",
    bandFocus: "Skimming & Precision Scanning",
    description: "Tackle True/False/Not Given, Heading Matching, and complex passages with timed speed strategies.",
    icon: "Eye",
    highlight: "Time Reduction Drills"
  },
  {
    name: "Listening",
    bandFocus: "Accent & Distractor Mastery",
    description: "Trained across British, Australian, Canadian, and American accents with high-focus audio exercises.",
    icon: "Headphones",
    highlight: "40 Full Audio Tests"
  }
];

export const IELTS_PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "Assessment",
    description: "Comprehensive diagnostic test to establish your exact baseline band score and detect weak spots.",
    milestone: "Diagnostic Band Report"
  },
  {
    stepNumber: "02",
    title: "Personalized Strategy",
    description: "Custom study roadmap tailored to your target university, visa deadline, and current proficiency.",
    milestone: "Custom Study Plan"
  },
  {
    stepNumber: "03",
    title: "Skill Development",
    description: "Intensive modular training across Speaking, Writing, Reading, and Listening with expert mentors.",
    milestone: "Core Technique Mastery"
  },
  {
    stepNumber: "04",
    title: "Mock Tests",
    description: "Full-length simulated exams under real test-center conditions with official Cambridge materials.",
    milestone: "Exam Chamber Simulation"
  },
  {
    stepNumber: "05",
    title: "Performance Improvement",
    description: "In-depth error analysis, 1-on-1 feedback sessions, and tactical adjustments for score jumps.",
    milestone: "Targeted Gap Elimination"
  },
  {
    stepNumber: "06",
    title: "Final IELTS Preparation",
    description: "Exam mindset conditioning, time-management tips, and final booster sessions before test day.",
    milestone: "Test Day Readiness"
  }
];

export const SPOKEN_ENGLISH_AREAS = [
  {
    title: "Everyday English",
    description: "Natural expressions, greetings, real-life casual interactions, and social confidence.",
    icon: "Smile"
  },
  {
    title: "Conversation Skills",
    description: "Active listening, discourse markers, conversational continuity, and polite interjections.",
    icon: "Users"
  },
  {
    title: "Pronunciation",
    description: "Phonetics, consonant clusters, intonation patterns, word stress, and clarity correction.",
    icon: "Volume2"
  },
  {
    title: "Vocabulary",
    description: "High-frequency collocations, academic words, professional terminology, and idioms.",
    icon: "Layers"
  },
  {
    title: "Grammar",
    description: "Tenses, structural accuracy, passive voice, and complex sentences made intuitive.",
    icon: "CheckCircle2"
  },
  {
    title: "Confidence",
    description: "Overcoming public speaking anxiety, impromptu speaking, and assertive body language.",
    icon: "Zap"
  }
];

export const STUDY_DESTINATIONS: Destination[] = [
  {
    id: "canada",
    country: "Canada",
    flag: "🇨🇦",
    image: "https://images.unsplash.com/photo-1517935703635-2717090c2210?auto=format&fit=crop&w=900&q=80",
    region: "North America",
    tagline: "World-Class Education & Clear PR Pathways",
    description: "Benefit from the post-graduation work permit (PGWP up to 3 years), SDS fast-track processing, and accessible Express Entry permanent residency.",
    popularUniversities: ["University of Toronto", "UBC", "McGill University", "University of Alberta", "Waterloo"],
    intakes: "Fall (Sep), Winter (Jan), Summer (May)",
    postStudyWork: "Up to 3 Years PGWP",
    avgTuition: "CAD 18,000 – 34,000 / yr",
    livingExpenses: "CAD 20,635 / yr (IRCC GIC Standard)",
    keyFeatures: ["Up to 3-Year PGWP", "SDS 20-Day Processing", "Express Entry / PNP Points", "24 hrs/wk Work Rights"],
    featuredUniversitiesDetailed: [
      { name: "University of Toronto", location: "Toronto, Ontario", topPrograms: ["Computer Science", "Engineering", "Commerce", "Biomedical Sciences"] },
      { name: "University of British Columbia", location: "Vancouver, BC", topPrograms: ["Data Science", "Forestry", "Business Admin", "AI & Robotics"] },
      { name: "McGill University", location: "Montreal, Quebec", topPrograms: ["Medicine", "Law", "Management", "Neuroscience"] },
      { name: "University of Alberta", location: "Edmonton, Alberta", topPrograms: ["Petroleum Eng.", "Nursing", "AI Research", "Agriculture"] }
    ],
    admissionRequirements: {
      minIeltsUndergrad: "Overall 6.0 (no band below 6.0)",
      minIeltsPostgrad: "Overall 6.5 (no band below 6.0; select programs 7.0)",
      minGpa: "Undergraduate: 65%+ in Higher Secondary / GPA 3.0+; Postgraduate: 70%+ or CGPA 3.0/4.0",
      alternateTests: ["PTE Academic (60+)", "TOEFL iBT (83-90+)", "CAEL (70+)"],
      standardizedTests: "Waived for 90% of programs; GRE required only for selective STEM/CS at top research universities.",
      mandatoryDocuments: [
        "Certified Academic Transcripts & Passing Certificates",
        "Comprehensive Statement of Purpose (SOP) with clear study rationale",
        "Two Academic or Professional Letters of Recommendation (LOR)",
        "Updated Professional Resume / Academic Curriculum Vitae",
        "Valid International Passport with minimum 18 months validity",
        "Proof of English Proficiency (IELTS / PTE / TOEFL)",
        "Guaranteed Investment Certificate (GIC) receipt of CAD 20,635"
      ],
      applicationDeadlines: "Fall Intake: Priority by Jan 15 – Mar 31 | Winter Intake: July 1 – Sep 15",
      notes: "Applicants must hold an official Letter of Acceptance from a Designated Learning Institution (DLI) holding a valid DLI number."
    },
    visaPathway: {
      visaSubclass: "Study Permit (Student Direct Stream - SDS & Regular Stream)",
      processingTimeline: "SDS: ~20 calendar days | Standard Stream: 4 to 8 weeks",
      financialSolvency: "Paid 1st year tuition fee receipt + CAD 20,635 GIC purchased with Scotiabank/CIBC/ICICI",
      workingHoursDuringTerm: "Up to 24 hours per week off-campus during classes; full-time (40 hrs/wk) during scheduled breaks",
      postStudyWorkPermit: "Post-Graduation Work Permit (PGWP) — 8 months to 3 years open work permit with no employer constraints",
      prPathway: "Canadian Experience Class (CEC) via Express Entry, Provincial Nominee Programs (OINP, BC PNP, AINP), and category-based STEM draws",
      keySteps: [
        "Secure official unconditional Letter of Acceptance (LOA) and Provincial Attestation Letter (PAL)",
        "Purchase CAD 20,635 GIC certificate and pay 1st year tuition directly to DLI",
        "Complete upfront medical examination with an IRCC panel physician",
        "Lodge online Study Permit application via IRCC web portal with digital dossier",
        "Attend biometric fingerprinting & photograph appointment at VFS Global",
        "Receive Port of Entry (POE) Letter of Introduction and passport visa counterfoil"
      ]
    }
  },
  {
    id: "uk",
    country: "United Kingdom",
    flag: "🇬🇧",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80",
    region: "Europe & UK",
    tagline: "Historic Excellence & 2-Year Graduate Route",
    description: "Accelerated 1-year master's degrees with global prestige, high visa success rates, and post-study Graduate Route employment rights.",
    popularUniversities: ["University of Manchester", "King's College London", "University of Edinburgh", "Bristol", "Warwick"],
    intakes: "September (Major) & January / February (Secondary)",
    postStudyWork: "2 Years Graduate Route",
    avgTuition: "£14,000 – £26,000 / yr",
    livingExpenses: "£1,483/mo (London) or £1,136/mo (Outer London) for 9 months",
    keyFeatures: ["1-Year Master's Programs", "2-Year Post-Study Work Visa", "No GRE/GMAT Required", "High Visa Approval Rate"],
    featuredUniversitiesDetailed: [
      { name: "University of Manchester", location: "Manchester, England", topPrograms: ["Engineering", "Business & Finance", "Computer Science", "Biotechnology"] },
      { name: "King's College London", location: "London, England", topPrograms: ["Law", "Public Policy", "International Relations", "Health Sciences"] },
      { name: "University of Edinburgh", location: "Edinburgh, Scotland", topPrograms: ["Informatics & AI", "Economics", "Literature", "Data Ethics"] },
      { name: "University of Bristol", location: "Bristol, England", topPrograms: ["Aerospace Eng.", "Economics", "Civil Engineering", "Law"] }
    ],
    admissionRequirements: {
      minIeltsUndergrad: "Overall 6.0 (minimum 5.5 in each component)",
      minIeltsPostgrad: "Overall 6.5 (minimum 6.0 in each band; Russell Group tier may request 7.0)",
      minGpa: "Bachelor's: 60%+ in Higher Secondary; Master's: 55-65% in relevant Bachelor's degree",
      alternateTests: ["PTE Academic (59-65+)", "TOEFL iBT (80-92+)", "IELTS for UKVI (SELT)"],
      standardizedTests: "GRE and GMAT are not required for over 95% of UK university programs.",
      mandatoryDocuments: [
        "Certified Academic Transcripts & Graduation Degree Certificates",
        "Well-structured Academic Statement of Purpose (SOP)",
        "Two Signed Academic / Professional Letters of Recommendation (LOR)",
        "Comprehensive CV / Resume with employment timeline",
        "Valid Passport Photo Page Copy",
        "Valid IELTS Academic or UKVI SELT Scorecard",
        "TB (Tuberculosis) Clearance Certificate from IOM approved clinic"
      ],
      applicationDeadlines: "UCAS (Undergrad): Jan 29 / June 30 | Postgraduate: Rolling admissions until June / July",
      notes: "Confirmation of Acceptance for Studies (CAS) issued by the university upon deposit payment."
    },
    visaPathway: {
      visaSubclass: "Student Visa (formerly Tier 4 General)",
      processingTimeline: "Standard: 3 weeks | Priority Service: 5 working days | Super Priority: 24-48 hours",
      financialSolvency: "Remaining tuition balance + £10,224 (outside London) or £13,348 (inner London) held for 28 consecutive days",
      workingHoursDuringTerm: "Up to 20 hours per week during term-time; full-time during official vacations",
      postStudyWorkPermit: "Graduate Route — 2 years unsponsored open work permit (3 years for doctoral / PhD graduates)",
      prPathway: "Switch to Skilled Worker Visa under the points-based immigration system, leading to Indefinite Leave to Remain (ILR) after 5 years",
      keySteps: [
        "Fulfill offer conditions and pay university deposit to generate your CAS number",
        "Maintain required financial solvency funds in an approved bank for 28 consecutive days",
        "Undertake mandatory IOM Tuberculosis (TB) medical screening",
        "Complete online UKVI application and pay Immigration Health Surcharge (IHS)",
        "Book and attend biometric identity appointment at VFS Global centre",
        "Collect passport with vignette visa foil and download digital eVisa"
      ]
    }
  },
  {
    id: "australia",
    country: "Australia",
    flag: "🇦🇺",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=900&q=80",
    region: "Asia-Pacific",
    tagline: "Group of Eight Excellence & Extended Regional PSW",
    description: "Leading universities, sunny lifestyle, generous regional work extensions up to 4-5 years, and clear points-tested PR pathways.",
    popularUniversities: ["University of Melbourne", "University of Sydney", "UNSW", "Monash University", "Queensland"],
    intakes: "Semester 1 (Feb/Mar) & Semester 2 (July/Aug)",
    postStudyWork: "Up to 4-5 Years (Regional)",
    avgTuition: "AUD 24,000 – 38,000 / yr",
    livingExpenses: "AUD 29,710 / yr (Home Affairs Standard)",
    keyFeatures: ["Group of Eight (Go8) Ranking", "Up to 4-5 Years Regional PSW", "48 hrs/fortnight Work Allowance", "Simplified Student Visa Framework"],
    featuredUniversitiesDetailed: [
      { name: "University of Melbourne", location: "Melbourne, Victoria", topPrograms: ["Law", "Biomedicine", "Commerce", "Engineering"] },
      { name: "University of Sydney", location: "Sydney, NSW", topPrograms: ["Finance & Management", "Architecture", "Computer Science", "Nursing"] },
      { name: "UNSW Sydney", location: "Sydney, NSW", topPrograms: ["Renewable Energy", "Software Eng.", "Quantum Computing", "Actuarial Studies"] },
      { name: "Monash University", location: "Melbourne, Victoria", topPrograms: ["Pharmacy", "Chemical Eng.", "Education", "Data Science"] }
    ],
    admissionRequirements: {
      minIeltsUndergrad: "Overall 6.0 (no individual band below 6.0)",
      minIeltsPostgrad: "Overall 6.5 (no sub-band below 6.0; healthcare/law may require 7.0)",
      minGpa: "Undergraduate: 65%+ in HSC; Master's: 60%+ or CGPA 2.8+ on 4.0 scale",
      alternateTests: ["PTE Academic (58-64+)", "TOEFL iBT (79-85+)", "Cambridge C1 Advanced"],
      standardizedTests: "GRE and GMAT are generally not requested for technical or business programs.",
      mandatoryDocuments: [
        "Genuine Student (GS) Narrative Assessment Statement",
        "Official Academic Transcripts and Graduation Completion Certificates",
        "Valid IELTS / PTE Academic Score Report",
        "Two Academic Recommendation Letters (LOR)",
        "Detailed Professional Resume / CV with work experience proof",
        "Bank Solvency Statements & Income Tax Assessment returns (12 months audit)",
        "Valid Passport Copy"
      ],
      applicationDeadlines: "Semester 1 (Feb): Oct 31 – Nov 30 | Semester 2 (July): Apr 15 – May 31",
      notes: "Applications are evaluated under the Genuine Student (GS) assessment framework."
    },
    visaPathway: {
      visaSubclass: "Student Visa (Subclass 500)",
      processingTimeline: "3 to 6 weeks under Simplified Student Visa Framework (SSVF)",
      financialSolvency: "AUD 29,710 annual living costs + 1-year tuition + AUD 2,500 travel allowance in verified accounts",
      workingHoursDuringTerm: "Up to 48 hours per fortnight during study sessions; unlimited during scheduled vacations",
      postStudyWorkPermit: "Temporary Graduate Visa (Subclass 485) — 2 to 4 years (+1 to 2 bonus years for designated regional campuses)",
      prPathway: "General Skilled Migration (Subclasses 189, 190 & 491 points-tested) with additional bonus points for Australian degree and regional residency",
      keySteps: [
        "Satisfy university GS evaluation and receive official Confirmation of Enrolment (CoE)",
        "Purchase compliant Overseas Student Health Cover (OSHC) for full visa period",
        "Lodge Subclass 500 visa application digitally through Home Affairs ImmiAccount",
        "Complete biometric collection and Bupa panel health examination",
        "Respond to any department inquiries and receive electronic Visa Grant Notice"
      ]
    }
  },
  {
    id: "usa",
    country: "USA",
    flag: "🇺🇸",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=900&q=80",
    region: "North America",
    tagline: "Global Tech Hubs & Generous STEM OPT",
    description: "Unrivaled research ecosystem, access to Silicon Valley & Wall Street, and up to 36 months of STEM OPT employment authorization.",
    popularUniversities: ["NYU", "UC Berkeley", "Boston University", "Purdue University", "Georgia Tech"],
    intakes: "Fall (August/September) & Spring (January)",
    postStudyWork: "12 to 36 Months OPT (STEM)",
    avgTuition: "USD 22,000 – 45,000 / yr",
    livingExpenses: "USD 15,000 – 22,000 / yr (University I-20 Standard)",
    keyFeatures: ["36-Month STEM OPT", "Teaching / Research Assistantships", "Curricular Practical Training (CPT)", "World-Leading R&D Ecosystem"],
    featuredUniversitiesDetailed: [
      { name: "New York University (NYU)", location: "New York, NY", topPrograms: ["Stern Business", "Computer Science", "Interactive Media", "Law"] },
      { name: "UC Berkeley", location: "Berkeley, California", topPrograms: ["EECS", "Data Science", "Economics", "Bioengineering"] },
      { name: "Boston University", location: "Boston, MA", topPrograms: ["Biomedical Eng.", "Finance", "Communications", "Public Health"] },
      { name: "Purdue University", location: "West Lafayette, Indiana", topPrograms: ["Mechanical Eng.", "Aviation", "Computer Science", "Agronomy"] }
    ],
    admissionRequirements: {
      minIeltsUndergrad: "Overall 6.5 (no sub-score below 6.0)",
      minIeltsPostgrad: "Overall 6.5 – 7.0+ (Top-tier universities require 7.0 or 7.5)",
      minGpa: "Undergraduate: GPA 3.0+ / 70%+; Postgraduate: GPA 3.2+ on 4.0 scale preferred",
      alternateTests: ["TOEFL iBT (85-100+)", "Duolingo English Test (115-130)", "PTE Academic (62+)"],
      standardizedTests: "SAT/ACT test-optional for many bachelor's; GRE/GMAT required for competitive STEM/MBA (waivers available for high GPA).",
      mandatoryDocuments: [
        "Official Academic Transcripts with course-by-course evaluation (WES/ECE) if required",
        "Statement of Purpose (SOP) tailored to academic faculty and research interests",
        "Three Letters of Recommendation (2 academic professors, 1 professional supervisor)",
        "Comprehensive CV / Resume showcasing project work and technical skills",
        "Bank Solvency Certificate and Affidavit of Financial Support covering 1 full year",
        "Copy of Passport Biographical Page & Standardized Test Reports"
      ],
      applicationDeadlines: "Fall Intake: Priority Dec 1 – Jan 15; Regular until Mar 15 | Spring Intake: Aug 1 – Oct 1",
      notes: "Certificate of Eligibility (Form I-20) is issued by university DSO after financial approval."
    },
    visaPathway: {
      visaSubclass: "F-1 Academic Student Visa",
      processingTimeline: "I-20 issuance: 1-3 weeks; Embassy interview scheduling varies; Visa stamped 3-5 days after interview",
      financialSolvency: "Verified liquid bank funds covering 1 full year Total Cost of Attendance (Tuition + Living listed on I-20, approx. $38K - $65K)",
      workingHoursDuringTerm: "Up to 20 hours/week on-campus during semester; Curricular Practical Training (CPT) off-campus after 1 academic year",
      postStudyWorkPermit: "Optional Practical Training (OPT) for 12 months, plus 24-month STEM OPT extension (total 36 months open work authorization)",
      prPathway: "Transition to employer-sponsored H-1B specialty visa, O-1 extraordinary ability visa, or EB-2 National Interest Waiver (NIW) green card",
      keySteps: [
        "Receive official university acceptance and generate SEVIS Form I-20",
        "Pay SEVIS I-901 fee ($350) online to US Immigration and Customs Enforcement",
        "Complete Online Nonimmigrant Visa Application (Form DS-160)",
        "Create US Travel Docs profile, pay MRV fee, and schedule Embassy Consular interview",
        "Conduct rigorous 1-on-1 mock interview drills with specialized US visa counselors",
        "Attend US Embassy visa interview and receive F-1 visa foil in passport"
      ]
    }
  },
  {
    id: "germany",
    country: "Germany",
    flag: "🇩🇪",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=900&q=80",
    region: "Europe & UK",
    tagline: "Tuition-Free Public Unis & 18-Month Job Seeker Visa",
    description: "World-leading engineering, technology, and research institutions with zero or minimal tuition fees at public universities and 18-month stay-back.",
    popularUniversities: ["TU Munich", "RWTH Aachen", "Heidelberg University", "TU Berlin", "KIT Karlsruhe"],
    intakes: "Winter Semester (October) & Summer Semester (April)",
    postStudyWork: "18 Months Job Seeker Visa",
    avgTuition: "€0 – €3,000 / yr (Public) | €9K – €14K (Private)",
    livingExpenses: "€11,208 / yr (Official Sperrkonto Standard)",
    keyFeatures: ["Zero Tuition at Public Unis", "18-Month Job Seeker Visa", "EU Blue Card Fast Track", "29-Country Schengen Mobility"],
    featuredUniversitiesDetailed: [
      { name: "Technical University of Munich (TUM)", location: "Munich, Germany", topPrograms: ["Automotive Eng.", "Informatics", "Robotics", "Physics"] },
      { name: "RWTH Aachen University", location: "Aachen, Germany", topPrograms: ["Mechanical Eng.", "Electrical Eng.", "Metallurgy", "Computational Eng."] },
      { name: "Heidelberg University", location: "Heidelberg, Germany", topPrograms: ["Medicine", "Molecular Biology", "Philosophy", "Biosciences"] },
      { name: "Technical University of Berlin", location: "Berlin, Germany", topPrograms: ["Computer Science", "Urban Planning", "Renewable Energy", "Process Eng."] }
    ],
    admissionRequirements: {
      minIeltsUndergrad: "Overall 6.0 – 6.5 (for English-taught degrees)",
      minIeltsPostgrad: "Overall 6.5 (no component band below 6.0)",
      minGpa: "Undergraduate: 70%+ or German Grade 2.5 equivalent; Master's: 4-year Bachelor's with 70%+",
      alternateTests: ["TOEFL iBT (80-92+)", "PTE Academic (58-65+)"],
      standardizedTests: "Uni-Assist VPD evaluation required; GRE optional for select TUM/Aachen master's.",
      mandatoryDocuments: [
        "Apostilled / Notarized Academic Transcripts and Degree Certificates",
        "Uni-Assist Preliminary Documentation (VPD) evaluation report",
        "Course Syllabus and ECTS Credit Comparison Matrix",
        "Statement of Motivation (Letter of Intent)",
        "Two Academic Recommendation Letters",
        "Tabular Europass Curriculum Vitae (CV)",
        "Blocked Account (Sperrkonto) Confirmation Certificate of €11,208"
      ],
      applicationDeadlines: "Winter Semester: May 15 – July 15 | Summer Semester: Nov 15 – Jan 15",
      notes: "Over 2,000 accredited degree programs are taught 100% in English across German public universities."
    },
    visaPathway: {
      visaSubclass: "German National Visa (Type D - Student Category)",
      processingTimeline: "4 to 8 weeks depending on embassy appointment waiting list",
      financialSolvency: "Official Sperrkonto (Blocked Account) with €11,208 deposited via Fintiba / Expatrio / Coracle",
      workingHoursDuringTerm: "140 full days or 280 half days per calendar year (expanded under modern German immigration reforms)",
      postStudyWorkPermit: "18-month Jobseeker Residence Permit (§ 20 AufenthG) specifically for graduates of German institutions",
      prPathway: "Fast-track Permanent Settlement Permit (Niederlassungserlaubnis) after just 21-24 months under an EU Blue Card",
      keySteps: [
        "Receive official university admission letter or conditional study applicant confirmation",
        "Open and transfer funds into a certified German Blocked Account (Sperrkonto)",
        "Procure statutory German student health insurance policy",
        "Book appointment via German diplomatic mission / TLScontact portal",
        "Submit physical dossier and undergo biometric capture",
        "Receive National Visa Type D foil and register address (Anmeldung) in Germany"
      ]
    }
  },
  {
    id: "ireland",
    country: "Ireland",
    flag: "🇮🇪",
    image: "https://images.unsplash.com/photo-1549918864-48ac978761a4?auto=format&fit=crop&w=900&q=80",
    region: "Europe & UK",
    tagline: "European Silicon Valley & 2-Year Stay Back Visa",
    description: "English-speaking EU tech hub hosting European HQs of Google, Apple, Meta & Pfizer, offering high graduate employment and 2-year stay back.",
    popularUniversities: ["Trinity College Dublin", "UCD", "University of Galway", "DCU", "Cork"],
    intakes: "Autumn (September) & Spring (January / February)",
    postStudyWork: "2 Years Third Level Graduate Scheme",
    avgTuition: "€12,000 – €22,000 / yr",
    livingExpenses: "€10,000 / yr (Irish Immigration Standard)",
    keyFeatures: ["English-Speaking EU Nation", "European Tech & Pharma Capital", "2-Year Post-Study Stay Back", "Critical Skills Employment Pathway"],
    featuredUniversitiesDetailed: [
      { name: "Trinity College Dublin", location: "Dublin, Ireland", topPrograms: ["Computer Science", "Immunology", "Business", "English Literature"] },
      { name: "University College Dublin (UCD)", location: "Dublin, Ireland", topPrograms: ["Data & Analytics", "Smurfit Business", "Veterinary Medicine", "Engineering"] },
      { name: "University of Galway", location: "Galway, Ireland", topPrograms: ["Biomedical Devices", "Marine Science", "Software Design", "Law"] },
      { name: "Dublin City University (DCU)", location: "Dublin, Ireland", topPrograms: ["Communications", "Electronic Eng.", "Fintech", "Biotechnology"] }
    ],
    admissionRequirements: {
      minIeltsUndergrad: "Overall 6.0 (no band below 6.0)",
      minIeltsPostgrad: "Overall 6.5 (minimum 6.0 in each sub-score; top programs 7.0)",
      minGpa: "Bachelor's: 60%+ in Higher Secondary; Master's: 60%+ / First or Upper Second Class honors (2:1)",
      alternateTests: ["PTE Academic (60+)", "TOEFL iBT (88+)", "Duolingo (110-120+)"],
      standardizedTests: "No GRE or GMAT required for technical or business degree admissions.",
      mandatoryDocuments: [
        "Certified Academic Transcripts & Degree Certificates",
        "Statement of Purpose (SOP) highlighting career ambition",
        "Two Academic or Employer Letters of Recommendation (LOR)",
        "Detailed Academic CV showcasing relevant modules & projects",
        "Valid IELTS / PTE English scorecard",
        "Financial Solvency Proof (€10,000 living expense proof + full 1st year tuition receipt)"
      ],
      applicationDeadlines: "Autumn Intake: Rolling applications until Apr 30 – May 31",
      notes: "Exceptional job placement record in Computer Science, Data Analytics, and Pharmaceutical Sciences."
    },
    visaPathway: {
      visaSubclass: "Irish Study Visa (Stamp 2 Student Permit)",
      processingTimeline: "4 to 6 weeks from AVATS portal submission",
      financialSolvency: "1st year full tuition fee receipt + €10,000 minimum living expenses documented in 6-month bank statements",
      workingHoursDuringTerm: "Up to 20 hours per week during term; 40 hours per week during peak holidays (June-Sept & mid-Dec to mid-Jan)",
      postStudyWorkPermit: "Third Level Graduate Scheme (Stamp 1G) providing 2 years open work permit for master's graduates (1 year for bachelor's)",
      prPathway: "Transition from Stamp 1G to Critical Skills Employment Permit (Stamp 1), leading to Stamp 4 permanent residency after 2 years",
      keySteps: [
        "Receive unconditional offer from an Irish Higher Education Institution and transfer tuition fee",
        "Procure private medical health insurance policy valid in Ireland",
        "Lodge online visa application via Irish AVATS portal",
        "Submit passport and financial dossier to VFS visa application centre",
        "Receive Stamp 2 visa endorsement in passport and register with Burgh Quay / GNIB upon arrival"
      ]
    }
  },
  {
    id: "new-zealand",
    country: "New Zealand",
    flag: "🇳🇿",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&q=80",
    region: "Asia-Pacific",
    tagline: "High Quality of Life & Up to 3-Year Post-Study Visa",
    description: "Safe, scenic environment with all 8 state universities ranked in the global top 3%, practical research degrees, and generous post-study work rights.",
    popularUniversities: ["University of Auckland", "University of Otago", "Victoria Univ. of Wellington", "Univ. of Canterbury", "Massey Univ."],
    intakes: "Semester 1 (February) & Semester 2 (July)",
    postStudyWork: "Up to 3 Years Post-Study Work Visa",
    avgTuition: "NZD 24,000 – 36,000 / yr",
    livingExpenses: "NZD 20,000 / yr (Immigration NZ Standard)",
    keyFeatures: ["All 8 Unis Globally Ranked", "Up to 3-Year Open Work Visa", "Spouse Open Work Visa on Master's", "Green List Fast-Track PR"],
    featuredUniversitiesDetailed: [
      { name: "University of Auckland", location: "Auckland, New Zealand", topPrograms: ["Civil Engineering", "Computer Science", "Business Management", "Biomedical Sciences"] },
      { name: "University of Otago", location: "Dunedin, New Zealand", topPrograms: ["Medicine", "Dentistry", "Pharmacy", "Environmental Science"] },
      { name: "Victoria University of Wellington", location: "Wellington, New Zealand", topPrograms: ["Law", "Public Administration", "Architecture", "Data Science"] },
      { name: "University of Canterbury", location: "Christchurch, New Zealand", topPrograms: ["Forestry", "Mechanical Eng.", "Software Eng.", "Geology"] }
    ],
    admissionRequirements: {
      minIeltsUndergrad: "Overall 6.0 (no band below 5.5 or 6.0)",
      minIeltsPostgrad: "Overall 6.5 (no sub-band below 6.0)",
      minGpa: "Undergraduate: 65%+ in HSC; Master's: 60%+ in Bachelor's degree (B or B+ average)",
      alternateTests: ["PTE Academic (58+)", "TOEFL iBT (80-90+)"],
      standardizedTests: "GRE/GMAT are not required for New Zealand universities.",
      mandatoryDocuments: [
        "Certified Academic Transcripts & Completion Certificates",
        "Statement of Purpose (SOP) tailored to New Zealand career pathways",
        "Two Academic Recommendation Letters",
        "Updated CV / Resume",
        "Valid Passport Copy",
        "Proof of English Proficiency Scorecard"
      ],
      applicationDeadlines: "Semester 1 (Feb): Oct 31 – Nov 30 | Semester 2 (July): Apr 30 – May 31",
      notes: "Postgraduate master's students can sponsor spouse open work visas and dependent school subsidies."
    },
    visaPathway: {
      visaSubclass: "Fee Paying Student Visa",
      processingTimeline: "4 to 6 weeks through Immigration New Zealand (INZ) online portal",
      financialSolvency: "Paid tuition fees + NZD 20,000 per year living expenses in verified bank accounts",
      workingHoursDuringTerm: "Up to 20 hours per week during term; full-time during vacations",
      postStudyWorkPermit: "Post-Study Work Visa (Subclass PSWV) — up to 3 years open work rights for degree graduates",
      prPathway: "Skilled Migrant Category (SMC) points system and Green List Straight to Residence pathways for high-demand occupations",
      keySteps: [
        "Secure unconditional Offer of Place and pay tuition fee deposit",
        "Complete medical chest X-ray and eMedical evaluation",
        "Lodge visa via Immigration New Zealand digital platform",
        "Submit biometrics and financial verification dossier",
        "Receive electronic Student Visa approval notice"
      ]
    }
  },
  {
    id: "france",
    country: "France",
    flag: "🇫🇷",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
    region: "Europe & UK",
    tagline: "Prestigious Grande Écoles & 2-Year Post-Study Visa",
    description: "Europe's cultural and aerospace hub offering affordable tuition at public universities, world-renowned business Grande Écoles, and a 2-year post-study APS visa.",
    popularUniversities: ["Sorbonne University", "HEC Paris", "INSEAD", "École Polytechnique", "Univ. of Paris-Saclay"],
    intakes: "Fall Intake (September / October) & Spring Intake (January / February)",
    postStudyWork: "Up to 2 Years APS / RECE Work Authorization",
    avgTuition: "€2,770 – €3,770 / yr (Public) | €10K – €18K (Business/Private)",
    livingExpenses: "€7,380 – €9,600 / yr (€615/mo official baseline)",
    keyFeatures: ["Subsidized Public Tuition", "Over 1,600 English-Taught Degrees", "CAF Accommodation Subsidies (up to 40%)", "2-Year Post-Study Job Seeker Visa"],
    featuredUniversitiesDetailed: [
      { name: "Sorbonne University", location: "Paris, France", topPrograms: ["Humanities", "Natural Sciences", "Mathematics", "AI & Robotics"] },
      { name: "HEC Paris / ESCP", location: "Paris, France", topPrograms: ["Master in Management", "Finance", "International Business", "Luxury Marketing"] },
      { name: "University of Paris-Saclay", location: "Saclay, France", topPrograms: ["Physics", "Computer Science", "Biotechnology", "Aerospace Eng."] }
    ],
    admissionRequirements: {
      minIeltsUndergrad: "Overall 6.0 (for English-taught programs)",
      minIeltsPostgrad: "Overall 6.5 (no sub-band below 6.0; top business schools may prefer 7.0)",
      minGpa: "Bachelor's: 65%+ in Higher Secondary; Master's: 60%+ or CGPA 2.8+ on 4.0 scale",
      alternateTests: ["TOEFL iBT (85+)", "PTE Academic (60+)", "Duolingo (110+)"],
      standardizedTests: "GMAT/GRE optional; required only for elite Grand École MBA programs.",
      mandatoryDocuments: [
        "Certified Transcripts & Degree Certificates with certified French translations if required",
        "Statement of Purpose (Lettre de motivation)",
        "Two Letters of Recommendation",
        "Europass CV",
        "Etudes en France (EEF) dossier registration certificate",
        "Proof of financial solvency (€615/month for 12 months minimum)"
      ],
      applicationDeadlines: "Campus France EEF Deadlines: Jan 15 – Mar 31 | Direct University: Rolling till June",
      notes: "International students are eligible for French CAF housing welfare subsidies covering 25% to 40% of monthly rent."
    },
    visaPathway: {
      visaSubclass: "Long-Stay Student Visa (VLS-TS)",
      processingTimeline: "3 to 5 weeks via Campus France & TLScontact / VFS",
      financialSolvency: "Documented minimum €615 per month for 12 months (€7,380) in certified bank accounts",
      workingHoursDuringTerm: "Up to 60% of annual working time (approx 20 hrs/week)",
      postStudyWorkPermit: "Autorisation Provisoire de Séjour (APS) / Carte de Séjour RECE — up to 2 years post-master's search permit",
      prPathway: "Transition to Talent Passport (Passeport Talent) or Salarié status, leading to 10-year residency or French citizenship after 5 years",
      keySteps: [
        "Complete Campus France Etudes en France (EEF) portal registration and interview",
        "Secure unconditional university acceptance certificate",
        "Submit visa file via France-Visas web portal and book biometric appointment",
        "Receive VLS-TS visa foil and validate online with OFII upon arrival in France"
      ]
    }
  },
  {
    id: "netherlands",
    country: "Netherlands",
    flag: "🇳🇱",
    image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=900&q=80",
    region: "Europe & UK",
    tagline: "Continental Europe's English Pioneer & 1-Year Zoekjaar Visa",
    description: "Over 95% of citizens speak English with 2,100+ degrees 100% in English, innovative problem-based learning, and a 1-year Zoekjaar post-study work orientation.",
    popularUniversities: ["University of Amsterdam", "TU Delft", "Erasmus Univ. Rotterdam", "Utrecht University", "Leiden University"],
    intakes: "September (Major) & February (Secondary)",
    postStudyWork: "1 Year Zoekjaar (Orientation Year) Visa",
    avgTuition: "€8,000 – €16,000 / yr (Non-EEA)",
    livingExpenses: "€12,500 – €15,000 / yr (IND Standard: ~€1,041/month)",
    keyFeatures: ["2,100+ English Degrees", "TU Delft & Amsterdam Top 60 World Rank", "1-Year Zoekjaar Orientation Year", "Hub for Shell, ASML, Philips & ING"],
    featuredUniversitiesDetailed: [
      { name: "University of Amsterdam", location: "Amsterdam, Netherlands", topPrograms: ["Economics & Finance", "AI & Data Science", "Communication Science", "Psychology"] },
      { name: "TU Delft", location: "Delft, Netherlands", topPrograms: ["Aerospace Eng.", "Civil Eng.", "Computer Science", "Architecture"] },
      { name: "Erasmus University Rotterdam", location: "Rotterdam, Netherlands", topPrograms: ["Rotterdam School of Management", "Econometrics", "Health Sciences"] }
    ],
    admissionRequirements: {
      minIeltsUndergrad: "Overall 6.5 (minimum 6.0 in each sub-test)",
      minIeltsPostgrad: "Overall 6.5 – 7.0 (minimum 6.5 in writing and speaking)",
      minGpa: "Bachelor's: 70%+ in Higher Secondary; Master's: 4-year Bachelor's with 70%+ or CGPA 3.0/4.0",
      alternateTests: ["TOEFL iBT (90-100+)", "Cambridge C1 Advanced"],
      standardizedTests: "GRE optional for selective STEM at TU Delft; GMAT optional for RSM.",
      mandatoryDocuments: [
        "Certified Transcripts and Graduation Degree Certificates",
        "Comprehensive Statement of Purpose (Motivation Letter)",
        "Two Academic Letters of Recommendation",
        "Detailed Academic Curriculum Vitae (CV)",
        "Nuffic Certificate (where required) and valid Passport Copy",
        "Proof of financial solvency meeting IND standards"
      ],
      applicationDeadlines: "Numerus Fixus: Jan 15 | Standard Non-EEA Deadlines: Apr 1 – May 1",
      notes: "Dutch immigration (IND) applications are lodged directly by the hosting university on behalf of the student."
    },
    visaPathway: {
      visaSubclass: "Entry Visa (MVV) & Residence Permit (VVR)",
      processingTimeline: "2 to 4 weeks (accelerated university-sponsored processing)",
      financialSolvency: "Verified living expenses (~€12,500/year) + tuition balance transferred to university escrow or certified bank account",
      workingHoursDuringTerm: "Up to 16 hours per week with work permit (TWV) or full-time during June, July, August",
      postStudyWorkPermit: "Zoekjaar (Orientation Year for Highly Educated Persons) — 1 year open work permit without employer restrictions",
      prPathway: "Transition from Zoekjaar to Highly Skilled Migrant (Kennismigrant) visa, qualifying for permanent residence or Dutch citizenship after 5 years",
      keySteps: [
        "Receive unconditional admission and transfer tuition + living guarantee to university",
        "University submits IND residence permit (VVR) application on your behalf",
        "Collect MVV entry clearance stamp at Embassy in Dhaka",
        "Arrive in Netherlands, register at Gemeente, and pick up biometric residence card"
      ]
    }
  },
  {
    id: "sweden",
    country: "Sweden",
    flag: "🇸🇪",
    image: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=900&q=80",
    region: "Europe & UK",
    tagline: "Global Innovation Leader & 1-Year Post-Study Job Seeker Visa",
    description: "Home of the Nobel Prize, Spotify, and Volvo. Sweden offers world-leading sustainability, AI, and engineering degrees with generous family and post-study benefits.",
    popularUniversities: ["KTH Royal Institute of Tech", "Lund University", "Chalmers Univ. of Tech", "Uppsala University", "Karolinska Institute"],
    intakes: "Autumn Semester (August/September) & Spring (January)",
    postStudyWork: "Up to 12 Months Post-Study Search Visa",
    avgTuition: "SEK 90,000 – 160,000 / yr (approx. €8,000 – €14,000)",
    livingExpenses: "SEK 10,314 / month (Swedish Migration Agency standard)",
    keyFeatures: ["Ranked #1 for Innovation in EU", "Family Friendly (Spouses get full work rights)", "1-Year Post-Study Search Permit", "Direct UniversityAdmissions.se Portal"],
    featuredUniversitiesDetailed: [
      { name: "KTH Royal Institute of Technology", location: "Stockholm, Sweden", topPrograms: ["Computer Science", "Wireless Systems", "Sustainable Energy", "Machine Learning"] },
      { name: "Lund University", location: "Lund, Sweden", topPrograms: ["Biomedical Engineering", "International Law", "Environmental Management", "Economics"] },
      { name: "Chalmers University of Technology", location: "Gothenburg, Sweden", topPrograms: ["Automotive Engineering", "Data Science", "Nanotechnology"] }
    ],
    admissionRequirements: {
      minIeltsUndergrad: "Overall 6.5 (no component below 5.5 - English 6 equivalent)",
      minIeltsPostgrad: "Overall 6.5 (minimum 5.5-6.0 in each band)",
      minGpa: "Bachelor's: 65%+ in relevant field; Master's: 4-year Bachelor's degree (180 ECTS equivalent) with 60-70%+",
      alternateTests: ["TOEFL iBT (90+ with 20 in writing)", "PTE Academic (62+)"],
      standardizedTests: "GRE and GMAT are not required for Swedish universities.",
      mandatoryDocuments: [
        "Certified Transcripts and Degree Certificate in original language + certified English translation",
        "Specific Motivational Letter / SOP",
        "Two Academic Recommendation Letters",
        "Detailed Academic CV",
        "Proof of English proficiency meeting English 6/B",
        "Valid Passport Copy"
      ],
      applicationDeadlines: "Autumn Round 1 (National): Jan 15 | Late / Round 2: Apr 15",
      notes: "Applications are submitted through the single unified national portal: UniversityAdmissions.se."
    },
    visaPathway: {
      visaSubclass: "Residence Permit for Higher Education Studies",
      processingTimeline: "2 to 3 months via Swedish Migration Agency (Migrationsverket) online",
      financialSolvency: "SEK 10,314 per month for 10-12 months (~SEK 123,768) deposited in student's own bank account",
      workingHoursDuringTerm: "No statutory hourly limit as long as academic course progression of 30 credits/semester is maintained",
      postStudyWorkPermit: "Up to 12 months residence permit to seek employment or explore business opportunities after graduation",
      prPathway: "Work permit status for 4 years within a 7-year period leads to permanent residence (PUT) in Sweden",
      keySteps: [
        "Submit unified application via UniversityAdmissions.se and pay 1st tuition installment",
        "Submit online residence permit application to Migrationsverket",
        "Book biometrics appointment at Swedish Embassy in Dhaka / New Delhi",
        "Receive residence permit decision and UT card before departing to Sweden"
      ]
    }
  },
  {
    id: "finland",
    country: "Finland",
    flag: "🇫🇮",
    image: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=900&q=80",
    region: "Europe & UK",
    tagline: "World's Happiest Country & 2-Year Post-Study Work Permit",
    description: "Renowned as the world's best education system, Finland grants an entire degree-duration residence permit up-front, 30 hrs/wk work rights, and a 2-year job seeker permit.",
    popularUniversities: ["University of Helsinki", "Aalto University", "Tampere University", "Univ. of Oulu", "Lappeenranta-Lahti Univ. (LUT)"],
    intakes: "Autumn Intake (August/September) & Spring (January)",
    postStudyWork: "Up to 2 Years Job Seeker Residence Permit",
    avgTuition: "€8,000 – €14,000 / yr (generous merit scholarships up to 50-100%)",
    livingExpenses: "€800 / month (€9,600 / yr official Migri standard)",
    keyFeatures: ["Single Visa for Entire Degree Duration", "Up to 30 hrs/wk Work Rights During Studies", "2-Year Post-Study Job Seeker Visa", "Family-Friendly with Spouse Full Work Rights"],
    featuredUniversitiesDetailed: [
      { name: "Aalto University", location: "Espoo/Helsinki, Finland", topPrograms: ["Design & Architecture", "Computer Science", "Renewable Tech", "Business Analytics"] },
      { name: "University of Helsinki", location: "Helsinki, Finland", topPrograms: ["Atmospheric Sciences", "Genetics", "Data Science", "Education"] },
      { name: "Tampere University", location: "Tampere, Finland", topPrograms: ["Software Engineering", "Robotics", "Photonics", "Biomedical Tech"] }
    ],
    admissionRequirements: {
      minIeltsUndergrad: "Overall 6.0 – 6.5 (minimum 5.5 or 6.0 in each sub-score)",
      minIeltsPostgrad: "Overall 6.5 (no individual score below 6.0)",
      minGpa: "Bachelor's: 65%+ in Higher Secondary; Master's: 60%+ in relevant field Bachelor's degree",
      alternateTests: ["TOEFL iBT (92+)", "PTE Academic (62+)", "C1 Advanced"],
      standardizedTests: "SAT scores accepted for many undergraduate English degrees; GRE optional for master's.",
      mandatoryDocuments: [
        "Certified Transcripts & Degree Certificates with official English translations",
        "Statement of Purpose (Motivation Letter)",
        "Curriculum Vitae (CV)",
        "Valid International Passport Copy",
        "Official IELTS / PTE Scorecard",
        "Financial solvency certificate covering €9,600/year"
      ],
      applicationDeadlines: "Joint Application (Opintopolku / Studyinfo): Early to late January",
      notes: "Finnish universities offer significant early-bird and merit-based tuition fee waivers ranging from 20% to 100%."
    },
    visaPathway: {
      visaSubclass: "Continuous Residence Permit (A-Permit) for Degree Studies",
      processingTimeline: "Fast-track digital processing (1 to 2 months via Enter Finland)",
      financialSolvency: "€9,600 per year held in student's personal liquid bank account",
      workingHoursDuringTerm: "Up to 30 hours per week during term time; unlimited during official vacation periods",
      postStudyWorkPermit: "Up to 2-year job seeker residence permit (can be split into multiple periods within 5 years of graduation)",
      prPathway: "Time spent on continuous study A-permit counts 100% toward the 4-year requirement for Finnish Permanent Residence (P-Permit)",
      keySteps: [
        "Apply via Opintopolku (Studyinfo.fi) and accept university offer",
        "Procure private comprehensive student health insurance (Swisscare / SIP)",
        "Lodge residence permit application digitally on EnterFinland.fi",
        "Verify identity and submit biometrics at VFS Global / Finnish Mission in Dhaka or New Delhi",
        "Receive biometric residence permit card before traveling"
      ]
    }
  },
  {
    id: "denmark",
    country: "Denmark",
    flag: "🇩🇰",
    image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=900&q=80",
    region: "Europe & UK",
    tagline: "Pinnacle of Quality of Life & 3-Year Post-Study Work Rights",
    description: "World leader in green energy, pharmaceutical design, and Scandinavian welfare. Denmark grants up to 3 years of post-study job seeker rights to international graduates.",
    popularUniversities: ["University of Copenhagen", "Technical Univ. of Denmark (DTU)", "Aarhus University", "Copenhagen Business School (CBS)", "Aalborg Univ."],
    intakes: "September (Major) & February (Limited)",
    postStudyWork: "Up to 3 Years Post-Study Establishment Card",
    avgTuition: "€8,000 – €16,000 / yr",
    livingExpenses: "DKK 6,500 – 8,000 / month (~€900 – €1,100 / month)",
    keyFeatures: ["Up to 3-Year Post-Study Establishment Card", "Highest Global Wage Standards", "Clean Tech & Pharma Global Pioneer", "DTU & Univ. Copenhagen Global Top 100"],
    featuredUniversitiesDetailed: [
      { name: "Technical University of Denmark (DTU)", location: "Lyngby/Copenhagen, Denmark", topPrograms: ["Wind Energy", "Biochemical Eng.", "Computer Science", "Environmental Tech"] },
      { name: "University of Copenhagen", location: "Copenhagen, Denmark", topPrograms: ["Pharmacology", "Public Health", "Molecular Biology", "Agriculture"] },
      { name: "Copenhagen Business School (CBS)", location: "Copenhagen, Denmark", topPrograms: ["International Business", "Supply Chain", "Finance", "Sustainable Management"] }
    ],
    admissionRequirements: {
      minIeltsUndergrad: "Overall 6.5 (no sub-band below 6.0 - English B equivalent)",
      minIeltsPostgrad: "Overall 6.5 (minimum 6.0 in each skill area)",
      minGpa: "Bachelor's: 65%+ in Higher Secondary; Master's: relevant Bachelor's degree with 65%+ or First Class",
      alternateTests: ["TOEFL iBT (88-90+)", "Cambridge C1 Advanced"],
      standardizedTests: "GRE optional for DTU technical master's; GMAT optional for CBS.",
      mandatoryDocuments: [
        "Certified Transcripts and Bachelor's Degree Certificate with verified grading scale",
        "Statement of Purpose (Motivation Letter)",
        "Two Academic Recommendation Letters",
        "Updated Curriculum Vitae (CV)",
        "Syllabus course descriptions verifying required prerequisite ECTS credits",
        "Proof of English proficiency"
      ],
      applicationDeadlines: "Non-EU Application Deadline: January 15 (Undergrad & Postgrad)",
      notes: "Course prerequisites are evaluated strictly against Danish ECTS credit modules."
    },
    visaPathway: {
      visaSubclass: "Danish Residence Permit for Higher Education (ST1)",
      processingTimeline: "2 to 3 months through Danish Agency for International Recruitment and Integration (SIRI)",
      financialSolvency: "Official tuition fee receipt + verified living funds meeting Danish Immigration (SIRI) criteria",
      workingHoursDuringTerm: "Up to 20 hours per week during study months; full-time during June, July, and August",
      postStudyWorkPermit: "Up to 3-year establishment card / job search permit for university master's graduates",
      prPathway: "Transition to Danish Pay Limit Scheme or Fast-Track Scheme leading to permanent residence after qualifying employment years",
      keySteps: [
        "University initiates Part 1 of Form ST1 online upon receiving tuition fee",
        "Student completes Part 2 of Form ST1 online via SIRI portal",
        "Pay SIRI case processing fee and book biometric capture at VFS Global",
        "Receive electronic Residence Permit letter before travel to Denmark"
      ]
    }
  },
  {
    id: "japan",
    country: "Japan",
    flag: "🇯🇵",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=900&q=80",
    region: "Asia-Pacific",
    tagline: "High-Tech Superpower & Highly Skilled Professional Fast-Track PR",
    description: "World leader in robotics, automotive innovation, and AI. Japan provides 100% English-taught degree programs, low public university fees, and accelerated 1-year PR.",
    popularUniversities: ["University of Tokyo", "Kyoto University", "Osaka University", "Tokyo Tech (Institute of Science Tokyo)", "Waseda University"],
    intakes: "Spring (April) & Autumn (September/October)",
    postStudyWork: "1 to 2 Years Designated Activities Job Hunter Visa",
    avgTuition: "JPY 535,800 – 820,000 / yr (approx. $3,600 – $5,500 / yr at public universities)",
    livingExpenses: "JPY 80,000 – 120,000 / month (approx. $550 – $850 / month)",
    keyFeatures: ["Extremely Affordable Public Tuition (~$4K/yr)", "MEXT Government Full Scholarships Available", "Up to 28 hrs/wk Student Work Rights", "Highly Skilled Professional 1-Year Fast Track PR"],
    featuredUniversitiesDetailed: [
      { name: "University of Tokyo", location: "Tokyo, Japan", topPrograms: ["PEAK Programs", "Aerospace Eng.", "Information Science", "Public Policy"] },
      { name: "Kyoto University", location: "Kyoto, Japan", topPrograms: ["Civil Engineering", "Informatics", "Chemical Sciences", "Economics"] },
      { name: "Tokyo Institute of Technology", location: "Tokyo, Japan", topPrograms: ["Robotics", "Computer Science", "Materials Science", "Mechanical Eng."] }
    ],
    admissionRequirements: {
      minIeltsUndergrad: "Overall 6.0 – 6.5 (for English-taught programs)",
      minIeltsPostgrad: "Overall 6.5 (no band below 6.0)",
      minGpa: "Bachelor's: 65%+ in Higher Secondary; Master's: 60%+ in Bachelor's degree (16 years of formal education)",
      alternateTests: ["TOEFL iBT (80-90+)", "Duolingo (110+) for select partner universities"],
      standardizedTests: "EJU examination not required for 100% English-medium degree programs; GRE optional.",
      mandatoryDocuments: [
        "Certified Academic Transcripts and Graduation Certificates",
        "Academic Research Proposal or Statement of Purpose (SOP)",
        "Two Academic Letters of Recommendation from university faculty",
        "Certificate of Eligibility (COE) application dossier",
        "Proof of financial solvency (approx. JPY 2,000,000 in bank sponsor account)",
        "Valid International Passport Copy"
      ],
      applicationDeadlines: "Spring Intake: Aug – Oct | Autumn Intake: Dec – Feb / Mar",
      notes: "Numerous prestigious national universities offer 50% to 100% tuition exemption for top international students."
    },
    visaPathway: {
      visaSubclass: "Student Visa (Ryugaku)",
      processingTimeline: "COE issuance: 2 to 3 months; Embassy visa stamping: 5 to 7 working days",
      financialSolvency: "Liquid bank statement of approx. JPY 2,000,000 (approx. $14,000) from self or family sponsor",
      workingHoursDuringTerm: "Up to 28 hours per week with Shikakugai Katsudo (Permission to Engage in Activity other than that Permitted under the Status of Residence Previously Granted)",
      postStudyWorkPermit: "Designated Activities Visa (Tokutei Katsudo) — up to 1 to 2 years for continuous post-graduation job hunting in Japan",
      prPathway: "Transition to Engineer/Specialist in Humanities/International Services visa, or Highly Skilled Professional (HSP) points system offering permanent residency after just 1 to 3 years",
      keySteps: [
        "Pass university entrance screening and receive Letter of Admission",
        "University submits application for Certificate of Eligibility (COE) to Japan Immigration Agency",
        "Receive original digital COE from Japan Immigration",
        "Lodge visa application with COE at the Embassy of Japan in Dhaka",
        "Receive visa sticker in passport and receive Residence Card (Zairyu Card) upon landing at Narita/Haneda"
      ]
    }
  }
];

export const VISA_SERVICES_LIST = [
  {
    title: "Student Visa (Subclass 500, F1, SDS)",
    desc: "Complete documentation audit, financial verification, and interview readiness.",
    icon: "GraduationCap"
  },
  {
    title: "Application Guidance",
    desc: "Direct liaison with university admission boards for conditional & unconditional offers.",
    icon: "FileText"
  },
  {
    title: "Document Preparation",
    desc: "Notarization, translation validation, academic transcripts, and portfolio structuring.",
    icon: "FolderCheck"
  },
  {
    title: "SOP Guidance & Architecture",
    desc: "Craft compelling Statements of Purpose that convince visa officers and admission committees.",
    icon: "PenTool"
  },
  {
    title: "Application Support",
    desc: "End-to-end portal submissions, fee payments, and tracking visa file reference status.",
    icon: "ShieldCheck"
  },
  {
    title: "Pre-departure Guidance",
    desc: "Accommodation booking, travel insurance, foreign exchange, and airport pickup arrangements.",
    icon: "Plane"
  }
];

export const VISA_TIMELINE: VisaTimelineStep[] = [
  {
    step: "01",
    title: "Consultation",
    description: "Profile evaluation, academic history audit, budget planning, and career alignment session.",
    duration: "Day 1-3"
  },
  {
    step: "02",
    title: "Course & Country Selection",
    description: "Shortlisting 3 to 5 targeted institutions with highest acceptance and visa approval odds.",
    duration: "Week 1"
  },
  {
    step: "03",
    title: "Document Preparation",
    description: "Curating financial sponsor affidavits, bank solvency certificates, SOPs, and recommendation letters.",
    duration: "Week 2-3"
  },
  {
    step: "04",
    title: "Application Submission",
    description: "Official lodgment through high-commission portals and acquisition of CAS / I-20 / LOA.",
    duration: "Week 3-4"
  },
  {
    step: "05",
    title: "Visa Decision",
    description: "Biometrics appointment, health checkups, mock embassy interview drills, and passport submission.",
    duration: "Processing Window"
  },
  {
    step: "06",
    title: "Pre-departure Support",
    description: "Forex card setup, international SIM, baggage guidelines, and university accommodation assistance.",
    duration: "Final Countdown"
  }
];

export const WHY_CHOOSE_ITEMS: FeatureItem[] = [
  {
    id: "expert-faculty",
    title: "Expert Faculty",
    description: "Learn directly from certified trainers with dedicated specialization in IELTS modules and English phonetics.",
    iconName: "Award"
  },
  {
    id: "proven-techniques",
    title: "Proven Techniques",
    description: "Structured question-type formulas, time-management drills, and essay frameworks aligned with international standards.",
    iconName: "Target"
  },
  {
    id: "personalized-guidance",
    title: "Personalized Guidance",
    description: "Small batch sizes with personalized 1-on-1 speaking assessments and detailed diagnostic feedback.",
    iconName: "UserCheck"
  },
  {
    id: "practical-learning",
    title: "Practical Learning",
    description: "Real-world conversational scenarios, audio lab simulations, and interactive group discussions that stick.",
    iconName: "Sparkles"
  },
  {
    id: "transparent-process",
    title: "Transparent Guidance",
    description: "Zero hidden charges, clear visa documentation checklists, and genuine advice tailored to your goals.",
    iconName: "Shield"
  },
  {
    id: "career-support",
    title: "Global Study Support",
    description: "From your initial diagnostic test to university admission and visa application, we guide every milestone.",
    iconName: "TrendingUp"
  }
];

export const TRUST_PILLARS: TrustPillarItem[] = [
  {
    id: "expert-faculty",
    title: "Expert Faculty",
    description: "Learn directly from experienced trainers with dedicated specialization in Cambridge test patterns.",
    iconName: "GraduationCap",
    badge: "Certified Mentors"
  },
  {
    id: "personalized-guidance",
    title: "Personalized Guidance",
    description: "Tailored diagnostic assessment, 1-on-1 speaking evaluations, and individual feedback on writing tasks.",
    iconName: "UserCheck",
    badge: "Individual Attention"
  },
  {
    id: "proven-techniques",
    title: "Proven IELTS Techniques",
    description: "Structured question-type formulas, time-management drills, and vocabulary frameworks that build confidence.",
    iconName: "Target",
    badge: "Strategic Approach"
  },
  {
    id: "practical-learning",
    title: "Practical Learning",
    description: "Interactive classroom speaking drills, listening lab exercises, and full-length simulated mock exams.",
    iconName: "BookOpen",
    badge: "Real Practice"
  },
  {
    id: "transparent-guidance",
    title: "Transparent Guidance",
    description: "Honest, ethical assessment of your eligibility and university options with zero hidden agendas.",
    iconName: "ShieldCheck",
    badge: "Ethical & Direct"
  },
  {
    id: "global-study-support",
    title: "Global Study Support",
    description: "Comprehensive guidance for university admissions, document curation, and visa application procedures.",
    iconName: "Globe",
    badge: "Worldwide Reach"
  }
];

export const STATISTICS: StatItem[] = [
  {
    id: "community",
    value: 7700,
    suffix: "+",
    label: "Facebook Community",
    description: "Active learners following our IELTS tips & study abroad updates"
  },
  {
    id: "modules",
    value: 4,
    suffix: "/4",
    label: "IELTS Core Modules",
    description: "Full coverage of Speaking, Writing, Reading & Listening"
  },
  {
    id: "destinations",
    value: 6,
    suffix: " Regions",
    label: "Top Study Destinations",
    description: "Canada, UK, Australia, USA, Europe & Ireland pathways"
  },
  {
    id: "attention",
    value: 100,
    suffix: "%",
    label: "Dedicated Mentorship",
    description: "Personalized 1-on-1 mock feedback and admission advisory"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Tanvir Ahmed",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    course: "IELTS Academic Premium",
    achievement: "Overall Band 8.0 (Speaking 8.5)",
    scoreBadge: "Band 8.0",
    university: "University of Toronto",
    country: "Canada",
    quote: "MY IELTS completely transformed my approach to Writing Task 2 and Speaking. The 1-on-1 feedback removed my hesitation, and the mock tests gave me identical exam confidence. Today, I hold my study visa for U of T!"
  },
  {
    id: "2",
    name: "Nusrat Jahan",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    course: "Spoken English & Visa Guidance",
    achievement: "Band 7.5 & UK Visa Granted",
    scoreBadge: "Band 7.5",
    university: "University of Manchester",
    country: "UK",
    quote: "I was extremely shy about speaking in public. The mentors at MY IELTS created such an energetic, supportive environment. Their visa team handled my CAS and financial documents without a single glitch!"
  },
  {
    id: "3",
    name: "Rafiqul Islam",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    course: "IELTS General Training",
    achievement: "Band 8.5 (Listening 9.0)",
    scoreBadge: "Band 8.5",
    university: "Express Entry Candidate",
    country: "Canada",
    quote: "I needed a CLB 9 for my Express Entry profile. Thanks to the precise time management strategies and listening distractor drills, I scored an overall Band 8.5 in my first attempt. Highly recommended!"
  },
  {
    id: "4",
    name: "Sadia Rahman",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    course: "Study Abroad & Visa Processing",
    achievement: "Full Scholarship & F-1 Visa",
    scoreBadge: "Band 7.5",
    university: "Purdue University",
    country: "USA",
    quote: "From SOP drafting to mock visa interviews, the team was with me day and night. The interview drill gave me the exact composure needed in front of the visa officer. MY IELTS is unmatched."
  },
  {
    id: "5",
    name: "Ahsan Habib",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    course: "Work Permit & IELTS General",
    achievement: "Overall Band 7.0 & Australia Subclass 482",
    scoreBadge: "Band 7.0",
    university: "Skilled Migration",
    country: "Australia",
    quote: "The personalized coaching schedule worked perfectly alongside my full-time job. Their clear guidance made documentation seamless and transparent. Truly a 5-star experience."
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "q1",
    question: "What IELTS courses do you offer?",
    answer: "We offer complete preparation programs for both IELTS Academic (for students pursuing higher education abroad) and IELTS General Training (for migration and work visas). Programs include full-length classroom batches, fast-track crash courses, weekend professional batches, and 1-on-1 private mentoring with unlimited mock tests.",
    category: "IELTS"
  },
  {
    id: "q2",
    question: "Do you offer Spoken English courses?",
    answer: "Yes! Our Spoken English & Fluency program is crafted for students, professionals, and job seekers who want to eliminate hesitation, master correct pronunciation, expand vocabulary, and speak English confidently in everyday situations and corporate meetings.",
    category: "Spoken English"
  },
  {
    id: "q3",
    question: "Can you help with study visa applications?",
    answer: "Absolutely. We provide end-to-end student visa processing services including university shortlisting, application lodgment, SOP and resume architecture, bank solvency and financial documentation assistance, biometric appointment booking, and mock embassy interview training.",
    category: "Visa"
  },
  {
    id: "q4",
    question: "Which countries do you support?",
    answer: "We specialize in top global education and migration destinations including Canada, the United Kingdom, Australia, the United States, and European Schengen countries (such as Germany, Ireland, Sweden, and the Netherlands).",
    category: "Study Abroad"
  },
  {
    id: "q5",
    question: "Do you provide work permit guidance?",
    answer: "Yes, we offer strategic guidance on international work permits, post-study work rights (such as Canada's PGWP, UK Graduate Route, and Australia 485 visa), employer sponsorship pathways, and skilled migration point evaluations.",
    category: "Work Permit"
  },
  {
    id: "q6",
    question: "How can I join the next IELTS batch?",
    answer: "Joining our next batch is quick and easy! Click any 'Join Our Next Batch' button on this page, or call our hotline at 01754 544 508. Our academic coordinator will schedule a quick diagnostic assessment and enroll you in the right timing schedule.",
    category: "Admission"
  },
  {
    id: "q7",
    question: "How can I book a consultation?",
    answer: "You can book a free one-on-one consultation anytime by clicking the 'Book Free Consultation' button in the navigation bar or calling 01754 544 508. Both in-person consultations at our offices and virtual video consultations are available.",
    category: "Consultation"
  }
];
