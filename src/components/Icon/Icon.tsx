import type { SVGProps } from 'react';
import { icons } from './icons';

/** Icônes HugeIcons (Solid Standard) exportées de la page Figma « Atomes / Icons » : 24 × 24, couleur du texte. */
export type IconName = keyof typeof icons;
export const iconNames = Object.keys(icons) as IconName[];

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  /** Nom Figma sans « icon/ » (ex. `arrow-right-01`). */
  name: IconName;
  /** Taille en pixels : 14, 16, 18, 20 ou 24. */
  size?: number;
}

export function Icon({ name, size = 20, ...rest }: IconProps) {
  const paths = icons[name] ?? [];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...rest}>
      {paths.map((p, i) => (
        <path key={i} d={p[0]} {...(p[1] ? { fillRule: 'evenodd' as const, clipRule: 'evenodd' as const } : {})} />
      ))}
    </svg>
  );
}
