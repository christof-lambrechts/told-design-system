# Versions

Chaque version a un tag Git (`vX.Y.Z`). Pour en choisir une dans un projet :
`npm install github:christof-lambrechts/told-design-system#v0.3.0`

## v0.29.0 · 23/11/2026

- **PositionPicker** (Figma 9807:117400, page Options) : choix d'une position sur l'écran, générique. Places libres en points gris, la place choisie montre l'élément en plein (contour de marque), le survol le montre en pâle. `positions` 9 (3 × 3) | 5 (4 coins et bas au centre) | liste ; `item` widget | avatar ; `label` au-dessus ; groupe radio, flèches au clavier. Libellés lus : `positionLabels`.
- **AvatarSettings** (Figma 9808:3487) : contenu du réglage Avatar de l'éditeur Record (dans un `OptionItem variant="open"`) : `avatar` (emplacement pour AvatarPicker ou ChoiceChips), Position (PositionPicker 5, avatar), Taille, Forme, Contour (Aucun, Couleur, Verre clair, Verre sombre), Couleur du contour (ColorField sans contraste, visible avec « Couleur »), note « Ces réglages valent pour tous les slides. ».
- **ColorField** : libellé au style des options (Medium 11/14, Content/muted), comme Figma.

## v0.28.0 · 21/11/2026

