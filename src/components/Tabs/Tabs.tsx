import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import styles from './Tabs.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export interface TextTabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: ReactNode;
  selected?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
  /** Compteur à côté du libellé (propriétés Figma `hasCount` + `count`). */
  count?: ReactNode;
}

/** TextTab (20:14461) : onglet texte souligné. */
export function TextTab({ children, selected, iconLeft, iconRight, count, className, ...rest }: TextTabProps) {
  return (
    <button type="button" role="tab" aria-selected={!!selected} className={cx(styles.textTab, selected && styles.selected, className)} {...rest}>
      <span className={styles.textContent}>
        {iconLeft && <Icon name={iconLeft} size={16} />}
        {children}
        {count != null && <span className={styles.count}>{count}</span>}
        {iconRight && <Icon name={iconRight} size={16} />}
      </span>
      <span className={styles.underline} aria-hidden="true" />
    </button>
  );
}

export type ButtonTabStyle = 'fill' | 'outline' | 'ghost' | 'subtle';

export interface ButtonTabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children?: ReactNode;
  appearance?: ButtonTabStyle;
  size?: 'sm' | 'md' | 'lg';
  selected?: boolean;
  icon?: IconName;
  /** Poids du libellé (propriété Figma `font`). */
  weight?: 'medium' | 'semibold';
}

/** ButtonTab (3594:233176) : onglet bouton de l'éditeur (EditionNav, Langues). */
export function ButtonTab({ children, appearance = 'fill', size = 'md', selected, icon, weight = 'medium', className, ...rest }: ButtonTabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={!!selected}
      className={cx(styles.buttonTab, styles[appearance], styles[size], selected && styles.selected, weight === 'semibold' && styles.semibold, className)}
      {...rest}
    >
      {icon && <Icon name={icon} size={size === 'lg' ? 18 : 16} />}
      {children != null && <span className={styles.btLabel}>{children}</span>}
    </button>
  );
}

export interface GroupTabProps {
  /** Libellés des segments (2 à 4). */
  items: { label?: ReactNode; icon?: IconName; value: string }[];
  value: string;
  onChange?: (value: string) => void;
  size?: 'sm' | 'lg';
  'aria-label'?: string;
}

/** GroupTab (20:13981) : contrôle segmenté, un seul segment actif. */
export function GroupTab({ items, value, onChange, size = 'lg', ...rest }: GroupTabProps) {
  return (
    <div role="tablist" className={cx(styles.group, styles[`g-${size}`])} {...rest}>
      {items.map((it) => (
        <button
          key={it.value}
          type="button"
          role="tab"
          aria-selected={it.value === value}
          className={cx(styles.segment, it.value === value && styles.segActive)}
          onClick={() => onChange?.(it.value)}
        >
          {it.icon && <Icon name={it.icon} size={16} />}
          {it.label}
        </button>
      ))}
    </div>
  );
}
