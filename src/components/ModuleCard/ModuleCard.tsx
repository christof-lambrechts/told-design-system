import type { ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import { IconBoxed, type IconBoxedColor } from '../IconBoxed/IconBoxed';
import styles from './ModuleCard.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export interface SubStepItemProps {
  label: ReactNode;
  typeIcon?: IconName;
  typeColor?: IconBoxedColor;
  selected?: boolean;
  /** Pastille « traduction manquante » (propriété Figma `hasMissingTranslation`). */
  missingTranslation?: boolean;
  /** Icône de condition (propriété Figma `hasCondition`). */
  condition?: boolean;
  onClick?: () => void;
}

/** SubStepItem (8044:2542) : sous-étape d'un module, 32 de haut. */
export function SubStepItem({ label, typeIcon = 'message-01', typeColor = 'brand', selected, missingTranslation, condition, onClick }: SubStepItemProps) {
  return (
    <button type="button" className={cx(styles.sub, selected && styles.subSelected)} onClick={onClick} aria-current={selected || undefined}>
      <IconBoxed icon={typeIcon} color={typeColor} />
      <span className={styles.subLabel}>{label}</span>
      {condition && <Icon name="git-fork" size={14} className={styles.meta} />}
      {missingTranslation && <span className={styles.warnDot} title="Traduction manquante" />}
    </button>
  );
}

export interface ModuleCardProps {
  title: ReactNode;
  /** Format d'affichage (Modale, Widget…). */
  format?: ReactNode;
  children?: ReactNode;
  selected?: boolean;
  /** Bouton « + » pour ajouter une étape (propriété Figma `hasAdd`). */
  onAdd?: () => void;
  menu?: ReactNode;
}

/** ModuleCard (7850:2521) : carte d'un module dans la colonne de construction. */
export function ModuleCard({ title, format, children, selected, onAdd, menu }: ModuleCardProps) {
  return (
    <div className={cx(styles.card, selected && styles.cardSelected)}>
      <div className={styles.head}>
        <span className={styles.title}>{title}</span>
        {format && <span className={styles.format}>{format}</span>}
        {menu}
      </div>
      <div className={styles.list}>{children}</div>
      {onAdd && (
        <button type="button" className={styles.add} onClick={onAdd}><Icon name="add-01" size={12} /> Ajouter une étape</button>
      )}
    </div>
  );
}

export interface MessageCardProps {
  kind: 'welcome' | 'thanks';
  title?: ReactNode;
  preview?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

/** MessageCard (8070:2583) : message de début ou de fin. */
export function MessageCard({ kind, title, preview, selected, disabled, onClick }: MessageCardProps) {
  return (
    <button type="button" disabled={disabled} onClick={onClick} className={cx(styles.card, styles.message, selected && styles.cardSelected)}>
      <span className={styles.msgHead}>
        <IconBoxed icon={kind === 'welcome' ? 'play' : 'flag-02'} color={kind === 'welcome' ? 'brand' : 'green'} appearance="filled" />
        <span className={styles.title}>{title ?? (kind === 'welcome' ? 'Bienvenue' : 'Merci')}</span>
      </span>
      {preview && <span className={styles.preview}>{preview}</span>}
    </button>
  );
}

/** FlowDivider (8070:2592) : séparation « Début », « Fin » ou « Contenu » de la colonne des modules. */
export function FlowDivider({ kind, label }: { kind: 'start' | 'end' | 'content'; label?: ReactNode }) {
  const icon: IconName = kind === 'start' ? 'play' : kind === 'end' ? 'flag-02' : 'layers-01';
  const text = label ?? (kind === 'start' ? 'Début' : kind === 'end' ? 'Fin' : 'Contenu');
  return (
    <div className={styles.divider} role="separator">
      <Icon name={icon} size={14} /><span>{text}</span><span className={styles.line} />
    </div>
  );
}

/** InsertBar (8199:6014) : « + » et trait fin entre deux blocs. */
/** Entre deux slides de StepList (D-020) : `label="Insérer une slide"` ; `dropTarget` pendant un glisser. */
export function InsertBar({ onInsert, dropTarget, label = 'Insérer un bloc' }: { onInsert?: () => void; dropTarget?: boolean; label?: string }) {
  return (
    <div className={cx(styles.insert, dropTarget && styles.insertActive)}>
      <button type="button" className={styles.insertBtn} onClick={onInsert} aria-label={label} title={label}><Icon name="add-01" size={10} /></button>
      <span className={styles.insertLine} />
    </div>
  );
}

/** DropZone (8173:3496) : emplacement de dépôt en pointillés. */
export function DropZone({ label = 'Déposer ici' }: { label?: ReactNode }) {
  return <div className={styles.drop}>{label}</div>;
}
