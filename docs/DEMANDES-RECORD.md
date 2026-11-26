# Demandes au design system depuis Told Record

Ce fichier relie deux conversations, et il est lisible par les deux sur GitHub :
- la conversation **Code Told Record** (dépôt jscanzi/toldrecord) ;
- la conversation **Design system** (Figma DS et ce dépôt, told-ds).

Il remplace le document de projet `claude/V3-demandes-ds-record.md` (23/11/2026), que la conversation Told Record ne pouvait pas lire (décision 0048 de Told Record).

## Règles
- La conversation Code ne modifie jamais le design system : ni le fichier Figma, ni ce dépôt (sauf ce fichier, par pull request), ni un composant DS recopié à la main dans Record.
- Quand il manque quelque chose au DS (composant, variante, propriété, icône ou jeton), ou qu'un composant DS ne colle pas à l'écran Record :
  - elle ajoute une demande ci-dessous, par pull request, sans toucher au reste du fichier ;
  - elle continue avec un contournement provisoire, signalé dans le code par `// TODO DS: D-00X`.
- La conversation Design system traite les demandes, dans Figma puis dans told-ds. Elle répond sous chaque demande (Statut, Réponse DS) sur `main`, avec ses versions.
- Ordre : Figma d'abord, puis validation par Christof, puis code dans told-ds. Les noms vont dans `docs/NOMMAGE.md`.
- Record lit ce fichier sur `main` (pas la copie figée dans `node_modules`) et écrit ses lignes « Réponse Record ».
- Avancement détaillé côté DS : `claude/V3-avancement-ds.md` (document de projet).
- Mise à jour du DS dans Record (décision 0046) : une seule branche, `chore/design-system` ; le DS est figé par commit ; les composants s'importent seulement via `src/components/ds.ts`.
- Sens « DS vers Record » : quand le DS a validé un écran ou un rendu que Record doit appliquer (lecteur, éditeur), il l'écrit ici aussi, avec « Sens : demande du DS vers Record ».

## Modèle d'une demande
```
### D-00X · Titre court
- Date, écran Record concerné (fichier, route) :
- Besoin (ce que l'écran doit faire) :
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) :
- Contournement provisoire dans Record :
- Priorité : bloquant | important | confort
- Statut : à faire | en cours (Figma) | à valider (Figma) | validé Figma | codé told-ds vX.Y.Z | refusé (raison)
- Réponse DS :
```

## Version told-ds v0.27.0 (21/11) : ce qu'il faut reprendre dans Record

- **23/11 (16 h) : told-ds v0.36.0** : écrans de début et de fin communs (`StartScreen`, `EndScreen` et leurs pièces) ; v0.35.0 : animation de validation de `CodeInput`. À appliquer : **D-041**.
- **23/11 (15 h 30) : told-ds v0.34.0** (ProUpsellCard) et **v0.33.0** : `ChoiceField`, `EyebrowSettings`, `LogoSettings`, `OptionContextHeader`. À appliquer : **D-038**, **D-039**, **D-040**.
- **23/11 (15 h) : told-ds v0.32.0** : MediaFrameSettings `slideOrientation` (vertical = pas d'ordinateur, tablette en portrait), `captureZoom` (zoom de la capture dans l'écran), `allowedMediaFrames` ; icône `tablet-01`. À appliquer : **D-036**, puis **D-037** (proposition, plan à valider par Jonathan).
- **23/11 (après-midi) : told-ds v0.30.0** : `MediaFrameSettings`, `MediaCropSettings`, PositionPicker `item="media"`. À appliquer : **D-034**, **D-035**.
- **23/11 : told-ds v0.29.0** (commit `5bf53a8`). Branche **christof** passée en v0.29.0 (f2ad57c, 688 tests OK) ; **PR n° 68** (chore/design-system, main fusionné, 698 tests OK) à fusionner par Jonathan. Nouveautés : `PositionPicker`, `AvatarSettings`, libellé de ColorField. À appliquer : **D-031**, **D-032**, **D-033**.
- La **PR n° 60** (branche `chore/design-system`) passe main en told-ds **v0.28.0** (commit `5a67f8524af492d2972bbc00c92d6ae00baf8a9a`). Typecheck OK, 681 tests OK, aucun changement de code de l'app. À fusionner par Jonathan.
- La branche **`christof`** est aussi en **v0.28.0** (commit 81ae1cd), **sans** fusion de main : main et christof se contredisent dans `editor/editor.tsx` et `tests/e2e/copywriter-ia.spec.ts`. La conversation Code fusionne main dans christof et règle ces deux conflits elle-même.
- Depuis v0.22.0 : DotGrid réservé aux Scénarios et motif gray-30 (v0.22.1) ; `Card`, `CardHeader`, `ChannelSection`, `OptionCard`, `OptionChoiceGroup`, `SelectionCardGroup`, icône `download-05` (v0.23.0) ; OptionItem `control`, réglage court sur la ligne (v0.24.0) ; `InfoCard`, EditorLayout `content="page"` (v0.25.0) ; **échelle des contrôles sm 28, md 36, lg 44** (v0.26.0 et v0.27.0 : boutons, champs, listes, champ à copier, GroupTab ; ButtonTab inchangé). Les écrans grandissent de 2 px en md et 4 px en lg : vérifier visuellement l'éditeur, les panneaux et Diffuser. GroupTab : `md` par défaut (36), `sm` = ancien nom de md ; CopyField : `lg` par défaut (44).
- Retirer les contournements des demandes marquées « codé told-ds » (D-016, D-017, D-018, D-020, D-021, D-026) et appliquer **D-027**, **D-028**, **D-029** et **D-030**.
- **Numéros des `TODO DS` posés le 21/11 sur christof** (la conversation Code a repris D-022 à D-025, déjà en partie pris) :
  - `TODO DS: D-023` (bouton menu avec le logo) et `TODO DS: D-024` (étapes Construire › Diffuser › Analyser) : **déjà codés en v0.15.0** (`ButtonEditionMenu`, `EditorSteps`, voir D-022 ci-dessous) ; à brancher.
  - `TODO DS: D-022` (AvatarGroup sans état inactif ni teinte par personne) devient **D-026**, codée en v0.20.0.
  - `TODO DS: D-025` (pas de carte de démo dans le DS) rejoint **D-011** (Card).
  - Prochain numéro libre : **D-045** (D-042 pris par la conversation Code).
- **Icônes pleines par défaut depuis v0.16.0** : une icône posée sans `variant` passe en plein. Le contour ne reste qu'au repos dans les menus (menu de navigation, entrées de DropdownMenu) ; les chevrons restent en trait. Vérifier visuellement les écrans après la mise à jour.
- **Noms** : depuis le 20/11, un composant porte le même nom dans Figma et dans le code (règle et anciens noms : `docs/NOMMAGE.md` du dépôt told-ds). Dans le nouveau code, utiliser `OptionItem` et `OptionSidebar` (plus OptionPanelItem / OptionPanel), `Select` (Figma ne dit plus DropdownField), `Modal`, `Tag`, `Flag`, `Logo`, `ProgressSteps`.

Points d'attention :
- **Breadcrumb** : la prop `status` est **déconseillée** (le badge est retiré de Figma), mais elle marche encore, car l'éditeur s'en sert pour Lecture seule, la publication et l'état de sauvegarde. À terme, déplacer ces indications dans l'en-tête (EditorHeader).
- **Composants de formulaire dans un panneau** : Input, TextArea et Select en taille **md**, pas sm.

## Demandes ouvertes

### D-009 · Section du panneau d'options avec un vrai emplacement de contenu
- Écran : éditeur, panneau de droite (`editor/fields.tsx`, `PanelSection` maison). Fiche 18 § 2.4.
- Besoin : trois sortes de section, et la section ouverte reçoit un contenu libre :
  - ligne, avec valeur et action ou interrupteur ;
  - repliable, avec chevron ;
  - ouverte, contenu toujours visible.
- Priorité : important (demandé en 1)
- Statut : **codé told-ds v0.12.0**
- Réponse DS :
  - Dans Figma, **OptionItem** (`type=generic`, closed | open) remplace PanelSection et OptionPanelItem, et **OptionSidebar** (`contentType=record, scope=step`) remplace StepOptionsPanel.
  - Les props de `OptionItem` :

    | Prop | Valeurs | Effet |
    | --- | --- | --- |
    | `variant` | `'row'` | ligne |
    | | `'collapsible'` | repliable, avec chevron |
    | | `'open'` | ouverte, `children` toujours visibles |
    | `icon` | | facultative |
    | `value` | | valeur affichée |
    | `onAction` + `actionLabel` | | lien d'action |
    | `toggle` | `{ checked, onChange, label }` | interrupteur |
    | `info` | | aide (i) |
  - `OptionSidebar` est le conteneur.
- Réponse Record (20/11) : repris, toutes les sections du panneau sont des OptionItem, la colonne est un OptionSidebar ; manques → D-021.

### D-008 · Choix compact en pastilles
- Écran : panneau d'options (Thème, Apparition des textes, Type d'écran, Avatar). `ui-classes.ts` (`selectionClass`).
- Priorité : important (demandé en 2)
- Statut : **codé told-ds v0.12.0**, Figma encore à valider par Christof (le code peut bouger légèrement).
- Réponse DS :
  - Utiliser **ChoiceChips** (page ChoicePicker, pièce _ChoiceChip). Usage : `<ChoiceChips aria-label value onChange options />`.
  - Sémantique : groupe radio, flèches au clavier, retour à la ligne.
  - Chaque option peut porter :

    | Prop de l'option | Contenu |
    | --- | --- |
    | `icon` | icône |
    | `color` | pastille de couleur ou dégradé |
    | `thumb` | vignette |
    | `avatar` | photo ronde |
    | `onListen` | bouton Écouter |
    | `glyph` | glyphe, ex. « Aa » pour l'apparition des textes, animé au survol |
  - Pour l'avatar, Figma a aussi une liste dédiée, **AvatarPicker** : photo, nom, voix, Écouter ; la carte entière sélectionne. Elle n'est pas encore codée ; en attendant, utiliser ChoiceChips `avatar`.
- Réponse Record (20/11) : repris, Thème (couleur), Apparition (glyphe « Aa »), Type d'écran (couleur) ; l'avatar reste dans l'app → D-019.

### D-010 · Slider d'interface
- Écran : zoom de l'étape, zoom par défaut (`ui-classes.ts`, `rangeClass`).
- Priorité : important (demandé en 3)
- Statut : **codé told-ds v0.12.0**
- Réponse DS :
  - Utiliser **SliderCapsule** : `<SliderCapsule label="Zoom" min={1} max={3} step={0.1} value onChange defaultValue={1.6} format={(v) => '× ' + …} />`.
  - Le point blanc à 40 % marque la valeur par défaut ; un clic dessus y ramène.
  - Plage : passer `rangeEnd` et `onRangeEndChange` ; la plage n'a pas de point par défaut.
  - Couleurs neutres (Ink), pas de bleu de marque.
- Réponse Record (20/11) : repris, zoom de l'étape et zoom par défaut, × 1,0 à × 3,0, repère sur le zoom de la démo ; manques → D-018.

### D-014 · Options de l'écran de fin et des écrans intercalés
- Écran : panneau quand l'écran de fin ou un écran intercalé est sélectionné. Fiche 19 §§ 1 et 4.
- Priorité : important (demandé en 4)
- Statut : **à valider (Figma)**
- Réponse DS :
  - **EndButtonSettings** (page OptionContent) : GroupTab « Sans bouton / Lien », puis Libellé du bouton et Adresse (Input md) en `mode=link`.
  - **KeyPointsField** : jusqu'à 3 points clés (champ + Retirer), et un lien « Ajouter un point clé ».
  - « Capture montrée » : le Select existant suffit.
  - Côté code, ce sont des assemblages de composants existants (GroupTab, Input, Button, Select) à poser dans un OptionItem `variant="open"`. Pas de composant told-ds dédié prévu.

### D-001 · Bouton sur fond sombre et en-tête V1
- Écran : en-tête de l'éditeur (`ds.ts`, classe `editorHeaderGhostButton`). Fiche 18 §§ 2.1 et 2.6.
- Priorité : important
- Statut : à faire (Figma)
- Réponse DS :
  - L'en-tête V1 est tranché : EditorHeaderRecord (ex-EditionNavRecord) `hasSubnav=false`, barre noire seule.
  - Reste à dessiner une variante **Button `color=inverse`** (fond blanc 12 %).

### D-002 · EditorHeader : colonnes de la grille
- Statut : **codé told-ds v0.12.0**
- Réponse DS : la grille est `minmax(0, 1fr) auto auto`. Retirer la surcharge dans `globals.css`.
- Réponse Record (20/11) : repris, grille forcée retirée de `globals.css`.

