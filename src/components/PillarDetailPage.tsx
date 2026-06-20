import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Leaf, Palette, Award, Cpu, TrendingUp, CheckCircle, Home } from 'lucide-react';

interface PillarDetailPageProps {
  pillarId: '01' | '02' | '03';
  onBack: () => void;
}

const PILLAR_DATA = {
  '01': {
    num: '01',
    title: "Adresses d'Exception & d'Influence",
    tagline: "La science de l'emplacement souverain.",
    icon: <MapPin className="w-6 h-6 text-accent" />,
    img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=90",
    stats: [
      { label: "Vacance frictionnelle", value: "< 1.2%" },
      { label: "Croissance foncière (20 ans)", value: "+4.6% / an" },
      { label: "Indice de Rareté Générale", value: "9.8 / 10" },
    ],
    description: "L'art de l'immobilier d'extrême prestige repose sur un dogme immuable et souverain : l'emplacement de premier ordre. PrimeImmobilier concentre exclusivement ses investissements de développement et ses acquisitions foncières sur les zones géographiques les plus convoitées du territoire national : au cœur du Triangle d'Or bordelais, le long des boulevards d'influence de Paris intra-muros, et sur les corniches convoitées de la Côte d'Azur. Chaque parcelle est soumise à un audit complet de préservation de valeur sur un horizon minimal de deux décennies.",
    sections: [
      {
        title: "Double Diagnostic Indépendant",
        content: "Chaque projet fait l'objet d'une double expertise technique et financière indépendante menée par des analystes immobiliers près les Cours d'Appel. Nous évaluons minutieusement le micro-marché, la qualité structurelle du bâtiment et l'attractivité locative pérenne du quartier d'adresse."
      },
      {
        title: "Canaux Exclusifs Off-Market",
        content: "Plus de 85% de nos acquisitions uniques se concluent en toute discrétion, hors du marché public traditionnel. Grâce à des relations ancrées auprès de fiduciaires de premier rang et de dynasties familiales d'époque, nous accédons à des joyaux fonciers de prestige inaccessibles."
      },
      {
        title: "Capital et Résilience Inflationniste",
        content: "Investir au cœur d'une grande métropole d'influence à forte barrière géographique constitue le meilleur bouclier patrimonial contre les remous inflationnistes de notre ère. La valeur physique brute du foncier historique haut de gamme reste structurellement stable et haussière de par sa rareté absolue."
      }
    ]
  },
  '02': {
    num: '02',
    title: "Éco-Efficacité d'Avant-Garde (DPE A+)",
    tagline: "L'ingénierie verte au service du confort haut de gamme.",
    icon: <Leaf className="w-6 h-6 text-accent" />,
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=90",
    stats: [
      { label: "Classification Énergie", value: "DPE A+ / RE2020" },
      { label: "Autoproduction décarbonée", value: "75%" },
      { label: "Bilan Carbone d'Ouvrage", value: "-45% vs standard" },
    ],
    description: "La responsabilité écologique ne doit jamais être synonyme de compromis sur la noblesse du confort d'usage. Nous concevons une architecture bio-climatique passive hautement sophistiquée qui anticipe d'une décennie les rigueurs règlementaires de l'État. En mariant habilement des matériaux locaux bio-sourcés de haute technicité à des systèmes d'autoproduction d'énergie thermique, PrimeImmobilier dote votre actif d'une résilience énergétique remarquable.",
    sections: [
      {
        title: "Géothermie Profonde & Solaire Actif",
        content: "Nous intégrons des systèmes de chauffage et climatisation thermodynamiques branchés sur des sondes géothermiques à plus de 120 mètres de profondeur. Couplés à des toitures solaires à haut rendement invisibles, nos projets éliminent quasi-intégralement la dépendance énergétique externe brute."
      },
      {
        title: "Réseaux Hygrothermiques Invisibles",
        content: "Pas de climatiseurs soufflants bruyants ou de radiateurs encombrants d'ancienne génération. Nos intérieurs disposent de chapes chauffantes à grande inertie et de plafonds tempérés invisibles diffusant une température idéale homogène en toute saison, sans déplacement de poussière."
      },
      {
        title: "Épuration d'Air Double Flux HEPA",
        content: "Le confort de vie souverain passe par l'air purifié que vous et vos proches respirez. Des centrales de traitement double flux Zehnder renouvellent le volume d'air en continu, filtrant 99.7% des micro-particules (pollens, résidus routiers et poussières) pour une qualité équivalente à celle des sommets alpins."
      }
    ]
  },
  '03': {
    num: '03',
    title: "Architecture d'Auteur & Signature d'Artiste",
    tagline: "Le geste esthétique d'exception destiné aux générations.",
    icon: <Palette className="w-6 h-6 text-accent" />,
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=90",
    stats: [
      { label: "Compagnons d'Art mobilisés", value: "15+ corps d'art" },
      { label: "Restauration manuelle", value: "+4 000 h / projet" },
      { label: "Durabilité des matériaux", value: "100% Européenne" },
    ],
    description: "Nous rejetons catégoriquement les constructions de masse industrialisées ou simplistes. Chacun de nos projets d'adresse est conçu comme une œuvre d'art haut de gamme unique, façonnée par des architectes d'auteur et des Compagnons du Devoir hautement qualifiés. L'alliance ordonnée entre la restauration d'enveloppes historiques séculaires et la libération audacieuse de grands volumes donne vie à des perspectives rares.",
    sections: [
      {
        title: "Restauration Patrimoniale Ordonnée",
        content: "Sous la surveillance et en concertation directe avec les Architectes des Bâtiments de France (ABF), nous restaurons les façades haussmanniennes de pierre calcaire et les structures d'époque. Enduits à la chaux hydraulique, taille manuelle artisanale et réfection des modénatures historiques."
      },
      {
        title: "Second Œuvre aux Matériaux Nobles",
        content: "Nous ne laissons aucune finition au secret : parquets d'art en chêne français séculaire posés en point de Hongrie d'époque, placages de marbres rares italiens sélectionnés directement en carrières de Carrare (Arabescato, Calacatta), et serrures artisanales coulées en laiton patiné d'art."
      },
      {
        title: "Volumes Libérés & Baies Minimalistes",
        content: "Les intérieurs d'adresse sont repensés pour maximiser la lumière naturelle. De somptueuses baies coulissantes minimalistes à profil ultra-fin s'effacent complétement dans le bâti pour s'ouvrir de plein fouet sur un paysage dégagé, libérant l'esprit de ses limites ordinaires."
      }
    ]
  }
};

