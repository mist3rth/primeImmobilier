import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { MapPin, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { PROJECTS } from '../constants/data';
import { Project } from '../types';
import { useNavigation } from '../context/NavigationContext';

interface ProjectCardProps {
  p: Project;
  idx: number;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
  key?: React.Key;
}

function ProjectCard({ p, idx, setSelectedProject }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { openProject } = useNavigation();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Direct, instant, lightweight compositor-friendly translation without spring delay
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: idx * 0.15 }}
      className="bg-surface border border-border-beige overflow-hidden group flex flex-col h-full hover:shadow-xl transition-all duration-500 rounded-2xl"
    >
      {/* Media Block container */}
      <div className="relative aspect-[3/2] overflow-hidden bg-stone-200">
        <div className="absolute inset-0 w-full h-[116%] top-[-8%] overflow-hidden">
          <motion.img
            src={p.image}
            alt={`Rendu 3D exclusif haute définition ou plan de masse de la résidence ${p.title}`}
            style={{ y }}
            className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-[filter] duration-700"
            referrerPolicy="no-referrer"
          />
        </div>
        
        {/* Status Dot Pill badge */}
        <span className="absolute top-4 left-4 z-15 bg-dark/90 backdrop-blur-sm px-3 py-1 font-mono text-[9px] font-bold text-white uppercase tracking-widest flex items-center space-x-2 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>{p.badge}</span>
        </span>

        <span className="absolute bottom-4 right-4 z-15 bg-white px-2.5 py-1 font-mono text-[9px] text-dark font-medium border border-border-beige uppercase rounded-md">
          {p.year}
        </span>
      </div>

      {/* Core Context box */}
      <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center space-x-1.5 text-accent mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span className="font-mono text-[10px] tracking-wider uppercase font-semibold">
              {p.location}
            </span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-dark mb-3 tracking-tight group-hover:text-accent transition-colors duration-200">
            {p.title}
          </h3>

          <p className="text-muted-gray text-xs sm:text-sm font-light font-sans leading-relaxed mb-6">
            {p.description}
          </p>
        </div>

        {/* Specific features grid inside cards */}
        <div className="mt-auto space-y-6 font-sans">
          <div className="grid grid-cols-2 gap-4 border-t border-b border-border-beige/60 py-4">
            <div>
              <span className="block text-[9px] font-mono text-muted-gray tracking-wider uppercase">UNITÉS</span>
              <span className="block text-xs font-semibold text-dark mt-0.5">{p.specs?.units || 'Secteur Résidentiel'}</span>
            </div>
            <div>
              <span className="block text-[9px] font-mono text-muted-gray tracking-wider uppercase">ÉNERGIE</span>
              <span className="block text-xs font-semibold text-accent mt-0.5">{p.specs?.energy || 'Standard Bas Carbone'}</span>
            </div>
          </div>

          {/* Responsive stacked action triggers */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={() => setSelectedProject(p)}
              className="flex-1 bg-dark hover:bg-accent text-white hover:text-dark py-3.5 px-3 text-center text-[10px] font-bold tracking-widest uppercase transition-all duration-300 flex justify-center items-center space-x-1.5 cursor-pointer rounded-lg"
            >
              <span>DEMANDER L'EXPOSÉ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            
            <button
              onClick={() => openProject(p.id)}
              className="flex-1 border border-dark/20 hover:border-black hover:bg-stone-50 text-dark py-3.5 px-3 text-center text-[10px] font-bold tracking-widest uppercase transition-all duration-300 flex justify-center items-center space-x-1.5 cursor-pointer rounded-lg"
            >
              <span>DÉTAILS DU PROJET</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ActiveProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    agreed: false
  });

  const activeProjects = PROJECTS.filter((p) => p.status === 'active');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="active-projects" className="py-24 lg:py-36 bg-white relative">
      <div className="w-full px-[20px]">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 lg:mb-20">
          <div>
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4 font-semibold">
              INVESTISSEMENTS ACTUELS · PORTFOLIO
            </span>
            <h2 className="font-serif text-[28px] sm:text-[39px] lg:text-[49px] leading-[1.1] tracking-[-0.02em] text-dark font-medium">
              Projets d'adresse en cours de <span className="italic text-accent">développement</span>.
            </h2>
          </div>
          <p className="text-muted-gray text-xs sm:text-sm max-w-sm mt-4 md:mt-0 font-light leading-relaxed font-sans">
            Sécurisez vos parts ou lots de standing en avant-première dans des emplacements prestigieux avant le lancement officiel de la commercialisation publique.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {selectedProject ? (
            <motion.div
              key="inquiry-form-container"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-stone-50 border border-border-beige max-w-2xl mx-auto p-6 sm:p-10 rounded-2xl relative shadow-sm"
            >
              <button
                onClick={() => {
                  setSelectedProject(null);
                  setIsSubmitted(false);
                  setContactForm({ name: '', email: '', phone: '', agreed: false });
                }}
                className="absolute top-6 right-6 text-stone-400 hover:text-dark cursor-pointer transition-colors p-1.5 rounded-full hover:bg-stone-100"
                aria-label="Retour aux projets"
              >
                <X className="w-5 h-5" />
              </button>

              {!isSubmitted ? (
                <>
                  <span className="font-mono text-[9px] tracking-widest text-accent uppercase block mb-2 font-bold">
                    DEMANDE SANS ENGAGEMENT
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-dark mb-2">
                    Exposé de « {selectedProject.title} »
                  </h3>
                  <p className="text-xs text-muted-gray mb-6 leading-relaxed">
                    Bénéficiez d'un accès immédiat confidentiel aux plans d'architecte, cahiers des charges, prix exclusifs de vente et simulations fiscales personnalisées de nos ingénieurs.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono tracking-wider uppercase text-dark mb-1 font-bold">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="ex. Jean-François Mercier"
                        className="w-full bg-white border border-border-beige text-dark text-xs px-4 py-3 focus:outline-none focus:border-accent transition-colors rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono tracking-wider uppercase text-dark mb-1 font-bold">
                        Adresse e-mail valide *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="jf.mercier@cabinet-mercier.fr"
                        className="w-full bg-white border border-border-beige text-dark text-xs px-4 py-3 focus:outline-none focus:border-accent transition-colors rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono tracking-wider uppercase text-dark mb-1 font-bold">
                        Numéro de téléphone (optionnel)
                      </label>
                      <input
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="+33 (0) 6 12 34 56 78"
                        className="w-full bg-white border border-border-beige text-dark text-xs px-4 py-3 focus:outline-none focus:border-accent transition-colors rounded-lg"
                      />
                    </div>

                    <div className="flex items-start space-x-2 pt-2">
                      <input
                        type="checkbox"
                        required
                        id="agree-checking"
                        checked={contactForm.agreed}
                        onChange={(e) => setContactForm({ ...contactForm, agreed: e.target.checked })}
                        className="mt-1 accent-accent text-accent"
                      />
                      <label htmlFor="agree-checking" className="text-[10px] text-muted-gray leading-tight cursor-pointer">
                        J'autorise PrimeImmobilier à traiter mes coordonnées de manière cryptée afin de m'adresser le dossier d'exposé et de me conseiller conformément à la politique de confidentialité d'adresse. *
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-dark hover:bg-accent text-white hover:text-dark py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex justify-center items-center space-x-2 cursor-pointer mt-4 rounded-lg"
                    >
                      <span>TRANSMETTRE LA DEMANDE D'EXPÉDITION</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-left py-1 space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b border-border-beige">
                    <div className="w-10 h-10 bg-accent/10 text-accent rounded-full flex items-center justify-center border border-accent/20 shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-mono text-[9px] text-accent tracking-widest uppercase font-bold">DEMANDE CERTIFIÉE</span>
                      <h3 className="font-serif text-lg sm:text-xl text-dark font-medium leading-none mt-1">Dossier confidentiel alloué</h3>
                    </div>
                  </div>

                  <div className="bg-surface border border-border-beige p-5 space-y-4 font-sans text-xs rounded-xl">
                    <div className="flex justify-between items-center text-[10px] font-mono border-b border-border-beige/70 pb-2">
                      <span className="text-muted-gray uppercase">ID DE TRANSACTION :</span>
                      <span className="text-dark font-bold tracking-wider">AS-{selectedProject.id.toUpperCase()}-EXP-2026</span>
                    </div>

                    <div className="space-y-2.5">
                      <span className="block font-mono text-[9px] text-muted-gray tracking-wider uppercase font-bold">RAPPORT DE COMPILATION EXPÉDIÉ</span>
                      
                      <div className="flex items-center justify-between text-stone-600">
                        <span className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          <span>1. Exposé d'implantation détaillé ({selectedProject.title})</span>
                        </span>
                        <span className="font-mono text-[10px] text-emerald-600 font-bold">LIVRÉ</span>
                      </div>

                      <div className="flex items-center justify-between text-stone-600">
                        <span className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          <span>2. Cadastre et repères d'aménagements fonciers</span>
                        </span>
                        <span className="font-mono text-[10px] text-emerald-600 font-bold">LIVRÉ</span>
                      </div>

                      <div className="flex items-center justify-between text-stone-600">
                        <span className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          <span>3. Bilans d'ingénierie et simulations fiscales d'amortissement</span>
                        </span>
                        <span className="font-mono text-[10px] text-amber-600 font-bold animate-pulse">COMPILATION RÉSIDENTIELLE</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border-beige/70 flex flex-col sm:flex-row sm:justify-between text-[10px] text-muted-gray gap-1">
                      <span>Destinataire : <strong className="text-dark font-semibold">{contactForm.name}</strong></span>
                      <span>E-mail direct : <strong className="text-dark font-semibold">{contactForm.email}</strong></span>
                    </div>
                  </div>

                  <div className="border-l-2 border-accent pl-4 py-1">
                    <p className="text-xs text-muted-gray italic leading-relaxed">
                      &bdquo;Votre intérêt pour nos bâtis d'architecture d'auteur nous honore. Nos documents confidentiels répondent aux plus hauts standards d'ingénierie bancaire. Je m'engage personnellement à vous garantir une discrétion totale.&ldquo;
                    </p>
                    <span className="block text-[9px] font-mono tracking-widest text-dark uppercase mt-2 font-bold">
                      &mdash; Antoine de Saint-Florent, CEO PrimeImmobilier
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      setIsSubmitted(false);
                      setContactForm({ name: '', email: '', phone: '', agreed: false });
                    }}
                    className="w-full bg-dark hover:bg-accent text-white hover:text-dark py-3.5 text-xs font-bold tracking-widest uppercase transition-colors duration-300 cursor-pointer rounded-lg"
                  >
                    RETOURNER AUX PROJETS
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="projects-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
            >
              {activeProjects.map((p, idx) => (
                <ProjectCard
                  key={p.id}
                  p={p}
                  idx={idx}
                  setSelectedProject={setSelectedProject}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
