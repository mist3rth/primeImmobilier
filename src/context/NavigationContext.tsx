import React, { createContext, useContext, useState } from 'react';

export type LegalModalType = 'mentions' | 'privacy' | 'cgv';

interface NavigationContextType {
  activeProjectId: string | null;
  activePillarId: '01' | '02' | '03' | null;
  activeInquiryProjectId: string | null;
  legalModalOpen: boolean;
  legalModalType: LegalModalType | null;
  targetSectionId: string | null;
  openProject: (projectId: string) => void;
  openPillar: (pillarId: '01' | '02' | '03') => void;
  openInquiry: (projectId: string) => void;
  closeProjectOrPillar: (targetSection?: string) => void;
  openLegal: (type: LegalModalType) => void;
  closeLegal: () => void;
  navigateToSection: (sectionId: string) => void;
  clearTargetSection: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activePillarId, setActivePillarId] = useState<'01' | '02' | '03' | null>(null);
  const [activeInquiryProjectId, setActiveInquiryProjectId] = useState<string | null>(null);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<LegalModalType | null>(null);
  const [targetSectionId, setTargetSectionId] = useState<string | null>(null);

  const openProject = (projectId: string) => {
    setActivePillarId(null);
    setActiveInquiryProjectId(null);
    setActiveProjectId(projectId);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const openPillar = (pillarId: '01' | '02' | '03') => {
    setActiveProjectId(null);
    setActiveInquiryProjectId(null);
    setActivePillarId(pillarId);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const openInquiry = (projectId: string) => {
    setActiveProjectId(null);
    setActivePillarId(null);
    setActiveInquiryProjectId(projectId);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const closeProjectOrPillar = (targetSection: string = 'top') => {
    setActiveProjectId(null);
    setActivePillarId(null);
    setActiveInquiryProjectId(null);
    setTargetSectionId(targetSection);
  };

  const openLegal = (type: LegalModalType) => {
    setLegalModalType(type);
    setLegalModalOpen(true);
  };

  const closeLegal = () => {
    setLegalModalOpen(false);
  };

  const navigateToSection = (sectionId: string) => {
    setActiveProjectId(null);
    setActivePillarId(null);
    setActiveInquiryProjectId(null);
    setTargetSectionId(sectionId);
  };

  const clearTargetSection = () => {
    setTargetSectionId(null);
  };

  return (
    <NavigationContext.Provider
      value={{
        activeProjectId,
        activePillarId,
        activeInquiryProjectId,
        legalModalOpen,
        legalModalType,
        targetSectionId,
        openProject,
        openPillar,
        openInquiry,
        closeProjectOrPillar,
        openLegal,
        closeLegal,
        navigateToSection,
        clearTargetSection
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
