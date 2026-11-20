import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ElementType, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import styles from './Button.module.css';

export type ButtonColor = 'brand' | 'neutral' | 'danger' | 'success' | 'warning' | 'purple' | 'ai' | 'rec';
/** primary (plein) · primary-outline (contour de la couleur) · secondary-outline (contour gris clair, moins d'accent) · tertiary (fond teinté) · ghost.
 *  `secondary` reste accepté et vaut `primary-outline` (ancien nom). */
export type ButtonType = 'primary' | 'primary-outline' | 'secondary-outline' | 'secondary' | 'tertiary' | 'ghost';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

/** Correspondance avec les jetons Figma : primary = fill, primary-outline et secondary-outline = outline, tertiary = subtle, ghost = ghost. */
const styleOf: Record<ButtonType, 'fill' | 'outline' | 'subtle' | 'ghost'> = {
  primary: 'fill',
  'primary-outline': 'outline',
  'secondary-outline': 'outline',
  secondary: 'outline',
  tertiary: 'subtle',
  ghost: 'ghost',
};

const iconSize: Record<ButtonSize, number> = { xs: 12, sm: 14, md: 16, lg: 18 };

/** Variables CSS d'un bouton, construites depuis les jetons Button/Button<Couleur>/<style>/*. */
export function buttonVars(color: ButtonColor, type: ButtonType): CSSProperties {
  if (color === 'ai' || color === 'rec') return {};
  const s = styleOf[type];
  const p = `--button-button${color}-${s}`;
  return {
    '--bg': `var(${p}-background-default)`,
    '--bg-hover': `var(${p}-background-hover)`,
    '--bg-pressed': `var(${p}-background-pressed)`,
    '--fg': `var(${p}-content-default)`,
    '--border': type === 'secondary-outline' ? 'var(--button-buttonsecondaryoutline-border-default)' : s === 'outline' ? `var(${p}-border-default)` : 'transparent',
    '--border-hover': type === 'secondary-outline' ? 'var(--button-buttonsecondaryoutline-border-hover)' : s === 'outline' ? `var(${p}-border-default)` : 'transparent',
  } as CSSProperties;
}

/** D-016 : attributs d'ancre transmis quand le bouton est un lien (`href`). */
type AnchorProps = Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel' | 'download' | 'hrefLang' | 'referrerPolicy' | 'ping'>;
const BUTTON_ONLY = ['disabled', 'form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget', 'name', 'value'];
/** Props d'un lien : tout sauf les attributs propres au <button> ; rel sûr par défaut pour un nouvel onglet. */
function linkProps(rest: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(rest)) if (!BUTTON_ONLY.includes(k)) out[k] = v;
  if (out.target === '_blank' && out.rel === undefined) out.rel = 'noopener noreferrer';
  if (rest.disabled) { out['aria-disabled'] = true; out.tabIndex = -1; out.onClick = (e: Event) => e.preventDefault(); }
  return out;
}

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'color'>, AnchorProps {
  /** Libellé du bouton (propriété Figma `label`). */
  children?: ReactNode;
  color?: ButtonColor;
  /** ai : action IA (contour dégradé violet → bleu, texte et étoile violets ; `variant` ignoré). rec : démarrer un enregistrement (rouge, point blanc ; `variant` ignoré). */
  /** Une seule primary par vue. */
  variant?: ButtonType;
  size?: ButtonSize;
  /** Icône à gauche (propriétés Figma `hasIconLeft` + `iconLeft`). */
  iconLeft?: IconName;
  /** Icône à droite (propriétés Figma `hasIconRight` + `iconRight`). */
  iconRight?: IconName;
  fullWidth?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
  /** D-006 : rend un lien avec l'apparence du bouton. */
  href?: string;
  /** Composant de lien du routeur (ex. Link de Next), sinon <a>. */
  linkAs?: ElementType;
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
  href,
  linkAs,
  className,
  style,
  ...rest
}: ButtonProps) {
  const special = color === 'ai' ? styles.ai : color === 'rec' ? styles.rec : undefined;
  const cls = [styles.button, styles[size], special, fullWidth && styles.fullWidth, className].filter(Boolean).join(' ');
  /* ai : étoile violette intégrée ; rec : point blanc intégré (icône dot). */
  const lead: IconName | undefined = color === 'ai' ? 'ai-magic' : color === 'rec' ? 'dot' : iconLeft;
  const inner = (
    <>
      {lead && <Icon name={lead} size={iconSize[size]} variant={color === 'ai' || color === 'rec' ? 'solid' : undefined} className={styles.icon} />}
      {children != null && children !== '' && <span className={styles.label}>{children}</span>}
      {iconRight && <Icon name={iconRight} size={iconSize[size]} className={styles.icon} />}
    </>
  );
  if (href) {
    const L = linkAs ?? 'a';
    return <L href={href} {...linkProps(rest)} className={cls} style={{ ...buttonVars(color, variant), ...style }}>{inner}</L>;
  }
  return (
    <button type={htmlType} className={cls} style={{ ...buttonVars(color, variant), ...style }} {...rest}>
      {inner}
    </button>
  );
}

export interface ButtonIconProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'color' | 'style'>, AnchorProps {
  icon: IconName;
  /** Texte lu par les lecteurs d'écran (le bouton n'a pas de libellé visible). */
  label: string;
  color?: Exclude<ButtonColor, 'warning' | 'ai' | 'rec'>;
  /** Style Figma : fill | outline | ghost | subtle. */
  appearance?: 'fill' | 'outline' | 'ghost' | 'subtle';
  size?: ButtonSize;
  htmlType?: 'button' | 'submit' | 'reset';
  /** D-006 : rend un lien. */
  href?: string;
  linkAs?: ElementType;
}

const typeOf = { fill: 'primary', outline: 'primary-outline', subtle: 'tertiary', ghost: 'ghost' } as const;

/** ButtonIcon : bouton carré sans libellé (5867:56798). */
export function ButtonIcon({
  icon,
  label,
  color = 'neutral',
  appearance = 'ghost',
  size = 'md',
  htmlType = 'button',
  href,
  linkAs,
  className,
  ...rest
}: ButtonIconProps) {
  const cls = [styles.button, styles[size], styles.iconOnly, className].filter(Boolean).join(' ');
  if (href) {
    const L = linkAs ?? 'a';
    return <L href={href} title={label} {...linkProps(rest)} aria-label={label} className={cls} style={buttonVars(color, typeOf[appearance])}><Icon name={icon} size={iconSize[size]} /></L>;
  }
  return (
    <button type={htmlType} aria-label={label} title={label} className={cls} style={buttonVars(color, typeOf[appearance])} {...rest}>
      <Icon name={icon} size={iconSize[size]} />
    </button>
  );
}
