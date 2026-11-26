import type { HTMLAttributes } from 'react';
import { Icon } from '../Icon/Icon';
import styles from './Avatar.module.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** xs 12, sm 16, md 20, lg 24, xl 32, 2xl 40, 3xl 60. */
  size?: AvatarSize;
  /** Propriété Figma `style` : text (initiales), icon, image, logo. Déduit de `src` ou `name` si absent. */
  appearance?: 'text' | 'icon' | 'image' | 'logo';
  /** Nom complet : sert aux initiales et au texte alternatif. */
  name?: string;
  /** Photo ou logo. */
  src?: string;
  /** Initiales déjà calculées (prioritaires sur celles tirées de `name`). */
  initials?: string;
  /** Liseré blanc pour un avatar posé sur un autre (groupe). */
  outline?: boolean;
}

const initials = (n = '') => n.trim().split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('');

/** Avatar (1053:144214) : carré arrondi, initiales sur le bleu de marque, icône, photo ou logo. */
export function Avatar({ size = 'xl', appearance, name, src, initials: given, outline, className, ...rest }: AvatarProps) {
  const kind = appearance ?? (src ? 'image' : name || given ? 'text' : 'icon');
  const cls = [styles.avatar, styles[`s${size}`], styles[kind], outline && styles.outline, className].filter(Boolean).join(' ');
  return (
    <span className={cls} role="img" aria-label={name} title={name} {...rest}>
      {(kind === 'image' || kind === 'logo') && src ? <img src={src} alt="" /> : kind === 'text' ? (given?.slice(0, 2).toUpperCase() ?? initials(name)) : <Icon name="user" variant="solid" size={{ xs: 6, sm: 8, md: 10, lg: 12, xl: 16, '2xl': 20, '3xl': 24 }[size]} />}
    </span>
  );
}
