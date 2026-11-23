import { useId, useRef, type KeyboardEvent } from 'react';
import { Icon } from '../Icon/Icon';
import styles from './PositionPicker.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export type Position =
  | 'top-left' | 'top-center' | 'top-right'
  | 'middle-left' | 'center' | 'middle-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

const ALL: Position[] = ['top-left', 'top-center', 'top-right', 'middle-left', 'center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'];
const FIVE: Position[] = ['top-left', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'];

export const positionLabels: Record<Position, string> = {
  'top-left': 'En haut à gauche', 'top-center': 'En haut au centre', 'top-right': 'En haut à droite',
  'middle-left': 'Au milieu à gauche', center: 'Au centre', 'middle-right': 'Au milieu à droite',
  'bottom-left': 'En bas à gauche', 'bottom-center': 'En bas au centre', 'bottom-right': 'En bas à droite',
};

export interface PositionPickerProps {
  value: Position;
  onChange: (value: Position) => void;
  /** 9 : grille 3 × 3 ; 5 : les 4 coins et le bas au centre. Ou la liste exacte des places proposées. */
  positions?: 9 | 5 | Position[];
  /** Élément montré à la place choisie et en aperçu au survol. */
  item?: 'widget' | 'avatar' | 'media';
  /** Libellé au-dessus (style des options, Medium 11/14). */
  label?: string;
  'aria-label'?: string;
  disabled?: boolean;
  className?: string;
}

/** PositionPicker (Figma 9807:117400) : places libres en points gris, la place choisie montre l'élément en plein, le survol le montre en pâle. Groupe radio, flèches au clavier. */
export function PositionPicker({ value, onChange, positions = 9, item = 'widget', label, disabled, className, ...rest }: PositionPickerProps) {
  const lid = useId();
  const offered = Array.isArray(positions) ? positions : positions === 5 ? FIVE : ALL;
  const refs = useRef<Partial<Record<Position, HTMLButtonElement | null>>>({});
  const order = ALL.filter((p) => offered.includes(p));
  const onKey = (e: KeyboardEvent, p: Position) => {
    const i = ALL.indexOf(p); const r = Math.floor(i / 3), c = i % 3;
    const step: Record<string, [number, number]> = { ArrowRight: [0, 1], ArrowLeft: [0, -1], ArrowDown: [1, 0], ArrowUp: [-1, 0] };
    const d = step[e.key];
    if (!d) {
      if (e.key === 'Home' || e.key === 'End') { e.preventDefault(); const t = e.key === 'Home' ? order[0] : order[order.length - 1]; refs.current[t]?.focus(); onChange(t); }
      return;
    }
    e.preventDefault();
    // cherche la prochaine place proposée dans la direction, sinon la suivante dans l'ordre de lecture
    let rr = r + d[0], cc = c + d[1];
    while (rr >= 0 && rr < 3 && cc >= 0 && cc < 3) { const t = ALL[rr * 3 + cc]; if (offered.includes(t)) { refs.current[t]?.focus(); onChange(t); return; } rr += d[0]; cc += d[1]; }
    const k = order.indexOf(p); const t = order[(k + (d[0] + d[1] > 0 ? 1 : -1) + order.length) % order.length];
    refs.current[t]?.focus(); onChange(t);
  };
  const grid = (
    <div role="radiogroup" aria-label={label ? undefined : rest['aria-label'] ?? 'Position'} aria-labelledby={label ? lid : undefined}
      aria-disabled={disabled || undefined} className={cx(styles.grid, disabled && styles.disabled, !label && className)}>
      {ALL.map((p) => {
        if (!offered.includes(p)) return <span key={p} className={styles.empty} aria-hidden="true" />;
        const on = p === value;
        return (
          <button key={p} ref={(el) => { refs.current[p] = el; }} type="button" role="radio" aria-checked={on} aria-label={positionLabels[p]}
            tabIndex={on || (!offered.includes(value) && p === order[0]) ? 0 : -1} disabled={disabled}
            className={cx(styles.cell, on && styles.selected)} onClick={() => onChange(p)} onKeyDown={(e) => onKey(e, p)}>
            <span className={styles.dot} aria-hidden="true" />
            <span className={cx(styles.item, styles[item])} aria-hidden="true">
              {item === 'widget' ? <><span className={styles.bar} /><span className={styles.body} /></> : item === 'media' ? <span className={styles.mediaShape} /> : <span className={styles.face}><Icon name="user" size={16} /></span>}
            </span>
          </button>
        );
      })}
    </div>
  );
  return label ? <div className={cx(styles.labelled, className)}><span id={lid} className={styles.label}>{label}</span>{grid}</div> : grid;
}
