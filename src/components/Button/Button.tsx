import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import styles from './Button.module.css';

export type ButtonColor = 'brand' | 'neutral' | 'danger' | 'success' | 'warning' | 'purple';
export type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'ghost';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

/** Correspondance avec les jetons Figma : primary = fill, secondary = outline, tertiary = subtle, ghost = ghost. */
const styleOf: Record<ButtonType, 'fill' | 'outline' | 'subtle' | 'ghost'> = {
  primary: 'fill',
  secondary: 'outline',
  tertiary: 'subtle',
  ghost: 'ghost',
};

const iconSize: Record<ButtonSize, number> = { xs: 12, sm: 14, md: 16, lg: 18 };

/** Variables CSS d'un bouton, construites depuis les jetons Button/Button<Couleur>/<style>/*. */
export function buttonVars(color: ButtonColor, type: ButtonType): CSSProperties {
  const s = styleOf[type];
  const p = `--button-button${color}-${s}`;
  return {
    '--bg': `var(${p}-background-default)`,
    '--bg-hover': `var(${p}-background-hover)`,
    '--bg-pressed': `var(${p}-background-pressed)`,
    '--fg': `var(${p}-content-default)`,
    '--border': s === 'outline' ? `var(${p}-border-default)` : 'transparent',
  } as CSSProperties;
}

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'color'> {
  /** Libellé du bouton (propriété Figma `label`). */
  children?: ReactNode;
  color?: ButtonColor;
  /** Une seule primary par vue. */
  variant?: ButtonType;
  size?: ButtonSize;
  /** Icône à gauche (propriétés Figma `hasIconLeft` + `iconLeft`). */
  iconLeft?: IconName;
  /** Icône à droite (propriétés Figma `hasIconRight` + `iconRight`). */
  iconRight?: IconName;
  fullWidth?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  color = 'brand',
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  fullWidth,
  htmlType = 'button',
  className,
  style,
  ...rest
}: ButtonProps) {
  const cls = [styles.button, styles[size], fullWidth && styles.fullWidth, className].filter(Boolean).join(' ');
  return (
    <button type={htmlType} className={cls} style={{ ...buttonVars(color, variant), ...style }} {...rest}>
      {iconLeft && <Icon name={iconLeft} size={iconSize[size]} className={styles.icon} />}
      {children != null && children !== '' && <span className={styles.label}>{children}</span>}
      {iconRight && <Icon name={iconRight} size={iconSize[size]} className={styles.icon} />}
    </button>
  );
}

export interface ButtonIconProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'color' | 'style'> {
  icon: IconName;
  /** Texte lu par les lecteurs d'écran (le bouton n'a pas de libellé visible). */
  label: string;
  color?: Exclude<ButtonColor, 'warning'>;
  /** Style Figma : fill | outline | ghost | subtle. */
  appearance?: 'fill' | 'outline' | 'ghost' | 'subtle';
  size?: ButtonSize;
  htmlType?: 'button' | 'submit' | 'reset';
}

const typeOf = { fill: 'primary', outline: 'secondary', subtle: 'tertiary', ghost: 'ghost' } as const;

/** ButtonIcon : bouton carré sans libellé (5867:56798). */
export function ButtonIcon({
  icon,
  label,
  color = 'neutral',
  appearance = 'ghost',
  size = 'md',
  htmlType = 'button',
  className,
  ...rest
}: ButtonIconProps) {
  const cls = [styles.button, styles[size], styles.iconOnly, className].filter(Boolean).join(' ');
  return (
    <button type={htmlType} aria-label={label} title={label} className={cls} style={buttonVars(color, typeOf[appearance])} {...rest}>
      <Icon name={icon} size={iconSize[size]} />
    </button>
  );
}