### D-003 · Breadcrumb / EditableTitle : nom accessible et longueur maximale
- Statut : **codé told-ds v0.12.0**
- Réponse DS :
  - Breadcrumb `titleLabel` et `titleMaxLength`.
  - EditableTitle `inputLabel`.
  - Le titre rétrécit avec points de suspension.
  - `status` déconseillée (gardée en v0.12.1, voir plus haut).
- Réponse Record (20/11) : repris, `titleLabel="Titre de la démo"`, `titleMaxLength={140}` ; `status` gardé.

### D-004 · Checkbox, Radio, Switch : zone cliquable du vrai champ
- Statut : **codé told-ds v0.12.0**
- Réponse DS : le `<input>` couvre tout le contrôle, invisible. Retirer la classe `ui-choice`.
- Réponse Record (20/11) : repris, enveloppe `ui-choice` retirée.

### D-006 · Button rendu comme un lien
- Statut : **codé told-ds v0.12.0**
- Réponse DS : `href` + `linkAs` (ex. `linkAs={Link}`) sur Button et ButtonIcon.
- Réponse Record (20/11) : repris en partie, liens internes en `Button href + linkAs={Link}` ; les liens qui ouvrent un nouvel onglet restent en contournement → D-016.

### D-012 · AppSidebar et TopBar codés
- Statut : **codé told-ds v0.60.0** (AppSidebar v0.57.0, menu commun piste B validé le 24/11 ; TopBar v0.60.0)
- Réponse DS : `<AppSidebar sections footer switcher account linkAs={Link} />` avec `ProjectSwitcher`, `AccountCard`, `NotificationBell` ; `<TopBar title description icon search action />` dans `<Layout type="page" topbar>`. Entrées Record : Told Record sous Told (CRÉER) ; « Nouvelle démo » = action « + » de l'entrée Told Record ; les projets de Record passent dans le menu du sélecteur (à confirmer : projet Told = site, projets Record = dossiers).

### D-005 · NavButtonItem : couleur de sélection invisible
- Statut : **codé told-ds v0.12.0**
- Réponse DS : le fond sélectionné reprend le jeton `selectionbox-background-checked`.
- Réponse Record (20/11) : repris, enveloppe `ui-nav-item` retirée.

### D-007 · DropdownMenu avec liens et entrées désactivées
- Statut : **codé told-ds v0.12.0**
- Réponse DS : `DropdownItem` accepte `href`, `linkAs` et `disabled`.
- Réponse Record (20/11) : pas repris, DropdownMenu est un listbox alors que nos menus d'actions sont des menus → D-017.

### D-011 · Cartes
- Statut : à faire (Figma puis code)
- Réponse DS : un composant **Card** simple ; vérifier d'abord les cartes de la page Cards.
- 21/11 : la carte de démo de la liste (`demo-list-client.tsx`, `TODO DS: D-025`) rejoint cette demande.

### D-013 · EmptyState
- Statut : **codé told-ds v0.12.0** (illustrations encore à valider)
- Réponse DS :
  - Utiliser **EmptyState** : `illustration`, `title`, `description`, `actions`.
  - Les illustrations (EmptyIllustration, 10 contextes, style écrans Told) sont dans Figma et attendent la validation de Christof ; elles seront exportées en SVG ensuite.
  - En attendant, laisser `illustration` vide ou utiliser une icône.
- Réponse Record (20/11) : repris, liste de démos vide.

### D-021 · OptionItem et ChoiceChips : présence, conflit, désactivé, accessibilité
- Proposée par Record comme « D-014 » : numéro déjà pris, renommée **D-021** (TODO DS à mettre à jour dans Record).
- Date, écran Record : 20/11, panneau de droite de l'éditeur, `editor/fields.tsx` (PanelSection), `theme-field.tsx`, `entrance-field.tsx`, `interlude-editor.tsx` ; route `/[org]/demos/[id]`.
- Besoin : l'éditeur est collaboratif.
  - Une section dont un collègue tient un réglage affiche « Léa modifie ce réglage » (texte bleu et point).
  - Une section en conflit affiche un point orange.
  - En lecture seule, ou quand un collègue tient le réglage, l'interrupteur et les pastilles sont désactivés.
- Ce qui manque dans le DS :
  - OptionItem n'a ni état de présence (`holder`), ni état de conflit (`conflict`), ni `toggle.disabled`.
  - Son titre n'est pas un titre de section (h3) : les lecteurs d'écran ne peuvent plus sauter de section en section.
  - Pas d'id sur le libellé, que les champs de la section utilisent pour se nommer (`aria-labelledby`).
  - Le chevron d'une ligne collapsible est hors du bouton et sans clic.
  - L'aide `info` est un `<span title>` non focalisable : inaccessible au clavier.
  - ChoiceChips n'a pas de `disabled` (par option ni pour le groupe), ni d'aide par option (`title`) : l'Apparition perd « Différente du reste de la démo ».
- Contournement provisoire dans Record : nom du collègue dans le badge de valeur, point de conflit et `<span id>` dans `label` ; `<fieldset disabled>` autour de l'OptionItem à interrupteur et des ChoiceChips.
- Priorité : important
- Statut : **codé told-ds v0.14.0** (Figma aligné)
- Réponse DS :
  - OptionItem : `holder` (« Léa modifie ce réglage », texte bleu et point), `conflict` (point orange, `conflictLabel` lu), `toggle.disabled`, titre en `h3` (`headingLevel`, `false` pour aucun), `labelId` (id du libellé, pour `aria-labelledby`), chevron qui replie au clic, aide `info` en bouton focalisable.
  - ChoiceChips : `disabled` (groupe et option), `title` par option (aide lue), `aria-labelledby` (ex. le `labelId` de la section), flèches, Début et Fin, un seul arrêt de tabulation.
  - Figma : OptionItem generic `hasPresence` + `holder`, `hasConflict` ; exemple `9117:5330`.
  - À retirer dans Record : badge de présence, point de conflit et `<span id>` maison ; les `<fieldset disabled>`.

### D-016 · Button et ButtonIcon en lien : target, rel et attributs
- Date, écran Record : 20/11, liens vers le Chrome Web Store (`extension-dialog.tsx`, `record-button.tsx`, `connect-extension.tsx`) ; `ui-classes.ts` (`buttonClass`).
- Besoin : un bouton qui ouvre une page dans un nouvel onglet (`target="_blank"`, `rel="noreferrer"`).
- Ce qui manque dans le DS : avec `href`, Button ne transmet que `onClick`, `title`, `id` et `aria-label` ; `target`, `rel`, `download` et les `data-*` sont perdus. Proposition : transmettre tous les attributs d'ancre.
- Contournement provisoire dans Record : ces 3 liens gardent la classe `ui-btn` (`buttonClass`).
- Priorité : confort
- Statut : **codé told-ds v0.14.0**
- Réponse DS :
  - Avec `href`, Button et ButtonIcon transmettent tous les attributs d'ancre (`target`, `rel`, `download`, `data-*`…). `rel="noopener noreferrer"` est mis par défaut avec `target="_blank"`. `disabled` rend le lien inactif (`aria-disabled`).

### D-017 · DropdownMenu pour un menu d'actions
- Date, écran Record : 20/11, menus « ⋯ » de l'éditeur et des vignettes d'étape (`editor.tsx`), menus du kit de marque (`kits.tsx`) ; `ui-classes.ts` (`menuClass`, `menuItemClass`).
- Besoin : un menu d'actions (Copier le lien, Exporter en vidéo dans un nouvel onglet, Supprimer) au clavier et pour les lecteurs d'écran : `role="menu"` et des entrées `menuitem`, une entrée désactivée avec sa raison (`title`).
- Ce qui manque dans le DS :
  - DropdownMenu est un `listbox` et ses entrées-boutons des `option` (`aria-selected`) : sémantique d'une liste de choix, pas d'un menu.
  - Les entrées-liens sont des `menuitem` : mélange dans le même composant.
  - Les liens perdent `target`, `rel` et `title`.
  - Proposition : DropdownMenu `role="menu"` (ou une prop `kind="menu" | "listbox"`), entrées `menuitem`, attributs d'ancre transmis.
- Contournement provisoire dans Record : classes `ui-menu` / `ui-menu-item` sur les jetons de DropdownMenu. Le menu ⋯ d'une vignette correspond à StepThumbMenu (Figma, pas codé) : à coder sur ce DropdownMenu corrigé.
- Priorité : confort
- Statut : **codé told-ds v0.14.0**
- Réponse DS :
  - `<DropdownMenu kind="menu">` : `role="menu"`, entrées `menuitem` (boutons et liens), flèches ↑ ↓, Début, Fin, Échap (`onEscape`), focus sur la première entrée avec `autoFocus`. Une entrée `disabled` reste focalisable (`aria-disabled`) pour que sa raison (`title`) soit lue. Les liens gardent `target`, `rel`, `title`.
  - `kind="listbox"` reste le défaut (Select).
  - StepThumbMenu se code avec ce menu (pas de composant dédié).

### D-018 · SliderCapsule : clic sur la piste et repère au clavier
- Date, écran Record : 20/11, zoom de l'étape et zoom par défaut, `editor/panels.tsx`.
- Besoin : un clic sur la piste place la valeur, et « Revenir à × 1,6 » est joignable au clavier, avec une cible assez grande.
- Ce qui manque dans le DS : l'`<input type="range">` est en `pointer-events: none` hors de la poignée, donc seul le glisser marche ; le repère de valeur par défaut a `tabIndex={-1}` et fait 4 px.
- Contournement provisoire dans Record : aucun ; la valeur par défaut reste accessible par la liste « Comme la démo ».
- Priorité : confort
- Statut : **codé told-ds v0.14.0**
- Réponse DS :
  - Un clic sur la piste place la valeur (curseur seul ; la plage garde le glisser des deux poignées).
  - Le repère de valeur par défaut est une cible de 16 (point de 4 au centre), joignable au clavier (Tab puis Entrée, « Revenir à × 1,6 »).

### D-019 · AvatarPicker : coder le composant
- Date, écran Record : 20/11, panneau de l'Annonce, section Avatar, `editor/presenter.tsx` (AvatarPicker).
- Besoin :
  - choisir l'avatar et écouter sa voix ; le bouton passe de « Écouter » à « Chargement… » puis à « Arrêter », et devient « Voix indisponible » si l'extrait échoue ;
  - sans photo, l'avatar montre son initiale ;
  - aucun avatar n'est coché tant que rien n'est choisi ;
  - « Changer » met le focus sur l'avatar choisi.
- Ce qui manque dans le DS : AvatarPicker et _AvatarOption sont dessinés dans Figma (20/11, `state`, `name`, `voice`) mais pas codés. ChoiceChips avec `avatar` + `onListen` ne suffit pas : pas d'état de lecture ni d'échec, pas d'initiale de remplacement, pas de focus de l'option choisie. Le nom Record est déjà AvatarPicker : on reprendra celui du DS tel quel.
- Contournement provisoire dans Record : AvatarPicker reste dans l'app (lignes avec photo, nom, bouton Écouter et Radio du DS).
- Priorité : confort
- Statut : à valider (Figma), puis à coder
- Réponse DS :
  - AvatarPicker et _AvatarOption sont dans Figma (page OptionContent) ; à valider par Christof, en ajoutant les états de lecture (Chargement…, Arrêter, Voix indisponible) et l'initiale sans photo. Code ensuite.

