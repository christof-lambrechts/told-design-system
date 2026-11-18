# Versions

Chaque version a un tag Git (`vX.Y.Z`). Pour en choisir une dans un projet :
`npm install github:christof-lambrechts/told-design-system#v0.3.0`

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
