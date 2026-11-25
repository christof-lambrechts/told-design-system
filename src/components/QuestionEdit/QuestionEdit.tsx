import { useId, type ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import { Input, TextArea } from '../Input/Input';
import { Button, ButtonIcon } from '../Button/Button';
import { Divider } from '../Divider/Divider';
import styles from './QuestionEdit.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

/* ---------- États communs des blocs (survol, sélection, déplacement) ---------- */
export interface BlockStateProps {
  /** Bloc sélectionné : contour Brand/border/selected de 2 à l'intérieur (la colonne de droite montre ses réglages). */
  selected?: boolean;
  /** Bloc soulevé pendant le déplacement (fond, contour de marque, ombre). */
  dragging?: boolean;
  /** Clic sur le bloc : le sélectionner. */
  onSelect?: () => void;
}

/* ---------- ContentBlock (8316:8017) ---------- */
export interface ContentBlockProps {
  /** title : champ Titre (la question ou le titre du message), obligatoire. description : zone de texte, optionnelle. */
  type?: 'title' | 'description';
  value: string;
  onChange: (value: string) => void;
  /** Libellé du champ Titre (« Question » par défaut ; « Titre » pour un message). */
  label?: ReactNode;
  placeholder?: string;
  /** Erreur (titre vide à la publication, par exemple). */
  error?: ReactNode;
}

/** ContentBlock : bloc Titre ou Description commun à tous les presets. Marges 16 / 20. */
export function ContentBlock({ type = 'title', value, onChange, label, placeholder, error }: ContentBlockProps) {
  return (
    <div className={cx(styles.block, type === 'description' && styles.blockDescription)}>
      {type === 'title' ? (
        <Input label={label ?? 'Question'} placeholder={placeholder ?? 'Écrivez une question ou un titre ici…'} value={value} error={error} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <TextArea aria-label="Description" placeholder={placeholder ?? 'Ajoutez une description (optionnel)'} rows={2} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

/* ---------- ConsentPreview + ConsentBlock (8162:106149) ---------- */
/** ConsentPreview : aperçu schématique du consentement vu par le visiteur (fond inverse, titre, message, refuser / accepter). */
export function ConsentPreview({ title = 'Confidentialité' }: { title?: string }) {
  return (
    <div className={styles.consentPreview} aria-hidden="true">
      <div className={styles.cpBody}>
        <span className={styles.cpTitle}><Icon name="circle-lock-02" size={14} />{title}</span>
        <span className={styles.cpMessage} />
      </div>
      <div className={styles.cpChoices}>
        <span><Icon name="cancel-01" size={16} /></span>
        <span><Icon name="tick-02" size={16} /></span>
      </div>
    </div>
  );
}

export interface ConsentBlockProps {
  policyUrl: string;
  onPolicyUrlChange: (url: string) => void;
  title?: ReactNode;
  description?: ReactNode;
  note?: ReactNode;
}

/** ConsentBlock : bloc Consentement d'une question (affiché dans Preset quand l'option Consentement est active). */
export function ConsentBlock({ policyUrl, onPolicyUrlChange, title = 'Confidentialité', description = 'Demandez à votre public son consentement pour partager ses coordonnées avec vous.', note = 'Demander le consentement est obligatoire. Partagez une politique de données claire pour que votre public se sente en confiance.' }: ConsentBlockProps) {
  return (
    <div className={cx(styles.block, styles.consent)}>
      <div className={styles.titles}>
        <span className={styles.title}>{title}</span>
        <span className={styles.muted}>{description}</span>
      </div>
      <ConsentPreview />
      <Input label="Lien de la politique de données" placeholder="Collez un lien vers votre politique de données" iconLeft="link-03" value={policyUrl} onChange={(e) => onPolicyUrlChange(e.target.value)} />
      <p className={styles.note}><Icon name="information-circle" size={14} />{note}</p>
    </div>
  );
}

/* ---------- InputLink ---------- */
export interface InputLinkProps {
  label: string;
  url: string;
  onChange: (next: { label: string; url: string }) => void;
  onRemove?: () => void;
  /** Numéro affiché dans les libellés (« Bouton 2 »). */
  index?: number;
}

/** InputLink : un bouton lien (texte du bouton + adresse), dans SecondaryBlock type="button". */
export function InputLink({ label, url, onChange, onRemove, index = 1 }: InputLinkProps) {
  return (
    <div className={styles.inputLink}>
      <div className={styles.inputLinkHead}>
        <span className={styles.title}>Bouton {index}</span>
        {onRemove && <ButtonIcon icon="delete-02" label={`Supprimer le bouton ${index}`} appearance="ghost" size="xs" onClick={onRemove} />}
      </div>
      <Input aria-label={`Texte du bouton ${index}`} placeholder="Texte du bouton" value={label} onChange={(e) => onChange({ label: e.target.value, url })} />
      <Input aria-label={`Lien du bouton ${index}`} placeholder="https://" iconLeft="link-03" value={url} onChange={(e) => onChange({ label, url: e.target.value })} />
    </div>
  );
}

/* ---------- SecondaryBlock (8159:36893) ---------- */
export type SecondaryBlockType = 'image' | 'text' | 'video' | 'button' | 'divider';
const SECONDARY: Record<SecondaryBlockType, { icon?: IconName; label: string }> = {
  image: { icon: 'image-03', label: 'Image' },
  text: { icon: 'text', label: 'Texte' },
  video: { icon: 'play', label: 'Vidéo' },
  button: { icon: 'link-03', label: 'Bouton lien' },
  divider: { label: 'Séparateur' },
};

export interface SecondaryBlockProps extends BlockStateProps {
  type: SecondaryBlockType;
  /** Contenu du bloc. Par défaut : zone de dépôt (image), zone de texte (texte), lien (vidéo), trait (séparateur). Pour button : la liste d'InputLink. */
  children?: ReactNode;
  /** Poignée « Déplacer » (visible au survol et au focus). */
  dragHandleProps?: Record<string, unknown>;
  onDelete?: () => void;
  /** type=button : « Ajouter un bouton » (jusqu'à 3). */
  onAddLink?: () => void;
  /** type=button, un seul bouton : il remplace « Suivant » dans le pied du widget (hasReplaceNextHint). */
  replacesNext?: boolean;
  /** type=button : lien « Régler dans Logique » (hasLogicLink). */
  onOpenLogic?: () => void;
}

/** SecondaryBlock : bloc complémentaire d'une étape (image, texte, vidéo, boutons liens, séparateur). Poignée et suppression au survol. */
export function SecondaryBlock({ type, children, selected, dragging, onSelect, dragHandleProps, onDelete, onAddLink, replacesNext, onOpenLogic }: SecondaryBlockProps) {
  const meta = SECONDARY[type];
  const fileId = useId();
  let body = children;
  if (body === undefined) {
    if (type === 'image') body = (
      <label className={styles.drop} htmlFor={fileId}>
        <Icon name="image-03" size={18} />
        <span className={styles.dropTitle}>Ajouter une image</span>
        <span className={styles.muted}>Glisser-déposer ou parcourir · JPG, PNG, GIF</span>
        <input id={fileId} type="file" accept="image/png,image/jpeg,image/gif" className={styles.srOnly} />
      </label>
    );
    if (type === 'text') body = <TextArea aria-label="Texte" placeholder="Écrivez votre texte…" rows={2} />;
    if (type === 'video') body = <Input label="Lien de la vidéo" placeholder="YouTube, Vimeo, Loom…" iconLeft="link-03" />;
    if (type === 'divider') body = <Divider />;
  }
  return (
    <section className={cx(styles.block, styles.secondary, selected && styles.selected, dragging && styles.dragging)} onClick={onSelect} aria-label={meta.label}>
      <header className={styles.blockHead}>
        <span className={styles.handle} {...dragHandleProps}><ButtonIcon icon="drag-drop-vertical" label={`Déplacer le bloc ${meta.label}`} appearance="ghost" size="xs" /></span>
        {meta.icon && <Icon name={meta.icon} size={14} />}
        <span className={styles.blockLabel}>{meta.label}</span>
        {onDelete && <span className={styles.hoverOnly}><ButtonIcon icon="delete-02" label={`Supprimer le bloc ${meta.label}`} appearance="ghost" size="xs" onClick={(e) => { e.stopPropagation(); onDelete(); }} /></span>}
      </header>
      {type === 'button' ? (
        <>
          <p className={styles.muted}>Ajoutez un ou plusieurs boutons pour rediriger l’utilisateur vers une page utile, votre site web ou tout autre lien.</p>
          <div className={styles.links}>
            {body}
            {replacesNext && <p className={styles.hint}><Icon name="information-circle" size={14} />Un seul bouton remplace « Suivant » dans le pied du widget.</p>}
            {onAddLink && <div><Button variant="primary-outline" size="sm" iconLeft="add-01" onClick={onAddLink}>Ajouter un bouton</Button></div>}
            {onOpenLogic && <p className={styles.hint}><Icon name="git-fork" size={14} />Un lien différent selon la réponse ?<button type="button" className={styles.linkBtn} onClick={onOpenLogic}>Régler dans Logique</button></p>}
          </div>
        </>
      ) : body}
    </section>
  );
}

/* ---------- Preset (8156:14320) ---------- */
export type PresetType = 'nps' | 'scale' | 'multiple-choice' | 'dropdown' | 'open' | 'contact' | 'calendar' | 'ranking' | 'review' | 'ai-agent' | 'message' | 'quiz';

export interface PresetProps extends BlockStateProps {
  type: PresetType;
  title: string;
  onTitleChange: (v: string) => void;
  /** Libellé du champ titre (« Question », ou « Titre » pour un message). */
  titleLabel?: ReactNode;
  titleError?: ReactNode;
  /** Description (hasDescription) : affichée si définie. */
  description?: string;
  onDescriptionChange?: (v: string) => void;
  /** Bloc du type : NPSQuestionEdition, QuestionScaleItem, DropdownEdit… */
  children?: ReactNode;
  /** Bloc consentement (hasConsent) : ConsentBlock. */
  consent?: ReactNode;
  dragHandleProps?: Record<string, unknown>;
}

/**
 * Preset : une étape faite de blocs séparés, chacun avec ses options dans la colonne de droite.
 * Titre (obligatoire) + Description (option) + bloc du type + Consentement (option).
 * Posé dans StepEditCard ; les blocs complémentaires sont des SecondaryBlock.
 */
export function Preset({ type, title, onTitleChange, titleLabel, titleError, description, onDescriptionChange, children, consent, selected, dragging, onSelect, dragHandleProps }: PresetProps) {
  return (
    <section data-preset={type} className={cx(styles.preset, selected && styles.selected, dragging && styles.dragging)} onClick={onSelect}>
      <span className={cx(styles.handle, styles.presetHandle)} {...dragHandleProps}><ButtonIcon icon="drag-drop-vertical" label="Déplacer la question" appearance="ghost" size="xs" /></span>
      <ContentBlock type="title" label={titleLabel ?? (type === 'message' ? 'Titre' : 'Question')} value={title} onChange={onTitleChange} error={titleError} />
      {description !== undefined && <ContentBlock type="description" value={description} onChange={onDescriptionChange ?? (() => {})} />}
      {children}
      {consent}
    </section>
  );
}
