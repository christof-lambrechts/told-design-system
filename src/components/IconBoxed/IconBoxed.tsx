import { Icon, type IconName } from '../Icon/Icon';

export type IconBoxedColor = 'brand' | 'purple' | 'pink' | 'orange' | 'green' | 'cyan' | 'yellow' | 'red' | 'gray';

const palette: Record<IconBoxedColor, string> = {
  brand: 'var(--brand-color-brand)', purple: 'var(--brand-color-purple)', pink: 'var(--brand-color-pink)', orange: 'var(--brand-color-orange)',
  green: 'var(--brand-color-shamrock)', cyan: 'var(--brand-color-cyan)', yellow: 'var(--brand-color-mustard)', red: 'var(--brand-color-red)', gray: 'var(--content-subtle-default)',
};

export interface IconBoxedProps {
  icon: IconName;
  color?: IconBoxedColor;
  /** filled = pastille pleine, icône blanche ; subtle = pastille teintée, icône colorée. */
  appearance?: 'filled' | 'subtle';
  size?: number;
}

/** Version simplifiée d'IconBoxedColor (4:4197) : icône dans une pastille colorée, rayon ≈ 22 % de la taille. */
export function IconBoxed({ icon, color = 'brand', appearance = 'subtle', size = 18 }: IconBoxedProps) {
  const c = palette[color];
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none', width: size, height: size, borderRadius: size * 0.22,
        background: appearance === 'filled' ? c : `color-mix(in srgb, ${c} 14%, transparent)`, color: appearance === 'filled' ? '#fff' : c,
      }}
    >
      <Icon name={icon} size={Math.round(size * 0.62)} />
    </span>
  );
}
