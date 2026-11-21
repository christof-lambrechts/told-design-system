# Demandes de Told Record au design system

Le lien entre Told Record (dépôt `jscanzi/toldrecord`) et le design system. Il remplace le document de projet `claude/V3-demandes-ds-record.md` depuis le 20/11/2026 : les deux conversations lisent et écrivent ici, sans copier-coller.

## Qui écrit quoi

| | Told Record | Design system |
| --- | --- | --- |
| Ajouter une demande | ✅ par pull request sur ce fichier | — |
| Date, écran, Besoin, Ce qui manque, Contournement, Priorité | ✅ | ne pas modifier |
| Statut, Réponse DS | — | ✅ commité sur `main` avec la version |
| Réponse Record (reprise faite dans Record) | ✅ par pull request | ne pas modifier |
| Déplacer dans « Fait côté DS » | — | ✅ |

- Numéro unique : toujours le suivant du plus haut numéro du fichier (D-0XX), sections comprises.
- Statut : `à faire`, `en cours`, `codé told-ds vX.Y.Z`, `refusé` (avec la raison dans la Réponse DS).
- Told Record ne touche à rien d'autre dans ce dépôt : ni code, ni jetons, ni Figma.

## Modèle

```
### D-0XX · Titre court
- Date, écran Record concerné (fichier, route) :
- Besoin (ce que l'écran doit faire) :
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) :
- Contournement provisoire dans Record :
- Priorité : bloquant | important | confort
- Statut : à faire
- Réponse DS :
- Réponse Record :
```

## Demandes ouvertes

> À reprendre une fois depuis le document de projet : les demandes encore ouvertes (D-001, D-011, D-012, et toute autre) avec leurs réponses.

### D-014 · OptionItem et ChoiceChips : présence, conflit, désactivé (traitée par le DS sous le numéro D-021, v0.14.0)
- Date, écran Record concerné (fichier, route) : 20/11/2026, panneau de droite de l'éditeur, `src/app/(app)/[org]/demos/[id]/editor/fields.tsx` (PanelSection), `theme-field.tsx`, `entrance-field.tsx`, `interlude-editor.tsx` ; route `/[org]/demos/[id]`.
- Besoin (ce que l'écran doit faire) : l'éditeur est collaboratif. Une section dont un collègue tient un réglage affiche « Léa modifie ce réglage » (texte bleu et point), une section en conflit affiche un point orange, et en lecture seule ou quand un collègue tient le réglage, l'interrupteur et les pastilles sont désactivés.
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) :
  - OptionItem n'a ni état de présence (`holder`), ni état de conflit (`conflict`), ni `toggle.disabled`.
  - Son titre n'est pas un titre de section (h3) : les lecteurs d'écran ne peuvent plus sauter de section en section.
  - Pas d'`id` sur le libellé, que les champs de la section utilisent pour se nommer (`aria-labelledby`).
  - Le chevron d'une ligne `collapsible` est hors du bouton et sans clic : cliqué, il ne replie rien.
  - L'aide `info` est un `<span title>` non focalisable : inaccessible au clavier, souvent muette pour un lecteur d'écran.
  - ChoiceChips n'a pas de `disabled`, ni par option ni pour le groupe, ni d'aide par option (`title`) : l'Apparition perd « Différente du reste de la démo ».
- Contournement provisoire dans Record :
  - le nom du collègue dans le badge de valeur, le point de conflit et un `<span id>` dans `label` ;
  - `<fieldset disabled>` autour de l'OptionItem à interrupteur et autour des ChoiceChips.
- Priorité : important
- Statut : à faire
- Réponse DS :
- Réponse Record :

### D-019 · AvatarPicker : coder le composant
- Date, écran Record concerné (fichier, route) : 20/11/2026, panneau de l'Annonce, section Avatar, `src/app/(app)/[org]/demos/[id]/editor/presenter.tsx` (AvatarPicker).
- Besoin (ce que l'écran doit faire) : choisir l'avatar et écouter sa voix. Le bouton passe de « Écouter » à « Chargement… » puis à « Arrêter », et devient « Voix indisponible » si l'extrait échoue. Sans photo, l'avatar montre son initiale. Aucun avatar n'est coché tant que rien n'est choisi. « Changer » met le focus sur l'avatar choisi.
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) : AvatarPicker et _AvatarOption sont dessinés dans Figma (20/11, `state`, `name`, `voice`) mais pas codés. ChoiceChips avec `avatar` + `onListen` ne suffit pas : pas d'état de lecture ni d'échec, pas d'initiale de remplacement, pas de focus de l'option choisie. Le nom Record est déjà AvatarPicker : on reprendra celui du DS tel quel.
- Contournement provisoire dans Record : AvatarPicker reste dans l'app (lignes avec photo, nom, bouton Écouter et Radio du DS).
- Priorité : confort
- Statut : à faire
- Réponse DS :
- Réponse Record :

