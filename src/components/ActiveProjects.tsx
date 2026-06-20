import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../constants/data';
import { Project } from '../types';
import { useNavigation } from '../context/NavigationContext';

interface ProjectCardProps {
  p: Project;
  idx: number;
}

function ProjectCard({ p, idx }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { openProject, openInquiry } = useNavigation();

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
              onClick={() => openInquiry(p.id)}
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
  const activeProjects = PROJECTS.filter((p) => p.status === 'active');

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {activeProjects.map((p, idx) => (
            <ProjectCard
              key={p.id}
              p={p}
              idx={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

