import React from 'react';
import { Hero } from '../components/Hero';
import { ServicesSection } from '../components/ServicesSection';
import { StatsSection } from '../components/StatsSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { SuccessStories } from '../components/SuccessStories';
import { FaqSection } from '../components/FaqSection';
import { FinalCtaSection } from '../components/FinalCtaSection';
import { ServiceItem } from '../types';
import { usePageSeo } from '../router/RouterContext';

interface HomePageProps {
  onOpenConsultation: (serviceName?: string) => void;
  onOpenBatch: (serviceName?: string) => void;
  onSelectService: (service: ServiceItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenConsultation,
  onOpenBatch,
  onSelectService,
}) => {
  usePageSeo({
    title: 'MY IELTS - Prepare Smart. Go Global. | IELTS & Study Abroad Consultancy',
    description:
      'Premium IELTS preparation, Spoken English training, study abroad consultancy, student visa processing, and work permit guidance in Mirpur, Dhaka.',
  });

  return (
    <>
      <Hero
        onOpenConsultation={() => onOpenConsultation()}
        onOpenBatch={() => onOpenBatch()}
      />

      <ServicesSection
        onSelectService={onSelectService}
        onOpenConsultation={() => onOpenConsultation()}
      />

      <StatsSection />

      <WhyChooseUs />

      <SuccessStories />

      <FaqSection onOpenConsultation={() => onOpenConsultation()} />

      <FinalCtaSection
        onOpenConsultation={() => onOpenConsultation()}
        onOpenBatch={() => onOpenBatch()}
      />
    </>
  );
};
