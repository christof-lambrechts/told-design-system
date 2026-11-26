import type { CSSProperties } from 'react';
import { TOLDIE_DATA, TOLDIE_NAMES, type ToldieName } from './toldies';

export { TOLDIE_NAMES, type ToldieName };

/** Toldie attribué de façon stable à une équipe ou une organisation (même identifiant, même Toldie). */
export function toldieFor(seed: string): ToldieName {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  return TOLDIE_NAMES[(h >>> 0) % TOLDIE_NAMES.length];
}

/** Toldie au hasard, à enregistrer à la création d'une équipe ou d'une organisation. */
export function randomToldie(): ToldieName {
  return TOLDIE_NAMES[Math.floor(Math.random() * TOLDIE_NAMES.length)];
}

export interface ToldieProps {
  name: ToldieName;
  /** Côté en px (32 par défaut). */
  size?: number;
  /** Rayon en px (8 par défaut, comme le logo du ProjectSwitcher). */
  radius?: number;
  className?: string;
  style?: CSSProperties;
  /** Texte pour les lecteurs d'écran ; décoratif sinon. */
  label?: string;
}

/** Toldie (Figma Toldies, carré arrondi en couleur) : logo par défaut d'une équipe ou d'une organisation. */
export function Toldie({ name, size = 32, radius = 8, className, style, label }: ToldieProps) {
  const t = TOLDIE_DATA[name] ?? TOLDIE_DATA[TOLDIE_NAMES[0]];
  const r = (radius * 24) / size;
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none"
      role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <rect width="24" height="24" rx={r} fill={t.bg} />
      {t.paths.map(([fill, eo, d], i) => <path key={i} d={d} fill={fill} fillRule={eo ? 'evenodd' : undefined} clipRule={eo ? 'evenodd' : undefined} />)}
    </svg>
  );
}
