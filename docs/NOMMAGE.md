# Nommage : Figma ↔ code ↔ Told Record

> À lire **avant de créer un composant**, dans le design system comme dans Told Record. Si ce que tu veux faire figure dans ce fichier, le composant existe déjà : on l'utilise ou on le fait évoluer, on n'en crée pas un second.
> Analyse du 19/11/2026, mise à jour le 20/11 : fichier Figma `UzceYU5fzcWKqlgISYpS8V` (≈ 330 composants), paquet `@told/design-system` v0.10.0 (98 composants avec leurs propriétés), dépôt `jscanzi/toldrecord`.

## 1. La règle

1. **Figma donne le nom du composant.** Le code reprend le même nom, sauf la liste du § 2, figée pour ne pas casser Told Record. Les noms Figma de ces composants sont aussi exportés comme alias quand l'API est la même.
2. **Les propriétés suivent l'usage de React**, avec la correspondance du § 3, qui est la même partout. Un écart propre à un composant est écrit au § 4.
3. **Les pièces internes de Figma** (nom en `_PascalCase`, par exemple `_ToolbarItem`) perdent le tiret bas dans le code (`ToolbarItem`) et ne s'utilisent qu'à l'intérieur de leur parent.
4. **Un nouveau composant** est dessiné dans Figma d'abord. Il prend un nom anglais en PascalCase sans espace ni tiret, identique dans Figma et dans le code. On ajoute sa ligne ici en même temps.

## 2. Composants dont le nom diffère

| Figma | Code | Alias exporté | Remarque |
| --- | --- | --- | --- |
| ModalBase | `Modal` | `ModalBase` | |
| ConfirmModal | `ConfirmModal` | | même nom ; c'est un Modal centré |
| DropdownField | `Select` | `DropdownField` | Select gère la liste ; DropdownField n'est que le champ |
| LabelTag / LabelBase | `Tag` | | |
| FlagCountry | `Flag` | `FlagCountry` | |
| logoTold2025 | `Logo` | | `mini` = logo miniature |
| ProgressBarWidget | `ProgressSteps` | `ProgressBarWidget` | |
| Loader, SkeletonLine, SkeletonCard | idem | | |
| TourItemBase | `TourStep` | `TourItemBase` | |
| Widget-tour | `TourBubble` | | nom Figma avec tiret, pas d'alias possible |
| welcome-modale-tour | `TourWelcome` | | |
| Link-survey | `LinkSurvey` | | |
| NPS Component | `NpsAnswer` | | |
| Rating scale - Question | `ScaleAnswer` | | |
| User story | `UserStory` | | |
| EditionNavRecord | `EditorHeader` (+ `EditorSaveState`, `EditorChanges`) | | le code est un gabarit à emplacements ; l'en-tête Told (EditionNav) n'est pas codé |
| WidgetChecklist / ChecklistItem | `ChecklistItem` | | la liste complète n'est pas codée |
| CodeDigit | intégré à `CodeInput` | | |
| _PresenceAvatar | `PresenceAvatar` | | |
| _PromptChip, _ToolbarItem, _ChoiceThumb, _ChoiceIllustration, _ContrastMenu | `PromptChip`, `ToolbarItem`, `ChoiceThumb`, `ChoiceIllustration`, `ContrastMenu` | | règle 3 |
| `IconBoxed` | `IconBoxed` | | pas de composant Figma du même nom : pastille d'icône simple |
| OptionItem (ex-OptionPanelItem et PanelSection) | `OptionPanelItem` | `OptionItem` | fusion du 20/11 ; utiliser `OptionItem` dans le nouveau code |
| OptionSidebar (ex-OptionPanel et StepOptionsPanel) | `OptionPanel` | `OptionSidebar` | fusion du 20/11 ; variante `contentType=record` pour Told Record |

