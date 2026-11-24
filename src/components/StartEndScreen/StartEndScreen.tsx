import { useEffect, useState, type ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import { WidgetButton } from '../Widget/Widget';
import type { Position } from '../OptionSidebar/PositionPicker';
import styles from './StartEndScreen.module.css';

const cx = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(' ');

export type ScreenLayout = 'centered' | 'split' | 'cover';
export type ScreenContext = 'slide' | 'vertical' | 'widget';

export interface ScreenAction {
  label: string;
  onClick?: () => void;
  href?: string;
  iconLeft?: IconName;
  iconRight?: IconName;
}

/* ---------- ScreenActions (Figma 9840:1656) ---------- */
export interface ScreenActionsProps {
  /** 1 à 3 boutons : principal (plein), secondaire (contour), tertiaire (sans fond). */
  actions: ScreenAction[];
  layout?: 'row' | 'stack';
  /** `dark` sur une photo ou un fond sombre (mise en page couverture). */
  surface?: 'default' | 'dark';
}

export function ScreenActions({ actions, layout = 'row', surface = 'default' }: ScreenActionsProps) {
  const variants = ['primary', 'secondary', 'ghost'] as const;
  return (
    <div className={cx(styles.actions, styles[`actions-${layout}`])}>
      {actions.slice(0, 3).map((a, i) => (
        a.href
          ? <a key={i} href={a.href} className={styles.actionLink}><WidgetButton tabIndex={-1} variant={variants[i]} surface={surface} iconLeft={a.iconLeft} iconRight={a.iconRight} className={styles.actionBtn}>{a.label}</WidgetButton></a>
          : <WidgetButton key={i} variant={variants[i]} surface={surface} iconLeft={a.iconLeft} iconRight={a.iconRight} onClick={a.onClick} className={styles.actionBtn}>{a.label}</WidgetButton>
      ))}
    </div>
  );
}

/* ---------- RewardBlock (Figma 9840:1575) ---------- */
export interface RewardBlockProps {
  type: 'code' | 'link' | 'points';
  title: ReactNode;
  description?: ReactNode;
  /** type=code : le code à copier. */
  code?: string;
  /** type=code : condition (« Valable jusqu'au 31 décembre »). */
  condition?: ReactNode;
  /** type=link : libellé et action du bouton. */
  actionLabel?: string;
  onAction?: () => void;
  href?: string;
  /** `dark` : boutons posés sur la photo (couverture en slide et en vertical). */
  surface?: 'default' | 'dark';
}

export function RewardBlock({ type, title, description, code, condition, actionLabel = 'Récupérer mon cadeau', onAction, href, surface = 'default' }: RewardBlockProps) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    if (!code) return;
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch { /* sélection manuelle */ }
  };
  return (
    <div className={styles.reward}>
      <div className={styles.rewardHead}>
        <span className={styles.rewardIcon} aria-hidden="true"><Icon name={type === 'points' ? 'star' : 'gift'} size={18} /></span>
        <span className={styles.rewardText}><strong>{title}</strong>{description && <span>{description}</span>}</span>
      </div>
      {type === 'code' && code && (
        <div className={styles.codeRow}>
          <output className={styles.code} aria-label="Code de réduction">{code}</output>
          <WidgetButton variant="secondary" surface={surface} iconLeft={copied ? 'tick-02' : undefined} onClick={copy} aria-live="polite">{copied ? 'Copié' : 'Copier'}</WidgetButton>
        </div>
      )}
      {type === 'code' && condition && <span className={styles.condition}>{condition}</span>}
      {type === 'link' && (href
        ? <a href={href} className={styles.actionLink}><WidgetButton tabIndex={-1} surface={surface} className={styles.actionBtn}>{actionLabel}</WidgetButton></a>
        : <WidgetButton onClick={onAction} surface={surface} className={styles.actionBtn}>{actionLabel}</WidgetButton>)}
    </div>
  );
}

/* ---------- Countdown (Figma 9847:684) ---------- */
export interface CountdownProps {
  /** Date de fin. Le bloc disparaît une fois passée. */
  until: Date | string | number;
  label?: ReactNode;
}

export function Countdown({ until, label = 'L’offre se termine dans' }: CountdownProps) {
  const end = new Date(until).getTime();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const left = Math.max(0, Math.floor((end - now) / 1000));
  if (left <= 0) return null;
  const parts: [number, string][] = [[Math.floor(left / 86400), 'jours'], [Math.floor(left / 3600) % 24, 'heures'], [Math.floor(left / 60) % 60, 'min'], [left % 60, 's']];
  return (
    <div className={styles.countdown} role="timer" aria-label={`${parts[0][0]} jours, ${parts[1][0]} heures, ${parts[2][0]} minutes`}>
      <span className={styles.cdLabel}>{label}</span>
      <span className={styles.cdRow} aria-hidden="true">
        {parts.map(([v, u]) => <span key={u} className={styles.cdBox}><strong>{String(v).padStart(2, '0')}</strong><span>{u}</span></span>)}
      </span>
    </div>
  );
}

