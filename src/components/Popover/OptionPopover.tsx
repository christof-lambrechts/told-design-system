import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../Icon/Icon';
import { ButtonIcon } from '../Button/Button';
import type { Position } from '../OptionSidebar/PositionPicker';
import styles from './OptionPopover.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export type PopoverPlacement = 'left' | 'right' | 'bottom';

export interface OptionPopoverProps {
  /** Titre de la micro-modale (« Position de l'avatar », « Cadre »). Nomme aussi la boîte de dialogue. */
  title: ReactNode;
  open: boolean;
  onClose: () => void;
  /** Élément auquel la micro-modale est collée (le PopoverField). */
  anchor: HTMLElement | null;
  /**
   * Côté d'ouverture. `left` par défaut : le panneau Options est à droite de l'écran, la micro-modale s'ouvre
   * à sa gauche, alignée en haut sur le champ. Repli automatique sous le champ si la place manque.
   */
  placement?: PopoverPlacement;
  children: ReactNode;
  /** Largeur fixe. Par défaut la micro-modale suit son contenu (Hug), entre 220 et 360. */
  width?: number;
}

const GAP = 8;

/**
 * OptionPopover (Figma 9928:10884) : micro-modale d'un réglage, ouverte par PopoverField.
 * Largeur au contenu (Hug, 220 à 360), rayon 12, ombre shadow-flat-8 ; titre + Fermer, contenu au choix (liste illustrée FormatOptionGroup,
 * PositionPicker, ChoiceChips…). Échap, clic dehors ou Fermer la referment et rendent le focus au champ.
 */
export function OptionPopover({ title, open, onClose, anchor, placement = 'left', children, width }: OptionPopoverProps) {
  const box = useRef<HTMLDivElement>(null);
  const tid = useId();
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  const place = useCallback(() => {
    if (!anchor || !box.current) return;
    const a = anchor.getBoundingClientRect();
    const h = box.current.offsetHeight;
    const w = box.current.offsetWidth;
    const vw = window.innerWidth, vh = window.innerHeight;
    const panel = anchor.closest('[data-option-sidebar]')?.getBoundingClientRect() ?? a;
    let left: number, top: number;
    if (placement === 'left' && panel.left - GAP - w >= 8) { left = panel.left - GAP - w; top = a.top; }
    else if (placement === 'right' && panel.right + GAP + w <= vw - 8) { left = panel.right + GAP; top = a.top; }
    else { left = Math.min(Math.max(8, a.left), vw - w - 8); top = a.bottom + 4; }
    top = Math.max(8, Math.min(top, vh - h - 8));
    setPos({ top, left });
  }, [anchor, placement]);

  useLayoutEffect(() => { if (open) place(); else setPos(null); }, [open, place]);
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      const t = e.target as Node;
      if (box.current?.contains(t) || anchor?.contains(t)) return;
      onClose();
    };
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.stopPropagation(); onClose(); anchor?.focus(); } };
    document.addEventListener('pointerdown', away);
    document.addEventListener('keydown', key);
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    const first = box.current?.querySelector<HTMLElement>('[role="radio"][tabindex="0"], [aria-checked="true"], button:not([disabled]), input, [tabindex="0"]');
    first?.focus();
    return () => {
      document.removeEventListener('pointerdown', away);
      document.removeEventListener('keydown', key);
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [open, anchor, onClose, place]);

  if (!open || typeof document === 'undefined') return null;
  return createPortal(
    <div ref={box} role="dialog" aria-labelledby={tid} className={styles.popover}
      style={{ width: width ?? 'max-content', top: pos?.top ?? -9999, left: pos?.left ?? -9999, visibility: pos ? 'visible' : 'hidden' }}>
      <div className={styles.head}>
        <span id={tid} className={styles.title}>{title}</span>
        <ButtonIcon icon="cancel-01" label="Fermer" appearance="ghost" color="neutral" size="sm" onClick={() => { onClose(); anchor?.focus(); }} />
      </div>
      <div className={styles.body}>{children}</div>
    </div>,
    document.body,
  );
}

export interface PopoverFieldProps {
  /** Libellé au-dessus du champ (style Label option). Absent : donner `aria-label`. */
  label?: ReactNode;
  /** Résumé du réglage : « En bas à gauche », « Ordinateur », « iMac · Bleu ». */
  value: ReactNode;
  /** Petit aperçu à gauche (20 × 20) : pastille de couleur, mini position, icône d'appareil. */
  preview?: ReactNode;
  /** Titre de la micro-modale ; par défaut le libellé. */
  title?: ReactNode;
  /** Contenu de la micro-modale. */
  children: ReactNode;
  placement?: PopoverPlacement;
  /** Contrôlé si fourni. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  'aria-label'?: string;
  popoverWidth?: number;
}

/**
 * PopoverField (Figma 9928:10883) : champ compact qui résume un réglage (aperçu + valeur + chevron, 36 de haut
 * comme Select md) et ouvre OptionPopover, comme les pastilles de remplissage de Figma.
 *
 * Règle (24/11) : 3 choix ou moins = GroupTab ; plus de 3 choix, ou réglage long et peu modifié (position,
 * couleur de contour, appareil et coloris, format) = PopoverField + OptionPopover, avec une liste illustrée
 * (FormatOptionGroup) quand les choix se montrent mieux qu'ils ne se lisent.
 */
export function PopoverField({ label, value, preview, title, children, placement, open: openProp, onOpenChange, disabled, popoverWidth, ...rest }: PopoverFieldProps) {
  const [inner, setInner] = useState(false);
  const open = openProp ?? inner;
  const set = (o: boolean) => { if (openProp === undefined) setInner(o); onOpenChange?.(o); };
  const btn = useRef<HTMLButtonElement>(null);
  const lid = useId();
  return (
    <div className={styles.field}>
      {label && <span id={lid} className={cx(styles.label, 'text-label-option')}>{label}</span>}
      <button ref={btn} type="button" className={cx(styles.trigger, open && styles.open)} disabled={disabled}
        aria-haspopup="dialog" aria-expanded={open} aria-labelledby={label ? `${lid} ${lid}-v` : undefined} aria-label={label ? undefined : rest['aria-label']}
        onClick={() => set(!open)}>
        {preview && <span className={styles.preview} aria-hidden="true">{preview}</span>}
        <span id={`${lid}-v`} className={styles.value}>{value}</span>
        <Icon name="arrow-down-01" size={16} className={styles.chevron} />
      </button>
      <OptionPopover title={title ?? label ?? rest['aria-label']} open={open} onClose={() => set(false)} anchor={btn.current} placement={placement} width={popoverWidth}>
        {children}
      </OptionPopover>
    </div>
  );
}

/** Aperçu « position » de PopoverField (Figma _Preview/position) : cadre de 16 et point à la place choisie (3 × 3). */
export function PositionPreview({ position }: { position: Position }) {
  const [v, h] = position === 'center' ? ['middle', 'center'] : position.split('-');
  const x = ({ left: 6.5, center: 10, right: 13.5 } as Record<string, number>)[h];
  const y = ({ top: 6.5, middle: 10, bottom: 13.5 } as Record<string, number>)[v];
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2.6" y="2.6" width="14.8" height="14.8" rx="3.4" stroke="var(--content-muted-default)" strokeWidth="1.25" />
      <circle cx={x} cy={y} r="2.6" fill="var(--brand-color-brand)" />
    </svg>
  );
}

/** Aperçu « couleur » de PopoverField (Figma _Preview/color) : pastille ronde de 18 avec un filet. */
export function ColorPreview({ color }: { color: string }) {
  return <span className={styles.swatch} style={{ background: color }} />;
}
