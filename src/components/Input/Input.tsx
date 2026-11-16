import { useId, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import { KbdCombo } from '../Kbd/Kbd';
import styles from './Input.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export type FieldSize = 'sm' | 'md' | 'lg';
/** default = fond + contour ; flat = sans contour ; light = fond teinté sans contour. */
export type FieldAppearance = 'default' | 'flat' | 'light';

interface FieldFrameProps {
  id: string;
  label?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  size: FieldSize;
  children: ReactNode;
  className?: string;
}

function FieldFrame({ id, label, helper, error, required, size, children, className }: FieldFrameProps) {
  return (
    <div className={cx(styles.field, styles[size], !!error && styles.hasError, className)}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-hidden="true">*</span>}
        </label>
      )}
      {children}
      {(error || helper) && (
        <span id={`${id}-help`} className={error ? styles.errorText : styles.helper}>{error || helper}</span>
      )}
    </div>
  );
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  helper?: ReactNode;
  /** Message d'erreur : passe le champ en état error. */
  error?: ReactNode;
  size?: FieldSize;
  appearance?: FieldAppearance;
  iconLeft?: IconName;
  /** Contenu à droite du champ (unité, bouton, raccourci). */
  trailing?: ReactNode;
}

/** Input (2932:184217) : champ de saisie avec libellé, aide et erreur. Construit sur _InputBase. */
export function Input({ label, helper, error, required, size = 'md', appearance = 'default', iconLeft, trailing, id, className, disabled, ...rest }: InputProps) {
  const auto = useId();
  const fid = id ?? auto;
  return (
    <FieldFrame id={fid} label={label} helper={helper} error={error} required={required} size={size} className={className}>
      <div className={cx(styles.box, styles[appearance], disabled && styles.disabled)}>
        {iconLeft && <span className={styles.lead}><Icon name={iconLeft} size={16} /></span>}
        <input
          id={fid}
          className={styles.control}
          disabled={disabled}
          required={required}
          aria-invalid={!!error || undefined}
          aria-describedby={error || helper ? `${fid}-help` : undefined}
          {...rest}
        />
        {trailing && <span className={styles.trail}>{trailing}</span>}
      </div>
    </FieldFrame>
  );
}

export interface SearchBarProps extends Omit<InputProps, 'label' | 'iconLeft' | 'type'> {
  /** Affiche le raccourci ⌘K (propriété Figma `hasShortcut`). */
  shortcut?: boolean;
}

/** SearchBar (3596:90113) : recherche sans libellé, loupe à gauche, raccourci ⌘K. */
export function SearchBar({ shortcut = true, placeholder = 'Rechercher', size = 'md', ...rest }: SearchBarProps) {
  return (
    <Input
      type="search"
      role="searchbox"
      aria-label={typeof placeholder === 'string' ? placeholder : 'Rechercher'}
      iconLeft="search-01"
      placeholder={placeholder}
      size={size}
      trailing={shortcut ? <KbdCombo keys={['⌘', 'K']} size={size === 'lg' ? 'md' : 'sm'} /> : undefined}
      {...rest}
    />
  );
}

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  size?: FieldSize;
  /** brand = fond teinté de la marque (édition), neutral = fond neutre. */
  tone?: 'brand' | 'neutral';
}

/** TextArea (543:14037) : zone de texte sur plusieurs lignes, poignée de redimensionnement. */
export function TextArea({ label, helper, error, required, size = 'md', tone = 'brand', id, className, rows = 3, ...rest }: TextAreaProps) {
  const auto = useId();
  const fid = id ?? auto;
  return (
    <FieldFrame id={fid} label={label} helper={helper} error={error} required={required} size={size} className={className}>
      <div className={cx(styles.box, styles.area, styles[`tone-${tone}`])}>
        <textarea
          id={fid}
          rows={rows}
          className={styles.control}
          required={required}
          aria-invalid={!!error || undefined}
          aria-describedby={error || helper ? `${fid}-help` : undefined}
          {...rest}
        />
      </div>
    </FieldFrame>
  );
}