### D-016 · Button et ButtonIcon en lien : target, rel et attributs
- Date, écran Record concerné (fichier, route) : 20/11/2026, liens vers le Chrome Web Store (`extension-dialog.tsx`, `record-button.tsx`, `connect-extension.tsx`) ; `src/components/ui-classes.ts` (`buttonClass`).
- Besoin (ce que l'écran doit faire) : un bouton qui ouvre une page dans un nouvel onglet (`target="_blank"`, `rel="noreferrer"`).
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) : avec `href`, Button ne transmet que `onClick`, `title`, `id` et `aria-label` ; `target`, `rel`, `download` et les `data-*` sont perdus. Proposition : transmettre tous les attributs d'ancre.
- Contournement provisoire dans Record : ces 3 liens gardent la classe `ui-btn` (`buttonClass`).
- Priorité : confort
- Statut : à faire
- Réponse DS :
- Réponse Record :

### D-017 · DropdownMenu pour un menu d'actions
- Date, écran Record concerné (fichier, route) : 20/11/2026, menus « ⋯ » de l'éditeur et des vignettes d'étape (`editor.tsx`), menus du kit de marque (`kits.tsx`) ; `ui-classes.ts` (`menuClass`, `menuItemClass`).
- Besoin (ce que l'écran doit faire) : un menu d'actions (Copier le lien, Exporter en vidéo dans un nouvel onglet, Supprimer) au clavier et pour les lecteurs d'écran : `role="menu"` et des entrées `menuitem`, une entrée désactivée avec sa raison (title).
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) :
  - DropdownMenu est un `listbox` et ses entrées-boutons des `option` (`aria-selected`) : c'est la sémantique d'une liste de choix, pas d'un menu.
  - Les entrées-liens sont des `menuitem`, d'où un mélange dans le même composant.
  - Les liens perdent `target`, `rel` et `title`.
  - Proposition : `DropdownMenu role="menu"` (ou une prop `kind="menu" | "listbox"`), avec des entrées `menuitem` et des attributs d'ancre transmis.
- Contournement provisoire dans Record : classes `ui-menu` / `ui-menu-item` sur les jetons de DropdownMenu. Le menu ⋯ d'une vignette correspond à StepThumbMenu (Figma, 20/11, pas codé) : à coder sur ce DropdownMenu corrigé.
- Priorité : confort
- Statut : à faire
- Réponse DS :
- Réponse Record :

### D-018 · SliderCapsule : clic sur la piste et repère au clavier
- Date, écran Record concerné (fichier, route) : 20/11/2026, panneau de l'éditeur, zoom de l'étape et zoom par défaut, `src/app/(app)/[org]/demos/[id]/editor/panels.tsx`.
- Besoin (ce que l'écran doit faire) : un clic sur la piste place la valeur (comme le curseur natif d'avant), et « Revenir à × 1,6 » est joignable au clavier, avec une cible assez grande.
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) : l'`<input type="range">` est en `pointer-events: none` hors de la poignée, donc seul le glisser marche ; le repère de valeur par défaut a `tabIndex={-1}` et fait 4 px.
- Contournement provisoire dans Record : aucun (le clavier et le glisser fonctionnent) ; la valeur par défaut reste aussi accessible par la liste « Comme la démo ».
- Priorité : confort
- Statut : à faire
- Réponse DS :
- Réponse Record :

### D-020 · StepThumb et StepGroup : glisser-déposer, sélection multiple, clavier, intertitre
- Date, écran Record concerné (fichier, route) : 20/11/2026, colonne Étapes de l'éditeur, `src/app/(app)/[org]/demos/[id]/editor/editor.tsx` (`renderStep`, slides) ; route `/[org]/demos/[id]`.
- Besoin (ce que l'écran doit faire) : réordonner les étapes en les glissant (avec la ligne d'insertion), en sélectionner plusieurs (⌘ ou Maj + clic) pour les supprimer d'un coup, les déplacer au clavier (Alt + ↑ / ↓) et les supprimer (Suppr), montrer qui est sur l'étape, et afficher la vignette d'un intertitre (fond et texte du kit, pas une capture). La section « Fin » montre l'écran de fin en MessageCard `thanks`.
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) :
  - StepThumb est un `button` qui ne transmet ni `draggable` ni les événements de glisser, ni `onKeyDown`, ni `data-*` ;
  - pas d'état « sélection multiple » distinct de `selected` ;
  - le contenu n'accepte qu'une image (`src`) : pas de place pour la vignette d'un intertitre (`children` ou `preview`) ;
  - StepGroup n'a pas de place pour les « + » d'insertion entre deux slides ni d'état replié contrôlé.
