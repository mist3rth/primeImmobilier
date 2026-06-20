import { motion } from 'motion/react';
import { MapPin, Building2 } from 'lucide-react';

export default function IntroText() {
  return (
    <section id="intro-text" className="py-24 lg:py-36 bg-surface overflow-hidden relative">
      {/* Decorative details */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/40 blur-2xl pointer-events-none" />

      <div className="w-full px-[20px] grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
        
        {/* Left column: Editorial Content & Quote */}
        <div className="lg:col-span-6 space-y-8">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            <span className="font-mono text-xs text-accent tracking-widest uppercase block font-semibold">
              NOTRE PHILOSOPHIE · PrimeImmobilier
            </span>
            <h2 className="font-serif text-[28px] sm:text-[39px] lg:text-[49px] leading-[1.1] tracking-[-0.02em] text-dark font-medium">
              Préserver le patrimoine.<br />
              <span className="italic text-accent">Bâtir l'avenir.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="border-l-4 border-accent pl-6 py-2"
          >
            <p className="font-serif text-lg sm:text-xl text-dark/90 italic leading-relaxed">
              &bdquo;L'architecture dépasse le béton et la matière. C'est l'incarnation de l'esprit d'une époque. Notre dessein est d'unir cet héritage au confort d'avant-garde et à une valorisation d'actifs intemporelle.&ldquo;
            </p>
            <span className="block mt-3 text-xs font-mono tracking-widest text-muted-gray uppercase">
              &mdash; Antoine de Saint-Florent, CEO
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6 text-muted-gray text-base leading-relaxed font-sans font-light"
          >
            <p>
              Depuis plus d'une décennie d'excellence, nous nous concentrons sur des projets résidentiels haut de gamme de premier rang. Chaque bâtisse signée de notre griffe incarne une symbiose de facture artisanale rigoureuse, de performances thermiques d'exception et d'esthétique d'auteur intemporelle.
            </p>
            <p>
              Notre ingénierie couvre l'ensemble de la chaîne de valeur : de la recherche foncière stratégique à la conception d'architecte méticuleuse, jusqu'à la direction de chantier clés en main et l'administration privée d'actifs. Un interlocuteur unique synonyme de sécurité et de tranquillité absolue.
            </p>
          </motion.div>

          {/* Core values bullet badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="grid grid-cols-2 gap-4 pt-4 border-t border-border-beige"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-white text-accent border border-border-beige mt-1 rounded-lg">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-dark">Construction d'Art</h4>
                <p className="text-xs text-muted-gray mt-1">Matériaux certifiés de premier choix et maîtrise d'œuvre d'élite.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-white text-accent border border-border-beige mt-1 rounded-lg">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-dark">Emplacements Exclusifs</h4>
                <p className="text-xs text-muted-gray mt-1">Sélection d'emplacements d'adresse à forte désirabilité et rareté foncière.</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right column: Offset Overlapping Images with parallax style and fine border */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[450px] lg:min-h-[600px] mt-10 lg:mt-0">
          
          {/* Main Background Image (Lower Left) */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as any }}
            className="absolute left-0 bottom-4 w-2/3 aspect-[3/4] overflow-hidden bg-stone-100 z-10 border border-border-beige shadow-lg rounded-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
              alt="Architecture d'intérieur minimaliste et luxueuse d'un appartement rénové par PrimeImmobilier"
              className="w-full h-full object-cover grayscale-[10%] hover:scale-105 transition-transform duration-700 hover:grayscale-0"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Overlay Foreground Image (Upper Right) Offset */}
          <motion.div
            initial={{ opacity: 0, y: 60, x: 40 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] as any }}
            className="absolute right-0 top-4 w-1/2 aspect-[4/5] overflow-hidden bg-stone-200 z-20 border border-border-beige shadow-xl rounded-2xl"
          >
            {/* Minimal golden accent label */}
            <div className="absolute top-4 left-4 bg-accent text-dark font-mono text-[9px] font-bold py-1 px-2 uppercase tracking-wide z-30 rounded-sm">
              PRÉCISION DU DÉTAIL
            </div>
            
            <img
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
              alt="Placages de marbre blanc et détails de robinetterie haut de gamme dorés"
              className="w-full h-full object-cover grayscale-[10%] hover:scale-110 transition-transform duration-1000 hover:grayscale-0"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Golden abstract frame outline */}
          <div className="absolute right-8 bottom-8 w-1/2 h-1/2 border border-accent/20 -z-0 pointer-events-none translate-x-4 translate-y-4 rounded-2xl" />
        </div>

      </div>
    </section>
  );
}
