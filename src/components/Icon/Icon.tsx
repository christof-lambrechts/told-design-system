import type { SVGProps } from 'react';
import { icons } from './icons';
import { iconsStroke } from './iconsStroke';

/**
 * Icônes HugeIcons, 24 × 24, couleur du texte.
 * - `stroke` (par défaut) : contour arrondi, trait de 1,5.
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
  /** Contour (par défaut) ou plein. */
  variant?: IconVariant;
}

/** Épaisseur du contour : 1,5 sur la grille de 24, épaissie aux petites tailles pour garder au moins 1,25 px à l'écran. */
const strokeFor = (size: number) => Math.max(1.5, (1.25 * 24) / size);

export function Icon({ name, size = 20, variant = 'stroke', ...rest }: IconProps) {
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
