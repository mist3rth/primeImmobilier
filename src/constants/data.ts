import { Project, Stat, TargetAudience, FAQItem } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Le Carré de la Seine',
    location: 'Paris 16e - Trocadéro',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80',
    status: 'completed',
    badge: 'Vendu',
    description: 'Projet résidentiel neuf de très grand standing comprenant 24 appartements de prestige, offrant des panoramas remarquables sur la Seine à Paris.',
    specs: {
      surface: 'env. 2 100 m² de surface totale',
      units: '24 unités exclusives',
      energy: 'DPE A+ · Conforme RE2020 & Label Passivhaus',
      heating: 'Pompe à chaleur géothermique & Solaire intégré',
      volume: 'env. 15,8 M €',
      heritageStat: 'Non éligible au dispositif Monument Historique'
    },
    highlights: [
      'Vue unique sur la Seine et la Tour Eiffel depuis presque toutes les unités',
      'Terrasses plein ciel spacieuses & somptueux appartements-villas en attique',
      'Accès direct aux berges aménagées de la Seine via un square d\'honneur privé',
      'Parkings souterrains équipés de bornes d\'alimentation électriques intelligentes (22 kW)'
    ],
    features: [
      'Vitrage ultra-sécurisé anti-effraction à haute performance acoustique de classe 4',
      'Parquet d\'art en chêne massif posé en point de Hongrie, installé sur chape flottante chauffante',
      'Superbes volumes de réception avec des hauteurs sous plafond exceptionnelles de 2,90 m',
      'Commande domotique avancée de protocole de prestige KNX, programmable pièce par pièce'
    ]
  },
  {
    id: 'p2',
    title: 'Hôtel de Saint-Florent',
    location: 'Paris 3e - Le Marais',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80',
    status: 'completed',
    badge: 'Vendu',
    description: 'Réhabilitation complète sous contrôle des Monuments Historiques d\'un ancien hôtel particulier d\'exception, reconverti en somptueux lofts de prestige.',
    specs: {
      surface: 'env. 1 850 m² de surface habitable',
      units: '14 appartements lofts d\'art',
      energy: 'Performance Rénovation BBC d\'excellence - Classe B',
      heating: 'Réseau de chaleur urbain vert & Gestion d\'air double flux',
      volume: 'env. 11,2 M €',
      heritageStat: 'Éligible dispositif fiscal Monument Historique & Loi Malraux (réduction d\'impôt d\'exception)'
    },
    highlights: [
      'Régime d\'optimisation haut de gamme avec déduction à 100 % des travaux éligibles, hors niches fiscales',
      'Préservation sublime des murs d\'époque en de vieilles pierres de taille et briques de pays',
      'Restauration méticuleuse des escaliers d\'honneur à volutes en fer forgé et plafonds à la française',
      'Cour d\'honneur intérieure verdoyante et arborée, à l\'abri absolu des rumeurs de la ville'
    ],
    features: [
      'Portes pivotantes de verrière métallique façonnées à la main par un maître artisan d\'art',
      'Sublime revêtement de sol en parquet chêne vieilli aux teintes chaudes et lames extra-larges XXL',
      'Salles de bains revêtues de marbre de Carrare avec vasques et baignoires îlots taillées dans la masse',
      'Réseau aéraulique silencieux à double flux de marque Zehnder avec déshumidification par capteur hygrométrique'
    ]
  },
  {
    id: 'p3',
    title: 'Aquitania Residences',
    location: 'Bordeaux - Triangle d\'Or',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=700&q=80',
    status: 'active',
    badge: 'Projeté',
    description: 'Appartements d\'architecture contemporaine de très grand luxe répondant aux critères écologiques les plus rigoureux de la norme RE2020 (seuil carbone 2028).',
    specs: {
      surface: 'env. 3 400 m² de surface brute',
      units: '28 dalles résidentielles d\'adresse',
      energy: 'Haute performance RE2020 avec certification NF Habitat HQE d\'or',
      heating: 'Chauffage & Climatisation thermodynamique par géothermie profonde',
      volume: 'env. 24,5 M €',
      heritageStat: 'Régime d\'amortissement de standing LMNP entièrement actionnable pour les investisseurs'
    },
    highlights: [
      'Parfaite adéquation aux exigences financières ESG d\'excellence (Label d\'État NF Habitat HQE)',
      'Espaces spa et thalassothérapie intégrés de manière privative au sein des lots phares',
      'Autoproduction énergétique majeure réduisant de 75 % l\'empreinte et le montant des charges',
      'Emplacement de premier ordre en hyper-centre historique avec balcons filants majestueux'
    ],
    features: [
      'Centrales de ventilation d\'air silencieuses à haute efficacité de filtration de marque suisse Zehnder',
      'Grès cérame d\'art extra-large d\'importation de format 120x120 cm sur l\'ensemble des pièces d\'eau',
      'Brise-soleil orientables d\'aluminium anodisé teinte bronze, motorisés et asservis au soleil',
      'Accès de standing sécurisé depuis le grand garage sous-sol préservé jusqu\'à chaque pallier d\'étage'
    ]
  },
  {
    id: 'p4',
    title: 'Le Domaine de la Forêt',
    location: 'Neuilly-sur-Seine - Bois de Boulogne',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=700&q=80',
    status: 'completed',
    badge: 'Livré',
    description: 'Une signature architecturale moderne minimaliste créant des perspectives et une harmonie totale avec le Bois de Boulogne.',
    specs: {
      surface: 'env. 950 m² de surface totale d\'exception',
      units: '8 appartements connectés d\'art',
      energy: 'Haute performance thermique d\'avant-garde · DPE A',
      heating: 'Pompe à chaleur thermodynamique & dalles chauffantes rafraîchissantes',
      volume: 'env. 6,1 M €',
      heritageStat: 'Non classé Monument Historique'
    },
    highlights: [
      'Situation rare et idyllique en bordure immédiate et préservée du Bois de Boulogne',
      'Grands parcs-jardins paysagers privatifs et dessinés par un paysagiste pour les lots de plain-pied',
      'Toitures terrasses entièrement végétalisées de grande complexité pour régulation bio-climatique',
      'Consommations de fluides énergétiques extrêmement faibles grâce à une enveloppe technique d\'exception'
    ],
    features: [
      'Enduits intérieurs lisses de plâtre traditionnel d\'art d\'exigence Q4 appliqués à la main',
      'Douches à l\'italienne à fleur de sol avec évacuations linéaires intégrées au marbre',
      'Compteurs connectés Smart Metering pour le suivi précis de chaque ressource physique',
      'Buanderies d\'office privatives indépendantes et caves blindées destinées aux grands crus'
    ]
  },
  {
    id: 'p5',
    title: 'La Riviera Azur',
    location: 'Nice - Mont Boron',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=700&q=80',
    status: 'active',
    badge: 'En cours',
    description: 'Écrin résidentiel haut de gamme suspendu, offrant une vue panoramique imprenable sur la baie des Anges et la Méditerranée.',
    specs: {
      surface: 'env. 1 600 m² habitables exclusifs de grand standing',
      units: '10 dalles d\'appartements-villas',
      energy: 'Performance bioclimatique passive de classe d\'excellence A',
      heating: 'Géothermie réversible méditerranéenne & Plafonds tempérés de grand confort',
      volume: 'env. 13,4 M €',
      heritageStat: 'Éligible aux subventions et dispositifs de défiscalisation d\'art immobilière'
    },
    highlights: [
      'Inspiration architecturale néo-classique aux lignes épurées et façade en pierre naturelle polie',
      'Spacieux balcons-terrasses pleins Sud dominant la mer et le cap de Nice',
      'Planchers et chapes isolés acoustiquement sur plots vibratoires d\'excellentes performances',
      'Service de conciergerie et d\'accueil privé d\'usage 24/7 au sein du majestueux hall en marbre'
    ],
    features: [
      'Chaud-froid réversible invisible de grande douceur, intégré par le sol et les cloisons',
      'Robinetteries haut de gamme contemporaines signées Dornbracht et pièces de salle de bains haut de gamme',
      'Planchers de teck huilé d\'importation pont de bateau ou chêne vieilli de grande largeur',
      'Portes d\'entrée d\'appartements blindées de sécurité intégrale renforcée classe de protection RC3'
    ]
  },
  {
    id: 'p6',
    title: 'Le Domaine de Chantilly',
    location: 'Chantilly - Grand Parc',
    year: '2027',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=700&q=80',
    status: 'active',
    badge: 'Lancement',
    description: 'Villas d\'architecte de prestige d\'influence grand siècle, implantées au cœur d\'un parc forestier privé d\'arbres classés.',
    specs: {
      surface: 'env. 4 200 m² habitables de pure facture d\'arbres',
      units: '3 grandes villas domaniales exclusives',
      energy: 'Performance éco-énergétique extrême passive récompensée',
      heating: 'Thermo-génération par stockage de glace d\'eau et toiture solaire intégrée active',
      volume: 'env. 36,0 M €',
      heritageStat: 'Éligible à la structuration patrimoniale d\'exception d\'art'
    },
    highlights: [
      'Parc naturel préservé aux arbres centenaires et cours d\'eau intégrés de manière domaniale',
      'Commercialisation d\'adresse confidentielle en circuit Off-Market pour initiés exigeants',
      'Système de clôture connectée active avec détection biométrique de cybersécurité par le sol',
      'Conception de master architectes lauréats de grands concours d\'art contemporains'
    ],
    features: [
      'Immenses baies murales vitrées coulissantes à galandage motorisées s\'effaçant dans l\'épaisseur du bâti',
      'Revêtements muraux massifs en céramique d\'art reproduisant le veinage exclusif du marbre de Carrare',
      'Ascenseur de cabine vitrée avec contrôle biométrique ou code d\'empreinte cryptographique crypté',
      'Grandes dalles de garages individuels souterrains d\'une capacité de stationnement de 4 à 6 véhicules'
    ]
  }
];

