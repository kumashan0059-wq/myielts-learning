import React, { useState } from 'react';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { ConsultationModal } from './components/ConsultationModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ServiceItem, ModalType } from './types';
import { RouterProvider, useRouter, APP_ROUTES } from './router/RouterContext';
import { HomePage } from './pages/HomePage';
import { IeltsPage } from './pages/IeltsPage';
import { MockTestsPage } from './pages/MockTestsPage';
import { SpokenEnglishPage } from './pages/SpokenEnglishPage';
import { GlobalJourneyPage } from './pages/GlobalJourneyPage';
import { StudyAbroadPage } from './pages/StudyAbroadPage';
import { VisaServicesPage } from './pages/VisaServicesPage';
import { WorkPermitPage } from './pages/WorkPermitPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

const AppShell: React.FC = () => {
  const { currentPath } = useRouter();
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [consultationDefaultService, setConsultationDefaultService] = useState<string>('IELTS Preparation');

  const handleOpenConsultation = (serviceName?: string) => {
    if (serviceName) {
      setConsultationDefaultService(serviceName);
    }
    setModalType('consultation');
  };

  const handleOpenBatch = (serviceName?: string) => {
    if (serviceName) {
      setConsultationDefaultService(serviceName);
    }
    setModalType('batch');
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
  };

  const handleEnrollFromDetail = (serviceName: string) => {
    setSelectedService(null);
    handleOpenBatch(serviceName);
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  const renderPage = () => {
    switch (currentPath) {
      case APP_ROUTES.home:
        return (
          <HomePage
            onOpenConsultation={handleOpenConsultation}
            onOpenBatch={handleOpenBatch}
            onSelectService={handleSelectService}
          />
        );
      case APP_ROUTES.ielts:
        return (
          <IeltsPage
            onOpenConsultation={handleOpenConsultation}
            onOpenBatch={handleOpenBatch}
          />
        );
      case APP_ROUTES.mockTests:
        return <MockTestsPage onOpenConsultation={handleOpenConsultation} />;
      case APP_ROUTES.spokenEnglish:
        return (
          <SpokenEnglishPage
            onOpenConsultation={handleOpenConsultation}
            onOpenBatch={handleOpenBatch}
          />
        );
      case APP_ROUTES.globalJourney:
        return (
          <GlobalJourneyPage
            onOpenConsultation={handleOpenConsultation}
            onOpenBatch={handleOpenBatch}
          />
        );
      case APP_ROUTES.studyAbroad:
        return <StudyAbroadPage onOpenConsultation={handleOpenConsultation} />;
      case APP_ROUTES.visaServices:
        return <VisaServicesPage onOpenConsultation={handleOpenConsultation} />;
      case APP_ROUTES.workPermit:
        return <WorkPermitPage onOpenConsultation={handleOpenConsultation} />;
      case APP_ROUTES.about:
        return <AboutPage onOpenConsultation={handleOpenConsultation} />;
      case APP_ROUTES.contact:
        return <ContactPage />;
      default:
        return (
          <HomePage
            onOpenConsultation={handleOpenConsultation}
            onOpenBatch={handleOpenBatch}
            onSelectService={handleSelectService}
          />
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-neutral-900 font-sans selection:bg-[#E11D2A] selection:text-white">
      {/* Fixed Crimson Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Shared Navigation Header */}
      <Navbar
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenBatch={() => handleOpenBatch()}
      />

      {/* Route-Matched Page Content */}
      <main>{renderPage()}</main>

      {/* Shared Footer */}
      <Footer />

      {/* Persistent Floating Quick Actions */}
      <FloatingActions
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenBatch={() => handleOpenBatch()}
      />

      {/* Interactive Consultation / Batch Enrollment Modal */}
      <ConsultationModal
        type={modalType}
        isOpen={modalType === 'consultation' || modalType === 'batch'}
        onClose={handleCloseModal}
        defaultService={consultationDefaultService}
      />

      {/* Service Deep-Dive Details Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onEnroll={handleEnrollFromDetail}
      />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <AppShell />
    </RouterProvider>
  );
}
