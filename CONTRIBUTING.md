# Contribuer au design system Told

Le design system est la référence commune de Told et de Told Record. On y ajoute des briques communes, jamais des pièces propres à un produit (réglages de Told Record, canevas, player…).

## Le circuit

1. **Figma d'abord.** Le composant est dessiné et validé (✅ dans le nom de sa page) dans le fichier Figma du design system avant d'être codé.
2. **Une branche par composant**, nommée `composant/<nom>` (ex. `composant/option-panel-item`), partie de `main` à jour.
3. **Une pull request vers `main`.** Christof relit et fusionne. Personne ne pousse directement sur `main`.
4. **Aperçu.** Cloudflare Pages publie un Storybook d'aperçu pour chaque branche (lien dans la pull request, ou `https://<branche>.told-design-system.pages.dev`).
5. **Versions.** Seul Christof publie une version (tag `vX.Y.Z` + entrée dans `CHANGELOG.md`).

## Les conventions

- Un dossier par composant dans `src/components/<Nom>/` : `<Nom>.tsx`, `<Nom>.module.css`, `<Nom>.stories.tsx`.
- **Uniquement les jetons du DS** (variables CSS de `src/tokens/`). Pas de couleur, de taille ou de police en dur ; s'il manque un jeton, il s'ajoute d'abord dans Figma.
- **Les noms de propriétés de Figma** (`size`, `state`, `checked`, `hasIcon`…), mêmes valeurs de variantes.
- Icônes : `<Icon name="…" />` (contour par défaut, `variant="solid"` pour l'état actif).
- Exporter le composant dans `src/index.ts`.
- Relier la fiche Figma au code dans `catalog/coded.json` (`"NomFigma": "id-de-l-histoire"`), puis `npm run catalog`.
- Vérifier avant la pull request : `npx tsc --noEmit` et `npm run build-storybook` sans erreur, rendu clair et sombre.

## Mettre à jour depuis Figma

| Ce qui change dans Figma | Commande |
| --- | --- |
| Variables (couleurs, typo, espacements) | réexporter dans `tokens/figma/`, puis `npm run tokens` |
| Icônes | `catalog/icons-*.txt`, puis `npm run icons` |
| Catalogue des composants | `catalog/figma-*.txt`, puis `npm run catalog` |