export const STATS: Stat[] = [
  {
    id: 's1',
    count: 12,
    suffix: '+',
    label: 'TERRITOIRES D\'EXCEPTION',
    description: 'Établis avec succès sur le segment exigeant de l\'immobilier d\'art en France.'
  },
  {
    id: 's2',
    count: 140,
    suffix: '+',
    label: 'BIENS D\'EXCEPTION SÉCURISÉS',
    description: 'Rénovés, loués et valorisés avec une vision patrimoniale d\'adresse.'
  },
  {
    id: 's3',
    count: 95,
    suffix: '+',
    label: 'RÉSIDENCES NEUVES LIVRÉES',
    description: 'Bâties selon les normes architecturales, écologiques et thermiques de demain.'
  },
  {
    id: 's4',
    count: 65,
    suffix: ' M €',
    label: 'VOLUME TRANSACTIONNEL',
    description: 'D\'enveloppes et d\'actifs sous gestion confiés par des investisseurs de premier ordre.'
  }
];

export const AUDIENCES: TargetAudience[] = [
  {
    id: 't1',
    type: 'B2B',
    tag: 'Investisseurs',
    title: 'L\'osmose absolue entre valorisation & sécurité de vos actifs',
    description: 'En tant qu\'investisseur avisé, vous concentrez vos capitaux sur des biens fonciers d\'adresse résilients, imperméables aux aléas de l\'inflation. Nos développements d\'excellence au sein des adresses d\'influence d\'Île-de-France, de Riviera ou du Triangle d\'Or de Bordeaux constituent un rempart contre la dévalorisation monétaire, boostés par des schémas d\'amortissement fiscaux exceptionnels d\'État (Loi Malraux, Monument Historique, LMNP de grande hauteur).',
    checklist: [
      'Emplacements prestigieux protégés contre l\'érosion monétaire à Paris intra-muros et départements adjacents',
      'Gestion locative déléguée intégrale, incluant le filtrage de la clientèle et la gérance de prestige',
      'Accès en toute discrétion à des opportunités d\'adresse Off-Market cryptées avant mise sur le marché',
      'Calculs financiers d\'audit ouverts, certifiés par experts-comptables judiciaires indépendants'
    ],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 't2',
    type: 'B2C',
    tag: 'Propriétaires Occupants',
    title: 'Bâtir une demeure d\'influence destinée à la lignée',
    description: 'Établir son havre résidentiel personnel constitue le cœur de voûte de votre aventure privée et l\'axe le plus pérenne de votre patrimoine. Les lignes architecturales que nous traçons, la noblesse brute des essences minérales et ligneuses mises en scène et la performance bioclimatique optimale assurent la longévité de votre demeure d\'art.',
    checklist: [
      'Personnalisation complète du second œuvre accompagnée par notre architecte conseil d\'intérieur',
      'Qualité physique d\'excellence certifiée sous le sceau de Bureau Veritas au cours du gros œuvre',
      'Réseaux intégrés de confort invisible, domotique d\'art KNX, marbre d\'extraction et placages précieux',
      'Garantie financière d\'achèvement de premier niveau et prix ferme à la signature d\'acte authentique'
    ],
    image: 'https://images.unsplash.com/photo-1549517045-bc93de075e53?auto=format&fit=crop&w=800&q=80'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'f1',
    question: 'Quels sont les ressorts et avantages d\'optimisation fiscale de la loi Monument Historique et du dispositif Malraux ?',
    answer: 'La loi Monument Historique permet aux investisseurs fortement fiscalisés de déduire 100 % du montant des travaux de restauration d\'art de leur revenu global imposable, sans aucune limitation de montant ni plafonnement des niches fiscales de 10 000 €. Le dispositif Malraux propose quant à lui une réduction d\'impôt directe montant jusqu\'à 30 % du montant des travaux éligibles, idéale pour une optimisation immédiate.'
  },
  {
    id: 'f2',
    question: 'Comment apportez-vous la certitude d\'exécution et d\'absence de vices sur vos chantiers ?',
    answer: 'Nous contractons exclusivement avec des artisans d\'art locaux de grand renom et des entreprises de gros œuvre certifiées. Chaque étape constructive clé fait l\'objet d\'inspections, de procès-verbaux de contrôle de conformité et d\'une labellisation finale de performance de marque certifiée délivrée par un bureau de contrôle de renommée internationale comme Bureau Veritas ou la SOCOTEC.'
  },
  {
    id: 'f3',
    question: 'Bénéficie-t-on d\'un appui dans la négociation et la structuration des leviers d\'emprunt d\'adresse ?',
    answer: 'Parfaitement. Grâce à des relations ancrées depuis de nombreuses années auprès de banques privées nationales et de courtiers couronnés d\'affaires de premier choix, nous construisons une ingénierie de financement optimisée : adossement de garanties, intégration de taux d\'intérêts préférentiels et structurations patrimoniales (SARL de famille, SCI à l\'IS).'
  },
  {
    id: 'f4',
    question: 'En quoi réside précisément votre pôle de gestion et d\'administration de biens exclusifs ?',
    answer: 'Notre pôle dédié prend en charge l\'intégralité du cycle de vie opérationnel : diagnostics techniques, sélection de vos futurs preneurs et vérification de garanties financières haut de gamme, signature du bail d\'art, recouvrements sécurisés et versement des loyers, ainsi que la gérance technique d\'entretien. Une tranquillité souveraine d\'esprit.'
  },
  {
    id: 'f5',
    question: 'Quel est le process juridique et d\'appels de fonds lors d\'une acquisition VEFA ou d\'art historique chez PrimeImmobilier ?',
    answer: 'Après la signature du contrat de réservation validé par nos conseils, le notaire en charge rédige le projet d\'acte authentique de vente. Pour un projet neuf en VEFA d\'art, les appels de fonds pour le règlement sont encadrés de manière légale par la loi française et s\'égrainent de manière progressive au fil de l\'état d\'avancement physique constaté du chantier par l\'architecte de l\'office.'
  }
];