export default function PillarDetailPage({ pillarId, onBack }: PillarDetailPageProps) {
  const content = PILLAR_DATA[pillarId];

  useEffect(() => {
    // Scroll directly to top on load
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pillarId]);

  if (!content) {
    return (
      <div className="pt-28 pb-20 w-full px-[20px] text-center">
        <p className="text-muted-gray mb-4">Dossier technique non disponible.</p>
        <button onClick={onBack} className="bg-dark text-white px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-dark cursor-pointer rounded-lg">
          RETOUR À L'ACCUEIL
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white pt-24 min-h-screen"
    >
      {/* Premium Breadcrumbs Bar */}
      <div className="border-b border-border-beige bg-stone-50/50 py-4">
        <div className="w-full px-[20px] mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <button
            onClick={onBack}
            className="group flex items-center space-x-2 text-dark hover:text-accent font-mono tracking-widest uppercase font-bold text-left transition-all duration-300 focus:outline-none cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>RETOUR À L'ACCUEIL</span>
          </button>
          
          <div className="flex items-center space-x-2 text-muted-gray font-sans font-light">
            <span className="hover:text-dark cursor-pointer transition-colors flex items-center" onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-section', { detail: 'top' }))}>
              <Home className="w-3.5 h-3.5 mr-1" />
              Accueil
            </span>
            <span>/</span>
            <span className="hover:text-dark cursor-pointer transition-colors" onClick={onBack}>Exigences</span>
            <span>/</span>
            <span className="text-dark font-medium">Pilier {content.num}</span>
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="relative h-64 sm:h-80 md:h-[400px] w-full bg-stone-900 overflow-hidden">
        <img
          src={content.img}
          alt={content.title}
          className="w-full h-full object-cover grayscale-[15%] opacity-85 hover:grayscale-0 transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="w-full px-[20px] mx-auto max-w-7xl pb-10 sm:pb-14">
            <span className="text-accent text-xs tracking-widest uppercase font-mono font-bold flex items-center mb-2">
              <span className="p-1.5 bg-accent/20 rounded mr-2 inline-flex items-center">
                {content.icon}
              </span>
              EXIGENCE ET PILIER DE SÉCURITÉ {content.num}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl text-white font-medium tracking-tight leading-[1.1] max-w-4xl">
              {content.title}
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm md:text-base font-sans font-light mt-2 max-w-2xl italic">
              « {content.tagline} »
            </p>
          </div>
        </div>
      </div>

      {/* Main Structural Body Content */}
      <div className="w-full px-[20px] mx-auto max-w-7xl py-12 sm:py-16 md:py-20 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Large Column (7/12 Width): Detailed Narrative & Stats */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Stats Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {content.stats.map((stat, idx) => (
                <div key={idx} className="bg-stone-50 border border-stone-200 p-6 rounded-2xl flex flex-col justify-between hover:shadow-sm transition-all duration-300">
                  <span className="font-mono text-[9px] text-stone-400 tracking-wider uppercase leading-snug">{stat.label}</span>
                  <span className="font-serif text-lg sm:text-2xl font-bold text-accent mt-3">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* In-depth technical sections */}
            <div className="space-y-4">
              <h2 className="font-mono text-[10px] tracking-widest uppercase text-accent font-bold">
                PRÉSENTATION ÉDITORIALE & RECONNAISSANCE PATRIMOINE
              </h2>
              <p className="font-serif text-lg sm:text-xl text-dark leading-relaxed font-light">
                {content.description}
              </p>
            </div>

            {/* Sub-articles technical checklist */}
            <div className="pt-6 border-t border-stone-100 space-y-8">
              <h3 className="font-mono text-[10px] tracking-widest uppercase text-stone-900 font-bold">
                MÉTHODOLOGIE D'INGÉNIERIE & PROCESSUS DE SÉCURISATION
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {content.sections.map((sec, idx) => {
                  const getSubIcon = () => {
                    if (idx === 0) return <Award className="w-5 h-5 text-accent" />;
                    if (idx === 1) return <Cpu className="w-5 h-5 text-accent" />;
                    return <TrendingUp className="w-5 h-5 text-accent" />;
                  };

                  return (
                    <div key={idx} className="space-y-3 border-l-2 border-accent/30 pl-4 py-1 hover:border-accent transition-colors duration-300">
                      <div className="flex items-center space-x-2">
                        {getSubIcon()}
                        <h4 className="font-serif text-sm sm:text-base font-semibold text-dark leading-tight">
                          {sec.title}
                        </h4>
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-stone-500 leading-relaxed font-light">
                        {sec.content}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quality Standard Stamp */}
            <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-stone-400 gap-3">
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1.5 text-accent" />
                CONFORMITÉ TECHNIQUE ET GESTION ASSURÉES PAR L'OFFICE PRIMEIMMOBILIER
              </span>
              <span>RÉALISATION MILLESIME 2026</span>
            </div>

          </div>

          {/* Right Smaller Column (4/12 Width): Info Box & Action back Button */}
          <div className="lg:col-span-4 bg-stone-50 border border-stone-200 p-6 sm:p-8 space-y-6 rounded-3xl lg:sticky lg:top-28">
            <h3 className="font-mono text-[10px] tracking-widest uppercase text-dark font-bold border-b border-stone-200 pb-3">
              CHARTE DE QUALITÉ TECHNIQUE
            </h3>

            <p className="text-xs text-stone-600 leading-relaxed font-sans font-light">
              L'Office PrimeImmobilier œuvre au quotidien avec l'exigence suprême de consolider la valeur nette de votre patrimoine. Ce document récapitule notre doctrine pour nos chantiers et arbitrages d'adresse. Un document technique qualifié complet est à votre disposition en contactant directement notre cabinet de conseil.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex justify-between items-center text-xs pb-3 border-b border-stone-200">
                <span className="text-stone-400 font-sans">Dispositif Fiscal</span>
                <span className="text-dark font-medium">Validé ABF / Malraux</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-3 border-b border-stone-200">
                <span className="text-stone-400 font-sans font-light">Audit Environnemental</span>
                <span className="text-accent font-medium font-mono">DPE Triple A</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-400 font-sans font-light">Sécurisation Juridique</span>
                <span className="text-dark font-medium">Garantie Extrême GFA</span>
              </div>
            </div>

            <button
              onClick={onBack}
              className="w-full bg-dark hover:bg-stone-800 text-white font-mono text-xs tracking-widest uppercase py-4 transition-all duration-200 rounded-xl cursor-pointer text-center font-bold"
            >
              Retourner sur l'accueil
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
