import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, MapPin, Leaf, Palette, Award, Cpu, TrendingUp, CheckCircle } from 'lucide-react';
import { USP_GRID } from '../constants/data';
import { useNavigation } from '../context/NavigationContext';

const PILLAR_DETAILS = [
  {
    num: '01',
    title: "Adresses d'Exception & d'Influence",
    tagline: "La science de l'emplacement souverain.",
    icon: <MapPin className="w-5 h-5 text-accent" />,
    img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=700&q=80",
    stats: [
      { label: "Vacance frictionnelle", value: "< 1.2%" },
      { label: "Croissance foncière (20 ans)", value: "+4.6% / an" },
      { label: "Indice de Rareté Générale", value: "9.8 / 10" },
    ],
    description: "L'art de l'immobilier de grand luxe repose sur un dogme immuable : l'emplacement souverain. PrimeImmobilier cible exclusivement des adresses de haute valeur : au cœur du Triangle d'Or bordelais, le long des boulevards prisés de Paris, et sur les corniches convoitées de la Riviera. Chaque parcelle subit un audit ultra-rigoureux sur un horizon de valorisation de deux décennies.",
    sections: [
      {
        title: "Double Diagnostic Indépendant",
        content: "Chaque projet fait l'objet d'une double expertise menée par des analystes immobiliers agréés. Nous évaluons minutieusement le micro-marché et la pérennité foncière du quartier."
      },
      {
        title: "Canaux Exclusifs Off-Market",
        content: "Plus de 85% de nos chantiers de developpement se concluent hors du marché public traditionnel. Nous accédons de manière discrète à des joyaux fonciers d'influence exclusifs."
      },
      {
        title: "Capital et Résilience Inflation",
        content: "Investir au cœur d'un territoire à haute valeur constitue le meilleur rempart contre l'inflation. La rareté intrinsèque du foncier d'exception protège durablement vos capitaux."
      }
    ]
  },
  {
    num: '02',
    title: "Éco-Efficacité d'Avant-Garde (DPE A+)",
    tagline: "L'ingénierie verte au service du confort haut de gamme.",
    icon: <Leaf className="w-5 h-5 text-accent" />,
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=80",
    stats: [
      { label: "Classification Énergie", value: "DPE A+ / RE2020" },
      { label: "Autoproduction décarbonée", value: "75%" },
      { label: "Bilan Carbone d'Ouvrage", value: "-45% vs standard" },
    ],
    description: "La responsabilité écologique ne fait aucun compromis sur la noblesse du confort d'usage. Nous développons une architecture bio-climatique passive qui anticipe d'une décennie les rigueurs règlementaires. En mariant matériaux locaux nobles et énergies renouvelables, nous offrons une totale autonomie opérationnelle.",
    sections: [
      {
        title: "Géothermie Profonde & Solaire",
        content: "Systèmes thermodynamiques sophistiqués branchés sur sondes géothermiques à plus de 120 mètres de profondeur, couplés à des toitures solaires à haut rendement."
      },
      {
        title: "Réseaux Hygrothermiques Invisibles",
        content: "Chapes d'inertie chauffantes et plafonds tempérés invisibles diffusant une température homogène tout au long des saisons, sans aucun déplacement de poussière ni souffle d'air."
      },
      {
        title: "Épuration d'Air Double Flux HEPA",
        content: "Des centrales de traitement d'air Zehnder renouvellent l'air intérieur en continu, éliminant 99.7% des micro-particules, pollens et poussières pour une pureté absolue."
      }
    ]
  },
  {
    num: '03',
    title: "Architecture d'Auteur & Signature d'Artiste",
    tagline: "Le geste esthétique d'exception destiné aux générations.",
    icon: <Palette className="w-5 h-5 text-accent" />,
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80",
    stats: [
      { label: "Compagnons d'Art mobilisés", value: "15+ corps d'art" },
      { label: "Restauration manuelle", value: "+4 000 h / projet" },
      { label: "Provenance des matériaux", value: "100% Européenne" },
    ],
    description: "Nous rejetons catégoriquement les constructions industrialisées ou standardisées. Chacun de nos projets est conçu comme une œuvre d'art, façonnée par des architectes d'auteur de premier rang. L'alliance ordonnée entre la restauration d'enveloppes historiques d'époque et l'audace moderne crée une intemporalité rare.",
    sections: [
      {
        title: "Restauration Patrimoniale Ordonnée",
        content: "Sous directives ABF, nous préservons les structures d'époque d'immeubles haussmanniens. Enduits à la chaux hydraulique, taille de pierre artisanale et fer forgé d'art."
      },
      {
        title: "Second Œuvre aux Matériaux Nobles",
        content: "Parquets en chêne français séculaire chevillés, placages de marbres d'Italie d'exception (Arabescato, Calacatta de carrières de Carrare) et ferrures en bronze patiné."
      },
      {
        title: "Volumes Libérés & Perspectives d'Art",
        content: "Restructuration audacieuse des surfaces pour optimiser la luminosité naturelle. Menuiseries aluminium minimalistes à profil ultra-fin s'effaçant totalement dans le bâti."
      }
    ]
  }
];