Tous les autres composants codés portent **exactement** le nom Figma : Button, ButtonIcon, ButtonGroup, ButtonGradient, ButtonDropdown, ButtonLink, Badge, Avatar, AvatarGroup, AiTag, AiNotice, Banner, Toast, Tooltip, Kbd, KbdCombo, Input, SearchBar, TextArea, Checkbox, Radio, Switch, TextTab, ButtonTab, GroupTab, Pagination, PaginationButton, NavButtonItem, Divider, FileUploader, Calendar, IconBoxedColor, ColorField, ContrastBadge, CopyField, CodeBlock, Breadcrumb, EditableTitle, FloatingToolbar, IntentInput, IntentPanel, QuickSuggestion, ChoicePicker, StepThumb, StepGroup, StepList, GettingStarted, GettingStartedStep, ModuleCard, SubStepItem, MessageCard, FlowDivider, InsertBar, DropZone, AddBlockModal, BlockTypeItem, OptionPanel, OptionPanelItem, PanelHeader, FormatCard, LogicRule, NotificationCenter, NotificationItem, AppLayout, AuthPanel, CodeInput, PasswordStrength, DividerLabel, SocialButton, TranslationTable, LanguageItem, Widget, WidgetButton, WidgetChoice, WidgetConsent.

## 3. Correspondance des propriétés (vaut pour tous les composants)

