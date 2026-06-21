import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Play, X, ChevronRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Light synchrone parallax on background image
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  const titleWords = ["Investissez", "avec", "discernement", "patrimonial."];

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative min-h-[95vh] md:min-h-screen bg-stone-950 flex flex-col justify-center overflow-hidden pt-20 text-white"
    >
      {/* Background container with overflow hidden to isolate parallax movement */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-100"
          style={{ backgroundImage: "url('/hero.webp')", y }}
        />
        {/* Luxury multi-layered dark overlay */}
        <div className="absolute inset-0 bg-stone-950/50 md:bg-stone-950/40" />
      </div>
      
      {/* Soft golden ambient radial glowing spots */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-40 z-0 pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-10 right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-2xl opacity-50 z-0 pointer-events-none" />

      <div className="w-full px-[20px] h-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 py-12 lg:py-0">
        
        {/* Left Side: Copious typography and spacing */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          {/* Staggered Word Heading H1 (61px is exact Major Third scale: 16 * 1.25^6) */}
          <h1 className="font-serif text-[38px] sm:text-[50px] lg:text-[61px] leading-[1.05] tracking-[-0.03em] text-white mb-6">
            {titleWords.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-3 sm:mr-4 last:text-accent font-semibold"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* H2/Description Paragraph. Animate 500ms delay 800ms */}
          <motion.p
            className="text-base sm:text-lg lg:text-xl text-stone-300 leading-relaxed max-w-xl mb-10 font-sans font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
          >
            Nous concevons, revitalisons et commercialisons des actifs résidentiels d'exception dans les meilleurs emplacements de France (Paris, Lyon, Nice, Bordeaux). Découvrez une architecture signée d'auteur et pérennisez votre patrimoine.
          </motion.p>

          {/* Interaction Rows. Delay 1.2s */}
          <motion.div
            className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            {/* Primary Action (High End Accent button) */}
            <button
              onClick={() => {
                const el = document.getElementById('completed-projects');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="bg-accent hover:bg-white text-dark hover:text-dark px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 border border-accent hover:border-white flex justify-center items-center space-x-2 cursor-pointer group rounded-lg shadow-lg shadow-accent/10"
            >
              <span>Découvrir nos projets</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Video Action modal trigger */}
            <button
              onClick={() => setIsVideoOpen(true)}
              className="flex items-center justify-center space-x-4 px-6 py-4 border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/30 transition-all duration-300 cursor-pointer group rounded-lg"
            >
              <span className="w-10 h-10 rounded-full border border-accent/40 flex items-center justify-center bg-stone-950/50 group-hover:bg-accent group-hover:border-accent text-accent group-hover:text-dark transition-all duration-300">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </span>
              <span className="text-xs font-bold tracking-widest uppercase text-white">
                Visionner le Film
              </span>
            </button>
          </motion.div>

          {/* Extra quick indicator badges */}
          <motion.div 
            className="mt-16 flex items-center space-x-8 text-xs text-stone-300 border-t border-white/10 pt-8 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span className="font-mono text-[11px] tracking-wider uppercase">Certifié Bureau Veritas</span>
            </div>
            <div>
              <span className="font-mono text-[11px] tracking-wider text-white font-medium">95%+</span> Satisfaction Client
            </div>
          </motion.div>
        </div>

        {/* Right Side: Elegant Glassmorphism Feature Panel */}
        <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full max-w-sm backdrop-blur-md bg-stone-900/40 border border-white/15 p-8 rounded-[24px] text-white shadow-2xl relative overflow-hidden group"
          >
            {/* Inner dynamic highlight corner glow */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-accent/20 rounded-full blur-2xl pointer-events-none" />

            <span className="block font-mono text-[10px] text-accent tracking-widest uppercase mb-2 font-bold">
              ★ RÉSIDENCE SIGNATURE
            </span>
            <h3 className="font-serif text-2xl font-medium tracking-wide mb-3 text-white">
              Le Carré de la Seine
            </h3>
            <p className="text-stone-300 text-xs leading-relaxed font-sans mb-6 font-light">
              Un chef-d'œuvre contemporain idéalement situé offrant des prestations haut de gamme sans compromis. L'élégance parisienne réinventée.
            </p>

            {/* Spec lines */}
            <div className="space-y-3.5 border-t border-white/10 pt-5 mb-6 font-mono text-[11px] text-stone-300">
              <div className="flex justify-between">
                <span>LOCALISATION :</span>
                <span className="text-white">Paris IVe, France</span>
              </div>
              <div className="flex justify-between">
                <span>RECONNAISSANCE :</span>
                <span className="text-accent font-bold">Label Excellence Haute Couture</span>
              </div>
              <div className="flex justify-between">
                <span>ESPACES :</span>
                <span className="text-white font-medium">Du 3 au 6 Pièces d'exception</span>
              </div>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('active-projects');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="w-full py-3.5 bg-accent hover:bg-white text-dark font-semibold font-mono text-[10px] tracking-widest uppercase transition-all duration-300 rounded-lg flex items-center justify-center space-x-2 cursor-pointer shadow-md shadow-accent/5"
            >
              <span>Découvrir le portfolio</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>

      </div>

      {/* Video Modal Player Dialog */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark/95 z-[300] flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative bg-black w-full max-w-4xl aspect-auto min-h-[380px] sm:min-h-0 sm:aspect-video shadow-2xl border border-accent/20 rounded-2xl overflow-hidden"
            >
              {/* Close Button Inside the Box */}
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-40 bg-black/60 backdrop-blur-md text-white hover:text-accent p-2 rounded-full flex items-center justify-center transition-colors cursor-pointer border border-white/10"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Real Video Teaser Presentation */}
              <div className="w-full h-full min-h-[380px] sm:min-h-0 absolute inset-0 flex flex-col justify-center items-center relative overflow-hidden bg-stone-900">
                {/* Embedded beautiful loop */}
                <iframe
                  title="PrimeImmobilier Video"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                  className="absolute inset-0 w-full h-full opacity-35 pointer-events-none object-cover"
                  allow="autoplay; encrypted-media"
                ></iframe>

                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 bg-gradient-to-t from-dark via-dark/50 to-transparent z-10">
                  <div className="mb-3 text-accent">
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse mx-auto" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-3xl text-white font-medium mb-2">Récit Cinématographique</h3>
                  <p className="text-stone-300 text-[11px] sm:text-sm max-w-md mb-6 leading-relaxed font-light">
                    Découvrez des monuments historiques restaurés avec art et des constructions contemporaines d'avant-garde à Paris, Bordeaux, Nice et Lyon.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
                    <button 
                      onClick={() => setIsVideoOpen(false)}
                      className="px-6 py-3 bg-accent hover:bg-white text-dark font-mono text-xs font-semibold uppercase tracking-widest transition-colors duration-300 cursor-pointer rounded-lg text-center"
                    >
                      Télécharger la Brochure
                    </button>
                    <button 
                      onClick={() => {
                        setIsVideoOpen(false);
                        document.getElementById('contact-cta')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-3 border border-white/20 hover:border-accent text-white hover:text-accent font-mono text-xs font-semibold uppercase tracking-widest transition-colors duration-300 cursor-pointer rounded-lg bg-white/5 backdrop-blur-sm text-center"
                    >
                      Prendre Rendez-vous
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