export default function USPBento() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { openPillar } = useNavigation();

  // IntersectionObserver to update activeIndex on scroll for mobile stability,
  // while allowing manual interactions.
  useEffect(() => {
    const items = document.querySelectorAll('.usp-trigger-item');
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
          setActiveIndex(index);
        }
      });
    }, observerOptions);

    items.forEach((item) => observer.observe(item));
    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, []);

  return (
    <section id="usp-bento" className="py-24 lg:py-36 bg-white border-b border-border-beige relative" ref={containerRef}>
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-surface rounded-full blur-3xl pointer-events-none -translate-x-1/2" />

      <div className="w-full px-[20px]">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4 font-semibold">
            EXIGENCE ARCHITECTURALE
          </span>
          <h2 className="font-serif text-[28px] sm:text-[39px] lg:text-[49px] leading-[1.1] tracking-[-0.02em] text-dark font-medium">
            Nos piliers au service de votre <span className="italic text-accent">succès</span>.
          </h2>
          <p className="text-muted-gray text-sm sm:text-base mt-4 font-light max-w-xl font-sans">
            Grâce à des partenariats étroits avec des architectes renommés et un contrôle de conformité sans faille, nous façonnons des actifs résidentiels uniques aux facteurs de rareté avérés.
          </p>
        </div>

        {/* Bento Grid layout with interactive columns */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (60%): Interactive item cards 01, 02, 03 */}
          <div className="lg:col-span-6 space-y-5">
            {USP_GRID.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={index}
                  data-index={index}
                  onClick={() => {
                    setActiveIndex(index);
                    openPillar(item.num as any);
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`usp-trigger-item p-6 sm:p-8 border transition-all duration-500 cursor-pointer group relative flex flex-col justify-between rounded-2xl ${
                    isActive
                      ? 'bg-surface border-accent shadow-sm'
                      : 'bg-white border-border-beige hover:border-dark/30'
                  }`}
                >
                  {/* Decorative gold vertical bar indicator */}
                  <div
                    className={`absolute top-0 bottom-0 left-0 w-1 bg-accent transition-all duration-500 rounded-l-2xl ${
                      isActive ? 'scale-y-100' : 'scale-y-0'
                    }`}
                  />

                  <div className="flex justify-between items-start mb-4">
                    {/* Watermark grand index */}
                    <span
                      className={`font-serif text-[32px] font-bold leading-none select-none transition-colors duration-500 ${
                        isActive ? 'text-accent/30' : 'text-neutral-200 group-hover:text-neutral-300'
                      }`}
                    >
                      {item.num}
                    </span>

                    {/* Badge */}
                    <span className="text-[9px] font-mono tracking-widest uppercase text-muted-gray bg-white border border-border-beige px-2.5 py-1 rounded-full">
                      PILIER SÉCURITÉ
                    </span>
                  </div>

                  <div>
                    <h3
                      className={`font-serif text-lg sm:text-xl font-medium tracking-tight mb-2 transition-colors duration-300 ${
                        isActive ? 'text-dark font-bold' : 'text-neutral-800'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-muted-gray text-xs sm:text-sm leading-relaxed font-sans font-light">
                      {item.body}
                    </p>
                  </div>

                  {/* Active highlight subtle hint */}
                  <div className="mt-4 flex items-center text-[10px] font-mono tracking-widest text-accent uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>En savoir plus</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1 animate-pulse" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column (40%): Only the switching image frame */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="border border-border-beige bg-surface rounded-3xl overflow-hidden p-4 sm:p-5 shadow-sm">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-900 group rounded-2xl border border-border-beige/50">
                {/* Thin premium internal golden border */}
                <div className="absolute inset-3 border border-white/20 z-10 pointer-events-none rounded-xl" />

                {/* Switch animation of image based on activeIndex */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIndex}
                    src={PILLAR_DETAILS[activeIndex].img}
                    alt={PILLAR_DETAILS[activeIndex].title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                {/* Overlay Vignette with primary info */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-5 z-20">
                  <span className="text-accent text-[9px] tracking-widest uppercase font-mono font-bold mb-1 flex items-center space-x-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span>PILIER EXIGENCE {PILLAR_DETAILS[activeIndex].num}</span>
                  </span>
                  <h4 className="font-serif text-base sm:text-lg text-white font-medium tracking-tight">
                    {PILLAR_DETAILS[activeIndex].title}
                  </h4>
                  <p className="text-stone-300 text-[10px] sm:text-xs font-sans font-light mt-1.5 italic max-w-xs">
                    « {PILLAR_DETAILS[activeIndex].tagline} »
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

