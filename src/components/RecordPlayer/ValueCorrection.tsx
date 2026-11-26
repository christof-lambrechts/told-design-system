import { forwardRef, useEffect, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Popover, type Placement } from '../Overlay/Overlay';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import styles from './ValueCorrection.module.css';

export interface ValueMarkerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** review : contour orange en pointillés (valeur à regarder) ; blocking : contour rouge plein (valeur d'origine encore visible, R-55). */
  tone?: 'review' | 'blocking';
  /** Nom accessible, ex. « Valeur à regarder : Yann Le Goff ». */
  label: string;
}

/** ValueMarker : contour cliquable posé sur une valeur d'une image (overlay de GuidedPlayer). Remplit la zone qui lui est donnée. */
export const ValueMarker = forwardRef<HTMLButtonElement, ValueMarkerProps>(function ValueMarker({ tone = 'review', label, className, ...rest }, ref) {
  return <button ref={ref} type="button" aria-label={label} className={[styles.marker, tone === 'blocking' && styles.blocking, className].filter(Boolean).join(' ')} {...rest} />;
});

export interface ValueCorrectionLabels {
  title: string; field: string; apply: string; keep: string; blockingTitle: string;
}
const DEFAULT_LABELS: ValueCorrectionLabels = {
  title: 'Valeur à regarder', field: 'Remplaçant', apply: 'Appliquer', keep: 'Laisser tel quel', blockingTitle: 'Valeur d’origine encore visible',
};

export interface ValueCorrectionProps {
  /** Valeur lue dans l'image (pré-remplit le champ). */
  value: string;
  /** Phrase d'explication, ex. « L'IA n'est pas sûre de ce nom. Il apparaît sur 3 étapes. » */
  description?: ReactNode;
  /** Note en bas, ex. « Appliquer refait les 3 images (1 à 2 s). » */
  note?: ReactNode;
  /** Appliquer le remplaçant. */
  onApply: (replacement: string) => void;
  /** Laisser la valeur telle quelle. Absent en mode bloquant si l'app l'interdit. */
  onKeep?: () => void;
  /** blocking : contour rouge plein et fenêtre ouverte d'emblée (R-55). */
  tone?: 'review' | 'blocking';
  /** Nom accessible du contour (par défaut « Valeur à regarder : … »). */
  markerLabel?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: Placement;
  /** Application en cours (bouton désactivé). */
  busy?: boolean;
  labels?: Partial<ValueCorrectionLabels>;
}

/**
 * ValueCorrection (D-086) : contour sur une valeur d'une image et petite fenêtre accrochée à ce contour.
 * Titre, phrase, champ « Remplaçant », « Appliquer » et « Laisser tel quel », note. Échap et clic dehors ferment,
 * le focus reste dans la fenêtre tant qu'elle est ouverte, puis revient au contour.
 * À poser dans un overlay de GuidedPlayer : `{ id, x, y, width, height, content: <ValueCorrection … /> }`.
 */
export function ValueCorrection({ value, description, note, onApply, onKeep, tone = 'review', markerLabel, open, onOpenChange, placement = 'bottom-start', busy, labels }: ValueCorrectionProps) {
  const L = { ...DEFAULT_LABELS, ...labels };
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);
  const blocking = tone === 'blocking';
  return (
    <Popover key={tone} role="dialog" aria-label={blocking ? L.blockingTitle : L.title} trapFocus placement={placement} offset={8} width={320}
      defaultOpen={blocking} open={open} onOpenChange={onOpenChange}
      trigger={<ValueMarker tone={tone} label={markerLabel ?? `${blocking ? L.blockingTitle : L.title} : ${value}`} />}
      className={blocking ? styles.layerBlocking : undefined}>
      {(close) => (
        <form className={styles.form} onSubmit={(e) => { e.preventDefault(); if (draft.trim()) { onApply(draft.trim()); close(); } }}>
          <p className={styles.title}>{blocking ? L.blockingTitle : L.title}</p>
          {description && <p className={styles.desc}>{description}</p>}
          <Input label={L.field} value={draft} onChange={(e) => setDraft(e.target.value)} size="md" />
          <div className={styles.actions}>
            <Button htmlType="submit" size="sm" color="neutral" disabled={busy || !draft.trim()}>{L.apply}</Button>
            {onKeep && <Button size="sm" color="neutral" variant="ghost" onClick={() => { onKeep(); close(); }}>{L.keep}</Button>}
          </div>
          {note && <p className={styles.note}>{note}</p>}
        </form>
      )}
    </Popover>
  );
}
