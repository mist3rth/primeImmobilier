import { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IntroText from './components/IntroText';
import USPBento from './components/USPBento';
import StatsCounter from './components/StatsCounter';
import ActiveProjects from './components/ActiveProjects';
import CompletedProjectsMarquee from './components/CompletedProjectsMarquee';
import About from './components/About';
import Targets from './components/Targets';
import AdvisorPromo from './components/AdvisorPromo';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import FinalCTA from './components/FinalCTA';
import FAQAccordion from './components/FAQAccordion';
import Footer from './components/Footer';
import { NavigationProvider, useNavigation } from './context/NavigationContext';

// Lazy loading components
const ProjectDetailPage = lazy(() => import('./components/ProjectDetailPage'));
const PillarDetailPage = lazy(() => import('./components/PillarDetailPage'));
const ProjectInquiryPage = lazy(() => import('./components/ProjectInquiryPage'));
const LegalModal = lazy(() => import('./components/LegalModal'));

const PremiumLoader = () => (
  <div className="min-h-screen bg-stone-950 flex flex-col justify-center items-center text-white">
    <div className="w-12 h-12 border-2 border-accent/20 border-t-accent rounded-full animate-spin mb-4" />
    <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-stone-400">Chargement d'adresse...</span>
  </div>
);

function AppContent() {
  const [footerHeight, setFooterHeight] = useState(0);
  const {
    activeProjectId,
    activePillarId,
    activeInquiryProjectId,
    legalModalOpen,
    legalModalType,
    targetSectionId,
    closeProjectOrPillar,
    closeLegal,
    clearTargetSection
  } = useNavigation();

  // ResizeObserver for reliable footer height tracking without polling
  useEffect(() => {
    const footer = document.getElementById('footer');
    if (!footer) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.borderBoxSize?.[0]?.blockSize || entry.contentRect.height;
        setFooterHeight(height);
      }
    });

    observer.observe(footer);
    return () => observer.disconnect();
  }, [activeProjectId, activePillarId, activeInquiryProjectId]);

  // Reactive and reliable scroll handler synced with lifecycle
  useEffect(() => {
    if (targetSectionId) {
      if (targetSectionId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(targetSectionId);
        if (element) {
          const offset = 85; // Navbar height offset
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }
      clearTargetSection();
    }
  }, [targetSectionId, clearTargetSection]);

  return (
    <div id="as-projekte-root" className="min-h-screen bg-white text-dark font-sans selection:bg-accent selection:text-white antialiased transition-colors duration-300">
      
      {/* 1. Global Header Navigation */}
      <Navbar />

      <div className="relative z-10 bg-white" style={{ marginBottom: `${footerHeight}px` }}>
        <Suspense fallback={<PremiumLoader />}>
          {activeProjectId ? (
            <ProjectDetailPage 
              projectId={activeProjectId} 
              onBack={() => closeProjectOrPillar('active-projects')} 
            />
          ) : activeInquiryProjectId ? (
            <ProjectInquiryPage
              projectId={activeInquiryProjectId}
            />
          ) : activePillarId ? (
            <PillarDetailPage
              pillarId={activePillarId}
              onBack={() => closeProjectOrPillar('usp-bento')}
            />
          ) : (
            /* Main Single Page structural container */
            <main id="as-projekte-main">
              {/* 2. [S1] HERO Section with video showcase trigger */}
              <Hero />

              {/* 3. [S2] INTRO TEXT Section with staggered photo offsets */}
              <IntroText />

              {/* 4. [S3] USP BENTO Section with sticky project visual shifts */}
              <USPBento />

              {/* 5. [S4] STATS COUNTER Section featuring count-up animations */}
              <StatsCounter />

              {/* 6. [S5] ACTIVE PROJECTS portfolio with document enquiry portals */}
              <ActiveProjects />

              {/* 7. [S6] COMPLETED PROJECTS horizontal continuous marquee */}
              <CompletedProjectsMarquee />

              {/* 8. [S7] ABOUT brand vision with fanned-out stacked photos */}
              <About />

              {/* 9. [S8] TARGETS sections alternated with checkmarks sets */}
              <Targets />

              {/* [S8.5] ADVISOR PROMO with strategic consulting card and parallax background */}
              <AdvisorPromo />

              {/* 10. [S9] BEFORE/AFTER comparative drag-supported slider */}
              <BeforeAfterSlider />

              {/* 11. [S10] FINAL CTA Section containing form gateway and CEO message */}
              <FinalCTA />

              {/* 12. [S11] FAQ accordion matching click toggle transformations */}
              <FAQAccordion />
            </main>
          )}
        </Suspense>
      </div>

      {/* 13. [S12] FOOTER with back-to-top and compliance indices */}
      <Footer />

      {/* Global interactive legal modal */}
      <Suspense fallback={null}>
        <LegalModal
          isOpen={legalModalOpen}
          onClose={closeLegal}
          type={legalModalType}
        />
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}