/* ---------- SocialLinks (Figma 9847:699) ---------- */
export interface SocialLinksProps {
  links: { network: 'linkedin' | 'x' | 'facebook' | 'instagram' | 'youtube'; href: string }[];
}
const NETWORKS: Record<SocialLinksProps['links'][number]['network'], [IconName, string]> = {
  linkedin: ['linkedin-01', 'LinkedIn'], x: ['new-twitter', 'X'], facebook: ['facebook-01', 'Facebook'], instagram: ['instagram', 'Instagram'], youtube: ['youtube-02', 'YouTube'],
};

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className={styles.social}>
      {links.map((l) => { const [icon, name] = NETWORKS[l.network]; return (
        <a key={l.network} href={l.href} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label={name}><Icon name={icon} size={18} /></a>
      ); })}
    </div>
  );
}

/* ---------- StartScreen / EndScreen (Figma 9842:591, 9842:806) ----------
   slide = 960 × 540 et vertical = 540 × 960, à la taille logique de la slide : le lecteur les met à l'échelle comme les autres slides. widget = 300 de large. */
export interface ScreenProps {
  layout?: ScreenLayout;
  context?: ScreenContext;
  logo?: ReactNode;
  /** Image ou vidéo (URL) ; en couverture, elle sert de fond. */
  media?: { src: string; alt?: string; type?: 'image' | 'video' };
  title: ReactNode;
  description?: ReactNode;
  actions?: ScreenAction[];
  /** Fond de l'écran (couleur du kit ou du widget). */
  background?: string;
  /**
   * Place du texte et du logo dans leur zone (PositionPicker `item="text"`), sans bouger l'image : en haut, au milieu ou en bas, et
   * aligné à gauche, centré ou à droite selon la colonne. Par défaut : centré au milieu en `centered`,
   * à gauche au milieu en `split`, à gauche en bas en `cover`.
   */
  textPosition?: Position;
  /**
   * Côté de l'image en style `split`, séparé de la position du texte : `right` (par défaut) ou `left`
   * en slide, pour alterner des écrans « inversés » ; `top` (par défaut) ou `bottom` en vertical.
   */
  mediaSide?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
}

export interface EndScreenProps extends ScreenProps {
  reward?: RewardBlockProps;
  keyPoints?: ReactNode[];
  countdown?: CountdownProps;
  social?: SocialLinksProps['links'];
}

function Screen({ kind, layout = 'centered', context = 'slide', logo, media, title, description, actions = [], background, textPosition, mediaSide, className, children }: ScreenProps & { kind: 'start' | 'end'; children?: ReactNode }) {
  const cover = layout === 'cover';
  const dark = cover && context !== 'widget';
  const Media = media && (media.type === 'video'
    ? <video className={styles.media} src={media.src} autoPlay muted loop playsInline aria-label={media.alt} />
    : <img className={styles.media} src={media.src} alt={media.alt ?? ''} />);
  return (
    <section className={cx(styles.screen, styles[`l-${layout}`], styles[`c-${context}`], dark && styles.dark, textPosition && styles[`tv-${textPosition.split('-')[0] === 'center' ? 'middle' : textPosition.split('-')[0]}`], textPosition && styles[`th-${textPosition === 'center' ? 'center' : textPosition.split('-')[1]}`], layout === 'split' && (mediaSide === 'left' || mediaSide === 'bottom') && styles.mediaFlip, className)} style={background ? { background } : undefined} aria-label={kind === 'start' ? 'Écran de début' : 'Écran de fin'}>
      {Media && <div className={styles.mediaBox}>{Media}</div>}
      {dark && <span className={styles.veil} aria-hidden="true" />}
      <div className={styles.content}>
        {logo && <div className={styles.logo}>{logo}</div>}
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
        {children}
        {actions.length > 0 && <ScreenActions actions={actions} layout={context === 'widget' ? 'stack' : 'row'} surface={dark ? 'dark' : 'default'} />}
      </div>
    </section>
  );
}

/** StartScreen : écran de début commun (Annonce, démo, survey, Product Tour). Un bouton principal qui lance. */
export function StartScreen(props: ScreenProps) {
  return <Screen kind="start" {...props} />;
}

/** EndScreen : écran de fin commun. Message, 1 à 3 boutons, récompense, points clés, compte à rebours, réseaux sociaux. */
export function EndScreen({ reward, keyPoints, countdown, social, ...props }: EndScreenProps) {
  const dark = props.layout === 'cover' && props.context !== 'widget';
  return (
    <Screen kind="end" {...props}>
      {keyPoints && keyPoints.length > 0 && (
        <ul className={styles.keyPoints}>{keyPoints.map((k, i) => <li key={i}><Icon name="tick-02" size={16} aria-hidden="true" />{k}</li>)}</ul>
      )}
      {reward && <RewardBlock surface={dark ? 'dark' : 'default'} {...reward} />}
      {countdown && <Countdown {...countdown} />}
      {social && social.length > 0 && <SocialLinks links={social} />}
    </Screen>
  );
}