| Figma | Code | Exemple |
| --- | --- | --- |
| `label`, `text`, `title` (texte principal) | `children` | `<Button>Publier</Button>` |
| `hasIconLeft` + `iconLeft` | `iconLeft` (absent = pas d'icône) | `iconLeft="view"` |
| `hasX` + `xText` | `x` (absent = masqué) | `hasCounter` + `counterText` → `counter="94 / 280"` |
| `hasX` seul (booléen d'affichage) | `x` booléen | `hasDot` → `dot` |
| `style` | `appearance` | Badge, ButtonIcon, Input, ButtonGroup |
| `type` (variante visuelle de Button, WidgetButton) | `variant` | `variant="secondary-outline"` |
| `type` (genre de contenu : Toast, Banner, Alert) | `type` | `type="warning"` |
| `state=selected`, `state=disabled` | `selected`, `disabled` | les états hover, focus, pressed viennent du CSS, jamais d'une propriété |
| `checked=true` | `checked` | |
| `theme=light / dark` | `theme` (Breadcrumb, FloatingToolbar, EditableTitle) ou `surface` (avatars) ; ailleurs l'attribut `data-theme="dark"` sur un parent | |
| `size=sm / md / lg` | `size` | mêmes valeurs ; Avatar `xs` à `3xl` |
| `color` | `color` | mêmes valeurs ; `light-gray` reste `light-gray` |
| `kind`, `format`, `layout`, `step`, `level` | même nom | |
| `count` (variante 2 / 3 / 4 / more) | déduit de la liste passée | AvatarGroup `people`, `max` |
| `hasStep3`… `hasStep9`, `hasSubStep2`… | les enfants passés | StepGroup, ModuleCard |
| propriété texte exposée pour un contenu de démonstration (`capture`, `slot`) | `src`, `children` ou emplacement nommé | StepThumb `src` |

## 4. Écarts propres à un composant

| Composant | Figma | Code |
| --- | --- | --- |
| Button | `color=ai`, `color=rec` | `color="ai"`, `color="rec"` : l'icône est intégrée, `variant` est ignoré |
| Badge | `hasDot`, `hasSecondDot` | `dot`, `secondDot` |
| Input, TextArea | `hasCounter` + `counterText`, `hasHelper` + `helperText` | `counter`, `helper`, `warning` |
| TextArea | `style=brand / neutral` | `tone` |
| GroupTab | `hasCounter` (texte « Compteur ») | `items[].count` |
| ButtonTab | `font=medium / semibold` | `weight` |
| ButtonGroup | `style`, `size`, `count` | `appearance` ; taille et nombre = les boutons passés |
| Breadcrumb | `levels=1 / 2`, `hasBack` (statut retiré le 20/11) | `items`, `onBack`, `titleLabel`, `titleMaxLength` (prop `status` déconseillée, gardée pour Told Record) |
| ContrastBadge | `level`, `result`, `ratio`, `hasRatio`, `hasChevron` | `level`, `ratio` (le résultat est calculé), `showRatio`, `onClick` (chevron) |
| ColorField | `state=fail / corrected / pass` | calculé depuis `value`, `background`, `level` |
| CopyField, CodeBlock | `state=copied` | interne (2 s après le clic) |
| AiTag | `label`, `hasIcon` | `children`, `icon` |
| AiNotice | `state`, `hasAction`, `hasSecondaryAction` | `state`, `actionLabel`, `secondaryLabel` |
| StepThumb | `hasAi`, `capture`, `state=empty`, `state=add` (20/11), bouton ⋯ au survol + `StepThumbMenu` (20/11) | `ai`, `src` (absent = vide), `warning`, `presence`, `menu` ; **à ajouter** : variante d'ajout (`onAdd`) |
| StepGroup | `title`, `expanded`, `hasStepN`, badge « Groupe », vignette « + » en dernier (20/11) | `title`, `defaultExpanded`, enfants, `badge`, `count` |
| StepList | `hasIntro`, `hasEnd` ; en-tête supprimé | `intro`, `end` (v0.12.0) ; `label` et `warning` devenus facultatifs |
| PanelHeader | `hasIcon`, `hasDescription` (20/11), `hasChangeType`, `hasMenu`, `hasBack` | à aligner : `icon`, `description` optionnels |
| OptionItem `type=generic` | `content` (INSTANCE_SWAP) pour poser un réglage dans la ligne ouverte | contenu = `children` |
| ProgressBarWidget | `theme=light / dark` | `ProgressSteps` `theme` (v0.12.0) |
| label tour | propriété `label` (20/11) | pas codé (voir TourStep) |
| EditionNavRecord | `hasSubnav` (20/11, faux en V1 : barre noire seule), Partager seulement dans `step=analyser`, icônes pleines, onglet Langues | `EditorHeader` : à aligner |
| IntentInput | `state=filled / listening`, `hasMic`, `hasControls`, `hasHint` | `value` (rempli), `listening`, `onMic`, `controls`, `hint` |
| ChoicePicker | `kind=ratio / format` | `options` (libellés et illustrations libres) |
| FloatingToolbar | `labels=true / false` | `showLabel` sur chaque `ToolbarItem` |
| ConfirmModal | `hasToldies`, `hasArchive` | `illustration`, `danger` |
| Modal | `hasPrimaryButton`, `hasDangerButton`… | `footer` (les boutons passés) |
| MessageCard | `hasDetail`, `kind=welcome / thanks` | `preview`, `kind` |
| OptionPanelItem | un `type` par réglage Told (format, position…) | **générique** : `icon`, `label`, `value`, `actionLabel`, `open`, contenu libre |

## 5. Points à régler dans Figma

| Constat | Proposition |
| --- | --- |
| ~~PanelSection / OptionPanelItem, StepOptionsPanel / OptionPanel~~ | **Fait le 20/11** : une ligne **OptionItem** (`type=generic` + préréglages Told) et un panneau **OptionSidebar** (variantes par contexte, dont `contentType=record, scope=step`). PanelSection supprimé, StepOptionsPanel devenu une variante d'OptionSidebar |
| **CodeBlock** existe deux fois (page CopyField, validé ; page Diffuser, ancien) | Remplacer les instances de l'ancien par celui de CopyField, puis le supprimer |
| **Toldies** existe deux fois (Icons, Modals) | Garder celui d'Icons |
| **TextEditorControls** existe deux fois (AudioInput, TextArea) | Un seul, axe `position` |
| **Title** existe deux fois (Cards, Widget) | Renommer celui des cartes en `CardTitle` |
| **notificationItem** (Molécules) et **NotificationItem** (Organismes) | Le premier est l'ancien : à archiver |
| **Modal** (type default / danger) à côté de **ModalBase** et **ConfirmModal** | Modal est l'ancien : à archiver |
| **Logo** (Toldies en couleur) à côté de **logoTold2025** | Renommer le premier `ToldiesLogo` |
| Noms avec espace, tiret ou minuscule (Link-survey, Widget-tour, NPS Component, Rating scale - Question, welcome-modale-tour, tour-resume-list, label tour, User story, notificationItem) | Les renommer en PascalCase au fil des validations (LinkSurvey, TourBubble, NpsAnswer, ScaleAnswer, TourWelcome…). Les instances restent liées |
| `EditionNav` (en-tête Told) | Pas codé : à faire après validation, sur le même modèle que `EditorHeader` |

## 6. Told Record : composants maison et leur équivalent

| Dans Told Record | Fichier | Équivalent DS | À faire |
| --- | --- | --- | --- |
| `AiBadge` | editor/copywriter.tsx | `AiTag` | remplacer |
| `CopywriterCard` (attente, retour) | editor/copywriter.tsx | `AiNotice` | remplacer |
| `PanelSection` | editor/fields.tsx | `OptionItem` (générique) | remplacer |
| colonne Étapes (`renderStep`, groupes de slides) | editor/editor.tsx | `StepList`, `StepGroup`, `StepThumb` | remplacer |
| `InterludeThumb` | editor/interlude-editor.tsx | `StepThumb` (`src` = rendu de l'écran) | à voir |
| `ShareButton` + Aperçu | editor/share-panel.tsx | `ButtonGroup` | remplacer |
| `PublicationBadge` | editor/share-panel.tsx | `Badge` avec `dot` | remplacer |
| `RecordButton`, `RecDot` | record-button.tsx, icons-base.tsx | `Button color="rec"` | remplacer |
| `Segmented` | reglages/marque/_kit/fields.tsx | `GroupTab` | remplacer |
| `ColorCard`, `Colors` | reglages/marque/_kit/fields.tsx | `ColorField` (contraste AA / AAA) | remplacer |
| `TextField`, `Label`, `Help` | editor/fields.tsx | `Input`, `TextArea` (label, helper, counter) | remplacer |
| `TemplateCards` (cartes de format de l'accueil) | format-cards.tsx | `ChoicePicker` ou StarterCard (Figma, pas codé) | à dessiner |
| menu déroulant de format de l'en-tête (Démo guidée, Annonce, Animation in-app) | editor/ | ligne « Format » de StepOptionsPanel + **FormatModal** `product=record` (Figma, 20/11) | remplacer après codage |
| sélecteur de zoom (Comme la démo, Sans zoom, Personnalisé) | editor/ | **ZoomSlider** (Figma, 20/11) | remplacer après codage |
| mise en page de l'éditeur (colonnes flottantes) | editor/editor.tsx | **EditorLayout** `product=record` (Figma, 20/11) | remplacer après codage |
| player public, annonce, animation in-app | player/ | GuidedPlayer, **AnnouncementSlide**, InappAnimation, **MediaFrame**, **_SlideHeader**, **AnnouncementBlock** (Figma, 19 et 20/11) | à valider puis coder |
| `EmptyState`, `PageHeader` | components/ui.tsx | EmptyState, PageHeader (Figma, pas codés) | coder dans le DS |
| `Sidebar` | _shell/sidebar.tsx | AppSidebar (Figma, pas codé, entrées Told) | à dessiner pour Record |
| `SectionTitle` | reglages/marque/_kit/fields.tsx | SectionTitle (Figma, pas codé) | coder dans le DS |
| `DemoCard` | demo-cards.tsx | aucun | propre à Record, à dessiner si réutilisé |
| `Toast` (gestionnaire) | components/toast.tsx | `Toast` (affichage) | garder le gestionnaire, afficher avec Toast |
| `ConfirmBar` (floutage) | editor/redaction.tsx | aucun | propre à Record |
| `Canvas`, `CropTool`, `RedactLayer`, `FormatCanvas` | editor/ | aucun (FloatingToolbar pour les outils) | propres à Record |
| `Checkbox`, `Radio`, `Switch`, `NavButtonItem` (ds.ts) | components/ds.ts | les mêmes, enveloppés | garder |

## 7. Ajouts Figma du 19 et 20/11

**Codés en v0.12.0** : SliderCapsule, ChoiceChips (+ _ChoiceChip), CommentCard, CommentPin, CommentComposer, CheckList, CheckRow, EmptyState (illustration en `illustration`), EditorLayout, StepAddThumb (StepThumb `state=add`), OptionItem générique (`variant` row | collapsible | open, `onAction`, `toggle`, `info`). Le reste du tableau n'est pas encore codé.

Ces noms sont réservés : le code les reprendra tels quels (règle 1). Statut dans `claude/V3-avancement-ds.md` du projet.

| Figma | Rôle | Propriétés principales |
| --- | --- | --- |
| EditorLayout | gabarit des écrans d'édition : en-tête puis 3 colonnes collées, canevas à points au centre | `product=told / record` |
| FormatModal, _FormatRow | modale de choix du format (Tour : Standard, Vitrine, Compact, Vidéo, Démo ; Record : Démo guidée, Annonce, Animation in-app) | `product` ; ligne : `state`, `label`, `hasBadge` |
| SliderCapsule | curseur en capsule (zoom, opacité, durée), point de valeur par défaut | `state=empty / partial / full / range`, `label`, `value`, `hasDefault` → code `value`, `defaultValue`, `format`, `rangeEnd` |
| ChoiceChips, _ChoiceChip | choix compact en pastilles (thème, apparition, type d'écran, avatar) | `lead=none / icon / color / thumb / avatar / glyph`, `state` → code `options[]` (`icon`, `color`, `thumb`, `avatar`, `glyph`, `onListen`) |
| AvatarPicker, _AvatarOption | choix de l'avatar Record (photo, nom, voix, Écouter) | `state`, `name`, `voice` (pas encore codé) |
| EndButtonSettings, KeyPointsField, _Record*Options | contenus d'options Record | à composer dans Record avec les composants du DS |
| EmptyIllustration | illustrations des états vides (style Koovea, écrans de Told) | `context`, `tone` (à exporter en SVG) |
| StepThumbMenu | menu ⋯ d'une vignette (Monter, Descendre, Nouvelle slide, Ajouter un écran, Supprimer) | aucune |
| OptionSidebar `contentType=record` | panneau d'options d'une étape Record (ex-StepOptionsPanel) | `contentType`, `scope`, `hasIA` |
| AnnouncementSlide | annonce vue du public, modèle étape de tour | `orientation=landscape / vertical`, `hasHeader`, `hasEyebrow`, `hasText`, `hasList`, `hasHighlight`, `hasCta`, `hasNav`, `hasLogo` |
| _SlideHeader | en-tête de lecture au-dessus de l'annonce (absent de la vidéo exportée) | `theme`, `counter`, `hasCounter`, `hasPlay`, `hasClose` |
| MediaFrame | média au format standard avec cadre d'appareil | `ratio=16:9 / 9:16`, `frame=none / browser / laptop / phone` |
| AnnouncementBlock | blocs de contenu d'une annonce | `type=list / highlight`, `tone=glass / yellow / violet` |
| GuidedPlayer, InappAnimation, _PlayerBar, _PlayerTooltip, _ClickPoint, _CaptureMock | démo guidée et animation in-app vues du public | voir Figma |
| CommentCard, _CommentPin, CommentComposer | commentaires de relecture | `state=open / hover / resolved` |
| CheckList, CheckRow | liste « Avant de publier » | `hasAction` |
| OptionItem `type=generic` | ligne d'option générique (ex-PanelSection) | `state`, `label`, `hasValue`, `hasInfo`, `hasAction`, `hasToggle`, `hasChevron`, `content` |

Nouveau jeton : `Neutral/border/divider` (gray/40 en clair) pour les séparations de grandes zones. Modifiés le 20/11 : `Neutral/surface/canvas` (gray/10) et `Neutral/surface/pattern` (gray/40), trame DotGrid tous les 8.

## 8. Pour une IA (Claude Code ou autre)

- Avant de créer un composant : chercher son nom **et** son rôle dans ce fichier, dans `src/index.ts` du DS et dans le catalogue Storybook.
- Dans Told Record, tout import du DS passe par `src/components/ds.ts`. Un composant DS absent de ce fichier n'est pas encore branché : l'y ajouter, ne pas le recoder.
- Un écart de nom ou de propriété découvert en cours de route s'ajoute ici, dans la même pull request.
- Dans Told Record, un besoin qui manque au DS se demande dans `claude/V3-demandes-ds-record.md` du projet, pas en recodant le composant.
