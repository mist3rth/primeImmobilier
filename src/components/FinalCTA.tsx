import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, ArrowRight, CornerDownRight, CheckCircle2 } from 'lucide-react';

export default function FinalCTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    intent: 'Investissement Patrimonial',
    volume: '500k-1Mio',
    message: '',
    gdpr: false
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <section id="contact-cta" className="py-24 lg:py-36 bg-dark text-white relative overflow-hidden">
      {/* Background aesthetic details */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-12 left-10 w-96 h-96 bg-stone-800 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full px-[20px] relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
        
        {/* Left Column: CEO Portrait, Contact channels & sign off */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
          
          <div className="space-y-6">
            <span className="font-mono text-xs text-accent tracking-widest uppercase block font-semibold">
              ENTRETIEN SÉCURISÉ · CONTACT CONFIDENTIEL
            </span>
            <h2 className="font-serif text-[28px] sm:text-[39px] lg:text-[49px] leading-[1.1] tracking-[-0.02em] font-medium text-white">
              Investissez avec <span className="italic text-accent">vision et discernement</span>.
            </h2>
            <p className="text-stone-400 text-sm sm:text-base font-light leading-relaxed font-sans max-w-md">
              Vous souhaitez en savoir plus sur nos actifs immobiliers, nos opportunités d'adresse Off-Market confidentielles ou nos schémas d'optimisation fiscale ? Échangeons de vive voix.
            </p>
          </div>

          {/* CEO Card Model with real photo */}
          <div className="bg-stone-900 border border-stone-800 p-6 flex items-center space-x-6 rounded-2xl">
            <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 overflow-hidden bg-stone-800 border border-accent/20 rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80"
                alt="Portrait professionnel de Antoine de Saint-Florent, Directeur Général de PrimeImmobilier"
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="block font-serif text-lg font-bold text-white">Antoine de Saint-Florent</span>
              <span className="block text-xs font-mono text-accent tracking-widest uppercase mt-0.5">DIRECTEUR GÉNÉRAL</span>
              <p className="text-[11px] text-stone-400 italic mt-2 font-sans">
                &bdquo;L'investissement dans des bâtis d'architecture de premier rang est avant tout une histoire de confiance. Créons ensemble de la valeur pérenne.&ldquo;
              </p>
            </div>
          </div>

          {/* Direct channels */}
          <div className="space-y-4 border-t border-stone-800 pt-8">
            <a
              href="mailto:contact@primeimmobilier.fr"
              onClick={(e) => e.preventDefault()}
              className="flex items-center space-x-4 text-stone-300 hover:text-accent transition-colors group cursor-pointer"
            >
              <div className="p-2.5 bg-stone-900 border border-stone-850 text-accent group-hover:bg-accent group-hover:text-dark transition-all duration-300 rounded-lg">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-mono tracking-wider text-stone-500 uppercase">CANAL E-MAIL CONFIDENTIEL</span>
                <span className="text-sm font-semibold font-mono tracking-wide">contact@primeimmobilier.fr</span>
              </div>
            </a>

            <a
              href="tel:+33140506070"
              onClick={(e) => e.preventDefault()}
              className="flex items-center space-x-4 text-stone-300 hover:text-accent transition-colors group cursor-pointer"
            >
              <div className="p-2.5 bg-stone-900 border border-stone-850 text-accent group-hover:bg-accent group-hover:text-dark transition-all duration-300 rounded-lg">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-mono tracking-wider text-stone-500 uppercase">LIGNE CONFIDENTIELLE DIRECTE</span>
                <span className="text-sm font-semibold font-mono tracking-wide">+33 (0) 1 40 50 60 70</span>
              </div>
            </a>
          </div>

          <div className="text-[10px] font-mono text-stone-600 flex items-center space-x-2">
            <CornerDownRight className="w-3.5 h-3.5 text-accent" />
            <span>Disponibilité du secrétariat général : Lu - Ve · 08h30 à 18h30</span>
          </div>
        </div>

        {/* Right Column: High end enquiry gateway */}
        <div className="lg:col-span-7 bg-stone-950/60 border border-stone-850 p-8 sm:p-10 shadow-2xl relative rounded-2xl">
          
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="enquiry-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Intent Radio buttons */}
                <div>
                  <label className="block text-[10px] font-mono tracking-widest uppercase text-accent mb-3 font-semibold">
                    1. QUEL EST VOTRE OBJECTIF PRINCIPAL ? *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {['Investissement Patrimonial', 'Résidence de Prestige'].map((it) => (
                      <button
                        key={it}
                        type="button"
                        onClick={() => setFormData({ ...formData, intent: it })}
                        className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wider transition-all duration-300 border font-mono cursor-pointer rounded-lg ${
                          formData.intent === it
                            ? 'bg-accent/15 border-accent text-accent'
                            : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-white hover:border-stone-700'
                        }`}
                      >
                        {it}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Investment Category values */}
                <div>
                  <label className="block text-[10px] font-mono tracking-widest uppercase text-accent mb-3 font-semibold">
                    2. ENVELOPPE BUDGETAIRE ENVISAGEE *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { val: 'bis250k', label: 'Jusqu\'à 250 k€' },
                      { val: '250k-500k', label: 'Jusqu\'à 500 k€' },
                      { val: '500k-1Mio', label: 'Jusqu\'à 1 M€' },
                      { val: 'ueber1Mio', label: '1 M€ et plus' }
                    ].map((vol) => (
                      <button
                        key={vol.val}
                        type="button"
                        onClick={() => setFormData({ ...formData, volume: vol.val })}
                        className={`py-3 px-2 text-[10px] font-mono font-medium tracking-wide uppercase transition-all duration-300 border text-center cursor-pointer rounded-lg ${
                          formData.volume === vol.val
                            ? 'bg-accent text-dark border-accent font-bold'
                            : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700'
                        }`}
                      >
                        {vol.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Core text field sets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-stone-400 mb-1 font-bold">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jean-François Mercier"
                      className="w-full bg-stone-900 border border-stone-800 text-white text-xs px-4 py-3.5 focus:outline-none focus:border-accent font-sans transition-colors rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-stone-400 mb-1 font-bold">
                      Adresse e-mail valide *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jf.mercier@cabinet-mercier.fr"
                      className="w-full bg-stone-900 border border-stone-800 text-white text-xs px-4 py-3.5 focus:outline-none focus:border-accent font-sans transition-colors rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-stone-400 mb-1 font-bold">
                      Numéro de téléphone direct (Pour clarifications confidentielles)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+33 (0) 6 12 34 56 78"
                      className="w-full bg-stone-900 border border-stone-800 text-white text-xs px-4 py-3.5 focus:outline-none focus:border-accent font-sans transition-colors rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-wider uppercase text-stone-400 mb-1 font-bold">
                    Votre projet d'acquisition / Souhaits individuels (optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Décrivez brièvement les contours de votre projet d'investissement ou vos conditions géographiques de recherche..."
                    className="w-full bg-stone-900 border border-stone-800 text-white text-xs px-4 py-3.5 focus:outline-none focus:border-accent font-sans transition-colors resize-none rounded-lg"
                  />
                </div>

                {/* Consent checkbox */}
                <div className="flex items-start space-x-2.5">
                  <input
                    type="checkbox"
                    required
                    id="gdpr-agree"
                    checked={formData.gdpr}
                    onChange={(e) => setFormData({ ...formData, gdpr: e.target.checked })}
                    className="mt-1 accent-accent"
                  />
                  <label htmlFor="gdpr-agree" className="text-[10px] text-stone-450 leading-relaxed font-sans cursor-pointer">
                    J'autorise PrimeImmobilier à traiter mes coordonnées cryptées de manière sécurisée afin de planifier mon entretien d'orientation personnalisé et de me conseiller confidentiellement, conformément à la charte de confidentialité. *
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent text-dark font-mono text-xs font-bold tracking-widest uppercase py-4 hover:bg-white transition-colors duration-300 flex justify-center items-center space-x-2 cursor-pointer mt-4 rounded-lg"
                >
                  <span>DEMANDER UN ENTRETIEN CONSEIL DIRECT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="enquiry-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-left space-y-6"
              >
                <div className="flex items-center space-x-3 pb-4 border-b border-stone-800">
                  <div className="w-12 h-12 bg-accent/20 text-accent rounded-full flex items-center justify-center border border-accent/30 shrink-0">
                    <CheckCircle2 className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] text-accent tracking-widest uppercase font-bold">DEMANDE ADRESSE ENREGISTRÉE</span>
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-medium mt-0.5">Demande d'entretien de premier rang</h3>
                  </div>
                </div>

                <div className="bg-stone-900 border border-stone-800 p-6 space-y-5 font-sans text-xs rounded-xl">
                  <div className="flex justify-between items-center text-[10px] font-mono border-b border-stone-800/80 pb-3">
                    <span className="text-stone-400 uppercase">IDENTIFIANT DOSSIER :</span>
                    <span className="text-accent font-bold tracking-wider">AS-REQ-2026-N49B7</span>
                  </div>

                  <div className="space-y-3">
                    <span className="block font-mono text-[9px] text-stone-400 tracking-wider uppercase font-bold text-[8px]">RAPPORT D'INSTRUCTION ET D'AUDIT</span>
                    
                    <div className="flex justify-between text-stone-300">
                      <span>Mandant demandeur :</span>
                      <span className="text-white font-semibold">{formData.name}</span>
                    </div>

                    <div className="flex justify-between text-stone-300">
                      <span>Cahier des charges :</span>
                      <span className="text-accent font-semibold">{formData.intent}</span>
                    </div>

                    <div className="flex justify-between text-stone-300">
                      <span>Enveloppe planifiée :</span>
                      <span className="text-white font-semibold">{formData.volume === 'bis250k' ? 'Jusqu\'à 250 k€' : formData.volume === '250k-500k' ? 'Jusqu\'à 500 k€' : formData.volume === '500k-1Mio' ? 'Jusqu\'à 1 M€' : '1 M€ et plus'}</span>
                    </div>

                    <div className="flex justify-between text-stone-300">
                      <span>Statut de traitement :</span>
                      <span className="text-emerald-500 font-bold font-mono text-[10px] uppercase">Priorité Élevée d'Administration</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-800/80 space-y-2">
                    <span className="block font-mono text-[9px] text-stone-400 tracking-wider uppercase font-bold text-[8px]">PROCHAINES ETAPES DU CLIENT</span>
                    <ul className="space-y-1.5 text-[11px] text-stone-400 list-inside list-disc">
                      <li>Attribution de votre dossier d'ingénierie à un architecte directeur projets immobiliers</li>
                      <li>Constitution d'une sélection d'actifs Off-Market d'adresse répondant rigoureusement à vos critères</li>
                      <li>Prise de contact téléphonique direct sous 24 heures ouvrées pour coordonner un entretien à notre bureau</li>
                    </ul>
                  </div>
                </div>

                <div className="border-l-2 border-accent pl-4 py-1.5">
                  <p className="text-xs text-stone-400 italic leading-relaxed">
                    &bdquo;Je vous remercie personnellement pour l'expression de votre confiance. Notre cabinet s'attache à traiter votre demande sous le sceau de la confidentialité et de la discrétion d'adresse absolue.&ldquo;
                  </p>
                  <span className="block text-[9px] font-mono tracking-widest text-white uppercase mt-2 font-bold">
                    &mdash; Antoine de Saint-Florent, CEO
                  </span>
                </div>

                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      intent: 'Investissement Patrimonial',
                      volume: '500k-1Mio',
                      message: '',
                      gdpr: false
                    });
                  }}
                  className="w-full bg-accent text-dark font-mono text-xs font-bold tracking-widest uppercase py-3.5 hover:bg-white transition-colors duration-300 cursor-pointer rounded-lg"
                >
                  PLANIFIER UN NOUVEL ENTRETIEN CONSEIL
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
