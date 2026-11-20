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
        {iconLeft && <Icon name={iconLeft} size={16} variant={selected ? 'solid' : 'stroke'} />}
        {children}
        {count != null && <span className={styles.count}>{count}</span>}
        {iconRight && <Icon name={iconRight} size={16} variant={selected ? 'solid' : 'stroke'} />}
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
  /** color=inverse : sur l'en-tête sombre de l'éditeur (texte blanc, sélection blanc 12 %). */
  color?: 'default' | 'inverse';
  /** Point d'état après le libellé (ex. Diffuser : vert en ligne, rouge brouillon). */
  dot?: 'success' | 'danger';
  /** Libellé du point, lu par les lecteurs d'écran (« En ligne », « Brouillon »). */
  dotLabel?: string;
}

/** ButtonTab (3594:233176) : onglet bouton de l'éditeur (EditorHeader, Langues). */
export function ButtonTab({ children, appearance = 'fill', size = 'md', selected, icon, weight = 'medium', color = 'default', dot, dotLabel, className, ...rest }: ButtonTabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={!!selected}
      className={cx(styles.buttonTab, styles[appearance], color === 'inverse' && styles.inverse, styles[size], selected && styles.selected, weight === 'semibold' && styles.semibold, className)}
      {...rest}
    >
      {icon && <Icon name={icon} size={size === 'lg' ? 16 : 14} variant={selected ? 'solid' : 'stroke'} />}
      {children != null && <span className={styles.btLabel}>{children}</span>}
      {dot && <span className={cx(styles.btDot, styles[`dot-${dot}`])} role="img" aria-label={dotLabel} />}
    </button>
  );
}

export interface GroupTabProps {
  /** Libellés des segments (2 à 4). */
  items: { label?: ReactNode; icon?: IconName; value: string; /** Compteur après le libellé (hasCounter). */ count?: ReactNode }[];
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
          {it.icon && <Icon name={it.icon} size={16} variant={it.value === value ? 'solid' : 'stroke'} />}
          {it.label}
          {it.count != null && <span className={styles.segCount}>{it.count}</span>}
        </button>
      ))}
    </div>
  );
}
