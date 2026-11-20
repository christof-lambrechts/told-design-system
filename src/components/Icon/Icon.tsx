import type { SVGProps } from 'react';
import { icons } from './icons';
import { iconsStroke } from './iconsStroke';

/**
 * Icônes HugeIcons, 24 × 24, couleur du texte.
 * - `stroke` (par défaut) : contour arrondi, trait de 1,5 px à l'écran.
 * - `solid` : version pleine du fichier Figma (page « Atomes / Icons »), pour l'état actif (entrée de menu ou onglet sélectionné).
 */
export type IconName = keyof typeof icons;
export type IconVariant = 'stroke' | 'solid';
export const iconNames = Object.keys(icons) as IconName[];

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  /** Nom Figma sans « icon/ » (ex. `arrow-right-01`). */
  name: IconName;
  /** Taille en pixels : 12, 14, 16, 18, 20 ou 24. */
  size?: number;
  /** Plein par défaut (21/11) ; contour au repos dans les menus (NavButtonItem, entrées de DropdownMenu). Les chevrons restent en trait par défaut. */
  variant?: IconVariant;
}

/** Épaisseur du contour : 1,75 sur la grille de 24, épaissie aux petites tailles pour garder 1,5 px à l'écran (14, 16, 20). */
const strokeFor = (size: number) => Math.max(1.75, (1.5 * 24) / size);

/** Chevrons (arrow-up/down/left/right-01) : en trait par défaut, comme dans Figma (20/11). */
const CHEVRON = /^arrow-(up|down|left|right)-01$/;

export function Icon({ name, size = 20, variant: v, ...rest }: IconProps) {
  const variant: IconVariant = v ?? (CHEVRON.test(name) ? 'stroke' : 'solid');
  const outline = variant === 'stroke' ? iconsStroke[name] : undefined;
  if (outline) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeFor(size)}
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>
        {outline.map(([Tag, a], i) => {
          const T = Tag as 'path';
          return <T key={i} {...(a as object)} />;
        })}
      </svg>
    );
  }
  const paths = icons[name] ?? [];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...rest}>
      {paths.map((p, i) => (
        <path key={i} d={p[0]} {...(p[1] ? { fillRule: 'evenodd' as const, clipRule: 'evenodd' as const } : {})} />
      ))}
    </svg>
  );
}
