# Versions

Chaque version a un tag Git (`vX.Y.Z`). Pour en choisir une dans un projet :
`npm install github:christof-lambrechts/told-design-system#v0.3.0`

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
