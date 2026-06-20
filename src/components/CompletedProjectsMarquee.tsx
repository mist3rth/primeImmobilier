import { BadgeCheck, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../constants/data';

export default function CompletedProjectsMarquee() {
  // Extract real completed projects with enriched specifications
  const completedProjects = PROJECTS.filter(p => p.status === 'completed');
  
  // Duplicate the list of completed projects to ensure seamless, infinite loop scrolling
  const duplicatedItems = [...completedProjects, ...completedProjects, ...completedProjects, ...completedProjects];

  const handleOpenDetails = (id: string) => {
    window.dispatchEvent(new CustomEvent('open-project-details', { detail: id }));
  };

  return (
    <section id="completed-projects" className="py-20 lg:py-28 bg-surface overflow-hidden border-t border-b border-border-beige">
      <div className="w-full px-[20px] mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4 font-semibold">
              HISTORIQUE DES PROJETS · RÉALISATIONS
            </span>
            <h2 className="font-serif text-[32px] sm:text-[40px] leading-tight text-dark font-medium">
              Propriétés <span className="italic text-accent">vendues et livrées</span> avec succès.
            </h2>
          </div>
          <p className="text-muted-gray text-xs sm:text-sm max-w-sm mt-4 md:mt-0 font-light font-sans">
            Une sélection de réalisations résidentielles contemporaines et de monuments historiques réhabilités d'exception, livrés clés en main.
          </p>
        </div>
      </div>

      {/* Infinite Horizontal CSS Marquee */}
      <div className="relative w-full overflow-hidden select-none py-4 bg-white/40">
        {/* Subtle shadow vignettes to blend edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-infinite flex gap-8 font-sans">
          {duplicatedItems.map((item, index) => (
            <button
              key={`${item.id}-${index}`}
              onClick={() => handleOpenDetails(item.id)}
              className="w-[280px] sm:w-[350px] shrink-0 bg-white border border-border-beige p-4 transition-all duration-300 hover:shadow-lg group cursor-pointer text-left focus:outline-none rounded-2xl"
            >
              {/* Image box */}
              <div className="relative aspect-[3/2] overflow-hidden bg-stone-100 mb-4 rounded-xl">
                <img
                  src={item.image}
                  alt={`Photographie haute fidélité extérieure de la résidence d'exception ${item.title}`}
                  className="w-full h-full object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Minimalist floating year badge */}
                <span className="absolute bottom-2 right-2 bg-dark/95 text-white font-mono text-[9px] tracking-widest px-2.5 py-1 rounded-md">
                  {item.year}
                </span>

                <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white text-dark text-[15px] sm:text-[9px] font-mono font-bold tracking-widest py-2.5 px-4 uppercase flex items-center space-x-1 shadow-lg rounded-lg">
                    <span>VOIR LE PROJET</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Text row */}
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-serif text-lg font-bold text-dark group-hover:text-accent transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-xs text-muted-gray block font-light">
                    {item.location}
                  </span>
                </div>

                <div className="text-right">
                  <span className="block text-[10px] font-mono text-dark font-semibold">
                    {item.specs?.volume || 'N/A'}
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-emerald-600 font-bold uppercase flex items-center justify-end space-x-0.5">
                    <BadgeCheck className="w-3 h-3 text-emerald-600" />
                    <span>{item.badge}</span>
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
