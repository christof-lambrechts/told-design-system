import { useState, type ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import { AiTag } from '../Ai/Ai';
import styles from './Steps.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export interface StepThumbProps {
  number: number | string;
  /** Miniature de la capture (URL). Absente : état vide en pointillés. */
  src?: string;
  selected?: boolean;
  /** Textes écrits par l'IA, pas encore relus (hasAi). */
  ai?: boolean;
  /** Point orange « À compléter ». */
  warning?: string;
  /** Avatar ou autre élément en bas à droite (présence). */
  presence?: ReactNode;
  /** Menu d'actions affiché au survol (⋯). */
  menu?: ReactNode;
  label: string;
  onSelect?: () => void;
}

/** StepThumb (8829:480), un `li` à poser dans StepGroup ou une liste `ol`. : vignette 16:10 dans un cadre blanc à bordure (marge 4, rayon 8, capture rayon 4, numéro rayon 3). */
export function StepThumb({ number, src, selected, ai, warning, presence, menu, label, onSelect }: StepThumbProps) {
  return (
    <li className={styles.thumbWrap}>
      <button type="button" aria-label={label} aria-current={selected ? 'step' : undefined} className={cx(styles.thumb, selected && styles.selected)} onClick={onSelect}>
        <span className={cx(styles.frame, !src && styles.empty)}>{src && <img src={src} alt="" draggable={false} />}</span>
        <span className={styles.number}>{number}</span>
        {warning && <span className={styles.warning} title={warning} />}
        {ai && <AiTag size="xs" className={styles.ai} />}
        {presence && <span className={styles.presence}>{presence}</span>}
      </button>
      {menu && <span className={styles.menu}>{menu}</span>}
    </li>
  );
}

export interface StepGroupProps {
  /** « Slide 1 », dans une pastille bleue. */
  badge: ReactNode;
  title?: string;
  /** Vignettes (StepThumb), en grille de 2 colonnes. */
  children: ReactNode;
  defaultExpanded?: boolean;
  /** Nombre d'étapes, affiché quand le groupe est replié. */
  count?: number;
}

/** StepGroup (8830:447) : slide repliable, fond Neutral/surface/subtle, rayon 12, marge 8. */
export function StepGroup({ badge, title, children, defaultExpanded = true, count }: StepGroupProps) {
  const [open, setOpen] = useState(defaultExpanded);
  return (
    <section className={styles.group} aria-label={typeof badge === 'string' ? `${badge}${title ? ` · ${title}` : ''}` : title}>
      <button type="button" className={styles.groupHead} aria-expanded={open} onClick={() => setOpen(!open)}>
        <Icon name="arrow-down-01" size={16} className={cx(styles.chevron, !open && styles.folded)} />
        <span className={styles.badge}>{badge}</span>
        <span className={cx(styles.groupTitle, !title && styles.untitled)}>{title || 'Sans titre'}</span>
        {!open && count != null && <span className={styles.count}>{count}</span>}
      </button>
      {open && <ol className={styles.grid}>{children}</ol>}
    </section>
  );
}

export interface StepListProps {
  /** « Étapes · 9 ». */
  label: ReactNode;
  /** « 1 étape à compléter », en orange et cliquable. */
  warning?: ReactNode;
  onWarning?: () => void;
  children: ReactNode;
  /** Bas de colonne : Enregistrer la suite, Ajouter un écran, Écran de fin. */
  footer?: ReactNode;
}

/** StepList (8830:556) : colonne Étapes de l'éditeur Record. */
export function StepList({ label, warning, onWarning, children, footer }: StepListProps) {
  return (
    <nav aria-label="Étapes" className={styles.list}>
      <div className={styles.listHead}>
        <span className={styles.listLabel}>{label}</span>
        {warning && <button type="button" className={styles.listWarning} onClick={onWarning}>{warning}</button>}
      </div>
      <div className={styles.listBody}>{children}</div>
      {footer && <div className={styles.listFoot}>{footer}</div>}
    </nav>
  );
}
