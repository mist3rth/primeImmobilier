# Suivi des Tâches (TODO) - Prime Immobilier

## 🔹 Phase 1 : Initialisation de l'Architecture & Utilitaires [Terminé]
- [x] Créer le répertoire `/src/constants/` et y extraire les réglages statiques dans `settings.ts`.
- [x] Déplacer `src/data.ts` vers `src/constants/data.ts`.
- [x] Créer les utilitaires dans `/src/utils/` : `logger.ts` (`log.dev`) et `validation.ts` (Schémas Zod).
- [x] Configurer `tsconfig.json` avec le mode strict.
- [x] Mettre en place un composant `ErrorBoundary.tsx` dans `/src/ui/`.

## 🔹 Phase 2 : Création des Composants UI Mutuels (DRY)
- [ ] Créer `/src/ui/Button.tsx` (Variantes, micro-interactions, `will-change`, compositor-only).
- [ ] Créer `/src/ui/Badge.tsx` (Statuts, badges).
- [ ] Créer `/src/ui/InputField.tsx` (Inputs et textareas unifiés avec support Zod).
- [ ] Créer `/src/ui/Modal.tsx` (Focus trap, accessibilité clavier).

## 🔹 Phase 3 : Découpage Modulaire & Restructuration
- [ ] Créer le répertoire `/src/layouts/` et y déplacer `Navbar.tsx` et `Footer.tsx`.
- [ ] Créer `/src/components/sections/` et y déplacer toutes les sections de `App.tsx`.
- [ ] Créer `/src/components/pages/` et y déplacer les pages de détails.
- [ ] Mettre à jour `App.tsx` pour n'avoir que les imports, les états légers et l'orchestration globale.

## 🔹 Phase 4 : Sécurisation, SEO & A11Y (Shield Pro & Polish Grail)
- [ ] Intégrer les validations Zod aux formulaires dans `FinalCTA.tsx` et `ProjectDetailPage.tsx`.
- [ ] Valider l'A11Y : contrastes des textes, navigation clavier complète, attributs aria.
- [ ] Valider le SEO : balise H1 unique, balises sémantiques HTML5, données structurées.
- [ ] Ajouter les Error Boundaries autour des sections dans `App.tsx`.
- [ ] Tester les animations au scroll et s'assurer qu'elles s'arrêtent hors du viewport.
- [ ] Effectuer un smoke test de build final (`npm run build`).
