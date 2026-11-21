# Design system Told V3 · guide développeur

Pour Jonathan et toute personne qui code avec le design system Told (Told et Told Record). Version du paquet au moment de l'écriture : **v0.8.3** (19/11/2026).

## 1. Les liens

| Quoi | Lien |
| --- | --- |
| Storybook en ligne (composants codés, documentation, catalogue) | https://told-design-system.pages.dev |
| Dépôt GitHub (public, licence MIT) | https://github.com/christof-lambrechts/told-design-system |
| Fichier Figma du design system (source de vérité) | https://www.figma.com/design/UzceYU5fzcWKqlgISYpS8V |
| Versions publiées | onglet « Releases » du dépôt, et `CHANGELOG.md` |
| Contribuer | `CONTRIBUTING.md` |

Chaque page de composant dans Figma a un bouton **Storybook** dans son en-tête : il ouvre directement le composant codé, ou sa fiche dans le Catalogue Figma s'il n'est pas encore codé.

## 2. Le principe

1. **Figma d'abord.** Un composant est dessiné dans Figma, documenté sur une planche « Documentation · <Composant> », puis validé par Christof (✅ dans le nom de la page).
2. **Puis le code**, dans ce dépôt, avec les mêmes noms de propriétés que Figma.
3. Tant qu'une page Figma est marquée ❌, son API de code peut encore bouger.
4. Le design system ne contient que des **briques communes** à Told et Told Record. Les pièces propres à un produit (réglages de Told Record, canevas, player…) restent dans le produit.

## 3. Installer

Dans le projet (monorepo ou application React 18 ou plus) :

```bash
npm install github:christof-lambrechts/told-design-system#v0.8.3
```

Toujours fixer une version (`#v0.8.3`) pour ne pas recevoir un changement visuel sans le voir. Pour passer à une version suivante, changer le numéro puis relancer l'installation, après avoir lu `CHANGELOG.md`.

Le paquet s'appelle `@told/design-system`. Son entrée (`src/index.ts`) est en TypeScript avec des CSS modules : Vite et Next.js les lisent tels quels, rien à compiler avant.

```tsx
import { Button, Select, Modal, Icon } from '@told/design-system';
```

Importer le paquet charge aussi les jetons (variables CSS) et les polices.

## 4. Thème clair et sombre

Les couleurs sont des variables CSS qui changent selon le mode. Pour passer en sombre :

```html
<html data-theme="dark">
```

Sans attribut, c'est le mode clair. Tous les composants suivent seuls.

Exception connue : le **widget visiteur** (celui posé sur le site du client) a son propre thème, réglé par sa propriété `theme`, indépendant du mode de l'application.

## 5. Les jetons

Fichiers : `src/tokens/colors.css` (655 jetons sémantiques, clair et sombre) et `src/tokens/foundations.css` (espacements, rayons, typographie, ombres, polices).

Règles :
- **N'utiliser que les jetons sémantiques** : `--content-*`, `--neutral-*`, `--brand-*`, `--button-*`, `--input-*`, `--badge-*`… Jamais les primitives (`--blue-500`) ni une valeur en dur, sauf exception documentée.
- Exemples courants :

| Usage | Jeton |
| --- | --- |
| Fond de page | `--neutral-surface-page` |
| Fond de carte, de panneau | `--neutral-surface-default` |
| Fond discret | `--neutral-surface-subtle`, `--neutral-surface-muted` |
| Texte principal | `--content-default-default` |
| Texte secondaire | `--content-subtle-default` |
| Bleu de sélection | `--content-default-selected`, `--brand-surface-selected` |
| Bordure | `--neutral-border-default`, `--neutral-border-subtle` |
| Rayons de carte | `--component-cards-sm` à `--component-cards-3xl` |
| Ombres | `--shadow-flat-1` à `--shadow-flat-8` |
| Polices | `--font-family-body`, `--font-family-heading`, `--font-family-mono` |