- Contournement provisoire dans Record : vignettes, slides et carte de fin restent dans l'app (cadre sans liseré blanc, d'où l'écart visible avec Figma).
- Priorité : important
- Statut : à faire
- Réponse DS :
- Réponse Record :

### D-022 · AvatarGroup : personne inactive et couleur stable
- Date, écran Record concerné (fichier, route) : 21/11/2026, en-tête de l'éditeur, présence, `src/app/(app)/[org]/demos/[id]/editor/editor.tsx` (Header) ; route `/[org]/demos/[id]`.
- Besoin (ce que l'écran doit faire) : montrer qui est sur la démo ; une personne inactive (onglet en arrière-plan) est grisée ; au-delà de 4, « +n » ; chaque personne garde la même couleur partout (en-tête, vignettes, champs verrouillés).
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) : AvatarGroup n'a pas d'état inactif par personne (`idle`), et `people` n'accepte pas d'identifiant pour `presenceColorFor` (la couleur dépend de l'ordre ou doit être calculée à part). Le libellé du groupe (« 3 personnes sur cette démo ») n'est pas réglable.
- Contournement provisoire dans Record : PresenceAvatar du DS côte à côte, opacité 50 % pour une personne inactive, « +n » maison.
- Priorité : confort
- Statut : à faire
- Réponse DS :
- Réponse Record : repris le 21/11/2026 (DS v0.21.3) : AvatarGroup avec `id` et `idle`, contournement retiré.

### D-023 · EditorHeaderRecord : bouton menu au logo mini
- Date, écran Record concerné (fichier, route) : 21/11/2026, en-tête de l'éditeur (`start`), même fichier.
- Besoin (ce que l'écran doit faire) : le bouton à gauche de la maquette EditorHeaderRecord (8749:4650), logo mini et flèche, avant le fil d'Ariane.
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) : le bouton n'existe pas dans le code, et ce qu'il ouvre n'est pas décrit (retour à la liste ? menu de l'organisation ?). Merci de préciser son contenu dans Figma.
- Contournement provisoire dans Record : la flèche « Retour » du Breadcrumb (`onBack`) vers le projet.
- Priorité : confort
- Statut : à faire
- Réponse DS :
- Réponse Record : repris le 21/11/2026 (DS v0.21.3) : ButtonEditionMenu ouvre un DropdownMenu « Retour au projet », « Tous les projets » ; la flèche du Breadcrumb est retirée.

### D-024 · EditorHeaderRecord : navigation Construire › Diffuser › Analyser
- Date, écran Record concerné (fichier, route) : 21/11/2026, en-tête de l'éditeur (`center`).
- Besoin (ce que l'écran doit faire) : les trois étapes au centre de la barre noire, l'étape courante en surbrillance, un point vert ou rouge sur Diffuser (publiée ou non), Analyser grisé tant que la démo n'est pas publiée.
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) : pas de composant d'onglets sombres avec icône, chevrons et point d'état (ButtonTab est clair). Côté Record, Diffuser et Analyser ne sont pas encore des écrans : rien à brancher en V1.
- Contournement provisoire dans Record : `center` vide ; la diffusion reste le panneau Publier / Partager.
- Priorité : confort
- Statut : à faire
- Réponse DS :
- Réponse Record : repris le 21/11/2026 (DS v0.21.3) : EditorSteps branché ; Diffuser est une page (ancien panneau Partager), Analyser un EmptyState en attendant les statistiques.

