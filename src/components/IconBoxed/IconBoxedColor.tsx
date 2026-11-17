import { Icon, type IconName } from '../Icon/Icon';
import { boxedArtwork, boxedData } from './iconBoxedData';

export type IconBoxedColorName = keyof typeof boxedData | 'behaviour' | 'slack' | 'type-recompense';
export const iconBoxedColorNames = [...Object.keys(boxedData), ...Object.keys(boxedArtwork)] as IconBoxedColorName[];
/** Pictos qui ont une version teintée (style subtle). */
export const iconBoxedColorSubtle = Object.keys(boxedData).filter((k) => boxedData[k].subtle) as IconBoxedColorName[];

export interface IconBoxedColorProps {
  /** Valeur de la propriété Figma `icon` (ex. `questionnps`, `format-widget`). */
  icon: IconBoxedColorName;
  /** filled = pastille pleine (par défaut) ; subtle = pastille pâle, icône colorée. Retombe sur filled si le picto n'a pas de version teintée. */
  appearance?: 'filled' | 'subtle';
  /** 24 (menus, listes), 32 (cartes, ajout de bloc) ou 40 (en-têtes, bannières). */
  size?: number;
  title?: string;
}

/** IconBoxedColor (4:4197) : icône HugeIcons pleine dans une pastille de couleur, rayon 5 pour 24, icône 14 pour 24. */
export function IconBoxedColor({ icon, appearance = 'filled', size = 24, title }: IconBoxedColorProps) {
  const radius = (size * 5) / 24;
  const a11y = title ? { role: 'img' as const, 'aria-label': title } : { 'aria-hidden': true as const };
  const art = boxedArtwork[icon];
  if (art) return <img src={art} width={size} height={size} alt={title ?? ''} style={{ display: 'inline-block', flex: 'none', borderRadius: radius }} />;
  const d = boxedData[icon];
  if (!d) return null;
  const [bg, fg, inner] = (appearance === 'subtle' && d.subtle) || d.filled;
  return (
    <span {...a11y} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none', width: size, height: size, borderRadius: radius, background: bg, color: fg }}>
      <Icon name={inner as IconName} variant="solid" size={Math.round((size * 14) / 24)} />
    </span>
  );
}
