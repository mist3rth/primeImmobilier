import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sliders, ArrowLeftRight } from 'lucide-react';

export default function BeforeAfterSlider() {
  const [sliderPct, setSliderPct] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPct(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  // Bind mouse/touch events internationally to allow seamless drag outside bounds
  useEffect(() => {
    const handleUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging]);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const setToPct = (val: number) => {
    setSliderPct(val);
  };

  return (
    <section id="renovation-slider" className="py-24 lg:py-36 bg-white relative">
      <div className="w-full px-[20px]">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4 font-semibold">
            TRANSFORMATION & VALORISATION · RÉNOVATION
          </span>
          <h2 className="font-serif text-[28px] sm:text-[39px] lg:text-[49px] leading-[1.1] tracking-[-0.02em] text-dark font-medium">
            Découvrez la <span className="italic text-accent">différence</span>.
          </h2>
          <p className="text-muted-gray text-sm sm:text-base mt-4 font-light max-w-xl font-sans">
            À travers une rénovation énergétique d'excellence et un design d'intérieur haut de gamme, nous transformons des bâtiments anciens en espaces de vie modernes, éco-efficients et à forte valorisation patrimoniale.
          </p>
        </div>

        {/* Dynamic Comparison Slider Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left info box columns */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-surface border border-border-beige p-8 rounded-2xl">
              <span className="font-mono text-[9px] text-accent tracking-widest uppercase block mb-2 font-bold">CASE STUDY</span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-dark mb-4">Projet : « Lindenallee »</h3>
              <p className="text-xs sm:text-sm text-muted-gray leading-relaxed font-sans font-light mb-6">
                Un exemple remarquable de notre expertise de valorisation. Cet appartement ancien des années 1970, resté vacant et à rénover entièrement, a fait l'objet d'une reconstruction thermique complète pour devenir un loft de grand standing.
              </p>

              <div className="space-y-4 font-sans">
                <div className="border-b border-border-beige pb-3 flex justify-between text-xs">
                  <span className="text-muted-gray font-mono">CLASSE ÉNERGÉTIQUE AVANT :</span>
                  <span className="text-red-600 font-bold font-mono">Classe G (Énergie Obsolète)</span>
                </div>
                <div className="border-b border-border-beige pb-3 flex justify-between text-xs">
                  <span className="text-muted-gray font-mono">CLASSE ÉNERGÉTIQUE APRÈS :</span>
                  <span className="text-emerald-600 font-bold font-mono">Classe A+ (Géothermie d'Art)</span>
                </div>
                <div className="pb-3 flex justify-between text-xs">
                  <span className="text-muted-gray font-mono">VALORISATION REQUISSE ACTE :</span>
                  <span className="text-accent font-bold font-mono">+68 % Réalisé</span>
                </div>
              </div>
            </div>

            {/* Manual Preset jump click lines */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setToPct(10)}
                className="bg-surface hover:bg-neutral-200 border border-border-beige px-3 py-2 text-[10px] font-mono tracking-widest uppercase transition-colors text-dark cursor-pointer rounded-lg"
              >
                10% (Avant travaux)
              </button>
              <button
                onClick={() => setToPct(50)}
                className="bg-surface hover:bg-neutral-200 border border-border-beige px-3 py-2 text-[10px] font-mono tracking-widest uppercase transition-colors text-dark cursor-pointer rounded-lg"
              >
                Milieu (50/50)
              </button>
              <button
                onClick={() => setToPct(90)}
                className="bg-surface hover:bg-neutral-200 border border-border-beige px-3 py-2 text-[10px] font-mono tracking-widest uppercase transition-colors text-dark cursor-pointer rounded-lg"
              >
                90% (Après travaux)
              </button>
            </div>
          </div>

          {/* Right Column: Interactive slider container wrapper */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onMouseDown={onMouseDown}
              onTouchStart={onTouchStart}
              className="relative w-full aspect-[16/10] overflow-hidden select-none cursor-ew-resize border border-border-beige shadow-2xl bg-stone-300 rounded-2xl"
            >
              {/* VORHER image: full viewport base block */}
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
                  alt="Appartement ancien vétuste avant les travaux de rénovation et d'aménagements de luxe"
                  className="w-full h-full object-cover grayscale brightness-90 pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Float Badge Vorher */}
                <div className="absolute left-6 top-6 bg-dark/95 text-white font-mono text-[9px] tracking-widest px-3 py-1.5 uppercase font-bold select-none border-l-2 border-red-500 rounded-r-lg">
                  ÉTAT D'ORIGINE (AVANT)
                </div>
              </div>

              {/* NACHHER image: overlay clipPath block */}
              <div
                className="absolute inset-0 z-10 pointer-events-none transition-all duration-75"
                style={{ clipPath: `inset(0 ${100 - sliderPct}% 0 0)` }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
                  alt="Même appartement complètement rénové au standard loft d'architecte contemporain de prestige"
                  className="w-full h-full object-cover pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Float Badge Nachher */}
                <div className="absolute right-6 top-6 bg-dark/95 text-white font-mono text-[9px] tracking-widest px-3 py-1.5 uppercase font-bold select-none border-r-2 border-emerald-500 rounded-l-lg">
                  RÉNOVATION DE LUXE (APRÈS)
                </div>
              </div>

              {/* Slide Handler Split center lines */}
              <div
                className="absolute top-0 bottom-0 z-20 w-[2px] bg-accent pointer-events-none"
                style={{ left: `${sliderPct}%` }}
              >
                {/* Central circular drag button handle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark text-accent border border-accent/40 shadow-xl flex items-center justify-center cursor-ew-resize hover:scale-110 active:scale-95 transition-all duration-200">
                  <ArrowLeftRight className="w-4 h-4 animate-pulse" />
                </div>
              </div>

              {/* Slider helpers tag bottom */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-dark/80 backdrop-blur-sm shadow px-4 py-1.5 text-[10px] font-mono text-white tracking-widest uppercase pointer-events-none z-30 flex items-center space-x-2 rounded-full">
                <Sliders className="w-3 h-3 text-accent" />
                <span>Faites glisser la barre horizontalement</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
