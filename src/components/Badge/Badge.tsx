import type { HTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import styles from './Badge.module.css';

export type BadgeColor = 'blue' | 'tree' | 'green' | 'orange' | 'red' | 'purple' | 'light-gray' | 'white' | 'pink-gradient';
export type BadgeStyle = 'subtle' | 'outline' | 'fill';
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color' | 'style'> {
  children: ReactNode;
  /** blue (information, Construire), green (en ligne, succès), orange (attention, obligatoire), red (erreur), purple (Analyser, IA), tree (Diffuser), light-gray (brouillon, neutre), white (sur fond sombre), pink-gradient (Pro, nouveauté). */
  color?: BadgeColor;
  /** Propriété Figma `style`. */
  appearance?: BadgeStyle;
  size?: BadgeSize;
  icon?: IconName;
}

/** Badge (2794:179295) : statut figé d'un objet ou étiquette non cliquable. Si ça se clique, prendre Tag. */
export function Badge({ children, color = 'light-gray', appearance = 'subtle', size = 'sm', icon, className, ...rest }: BadgeProps) {
  const c = color === 'light-gray' ? 'gray-light' : color;
  const cls = [styles.badge, styles[size], styles[appearance], color === 'pink-gradient' && styles.gradient, className].filter(Boolean).join(' ');
  return (
    <span className={cls} data-color={c} {...rest}>
      {icon && <Icon name={icon} size={size === 'xs' ? 10 : size === 'sm' ? 12 : 14} variant="solid" />}
      <span className={styles.text}>{children}</span>
    </span>
  );
}
