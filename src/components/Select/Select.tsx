import { useEffect, useId, useRef, useState, type ReactNode, type KeyboardEvent, type ButtonHTMLAttributes, type ElementType } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import { IconBoxedColor, type IconBoxedColorName } from '../IconBoxed/IconBoxedColor';
import styles from './Select.module.css';

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');

/* ---------- DropdownItem ---------- */

export interface DropdownItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: ReactNode;
  description?: ReactNode;
  icon?: IconName;
  /** Picto de couleur à gauche (hasBoxedIcon). */
  boxedIcon?: IconBoxedColorName;
  /** Coche à droite, fond sélectionné. */
  selected?: boolean;
  /** Propriété Figma `tone`. */
  tone?: 'default' | 'danger';
  /** Raccourci affiché à droite. */
  shortcut?: ReactNode;
  /** D-007 : entrée qui est un lien. */
  href?: string;
  linkAs?: ElementType;
}

/** DropdownItem (4544:102435) : une ligne de menu ou d'option. Marge 6/9, rayon 8. */
export function DropdownItem({ children, description, icon, boxedIcon, selected, tone = 'default', shortcut, href, linkAs, className, ...rest }: DropdownItemProps) {
  const cls = cx(styles.item, selected && styles.selected, tone === 'danger' && styles.danger, rest.disabled && styles.itemDisabled, className);
  if (href) {
    const L = linkAs ?? 'a';
    return (
      <L href={rest.disabled ? undefined : href} role="menuitem" aria-disabled={rest.disabled || undefined} className={cls} onClick={rest.onClick}>
        {icon && <Icon name={icon} size={14} className={styles.itemIcon} />}
        <span className={styles.itemText}><span className={styles.itemLabel}>{children}</span>{description && <span className={styles.itemDesc}>{description}</span>}</span>
      </L>
    );
  }
  return (
    <button type="button" role="option" aria-selected={selected} className={cls} {...rest}>
      {boxedIcon && <IconBoxedColor icon={boxedIcon} size={20} />}
      {icon && <Icon name={icon} size={14} variant={selected ? 'solid' : 'stroke'} className={styles.itemIcon} />}
      <span className={styles.itemText}>
        <span className={styles.itemLabel}>{children}</span>
        {description && <span className={styles.itemDesc}>{description}</span>}
      </span>
      {shortcut && <span className={styles.shortcut}>{shortcut}</span>}
      {selected && <Icon name="tick-02" size={16} className={styles.tick} />}
    </button>
  );
}

/** Panneau flottant de la liste (fond Dropdown, ombre shadow-flat-8). */
export function DropdownMenu({ children, className, ...rest }: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return <div role="listbox" className={cx(styles.menu, className)} {...rest}>{children}</div>;
}

/* ---------- Select ---------- */

export interface SelectOption { value: string; label: ReactNode; description?: ReactNode; icon?: IconName; boxedIcon?: IconBoxedColorName; disabled?: boolean }

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: ReactNode;
  placeholder?: string;
  helper?: ReactNode;
  error?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  /** Propriété Figma `style` : default (contour), flat (sans fond), light (fond seul). */
  appearance?: 'default' | 'flat' | 'light';
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
  'aria-label'?: string;
}

/** Select (DropdownField 4855:20599) : champ à liste. Mêmes hauteurs que Input (sm 28, md 34, lg 40). Clavier : flèches, Entrée, Échap. */
export function Select({ options, value, onChange, label, placeholder = 'Choisir', helper, error, size = 'md', appearance = 'default', disabled, required, id, className, ...rest }: SelectProps) {
  const auto = useId();
  const fid = id ?? auto;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const root = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const pick = (o: SelectOption) => { if (o.disabled) return; onChange?.(o.value); setOpen(false); };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') { setOpen(false); return; }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) { setOpen(true); setActive(Math.max(0, options.findIndex((o) => o.value === value))); return; }
      const step = e.key === 'ArrowDown' ? 1 : -1;
      setActive((a) => (a + step + options.length) % options.length);
    }
    if ((e.key === 'Enter' || e.key === ' ') && open && active >= 0) { e.preventDefault(); pick(options[active]); }
  };

  return (
    <div ref={root} className={cx(styles.field, styles[size], !!error && styles.hasError, className)}>
      {label && (
        <label htmlFor={fid} className={styles.label}>
          {label}{required && <span className={styles.required}>*</span>}
        </label>
      )}
      <button
        id={fid}
        type="button"
        className={cx(styles.box, styles[appearance], open && styles.open, disabled && styles.disabled)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={!!error || undefined}
        disabled={disabled}
        onClick={() => { setOpen((o) => !o); setActive(Math.max(0, options.findIndex((o) => o.value === value))); }}
        onKeyDown={onKey}
        {...rest}
      >
        {current?.boxedIcon && <IconBoxedColor icon={current.boxedIcon} size={20} />}
        {current?.icon && <Icon name={current.icon} size={16} />}
        <span className={cx(styles.value, !current && styles.placeholder)}>{current ? current.label : placeholder}</span>
        <span className={styles.chevron}><Icon name="arrow-down-01" size={14} /></span>
      </button>
      {open && (
        <DropdownMenu className={styles.popover}>
          {options.map((o, i) => (
            <DropdownItem key={o.value} icon={o.icon} boxedIcon={o.boxedIcon} description={o.description} selected={o.value === value}
              disabled={o.disabled} className={cx(i === active && styles.active)} onMouseEnter={() => setActive(i)} onClick={() => pick(o)}>
              {o.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
      {(error || helper) && <span className={error ? styles.errorText : styles.helper}>{error || helper}</span>}
    </div>
  );
}
