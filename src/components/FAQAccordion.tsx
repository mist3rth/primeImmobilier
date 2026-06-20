import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessagesSquare, ArrowRight } from 'lucide-react';
import { FAQS } from '../constants/data';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (idx: number) => {
    if (openIndex === idx) {
      setOpenIndex(null);
    } else {
      setOpenIndex(idx);
    }
  };

  return (
    <section id="faq" className="py-24 lg:py-36 bg-stone-50/70 border-b border-border-beige relative">
      <div className="w-full px-[20px] max-w-7xl mx-auto">
        
        {/* Wireframe Premium Top Header Block */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end border-b border-border-beige pb-10 mb-16">
          <div>
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-3 font-semibold">
              RÉPONSES D'EXPERTS · QUESTIONS & RÉPONSES
            </span>
            <h2 className="font-serif text-[28px] sm:text-[39px] lg:text-[49px] leading-[1.1] tracking-[-0.02em] text-dark font-medium">
              Des réponses qui apportent de la clarté
            </h2>
          </div>
          <div className="flex items-start gap-3 lg:text-right lg:justify-end text-muted-gray text-xs sm:text-sm font-light font-sans max-w-sm mt-4 lg:mt-0 leading-relaxed">
            <p>
              Vous trouverez ici les questions fondamentales et les réponses détaillées à vos projets de valorisation d'actifs.
            </p>
            <span className="text-accent text-[12px] shrink-0 mt-0.5" aria-hidden="true">&#10022;</span>
          </div>
        </div>

        {/* Desktop-first structured responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: White Rounded-2xl Accordion Cards */}
          <div className="lg:col-span-7 space-y-5">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.id}
                  onClick={() => toggleIndex(idx)}
                  className={`bg-white border rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
                    isOpen
                      ? 'border-accent shadow-md'
                      : 'border-border-beige/70 hover:border-dark/20 shadow-sm'
                  }`}
                >
                  {/* Accordion Card Header Panel */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleIndex(idx);
                    }}
                    className="w-full text-left p-6 sm:p-8 flex justify-between items-center group cursor-pointer focus:outline-none"
                  >
                    <span className="font-sans text-sm sm:text-base font-semibold text-dark group-hover:text-accent transition-colors pr-6 leading-snug">
                      {faq.question}
                    </span>
                    
                    {/* Modern dynamic chevron controller */}
                    <span
                      className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-accent/10 border-accent/20 text-accent'
                          : 'bg-stone-50 border-border-beige/70 text-dark group-hover:border-dark/40'
                      }`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </span>
                  </button>

                  {/* Seamless Accordion Expandable Block */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                          <div className="border-t border-border-beige/40 pt-5">
                            <p className="text-muted-gray text-xs sm:text-sm leading-relaxed font-sans font-light">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column: Premium location/office Visual decorated with beautifully rounded corners */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] rounded-[32px] overflow-hidden bg-stone-100 shadow-xl border border-border-beige group">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
                alt="Bureau de prestige de PrimeImmobilier représentant la confiance absolue"
                className="w-full h-full object-cover grayscale-[15%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 rounded-[32px]"
                referrerPolicy="no-referrer"
              />
              
              {/* Inner ambient visual shading */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent pointer-events-none rounded-[32px]" />

              <div className="absolute bottom-8 left-8 right-8 z-20 text-white space-y-4">
                <div className="p-3 bg-accent text-dark rounded-full w-10 h-10 flex items-center justify-center border border-accent/20 shadow">
                  <MessagesSquare className="w-4 h-4 stroke-[2.5]" />
                </div>
                <h4 className="font-serif text-lg sm:text-xl font-medium leading-relaxed">
                  Besoin d'un entretien personnalisé ?
                </h4>
                <p className="text-xs text-stone-300 font-sans font-light leading-relaxed">
                  Certaines questions méritent un échange direct. Nous serions ravis de vous accueillir dans nos prestigieux bureaux de Paris pour en discuter autour d'un expresso de torréfacteur.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('contact-cta');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="text-xs font-mono tracking-widest text-accent font-bold uppercase flex items-center space-x-1 hover:text-white transition-colors cursor-pointer"
                >
                  <span>PLANIFIER UN ENTRETIEN</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