- S'il manque un jeton, **on ne l'invente pas dans le code** : on le demande à Christof, il l'ajoute dans Figma, puis on réexporte (section 10).

## 6. Densité et tailles

Le design system est en **densité compacte** depuis la v0.3.0 :
- texte courant 13 px (interligne 18), grand texte 15 px ;
- hauteurs des contrôles : **xs 22, sm 28, md 36, lg 44 (21/11 : md passé de 34 à 36, lg de 40 à 44 ; GroupTab sur la même échelle, md 36 et lg 44 ; ButtonTab reste à part, c'est un petit élément)**. Bouton, champ, liste déroulante et onglet de même taille ont exactement la même hauteur : un champ `md` se pose à côté d'un bouton `md`.

Le widget visiteur n'est pas concerné (il garde ses tailles).

## 7. Icônes et pictos

- **Icônes** : `<Icon name="settings-02" />`. 165 icônes HugeIcons, **pleines par défaut** (depuis v0.16.0). Le **contour** (`variant="stroke"`) ne sert qu'**au repos dans les menus** : entrée de menu de navigation (NavButtonItem) et entrées de DropdownMenu ; l'entrée sélectionnée repasse en plein. La liste complète, avec recherche, est dans Storybook : Composants › Visuels › Icons.
- **Pictos de couleur** : `<IconBoxedColor icon="type-nps" size={24} />`. 93 pictos (types de question, types de contenu, formats, canaux, Told Record…), `appearance="filled"` ou `"subtle"`, tailles 24, 32, 40. Catalogue rangé par famille : Composants › Visuels › Pictos de couleur.
- Correspondance des pictos Told Record : Textes = `text`, Durée = `time`, Cadrage = `crop`, Floutage = `blur`, Capture = `capture`, Infobulle = `tooltip`, Point cliqué = `click`, Zoom = `zoom`, Avatar = `avatar`, Lecture = `player`, Orientation = `orientation`, Bouton = `button`, En boucle = `loop`, Kit de marque = `brand-kit`.
- Une icône manque : la demander, elle est ajoutée dans Figma depuis la banque HugeIcons puis dans le code (`npm run icons`).

## 8. Les composants codés

Noms Figma ↔ code ↔ Told Record, correspondance des propriétés et doublons : **[NOMMAGE.md](NOMMAGE.md)**. À lire avant de créer un composant.

Statut : ✅ = page Figma validée, API stable. ⏳ = codé d'après Figma, page pas encore validée, l'API peut bouger.

### Actions
| Composant | Statut | Notes |
| --- | --- | --- |
| `Button` | ✅ | `variant` : `primary`, `primary-outline`, `secondary-outline`, `tertiary`, `ghost` (`secondary` reste accepté comme ancien nom de `primary-outline`). `color` : brand, neutral, danger, success, warning, purple. `size` xs à xl. `iconLeft`, `iconRight`, `fullWidth`. Une seule `primary` par vue. `color="ai"` (action IA, contour dégradé violet) et `color="rec"` (enregistrement, rouge avec point) depuis v0.9.0. |
| `ButtonIcon` | ✅ | `icon`, `label` (lu par les lecteurs d'écran), `appearance` fill, outline, ghost, subtle. |
| `ButtonGradient`, `ButtonDropdown`, `ButtonLink` | ✅ | Bouton dégradé (IA, Pro), bouton à menu, bouton lien. |
| `ButtonGroup` | ✅ | Boutons accolés (Partager + Aperçu) ; `appearance` outline ou inverse. Mettre des boutons de même taille. |
| `FloatingToolbar`, `ToolbarItem`, `ToolbarDivider` | ✅ | Barre d'outils flottante de l'éditeur, `theme` light ou dark, `showLabel`, outil `active` en couleur de marque. |

### Saisie et choix
| Composant | Statut | Notes |
| --- | --- | --- |
| `Checkbox`, `Radio`, `Switch` | ✅ | |
| `Input`, `SearchBar`, `TextArea` | ✅ | Hauteurs 28, 36, 44. `counter` (« 94 / 280 ») et `warning` depuis v0.9.0. |
| `ColorField`, `ContrastBadge`, `ContrastMenu` | ✅ | Couleur avec contrôle de contraste AA ou AAA sur `background`, correction en un clic, annulable. Fonctions `contrastRatio`, `fixContrast`. |
| `CopyField`, `CodeBlock` | ✅ | Lien à copier (sm, md) ; code d'intégration coloré avec « Copier le code ». |
| `IntentInput`, `PromptChip`, `QuickSuggestion`, `IntentPanel` | ✅ | Consigne pour l'IA : Entrée envoie, Maj + Entrée va à la ligne ; `emphasis="ai"`, `size` default ou compact ; IA = violet. |
| `ChoicePicker`, `ChoiceThumb`, `ChoiceIllustration` | ✅ | Choix visuel par vignettes illustrées (pas de capture), puis aperçu réel de l'option. |
| `Select`, `DropdownMenu`, `DropdownItem` | ✅ | Liste déroulante au clavier, mêmes hauteurs que Input. |
| `FileUploader` | ✅ | |
| `Calendar` | ✅ | |

### Navigation
| Composant | Statut | Notes |
| --- | --- | --- |
| `TextTab`, `ButtonTab`, `GroupTab` | ✅ | Onglets texte, boutons, groupe segmenté (`count` par segment depuis v0.9.0). |
| `Breadcrumb`, `EditableTitle` | ✅ | Fil d'Ariane avec retour, titre renommable (Entrée valide, Échap annule), statut ; `theme="dark"` dans l'en-tête de l'éditeur. |
| `StepThumb`, `StepGroup`, `StepList` | ✅ | Colonne Étapes de l'éditeur Record. StepThumb est un `li` : le poser dans StepGroup (grille 2 colonnes) ou une `ol`. Capture en `src`, sinon état vide. |
| `EditorHeader`, `EditorSaveState`, `EditorChanges` | ✅ | En-tête de l'éditeur Record, toujours sombre ; boutons Partager et Aperçu avec `className={editorHeaderGhostButton}`. |
| `Pagination` | ✅ | |
| `NavButtonItem` | ✅ | Entrée de menu ; vrai lien avec `href`, et `linkAs` pour le `Link` de Next ou React Router. |

### Statut et aide
| Composant | Statut | Notes |
| --- | --- | --- |
| `Kbd`, `KbdCombo` | ✅ | Raccourcis clavier. |
| `Tooltip`, `Toast` | ✅ | Toast : `action` pour « Annuler ». |
| `AiTag`, `AiNotice` | ✅ | IA = violet. AiTag : contenu écrit par l'IA pas encore relu (xs sur une vignette, sm à côté d'un titre). AiNotice : une phrase et un ou deux liens (`review`, `generating`, `done`). |
| `Banner` | ✅ | Bandeau pleine largeur : brand, warning, error, success, neutral ; `actionText`, `onClose`. |
| `ProgressBar` | ✅ | `value` 0 à 100, `size` sm (10, arrondie) ou lg (40), `direction`. |
| `ProgressSteps` | ✅ | Étapes du widget ou d'un tour : `total`, `current`, `appearance` multi ou single. |
| `Loader` | ✅ | `appearance` line-spinner, line-simple, dot-circle ; `size` 3xs à xl ; `label` (ou `false`). Durée inconnue. |
| `SkeletonLine`, `SkeletonCard` | ✅ | À la place d'un contenu qui arrive, quand on connaît sa forme. |
| `Badge` | ⏳ | Statut figé, non cliquable. 9 couleurs × subtle, outline, fill × xs à lg. `dot` et `secondDot` depuis v0.9.0. |
| `Tag` | ⏳ | Catégorie ou filtre, avec valeur et croix en option. Si ça se clique : Tag ; si ça dit l'état d'un objet : Badge. |

### Visuels et structure
| Composant | Statut | Notes |
| --- | --- | --- |
| `Icon`, `IconBoxed`, `IconBoxedColor` | ✅ | Voir section 7. |
| `Logo`, `Flag` | ✅ | |
| `Divider` | ✅ | |
| `Avatar` | ✅ | Initiales, icône, photo, logo ; 12 à 60. |
| `AvatarGroup`, `PresenceAvatar` | ✅ | Pile de présence (28, chevauchement −6, « +N »), `surface` light ou dark ; `presenceColorFor(id)` donne la même teinte à une personne partout. |

### Cartes, modales, panneaux
| Composant | Statut | Notes |
| --- | --- | --- |
| `GettingStarted`, `GettingStartedStep` | ✅ | Carte « Pour commencer ». |
| `ModuleCard` (et `SubStepItem`, `MessageCard`, `FlowDivider`, `InsertBar`, `DropZone`) | ✅ | Colonne de construction de l'éditeur. |
| `AddBlockModal`, `BlockTypeItem` | ✅ | Fenêtre d'ajout de bloc. |
| `NotificationCenter`, `NotificationItem` | ✅ | Panneau de 400 ouvert depuis la cloche du menu, 4 px à droite du menu, aligné en bas ; onglets Toutes et Non lues ; groupes par période. |
| `Modal` | ⏳ | Fenêtre de 500 ; Échap et clic sur le voile ferment ; `centered`. |
| `ConfirmModal` | ✅ | Confirmation centrée : `confirmLabel` (le verbe), `danger`, `hasClose`, `illustration`. |
| `OptionSidebar`, `OptionItem`, `PanelHeader` | ⏳ | Colonne de réglages de l'éditeur. |

### Connexion (Auth)
| Composant | Statut | Notes |
| --- | --- | --- |
| `CodeInput` | ✅ | Code à 6 chiffres : `value`, `onChange`, `error`, `countdown` (secondes), `onResend`. Le collage répartit les chiffres ; `autocomplete="one-time-code"`. |
| `PasswordStrength` | ✅ | `level` weak, medium, good, excellent ; `rules` (libellé, ok). |
| `SocialButton`, `DividerLabel` | ✅ | `provider` google ou microsoft ; « ou » entre deux méthodes. |
| `AuthPanel` | ✅ | Colonne de marque : `theme` default, website, mobile, email ; `title`, `subtitle`, `illustration`. |

### Product Tour
| Composant | Statut | Notes |
| --- | --- | --- |
| `TourStep` | ✅ | `format` widget (314) ou modal (886) ; `color` (marque du client) et `tone` dark (texte blanc) ou light (texte noir) ; `image` + `imagePosition` ; `sender`, `progress`, `onClose` (croix dans l’en-tête) ; `label`, `title`, `description`, `notice`, `action` ; `onPrevious`, `onNext`. |
| `TourBubble` | ✅ | Étape widget avec flèche : `arrow` top, top-left, top-right, right, bottom, bottom-left, bottom-right, left. |
| `TourWelcome` | ✅ | Modale d’accueil : `variant` minimal, extend, resume (`steps`, `activeStep`). |

### Survey
| Composant | Statut | Notes |
| --- | --- | --- |
| `LinkSurvey` | ✅ | Questionnaire par lien : `shape` capsule ou full-page, `device`, `appearance` white, light, dark, glass-dark ; la taille du contenu suit (lg pleine page, md capsule, sm mobile). Contenu qui défile entre l’en-tête et le pied. |
| `ScaleAnswer`, `NpsAnswer` | ✅ | Réponses à `size` sm (widget), md (capsule), lg (pleine page). `kind` star, number, emoji, meteo. |

### Réglages et langues
| Composant | Statut | Notes |
| --- | --- | --- |
| `OptionToggle` | ✅ | Détail activable de la colonne de réglages (progression, avatar, couverture, logo…) : `active`, `onActiveChange`, réglages en enfants. |
| `FormatCard`, `LogicRule` | ✅ | Choix de format ; règle si / sinon avec condition et destination. |
| `TranslationTable`, `LanguageItem` | ✅ | Traduction d’un Told ; valeur absente = à traduire, `null` = en cours. |

### Gabarit
| Composant | Statut | Notes |
| --- | --- | --- |
| `AppLayout` | ✅ | Gabarit de l'application, deux versions : `menu="transparent"` (menu sur `--neutral-surface-page`, contenu en carte blanche, filet `--neutral-border-subtle`, rayon 16, `--shadow-flat-1`) ou `menu="filled"` (menu en bloc `--neutral-surface-sidebar` avec ombre intérieure, fond blanc, contenu sans carte). Slots `sidebar` (264 de large), `topbar`, `children`. Un seul en-tête par écran. AppSidebar et TopBar ne sont pas encore codés : on y met les vôtres en attendant. |

### Widget visiteur et assets
| Composant | Statut | Notes |
| --- | --- | --- |
| `Widget`, `WidgetChoice`, `WidgetButton`, `WidgetConsent`, `ChecklistItem` | ✅ | Le widget posé sur le site du client, thème clair et sombre. |
| `UserStory` | ✅ | Fiche de user story. |

Chaque composant a sa page dans Storybook (onglet « Docs ») avec ses propriétés modifiables en direct. Le commentaire au-dessus de chaque composant dans le code donne l'identifiant de son composant Figma.

## 9. Ce qui est dans Figma mais pas encore codé

Tout est visible dans Storybook, rubrique **Catalogue Figma** (aperçu, propriétés, statut, lien vers Figma). En bref :

- **Validé, à coder ensuite** : quelques pièces listées dans le catalogue (PremiumToast, SwitchOptionCard, InputTag, champs Contact, Profile, TextEditorControls, QuestionCard, GlassFrame, aperçus de l'onglet Design du widget, WidgetDropdown).
- **Pas encore validé** : Alert, AudioInput, FileItem, Illustrations, Selection, Slider ; Accordion, Cards, Conditions, ContentRow, Conversation, EmptyState, Headers, Menu, QuestionEdit, Scenario, Table ; AppSidebar, Auth, CommandPalette, Dashboard, Diffuser, EditionSidebar, Filter, Modals, OptionCustomisation, Report, TemplateSidebar.
- **Formats d'affichage d'un Told**, rangés le 18/11 :
  - page **ProductTour** : étape de tour (`TourItemBase`, formats modal, widget, welcome ; en-tête rien, avatar ou barre de progression ; image à gauche, droite, haut, bas), bulle ancrée (`Widget-tour`, flèche dans 8 directions), modale d'accueil et sommaire ;
  - page **Survey** : questionnaire par lien (`Link-survey`, formes full-page et capsule, desktop et mobile, styles white, light, dark, glass-dark), fond de page, contenu des questions (`survey_content`, partagé avec le widget).

Ne pas coder un composant ❌ sans en parler à Christof : il peut encore changer dans Figma.

## 10. Mettre à jour depuis Figma

| Ce qui change dans Figma | Fichier à remplacer | Commande |
| --- | --- | --- |
| Variables (couleurs) | `tokens/figma/*.txt` | `npm run tokens` |
| Icônes | `catalog/icons-*.txt` | `npm run icons` |
| Catalogue des composants | `catalog/figma-*.txt`, `public/catalog/*.webp` | `npm run catalog` |

Après une mise à jour : `npm run typecheck` et `npm run build-storybook` doivent passer, puis vérifier le rendu en clair et en sombre.

## 11. Contribuer (résumé de `CONTRIBUTING.md`)

1. Partir de `main` à jour, créer une branche `composant/<nom>`.
2. Un dossier par composant : `src/components/<Nom>/<Nom>.tsx`, `<Nom>.module.css`, `<Nom>.stories.tsx`.
3. Mêmes noms de propriétés et de valeurs que Figma (`size`, `state`, `checked`, `hasIcon`…), textes en français.
4. Uniquement des jetons, aucune valeur en dur. Chaque sélecteur CSS contient une classe locale (`.badge[data-color='blue']`), sinon Next refuse le CSS module.
5. Exporter dans `src/index.ts`, relier la fiche Figma dans `catalog/coded.json`, puis `npm run catalog`.
6. Ouvrir une pull request vers `main`. Cloudflare publie un Storybook d'aperçu de la branche, et Chromatic compare les captures avant et après.
7. Christof relit et fusionne. `main` est protégée : pas d'envoi direct.

## 12. Versions

- Numérotation `MAJEUR.MINEUR.CORRECTIF`. Tant qu'on est en `0.x`, une version mineure peut changer l'apparence : lire le `CHANGELOG.md`.
- Quand le numéro change dans `package.json` sur `main`, le tag et la page de version GitHub sont créés automatiquement.
- Historique : v0.3.0 densité compacte et icônes contour ; v0.4.0 OptionSidebar, Select, Modal, Badge, Tag, Avatar ; v0.5.0 `secondary-outline` ; v0.5.1 Select validé ; v0.6.0 ProgressBar, Loader, Skeleton, Notifications ; v0.6.1 correction du Badge pour Next ; v0.7.0 AppLayout ; v0.8.0 Auth, Product Tour, Survey, réglages et langues ; v0.8.1 contour des petites icônes, jeton de fond teinté ; v0.8.2 Figtree variable, medium à 550, icônes du menu à 16 ; v0.8.3 bordure grise plus contrastée ; v0.9.0 composants de Told Record (champ IA, couleur et contraste, copie, fil d'Ariane, barre d'outils, présence, bandeau, confirmation, choix visuel, en-tête de l'éditeur) ; **v0.9.1 trait des icônes à 1,5 px à l'écran ; **v0.10.0 IA, ButtonGroup, colonne Étapes**.

## 13. Règles à garder en tête

- Un seul en-tête par écran : `TopBar` porte le titre de la page et son action ; `PageHeader` sert aux titres à l'intérieur d'une page.
- Une seule action `primary` par vue ; `secondary-outline` pour une action secondaire discrète.
- Arrondis emboîtés : rayon intérieur = rayon extérieur moins la marge entre les deux.
- Écrans d'édition et Diffuser : toujours dans `EditorLayout` (en-tête, colonne gauche collée sur fond blanc avec filet, centre sur `--neutral-surface-canvas`). Diffuser : `left` = SelectionCardGroup des canaux, `content="page"` (680 max ; InfoCard 680 × 180 au moins), InfoCard du canal puis Card, pas de `right`. Pas de mise en page maison centrée avec des colonnes flottantes.
- Élément de tête facultatif (icône, glyphe, pastille, vignette, avatar) : la marge réduite côté tête ne s'applique que quand la tête est là ; sans tête, même marge des deux côtés. Dans Figma : marge du conteneur = marge côté tête, texte dans un cadre « Contenu » qui porte le complément des deux côtés (comme Button).
- Accessibilité : chaque `ButtonIcon` a un `label` ; les composants gèrent le clavier (Select, Modal, onglets) et réduisent les animations si l'utilisateur l'a demandé.
- Vocabulaire du produit : on dit « un Told » pour un contenu créé (questionnaire, tour, annonce), et « étape › page › bloc » dans l'éditeur.

## 14. Qui fait quoi

- **Christof** : Figma, validation ✅, relecture des pull requests, publication des versions.
- **Développeurs** : code des composants validés, intégration dans Told et Told Record, signalement des écarts entre Figma et le code (ouvrir une issue GitHub avec la capture et le lien Figma).
