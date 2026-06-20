import { motion } from 'motion/react';
import { X, Shield, Scale, Info } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'mentions' | 'privacy' | 'cgv' | null;
}

export default function LegalModal(props: LegalModalProps) {
  const { isOpen, onClose, type } = props;

  if (!isOpen || !type) return null;

  const getContent = () => {
    switch (type) {
      case 'mentions':
        return {
          title: 'Mentions Légales',
          icon: <Info className="w-5 h-5 text-accent" />,
          sections: [
            {
              subtitle: '1. Éditeur de la Solution numérique',
              content:
                "Le présent site internet est édité et exploité sous la responsabilité exclusive de PrimeImmobilier S.A.S., société par actions simplifiée au capital social de 2 500 000 €, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro B 102 345 678. Siège social : 142 Avenue des Champs-Élysées, 75008 Paris, France. Numéro de TVA Intracommunautaire : FR 48 304 992 001.",
            },
            {
              subtitle: '2. Direction de la Publication',
              content:
                "Le directeur de la publication et responsable du traitement éditorial est Monsieur Thomas Thiessson, agissant en qualité de Président Directeur Général et Fondateur principal de l'entité PrimeImmobilier.",
            },
            {
              subtitle: '3. Hébergement du Service',
              content:
                "Le site de démonstration applicative et le serveur d'hébergement cloud associé sont opérés par Google Cloud Platform (Europe-West2, Londres) et administrés dans des conditions de haute disponibilité et sécurité réseau chiffrée de bout en bout.",
            },
            {
              subtitle: '4. Propriété Intellectuelle & Droits réservés',
              content:
                "L'intégralité du contenu présent sur cette application, y compris mais sans s'y limiter, les graphismes d'exception, les photographies de réhabilitations, les simulations géographiques, les chartes de couleurs d'art de luxe, la marque figurative ainsi que les codes-sources applicatifs, demeurent la propriété exclusive de PrimeImmobilier ou de ses partenaires habilités. Toute reproduction partielle ou complète sans accord écrit préalable de la direction s'assimile à un acte de contrefaçon passible de sanctions judiciaires.",
            },
          ],
        };
      case 'privacy':
        return {
          title: 'Politique de Confidentialité',
          icon: <Shield className="w-5 h-5 text-accent" />,
          sections: [
            {
              subtitle: '1. Collecte et Intégrité des Données',
              content:
                "PrimeImmobilier accorde une importance absolue à la confidentialité de vos investissements et données privées. Lorsque vous utilisez nos formulaires de contact pour commander une brochure, demander une étude fiscale personnalisée ou planifier un rendez-vous d'affaires avec un conseiller principal, les renseignements personnels collectés (Nom, Prénom, Courriel, Numéro de téléphone, Capacité estimée de financement) sont traités strictement dans le respect du Règlement Général européen sur la Protection des Données (RGPD).",
            },
            {
              subtitle: '2. Destinataires et Sécurité Strictement Encadrée',
              content:
                "Vos informations sont traitées par le seul pôle d'ingénierie interne et ne sont en aucun cas revendues, louées ou transmises à d'autres structures commerciales tierces. Nos protocoles de sécurité logicielle incluent des bases de données internes sécurisées et des communications de formulaires hautement protégées par chiffrement SSL standard.",
            },
            {
              subtitle: '3. Vos Droits Conférés par le RGPD',
              content:
                "Conformément à la réglementation européenne, vous jouissez d'un droit permanent d'accès, d'opposition, de rectification, de portabilité et de suppression définitive de l'ensemble de vos données nominatives. Pour exercer ce droit avec effet immédiat, vous pouvez adresser votre requête officielle à notre Délégué à la Protection des Données à l'adresse suivante : dpo@primeimmobilier.fr ou par courrier à notre siège parisien.",
            },
            {
              subtitle: '4. Traceurs & Cookies de Performance',
              content:
                "Ce site exploite exclusivement des traceurs de session et de mesure analytique anonyme de trafic à visée d'amélioration de l'expérience utilisateur, n'impactant aucunement l'intégrité de vos profils ou appareils.",
            },
          ],
        };
      case 'cgv':
        return {
          title: "Conditions Générales d'Utilisation & Ventes",
          icon: <Scale className="w-5 h-5 text-accent" />,
          sections: [
            {
              subtitle: '1. Cadre d\'Application des CGV/CGU',
              content:
                "Les présentes conditions générales définissent les termes d'accès et d'utilisation du portail de présentation d'actifs immobiliers de prestige PrimeImmobilier. En consultant ou en entrant en relation via notre plateforme, l'utilisateur accepte sans réserve l'intégralité des clauses détaillées ci-après.",
            },
            {
              subtitle: '2. Nature Purement Présentative des Offres',
              content:
                "Toutes les fiches descriptives d'immeubles contemporains d'exception ou de monuments d'art historiques en réhabilitation figurant sur la plateforme constituent des présentations indicatives de projets de développement. Seul le contrat d'acquisition final signé en étude notariale (par acte d'acquisition en l'état futur d'achèvement - VEFA ou contrat de restauration) fait foi d'accord engageant entre les parties.",
            },
            {
              subtitle: '3. Investissements, Garanties et Précautions de Financement',
              content:
                "La souscription à des dispositifs fiscaux complexes d'exception (tels que la Loi Monument Historique, Loi Malraux ou surperformance de type LMNP) requiert un audit fin de la situation fiscale personnelle de l'acheteur. PrimeImmobilier conseille vivement d'associer un conseiller fiscal agréé au processus de prise de décision.",
            },
            {
              subtitle: '4. Clause d\'Attribution de Juridiction',
              content:
                "Tout litige relatif à l'usage de ce portail, aux enquêtes documentaires lancées ou aux relations précontractuelles associées, sera régi de façon exclusive par la loi nationale française et relèvera de la haute compétence des tribunaux judiciaires civils et de commerce du ressort de Paris.",
            },
          ],
        };
      default:
        return { title: 'Informations Légales', icon: <Info className="w-5 h-5" />, sections: [] };
    }
  };

  const { title, icon, sections } = getContent();

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-dark/70 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', duration: 0.35, bounce: 0.1 }}
        className="relative bg-white text-dark w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] z-10 border border-stone-100"
      >
        {/* Header decoration */}
        <div className="h-1.5 bg-gradient-to-r from-accent via-stone-400 to-accent/60 w-full" />

        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-stone-50 rounded-lg flex items-center justify-center">
              {icon}
            </div>
            <h3 className="font-serif text-lg font-bold tracking-tight text-neutral-900">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 px-[5px] rounded-lg hover:bg-stone-100 text-stone-400 hover:text-dark transition-all duration-200 cursor-pointer"
            aria-label="Fermer la fenêtre"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scroll */}
        <div className="p-6 overflow-y-auto space-y-6">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="font-sans font-semibold text-xs text-neutral-800 tracking-wider uppercase font-mono">
                {section.subtitle}
              </h4>
              <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                {section.content}
              </p>
            </div>
          ))}

          {/* Institutional Stamp Footer */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-400">
            <span>OFFICIEL PRIMEIMMOBILIER</span>
            <span>PUBLIÉ EN JUIN 2026</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-stone-50 px-6 py-4 flex justify-end border-t border-stone-100">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-dark hover:bg-stone-800 text-white font-mono text-[10px] tracking-widest uppercase transition-all duration-200 rounded-lg cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </motion.div>
    </div>
  );
}
