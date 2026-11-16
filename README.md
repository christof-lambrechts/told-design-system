# Design system Told V3 (code)

Jetons et composants React du design system Told V3, documentés dans Storybook. Source de vérité : le fichier Figma **DESIGN-SYSTEM-TOLD-V.3** (`UzceYU5fzcWKqlgISYpS8V`). Seuls les composants validés ✅ dans Figma sont codés ici.

## Démarrer

```bash
npm install
npm run storybook        # Storybook en local sur http://localhost:6006
npm run build-storybook  # version statique dans storybook-static/
npm run typecheck        # vérification TypeScript
```

## Contenu

| Dossier | Rôle |
| --- | --- |
| `tokens/figma/` | Export brut des variables Figma (primitives, sémantique clair et sombre). |
| `scripts/build-tokens.mjs` | Transforme l'export en `src/tokens/colors.css` (`npm run tokens`). |
| `src/tokens/colors.css` | Variables CSS de couleur. Mode sombre : `data-theme="dark"` sur `<html>`. |
| `src/tokens/foundations.css` | Espacements, rayons, typographie (classes `.text-*`), ombres, durées, polices. |
| `src/components/` | Un dossier par composant : `.tsx`, `.module.css`, `.stories.tsx`. |

## Composants

Codés (validés ✅ dans Figma), visibles dans Storybook sous « Composants » :

- **Actions** : Button, ButtonIcon, ButtonGradient, ButtonDropdown, ButtonLink.
- **Saisie et choix** : Checkbox, Radio, Switch, Input, SearchBar, TextArea, FileUploader, Calendar.
- **Navigation** : TextTab, ButtonTab, GroupTab, Pagination, NavButtonItem.
- **Statut et aide** : Kbd, KbdCombo, Tooltip, Toast.
- **Structure et visuels** : Divider, Icon (156 icônes du fichier Figma), IconBoxed, Logo, Flag.
- **Cartes et modales** : GettingStarted, ModuleCard (et SubStepItem, MessageCard, FlowDivider, InsertBar, DropZone), AddBlockModal, BlockTypeItem.
- **Widget visiteur** : Widget, WidgetChoice, WidgetButton, WidgetConsent, ChecklistItem (thème clair et sombre).
- **Assets** : UserStory.

Tous les autres composants du fichier Figma sont dans **Catalogue Figma** : aperçu, propriétés, statut et lien vers Figma. Ils sont codés une fois validés.

## Mettre à jour depuis Figma

| Quoi | Où | Commande |
| --- | --- | --- |
| Couleurs | `tokens/figma/*.txt` (export des variables) | `npm run tokens` |
| Icônes | `catalog/icons-*.txt` (tracés exportés de la page Icons) | `npm run icons` |
| Catalogue | `catalog/figma-*.txt` (propriétés), `public/catalog/*.webp` (aperçus), `catalog/coded.json` (composants codés) | `npm run catalog` |

## Règles

- Les composants n'utilisent que les jetons sémantiques (`--content-*`, `--neutral-*`, `--button-*`…), jamais les primitives ni des valeurs en dur. Une exception documentée : la pastille du Switch, blanche dans les deux modes.
- Les noms de propriétés suivent Figma (en anglais), les textes sont en français.
- Une valeur change d'abord dans Figma ; on réexporte puis on lance `npm run tokens`.
- Textes de l'interface : la collection Figma `07-wording` (FR, EN) est prévue pour Lingui ; pas encore branchée ici.

## Intégration dans le monorepo

Le dossier est autonome (React 19, Vite, Storybook 10). Un autre projet l'installe directement depuis GitHub (accès au dépôt requis) :

```
npm install github:christof-lambrechts/told-design-system
```

puis `import { Button } from '@told/design-system'` : l'entrée `src/index.ts` charge les jetons et exporte les composants (TypeScript et CSS modules, lus tels quels par Vite et Next.js). Mise à jour : `npm update @told/design-system`.

## Mise en ligne

Cloudflare Pages, depuis le dépôt Git : commande de build `npm run build-storybook`, dossier de sortie `storybook-static`.