- **Alert** (Figma 6259:87310, page Alert validée) : message dans le contenu (carte, panneau, sous un champ) : `type` brand, warning, error, success, neutral, neutral-light, neutral-dark ; `size` lg | sm ; titre, description, `actionText` + `onAction` (lien), `actions` (boutons), `onClose`. À ne pas confondre avec **Banner** (bandeau pleine largeur en haut d'une page).
- **ChannelSection `aside`** (Figma `hasBadge`) : état à droite du titre, ex. Badge « En ligne · publiée par Léa le 21 nov. » ou « Brouillon ». L'action principale de la rubrique (Publier, Mettre en pause) prend toute la largeur (`Button fullWidth`).

## v0.27.2 · 21/11/2026

- InfoCard : titre en Body/18/Semibold (comme Figma, était 16), marge gauche du texte 40 (était 24) pour équilibrer avec l'illustration, écart titre / texte 8.

## v0.27.1 · 21/11/2026

- EditorLayout : trame de points (DotGrid) de retour en Construire (`content="center"`, par défaut), fond uni en `content="page"` (Diffuser, Analyser). Décision de Christof.

## v0.27.0 · 21/11/2026

Décision de Christof : md à 36 (grille de 4, progression 28 / 36 / 44).

- **md 36** (était 34) : Button, ButtonIcon, ButtonMisc, Input, SearchBar, Select, CopyField, SocialButton, ContrastBadge.
- **GroupTab sur l'échelle** : `md` 36 (défaut, segments 28), `lg` 44 (segments 36) ; `sm` reste accepté comme ancien nom de md. Figma : variantes sm renommées md.
- ButtonTab inchangé (22 / 28 / 34) : petit élément, hors échelle.
- Story Hauteurs alignées avec GroupTab, mesurée 28 / 36 / 44.

## v0.26.0 · 21/11/2026

Demande de Christof : tous les contrôles d'une même taille à la même hauteur (essai lg 44).

- Échelle : **sm 28, md 34, lg 44** (lg était 40). Button, ButtonIcon, ButtonGradient, ButtonDropdown, Input, SearchBar, Select en lg : 44.
- Input sm et md mesuraient 30 et 36 (contour en plus) : corrigés à 28 et 34.
- CopyField : tailles `md` 34 et `lg` 44 (défaut lg ; `sm` reste accepté comme ancien nom de md). Avant : sm 32, md 40.
- Story Composants › Actions › Button › Hauteurs alignées (mesurée : 28 / 34 / 44 partout).
- Figma aligné (Button, ButtonIcon, ButtonGradient, ButtonDropdown lg 44 ; _InputBase, Input, SearchBar, Select, InputTag 28 / 34 / 44 ; CopyField md 34 / lg 44).

## v0.25.1 · 21/11/2026

- InfoCard : 680 de large au plus, 180 de haut au moins ; illustration iframe avec le smiley et le cadre jaune orangé (mustard-400, 3 px), comme Figma et la production.
- EditorLayout `content="page"` : colonne de 680 au plus (avant 760), comme Diffuser.

## v0.25.0 · 21/11/2026

Demandes de Christof.

- **InfoCard** (bandeau en tête d'un canal) : `type` link, iframe (bandeau jaune des intégrations, nouveau dans Figma), video, embed, email ; titre, description, action facultative, illustration à droite.
- **EditorLayout `content="page"`** : colonne de lecture de 760 max, en haut, écart 24 (Diffuser, réglages en cartes). Story Gabarits › EditorLayout › Diffuser (Record).
- Règle : Diffuser utilise le même gabarit que l'éditeur (menu des canaux collé à gauche, fond blanc et filet ; centre sur le canevas ; InfoCard puis Card ; pas de 3e colonne).

## v0.24.0 · 21/11/2026

Demande de Christof.

- OptionItem `control` (Figma `hasControl`) : réglage court posé directement sur la ligne (Button neutre secondary-outline md + chevron qui ouvre un DropdownMenu), sans badge de valeur ni dépliage. Ex. Durée « Auto · 3 s » : un clic de moins. Story Panneaux › OptionSidebar › Réglage sur la ligne.

## v0.23.0 · 21/11/2026

Validé par Christof le 21/11 (Diffuser de Record, options).

- Nouveaux : `Card` et `CardHeader` (ex-EditionCardHeader, en-tête commun à la plateforme), `ChannelSection` (rubrique numérotée d'une carte de canal), `OptionCard` (ex-SwitchOptionCard : fond gris fixe, picto en carré blanc, interrupteur ou contrôle à droite, contenu sous l'option active), `OptionChoiceGroup` (ex-SelectionItem : choix à picto et badge sous une option), `SelectionCardGroup` (menu à onglets avec description, canaux de Diffuser).
- Icône `download-05` (plein et contour).
- Stories : Composants › Cartes › Carte et en-tête (canal lien, canal vidéo, menu des canaux, OptionChoice).

## v0.22.1 · 21/11/2026

Décision de Christof.

- Fond à points (DotGrid) réservé aux Scénarios : `EditorLayout` n'a plus de points par défaut (`dots` déconseillée, `false`), la zone d'édition est un fond uni `--neutral-surface-canvas`.
- `--neutral-surface-pattern` passe de gray-40 à **gray-30** en clair (comme Figma).

## v0.22.0 · 21/11/2026

Validé par Christof le 21/11.

- StepList : les boutons d'ajout ne s'affichent qu'au survol de la colonne ou au clavier (`revealAdd`, `hover` par défaut, `always` pour l'ancien comportement). Concerne `StepAddThumb`, la nouvelle prop `addAfter` (barre « Ajouter une slide » après la dernière slide) et tout élément marqué `data-step-add`. Figma : StepList `state=default | hover`, StepGroup `hasAdd`.
- Story StepList alignée sur Figma : Début, slides, Fin, sans en-tête « Étapes · n » ni boutons en bas.

## v0.21.4 · 21/11/2026

Règle de Christof : sans élément de tête, même marge des deux côtés.

- ChoiceChips sans tête : 10 / 10 (avant 6 / 10).
- QuickSuggestion sans icône : 12 / 12 (avant 10 / 12).
- Tag sans icône : 12 / 12 comme dans Figma (avant 8 / 12).
- Règle ajoutée au guide développeur.

## v0.21.3 · 21/11/2026

- `FormatOptionGroup` rangé avec OptionItem (dossier OptionSidebar, story Panneaux › OptionSidebar › FormatOption), comme dans Figma (page OptionContent). Import inchangé depuis le paquet.

## v0.21.2 · 21/11/2026

Validé par Christof le 21/11.

- Tooltip : repère plein de 8 (avant 12 cerclé de blanc), 4 px d'air entre le repère et l'élément visé.

## v0.21.1 · 21/11/2026

Validé par Christof le 21/11.

- Libellé au-dessus des onglets (`GroupTab label`) : Medium 11/14, écart 4 avec les onglets (avant 12 px regular, écart 6).
- Nouvelle classe `.text-label-option` (Figma : style `Other/Label option`) pour tout libellé de réglage dans un panneau Options.

## v0.21.0 · 21/11/2026

Validé par Christof le 21/11.

- **FormatOptionGroup** (nouveau, FormatOption) : choix du format dans le panneau Options. Lignes compactes : illustration 64 × 44, titre, phrase, coche ronde ; la ligne choisie (fond bleu pâle, contour bleu) porte ses réglages (`settings`, ex. Orientation en GroupTab avec `label`). Groupe radio, flèches au clavier.
- **ChoiceIllustration** : trois illustrations des formats Told Record, `demo`, `announcement`, `inapp`.
- **StepGroup** : la pastille ne porte plus que le numéro (« 1 », lu « Slide 1 » ; `badgeLabel` pour changer le mot), le chevron passe à droite : plus de place pour le titre.

## v0.20.0 · 21/11/2026

- **AvatarGroup / PresenceAvatar** (D-026) : `id` / `personId` (teinte stable par personne, la même partout), `idle` (présent mais inactif : avatar estompé, « inactif » lu par les lecteurs d'écran).

## v0.19.0 · 21/11/2026

D-020 terminé (Figma validé le 21/11).

- **StepThumb** : `multiSelected` (sélection multiple : fond bleu pâle, contour fin, coche bleue en haut à gauche ; `selected` reste l'étape en cours), `drop="before" | "after"` (ligne de dépôt pendant un glisser), `dragging` (vignette glissée estompée).
- **StepDropLine** (nouveau, _StepDropLine) : ligne bleue verticale avec deux pastilles.
- **InsertBar** : `label` (ex. « Insérer une slide » entre deux slides) ; `dropTarget` pendant un glisser.
- Story « Sélection multiple et glisser ».

## v0.18.0 · 21/11/2026

- **GroupTab** : `label` (libellé en petit au-dessus, comme les panneaux de Figma, relié par `aria-labelledby`) et `fullWidth` (vrai par défaut avec `label`) : le contrôle prend toute la largeur du panneau. Règle des panneaux d'options (Taille, Forme…).

## v0.17.0 · 21/11/2026

- **Filtres** (page Filter ✅, 19/11) : `FilterBar` (page ou flottante, puces qui passent à la ligne, « + Filtre », Effacer en rouge, Enregistrer la vue), `FilterChip` (champ, opérateur, valeur ; texte ou avec icône ; ouverte ; incomplète en pointillés ; croix), `FilterLogic` (Et / Ou), `FilterMenu` (recherche, types par famille ou suggestions, flèches, Entrée, Échap, raccourci F affiché).

## v0.16.0 · 21/11/2026

- **Icônes pleines par défaut** (règle de Christof) : `Icon` passe en `variant="solid"` par défaut. Le contour ne reste qu'au repos dans les menus (NavButtonItem, entrées de DropdownMenu). ButtonTab, TextTab, GroupTab et FloatingToolbar sont toujours en plein. Une icône posée sans `variant` dans une app passe donc en plein. Les chevrons (`arrow-*-01`) restent en trait par défaut, comme dans Figma.

## v0.15.0 · 21/11/2026

Pièces de l'en-tête de l'éditeur (EditorHeaderRecord / EditorHeaderTold).

- **ButtonEditionMenu** (nouveau, 1018:49167) : bouton du menu de l'éditeur, logo Told mini + chevron, blanc 5 % et filet 10 %, `open`.
- **EditorSteps** (nouveau) : Construire › Diffuser › Analyser au centre de l'en-tête ; icône pleine sur l'étape en cours ; point vert (en ligne) ou rouge (brouillon) sur Diffuser ; Analyser désactivé tant que rien n'est publié.
- **ButtonTab** : `color="inverse"` (en-tête sombre : texte blanc, sélection blanc 12 %), `dot` + `dotLabel` (point d'état).
- **EditorHeader** : avec `center`, trois colonnes et centre vraiment centré ; sous-navigation de 44 (au lieu de 54). Stories « V1 · brouillon » et « V1 · en ligne » conformes à Figma.

## v0.14.0 · 20/11/2026

Demandes de Told Record D-016 à D-018, D-020 (en partie) et D-021.

- **OptionItem** (D-021) : collaboration avec `holder` (« Léa modifie ce réglage », texte bleu et point) et `conflict` (point orange, `conflictLabel` lu) ; `toggle.disabled` ; titre de section en `h3` (`headingLevel`, `false` pour aucun) ; `labelId` (id du libellé, pour `aria-labelledby` des champs) ; le chevron replie aussi au clic ; l'aide `info` devient un bouton focalisable.
- **ChoiceChips** (D-021) : `disabled` pour le groupe et par option, `title` par option (aide lue), `aria-labelledby`, flèches, Début et Fin au clavier avec un seul arrêt de tabulation.
- **Button / ButtonIcon en lien** (D-016) : tous les attributs d'ancre sont transmis (`target`, `rel`, `download`, `data-*`…) ; `rel="noopener noreferrer"` par défaut avec `target="_blank"` ; `disabled` rend le lien inactif.
- **DropdownMenu** (D-017) : `kind="menu"` pour un menu d'actions (`role="menu"`, entrées `menuitem`, flèches, Début, Fin, Échap avec `onEscape`, `autoFocus`) ; entrée désactivée focalisable avec sa raison (`title`) ; liens avec `target`, `rel`, `title`. `kind="listbox"` reste le défaut (Select).
- **SliderCapsule** (D-018) : un clic sur la piste place la valeur ; le repère de valeur par défaut est une cible de 16 joignable au clavier.
- **StepThumb / StepGroup** (D-020, en partie) : StepThumb transmet ses attributs au bouton (`draggable`, événements de glisser, `onKeyDown`, `data-*`) et accepte `preview` (vignette d'un intertitre) ; StepGroup peut être contrôlé (`expanded`, `onExpandedChange`). Sélection multiple et « + » d'insertion : à dessiner dans Figma d'abord.

## v0.13.2 · 20/11/2026

- `OptionPanel` et `OptionPanelItem` (anciens noms, déconseillés) sont exportés comme de vrais exports et plus comme alias, pour que l'outil de correspondance de Told Record (`ds:sync`) les reconnaisse.

## v0.13.1 · 20/11/2026

- **Jetons de l'avatar Told Record** (RecordAvatar, Figma) : `--component-record-avatar-frame`, `--component-record-avatar-media`, `--component-record-avatar-border`, avec les trois modes d'arrondi par `data-radius` (default = carré arrondi 24, roundy = rond, sharp = carré).
- Le lecteur public de Told Record reste dans le dépôt Record (paquet autonome) : l'Annonce et l'avatar y sont décrits par la demande D-015 (claude/V3-demandes-ds-record.md).

## v0.13.0 · 20/11/2026

- **OptionItem et OptionSidebar deviennent les vrais noms** : dossier `src/components/OptionSidebar/`, page Storybook « Panneaux/OptionSidebar », types `OptionItemProps` et `OptionSidebarProps`. `OptionPanel` et `OptionPanelItem` restent exportés comme anciens noms (déconseillés) : rien ne casse.
- Catalogue, guide développeur et NOMMAGE à jour.

## v0.12.2 · 20/11/2026

- **Noms alignés entre Figma et le code** (docs/NOMMAGE.md § 1 et 2) : Figma reprend les noms du code, plus clairs pour un développeur ou une IA. Select (ex-DropdownField), Modal (ex-ModalBase), Tag, Flag, Logo, ProgressSteps, TourStep, TourBubble, TourWelcome, LinkSurvey, NpsAnswer, ScaleAnswer ; EditorHeaderTold et EditorHeaderRecord dans Figma pour le gabarit EditorHeader. Utiliser OptionItem et OptionSidebar dans le nouveau code. Aucun changement d'API : les anciens alias restent exportés.
- Règle de nommage d'un nouveau composant précisée (mot le plus courant chez les développeurs, pas de suffixe Base, pas d'année, pas de français).
- Catalogue Figma regénéré avec les nouveaux noms.

## v0.12.1 · 20/11/2026

- **Breadcrumb** : la prop `status` revient, marquée déconseillée. Told Record s'en sert pour la lecture seule, la publication et l'état de sauvegarde ; la retirer cassait l'éditeur. Le badge reste retiré de Figma.

## v0.12.0 · 20/11/2026

Composants validés dans Figma le 20/11 et demandes de Told Record (D-00X).

- **Nouveaux** : `SliderCapsule` (D-010 : libellé, barre, valeur en case, point de valeur par défaut cliquable, plage), `ChoiceChips` (D-008 : pastilles à icône, couleur, vignette, avatar + Écouter, glyphe « Aa »), `CommentCard` (open, unread, resolved), `CommentPin`, `CommentComposer`, `Mention`, `CheckList` + `CheckRow`, `EmptyState` (D-013, illustration en emplacement), `EditorLayout` (gabarit d'éditeur), `StepAddThumb` (vignette « + »).
- **OptionItem / OptionPanelItem** (D-009) : `variant` row | collapsible | open, `onAction` (lien d'action), `toggle` (interrupteur), `info` ; icône facultative.
- **StepList** : sections `intro` (Début) et `end` (Fin) ; en-tête facultatif.
- **Breadcrumb** : prop `status` supprimée (badge retiré de Figma) ; `titleLabel`, `titleMaxLength` ; **EditableTitle** `inputLabel` ; le titre rétrécit (D-003).
- **Button / ButtonIcon** : `href` + `linkAs` (D-006). **DropdownItem** : `href`, `linkAs`, `disabled` (D-007).
- **Checkbox, Radio, Switch** : le vrai champ couvre tout le contrôle (D-004). **NavButtonItem** : fond sélectionné visible (D-005). **EditorHeader** : grille `minmax(0, 1fr) auto auto` (D-002).
- **ProgressSteps** : `theme="dark"` (barre blanche sur fond couleur).
- **Jetons** : `--neutral-border-divider` (nouveau) ; `--neutral-surface-canvas` gray-10, `--neutral-surface-pattern` gray-40.
- docs/NOMMAGE.md et catalogue à jour.

## v0.11.0 · 20/11/2026

- **OptionItem** et **OptionSidebar** : nouveaux noms exportés (alias de `OptionPanelItem` et `OptionPanel`), suite à la fusion Figma du 20/11 (PanelSection et OptionPanelItem deviennent OptionItem ; OptionPanel et StepOptionsPanel deviennent OptionSidebar). Les anciens noms restent exportés.
- docs/NOMMAGE.md à jour.

## v0.10.2 · 20/11/2026

- **docs/NOMMAGE.md** mis à jour : ajouts Figma du 19 et 20/11 pas encore codés (EditorLayout, FormatModal, ZoomSlider, StepThumbMenu, AnnouncementSlide, MediaFrame, _SlideHeader, AnnouncementBlock…), propriétés changées (StepList, StepThumb, PanelHeader, PanelSection, ProgressBarWidget, EditionNavRecord), proposition OptionItem / OptionSidebar, jetons du canevas. Aucun changement de code.

## v0.10.1 · 19/11/2026

- **docs/NOMMAGE.md** : correspondance des noms Figma, code et Told Record, des propriétés, doublons à régler.
- **Alias** des noms Figma : `ModalBase` (Modal), `DropdownField` (Select), `FlagCountry` (Flag), `TourItemBase` (TourStep), `ProgressBarWidget` (ProgressSteps).

## v0.10.0 · 19/11/2026

- **AiTag** (étiquette « IA » violette, xs 16 sur les vignettes, sm 20 à côté d'un titre) et **AiNotice** (bandeau violet : `review` à relire, `generating` l'IA travaille, `done` résultat ; un ou deux liens d'action).
- **ButtonGroup** : boutons accolés (Partager + Aperçu), seuls les coins extérieurs arrondis ; `appearance` outline (contour commun) ou inverse (blanc 12 % sur en-tête sombre).
- **StepThumb**, **StepGroup**, **StepList** : colonne Étapes de l'éditeur Told Record. Vignette 16:10 dans un cadre blanc à bordure (numéro, point « À compléter », étiquette IA, présence, menu au survol, état vide), slide repliable avec pastille et nombre d'étapes, colonne avec en-tête « Étapes · n », lien orange et pied d'actions.
- **Icône** `share-03` (partage de média : plateau et flèche vers le haut).

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
