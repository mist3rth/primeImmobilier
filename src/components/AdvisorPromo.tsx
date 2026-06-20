import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export default function AdvisorPromo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { navigateToSection } = useNavigation();

  // Scroll tracking on this section container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Pronounced parallax translation (-18% to 18%) for deep depth effect
  const y = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);

  return (
    <section
      ref={containerRef}
      className="relative h-[65vh] sm:h-[80vh] md:h-[90vh] min-h-[550px] bg-stone-950 flex flex-col justify-between overflow-hidden text-white py-16 px-6 sm:px-12 md:px-20"
    >
      {/* Background container with overflow hidden to isolate parallax movement */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80')",
            y
          }}
        />
        {/* Deep luxury ambient dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/70 to-stone-950/80" />
      </div>

      {/* Title in top-left (reveals on scroll) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-xl self-start"
      >
        <span className="font-mono text-[9px] sm:text-xs text-accent tracking-widest uppercase block mb-3 font-semibold">
          CONSEIL ET ARBITRAGE D'EXCEPTION
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl leading-[1.1] tracking-tight font-medium text-white">
          Accompagnement Stratégique <br />
          pour les Investisseurs de Prestige.
        </h2>
      </motion.div>

      {/* Centered text in middle (reveals on scroll) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-2xl mx-auto text-center my-auto px-4"
      >
        <p className="font-serif text-base sm:text-lg md:text-2xl text-stone-200 leading-relaxed font-light drop-shadow-md">
          « Avec Prime Immobilier, posez le premier jalon de votre prévoyance et de la structuration de votre patrimoine grâce à des investissements immobiliers durables & d'exception. »
        </p>
      </motion.div>

      {/* Card in bottom-right (reveals on scroll) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 self-end max-w-sm w-full bg-white/95 backdrop-blur-md text-stone-900 p-5 sm:p-6 shadow-2xl border border-white/20 rounded-2xl flex flex-col justify-between gap-4 mt-6 sm:mt-0"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 shrink-0 overflow-hidden bg-stone-800 border border-accent/20 rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
              alt="Antoine de Saint-Florent"
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-sm sm:text-base font-bold text-stone-950">Antoine de Saint-Florent</span>
              <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
            </div>
            <span className="block text-[9px] font-mono text-accent tracking-widest uppercase font-bold">Fondateur PrimeImmobilier</span>
          </div>
        </div>

        <div className="h-[1px] bg-stone-200 w-full" />

        <div className="flex items-center justify-between gap-4">
          <p className="text-[11px] sm:text-xs text-stone-600 leading-snug font-sans">
            Prêt à franchir la prochaine étape vers votre propre patrimoine d'exception ?
          </p>
          <button
            onClick={() => navigateToSection('contact-cta')}
            className="shrink-0 bg-stone-950 hover:bg-accent hover:text-stone-950 text-white px-4 py-2.5 text-[9px] font-bold font-mono tracking-widest uppercase rounded-lg transition-colors duration-300 flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>CONTACT</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
