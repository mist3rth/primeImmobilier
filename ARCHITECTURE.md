# Architecture du Projet - Prime Immobilier

## 1. Structure de Dossiers Cible (Clean Architecture)

Pour respecter les standards d'élite, l'application est réorganisée selon la structure suivante :

```text
src/
├── layouts/            # Composants structurant les pages globales
│   ├── MainLayout.tsx  # Layout enveloppant (Navbar, Content, Footer)
│   ├── Navbar.tsx      # Navigation de l'application
│   └── Footer.tsx      # Pied de page & Liens légaux
├── components/         # Blocs fonctionnels de la page
│   ├── sections/       # Sections uniques de la Landing Page
│   │   ├── Hero.tsx
│   │   ├── IntroText.tsx
│   │   ├── USPBento.tsx
│   │   ├── StatsCounter.tsx
│   │   ├── ActiveProjects.tsx
│   │   ├── CompletedProjectsMarquee.tsx
│   │   ├── About.tsx
│   │   ├── Targets.tsx
│   │   ├── BeforeAfterSlider.tsx
│   │   ├── FinalCTA.tsx
│   │   └── FAQAccordion.tsx
│   └── pages/          # Pages de détails montées dynamiquement
│       ├── ProjectDetailPage.tsx
│       └── PillarDetailPage.tsx
├── ui/                 # Composants atomiques (Design System réutilisable)
│   ├── Button.tsx      # Boutons avec états Hover/Active standardisés
│   ├── Badge.tsx       # Badges de statut et étiquettes
│   ├── InputField.tsx  # Inputs et Textareas stylisés et sécurisés
│   ├── Modal.tsx       # Conteneur modal générique (A11Y, Focus Trap)
│   └── ErrorBoundary.tsx # Gestionnaire d'erreurs UI
├── constants/          # Constantes, configurations et données statiques
│   ├── settings.ts     # Liens, adresses email, paramètres de l'application
│   └── data.ts         # Données d'actifs, FAQs et cibles (importé de src/data.ts)
├── hooks/              # Hooks personnalisés (IntersectionObserver, etc.)
│   └── useIntersectionObserver.ts
├── utils/              # Fonctions d'aide et utilitaires
│   ├── logger.ts       # Custom Logger (log.dev)
│   └── validation.ts   # Schémas de validation Zod
├── styles/             # Variables CSS et styles globaux
│   └── index.css       # Fichier css de base
├── types.ts            # Déclarations globales de types TypeScript
└── main.tsx            # Point d'entrée de l'application
```

## 2. Principes Fondamentaux de Conception

### A. Règle des Espacements & Rythme (Multiple de 8px)
- Marges et paddings définis à l'aide de valeurs Tailwind strictes respectant le rythme de 8 points (`p-2` (8px), `p-4` (16px), `p-6` (24px), `p-8` (32px), `p-12` (48px), `p-16` (64px)).

### B. Animations Performantes (Compositor-First)
- Strict respect de la **règle des 3 propriétés sûres** : animations limitées à `transform` (translate, scale, rotate), `opacity`, et `clip-path`.
- Aucun déclenchement de reflow via l'animation de dimensions (`width`, `height`, `margin`, `top`, `left`).
- Transitions CSS fluides (ex: `transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease`).
- Ajout de `will-change: transform` sur les éléments animés au hover/scroll pour forcer la promotion des calques sur le GPU.
- Utilisation de `IntersectionObserver` pour mettre en pause les animations hors viewport (`animation-play-state: paused`).

### C. Sécurité (Shield Pro)
- Validation des formulaires côté client avec la bibliothèque `Zod`.
- Capture des anomalies d'affichage locales grâce aux `Error Boundaries` pour préserver le reste de l'application en cas de bug de composant.
- `log.dev` n'affiche aucun log de console en production.