### D-025 · Carte de démo de la liste, avec son menu
- Date, écran Record concerné (fichier, route) : 21/11/2026, page projet, `src/app/(app)/[org]/demo-cards.tsx` et `demo-list-client.tsx` (DemoCardMenu) ; route `/[org]/projets/[project]`.
- Besoin (ce que l'écran doit faire) : la carte d'une démo (vignette, titre, auteur, date, nombre d'étapes, statut) et, pour qui peut la supprimer, un menu « ⋯ » sur la vignette avec « Supprimer la démo » (ConfirmModal danger). La carte entière est un lien ; le menu est un bouton à côté, pas dedans.
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) : pas de carte de démo de liste (la page Cards est ❌ dans Figma, voir D-011) ni d'emplacement prévu pour un menu sur une carte-lien.
- Contournement provisoire dans Record : carte maison (`cardClass`), menu fait de ButtonIcon, DropdownMenu `kind="menu"` et ConfirmModal du DS, posé en haut à droite de la vignette.
- Priorité : confort
- Statut : à faire
- Réponse DS :
- Réponse Record :

### D-026 · OptionItem : ligne « Sélectionner » qui s'ouvre comme un accordéon
- Date, écran Record concerné (fichier, route) : 21/11/2026, panneau Options de l'éditeur, ligne Format, `src/app/(app)/[org]/demos/[id]/editor/format-popover.tsx` (FormatOption) ; maquette 9020:101470.
- Besoin (ce que l'écran doit faire) : la ligne « Format · Annonce · Sélectionner » ouvre les choix (vignettes des trois formats, orientation pour l'Annonce) juste dessous ; l'action devient « Fermer » ; la ligne et ses choix forment un seul bloc, sans filet entre eux.
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) : `variant="row"` n'a pas de contenu, `variant="collapsible"` n'a pas de lien d'action ; il manque une ligne à action qui contrôle un contenu (`open` + `onAction` + `children`), avec `aria-expanded` sur l'action.
- Contournement provisoire dans Record : OptionItem `row` suivi des choix dans un bloc à part, filet bas de la ligne masqué quand c'est ouvert.
- Priorité : confort
- Statut : à faire
- Réponse DS :
- Réponse Record :

### D-027 · OptionSidebar : pas de filet sous l'en-tête
- Date, écran Record concerné (fichier, route) : 21/11/2026, panneau Options de l'éditeur, `src/app/(app)/[org]/demos/[id]/editor/editor.tsx` ; maquette 9020:101470.
- Besoin (ce que l'écran doit faire) : sous le titre « Options », la première option suit directement, sans filet (comme dans la maquette).
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) : `.options` d'OptionSidebar a un `border-top` que la maquette n'a pas. Soit le retirer, soit une propriété pour le masquer.
- Contournement provisoire dans Record : filet retiré par une règle `!important` autour d'OptionSidebar (le CSS du DS est hors couche et l'emporte sur Tailwind).
- Priorité : confort
- Statut : à faire
- Réponse DS :
- Réponse Record :

### D-028 · ToolbarItem : icône en contour quand l'outil n'est pas actif
- Date, écran Record concerné (fichier, route) : 21/11/2026, barre sous la capture dans l'éditeur (Flouter, Recadrer, Réenregistrer, Importer une image, Revenir), `src/app/(app)/[org]/demos/[id]/editor/capture-actions.tsx`.
- Besoin (ce que l'écran doit faire) : icône en contour au repos, pleine seulement quand l'outil est actif (demande de Christof).
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) : le commentaire de `ToolbarItem` annonce « icône en contour, pleine quand l'outil est actif », mais le code pose toujours `variant="solid"`. Attendu : `variant={active ? 'solid' : 'stroke'}`.
- Contournement provisoire dans Record : l'icône du DS est masquée et une `Icon variant="stroke"` est posée par-dessus, aux couleurs de l'item.
- Priorité : confort
- Statut : à faire
- Réponse DS :
- Réponse Record :

### D-029 · OptionItem : le « i » (`info`) avec la bulle Tooltip
- Date, écran Record concerné (fichier, route) : 21/11/2026, ligne Format du panneau Options, `src/app/(app)/[org]/demos/[id]/editor/format-popover.tsx`.
- Besoin (ce que l'écran doit faire) : au survol et au focus du « i », l'explication s'affiche dans la bulle Tooltip du DS (« Le contenu est gardé : tu peux revenir à un autre format à tout moment. »).
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) : `info` ne pose qu'un `title` natif (lent, parfois absent, invisible au clavier) avec un curseur « ? ». Attendu : le Tooltip du DS sur survol et focus, relié par `aria-describedby`.
- Contournement provisoire dans Record : `title` retiré du bouton du DS, Tooltip du DS posé à côté et affiché au survol et au focus.
- Priorité : confort
- Statut : à faire
- Réponse DS :
- Réponse Record :

