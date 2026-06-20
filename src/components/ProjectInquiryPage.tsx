import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ArrowLeft, MapPin, Calendar, Check, 
  FileText, CheckCircle2, ArrowRight
} from 'lucide-react';
import { PROJECTS } from '../constants/data';
import { useNavigation } from '../context/NavigationContext';

interface ProjectInquiryPageProps {
  projectId: string;
}

export default function ProjectInquiryPage({ projectId }: ProjectInquiryPageProps) {
  const { closeProjectOrPillar } = useNavigation();
  const project = PROJECTS.find(p => p.id === projectId);
  
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

  const detailY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [projectId]);

  if (!project) {
    return (
      <div className="pt-28 pb-20 w-full px-[20px] text-center">
        <p className="text-muted-gray mb-4">Projet non trouvé dans nos bases.</p>
        <button 
          onClick={() => closeProjectOrPillar('active-projects')} 
          className="bg-dark text-white px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-dark cursor-pointer rounded-lg"
        >
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
            onClick={() => closeProjectOrPillar('active-projects')}
            className="group flex items-center space-x-2 text-dark hover:text-accent font-mono tracking-widest uppercase font-bold text-left transition-all duration-300 focus:outline-none cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>RETOUR AUX PROJETS</span>
          </button>
          
          <div className="flex items-center space-x-2 text-muted-gray font-sans font-light">
            <span className="hover:text-dark cursor-pointer transition-colors" onClick={() => closeProjectOrPillar('top')}>Accueil</span>
            <span>/</span>
            <span className="hover:text-dark cursor-pointer transition-colors" onClick={() => closeProjectOrPillar('active-projects')}>Projets</span>
            <span>/</span>
            <span className="hover:text-dark cursor-pointer transition-colors" onClick={() => closeProjectOrPillar('active-projects')}>{project.title}</span>
            <span>/</span>
            <span className="text-dark font-medium">Demande d'exposé</span>
          </div>
        </div>
      </div>

      {/* Main Page Content Body */}
      <div className="w-full px-[20px] py-12 lg:py-20 font-sans">
        
        {/* Title Presentation Section */}
        <div className="mb-12 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase border border-accent/40 bg-accent/5 text-accent rounded-full">
              DEMANDE CONFIDENTIELLE
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-muted-gray tracking-wider">
              PIÈCES OFF-MARKET · DOSSIER DE RÉSERVATION · ID : {project.id.toUpperCase()}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.02em] text-dark font-medium max-w-4xl">
            Demander l'exposé de <span className="italic text-accent">{project.title}</span>
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
          </div>
        </div>

        {/* 12-Column Balanced Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (7/12 Width): Visual Summary of the asset */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Visual Aspect container */}
            <div ref={detailImageContainerRef} className="relative aspect-[16/10] bg-stone-900 border border-border-beige overflow-hidden rounded-2xl">
              <div className="absolute inset-0 w-full h-[116%] top-[-8%] overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={`Restauration ou construction réelle du projet ${project.title}`}
                  style={{ y: detailY }}
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-cover transition-[filter,opacity] duration-1000 ${
                    imageLoaded ? 'scale-100 blur-0' : 'scale-105 blur-md'
                  }`}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark/45 via-transparent to-transparent pointer-events-none z-10" />
            </div>

            {/* Description & Technical Summary */}
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-dark font-medium tracking-tight">
                À propos de cette réalisation
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-light font-sans">
                {project.description}
              </p>
              
              {project.specs && (
                <div className="bg-stone-50 border border-border-beige p-6 rounded-xl space-y-4">
                  <h4 className="font-mono text-[10px] tracking-widest uppercase text-dark font-bold border-b border-border-beige pb-2">
                    CARACTÉRISTIQUES CLÉS
                  </h4>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-xs font-sans">
                    {project.specs.surface && (
                      <div className="flex justify-between py-1 border-b border-border-beige/50">
                        <span className="text-muted-gray">Surface brute</span>
                        <strong className="text-dark">{project.specs.surface}</strong>
                      </div>
                    )}
                    {project.specs.units && (
                      <div className="flex justify-between py-1 border-b border-border-beige/50">
                        <span className="text-muted-gray">Unités d'adresse</span>
                        <strong className="text-dark">{project.specs.units}</strong>
                      </div>
                    )}
                    {project.specs.energy && (
                      <div className="flex justify-between py-1 border-b border-border-beige/50">
                        <span className="text-muted-gray">Label éco-efficience</span>
                        <strong className="text-accent">{project.specs.energy}</strong>
                      </div>
                    )}
                    {project.specs.volume && (
                      <div className="flex justify-between py-1 border-b border-border-beige/50">
                        <span className="text-muted-gray">Volume d'actifs</span>
                        <strong className="text-dark">{project.specs.volume}</strong>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (5/12 Width): Premium Form */}
          <div className="lg:col-span-5">
            <div className="bg-dark text-white p-6 sm:p-10 border border-white/5 relative overflow-hidden shadow-xl rounded-3xl">
              {/* Discrete gold card accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-accent shrink-0" />
                      <div>
                        <span className="block font-mono text-[9px] text-accent tracking-widest uppercase font-bold">ACCÈS DIRECT OFF-MARKET</span>
                        <h4 className="font-serif text-lg font-bold tracking-tight text-white">Demande de l'Exposé Privé</h4>
                      </div>
                    </div>

                    <p className="text-xs text-stone-400 leading-relaxed font-light font-sans">
                      Bénéficiez d'un accès immédiat confidentiel aux plans d'architecte, cahiers des charges, prix exclusifs de vente et simulations fiscales personnalisées de nos ingénieurs pour <span className="text-white font-medium">{project.title}</span>.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="block font-mono text-[9px] tracking-widest uppercase text-stone-300 font-bold mb-1.5">
                          Nom complet *
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
                        <label className="block font-mono text-[9px] tracking-widest uppercase text-stone-300 font-bold mb-1.5">
                          Adresse e-mail valide *
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

                      <div>
                        <label className="block font-mono text-[9px] tracking-widest uppercase text-stone-300 font-bold mb-1.5">
                          Numéro de téléphone (optionnel)
                        </label>
                        <input
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full bg-stone-900 border border-stone-800 font-sans text-xs text-white px-4 py-3 placeholder-stone-600 focus:border-accent outline-none transition-colors rounded-lg"
                          placeholder="+33 (0) 6 12 34 56 78"
                        />
                      </div>

                      <div className="flex items-start space-x-2.5 pt-1">
                        <input
                          type="checkbox"
                          required
                          id="inquiry-gdpr"
                          checked={contactForm.agreed}
                          onChange={(e) => setContactForm({ ...contactForm, agreed: e.target.checked })}
                          className="mt-1 h-3.5 w-3.5 border-stone-800 rounded-sm accent-accent cursor-pointer"
                        />
                        <label htmlFor="inquiry-gdpr" className="text-[10px] text-stone-400 leading-normal font-sans cursor-pointer">
                          J'autorise PrimeImmobilier à traiter mes coordonnées de manière cryptée afin de m'adresser le dossier d'exposé et de me conseiller conformément à la politique de confidentialité d'adresse. *
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-accent text-dark font-mono text-xs font-bold tracking-widest uppercase py-4 hover:bg-white transition-colors duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-lg rounded-lg"
                    >
                      <span>TRANSMETTRE LA DEMANDE D'EXPÉDITION</span>
                      <ArrowRight className="w-4 h-4 text-dark" />
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center space-x-3 pb-3 border-b border-stone-800">
                      <div className="w-8 h-8 rounded-full bg-accent/25 border border-accent/45 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4.5 h-4.5 text-accent" />
                      </div>
                      <div>
                        <span className="block font-mono text-[9px] text-accent tracking-widest uppercase font-bold">DEMANDE CERTIFIÉE</span>
                        <h4 className="font-serif text-base font-bold text-white mt-0.5">Dossier confidentiel alloué</h4>
                      </div>
                    </div>

                    <div className="bg-stone-900/60 p-4 border border-stone-800 space-y-3 font-sans text-xs text-stone-300 rounded-xl">
                      <div className="flex justify-between items-center text-[9px] font-mono border-b border-stone-800 pb-2">
                        <span className="text-stone-500 text-[8px] uppercase">RÉFÉRENCE QUALIFIÉE :</span>
                        <span className="text-accent font-bold">AS-{project.id.toUpperCase()}-EXP-2026</span>
                      </div>
                      
                      <p className="leading-relaxed">
                        Validation d'adresse confirmée, Monsieur / Madame <strong className="text-white font-semibold">{contactForm.name}</strong>.
                      </p>
                      
                      <p className="text-[11px] text-stone-400 leading-relaxed font-light font-sans">
                        Les pièces techniques Off-Market pour le programme <span className="text-white font-medium">{project.title}</span> ont été générées et envoyées avec succès à l'adresse <span className="text-accent underline">{contactForm.email}</span>. Un directeur de cabinet est également prévenu de votre démarche.
                      </p>
                    </div>

                    <div className="border-l-2 border-accent pl-4 py-1">
                      <p className="text-[11px] text-stone-400 italic font-light leading-relaxed">&bdquo;Votre intérêt pour nos bâtis d'architecture d'auteur nous honore. Nos documents confidentiels répondent aux plus hauts standards d'ingénierie bancaire. Je m'engage personnellement à vous garantir une discrétion totale.&ldquo;</p>
                      <span className="block text-[8px] font-mono text-white mt-1 uppercase tracking-widest">&mdash; Antoine de Saint-Florent, CEO PrimeImmobilier</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => closeProjectOrPillar('active-projects')}
                      className="w-full bg-stone-950 hover:bg-stone-900 border border-stone-800 text-stone-300 py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer rounded-lg"
                    >
                      RETOURNER AUX PROJETS
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
