import { useId, type CSSProperties } from 'react';
import styles from './SliderCapsule.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export interface SliderCapsuleProps {
  /** Libellé à gauche (label, hasLabel). Absent : pas de libellé visible, mettre `aria-label`. */
  label?: string;
  'aria-label'?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  /** Valeur par défaut : point blanc 40 % sur la barre (hasDefault). Un clic dessus y ramène ; au clavier, c'est le bouton qui suit le curseur (« Revenir à … »). */
  defaultValue?: number;
  /** Mise en forme de la valeur affichée à droite (« × 1,6 », « 40 % »). */
  format?: (value: number) => string;
  /** Plage (state=range) : deuxième valeur, deux poignées, min et max dans les cases. Pas de point par défaut. */
  rangeEnd?: number;
  onRangeEndChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

const pct = (v: number, min: number, max: number) => ((v - min) / (max - min)) * 100;

/** SliderCapsule (3696:120151) : curseur dans une capsule. Remplissage Ink/default, poignée Paper/default, valeur dans une case à droite. */
export function SliderCapsule({ label, min = 0, max = 100, step = 1, value, onChange, defaultValue, format = (v) => String(v), rangeEnd, onRangeEndChange, disabled, className, ...rest }: SliderCapsuleProps) {
  const id = useId();
  const range = rangeEnd !== undefined;
  const a = pct(value, min, max);
  const b = range ? pct(rangeEnd, min, max) : a;
  const vars = { '--from': `${range ? a : 0}%`, '--to': `${b}%` } as CSSProperties;
  return (
    <div className={cx(styles.root, disabled && styles.disabled, className)}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <div className={styles.control}>
        {range && <span className={styles.box}>{format(value)}</span>}
        <div className={styles.capsule}>
          <div className={styles.bar} style={vars}>
            {!range && defaultValue !== undefined && (
              <button type="button" className={styles.mark} style={{ left: `${pct(defaultValue, min, max)}%` }} aria-label={`Revenir à ${format(defaultValue)}`} title={`Par défaut : ${format(defaultValue)}`}
                onClick={() => onChange(defaultValue)} disabled={disabled} />
            )}
            <input id={id} type="range" className={cx(styles.input, !range && styles.single)} min={min} max={max} step={step} value={value} disabled={disabled}
              aria-label={label ? undefined : rest['aria-label']} aria-valuetext={format(value)}
              onChange={(e) => { const v = Number(e.target.value); onChange(range ? Math.min(v, rangeEnd!) : v); }} />
            {range && (
              <input type="range" className={styles.input} min={min} max={max} step={step} value={rangeEnd} disabled={disabled}
                aria-label={`${label ?? rest['aria-label'] ?? ''} (maximum)`} aria-valuetext={format(rangeEnd!)}
                onChange={(e) => onRangeEndChange?.(Math.max(Number(e.target.value), value))} />
            )}
          </div>
        </div>
        <span className={styles.box} aria-hidden={!range || undefined}>{format(range ? rangeEnd! : value)}</span>
      </div>
    </div>
  );
}
