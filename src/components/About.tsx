import { motion } from 'motion/react';
import { Award, ShieldCheck, Users, CornerDownRight } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-36 bg-white overflow-hidden relative">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-[20px] grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        {/* Left column: Brand Context & Story */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4 font-semibold">
              CONFIANCE & EXPERTISE · À PROPOS DE NOUS
            </span>
            <h2 className="font-serif text-[28px] sm:text-[39px] lg:text-[49px] leading-[1.1] tracking-[-0.02em] text-dark font-medium">
              Votre partenaire pour des actifs <span className="italic text-accent">immobiliers d'exception</span>.
            </h2>
          </div>

          <p className="text-muted-gray text-base font-light font-sans leading-relaxed">
            Derrière PrimeImmobilier se trouve une équipe interdisciplinaire d'architectes chevronnés, de promoteurs immobiliers et de spécialistes en ingénierie de financement. Notre action commence là où d'autres capitulent : dans la réhabilitation fine de friches complexes, la restructuration sensible de monuments historiques classés et le neuf haut de gamme à la pointe de la technologie.
          </p>

          {/* Three values rows */}
          <div className="space-y-6 pt-4">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-surface border border-border-beige text-accent shrink-0 rounded-lg">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-dark">Transparence absolue</h4>
                <p className="text-xs sm:text-sm text-muted-gray mt-1 leading-relaxed font-sans font-light">
                  Dès le premier échange, nous établissons des calculs ouverts, réalistes et pragmatiques. Vous bénéficiez d'états d'avancement réguliers et d'un interlocuteur dédié pour l'ensemble de votre projet.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-surface border border-border-beige text-accent shrink-0 rounded-lg">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-dark">Qualité sans concession</h4>
                <p className="text-xs sm:text-sm text-muted-gray mt-1 leading-relaxed font-sans font-light">
                  Nos entreprises partenaires partagent notre haute exigence d'excellence artisanale. Nous mettons en œuvre des matériaux de marques de premier rang et faisons auditer chaque étape clé par des experts indépendants.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-surface border border-border-beige text-accent shrink-0 rounded-lg">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-dark">Réseau local et de confiance</h4>
                <p className="text-xs sm:text-sm text-muted-gray mt-1 leading-relaxed font-sans font-light">
                  En tant qu'acteur de l'immobilier d'exception en France, nous entretenons des relations de long terme avec les administrations, les banques et les propriétaires fonciers. Cela garantit un traitement ultra-rapide des dossiers et des opportunités d'adresse Off-Market exclusives.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-4">
            <CornerDownRight className="w-4 h-4 text-accent" />
            <span className="text-xs font-mono tracking-widest text-dark uppercase font-bold">Acquisitions foncières financées à 100 % sur fonds propres</span>
          </div>
        </div>

        {/* Right column: 3 Images Stacked right with layered offset rotations */}
        <div className="lg:col-span-6 relative h-[500px] sm:h-[600px] flex items-center justify-center mt-12 lg:mt-0">
          
          {/* Image 3 (Base - Bottom Layer) rotated slightly left */}
          <motion.div
            className="absolute w-[240px] sm:w-[320px] aspect-[4/5] bg-neutral-100 p-3 shadow-md border border-neutral-200 z-10 rounded-xl"
            style={{ x: -60, y: 50, rotate: -6 }}
            whileHover={{ scale: 1.05, zIndex: 40, rotate: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="w-full h-[85%] overflow-hidden bg-neutral-200 mb-2 rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80"
                alt="Détails classiques sculptés en pierre d'une façade haussmannienne à Paris"
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="block font-mono text-[9px] tracking-wider text-muted-gray uppercase text-center mt-1">EST. 2014 · CONCEPTION</span>
          </motion.div>

          {/* Image 2 (Middle Layer) rotated slightly right */}
          <motion.div
            className="absolute w-[240px] sm:w-[320px] aspect-[4/5] bg-neutral-50 p-3 shadow-lg border border-neutral-300/80 z-20 rounded-xl"
            style={{ x: 40, y: -40, rotate: 4 }}
            whileHover={{ scale: 1.05, zIndex: 40, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="w-full h-[85%] overflow-hidden bg-neutral-200 mb-2 rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80"
                alt="Salon minimaliste moderne de haut standing baigné de lumière naturelle"
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="block font-mono text-[9px] tracking-wider text-muted-gray uppercase text-center mt-1">EXIGENCE QUALITÉ CRITIQUE</span>
          </motion.div>

          {/* Image 1 (Top Layer - Front-most) rotated center */}
          <motion.div
            className="absolute w-[230px] sm:w-[300px] aspect-[4/5] bg-white p-3 shadow-2xl border border-neutral-300 z-30 rounded-xl"
            style={{ x: -10, y: -5, rotate: -2 }}
            whileHover={{ scale: 1.05, zIndex: 40, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="w-full h-[85%] overflow-hidden bg-neutral-100 mb-2 relative rounded-lg">
              {/* Floating golden premium badge */}
              <div className="absolute top-2 left-2 bg-accent text-dark font-mono text-[8px] font-bold px-1.5 py-0.5 tracking-wider uppercase z-10 rounded">
                DIRECTION TECHNIQUE
              </div>
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
                alt="Directeur technique de projet examinant des plans directeurs d'architecture haut de gamme"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="block font-mono text-[9px] tracking-wider text-dark font-semibold uppercase text-center mt-1">INGÉNIERIE DÉTAILLÉE · EXUVIE</span>
          </motion.div>

          {/* Soft background golden decorative ring border wireframe */}
          <div className="absolute inset-x-8 inset-y-12 border border-accent/10 pointer-events-none rounded-full blur-[2px] -z-0" />
        </div>

      </div>
    </section>
  );
}
