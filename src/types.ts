export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  details: string;
  iconName: string;
  tag: string;
  highlights: string[];
}

export interface IeltsModule {
  name: string;
  description: string;
  duration: string;
  keySkills: string[];
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
  milestone: string;
}

export interface AdmissionRequirements {
  minIeltsUndergrad: string;
  minIeltsPostgrad: string;
  minGpa: string;
  alternateTests: string[];
  standardizedTests: string;
  mandatoryDocuments: string[];
  applicationDeadlines: string;
  notes?: string;
}

export interface VisaPathwayInfo {
  visaSubclass: string;
  processingTimeline: string;
  financialSolvency: string;
  workingHoursDuringTerm: string;
  postStudyWorkPermit: string;
  prPathway: string;
  keySteps: string[];
}

export interface UniversityDetail {
  name: string;
  location: string;
  topPrograms: string[];
}

export interface Destination {
  id: string;
  country: string;
  flag: string;
  image: string;
  region: 'North America' | 'Europe & UK' | 'Asia-Pacific' | string;
  tagline: string;
  description: string;
  popularUniversities: string[];
  intakes: string;
  postStudyWork: string;
  avgTuition?: string;
  livingExpenses?: string;
  keyFeatures?: string[];
  featuredUniversitiesDetailed?: UniversityDetail[];
  admissionRequirements?: AdmissionRequirements;
  visaPathway?: VisaPathwayInfo;
}

export interface VisaTimelineStep {
  step: string;
  title: string;
  description: string;
  duration: string;
}

export interface Testimonial {
  id: string;
  name: string;
  photo: string;
  course: string;
  achievement: string;
  scoreBadge?: string;
  university?: string;
  country?: string;
  quote: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface TrustPillarItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
}

export type ModalType = 'consultation' | 'batch' | 'service-detail' | 'destination-detail' | null;
