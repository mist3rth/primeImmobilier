import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { AUDIENCES } from '../constants/data';

interface TargetRowProps {
  aud: typeof AUDIENCES[number];
  index: number;
  scrollToContact: () => void;
  key?: React.Key;
}

function TargetRow({ aud, index, scrollToContact }: TargetRowProps) {
  const isEven = index % 2 === 0;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Direct, instant, lightweight compositor-friendly translation without spring delay
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center py-4"
    >
      {/* Media Placement (Alternating order) */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
        className={`lg:col-span-6 relative aspect-square overflow-hidden bg-stone-200 border border-border-beige rounded-2xl ${
          isEven ? 'lg:order-1' : 'lg:order-2'
        }`}
      >
        {/* Thin internal frame shadow border */}
        <div className="absolute inset-4 border border-white/20 pointer-events-none z-10 rounded-xl" />

        <div className="absolute inset-0 w-full h-[116%] top-[-8%] overflow-hidden">
          <motion.img
            src={aud.image}
            alt={aud.title}
            style={{ y }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-[filter] duration-700"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="absolute bottom-6 left-6 z-25 bg-dark/95 text-white font-mono text-[10px] tracking-widest uppercase py-2 px-4 border-l-2 border-accent rounded-r-lg">
          PI focus · {aud.tag}
        </div>
      </motion.div>

      {/* Text Placement (Alternating order) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className={`lg:col-span-6 space-y-6 ${
          isEven ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        {/* Visual indicator tag */}
        <div className="flex items-center space-x-2">
          <span className="w-6 h-[1px] bg-accent" />
          <span className="font-mono text-[10px] text-accent tracking-widest uppercase font-bold">
            STRATEGIE {aud.type}
          </span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-dark leading-tight">
          {aud.title}
        </h3>

        <p className="text-muted-gray text-sm leading-relaxed font-sans font-light">
          {aud.description}
        </p>

        {/* Custom Checklist block */}
        <ul className="space-y-3.5 pt-2">
          {aud.checklist.map((item, keyIdx) => (
            <li key={keyIdx} className="flex items-start">
              <div className="p-1 rounded-full bg-white border border-accent/20 text-accent mt-0.5 mr-3 shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-xs sm:text-sm text-dark font-sans font-medium">
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* Direct Scrolling action trigger */}
        <div className="pt-6">
          <button
            onClick={scrollToContact}
            className="group bg-dark hover:bg-accent text-white hover:text-dark px-6 py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 border border-dark hover:border-accent flex items-center space-x-3 cursor-pointer rounded-lg"
          >
            <span>{aud.type === 'B2B' ? "DEMANDER L'ÉTUDE DE RENDEMENT" : 'DEMANDE DE BIEN SUR MESURE'}</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </motion.div>
    </div>
  );
}

export default function Targets() {
  const scrollToContact = () => {
    const el = document.getElementById('contact-cta');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="targets" className="py-24 lg:py-36 bg-surface border-t border-b border-border-beige overflow-hidden">
      <div className="w-full px-[20px] space-y-24 lg:space-y-36">
        
        {/* Intro headers */}
        <div className="max-w-3xl">
          <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4 font-semibold">
            CIBLES & ORIENTATION · STRATÉGIE
          </span>
          <h2 className="font-serif text-[28px] sm:text-[39px] lg:text-[49px] leading-[1.1] tracking-[-0.02em] text-dark font-medium">
            Sur mesure pour <br className="hidden sm:inline" />
            <span className="italic text-accent">votre projet de vie</span>.
          </h2>
          <p className="text-muted-gray text-sm sm:text-base mt-4 font-light max-w-xl font-sans">
            Que vous cherchiez à sécuriser votre liberté financière avec des avantages fiscaux, ou à trouver le havre de paix idéal pour votre famille.
          </p>
        </div>

        {/* Alternated Audience Blocks */}
        {AUDIENCES.map((aud, index) => (
          <TargetRow
            key={aud.id}
            aud={aud}
            index={index}
            scrollToContact={scrollToContact}
          />
        ))}

      </div>
    </section>
  );
}