### D-020 · StepThumb et StepGroup : glisser-déposer, sélection multiple, clavier, intertitre
- Date, écran Record : 20/11, colonne Étapes de l'éditeur, `editor/editor.tsx` (renderStep, slides) ; route `/[org]/demos/[id]`.
- Besoin :
  - réordonner les étapes en les glissant (avec la ligne d'insertion) ;
  - en sélectionner plusieurs (⌘ ou Maj + clic) pour les supprimer d'un coup ;
  - les déplacer au clavier (Alt + ↑ / ↓) et les supprimer (Suppr) ;
  - montrer qui est sur l'étape ;
  - afficher la vignette d'un intertitre (fond et texte du kit, pas une capture) ;
  - la section « Fin » montre l'écran de fin en MessageCard thanks.
- Ce qui manque dans le DS :
  - StepThumb est un `button` qui ne transmet ni `draggable` ni les événements de glisser, ni `onKeyDown`, ni `data-*` ;
  - pas d'état « sélection multiple » distinct de `selected` ;
  - le contenu n'accepte qu'une image (`src`) : pas de place pour la vignette d'un intertitre (`children` ou `preview`) ;
  - StepGroup n'a pas de place pour les « + » d'insertion entre deux slides ni d'état replié contrôlé.
- Contournement provisoire dans Record : vignettes, slides et carte de fin restent dans l'app (cadre sans liseré blanc, d'où l'écart visible avec Figma).
- Priorité : important
- Statut : **codé told-ds v0.19.0** (Figma validé le 21/11)
- Réponse DS :
  - Codé : StepThumb transmet ses attributs au bouton (`draggable`, `onDragStart`…, `onKeyDown`, `data-*`, `aria-*`) ; `preview` remplace la capture (vignette d'un intertitre) ; StepGroup contrôlable (`expanded`, `onExpandedChange`).
  - v0.19.0 : StepThumb `multiSelected` (fond bleu pâle, contour fin, coche ; `selected` reste l'étape en cours), `drop="before" | "after"` (ligne de dépôt StepDropLine), `dragging` (estompée) ; **StepDropLine** seule si besoin ; entre deux slides : **InsertBar** `label="Insérer une slide"`, `dropTarget` pendant un glisser.
  - Figma : StepThumb `state=multiselected`, _StepDropLine, exemple `9129:5680` (page StepThumb).
  - Story : « Sélection multiple et glisser » (Composants › Éditeur de démo › Étapes).
  - À retirer dans Record : vignettes, slides et carte de fin maison.

### D-026 · AvatarGroup : état inactif et teinte par personne
- Proposée par Record comme « D-022 » (`editor.tsx`, présence dans l'en-tête) : numéro déjà pris, renommée **D-026**.
- Besoin : montrer qui est sur la démo, estomper une personne présente mais inactive, et garder la même couleur pour une personne partout (avatar, curseur, présence sur une étape).
- Contournement provisoire dans Record : PresenceAvatar côte à côte.
- Priorité : confort
- Statut : **codé told-ds v0.20.0**
- Réponse DS : `AvatarGroup people={[{ name, id, idle }]}` : `id` fixe la teinte (fonction `presenceColorFor(id)`, la même partout) ; `idle` estompe l'avatar et ajoute « inactif » au nom lu. `PresenceAvatar` accepte `personId` et `idle`.

### D-086 · Correction d'une valeur sur place (popover ancré à un texte)
- Date, écran Record concerné : 26/11, extension, page Résultat des données fictives (docs/ux/27 § 4.D, Figma Told Record R-51).
- Besoin : une petite fenêtre accrochée à une valeur dans une image : titre, phrase, champ, « Appliquer » / « Laisser tel quel », note. Échap et clic dehors la ferment, le focus y reste.
- Ce qui manque ou gêne dans le DS : OptionPopover s'ouvre depuis un PopoverField, pas depuis un point d'une image, et son contenu est un emplacement (_Slot) sans modèle « champ + actions ».
- Contournement provisoire dans Record : cadre composé à la main (Input + Button), TODO DS: D-086.
- Priorité : important
- Statut : codé told-ds v0.66.0
- Réponse DS : ValueCorrection + ValueMarker : à poser dans un overlay de GuidedPlayer (`{ id, x, y, width, height, content: <ValueCorrection value=… onApply=… onKeep=… /> }`). `tone="blocking"` pour R-55 (contour rouge, fenêtre ouverte d'emblée, titre « Valeur d'origine encore visible »). Textes réglables par `labels`.

### D-087 · StepThumb : point de signalement nommé
- Date, écran Record concerné : 26/11, extension, page Résultat (pellicule des images, Figma Told Record R-50).
- Besoin : un point orange en coin, avec son libellé dans le nom accessible (« Étape 3, une valeur à regarder »).
- Ce qui manque ou gêne dans le DS : le StepThumb de Figma n'a pas d'état de signalement (le code a `warning`).
- Contournement provisoire dans Record : point posé par Record, TODO DS: D-087.
- Priorité : confort
- Statut : à faire
- Réponse DS :

### D-088 · Button : état en cours avec progression
- Date, écran Record concerné : 26/11, extension, page Résultat (« Envoi · 4 sur 12 », Figma Told Record R-52), et les exports de l'app.
- Besoin : un bouton qui garde sa taille et montre une progression, avec aria-busy.
- Ce qui manque ou gêne dans le DS : Button n'a pas d'état de chargement.
- Contournement provisoire dans Record : libellé changé, bouton désactivé, ProgressBar sous le bouton, TODO DS: D-088.
- Priorité : confort
- Statut : à faire
- Réponse DS :

### D-085 · Motif IA en mouvement
- Date, écran Record concerné : 26/11, extension, page Préparation (docs/ux/27 § 4.C, Figma Told Record R-43 à R-49). Servira aussi à « Rédiger avec l'IA ».
- Besoin :
  1. le dégradé IA (purple-400 → blue-400) en variable, au lieu d'être écrit en dur dans Button.module.css ;
  2. un « état d'attente IA » pleine page, sobre : étincelle de 32 px qui scintille sur un halo léger, phrase qui se remplace par un fondu, indicateur discret, lien secondaire ; variantes pause et échec ;
  3. une révélation (un élément qui sort du fond) ;
  chacun avec sa variante prefers-reduced-motion.
- Ce qui manque ou gêne dans le DS : le DS a AiNotice (chargeur en ligne), AiTag, Button ai et les jetons de durée, mais aucun état d'attente IA animé.
- Contournement provisoire dans Record : halo, étincelle et phrase posés par Record, TODO DS: D-085.
- Priorité : important (c'est le moment fort du produit)
- Statut : à faire
- Réponse DS :

### D-089 · GuidedPlayer et AmbientBackground exportés par told-ds
- Date, écran Record concerné : 26/11, extension, pages Préparation et Résultat (docs/ux/27 §§ 4.C et 4.D, Figma Told Record R-43 à R-53).
- Besoin : jouer la démo dans le player guidé du DS avant « Créer la démo », sur le fond IA du DS.
- Ce qui manque ou gêne dans le DS : dans told-ds v0.63.1, GuidedPlayer n'existe pas en code, et AmbientBackground n'est qu'une page du catalogue (AtomesAmbientBackground.stories.tsx), pas un composant exporté par src/index.ts.
- Contournement provisoire dans Record : fond clair uni pour la préparation (lot 3) ; le résultat attend ce composant (lot 5), TODO DS: D-089.
- Priorité : bloquant pour le lot 5 de Record (résultat joué dans le player), important pour le lot 4 (animation)
- Statut : codé told-ds v0.66.0
- Réponse DS : GuidedPlayer (`steps`, `state`, `index`, `onStepShown`, `step.overlays` / `renderOverlays` en fraction de l'image, suivent le zoom) et AmbientBackground (`tone`, `intensity`, `dots`, `animated`) exportés. Ni ressource distante ni eval ; styles en CSS modules, positions en style en ligne (CSSOM, compatible CSP). Images en data: ou blob: : prévoir `img-src 'self' data: blob:`. Variante mobile du lecteur (Figma device=mobile) pas encore codée.

## Demandes de Told Record encore ouvertes (regroupées le 25/11)
Sens : Told Record vers le DS. Elles étaient dans les pull requests 4 à 8, jamais fusionnées. Les numéros déjà pris sur `main` ont changé : Record a mis à jour ses `TODO DS`. Prochain numéro libre pour Record : **D-090**.

### D-042 · AvatarSettings, MediaFrameSettings, EyebrowSettings, LogoSettings : tout le réglage désactivable (23/11, demandé par Record)
- Date, écran Record concerné : éditeur, « Avatar sur ce slide » (`editor/presenter.tsx`) et « Cadre du média » (`editor/media-frame-field.tsx`). Aussi « Surtitre » et « Logo » (`editor/slide-style-fields.tsx`, D-039, D-040).
- Besoin : en lecture seule, ou quand un collègue tient le réglage, tout le réglage est inactif.
- Ce qui manque ou gêne dans le DS : `disabled` n'atteint ni le ColorField « Couleur du contour » d'AvatarSettings (ColorField n'a pas de `disabled`), ni les GroupTab « Cadre » et « Orientation » de MediaFrameSettings (GroupTab n'a pas de `disabled`) : ils ont l'air actifs. EyebrowSettings et LogoSettings n'ont pas de `disabled` non plus (leurs GroupTab et ColorField).
- Contournement provisoire dans Record : les changements sont ignorés pendant le verrou (`TODO DS: D-042`).
- Priorité : confort
- Statut : à faire
- Réponse DS :

### D-045 · Colonne Étapes : « Ajouter une slide » toujours visible, ButtonIcon à bordure gris clair (24/11, demandé par Christof)
- Date, écran Record concerné : 24/11, éditeur, colonne Étapes (`editor/editor.tsx`, StepList `addAfter` et StepThumb `menu`).
- Besoin :
  - « Ajouter une slide » (« Ajouter un écran » en démo guidée) reste visible en permanence, prend toute la largeur de la colonne, sans les traits de part et d'autre : moins de saut visuel quand le pointeur entre dans la colonne.
  - Le « ⋯ » d'une vignette, au survol, a une bordure gris clair, comme le bouton `secondary-outline`, pas la bordure sombre.
- Ce qui manque ou gêne dans le DS :
  - `StepList` cache tout ce qui porte `data-step-add` hors survol (`revealAdd="hover"`), `addAfter` compris ; `revealAdd="always"` montrerait aussi les StepAddThumb de chaque slide. Et `InsertBar` dessine deux traits et fait 248 px.
  - `ButtonIcon` n'a pas d'apparence à bordure gris clair : `appearance="outline"` prend `primary-outline` (bordure sombre en `neutral`).
- Contournement provisoire dans Record (`// TODO DS: D-045`) :
  - `addAfter` : un `Button` `secondary-outline`, `size="sm"`, `iconLeft="add-01"`, `fullWidth`, et une règle de la colonne qui garde le bloc `addAfter` affiché hors survol.
  - « ⋯ » : `ButtonIcon` `outline` dont `--border` et `--border-hover` sont remplacés par ceux du `secondary-outline`.
- Proposition :
  - `StepList` : `addAfter` toujours visible (ou une propriété `revealAddAfter`), et un rendu « bouton pleine largeur » prévu dans Figma (StepList 9143:113854) à la place de l'InsertBar.
  - `ButtonIcon` : une apparence `secondary-outline` (bordure `--button-buttonsecondaryoutline-border-*`), utilisée par défaut pour le menu de `StepThumb`.
- Priorité : confort
- Statut : à faire
- Réponse DS :

### D-046 · « Ombre » du cadre du média pour tous les cadres (23/11, demandé par Christof)
- Date, écran Record concerné : 23/11, éditeur de l'Annonce, réglage « Cadre du média » (`editor/media-frame-field.tsx`, `MediaFrameSettings`).
- Besoin : choisir l'ombre (Aucune, Douce, Marquée) quel que soit le cadre : Ordinateur › Écran, Ordinateur › Navigateur, et Aucun (la capture seule), comme pour les mobiles, la tablette, l'iMac et le MacBook.
- Ce qui manque dans le DS : `MediaFrameSettings` n'affiche « Ombre » que si l'appareil a des coloris (`current?.finishes`). L'Écran et le Navigateur n'en ont pas, et Aucun non plus : le réglage disparaît.
- Contournement provisoire dans Record : un `ChoiceField` « Ombre » posé sous `MediaFrameSettings` quand celui-ci ne l'affiche pas (`// TODO DS: D-046`). Le lecteur applique `mediaShadows` au navigateur et à la capture seule.
- Proposition : afficher « Ombre » pour tout cadre, juste après « Coloris » (ou après « Appareil » quand il n'y a pas de coloris), y compris pour Aucun.
- Priorité : important
- Statut : à faire
- Réponse DS :

### D-047 · MessageCard « désactivée » mais sélectionnable (23/11, demandé par Christof)
- Date, écran Record concerné : 23/11, éditeur, colonne Étapes (`editor/editor.tsx`, StepList `intro` et `end`).
- Besoin : l'écran de début et l'écran de fin s'activent ou se désactivent dans leur panneau. Désactivés, leur carte doit avoir l'air éteinte (grisée, transparente), mais rester cliquable pour ouvrir le panneau et les rallumer.
- Ce qui manque dans le DS : `MessageCard` n'a que `disabled`, qui pose l'attribut HTML `disabled` (opacité 0,38 et clic impossible).
- Contournement provisoire dans Record : la carte reste active, et un enveloppe lui donne l'opacité 0,38 (0,6 au survol, 1 au focus clavier) (`// TODO DS: D-047`).
- Proposition : une propriété `inactive` (ou `off`) : même rendu que `disabled`, la carte reste un bouton cliquable, l'état sélectionné reste visible ; aperçu « Désactivé » au choix de Record.
- Priorité : confort
- Statut : à faire
- Réponse DS :
- Numéro : Told V3 a repris ce besoin dans sa D-047 (état « éteint » cliquable de MessageCard) : c'est la même demande.

### D-075 · OptionSidebar : pas de filet sous l'en-tête
- Date, écran Record concerné (fichier, route) : 21/11/2026, panneau Options de l'éditeur, `src/app/(app)/[org]/demos/[id]/editor/editor.tsx` ; maquette 9020:101470.
- Besoin (ce que l'écran doit faire) : sous le titre « Options », la première option suit directement, sans filet (comme dans la maquette).
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) : `.options` d'OptionSidebar a un `border-top` que la maquette n'a pas. Soit le retirer, soit une propriété pour le masquer.
- Contournement provisoire dans Record : filet retiré par une règle `!important` autour d'OptionSidebar (le CSS du DS est hors couche et l'emporte sur Tailwind).
- Priorité : confort
- Statut : à faire
- Réponse DS :
- Numéro : demandée le 21/11 sous le numéro D-027 (pull request 4, jamais fusionnée) ; D-027 est pris sur `main` par une demande du DS vers Record.

### D-076 · ToolbarItem : icône en contour quand l'outil n'est pas actif
- Date, écran Record concerné (fichier, route) : 21/11/2026, barre sous la capture dans l'éditeur (Flouter, Recadrer, Réenregistrer, Importer une image, Revenir), `src/app/(app)/[org]/demos/[id]/editor/capture-actions.tsx`.
- Besoin (ce que l'écran doit faire) : icône en contour au repos, pleine seulement quand l'outil est actif (demande de Christof).
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) : le commentaire de `ToolbarItem` annonce « icône en contour, pleine quand l'outil est actif », mais le code pose toujours `variant="solid"`. Attendu : `variant={active ? 'solid' : 'stroke'}`.
- Contournement provisoire dans Record : l'icône du DS est masquée et une `Icon variant="stroke"` est posée par-dessus, aux couleurs de l'item.
- Priorité : confort
- Statut : à faire
- Réponse DS :
- Numéro : demandée le 21/11 sous le numéro D-028 (pull request 4, jamais fusionnée) ; D-028 est pris sur `main` par une demande du DS vers Record.

### D-077 · OptionItem : le « i » (`info`) avec la bulle Tooltip
- Date, écran Record concerné (fichier, route) : 21/11/2026, ligne Format du panneau Options, `src/app/(app)/[org]/demos/[id]/editor/format-popover.tsx`.
- Besoin (ce que l'écran doit faire) : au survol et au focus du « i », l'explication s'affiche dans la bulle Tooltip du DS (« Le contenu est gardé : tu peux revenir à un autre format à tout moment. »).
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) : `info` ne pose qu'un `title` natif (lent, parfois absent, invisible au clavier) avec un curseur « ? ». Attendu : le Tooltip du DS sur survol et focus, relié par `aria-describedby`.
- Contournement provisoire dans Record : `title` retiré du bouton du DS, Tooltip du DS posé à côté et affiché au survol et au focus.
- Priorité : confort
- Statut : à faire
- Réponse DS :
- Numéro : demandée le 21/11 sous le numéro D-029 (pull request 4, jamais fusionnée) ; D-029 est pris sur `main` par une demande du DS vers Record.

### D-078 · EditorSteps : nom de la zone et point « En pause »
- Date, écran Record concerné (fichier, route) : 21/11/2026, en-tête de l'éditeur (`center`), `src/app/(app)/[org]/demos/[id]/editor/editor.tsx` (HeaderSteps).
- Besoin (ce que l'écran doit faire) : un lecteur d'écran distingue les étapes de l'en-tête (Construire › Diffuser › Analyser) de la colonne des étapes de la démo ; le point de Diffuser dit « En pause » pour une démo mise en pause, pas « Brouillon ».
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) : EditorSteps et StepList posent tous deux `aria-label="Étapes"` en dur sur leur `nav` (deux repères du même nom dans l'éditeur). EditorSteps n'a pas de prop pour son nom (`aria-label`) ni pour le texte de son point (`dotLabel` vaut « En ligne » ou « Brouillon »). Attendu : `aria-label` (défaut « Étapes de publication » par exemple) et `dotLabel` réglables, ou un état `paused`.
- Contournement provisoire dans Record : après le rendu, le nom de la `nav` devient « Construire, diffuser, analyser » et le point « En pause » quand il le faut.
- Priorité : important
- Statut : à faire
- Réponse DS :
- Numéro : demandée le 21/11 sous le numéro D-033 (pull request 4, jamais fusionnée) ; D-033 est pris sur `main` par une demande du DS vers Record.

### D-079 · MessageCard : attributs passés au bouton (aria-current)
- Date, écran Record concerné (fichier, route) : 21/11/2026, colonne Étapes de l'éditeur, carte « Écran de fin » (StepList `end`), `src/app/(app)/[org]/demos/[id]/editor/editor.tsx` (StepColumn).
- Besoin (ce que l'écran doit faire) : l'écran de fin sélectionné s'annonce comme l'étape en cours (`aria-current="step"`), comme une vignette ; l'app peut aussi poser `data-*` (navigation au clavier) sur le bouton.
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) : MessageCard ne transmet aucun attribut à son `<button>` (seulement `disabled` et `onClick`) ; `selected` ne donne qu'un style, pas d'`aria-current`.
- Contournement provisoire dans Record : un `<span class="contents" data-step="end" aria-current>` autour de la carte (mal exposé aux lecteurs d'écran).
- Priorité : confort
- Statut : à faire
- Réponse DS :
- Numéro : demandée le 21/11 sous le numéro D-034 (pull request 4, jamais fusionnée) ; D-034 est pris sur `main` par une demande du DS vers Record.

### D-080 · StepList : largeurs fixes, barre d'ajout au survol de la colonne, menu de StepThumb
- Date, écran Record concerné (fichier, route) : 21/11/2026, colonne Étapes de l'éditeur, `src/app/(app)/[org]/demos/[id]/editor/editor.tsx` (StepColumn).
- Besoin (ce que l'écran doit faire) : la colonne garde 16 px de marge et deux vignettes de 104 × 64 par slide ; les cartes Début et Fin et leurs séparations tiennent dans la colonne ; au survol de la colonne, la barre « + Ajouter une slide » se voit comme les autres ajouts ; le « ⋯ » d'une vignette ouvre une liste d'actions ancrée à la vignette, et des « + » se posent entre deux vignettes.
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) :
  - MessageCard (`.card`), FlowDivider et InsertBar (`.insert`) ont `width: 248px` : dans StepList (234 px dans la story, 232 en vrai), ils débordent et sont coupés à droite. Attendu : `width: 100%` dans StepList.
  - InsertBar est en `opacity: 0` hors de son propre survol : posée en `addAfter`, elle reste invisible au survol de la colonne alors que `revealAdd` montre déjà les autres ajouts. Attendu : visible dès que StepList révèle ses ajouts.
  - StepThumb : l'emplacement `menu` est un petit coin en haut à droite, affiché au survol ; rien pour une liste d'actions ancrée ni pour des éléments autour de la vignette (« + » entre deux étapes). `onClick` de l'app est écrasé par `onSelect`, qui ne passe pas l'événement (⇧ / ⌘ pour la sélection multiple).
- Contournement provisoire dans Record : la colonne force `width: 100%` et l'opacité de la barre ; l'emplacement `menu` est étiré sur la vignette (le ⋯ en ButtonIcon, sa liste et les « + » dedans) ; la sélection lit `onClickCapture`.
- Priorité : important
- Statut : à faire
- Réponse DS :
- Numéro : demandée le 21/11 sous le numéro D-035 (pull request 4, jamais fusionnée) ; D-035 est pris sur `main` par une demande du DS vers Record.

### D-081 · Colonne `page` d'EditorLayout qui se rétrécit sur son contenu
- Date, écran Record concerné (fichier, route) : 21/11/2026, étape Diffuser de l'éditeur, `src/app/(app)/[org]/demos/[id]/editor/share-panel.tsx`.
- Besoin (ce que l'écran doit faire) : en `content="page"`, la colonne de lecture fait 680 px quelle que soit la carte affichée, et la largeur disponible en dessous.
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) : `.canvas` porte `place-items: center`, que Chrome applique aussi aux blocs (`justify-self`). `.page` repasse en `display: block` mais garde `place-items`, si bien que `.pageColumn` est centrée et prend la largeur de son contenu au lieu de s'étirer : 680 px pour « Partager par lien », 637 px pour « Exporter en vidéo » à 1280 px. Attendu : `.pageColumn { width: 100%; }` (ou `place-items: normal` sur `.page`).
- Contournement provisoire dans Record : `[&_[class*=pageColumn]]:w-full` sur la section Diffuser, avec `TODO DS: D-039`.
- Priorité : gênant
- Statut : à faire
- Réponse DS :
- Numéro : demandée le 21/11 sous le numéro D-039 (pull request 4, jamais fusionnée) ; D-039 est pris sur `main` par une demande du DS vers Record.

### D-082 · LogoSettings sur une ligne à interrupteur, ToneChoice désactivé, focus de l'OptionPopover (24/11, demandé par Christof)
- Date, écran Record concerné : 24/11, panneau Options de l'Annonce, lignes Logo et Format (`slide-style-fields.tsx`, `format-popover.tsx`).
- Besoin :
  1. **Logo** : D-043 met l'interrupteur sur la ligne (`OptionItem toggle`). Ouverte, la ligne doit montrer seulement Told | Le mien et la Version du logo.
  2. **Version du logo grisée** : avec « Le mien », Clair | Sombre reste visible mais désactivé (le choix vaut pour le logo Told seul, décision de Jonathan).
  3. **Focus de la micro-modale** : à l'ouverture, le focus va sur le choix coché de la liste (pour les flèches), une fois la micro-modale placée ; Tab reste dans la micro-modale tant qu'elle est ouverte.
- Ce qui manque ou gêne dans le DS :
  1. `LogoSettings` affiche toujours son propre Switch « Afficher un logo » et sa note, en double avec l'interrupteur de la ligne. Il faudrait `showSwitch={false}` et `note={false}`, comme `AvatarSettings`.
  2. Le GroupTab de `LogoSettings` répète le libellé « Logo » sous la ligne qui s'appelle déjà Logo : un libellé masquable (ou absent quand le composant est dans une ligne).
  3. `ToneChoice` n'a pas d'état `disabled`.
  4. `OptionPopover` pose le focus sur son premier contrôle avant d'avoir calculé sa position (ou sur « Fermer »), et ne garde pas le focus à l'intérieur (pas de piège à focus).
- Contournement provisoire dans Record (`// TODO DS: D-048`) : le Switch et la note de LogoSettings masqués par une classe CSS ; ToneChoice dans un `fieldset disabled` à 38 % d'opacité ; le focus posé sur le choix coché au `requestAnimationFrame` suivant l'ouverture. Le libellé « Logo » répété et la sortie au Tab ne sont pas contournés.
- Priorité : confort
- Statut : à faire
- Réponse DS :
- Numéro : demandée le 24/11 sous le numéro D-048 (pull request 8) ; D-048 est aussi pris par Told V3.

### D-083 · Zoom de la capture sans appareil dans MediaFrameSettings (24/11, demandé par Christof)
- Date, écran Record concerné : 24/11, panneau Options de l'Annonce, bloc Cadre du média (`media-frame-field.tsx`).
- Besoin : le Zoom de la capture (`captureZoom`) vaut pour tous les cadres de Record, y compris la capture seule (Cadre « Aucun ») ; D-044 range Recadrer et Zoom dans le bloc Cadre du média.
- Ce qui manque ou gêne dans le DS : `MediaFrameSettings` n'affiche le curseur Zoom que si `kind !== 'none'`. Il faudrait le montrer aussi sans appareil (ou une propriété pour le forcer).
- Contournement provisoire dans Record (`// TODO DS: D-049`) : avec le Cadre « Aucun », Record ajoute sous le composant le même `SliderCapsule` « Zoom » (× 1 à × 2).
- Priorité : confort
- Statut : à faire
- Réponse DS :
- Numéro : demandée le 24/11 sous le numéro D-049 (pull request 8) ; D-049 est aussi pris par Told V3.

### D-084 · Toaster : erreur d'hydratation avec un rendu serveur (25/11, demandé par Record)
- Date, écran Record concerné : 25/11, toutes les pages de l'app (`src/app/(app)/layout.tsx`, Next.js App Router avec rendu serveur).
- Besoin : poser `<Toaster />` une fois dans la mise en page, sans erreur d'hydratation.
- Ce qui manque ou gêne dans le DS : `Toaster` renvoie `null` quand `document` n'existe pas (serveur) et un portail côté client. Le premier rendu client diffère du HTML du serveur : « Hydration failed » sur chaque chargement complet, et React reconstruit tout l'arbre côté client (un champ de fichier déjà rempli est perdu).
- Contournement provisoire dans Record (`// TODO DS: D-084`) : `AppToaster` ne monte `Toaster` qu'après l'hydratation (`useSyncExternalStore` qui vaut `false` au serveur et à l'hydratation).
- Proposition : monter le portail dans un effet (état `mounted`), ou avec `useSyncExternalStore`, pour que le premier rendu client soit `null` comme au serveur.
- Priorité : important
- Statut : à faire
- Réponse DS :

## Demandes du DS vers Record (lecteur public)

Le lecteur public (`packages/player`, paquet autonome léger) reste dans le dépôt Record : le DS ne le code pas. Il le décrit ici ; la conversation Code l'applique et répond sous la demande.

### D-015 · Annonce et avatar du lecteur alignés sur Figma (20/11, validé par Christof)
- Référence Figma : page `🧩 Organismes / RecordPlayer` : **AnnouncementSlide** (`8848:676`), exemples `9111:572` (progression en haut) et `9110:659` (progression en bas), **RecordAvatar** (`9102:2242`).
- Fichiers Record : `packages/player/src/announcement.ts` et `announcement.css`, `packages/demo-format` (réglages).
- À faire dans le lecteur :
  1. **Pas de Précédent / Suivant** sur l'Annonce : c'est une vidéo, on avance avec la lecture.
  2. **Fond uni pâle** de la couleur du kit (exemple Figma : purple/20), textes foncés (titre `Content/default`, texte `Content/subtle`), logo Told en version claire. Plus de dégradé.
  3. **Progression, deux options au choix** (réglage de la démo, une seule à la fois) :
     - **en haut** : bandeau collé à la slide, même fond que la slide + **noir 5 %** (blanc 5 % si le fond est sombre), barre segmentée et compteur « 2 / 5 », marges 24 / 12 ; **pas de bouton pause ni de croix** pour le moment ;
     - **en bas** : barre courte (200 de large sur une slide de 960) et compteur, **tout à droite**, alignée sur le logo Told en bas à gauche.
     - Pas de progression dans la vidéo exportée.
  4. **Carte arrondie 12** en entier (bandeau + slide), pas seulement la slide.
  5. **Textes plus petits pour laisser la place au média** : titre 20, texte 13 sur une slide de 960 ; colonne de texte 260 en paysage (au lieu de 340), média sur le reste.
  6. **Avatar (RecordAvatar)** :
     - bordure blanche de 4, étiquette IA en bas à droite ;
     - sans avatar choisi : silhouette grise, « Avatar à choisir », pointillés blancs ;
     - tailles Petit / Moyen / Grand = 120 / 160 / 200 sur une slide de 960 ;
     - **trois formes** (aujourd'hui `round | square`) : carré arrondi (24 ; image 20), rond, carré net. Jetons told-ds v0.13.1 (et suivantes) : `--component-record-avatar-frame`, `--component-record-avatar-media`, `--component-record-avatar-border`, réglés par `data-radius="default | roundy | sharp"`. Proposition : ajouter `rounded` aux formes de `presenter.shape`, ou faire suivre la forme du réglage d'arrondi du kit.
- Priorité : important
- Statut : **fait côté Record** (sauf le fond pâle, à trancher)
- Réponse Record (20/11) : fait sur la branche christof (commits 0721bb5 et dff9349), DS en v0.13.2.
  - Annonce sans Précédent / Suivant ; carte arrondie ; textes plus petits (titre 700, texte 300).
  - **Fond du kit inchangé** (le fond uni pâle n'est pas repris).
  - Progression au choix dans Partager › Options : « En haut » (bandeau de 48 px, lecteur seulement, absent de la vidéo, compté par le code d'intégration) ou « En bas » (à droite du logo, vidéo comprise).
  - Avatar en trois formes (Rond = roundy, Arrondi = default, Carré = sharp) avec les jetons `--component-record-avatar-*`, lus avec leurs valeurs du DS en secours puisque le lecteur ne charge pas le DS.
  - Statut : fait côté Record.
- Suite DS : reste le fond uni pâle (point 2), à confirmer par Christof (garder le fond du kit ou passer au fond pâle).

### D-022 · En-tête de l'éditeur sur celui du DS, onglet Diffusion, fin du menu « ⋯ » (21/11, décidé par Christof)
- Sens : demande du DS vers Record.
- Référence Figma : **EditorHeaderRecord** (`8749:4650`, page Headers), V1 sans sous-navigation.
- En code (told-ds v0.15.0 et suivantes) :
  - `EditorHeader` avec `start` = `ButtonEditionMenu` + `Breadcrumb theme="dark"` ;
  - `center` = `EditorSteps` (Construire › Diffuser › Analyser ; point vert en ligne, rouge en brouillon ; Analyser désactivé tant que rien n'est publié) ;
  - `end` = `AvatarGroup surface="dark"` (personnes connectées, affichées par défaut), `ButtonGroup appearance="inverse"` (Partager seulement dans Analyser, puis Aperçu), puis l'action de l'étape : Publier (brouillon) ; Publier les modifications (Construire, en ligne) ; Mettre en pause (Diffuser, en ligne, rouge) ; rien dans Analyser.
  - Exemple complet : stories « V1 · brouillon » et « V1 · en ligne » (Composants › Navigation › En-tête éditeur Record).
- **Record n'a pas encore d'étape Diffusion** : la créer avec le nouvel en-tête, pour ne perdre aucune fonctionnalité. Y mettre ce qui touche au partage aujourd'hui : réglages de partage existants (Partager › Options), « Copier le lien de la page », « Exporter en vidéo (MP4) ».
- **« Supprimer la démo »** sort de l'éditeur et va dans la liste des démos (menu de la carte ou de la ligne), avec ConfirmModal et le journal d'audit.
- **Menu « ⋯ » de l'en-tête** : retiré seulement quand la Diffusion et la suppression depuis la liste sont en place et testées.
- Règle : inventaire de tout ce que fait l'en-tête actuel (actions, raccourcis, états, lecture seule, sauvegarde, publication, présence) et place de chaque élément après ; rien ne disparaît sans nouvelle place. Si une pièce manque dans le DS, demande D-023 et suivantes.
- Priorité : important
- Statut : à faire (code Record)
- Réponse Record :

### D-027 · Format dans le panneau Options et en-tête des slides (21/11, validé par Christof)
- Sens : demande du DS vers Record.
- **Format** (panneau Options, `editor/…` : section Format depuis le commit bbee81e) : remplacer les grandes cartes maison par **`FormatOptionGroup`** (told-ds v0.21.0) :
  - options `{ value, title, description, illustration }` avec `illustration` = `demo` (Démo guidée), `announcement` (Annonce), `inapp` (Animation in-app) ;
  - la ligne choisie porte ses réglages par `settings` : Orientation en **`GroupTab size="sm" label="Orientation"`** (libellé au-dessus, pleine largeur), plus de libellé à gauche ;
  - textes : « On clique, étape par étape. », « Vidéo courte à tes couleurs. », « Boucle muette, sans texte. » ;
  - Orientation : Figma ne garde que **Paysage 16:9 / Vertical 9:16** ; le Carré reste à trancher par Christof (question ci-dessous).
- **En-tête des slides** (StepGroup) : `badge` = numéro seul (« 1 », lu « Slide 1 »), chevron à droite (fait par le DS).
- Référence Figma : page OptionContent (section Logique et format, depuis le 21/11), **FormatOption** (`9133:1950`), exemple `9133:1962` ; _ChoiceIllustration `type=demo | announcement | inapp` (page ChoicePicker).
- Story : Composants › Panneaux › OptionSidebar › FormatOption (depuis v0.21.3).
- Priorité : important
- Statut : **codé told-ds v0.21.0**, à appliquer dans Record
- Réponse Record :

### D-028 · Colonne Étapes sur StepList du DS, ajouts au survol (21/11, demandé par Christof)
- Sens : demande du DS vers Record.
- Constat : la colonne de gauche de l'éditeur a l'air « en brut » : en-tête « Étapes · 9 », carte de fin en pointillés, bouton « + Ajouter un écran » en bas, « + » toujours visibles.
- Référence Figma : **StepList** (`9143:113854`, page StepThumb), `state=default | hover` ; StepGroup `hasAdd`. Story : Composants › Éditeur de démo › Étapes › StepList.
- En code (told-ds v0.22.0) :
  - `StepList` sans `label`, `warning` ni `footer` : la colonne commence par **Début** (`intro` = `MessageCard kind="welcome"`, `disabled` si l'écran d'accueil est désactivé) et finit par **Fin** (`end` = `MessageCard kind="thanks"`, « Bouton « Essayer gratuitement » »). Plus de carte de fin en pointillés.
  - **Ajouts au survol** (`revealAdd="hover"`, par défaut) : `StepAddThumb` en dernier dans chaque StepGroup, `addAfter={<InsertBar label="Ajouter une slide" />}` après la dernière slide, et tout « + » maison marqué `data-step-add` (dont les `InsertPlus` entre deux étapes) ne s'affichent qu'au survol de la colonne ou quand le focus clavier y est.
  - « Ajouter un écran » quitte le bas de la colonne : il reste dans le menu ⋯ de la vignette (« Ajouter un écran après / avant ») et au « + » entre deux étapes.
  - L'avertissement « n étapes à compléter » : garder le point orange sur la vignette (`warning`) ; si un résumé reste utile, le dire en D-029 plutôt que de le remettre dans l'en-tête.
- Priorité : important
- Statut : **codé told-ds v0.22.0**, à appliquer dans Record
- Réponse Record :

### D-029 · Diffuser dans le gabarit de l'éditeur, bandeau du canal (21/11, demandé par Christof)
- Sens : demande du DS vers Record.
- Constat : l'étape Diffuser de Record (branche christof) est une page centrée à colonnes flottantes, avec un titre « Diffuser « … » ». Elle ne suit ni le gabarit de l'éditeur, ni Diffuser de Told (menu collé à gauche, bandeau du canal au-dessus de la carte).
- **Règle** (écrite dans `docs/GUIDE-DEVELOPPEUR.md` de told-ds) : écrans d'édition et Diffuser toujours dans **`EditorLayout`**.
  - `left` = **`SelectionCardGroup`** des canaux (Partager par lien, Intégrer dans une page, Exporter en vidéo), colonne collée à gauche, fond blanc, filet `--neutral-border-divider`.
  - `content="page"` : centre sur `--neutral-surface-canvas`, colonne de lecture de **680** au plus, en haut, écart 24 ; InfoCard 680 de large au plus, 180 de haut au moins (v0.25.1).
  - Dans la colonne : **`InfoCard`** du canal (`type="link"`, `"iframe"` jaune pour l'intégration, `"video"`), puis la **`Card`** : `CardHeader`, `ChannelSection` numérotées, `OptionCard` pour les options (interrupteur, ou `control` pour Orientation), boutons en lg. Dans la rubrique « Publie ta démo » (v0.28.0) :
    - l'état passe **à droite du titre** : `ChannelSection aside={<Badge color="green" dot>En ligne · publiée par Léa le 21 nov.</Badge>}` (ou `light-gray` « Brouillon ») ; plus de ligne « En ligne / Publiée · par Léa » sous le titre ;
    - **l'action prend toute la largeur** : `Button size="lg" fullWidth`, Publier en plein bleu, « Mettre en pause » en plein rouge une fois en ligne ;
    - « Modifications non publiées » devient une **`Alert type="warning" size="sm"`** (message dans le contenu, aligné à gauche, lien « Publier les modifications » par `actionText` / `onAction`) : **Banner** est réservé au bandeau pleine largeur en haut d'une page.
  - Pas de 3e colonne, pas de titre de page « Diffuser « … » » (le fil d'Ariane le dit déjà).
  - L'intégration (code d'intégration, Copier le code) devient son propre canal « Intégrer dans une page », avec le bandeau jaune.
- Référence : story **Gabarits › EditorLayout › Diffuser (Record)** ; Composants › Cartes › Carte et en-tête (InfoCard, canaux). Figma : InfoCard `type=iframe` (`9168:479`), exemples de cartes page Diffuser.
- Priorité : important
- Statut : **codé told-ds v0.25.0**, à appliquer dans Record
- Réponse Record :

### D-030 · Trame de points au centre de l'éditeur en Construire (21/11, décidé par Christof)
- Sens : demande du DS vers Record.
- Besoin : en **Construire**, la zone centrale de l'éditeur (canevas, `editor.tsx`, section « Canevas ») porte la trame de points ; **Diffuser** et **Analyser** restent sur le fond uni `--neutral-surface-canvas`.
- En code (told-ds v0.27.1) : `EditorLayout` met les points par défaut en `content="center"` et le fond uni en `content="page"` ; `dots` force l'un ou l'autre. Sans EditorLayout : classe `dots` du DS, ou le même fond (`--neutral-surface-canvas` + points `--neutral-surface-pattern`, gray-30, tous les 8 px, rayon 0,75 px).
- Référence Figma : EditorLayout (`9020:101921`), DotGrid dans la zone d'édition ; DotGrid (`7964:1626`).
- Priorité : confort
- Statut : **codé told-ds v0.27.1**, à appliquer dans Record
- Réponse Record :

### D-031 · Cadre de l'avatar : contour, sans contour, verre clair ou sombre (23/11, validé par Christof)
- Sens : demande du DS vers Record (lecteur public `packages/player`, et réglage de l'avatar dans le panneau Avatar de l'éditeur).
- Référence Figma : **RecordAvatar** (`9102:2242`, page `🧩 Organismes / RecordPlayer ✅`), nouvel axe `frame` ; exemple sur fond sombre et clair `9800:116971` ; planche **Documentation · RecordPlayer** (`9804:116984`).
- Besoin : un réglage « Cadre » de l'avatar à 4 choix (seulement quand un avatar est choisi ; « Avatar à choisir » garde ses pointillés) :
  - **Contour** (`border`, défaut) : cadre blanc de 4, comme aujourd'hui ;
  - **Sans contour** (`none`) : la vidéo seule, avec l'arrondi du cadre (`--component-record-avatar-frame`) ;
  - **Verre clair** (`glass-light`) : cadre de 4 en blanc 20 %, liseré intérieur 1 px blanc 60 %, `backdrop-filter: blur(12px)`, ombre 0 8 24 noir 8 % ;
  - **Verre sombre** (`glass-dark`) : cadre de 4 en noir 20 %, liseré intérieur 1 px blanc 12 %, même flou, ombre 0 8 24 noir 24 %.
  - **Couleur** (`color`, ajouté le 23/11 après R-11) : cadre de 4 de la couleur choisie, par défaut la couleur du kit (jeton Figma `RecordAvatar/border`, alias de la marque) ; réglage « Couleur du contour » (ColorField sans aide ni contraste) visible seulement avec ce choix.
- **Position** (23/11) : l'avatar se place dans un des 4 coins ou en bas au centre (PositionPicker `positions=5`), réglage commun à tous les slides.
- Le panneau Avatar suit **AvatarSettings** (Figma `9808:3487`) : avatar, Position, Taille, Forme, Contour (Aucun, Couleur, Verre clair, Verre sombre), Couleur du contour. Le choix « Contour » blanc de 4 (`border`) reste la valeur des démos existantes.
- Le verre se lit seulement sur une slide colorée ou sur une capture : verre clair sur fond sombre ou coloré, verre sombre sur fond clair. Sur un fond blanc uni, proposer Contour.
- Dans l'éditeur : pastilles `ChoiceChips` « Contour » (Aucun, Couleur, Verre clair, Verre sombre), sous Taille et Forme.
- Rien à coder dans told-ds (le lecteur ne charge pas le DS) ; valeurs ci-dessus à reprendre dans `announcement.css`.
- Priorité : confort
- Statut : validé Figma, à appliquer dans Record
- Réponse Record (23/11) : fait sur la branche christof (1e49995). `settings.presenter.frame` : border (défaut, démos existantes), none, color, glass-light, glass-dark ; `frame_color` (null = couleur primaire du kit). Valeurs de verre reprises dans `announcement.css` (cadre en ::before flouté). « Avatar à choisir » garde ses pointillés. Statut : fait côté Record.

### D-032 · Mockups photoréalistes pour le média de l'Annonce (23/11, demandé par Christof)
- Sens : demande du DS vers Record (lecteur `packages/player`, `frame.ts`, et choix du cadre dans l'éditeur).
- Référence Figma : **DeviceMockup** (`9814:1408`, page RecordPlayer), photos Mockuuups Studio sans ombre : `device=android` (pink, navy, silver, mint), `iphone` (black, silver, plum, blue), `tablet` (gray, black ; `orientation` portrait | landscape), `macbook` (space-gray, silver), `imac` (silver, yellow, blue, green, orange, purple, pink), `display` (Pro Display) ; `hasShadow` (ombre ajoutée en code, D-034). Les cadres dessinés (MediaFrame : none, browser, laptop, phone) restent.
- Principe : la photo de l'appareil, puis l'écran (zone en %, coins arrondis, `overflow: hidden`) avec la capture ou la vidéo en `object-fit: cover`, puis **la même photo par-dessus en `mix-blend-mode: darken`** (`pointer-events: none`) : le blanc de l'écran laisse voir la vidéo, l'encoche, la caméra et le cadre restent visibles.
- Zones d'écran (en % de l'image ; rayon en % de la largeur) :

  | device | x | y | largeur | hauteur | rayon |
  | --- | --- | --- | --- | --- | --- |
  | android | 3,00 | 1,45 | 93,33 | 96,95 | 9,1 |
  | iphone | 4,33 | 1,78 | 91,33 | 96,45 | 14,8 |
  | imac (sans ombre, 23/11) | 2,50 | 2,97 | 95,00 | 63,50 | 0 |
  | display (sans ombre, 23/11) | 1,50 | 2,02 | 97,00 | 73,40 | 0 |
  | tablet gray (paysage) | 3,75 | 5,54 | 92,25 | 89,27 | 1,7 |
  | tablet black (paysage) | 4,00 | 5,54 | 92,25 | 89,27 | 1,7 |
  | macbook | 9,00 | 2,19 | 81,67 | 86,34 | 1,1 |
- Formats : téléphones ≈ 9:19,5 (une vidéo 9:16 est rognée en haut et en bas), iMac et Pro Display 16:9, MacBook 16:10, iPad ≈ 4:3 (tourné en portrait : rotate(-90deg) sur l'appareil, la capture reste droite).
- Images : à exporter depuis Figma en WebP (fond transparent), largeur 1600 au plus ; à fournir par la conversation DS si besoin. Licence Mockuuups à vérifier par Christof avant diffusion publique.
- Priorité : confort
- Statut : validé Figma (à confirmer par Christof), à appliquer dans Record
- Réponse Record (23/11) : fait sur la branche christof (2b3adaa, puis c0e6d4a pour l'iPad, les 7 iMac et les photos sans ombre). Photo, écran (zones du tableau, capture rognée au format de l'écran ; sans cadrage enregistré, la capture entière), même photo par-dessus en darken. 20 photos WebP exportées de Figma (800 de large pour les téléphones, 1600 pour les autres) dans `public/player/mockups`, autorisées sur le domaine du lecteur public. Licence : abonnement Mockuuups payant de Told Record (POC). Statut : fait côté Record.

### D-033 · Réglage Avatar : position, contour, couleur (23/11, validé par Christof)
- Sens : demande du DS vers Record (éditeur et lecteur).
- Référence Figma : maquette **R-11** (`957:12730`, fichier Maquettes) ; **AvatarSettings** (`9808:3487`) et **PositionPicker** (`9807:117400`), page `🧩 Molécules / Options` du DS.
- **Éditeur** (`editor/presenter.tsx`, panneau Options) : l'OptionItem « Avatar sur ce slide » (interrupteur) ouvert contient `<AvatarSettings>` (told-ds v0.29.0) :
  - `avatar` = le choix de l'avatar actuel (AvatarPicker maison, en attendant D-019) ;
  - `position` / `onPositionChange` : 4 coins et bas au centre (`positions={5}` par défaut) ;
  - `size` (sm, md, lg), `shape` (round, rounded, square) : réglages existants de `presenter` ;
  - `frame` (none, color, glass-light, glass-dark) et `frameColor` (couleur du kit par défaut) : nouveaux réglages, voir D-031 pour le rendu ;
  - ces réglages valent pour tous les slides ; seul l'interrupteur est par slide.
- **Format de démo** (`packages/demo-format`) : ajouter `presenter.position` (`top-left | top-right | bottom-left | bottom-center | bottom-right`, défaut `bottom-left` ou la place actuelle), `presenter.frame` (défaut `border` pour les démos existantes) et `presenter.frameColor`. Monter `schema_version` si la règle du format le demande.
- **Lecteur** (`packages/player`, `announcement.ts` et `.css`) : placer l'avatar à la position choisie (marge 24 sur une slide de 960, à l'échelle), avec le cadre D-031.
- Priorité : important
- Statut : **codé told-ds v0.29.0**, à appliquer dans Record
- Réponse Record (23/11) : fait sur la branche christof (1e49995). AvatarSettings dans « Avatar sur ce slide » ouvert, AvatarPicker maison dans `avatar` (D-019). Format : `presenter.position` (null = place historique : colonne de texte en paysage, bas à droite sinon), `presenter.frame`, `presenter.frame_color` (snake_case comme le reste du format) ; pas de nouveau schema_version (clés facultatives). Lecteur : marge 24 sur 960, positions du bas au-dessus du logo et de la pause. Tailles et formes traduites (sm/md/lg ↔ small/medium/large ; round/rounded/square ↔ round/square/sharp). Point ouvert : en paysage, « En haut à gauche » recouvre le titre. Manque → D-042.

### D-034 · Cadre du média : picto et choix Aucun / Mobile / Ordinateur (23/11, demandé par Christof)
- Sens : demande du DS vers Record (panneau Options de l'Annonce, et format de démo).
- Constat : la section « Cadre du média » n'a pas de picto, et propose 6 pastilles à plat (Cadre du kit, Android, iPhone, iMac, Écran, MacBook) puis les coloris.
- Référence Figma : **MediaFrameSettings** (`9828:6305`, page `🧩 Molécules / Options`), `frame=none | mobile | tablet | desktop`.
- En code (told-ds v0.30.0) :
  - `OptionItem variant="open" icon="device" label="Cadre du média"` (picto IconBoxedColor `device`) ;
  - contenu `<MediaFrameSettings kind device finish orientation shadow …>` (v0.31.0) : Cadre **Aucun | Mobile | Tablette | Ordinateur** (GroupTab avec libellé), puis Appareil (ou Orientation Portrait | Paysage pour la tablette), Coloris et **Ombre** (Aucune | Douce | Marquée) seulement pour les photos ; la liste par défaut est `mediaDevices` :
    - Mobile : Simple (cadre dessiné `phone`), Android (4 coloris), iPhone (4 coloris) ;
    - Tablette : iPad (gris, noir), portrait ou paysage (en portrait, l'image de l'appareil est tournée d'un quart de tour, la zone d'écran suit) ;
    - Ordinateur : Navigateur (cadre `browser`), Portable (cadre `laptop`), iMac (7 coloris), Écran (Pro Display), MacBook (2 coloris) ;
  - « Aucun » = la capture seule, avec l'arrondi du kit (ex-« Cadre du kit »).
- Format de démo : `media.frame = { kind: 'none' | 'mobile' | 'tablet' | 'desktop', device?, finish?, orientation?, shadow? }`. Rendu des photos : D-032 ; ombre : `filter` de `mediaShadows` sur l'image de l'appareil.
- Priorité : important
- Statut : **codé told-ds v0.30.0**, à appliquer dans Record
- Réponse Record (23/11) : fait sur la branche christof (c0e6d4a), sauf les cadres dessinés « Simple » (téléphone) et « Portable » : le lecteur ne les dessine pas encore, ils sont retirés de `mediaDevices` dans Record. Format : `settings.media_frame = { kind, device, finish, orientation, shadow, capture_zoom }` (snake_case ; null = cadre du kit, sa barre de navigateur ou rien). « Navigateur » = la barre de navigateur du kit. Ombre : valeurs de `mediaShadows` recopiées dans le lecteur (qui ne charge pas le DS). Statut : fait côté Record (sans Simple ni Portable).

### D-035 · Cadrage du média : agrandir et placer la capture dans sa zone (23/11, demandé par Christof)
- Sens : demande du DS vers Record (éditeur, format, lecteur).
- Besoin : agrandir le média (capture + cadre ou appareil) et choisir la partie visible, par exemple zoomer dans un coin pour ne montrer qu'une partie de l'écran. Libre selon le contexte.
- Référence Figma : **MediaCropSettings** (`9825:6305`, page Options) ; **_MediaHandles** (`9825:15009`) et l'exemple « média agrandi ×1,8, point de zoom en bas à droite » (`9825:15071`), page RecordPlayer.
- Panneau (told-ds v0.30.0) : `OptionItem variant="open" icon="crop" label="Cadrage du média" value="× 1,8"` avec `<MediaCropSettings zoom anchor onReset …>` : Zoom ×1 à ×3 (point à ×1), Point de zoom (PositionPicker `item="media"`, 9 places), « Réinitialiser le cadrage ».
- Sur la slide, dans l'éditeur : cliquer le média le sélectionne (cadre bleu sur la zone, 4 poignées, pastille « × 1,8 · glisse pour placer ») ; **glisser** déplace le point visible, **tirer un coin** change le zoom. Le panneau suit.
- Format de démo, proposition : `media.crop = { zoom: 1..3, focusX: 0..1, focusY: 0..1 }` (défaut 1, 0,5, 0,5). Les 9 places du PositionPicker valent 0 / 0,5 / 1 ; le glisser donne des valeurs libres (le PositionPicker n'en montre alors aucune).
- Lecteur : la zone média coupe son contenu (`overflow: hidden`) ; le média reçoit `transform: scale(zoom)` avec `transform-origin: focusX*100% focusY*100%` : le point choisi reste en place et le reste s'agrandit autour. Même rendu dans la vidéo exportée.
- Priorité : important
- Statut : **codé told-ds v0.30.0** (panneau), à appliquer dans Record
- Réponse Record :

### D-036 · Cadre du média selon l'orientation de l'Annonce, zoom de la capture (23/11, demandé par Christof)
- Sens : demande du DS vers Record (panneau Options de l'Annonce, format, lecteur).
- Référence Figma : **MediaFrameSettings** (`9828:6305`), nouvel axe `slide=landscape | portrait` et champ « Capture dans l'écran ».
- **Choix selon l'orientation** (told-ds v0.32.0, `slideOrientation`) :
  - Annonce **paysage 16:9** : Aucun | Mobile | Tablette (portrait ou paysage) | Ordinateur ;
  - Annonce **verticale 9:16** : Aucun | Mobile | Tablette, **pas d'Ordinateur** (trop petit pour être lisible), tablette forcée en portrait ; une note conseille d'enregistrer au format mobile.
  - En passant de paysage à vertical, un cadre devenu impossible (Ordinateur, tablette paysage) bascule sur Mobile, ou sur la tablette portrait : `allowedMediaFrames(orientation)` donne la liste. Le dire par un Toast (« Cadre passé en mobile pour l'Annonce verticale »).
- **Zoom de la capture dans l'écran** (`captureZoom`, ×1 à ×2, point à ×1) : agrandit la capture à l'intérieur de l'écran de l'appareil, pour toute l'Annonce. La partie visible d'une étape se choisit avec l'outil **Recadrer (R)** existant, dont le cadre prend alors **le ratio de l'écran de l'appareil choisi** (téléphone ≈ 9:19,5, iPad 3:4 ou 4:3, iMac et Pro Display 16:9, MacBook 16:10) au lieu de celui de l'Annonce.
- Format de démo : `media.frame.captureZoom` (défaut 1).
- Priorité : important
- Statut : **codé told-ds v0.32.0**, à appliquer dans Record
- Réponse Record (23/11) : fait sur la branche christof (c0e6d4a). `slideOrientation` suit l'orientation de l'Annonce (le Carré compte comme paysage) ; en passant en vertical, Ordinateur devient Mobile et la tablette paysage passe en portrait, avec un Toast ; le lecteur n'affiche jamais d'ordinateur dans une Annonce verticale. `capture_zoom` (×1 à ×2) agrandit les étapes sans cadrage enregistré ; un cadrage fait avec Recadrer est exact (pas re-zoomé). Recadrer prend le ratio de l'écran de l'appareil. Manque : GroupTab sans état désactivé → D-042. Statut : fait côté Record.

### D-037 · Formats d'enregistrement adaptés au mockup (23/11, proposition de Christof, à valider par Jonathan)
- Sens : demande du DS vers Record (extension, puis éditeur).
- Besoin : être sûr que la capture rend bien dans le mockup, en enregistrant directement à la taille de l'appareil plutôt qu'en rognant une capture d'ordinateur.
- Proposition : avant d'enregistrer, l'extension propose un **Format d'enregistrement** (Figma : exemple `9829:8573`, page RecordPlayer, fait de `SelectionCard` md) :
  - **Ordinateur** · 1440 × 900 (Annonce paysage, MacBook, iMac, Écran) ;
  - **Tablette** · 1024 × 1366, avec Orientation Portrait | Paysage (iPad) ;
  - **Mobile** · 390 × 844 (Annonce verticale, iPhone, Android).
- La page enregistrée s'affiche à cette taille : la mise en page responsive du site client est la vraie (menu mobile, colonnes), et la capture a le ratio de l'écran du mockup, sans rognage. Piste technique à confirmer par l'architecte : émulation de l'appareil par l'extension (largeur, hauteur, densité, `mobile`), puis retour à la normale à la fin.
- Dans l'éditeur, le cadre du média par défaut suit le format enregistré (mobile → téléphone, tablette → iPad, ordinateur → MacBook) ; une Annonce verticale propose d'abord le format mobile.
- Icônes : `computer`, `tablet-01` (ajoutée le 23/11), `smart-phone-01`.
- Priorité : important
- Statut : proposition, plan à présenter à Jonathan (règle « une fonctionnalité à la fois » de Record)
- Réponse Record (23/11) : plan de l'architecte présenté à Jonathan, pas encore codé. Piste : émulation par l'extension (Chrome DevTools Protocol, permission `debugger`, bandeau jaune de Chrome) pour Tablette et Mobile seulement ; Ordinateur inchangé. En attente de la validation de Jonathan.

### D-038 · Options selon l'élément sélectionné, et règle onglets / pastilles (23/11, demandé par Christof)
- Sens : demande du DS vers Record (panneau Options de l'éditeur).
- Constat : le panneau de l'Annonce empile beaucoup de réglages (format, thème, progression, cadre, textes, avatar, durée…) ; et Taille, Forme sont en pastilles alors que la règle du DS les met en onglets.
- **Règle** (told-ds v0.33.0, `docs/GUIDE-DEVELOPPEUR.md`) : 3 choix ou moins en texte → `GroupTab` ; plus de 3, ou des choix avec couleur, avatar, vignette, icône → `ChoiceChips`. `ChoiceField` l'applique tout seul. À passer dans tout le panneau (Taille, Forme, Ombre, Appareil mobile, Progression « En haut / En bas / Aucune »…).
- **Options selon la sélection** (Figma : exemple `9834:15434`, page Options) :
  - rien de sélectionné : réglages de la slide (Format, Thème, Progression, Logo, Durée) ;
  - clic sur un élément de la slide (média, avatar, surtitre, titre, texte, logo) : le panneau ne montre que ses réglages, sous `<OptionContextHeader title="Média" onBack>` ; Échap ou clic hors de la slide revient aux réglages de la slide ;
  - Média : Cadre du média, Cadrage du média, Zoom de la capture ; Avatar : Avatar sur ce slide + AvatarSettings ; Surtitre : EyebrowSettings (D-040).
- Priorité : important
- Statut : **codé told-ds v0.33.0**, à appliquer dans Record
- Réponse Record (23/11) : fait sur la branche christof (69bd3ab). Clic sur le média, l'avatar, le surtitre, le titre, le texte ou le logo : le panneau ne montre que ses réglages sous `OptionContextHeader`, l'élément est entouré dans l'aperçu ; Échap (hors champ texte), la flèche ou un clic à côté de la slide reviennent aux réglages de la slide (Thème, Progression, Logo, Durée ; « Avatar sur ce slide » seulement pour l'allumer). Média : Cadre du média (zoom compris) et « Cadrage du média » (Recadrer). Titre et Texte : Apparition. Surtitre : EyebrowSettings et « Même surtitre pour toutes les étapes ». Progression passée en `ChoiceField` (« En haut / En bas » : pas de valeur « Aucune » dans le format pour l'instant) ; Taille, Forme, Ombre, Appareil suivent la règle via AvatarSettings et MediaFrameSettings. Restent en menu sur la ligne les listes longues ou chiffrées : Durée, Image sans animation. Statut : fait côté Record.

### D-039 · Logo de la slide : Told en offre gratuite, le sien ou aucun en offre payante (23/11, demandé par Christof)
- Sens : demande du DS vers Record (panneau Options, kit de marque, lecteur, offres).
- Référence Figma : **LogoSettings** (`9832:22916`, page Options).
- En code (told-ds v0.33.0) : `OptionItem icon="brand-kit" label="Logo" pro={plan === 'free'}` + `<LogoSettings plan value onChange customLogo onOpenBrandKit onUpgrade>` :
  - **offre gratuite** : logo Told imposé, non désactivable ; encart **ProUpsellCard** « Marque blanche » + « Essayez Told Pro » (v0.34.0, comme la carte du widget Told) ;
  - **offre payante** : Told | Le mien (logo du kit de marque ; sans logo dans le kit : « Ajouter mon logo au kit ») | Aucun.
- **Sécurité** : l'offre se vérifie côté serveur (et en base, RLS ou contrôle de l'API de publication) : une démo d'une organisation en offre gratuite garde toujours le logo Told dans le lecteur, l'embed et la vidéo, même si le réglage est modifié à la main. Le logo du client vient du stockage du kit de marque (privé, URL signée).
- Format de démo : `settings.brandLogo = 'told' | 'custom' | 'none'` (défaut `told`).
- Priorité : important
- Statut : **codé told-ds v0.33.0** (panneau), à appliquer dans Record (offres à confirmer avec Jonathan)
- Réponse Record (23/11) : panneau fait sur la branche christof (69bd3ab), offres pas encore. `settings.brand_logo = 'told' | 'custom' | 'none'` (snake_case ; null = logo du kit, le comportement d'avant, donc « Le mien » par défaut et non « told »). LogoSettings dans les réglages de la slide et au clic sur le logo ; le lecteur dessine le logo Told depuis un fichier statique de l'app (tracés du Logo du DS, le lecteur ne chargeant pas le DS). Offres : `plan="paid"` pour toutes les organisations tant que le plan (décision Record 0050 : offre lue en base, règle appliquée côté serveur à la lecture de la démo publiée, ProUpsellCard en offre gratuite) n'est pas validé par Jonathan. Statut : en partie fait côté Record.

### D-040 · Surtitre « Nouveau » : avec ou sans fond, couleur au choix (23/11, demandé par Christof)
- Sens : demande du DS vers Record (éditeur, format, lecteur).
- Référence Figma : **EyebrowSettings** (`9832:22834`) ; label tour `style=badge | text` (page ProductTour).
- En code (told-ds v0.33.0) : `<EyebrowSettings variant color onVariantChange onColorChange slideBackground>`, affiché quand on sélectionne le surtitre sur la slide (D-038).
  - Avec fond : pastille de la couleur choisie (jaune par défaut), texte noir ou blanc selon le fond (contraste).
  - Sans fond : texte de la couleur choisie (couleur du kit par défaut), contraste mesuré sur le fond de la slide.
- Format de démo : `slide.eyebrow = { variant: 'badge' | 'text', color }`.
- Priorité : confort
- Statut : **codé told-ds v0.33.0**, à appliquer dans Record
- Réponse Record (23/11) : fait sur la branche christof (69bd3ab). Réglage de toute la démo et non de chaque slide, comme le surtitre commun : `settings.eyebrow_style = { variant: 'badge' | 'text', color }` (null = pastille blanche, l'aspect d'avant ; couleur null = défaut de la variante : blanc pour la pastille, couleur du kit pour le texte seul). Pastille : texte noir ou blanc selon le contraste. EyebrowSettings ne se désactive pas (GroupTab, ColorField) : ignoré pendant un verrou, voir D-042. Statut : fait côté Record.

### D-041 · Écrans de début et de fin de l'Annonce et de la démo, communs à tous les produits (23/11, validé par Christof)
- Sens : demande du DS vers Record (éditeur, format, lecteur, vidéo exportée).
- Référence Figma : page `🧩 Organismes / StartEndScreen ✅` : **StartScreen**, **EndScreen** (layout centered | split | cover × context slide | vertical | widget), **RewardBlock**, **ScreenActions**, **Countdown**, **SocialLinks** ; planche Documentation · StartEndScreen.
- En code (told-ds v0.36.0) : `<StartScreen>` et `<EndScreen>` à la taille logique de la slide (960 × 540 ou 540 × 960), mis à l'échelle par le lecteur comme les slides.
  - Début : logo, média, titre, description, **un bouton qui lance** (« Lancer l'annonce », « Commencer la démo »).
  - Fin : logo, média, titre, message, **1 à 3 boutons** (lien ou action : « Essayer gratuitement », « Revoir », « Réserver une démo »), **récompense** (code promo à copier, lien cadeau, points), points clés, compte à rebours, réseaux sociaux.
  - Trois styles au choix de l'utilisateur : centré, partagé (texte à gauche, média à droite ; en vertical, média en haut), couverture (média en fond, voile, boutons `surface="dark"`).
  - Couleurs : fond et boutons du kit de marque ; logo du kit (D-039) ; textes au tutoiement par défaut, modifiables.
- Éditeur : l'introduction et l'écran de fin de la colonne Étapes (StepList, Début et Fin) ouvrent ces réglages dans le panneau Options (style, textes, média, boutons, récompense…), avec les composants du panneau (ChoiceField, MediaFrameSettings…). Une maquette d'éditeur est à faire côté Maquettes.
- Format de démo, proposition : `intro` et `end` = `{ enabled, layout, logo, media, title, description, actions[], reward?, keyPoints?, countdownUntil?, social? }`.
- Sécurité : liens des boutons et réseaux sociaux en `https` seulement, ouverts dans un nouvel onglet (`rel="noopener noreferrer"`) ; le code promo est un texte, jamais exécuté.
- Priorité : important
- Statut : **codé told-ds v0.36.0**, à appliquer dans Record (plan court à présenter à Jonathan : format, lecteur, éditeur)
- Réponse Record :

### D-043 · Réglages en micro-modale (PopoverField + OptionPopover) (24/11, validé par Christof)
- Sens : demande du DS vers Record (panneau Options de l'éditeur).
- Référence Figma : page `🧩 Molécules / Options ✅`, section « Micro-modale · PopoverField + OptionPopover » (`9928:10859`) ; planche « Blocs d'option · fermé et ouvert » (`9920:7302`).
- Règle : **3 choix ou moins = GroupTab** ; **plus de 3 choix, ou réglage long et peu modifié = `PopoverField` + `OptionPopover`**, avec une liste illustrée (`FormatOptionGroup`) quand les choix se montrent mieux qu'ils ne se lisent.
- Déjà fait dans le DS (rien à changer dans l'API) : `AvatarSettings` (Position, Contour et sa couleur), `MediaFrameSettings` (Cadre en liste illustrée, Appareil + Coloris dans un seul champ), `RadiusSettings`, `SoundSettings`.
- À faire dans Record :
  1. **Format** : la ligne Format garde son badge, l'action devient « Changer » et ouvre `<OptionPopover title="Format" anchor={ligne}>` avec `<FormatOptionGroup>` (Démo guidée, Annonce, Animation in-app). La grande modale Format sort de l'éditeur.
  2. **Proportions** : ligne à part, sous Format, `GroupTab` Paysage 16:9 | Vertical 9:16 (badge « 16:9 »). Le Carré 1:1 attend une décision (format, lecteur, maquette).
  3. Poser `data-option-sidebar` sur le conteneur du panneau Options de Record (si ce n'est pas `OptionSidebar`) : la micro-modale s'ouvre à gauche du panneau, sinon sous le champ.
  4. **Textes d'aide** : les petites phrases sous les réglages vont dans le i de la ligne (`OptionItem info="…"`) ; passer `note={false}` à AvatarSettings et MediaFrameSettings, `captureHelp={false}`.
  5. **Logo** : interrupteur sur la ligne (`OptionItem toggle`, sans chevron), activé la ligne s'ouvre sur Told | Le mien et **Version du logo Clair | Sombre** (`LogoSettings tone`, `onToneChange`) ; à faire avec D-039 (nouveau réglage `brand_logo_tone` dans le format).
- Priorité : important
- Statut : **codé told-ds v0.53.0 à v0.56.0**, à appliquer dans Record
- Réponse Record : appliqué le 24/11 (branche christof) : Format en « Changer » et OptionPopover, ligne Proportions, aides dans le i, interrupteur du logo et Version du logo (`settings.brand_logo_tone`, logo Told seul, grisé avec le logo du kit). Trois manques restent, contournés : voir **D-082**.

### D-044 · Position libre du média (24/11, validé par Christof)
- Sens : demande du DS vers Record (format, lecteur, éditeur, vidéo exportée).
- Référence Figma : section « Exploration · Position libre du média » (`9937:9231`, page Options) ; `MediaFrameSettings` (« Taille et place du média » + Recentrer).
- Besoin : déplacer **le cadre et la capture ensemble** n'importe où dans la zone du média, l'agrandir ou le réduire ; ce qui dépasse la zone est coupé (ex. ordinateur agrandi × 1,6 et glissé dans le coin, le bas et la droite coupés). Remplace Avec marge | À droite | Dans le coin (`media_frame.placement`, D-034 et migration 20261217) **et** le réglage Cadrage (D-035, MediaCropSettings).
- Panneau (told-ds v0.55.0) : `<MediaFrameSettings mediaScale={…} onMediaScaleChange={…} onRecenter={…}>` : curseur Taille de × 0,5 à × 3 (point à × 1), lien Recentrer. Sans `placement`.
- Éditeur : sur la slide, le média sélectionné montre la zone du média en pointillés bleus, ses 4 poignées et la pastille « × 1,6 · glisse pour placer » ; **glisser** déplace, **tirer un coin** agrandit (le panneau suit). Pendant le glisser, la partie coupée reste visible en transparence.
- Format de démo, proposition : `media_frame.place = { scale: 0.5..3, x: 0..1, y: 0..1 }` = centre du média dans sa zone (0,5 ; 0,5 = centré), bornes larges pour pouvoir sortir à moitié. Défaut `{ 1, 0.5, 0.5 }`. Reprise des démos existantes : inset → `{1, .5, .5}`, edge → centre collé au bord droit (ou bas en vertical), corner → coin bas droit.
- Lecteur et vidéo : la zone du média coupe son contenu (`overflow: hidden`) ; le média reçoit `transform: translate(…) scale(scale)` depuis le centre. Même rendu dans la vidéo exportée.
- Priorité : important
- Statut : **codé told-ds v0.55.0** (panneau), à appliquer dans Record (plan court à présenter à Jonathan : format et migration, lecteur, éditeur)
- Réponse Record : appliqué le 24/11 (branche christof), décision 0060 de Record (ex-0057). `media_frame.place` remplace `placement` ; les anciennes positions se traduisent exactement (inset {1, .5, .5}, edge {1, 1, .5} en paysage ou {1, .5, 1}, corner {1, 1, 1}). Les versions publiées ne sont pas réécrites et le lecteur lit toujours `placement`. Recadrer et Zoom restent, dans le bloc Cadre du média (la section Cadrage disparaît). Un manque : voir **D-083**.

## Demandes de Told V3 (24 et 25/11)
Sens : Told V3 (dossier `told-v3/told`, branche `v3/integration`) vers le DS. Numérotées dans le code de Told (`// TODO DS: D-0xx`), reportées ici le 25/11. Bilan côté Told : 64 composants du DS utilisés, 29 maison (`design-system/correspondance.json`).

### Lot A · fondations (débloquent beaucoup d'écrans)
- **D-061** · Icône « archive » manquante. Réponse DS : ajouter `archive-02` (HugeIcons). Statut : codé told-ds v0.63.0.
- **D-065** · Infobulle au survol. Réponse DS : `Tooltip` n'a que le visuel ; ajouter un déclencheur `TooltipTrigger` (`<TooltipTrigger content="…">enfant</TooltipTrigger>`, survol et focus, délai, position). Statut : codé told-ds v0.63.0.
- **D-071** · Popover ancré à son bouton. Réponse DS : `Popover` générique (ancre, placement, fermeture au clic dehors et Échap, focus) ; `OptionPopover` et le menu de colonne s'appuieront dessus. Statut : codé told-ds v0.63.0.
- **D-074** · Menu avec son déclencheur. Réponse DS : `Menu` (DropdownMenu kind="menu" + son `trigger`). Statut : codé told-ds v0.63.0.
- **D-072** · Accordéon. Réponse DS : `Accordion` + `AccordionItem` (hors panneau d'options). Statut : codé told-ds v0.63.0.
- **D-060, D-073** · File de toasts. Réponse DS : `Toaster` + `toast()` (pile, durée, action, fermeture). Statut : codé told-ds v0.63.0.
- **D-070** · Panneau latéral. Réponse DS : `SidePanel` (glisse depuis la droite, en-tête, pied, fermeture). Statut : codé told-ds v0.63.0.
- **D-074** · Modale classique, tableau des pages de réglages, zone de défilement. Réponse DS : Modal existe (à vérifier contre le besoin) ; tableau = `DataTable variant="contained"` (v0.62.0) ; `ScrollArea` à faire. Statut : codé told-ds v0.63.0 (ScrollArea).
- **D-051** · `ref` et attributs du déclencheur sur ProjectSwitcher et AccountCard. Statut : codé told-ds v0.63.0.
- **D-054** · `leftWidth` / `rightWidth` dans `Layout type="editor"`. Statut : codé told-ds v0.63.0.
- **D-055** · Colonne droite dans `Layout type="analyser"`. Statut : codé told-ds v0.63.0.
- **D-050** · SubStepItem sélectionné : fond dilué deux fois (~1 %). Statut : codé told-ds v0.63.0.
- **D-048** · Recherche de l'AddBlockModal pilotable (`query`, `onQueryChange`) et textes passés en props. Statut : codé told-ds v0.63.0.
- **Textes en dur** : SaveReportModal et les blocs d'une étape (v0.61.0) ont leurs textes en français dans le DS : ajouter une prop `labels` (traduction depuis Told). Statut : codé told-ds v0.63.0.

### Lot B · Analyser
- **D-056** · StatCard et cartes de résultats (NPS, choix, question ouverte, réponse, testeur) : dessinées et validées (page Report ✅), pas codées. Statut : à faire.
- **D-057** · ReportNavItem et RespondentItem (colonnes gauches d'Analyser). Statut : à faire.
- **D-052** · SectionTitle (titres de section de liste : pastille, libellé, compte, filet ; casse normale). Statut : à faire.
- **D-053** · Ligne de liste d'objets (icône, titre, méta, colonnes, actions). Statut : à dessiner puis coder.

### Lot C · Éditeur
- **D-047** · ModuleEditCard, TabMessage (onglet avec croix dès deux pages), état « éteint » cliquable de MessageCard. Statut : à faire.
- **D-049** · StepEditCard (les blocs Preset, ContentBlock, SecondaryBlock sont codés en v0.61.0). Statut : à faire.
- **D-058** · SecondaryBlock : bouton d'action (copier un code, pas un lien) et bloc récompense. Statut : à dessiner puis coder.
- Lot 2 de QuestionEdit : blocs par type (NPS, échelle, choix, liste, question ouverte…).

### Notes de Told V3 (25/11, hors DS)
- Mettre à jour un rapport : l'API ne sait pas modifier une vue enregistrée ; « Mettre à jour » recrée le rapport sous le même nom et supprime l'ancien. À prévoir côté back (modifier une vue).
- Les filtres ne suivent pas d'un onglet à l'autre (Synthèse → Tableau les réinitialise). Proposition DS : les filtres et le rapport choisi appartiennent au Told, pas à l'onglet ; ils restent en changeant d'onglet.
- Donnée de test : rapport fictif « Avec la langue » sur le Told « NPS site ».

## Questions de Record (20/11)
- **Annonce en Carré 1:1 ?**
  - Christof a retenu les formats 16:9 et 9:16.
  - Proposition DS : **retirer le Carré de Record**, à confirmer par Christof.
- **Barre de confirmation du floutage dans le DS ?**
  - Proposition DS : **oui**, en composant générique **ActionBar**, à dessiner après accord.

## Fait côté DS le 20/11

### Dans told-ds v0.12.0 à v0.25.0
Nouveaux composants :
- En-tête : **ButtonEditionMenu**, **EditorSteps**, ButtonTab `color="inverse"` (v0.15.0).
- Filtres : **FilterBar**, **FilterChip**, **FilterLogic**, **FilterMenu** (v0.17.0).
- **EditorLayout** : gabarit en-tête + 3 colonnes, canevas à points.
- **SliderCapsule**, **ChoiceChips**.
- Commentaires : **CommentCard** (ouvert, non lu, résolu), **CommentPin**, **CommentComposer**, **Mention**.
- **CheckList** et **CheckRow** (avant publication).
- **EmptyState** (Figma validé le 21/11 ; illustrations : une couleur de marque par contexte, export SVG à venir).
- **StepAddThumb**, **StepDropLine** ; StepThumb `multiSelected`, `drop`, `dragging` (v0.19.0).
- GroupTab `label` (libellé au-dessus, v0.18.0) ; AvatarGroup `id`, `idle` (v0.20.0).
- **FormatOptionGroup** et illustrations `demo`, `announcement`, `inapp` ; StepGroup numéro seul et chevron à droite (v0.21.0).
- StepList : ajouts au survol (`revealAdd`, `addAfter`, `data-step-add`) (v0.22.0).
- **Card**, **CardHeader**, **ChannelSection**, **OptionCard**, **OptionChoiceGroup**, **SelectionCardGroup** (v0.23.0) ; OptionItem `control` (v0.24.0) ; **InfoCard**, EditorLayout `content="page"` (v0.25.0).

Composants modifiés :
- **StepList** : sections `intro` et `end`.
- **OptionItem** générique.
- **ProgressSteps** `theme="dark"`.

Jetons :
- `--neutral-border-divider` (nouveau).
- Canevas gray-10 et motif gray-40.

### Dans Figma seulement
- **EditorHeaderRecord** (ex-EditionNavRecord) : avatars de présence affichés par défaut (`hasPresence` vrai, 20/11).
- **RecordAvatar** (validé, à appliquer dans le lecteur : D-015) : avatar posé sur la slide quand il est activé ; `state` filled | empty, `size` sm | md | lg (120, 160, 200), `hasAiTag`, `label`. Forme par le mode 03-radius de l'instance : Default carré arrondi 24, Roundy rond, Sharp carré (jetons `component/record-avatar/frame` et `/media`). En code, prévoir une prop `shape` qui suit le réglage d'arrondi de la démo.
- StepThumbMenu.
- FormatModal.
- AnnouncementSlide (validée, à appliquer dans le lecteur : D-015), MediaFrame, AnnouncementBlock. Page RecordPlayer validée ✅ le 23/11, planche Documentation · RecordPlayer.
- RecordAvatar `frame` border | none | glass-light | glass-dark (D-031).
- AvatarPicker.
- Contenus d'options Record.
- EmptyIllustration (validée le 21/11, à exporter en code).

### D-075 · ButtonGroup et Popover (Told V3, 25/11)
Statut : codé told-ds v0.65.0. Les restes : D-055 pleine largeur codé v0.65.0 ; D-074 Modal avec déclencheur et en-tête libre, Avatar `initials` codés v0.65.0 ; icône `pause` déjà dans le DS (`<Icon name="pause" />`) ; Select « teinte d'accent » en attente : le Select de Figma n'a pas de teinte, préciser l'écran et le besoin.
