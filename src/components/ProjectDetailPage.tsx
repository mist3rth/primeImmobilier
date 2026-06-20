import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  ArrowLeft, MapPin, Calendar, Check, Compass, 
  FileText, CheckCircle2, ArrowRight, Info
} from 'lucide-react';
import { PROJECTS } from '../constants/data';

interface ProjectDetailPageProps {
  projectId: string;
  onBack: () => void;
}

export default function ProjectDetailPage({ projectId, onBack }: ProjectDetailPageProps) {
  const project = PROJECTS.find(p => p.id === projectId);
  const [activeTab, setActiveTab] = useState<'specs' | 'blueprint'>('specs');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    agreed: false
  });

  const detailImageContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: detailImageContainerRef,
    offset: ["start end", "end start"]
  });

  // Direct, instant, lightweight compositor-friendly translation without spring delay
  const detailY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  useEffect(() => {
    // Scroll smoothly to top on component load
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [projectId]);

  if (!project) {
    return (
      <div className="pt-28 pb-20 w-full px-[20px] text-center">
        <p className="text-muted-gray mb-4">Projet non trouvé dans nos bases.</p>
        <button onClick={onBack} className="bg-dark text-white px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-dark cursor-pointer rounded-lg">
          RETOUR À L'ACCUEIL
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white pt-24 min-h-screen"
      style={{ contentVisibility: 'auto' }}
    >
      {/* Sub-Header & Breadcrumb Bar */}
      <div className="border-b border-border-beige bg-stone-50/50 py-4">
        <div className="w-full px-[20px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <button
            onClick={onBack}
            className="group flex items-center space-x-2 text-dark hover:text-accent font-mono tracking-widest uppercase font-bold text-left transition-all duration-300 focus:outline-none cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>RETOUR AUX PROJETS</span>
          </button>
          
          <div className="flex items-center space-x-2 text-muted-gray font-sans font-light">
            <span className="hover:text-dark cursor-pointer transition-colors" onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-section', { detail: 'top' }))}>Accueil</span>
            <span>/</span>
            <span className="hover:text-dark cursor-pointer transition-colors" onClick={onBack}>Projets</span>
            <span>/</span>
            <span className="text-dark font-medium">{project.title}</span>
          </div>
        </div>
      </div>

      {/* Main Page Content Body */}
      <div className="w-full px-[20px] py-12 lg:py-20 font-sans">
        
        {/* Title Presentation Section */}
        <div className="mb-12 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase border rounded-full ${
              project.status === 'active' 
                ? 'border-accent/40 bg-accent/5 text-accent' 
                : 'border-emerald-600/40 bg-emerald-50 text-emerald-600'
            }`}>
              {project.badge}
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-muted-gray tracking-wider">
              COLLECTION PHARE · DIVISION PATRIMOINE · ACTIF ID : {project.id.toUpperCase()}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.02em] text-dark font-medium max-w-4xl">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-gray pt-1 border-b border-border-beige/50 pb-6">
            <span className="flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-accent shrink-0" />
              <strong className="text-dark font-medium">{project.location}</strong>
            </span>
            <span className="hidden sm:inline text-stone-300">|</span>
            <span className="flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-accent shrink-0" />
              <span>Année de développement : <strong className="text-dark font-semibold">{project.year}</strong></span>
            </span>
            {project.specs?.volume && (
              <>
                <span className="hidden sm:inline text-stone-300">|</span>
                <span className="text-dark font-medium">Enveloppe d'exécution : {project.specs.volume}</span>
              </>
            )}
          </div>
        </div>

        {/* 12-Column Balanced Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Large Column (7/12 Width): Visual Representation & Schema */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Visual Tabs */}
            <div className="space-y-4">
              <div className="flex space-x-2 border-b border-border-beige pb-3">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`px-4 py-2 text-xs font-mono tracking-widest uppercase font-bold border-b-2 transition-all duration-300 cursor-pointer ${
                    activeTab === 'specs'
                      ? 'border-accent text-dark'
                      : 'border-transparent text-muted-gray hover:text-dark'
                  }`}
                >
                  PHOTOGRAPHIE REELLE
                </button>
                <button
                  onClick={() => setActiveTab('blueprint')}
                  className={`px-4 py-2 text-xs font-mono tracking-widest uppercase font-bold border-b-2 transition-all duration-300 cursor-pointer ${
                    activeTab === 'blueprint'
                      ? 'border-accent text-dark'
                      : 'border-transparent text-muted-gray hover:text-dark'
                  }`}
                >
                  PLAN DE MASSE CAD
                </button>
              </div>

              {/* Dynamic Presentation Window */}
              <div ref={detailImageContainerRef} className="relative aspect-[16/10] bg-stone-900 border border-border-beige overflow-hidden rounded-2xl">
                <AnimatePresence mode="wait">
                  {activeTab === 'specs' ? (
                    <motion.div
                       key="tab-image"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0"
                    >
                      <div className="absolute inset-0 w-full h-[116%] top-[-8%] overflow-hidden">
                        <motion.img
                          src={project.image}
                          alt={`Restaurations ou constructions réelles du projet ${project.title}`}
                          style={{ y: detailY }}
                          onLoad={() => setImageLoaded(true)}
                          className={`w-full h-full object-cover transition-[filter,opacity] duration-1000 ${
                            imageLoaded ? 'scale-100 blur-0' : 'scale-105 blur-md'
                          }`}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/45 via-transparent to-transparent pointer-events-none z-10" />
                      <div className="absolute bottom-4 right-4 bg-dark/70 text-white font-mono text-[9px] px-3 py-1 uppercase tracking-wider backdrop-blur-sm z-20 rounded-md">
                        Prise de vue d'architecte réelle
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="tab-blueprint"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-stone-950 flex flex-col items-center justify-center p-8 text-white"
                    >
                      {/* Technical CAD Schema Representation */}
                      <div className="w-full max-w-[360px] aspect-square border border-accent/20 bg-stone-900/40 relative p-6 flex flex-col justify-between overflow-hidden rounded-xl">
                        <div className="absolute inset-0 bg-[radial-gradient(#C8A96E_1px,transparent_1px)] [background-size:18px_18px] opacity-10 pointer-events-none" />
                        
                        <div className="absolute top-3 right-3 text-accent/40 flex flex-col items-center">
                          <Compass className="w-6 h-6 animate-spin-slow text-accent" />
                          <span className="text-[8px] font-mono mt-0.5 tracking-wider">NORD</span>
                        </div>

                        <div className="text-[8px] font-mono text-stone-400 absolute bottom-3 left-3 space-y-0.5">
                          <p className="text-accent">PROJECT DRAWING ID: AS-DW-{project.id.toUpperCase()}</p>
                          <p>CAD SCALE: 1:100</p>
                          <p>BÜRO: SCHMIDT PROJEKT ARCHITEKTEN</p>
                        </div>

                        {/* Interactive Vector Art */}
                        <div className="flex-grow flex items-center justify-center p-2 h-full">
                          <svg className="w-full h-full text-accent" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                            <rect x="15" y="15" width="70" height="70" strokeWidth="0.85" />
                            <line x1="50" y1="15" x2="50" y2="85" strokeWidth="0.6" />
                            <line x1="15" y1="45" x2="50" y2="45" strokeWidth="0.6" />
                            <line x1="50" y1="55" x2="85" y2="55" strokeWidth="0.6" />
                            
                            <path d="M 50 25 A 10 10 0 0 1 40 15" strokeWidth="0.4" strokeDasharray="1,1" />
                            <path d="M 50 65 A 10 10 0 0 0 60 55" strokeWidth="0.4" strokeDasharray="1,1" />
                            
                            <rect x="35" y="85" width="30" height="10" strokeDasharray="2,2" />
                            
                            <text x="32" y="30" fill="currentColor" fontSize="3" fontFamily="monospace" textAnchor="middle" className="text-accent/80 font-bold">SEJOUR</text>
                            <text x="32" y="65" fill="currentColor" fontSize="3" fontFamily="monospace" textAnchor="middle" className="text-accent/60">CHAMBRE</text>
                            <text x="68" y="35" fill="currentColor" fontSize="3" fontFamily="monospace" textAnchor="middle" className="text-accent/60">REPAS</text>
                            <text x="68" y="73" fill="currentColor" fontSize="3" fontFamily="monospace" textAnchor="middle" className="text-accent/60">BAIN / CHAUDIERE</text>
                          </svg>
                        </div>
                      </div>
                      <p className="text-stone-400 font-mono text-[9px] mt-4 uppercase tracking-widest flex items-center space-x-1">
                        <Info className="w-3.5 h-3.5 text-accent animate-pulse" />
                        <span>CADASTRE INTERACTIF · LEVÉ CONFORME COPROPRIÉTÉ UNITÉ TYPE B</span>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* In-depth text breakdown & developer narrative */}
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-dark font-medium tracking-tight">
                La vision architecturale &amp; pérennité des actifs
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-light font-sans">
                Chacun de nos programmes résidentiels d'adresse obéit à un cahier des charges d'une rigueur absolue : sélection d'emplacements d'adresse d'exception, performances thermiques d'avant-garde aux dernières normes et signature d'architecte affirmée. Lors de la conception de ce programme d'influence, la conciliation minutieuse d'une haute valeur patrimoniale et d'un confort de vie souverain a guidé chacun de nos arbitrages techniques.
              </p>
              <div className="p-6 bg-surface border-l-4 border-accent space-y-2 rounded-r-xl">
                <span className="block font-mono text-[9px] text-accent font-bold tracking-widest uppercase">STÉ EXPÉDITIVE FISCALE &amp; OPTIMISATION DE REVENUS</span>
                <p className="text-xs text-stone-700 leading-relaxed font-sans">
                  Ce programme intègre une ingénierie fiscale de pointe, particulièrement optimisée pour les investisseurs et chefs d'entreprise exigeants. Selon le lot sélectionné, les schémas d'amortissement de surperformance en LMNP de standing, le déficit foncier d'excellence ou la défiscalisation Monument Historique et loi Malraux sont pleinement activables. Cela permet un retour de cash-flow puissant dès les premières années de détention.
                </p>
              </div>
            </div>

            {/* Custom high-end interior features - beautiful list with visual highlights */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-6 pt-4">
                <h4 className="font-mono text-[10px] tracking-widest uppercase text-dark font-bold border-b border-border-beige pb-3">
                  CAHIER DES CHARGES INTÉRIEUR &amp; MATÉRIAUX NOBLES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((f, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-4 bg-stone-50 border border-border-beige/50 hover:bg-white hover:shadow-md transition-all duration-300 rounded-xl">
                      <div className="w-6 h-6 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center shrink-0 text-accent font-mono text-[10px] font-bold">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <span className="block text-xs font-semibold text-dark font-sans leading-snug">{f.split(' von ')[0]}</span>
                        <span className="block text-[11px] text-muted-gray mt-0.5 leading-snug font-light">{f}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Smaller Column (5/12 Width): Detailed Specs Table & Dynamic CTA Request Form */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            
            {/* Technical Specifications Summary Card */}
            <div className="bg-stone-50 border border-border-beige p-6 sm:p-8 space-y-6 rounded-2xl">
              <h3 className="font-mono text-[10px] tracking-widest uppercase text-dark font-bold border-b border-border-beige pb-3">
                FICHE TECHNIQUE DE L'ACTIF IMMOBILIER
              </h3>
              
              {project.specs && (
                <div className="divide-y divide-border-beige/60 text-xs sm:text-sm font-sans">
                  {project.specs.surface && (
                    <div className="flex justify-between py-3">
                      <span className="text-muted-gray font-light">Surface habitable brute</span>
                      <strong className="text-dark font-semibold">{project.specs.surface}</strong>
                    </div>
                  )}
                  {project.specs.units && (
                    <div className="flex justify-between py-3">
                      <span className="text-muted-gray font-light">Unités d'adresse projetées</span>
                      <strong className="text-dark font-semibold">{project.specs.units}</strong>
                    </div>
                  )}
                  {project.specs.energy && (
                    <div className="flex justify-between py-3">
                      <span className="text-muted-gray font-light">Label d'éco-efficience thermique</span>
                      <strong className="text-accent font-semibold">{project.specs.energy}</strong>
                    </div>
                  )}
                  {project.specs.heating && (
                    <div className="flex justify-between py-3">
                      <span className="text-muted-gray font-light">Génération d'énergie primaire</span>
                      <strong className="text-dark font-semibold">{project.specs.heating}</strong>
                    </div>
                  )}
                  {project.specs.volume && (
                    <div className="flex justify-between py-3">
                      <span className="text-muted-gray font-light">Volume d'investissement d'actifs</span>
                      <strong className="text-dark font-semibold">{project.specs.volume}</strong>
                    </div>
                  )}
                  {project.specs.heritageStat && (
                    <div className="flex justify-between py-3">
                      <span className="text-muted-gray font-light">Dispositif d'optimisation fiscale</span>
                      <strong className="text-accent font-semibold text-right max-w-[180px]">{project.specs.heritageStat}</strong>
                    </div>
                  )}
                </div>
              )}

              {/* Unique selling highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="pt-4 border-t border-border-beige space-y-3">
                  <span className="block font-mono text-[9px] text-dark font-bold tracking-widest uppercase">
                    POINTS ESSENTIELS DE RARETÉ FONCIÈRE
                  </span>
                  <ul className="space-y-2.5 text-xs text-stone-600 font-sans">
                    {project.highlights.map((hlt, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-light">{hlt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sophisticated Private Investor Document Portal */}
            <div className="bg-dark text-white p-6 sm:p-8 border border-white/5 relative overflow-hidden shadow-xl rounded-2xl">
              {/* Discrete gold card accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex items-center space-x-2.5">
                      <FileText className="w-5 h-5 text-accent shrink-0" />
                      <div>
                        <span className="block font-mono text-[9px] text-accent tracking-widest uppercase font-bold">EXPÉDITION SÉCURISÉ CONFIDENTIELLE</span>
                        <h4 className="font-serif text-lg font-bold tracking-tight text-white">Demander l'exposé complet</h4>
                      </div>
                    </div>

                    <p className="text-xs text-stone-400 leading-relaxed font-light font-sans max-w-sm">
                      Requérez le cahier des charges d'architecte, le rapport de diagnostic thermique et l'analyse d'amortissement fiscal pour <span className="text-white font-bold">{project.title}</span> de manière immédiate et protégée.
                    </p>

                    <div className="space-y-3.5">
                      <div>
                        <label className="block font-mono text-[8.5px] tracking-widest uppercase text-stone-300 font-bold mb-1.5">
                          NOM ET PRÉNOM DU COMMETTANT *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full bg-stone-900 border border-stone-800 font-sans text-xs text-white px-4 py-3 placeholder-stone-600 focus:border-accent outline-none transition-colors rounded-lg"
                          placeholder="ex. Jean-François Mercier"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[8.5px] tracking-widest uppercase text-stone-300 font-bold mb-1.5">
                          E-MAIL DE L'OFFICE NOTARIAL OU PRIVÉ *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full bg-stone-900 border border-stone-800 font-sans text-xs text-white px-4 py-3 placeholder-stone-600 focus:border-accent outline-none transition-colors rounded-lg"
                          placeholder="jf.mercier@cabinet-mercier.fr"
                        />
                      </div>

                      <div className="flex items-start space-x-2.5 pt-1">
                        <input
                          type="checkbox"
                          required
                          id="page-gdpr"
                          checked={contactForm.agreed}
                          onChange={(e) => setContactForm({ ...contactForm, agreed: e.target.checked })}
                          className="mt-1 h-3.5 w-3.5 border-stone-800 rounded-sm accent-accent cursor-pointer"
                        />
                        <label htmlFor="page-gdpr" className="text-[10px] text-stone-400 leading-normal font-sans cursor-pointer">
                          Je certifie la sincérité de mon identité d'adresse et autorise le cabinet à me contacter en toute réserve d'usage. *
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-accent text-dark font-mono text-xs font-bold tracking-widest uppercase py-4 hover:bg-white transition-colors duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-lg mt-2 rounded-lg"
                    >
                      <span>OBTENIR LES PIECES OFF-MARKET SÉCURISÉES</span>
                      <ArrowRight className="w-4 h-4 text-dark" />
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-5"
                  >
                    <div className="flex items-center space-x-2.5 pb-3 border-b border-stone-800">
                      <div className="w-8 h-8 rounded-full bg-accent/25 border border-accent/45 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4.5 h-4.5 text-accent" />
                      </div>
                      <div>
                        <span className="block font-mono text-[9px] text-accent tracking-widest uppercase font-bold">RAPPORT DE COMPILATION DU CABINET</span>
                        <h4 className="font-serif text-base font-bold text-white mt-0.5">Pièces réservées transmises</h4>
                      </div>
                    </div>

                    <div className="bg-stone-900/60 p-4 border border-stone-800 space-y-3 font-sans text-xs text-stone-300 rounded-xl">
                      <div className="flex justify-between items-center text-[9px] font-mono border-b border-stone-800 pb-2">
                        <span className="text-stone-500 text-[8px] uppercase">RÉFÉRENCE QUALIFIÉE :</span>
                        <span className="text-accent font-bold">AS-{project.id.toUpperCase()}-2026</span>
                      </div>
                      
                      <p className="leading-relaxed">
                        Validation d'adresse confirmée, Monsieur / Madame <strong className="text-white font-semibold">{contactForm.name}</strong>.
                      </p>
                      
                      <p className="text-[11px] text-stone-400 leading-relaxed font-light">
                        Un développeur-directeur d'arbitrage de notre cabinet PrimeImmobilier a validé la transmission du dossier d'architecture pour le programme d'adresse <span className="text-white font-medium">{project.title}</span>. Les états techniques Off-Market ont été cryptés et viennent de vous être d'envoyés avec succès à l'adresse <span className="text-accent underline">{contactForm.email}</span>.
                      </p>
                    </div>

                    <div className="border-l-2 border-accent pl-4 py-1">
                      <p className="text-[11px] text-stone-400 italic font-light">&bdquo;La discrétion est la plus solide des monnaies dans les segments d'investissements de prestige d'adresse. Nous restons à votre entière disposition.&ldquo;</p>
                      <span className="block text-[8px] font-mono text-white mt-1 uppercase tracking-widest">&mdash; Antoine de Saint-Florent, CEO</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setContactForm({ name: '', email: '', phone: '', agreed: false });
                      }}
                      className="w-full bg-stone-950 hover:bg-stone-900 border border-stone-800 text-stone-300 py-3 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer rounded-lg"
                    >
                      DEMANDER L'EXPOSÉ D'UN AUTRE ACTIF
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}
