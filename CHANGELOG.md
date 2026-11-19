# Versions

Chaque version a un tag Git (`vX.Y.Z`). Pour en choisir une dans un projet :
`npm install github:christof-lambrechts/told-design-system#v0.3.0`

## v0.9.1 · 19/11/2026

- **Icon** : contour plus épais. Le trait fait maintenant **1,5 px à l'écran** aux petites tailles (14, 16, 20), au lieu de 1,25 px, et 1,75 sur la grille de 24 au-delà. Rien à changer dans le code qui utilise `Icon`.

## v0.9.0 · 19/11/2026

Composants validés dans Figma pour Told Record (page d'audit), codés d'après les pages Figma :
- **Button** : `color="ai"` (action IA : contour en dégradé violet → bleu, texte et étoile violets) et `color="rec"` (démarrer un enregistrement : rouge, point blanc). Pour ces deux couleurs, `variant` est ignoré.
- **Badge** : `dot` (point de la couleur du texte) et `secondDot` (second point orange, « Publiée · modifiée »).
- **GroupTab** : `count` sur chaque segment. **Input** et **TextArea** : `counter` à droite du libellé (« 94 / 280 ») et `warning` quand la longueur conseillée est dépassée.
- **Modal** : croix neutre à fond léger (`subtle`), option `centered`. Nouveau **ConfirmModal** : titre et description centrés, Annuler en neutre tertiaire, bouton rouge si `danger`, croix et illustration en option.
- **Banner** : bandeau pleine largeur (brand, warning, error, success, neutral), lien d'action et croix en option.
- **ColorField**, **ContrastBadge**, **ContrastMenu** : champ couleur avec contrôle de contraste AA ou AAA et « Corriger la couleur » (même teinte, clarté ajustée), annulable. Fonctions exportées : `contrastRatio`, `fixContrast`, `formatRatio`, `passes`.
- **CopyField** (lien à copier, sm 32 ou md 40) et **CodeBlock** (code d'intégration coloré, « Copier le code » → « Copié »). Jetons `--neutral-surface-code` et `--neutral-border-code`.
- **Breadcrumb** et **EditableTitle** : fil d'Ariane avec retour, titre renommable sur place et statut ; `theme="dark"` pour l'en-tête de l'éditeur.
- **FloatingToolbar**, **ToolbarItem**, **ToolbarDivider** : barre d'outils flottante, clair ou sombre, outil actif en couleur de marque.
- **AvatarGroup** et **PresenceAvatar** : pile de présence, « +N », liseré clair ou sombre. Jetons `--presence-*` (8 teintes) et `presenceColorFor(id)` pour garder la même couleur à une personne.
- **IntentInput**, **PromptChip**, **QuickSuggestion**, **IntentPanel** : champ de consigne IA (Entrée envoie, micro, réglages), suggestions rapides en violet, bandeau avec l'action « Enregistrer ».
- **ChoicePicker**, **ChoiceThumb**, **ChoiceIllustration** : choix visuel par vignettes illustrées (ratios, formats) et aperçu réel dessous.
- **EditorHeader**, **EditorSaveState**, **EditorChanges** : en-tête sombre de l'éditeur Record (fil d'Ariane, présence, relecture, partage, aperçu, publier, sous-navigation et état).

## v0.8.3 · 19/11/2026

- **Bordure grise plus contrastée** : `--neutral-border-default` (et ses équivalents inverses) passe du gris 40 (#e8ecf0) au gris 50 (#dfe5ea). Tous les champs, cartes, boutons à contour et séparateurs qui utilisent cette bordure gagnent un peu de contraste. Le survol reste au gris 100.

## v0.8.2 · 19/11/2026

- **Typo** : Figtree passe en police variable (`@fontsource-variable/figtree`, famille `Figtree Variable`). Le medium passe de 500 à **550** (`--font-weight-medium`), comme les styles Body Medium dans Figma. Si votre projet charge Figtree lui-même (Google Fonts), demandez la plage `wght@300..900` au lieu des graisses fixes, sinon 550 s’affiche en 500 ou 600.
- **NavButtonItem** : icônes du menu de 14 à 16 (icône de gauche et chevron).

## v0.8.1 · 19/11/2026

- **Icon** : contour épaissi aux petites tailles. Le trait reste à 1,25 px à l’écran quelle que soit la taille (16 et 20 dans le menu ne sont plus trop fins). Rien à changer dans le code qui utilise `Icon`.
- **Jeton** `--brand-surface-tint` : fond teinté de marque (bleu clair en mode clair, bleu transparent en sombre), utilisé pour l’initiale du sélecteur de projet.

## v0.8.0 · 18/11/2026

Composants codés d’après les pages Figma validées :
- **Auth** : `CodeInput` (6 cases, collage du code, compte à rebours de renvoi, erreur), `PasswordStrength` (4 niveaux et règles), `DividerLabel` (« ou »), `SocialButton` (Google, Microsoft), `AuthPanel` (colonne de marque, 4 thèmes).
- **Product Tour** : `TourStep` (étape widget ou modale, image à gauche, droite, haut, bas ; en-tête avatar ou progression ; croix dans l’en-tête ; encadré et bouton d’action), `TourBubble` (bulle ancrée, flèche en 8 positions), `TourWelcome` (modale d’accueil minimal, extend, resume avec sommaire). Couleur du client par `color`, texte blanc ou noir par `tone`.
- **Survey** : `LinkSurvey` (capsule, pleine page, mobile ; styles white, light, dark, glass-dark ; contenu qui défile entre l’en-tête et le pied), `ScaleAnswer` (étoiles, chiffres, émotions, météo) et `NpsAnswer` à trois tailles : `sm` widget, `md` capsule, `lg` pleine page.
- **OptionContent** : `OptionToggle` (détail activable : libellé, interrupteur, réglages), `FormatCard`, `LogicRule` (si / sinon).
- **Languages** : `TranslationTable` (colonnes fixes Élément et langue par défaut, autres langues qui défilent, cases à traduire et en cours), `LanguageItem`.

## v0.7.0 · 18/11/2026

- **AppLayout** (page Figma `📐 Templates / AppLayout` validée ✅) : gabarit de l’application en deux versions, `menu="transparent"` (menu sur le fond de page, contenu en carte blanche) ou `menu="filled"` (menu en bloc avec fond et ombre intérieure, contenu posé sur fond blanc). Un seul en-tête par écran (TopBar). Menu de 264 de large.
- Pages Figma validées depuis la v0.6.1 (à coder ensuite) : Survey, ProductTour, OptionContent, Auth, AppLayout.
- Rangement Figma : Displayer devient Email ; pièces communes du widget, de la Survey et du tour dans la page Widget ; DropdownMenu regroupe les listes et le menu « … » ; filtres renommés et traduits.

## v0.6.1 · 18/11/2026

- **Correction Next.js** (proposée par Jonathan) : les couleurs du `Badge` sont rattachées à la classe `.badge`. Next refusait le fichier (« Selector is not pure ») et bloquait la construction de tout projet qui importe le design system. Rendu inchangé.

## v0.6.0 · 18/11/2026

- **Nouveaux composants** (pages Figma validées ✅) :
  - `ProgressBar` (avancement de 0 à 100, sm ou lg, horizontal ou vertical), `ProgressSteps` (étapes du widget ou d'un tour, multi ou single), `Loader` (3 styles, 7 tailles, « Chargement… »), `SkeletonLine` et `SkeletonCard`.
  - `NotificationCenter` (panneau de 400, onglets Toutes et Non lues, groupes par période, Tout marquer comme lu, réglages) et `NotificationItem` (non lue, lue, survol).
- Catalogue : ProgressBar validé ✅ ; nouvelles pages Figma **ProductTour** et **Survey** (composants sortis de Displayer).
- Guide développeur : `docs/GUIDE-DEVELOPPEUR.md`.

## v0.5.1 · 18/11/2026

- **Select** validé dans Figma (DropdownField ✅) : chevron sans fond rond, hauteurs alignées sur Input et Button (28, 34, 40). Le code avait déjà ce rendu ; catalogue et documentation mis à jour.
- Documentation Figma du Button mise à jour (cinq types, tailles compactes, jetons de secondary-outline).

## v0.5.0 · 18/11/2026

- **Button** : le type `secondary` devient `primary-outline` (contour de la couleur, rendu inchangé ; `secondary` reste accepté). Nouveau type **`secondary-outline`** : contour gris clair comme les champs, texte de la couleur, pour une action secondaire qui doit moins attirer l'œil. Jetons `Button/ButtonSecondaryOutline/border/default` et `/hover`.

## v0.4.0 · 18/11/2026

- **Nouveaux composants** (pages Figma pas encore validées ✅, l'API peut bouger) :
  - Panneau d'options : `OptionPanel`, `OptionPanelItem` (option repliable avec picto, valeur, Pro, obligatoire), `PanelHeader` (picto, titre, description, « Changer de type », retour, menu).
  - `Select` (champ à liste, mêmes hauteurs que Input, clavier), `DropdownMenu`, `DropdownItem`.
  - `Modal` (fenêtre 500, en-tête, contenu, pied, filets en option, Échap et clic sur le voile ferment).
  - `Badge` (9 couleurs × subtle, outline, fill × xs à lg) et `Tag` (libellé, valeur, croix).
  - `Avatar` (initiales, icône, photo, logo, 12 à 60).
- `NavButtonItem` : version lien avec `href` (et `linkAs` pour le `Link` de Next ou React Router).
- **Icônes** : shield-01, film-01, puzzle, crop, search-add (zoom), subtitle, camera-01, repeat, screen-rotation (plein et contour).
- **Pictos de couleur** : crop, blur, capture, tooltip, zoom, orientation, loop, brand-kit (plein et teinté).
- Jetons ajoutés : Badge, Dropdown, SelectionBox.

## v0.3.0 · 17/11/2026

- **Densité compacte** (change l'apparence) : texte courant 14 → 13 px (interligne 18), 16 → 15 px ; contrôles plus bas, lg 40, md 34, sm 28, xs 22 (boutons, champs, onglets, entrées de menu) ; marges et icônes réduites dans les mêmes proportions. Le widget visiteur ne change pas.
- **Icônes** : contour par défaut, plein avec `variant="solid"` (état actif). Les entrées de menu et onglets sélectionnés passent en plein tout seuls.
- **Nouveau** : `IconBoxedColor` (85 pictos de couleur, `appearance` filled | subtle, tailles 24 / 32 / 40).
- Interrupteur recalé (pastille centrée, 3 px de retrait).
- Licence MIT.

## v0.2.0 · 17/11/2026

- Première version de la densité compacte (remplacée par v0.3.0).

## v0.1.0 · 16/11/2026

- Jetons (couleurs clair / sombre, typographie, espacements, rayons, ombres), 156 icônes, catalogue Figma.
- Composants : Button, ButtonIcon, ButtonGradient, ButtonDropdown, ButtonLink, Checkbox, Radio, Switch, Kbd, Divider, Tooltip, Toast, TextTab, ButtonTab, GroupTab, Input, SearchBar, TextArea, Pagination, NavButtonItem, Logo, Flag, FileUploader, GettingStarted, ModuleCard, Widget, AddBlockModal, Calendar, UserStory.