### D-030 · ChoiceChips : marges égales sans élément de tête
- Date, écran Record concerné (fichier, route) : 21/11/2026, ligne Apparition du panneau Options, `src/app/(app)/[org]/demos/[id]/editor/entrance-field.tsx`.
- Besoin (ce que l'écran doit faire) : une puce avec un libellé seul (sans icône, couleur, vignette ni glyphe) a le texte centré, autant d'espace à gauche qu'à droite.
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) : `.hit` a `padding: 4px 10px 4px 6px` dans tous les cas ; sans élément de tête, le texte est collé à gauche. Attendu : 10 px à gauche quand il n'y a pas d'élément de tête.
- Règle à généraliser (demande de Christof) : tout composant dont l'élément de tête est facultatif (icône, glyphe, pastille, vignette, avatar) garde un texte bien placé sans lui. Le padding réduit côté tête ne s'applique que quand la tête est là ; sans tête, le padding est le même des deux côtés. À vérifier sur les autres composants concernés (puces, tags, badges, boutons, items de menu), pour ne pas retrouver le problème ailleurs.
- Contournement provisoire dans Record : 4 px de marge à gauche du libellé.
- Priorité : confort
- Statut : à faire
- Réponse DS :
- Réponse Record :

### D-031 · Diffuser Record : bandeau d'état et cartes de section
- Date, écran Record concerné (fichier, route) : 21/11/2026, étape Diffuser de l'éditeur, `src/app/(app)/[org]/demos/[id]/editor/share-panel.tsx` (PublishStep) ; route `/[org]/demos/[id]?etape=diffuser`.
- Besoin (ce que l'écran doit faire) : une page centrée (640 px) à la place du canevas, qui empile : l'état de la démo (Brouillon, En pause, En ligne, avec qui l'a publiée et quand), les vérifications avant publication, le lien public, le code d'intégration, les options de lecture, l'export MP4 et le lien de la page.
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) : la page « Organismes / Diffuser » de Figma (StatusBanner, ChannelCard) n'est ni validée ni codée, et elle est pensée pour les canaux de Told (web, mobile, e-mail). Il manque pour Record : un StatusBanner à trois états (brouillon, en pause, en ligne) et une carte de section (titre, contenu, sans réglage de canal). CheckList, CheckRow, CopyField, CodeBlock et Banner sont déjà repris.
- Contournement provisoire dans Record : cartes maison (bordure, rayon 12, fond surface) et une ligne d'état avec un point vert ou rouge.
- Priorité : important
- Statut : à faire
- Réponse DS :
- Réponse Record :

### D-032 · CopyField et CodeBlock : « Copié » seulement si la copie a réussi
- Date, écran Record concerné (fichier, route) : 21/11/2026, étape Diffuser, `src/app/(app)/[org]/demos/[id]/editor/share-panel.tsx` (lien public, code d'intégration).
- Besoin (ce que l'écran doit faire) : quand le navigateur refuse le presse-papiers, le bouton ne dit pas « Copié » ; il reste « Copier » (ou dit « Copie impossible ») pour qu'on ne colle pas un ancien lien.
- Ce qui manque ou gêne dans le DS (composant, propriété, état, jeton) : `useCopy` passe à « Copié » sans vérifier le résultat de `navigator.clipboard.writeText`. Remarque de la relecture sécurité de Record.
- Contournement provisoire dans Record : aucun.
- Priorité : important
- Statut : à faire
- Réponse DS :
- Réponse Record :

## Fait côté DS

> À reprendre une fois depuis le document de projet : D-002 à D-010, D-013, D-015 et les autres demandes déjà codées, avec leurs réponses.

Réponses Record à ajouter sous ces demandes à la reprise :

- **D-002 EditorHeader** : repris (v0.12.1, branche christof).
- **D-003 Breadcrumb** : repris ; `titleLabel`, `titleMaxLength={140}`, `status` gardé.
- **D-004 Checkbox, Radio, Switch** : repris.
- **D-005 NavButtonItem** : repris.
- **D-006 Button en lien** : repris en partie ; les liens qui ouvrent un nouvel onglet attendent D-016.
- **D-007 DropdownMenu** : pas repris ; voir D-017.
- **D-008 ChoiceChips** : repris (Thème, Apparition, Type d'écran) ; l'avatar attend D-019.
- **D-009 OptionItem / OptionSidebar** : repris dans tout le panneau ; manques en D-014.
- **D-010 SliderCapsule** : repris pour le zoom ; manques en D-018.
- **D-013 EmptyState** : repris (liste de démos vide).
- **D-015 Annonce du lecteur public** : fait le 20/11/2026 sur la branche christof (commits 0721bb5 et dff9349), DS en v0.13.2. Sans Précédent / Suivant ; carte arrondie ; textes plus petits (titre 700, texte 300) ; fond du kit inchangé. Progression « En haut » (bandeau de 48 px, lecteur seulement) ou « En bas » (à droite du logo, vidéo comprise), dans Partager › Options. Avatar en trois formes (Rond = roundy, Arrondi = default, Carré = sharp) avec les jetons `--component-record-avatar-*`, valeurs du DS en secours car le lecteur ne charge pas le DS.
