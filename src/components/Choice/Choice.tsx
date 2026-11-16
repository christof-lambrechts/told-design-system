import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import styles from './Choice.module.css';

type Base = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> & {
  /** Libellé (labelText). */
  label?: ReactNode;
  /** Précision sous le libellé (descriptionText, hasDescription). */
  description?: ReactNode;
  /** Dans un cadre cliquable, pour les listes de réglages. */
  boxed?: boolean;
  /** below : description à la ligne ; inline : à la suite du titre, une ligne tronquée. */
  descriptionPlacement?: 'below' | 'inline';
  error?: boolean;
};

function Field({
  kind,
  control,
  size,
  checkPlacement = 'left',
  label,
  description,
  boxed,
  descriptionPlacement = 'below',
  error,
  disabled,
  checked,
  defaultChecked,
  className,
  id,
  ...rest
}: Base & { kind: 'checkbox' | 'radio' | 'switch'; control: ReactNode; size: string; checkPlacement?: 'left' | 'right' }) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const isOn = checked ?? defaultChecked;
  const cls = [
    styles.field,
    styles[size],
    boxed && styles.boxed,
    isOn && styles.checked,
    error && styles.error,
    disabled && styles.disabled,
    checkPlacement === 'right' && styles.right,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <label htmlFor={inputId} className={cls}>
      <input
        id={inputId}
        className={styles.input}
        type={kind === 'radio' ? 'radio' : 'checkbox'}
        role={kind === 'switch' ? 'switch' : undefined}
        disabled={disabled}
        checked={checked}
        defaultChecked={defaultChecked}
        aria-invalid={error || undefined}
        {...rest}
      />
      <span className={styles.controlWrap} aria-hidden="true">
        {control}
      </span>
      {(label || description) && (
        <span className={[styles.content, descriptionPlacement === 'inline' && styles.inline].filter(Boolean).join(' ')}>
          {label && <span className={styles.label}>{label}</span>}
          {description && <span className={styles.description}>{description}</span>}
        </span>
      )}
    </label>
  );
}

export interface CheckboxProps extends Base {
  size?: 'md' | 'lg';
  checkPlacement?: 'left' | 'right';
}

/** Checkbox : choix validés ensemble (4554:111425). Cocher avec `checked`, jamais un état. */
export function Checkbox({ size = 'md', ...props }: CheckboxProps) {
  const control = (
    <span className={styles.box}>
      {(props.checked ?? props.defaultChecked) && (
        <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
          <path d="M1 3.5 3.8 6 9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
  return <Field kind="checkbox" control={control} size={size} {...props} />;
}

export interface RadioProps extends Base {
  size?: 'md' | 'lg';
}

/** Radio : un choix parmi 2 à 5 (4554:113764). */
export function Radio({ size = 'md', ...props }: RadioProps) {
  return <Field kind="radio" control={<span className={styles.radio} />} size={size} {...props} />;
}

export interface SwitchProps extends Base {
  size?: 'sm' | 'md' | 'lg';
  checkPlacement?: 'left' | 'right';
}

/** Switch : réglage à effet immédiat (5905:70473). */
export function Switch({ size = 'md', ...props }: SwitchProps) {
  const control = (
    <span className={styles.track}>
      <span className={styles.knob} />
    </span>
  );
  return <Field kind="switch" control={control} size={size} {...props} />;
}
