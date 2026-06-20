# Product Requirements Document (PRD) - Prime Immobilier

## 1. Vision du Produit
Prime Immobilier est une vitrine de prestige pour des actifs résidentiels d'exception en France. Le but de la refactorisation S2P (Stitch to Production) est de transformer la maquette interactive en une application de niveau production : performante, sécurisée, accessible (WCAG AA), optimisée SEO et hautement maintenable.

## 2. Objectifs Techniques & Critères de Succès
- **Architecture :** Transition d'un monolithe vers une architecture atomique propre (layouts, sections, composants UI génériques).
- **Zéro Régression Esthétique :** Conserver les couleurs d'origine, espacements et typographies de l'export AI Studio/Stitch.
- **Règle des Espacements & Rythme Visuel :** Appliquer la grille de 8 points (multiples de 8, 16, 24, 32, 48, 64px) pour tous les espacements.
- **Typographie Strict :** Système Type Scale basé sur le tiers majeur (ratio 1.25) exprimé en REM (1rem = 16px). Line-height à 1.5 pour le corps de texte, resserré pour les titres. Letter-spacing normal pour le corps, resserré pour les titres.
- **Animations Compositor-First (Performances) :**
  - Privilégier les animations de **Tier 1** (CSS Transitions & Keyframes gérant uniquement `transform`, `opacity`, et `clip-path` avec `will-change: transform`).
  - Éviter d'animer les propriétés de layout (`width`, `height`, `margin`, `top`, `left`) pour prévenir les reflows.
  - Pauser les animations hors viewport (`animation-play-state: paused` ou via `IntersectionObserver`).
- **Sécurité (Shield Pro) :**
  - Validation stricte des inputs de formulaires avec `Zod`.
  - Intégration d'un utilitaire `log.dev()` de débogage.
  - Implémentation d'Error Boundaries globales et par section.
- **Accessibilité (A11Y) :**
  - Contraste de 4.5:1 pour le texte normal et 3:1 pour le texte large.
  - Support complet de la navigation clavier et présence des attributs `aria-label` et `aria-hidden` requis.
- **SEO & AEO Ready :**
  - Balise `<h1>` unique et descriptive par page.
  - Données structurées JSON-LD.
  - Optimisation des assets (formats WebP/AVIF compressés).

## 3. Scope Fonctionnel (Landing Page)
1. **Navbar** (Navigation fluide + Burger Menu mobile accessible)
2. **Hero Section** (Vidéo showcase premium en overlay + CTA principal)
3. **Intro Text** (Texte de marque & signature)
4. **USP Bento** (Grille d'atouts patrimoniaux)
5. **Stats Counter** (Compteurs chiffrés animés)
6. **Active Projects** (Portfolio de projets avec fiches détaillées dynamiques)
7. **Completed Projects Marquee** (Bandeau de réalisations en défilement continu)
8. **About** (Présentation de l'équipe et de la vision)
9. **Targets** (Cibles d'investisseurs B2B/B2C et listes de critères)
10. **Before/After Slider** (Comparateur visuel de rénovation gérant le drag tactile)
11. **Final CTA & Form** (Formulaire de contact validé par Zod + Message CEO)
12. **FAQ Accordion** (Accordéons pliables et accessibles)
13. **Footer** (Mentions légales, politique de confidentialité, CGV)
