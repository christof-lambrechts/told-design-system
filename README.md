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

- **Button** (`color` brand · neutral · danger · success · warning · purple, `variant` primary · secondary · tertiary · ghost, `size` xs · sm · md · lg, `iconLeft`, `iconRight`) et **ButtonIcon** (`appearance` fill · outline · ghost · subtle).
- **Checkbox**, **Radio**, **Switch** (`label`, `description`, `boxed`, `descriptionPlacement`, `error`, `size`, `checkPlacement`).
- **Kbd** et **KbdCombo**.
- **Icon** : icônes HugeIcons Solid Standard exportées de Figma (à compléter au besoin).

## Règles

- Les composants n'utilisent que les jetons sémantiques (`--content-*`, `--neutral-*`, `--button-*`…), jamais les primitives ni des valeurs en dur. Une exception documentée : la pastille du Switch, blanche dans les deux modes.
- Les noms de propriétés suivent Figma (en anglais), les textes sont en français.
- Une valeur change d'abord dans Figma ; on réexporte puis on lance `npm run tokens`.
- Textes de l'interface : la collection Figma `07-wording` (FR, EN) est prévue pour Lingui ; pas encore branchée ici.

## Intégration dans le monorepo

Le dossier est autonome (React 19, Vite, Storybook 10). Pour l'intégrer à `told-monorepo-front`, le copier comme paquet (`packages/design-system`) et importer `@told/design-system` : `src/index.ts` charge les jetons et exporte les composants. Next.js lit les CSS modules sans réglage.

## Mise en ligne

Cloudflare Pages, depuis le dépôt Git : commande de build `npm run build-storybook`, dossier de sortie `storybook-static`.
