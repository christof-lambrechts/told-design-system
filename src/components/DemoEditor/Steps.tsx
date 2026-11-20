import { useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import { AiTag } from '../Ai/Ai';
import { FlowDivider } from '../ModuleCard/ModuleCard';
import styles from './Steps.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export interface StepThumbProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onSelect' | 'children'> {
  number: number | string;
  /** Miniature de la capture (URL). Absente : état vide en pointillés. */
  src?: string;
  /** D-020 : contenu de la vignette à la place d'une capture (ex. vignette d'un intertitre : fond et texte du kit). */
  preview?: ReactNode;
  /** D-020 : étape cochée dans une sélection multiple (⌘ ou Maj + clic) : fond bleu pâle, contour fin, coche. Distincte de `selected` (étape en cours). */
  multiSelected?: boolean;
  /** D-020 : ligne de dépôt pendant un glisser, avant ou après la vignette (StepDropLine). */
  drop?: 'before' | 'after';
  /** D-020 : vignette en cours de glisser (estompée). */
  dragging?: boolean;
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
/** Les autres attributs (draggable, onDragStart…, onKeyDown, data-*, aria-*) vont au bouton (D-020). */
export function StepThumb({ number, src, preview, selected, multiSelected, drop, dragging, ai, warning, presence, menu, label, onSelect, className, ...rest }: StepThumbProps) {
  return (
    <li className={cx(styles.thumbWrap, dragging && styles.dragging)}>
      {drop && <StepDropLine className={drop === 'before' ? styles.dropBefore : styles.dropAfter} />}
      <button type="button" aria-label={label} aria-current={selected ? 'step' : undefined} aria-pressed={multiSelected ? true : undefined} {...rest}
        className={cx(styles.thumb, selected && styles.selected, multiSelected && !selected && styles.multi, className)} onClick={onSelect}>
        {multiSelected && <span className={styles.check} aria-hidden="true"><Icon name="tick-02" size={10} /></span>}
        <span className={cx(styles.frame, !src && !preview && styles.empty)}>{preview ?? (src && <img src={src} alt="" draggable={false} />)}</span>
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
  /** D-020 : état replié contrôlé. */
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  /** Nombre d'étapes, affiché quand le groupe est replié. */
  count?: number;
}

/** StepDropLine (_StepDropLine 9129:2511) : ligne bleue verticale avec deux pastilles, où l'étape glissée va tomber. Posée par StepThumb `drop`, ou seule. */
export function StepDropLine({ className }: { className?: string }) {
  return <span className={cx(styles.dropLine, className)} aria-hidden="true"><span /><span /></span>;
}

/** StepAddThumb (StepThumb `state=add`, 20/11) : dernière case de la grille, pointillés et « + », pour ajouter un enregistrement d'écran. */
export function StepAddThumb({ label = 'Ajouter un enregistrement', onClick }: { label?: string; onClick?: () => void }) {
  return (
    <li className={styles.thumbWrap}>
      <button type="button" aria-label={label} title={label} className={cx(styles.thumb, styles.add)} onClick={onClick}>
        <Icon name="add-01" size={20} />
      </button>
    </li>
  );
}

/** StepGroup (8830:447) : slide repliable, fond Neutral/surface/subtle, rayon 12, marge 8. */
export function StepGroup({ badge, title, children, defaultExpanded = true, expanded, onExpandedChange, count }: StepGroupProps) {
  const [inner, setInner] = useState(defaultExpanded);
  const open = expanded ?? inner;
  const setOpen = (v: boolean) => { if (expanded === undefined) setInner(v); onExpandedChange?.(v); };
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
  /** En-tête facultatif (retiré de Figma le 20/11). */
  label?: ReactNode;
  /** « 1 étape à compléter », en orange et cliquable. */
  warning?: ReactNode;
  onWarning?: () => void;
  children: ReactNode;
  /** Section « Début » : écran d'introduction en option (MessageCard welcome). */
  intro?: ReactNode;
  /** Section « Fin » : écran de fin (MessageCard thanks). */
  end?: ReactNode;
  /** Bas de colonne, si besoin. */
  footer?: ReactNode;
}

/** StepList (8830:556) : colonne Étapes de l'éditeur Record : Début (intro), slides, Fin (écran de fin). */
export function StepList({ label, warning, onWarning, children, intro, end, footer }: StepListProps) {
  return (
    <nav aria-label="Étapes" className={styles.list}>
      {(label || warning) && (
        <div className={styles.listHead}>
          {label && <span className={styles.listLabel}>{label}</span>}
          {warning && <button type="button" className={styles.listWarning} onClick={onWarning}>{warning}</button>}
        </div>
      )}
      <div className={styles.listBody}>
        {intro && <div className={styles.section}><FlowDivider kind="start" />{intro}<FlowDivider kind="content" label="" /></div>}
        {children}
        {end && <div className={styles.section}><FlowDivider kind="end" />{end}</div>}
      </div>
      {footer && <div className={styles.listFoot}>{footer}</div>}
    </nav>
  );
}
