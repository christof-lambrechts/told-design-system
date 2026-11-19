import { useId, type ReactNode } from 'react';
import { ChoiceIllustration, type ChoiceIllustrationName } from './illustrations';
import styles from './ChoicePicker.module.css';

export interface ChoiceThumbProps {
  label: ReactNode;
  illustration: ChoiceIllustrationName | ReactNode;
  selected?: boolean;
  onSelect?: () => void;
  name?: string;
  value?: string;
}

/** _ChoiceThumb (8774:468) : vignette illustrée et libellé ; sélection = contour de marque. Se comporte comme un bouton radio. */
export function ChoiceThumb({ label, illustration, selected, onSelect, name, value }: ChoiceThumbProps) {
  return (
    <label className={[styles.thumb, selected && styles.selected].filter(Boolean).join(' ')}>
      <input type="radio" className={styles.radio} name={name} value={value} checked={!!selected} onChange={() => onSelect?.()} />
      {typeof illustration === 'string' ? <ChoiceIllustration name={illustration as ChoiceIllustrationName} /> : illustration}
      <span className={styles.thumbLabel}>{label}</span>
    </label>
  );
}

export interface ChoicePickerProps {
  label: ReactNode;
  options: { value: string; label: ReactNode; illustration: ChoiceIllustrationName | ReactNode }[];
  value: string;
  onChange: (value: string) => void;
  /** Rendu réel de l'option choisie (pas une capture). Masqué si absent. */
  preview?: ReactNode;
  previewLabel?: ReactNode;
  helper?: ReactNode;
}

/** ChoicePicker (8774:591) : choix visuel par vignettes (format, ratio), puis aperçu réel de l'option choisie. */
export function ChoicePicker({ label, options, value, onChange, preview, previewLabel = 'Aperçu', helper }: ChoicePickerProps) {
  const name = useId();
  return (
    <div className={styles.picker}>
      <div role="radiogroup" aria-label={typeof label === 'string' ? label : undefined} className={styles.group}>
        <span className={styles.label}>{label}</span>
        <div className={styles.choices}>
          {options.map((o) => <ChoiceThumb key={o.value} name={name} value={o.value} label={o.label} illustration={o.illustration} selected={o.value === value} onSelect={() => onChange(o.value)} />)}
        </div>
      </div>
      {preview && (
        <>
          <span className={styles.label}>{previewLabel}</span>
          <div className={styles.preview}>{preview}</div>
        </>
      )}
      {helper && <span className={styles.helper}>{helper}</span>}
    </div>
  );
}
