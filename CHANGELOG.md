# Versions

Chaque version a un tag Git (`vX.Y.Z`). Pour en choisir une dans un projet :
`npm install github:christof-lambrechts/told-design-system#v0.3.0`

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
