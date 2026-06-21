import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { ArrowUp, CornerDownRight, Globe, Lock, FileSignature, ExternalLink } from "lucide-react";
import { SETTINGS } from "../constants/settings";
import { useNavigation } from "../context/NavigationContext";

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES FOR THE CINEMATIC REVEAL
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  -webkit-font-smoothing: antialiased;
  --pill-bg-1: rgba(255, 255, 255, 0.03);
  --pill-bg-2: rgba(255, 255, 255, 0.01);
  --pill-shadow: rgba(0, 0, 0, 0.5);
  --pill-highlight: rgba(255, 255, 255, 0.08);
  --pill-inset-shadow: rgba(0, 0, 0, 0.8);
  --pill-border: rgba(255, 255, 255, 0.08);
  
  --pill-bg-1-hover: rgba(255, 255, 255, 0.08);
  --pill-bg-2-hover: rgba(255, 255, 255, 0.02);
  --pill-border-hover: rgba(255, 255, 255, 0.2);
  --pill-shadow-hover: rgba(0, 0, 0, 0.7);
  --pill-highlight-hover: rgba(255, 255, 255, 0.2);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.75; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(200, 169, 110, 0.3)); }
  15%, 45% { transform: scale(1.15); filter: drop-shadow(0 0 10px rgba(200, 169, 110, 0.6)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Luxury Grid Background */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, rgba(200, 169, 110, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(200, 169, 110, 0.04) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
}

/* Ambient Radial Aurora Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(200, 169, 110, 0.12) 0%, 
    rgba(28, 25, 23, 0.15) 50%, 
    transparent 80%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-size: 22vw;
  line-height: 0.85;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(200, 169, 110, 0.18);
  background: linear-gradient(180deg, rgba(200, 169, 110, 0.15) 0%, transparent 80%);
  -webkit-background-clip: text;
  background-clip: text;
}

@media (min-width: 768px) {
  .footer-giant-bg-text {
    font-size: 26vw;
    line-height: 0.75;
  }
}

/* Premium Gold/Bronze Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, #FFFFFF 0%, #C8A96E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px rgba(200, 169, 110, 0.15));
}

@media (min-width: 768px) {
  .md-clip-reveal {
    clip-path: polygon(0% 0, 100% 0%, 100% 100%, 0 100%);
  }
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE (Framer Motion)
// -------------------------------------------------------------------------
interface MagneticButtonProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  href?: string;
  onClick?: (e: React.MouseEvent<any>) => void;
  className?: string;
  children?: React.ReactNode;
}

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, ref) => {
    const localRef = useRef<HTMLElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 15, mass: 0.8 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
      const element = localRef.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const posX = e.clientX - rect.left - rect.width / 2;
      const posY = e.clientY - rect.top - rect.height / 2;
      x.set(posX * 0.35);
      y.set(posY * 0.35);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    const combinedRef = (node: HTMLElement | null) => {
      (localRef as any).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as any).current = node;
    };

    return (
      <motion.div
        ref={combinedRef}
        className={className}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Component {...props} className="w-full h-full flex items-center justify-center cursor-pointer focus:outline-none">
          {children}
        </Component>
      </motion.div>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN CINEMATIC FOOTER
// -------------------------------------------------------------------------


export default function Footer() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // useScroll on the footer's layout wrapper
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end end"]
  });

  // GSAP ScrollTrigger emulation in Framer Motion
  const giantY = useTransform(scrollYProgress, [0, 1], ["10vh", "0vh"]);
  const giantScale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const giantOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const contentY = useTransform(scrollYProgress, [0.1, 1], [50, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.1, 1], [0, 1]);

  const { navigateToSection, openLegal } = useNavigation();

  const scrollToTop = () => {
    navigateToSection('top');
  };

  const handleNavigate = (id: string) => {
    navigateToSection(id);
  };

  const openLegalModal = (type: 'mentions' | 'privacy' | 'cgv') => {
    openLegal(type);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* 
        The "Curtain Reveal" Wrapper:
        It sits in standard flow. Because it has clip-path on desktop, its contents
        are ONLY visible within its bounding box. On mobile it renders statically.
      */}
      <div
        ref={wrapperRef}
        id="footer"
        className="relative h-auto md:h-[100vh] w-full select-none md-clip-reveal"
      >
        {/* The actual footer stays fixed underneath on desktop, flows naturally on mobile */}
        <footer 
          className="relative md:fixed md:bottom-0 md:left-0 flex min-h-screen md:h-[100vh] w-full flex-col justify-between overflow-hidden bg-stone-950 text-white bg-cover bg-center cinematic-footer-wrapper border-t border-accent/20 z-0 py-12 md:py-0"
          style={{ backgroundImage: "url('/footer.webp')" }}
        >
          {/* Ambient Light & Grid Background */}
          <div className="absolute inset-0 bg-dark/50 backdrop-blur-[0.5px] z-0 pointer-events-none" />
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text */}
          <motion.div
            style={{ y: giantY, scale: giantScale, opacity: giantOpacity }}
            className="footer-giant-bg-text absolute bottom-[-1.5vh] md:-bottom-[5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none font-bold"
          >
            PRIME
          </motion.div>



          {/* 2. Main Content Grid (Reveal driven by scrollYProgress) */}
          <motion.div 
            style={{ y: contentY, opacity: contentOpacity }}
            className="relative z-10 flex-1 flex flex-col justify-center w-full px-[20px] max-w-7xl mx-auto pt-14 md:pt-24 pb-4 md:pb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 lg:gap-16 items-start">
              
              {/* Brand and Tagline column */}
              <div className="md:col-span-5 space-y-6">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center space-x-1 cursor-pointer hover:text-accent transition-colors duration-300 focus:outline-none"
                >
                  <span>Prime</span><span className="text-accent">Immobilier</span>
                </button>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-sans font-medium max-w-sm drop-shadow-md">
                  Votre signature d'exception pour des réalisations résidentielles de haut standing, des investissements d'art sous protection historique et des actifs d'avenir pérennes investis au cœur des grands pôles nationaux français.
                </p>
                <div className="flex items-center space-x-3 text-accent text-xs">
                  <CornerDownRight className="w-3.5 h-3.5" />
                  <a
                    href="https://mist3rth.github.io/presentMe/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/designer font-mono tracking-widest uppercase font-bold text-[10px] flex items-center gap-1.5 hover:text-white transition-colors duration-300"
                  >
                    <span>Make by {SETTINGS.designer} - {SETTINGS.year}</span>
                    <ExternalLink className="w-3 h-3 transform group-hover/designer:translate-x-0.5 group-hover/designer:-translate-y-0.5 transition-transform duration-300" />
                  </a>
                </div>
              </div>

              {/* Navigation links column */}
              <div className="md:col-span-3 space-y-4">
                <h5 className="font-mono text-[10px] tracking-widest uppercase text-white font-bold">NAVIGATION</h5>
                <div className="flex flex-col space-y-2.5 text-xs text-stone-200 font-sans font-medium">
                  <button
                    onClick={() => handleNavigate('about')}
                    className="text-left hover:text-accent transition-colors duration-200 cursor-pointer drop-shadow-sm font-semibold focus:outline-none"
                  >
                    À Propos
                  </button>
                  <button
                    onClick={() => handleNavigate('active-projects')}
                    className="text-left hover:text-accent transition-colors duration-200 cursor-pointer drop-shadow-sm font-semibold focus:outline-none"
                  >
                    Projets
                  </button>
                  <button
                    onClick={() => handleNavigate('renovation-slider')}
                    className="text-left hover:text-accent transition-colors duration-200 cursor-pointer drop-shadow-sm font-semibold focus:outline-none"
                  >
                    Rénovations
                  </button>
                  <button
                    onClick={() => handleNavigate('faq')}
                    className="text-left hover:text-accent transition-colors duration-200 cursor-pointer drop-shadow-sm font-semibold focus:outline-none"
                  >
                    FAQ
                  </button>
                </div>
              </div>

              {/* Legal aspects column */}
              <div className="md:col-span-4 space-y-4">
                <h5 className="font-mono text-[10px] tracking-widest uppercase text-white font-bold">ASPECTS LÉGAUX</h5>
                <div className="flex flex-col space-y-2.5 text-xs text-stone-200 font-sans font-semibold">
                  <button 
                    onClick={() => openLegalModal('mentions')} 
                    className="text-left hover:text-accent transition-colors duration-200 flex items-center space-x-2 cursor-pointer drop-shadow-sm focus:outline-none"
                  >
                    <Globe className="w-3.5 h-3.5 text-accent" />
                    <span>Mentions Légales (PrimeImmobilier S.A.S.)</span>
                  </button>
                  <button 
                    onClick={() => openLegalModal('privacy')} 
                    className="text-left hover:text-accent transition-colors duration-200 flex items-center space-x-2 cursor-pointer drop-shadow-sm focus:outline-none"
                  >
                    <Lock className="w-3.5 h-3.5 text-accent" />
                    <span>Politique de Confidentialité (conforme RGPD)</span>
                  </button>
                  <button 
                    onClick={() => openLegalModal('cgv')} 
                    className="text-left hover:text-accent transition-colors duration-200 flex items-center space-x-2 cursor-pointer drop-shadow-sm focus:outline-none"
                  >
                    <FileSignature className="w-3.5 h-3.5 text-accent" />
                    <span>Conditions Générales (CGV)</span>
                  </button>
                </div>
              </div>

            </div>
          </motion.div>

          {/* 3. Bottom Bar / Credits (Sticky visual layout) */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Copyright */}
            <div className="text-stone-300 text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1 font-mono">
              &copy; {new Date().getFullYear()} primeimmobilier.fr · Tous droits réservés.
            </div>



            {/* Back to top with Magnetic animation */}
            <MagneticButton
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-stone-400 hover:text-accent group order-3"
            >
              <ArrowUp className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" />
            </MagneticButton>

          </div>

        </footer>
      </div>
    </>
  );
}
