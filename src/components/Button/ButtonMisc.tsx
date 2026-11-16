import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button, type ButtonProps, type ButtonSize } from './Button';
import { Icon, type IconName } from '../Icon/Icon';
import styles from './ButtonMisc.module.css';

const iconSize: Record<ButtonSize, number> = { xs: 14, sm: 16, md: 18, lg: 20 };

export type ButtonDropdownStyle = 'fill' | 'outline' | 'flat' | 'light';
const dropdownVariant = { fill: 'primary', outline: 'secondary', flat: 'ghost', light: 'tertiary' } as const;

export interface ButtonDropdownProps extends Omit<ButtonProps, 'variant' | 'iconRight'> {
  /** Style Figma : fill, outline, flat (sans fond) ou light (fond léger). */
  appearance?: ButtonDropdownStyle;
  /** Menu ouvert (état Figma `selected`). */
  open?: boolean;
}

/** ButtonDropdown (5937:42255) : bouton qui ouvre un menu, chevron à droite. */
export function ButtonDropdown({ appearance = 'outline', open, ...rest }: ButtonDropdownProps) {
  return (
    <Button
      variant={dropdownVariant[appearance]}
      iconRight={open ? 'arrow-up-01' : 'arrow-down-01'}
      aria-haspopup="menu"
      aria-expanded={open}
      {...rest}
    />
  );
}

export type ButtonGradientStyle = 'full' | 'outline' | 'flat' | 'light';

export interface ButtonGradientProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'style'> {
  children: ReactNode;
  /** full = dégradé plein ; outline = contour dégradé ; flat = texte dégradé ; light = texte dégradé sur fond léger. */
  appearance?: ButtonGradientStyle;
  size?: ButtonSize;
  iconLeft?: IconName;
  iconRight?: IconName;
}

/** ButtonGradient (4576:14773) : réservé aux offres (UpgradeCard, page Offres). */
export function ButtonGradient({ children, appearance = 'full', size = 'md', iconLeft, iconRight, className, ...rest }: ButtonGradientProps) {
  const cls = [styles.gradient, styles[appearance], styles[size], className].filter(Boolean).join(' ');
  return (
    <button type="button" className={cls} {...rest}>
      {iconLeft && <Icon name={iconLeft} size={iconSize[size]} />}
      <span className={styles.label}>{children}</span>
      {iconRight && <Icon name={iconRight} size={iconSize[size]} />}
    </button>
  );
}

export interface ButtonLinkProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'color'> {
  children: ReactNode;
  color?: 'brand' | 'purple';
  size?: Exclude<ButtonSize, 'xs'>;
  /** false = sans marge, pour un lien posé dans un texte. */
  padding?: boolean;
  iconLeft?: IconName;
  /** Par défaut une flèche (icône Figma `arrow-right-02`) ; `null` pour aucune. */
  iconRight?: IconName | null;
  /** Rendu en lien `<a>` si une adresse est donnée. */
  href?: string;
}

/** ButtonLink (125:22418) : action texte présentée comme un lien. */
export function ButtonLink({ children, color = 'brand', size = 'md', padding = true, iconLeft, iconRight = 'arrow-right-02', href, className, ...rest }: ButtonLinkProps) {
  const cls = [styles.link, styles[`link-${color}`], styles[size], !padding && styles.flush, className].filter(Boolean).join(' ');
  const content = (
    <>
      {iconLeft && <Icon name={iconLeft} size={iconSize[size]} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size={iconSize[size]} />}
    </>
  );
  if (href) return <a className={cls} href={href}>{content}</a>;
  return <button type="button" className={cls} {...rest}>{content}</button>;
}