export const USP_GRID = [
  {
    num: '01',
    title: 'Adresses d\'exception et d\'influence',
    body: 'Nous concentrons exclusivement nos sélections foncières sur les adresses les plus prisées et convoitées de France, notamment à Paris intramuros, le cœur historique de Bordeaux et les sommets préservés de la Riviera azuréenne. Chaque terrain est soumis à un audit rigoureux de rareté et d\'appréciation foncière sur 20 ans.',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
    titleProj: 'Les Jardins de la Seine - Paris 16e',
    yearProj: '2024 / 2025'
  },
  {
    num: '02',
    title: 'Eco-efficacité d\'avant-garde (DPE A+ & RE2020)',
    body: 'Nos ouvrages d\'art architectural marient éco-conception extrême et technicité avancée : captations géothermiques de puits profonds, centrales solaires intégrées et enveloppes thermiques passives. Nous surpassons largement les exigences RE2020 actuelles pour anticiper la valeur de revente de l\'actif.',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    titleProj: 'Eco Loft Bordeaux',
    yearProj: '25 M € investis'
  },
  {
    num: '03',
    title: 'Architecture d\'auteur & signature d\'artiste',
    body: 'Nous bannissons l\'uniformité des constructions industrialisées et banales. Chacun de nos projets est une œuvre d\'auteur, co-conçue avec des signatures d\'architectes reconnées, alliant la préservation sensible de fresques et enveloppes historiques d\'époque et la modernité des innovations d\'actifs.',
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80',
    titleProj: 'Villa d\'Art - Nice Mont Boron',
    yearProj: 'Plans directeurs'
  }
];
