import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import styles from './FloatingToolbar.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export interface ToolbarItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  icon: IconName;
  /** Libellé sous l'icône, ou lu par les lecteurs d'écran si `showLabel` est faux. */
  label: string;
  showLabel?: boolean;
  /** Outil actif : fond de marque, icône pleine. */
  active?: boolean;
}

/** _ToolbarItem (8742:1537) : icône en contour, pleine quand l'outil est actif. */
export function ToolbarItem({ icon, label, showLabel = true, active, className, ...rest }: ToolbarItemProps) {
  return (
    <button type="button" aria-pressed={!!active} aria-label={showLabel ? undefined : label} title={showLabel ? undefined : label}
      className={cx(styles.item, active && styles.active, showLabel && styles.withLabel, className)} {...rest}>
      <Icon name={icon} size={18} variant="solid" />
      {showLabel && <span className={styles.label}>{label}</span>}
    </button>
  );
}

export interface FloatingToolbarProps {
  children: ReactNode;
  theme?: 'light' | 'dark';
  'aria-label'?: string;
}

/** FloatingToolbar (8742:1646) : barre d'outils flottante de l'éditeur (curseur, zoom, infobulle, floutage…). Séparer les groupes avec `ToolbarDivider`. */
export function FloatingToolbar({ children, theme = 'light', ...rest }: FloatingToolbarProps) {
  return (
    <div role="toolbar" aria-label={rest['aria-label'] ?? 'Outils'} className={styles.bar} {...(theme === 'dark' ? { 'data-theme': 'dark' } : {})}>
      {children}
    </div>
  );
}

export function ToolbarDivider() {
  return <span className={styles.divider} aria-hidden="true" />;
}
