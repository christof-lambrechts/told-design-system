import type { HTMLAttributes } from 'react';
import styles from './AvatarGroup.module.css';

/** Teintes de présence (jetons --presence-*) : une par collaborateur, attribuée dans l'ordre ou par `color`. */
export type PresenceColor = 'teal' | 'pink' | 'orange' | 'purple' | 'lime' | 'green' | 'yellow' | 'slate';
export const presenceColors: PresenceColor[] = ['teal', 'pink', 'orange', 'purple', 'lime', 'green', 'yellow', 'slate'];

const initials = (n = '') => n.trim().split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('');

/** Teinte stable pour un identifiant (même personne, même couleur sur l'avatar et le curseur). */
export function presenceColorFor(id: string): PresenceColor {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return presenceColors[h % presenceColors.length];
}

export interface PresenceAvatarProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
  color?: PresenceColor;
  /** Fond sur lequel il est posé : le liseré prend la couleur du fond pour détacher les avatars qui se chevauchent. */
  surface?: 'light' | 'dark';
  src?: string;
}

/** _PresenceAvatar (8756:591) : rond de 28, initiales blanches sur la teinte de présence, liseré intérieur de 2 couleur du fond. */
export function PresenceAvatar({ name, color, surface = 'light', src, className, style, ...rest }: PresenceAvatarProps) {
  const c = color ?? presenceColorFor(name);
  return (
    <span className={[styles.avatar, surface === 'dark' && styles.onDark, className].filter(Boolean).join(' ')} role="img" aria-label={name} title={name}
      style={{ background: `var(--presence-${c})`, ...style }} {...rest}>
      {src ? <img src={src} alt="" /> : initials(name)}
    </span>
  );
}

export interface AvatarGroupProps {
  people: { name: string; color?: PresenceColor; src?: string }[];
  /** Nombre d'avatars visibles avant « +N ». */
  max?: number;
  surface?: 'light' | 'dark';
}

/** AvatarGroup (8756:656) : pile de présence, chevauchement −6, « +N » au-delà de `max`. */
export function AvatarGroup({ people, max = 3, surface = 'light' }: AvatarGroupProps) {
  const shown = people.length > max + 1 ? people.slice(0, max) : people;
  const rest = people.length - shown.length;
  return (
    <div className={styles.group} aria-label={`${people.length} personne${people.length > 1 ? 's' : ''} sur cette démo`}>
      {shown.map((p, i) => <PresenceAvatar key={p.name + i} name={p.name} color={p.color} src={p.src} surface={surface} />)}
      {rest > 0 && (
        <span className={[styles.avatar, styles.more, surface === 'dark' && styles.onDark].filter(Boolean).join(' ')} title={people.slice(max).map((p) => p.name).join(', ')}>+{rest}</span>
      )}
    </div>
  );
}
