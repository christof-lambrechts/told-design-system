import type { CSSProperties, ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import { Logo } from '../Logo/Logo';
import { Button } from '../Button/Button';
import { WidgetButton } from '../Widget/Widget';
import styles from './Tour.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export interface TourStepProps {
  /** modal : carte centrée de 886 avec image ; widget : carte de 314 (bulle). */
  format?: 'modal' | 'widget';
  /** Fond de l'étape (couleur de marque du client). */
  color?: string;
  /** dark : texte blanc (Figma text=white) ; light : texte noir (text=black). */
  tone?: 'dark' | 'light';
  /** Image : à gauche ou à droite (modale), en haut ou en bas. */
  image?: string;
  imagePosition?: 'left' | 'right' | 'top' | 'bottom';
  /** En-tête : expéditeur (avatar) ou barre de progression. */
  sender?: { name: ReactNode; avatar?: string };
  progress?: { current: number; total: number };
  /** Croix de fermeture dans l'en-tête (Figma close). */
  onClose?: () => void;
  /** Étiquette au-dessus du titre (« Nouvelle fonctionnalité »). */
  label?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Encadré sous le texte (disclamer). */
  notice?: ReactNode;
  /** Bouton d'action (Button brand primary md). */
  action?: { label: ReactNode; onClick?: () => void };
  /** Pied : logo, Précédent, Suivant (Figma hasWithFooter). */
  onPrevious?: () => void;
  onNext?: () => void;
  nextLabel?: ReactNode;
  showLogo?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** Étape de tour (TourItemBase, 3712:40132). Couleurs du pied et des boutons : jetons Widget/* en clair ou sombre selon `tone`. */
export function TourStep({
  format = 'widget', color = '#196f97', tone = 'dark', image, imagePosition = format === 'modal' ? 'right' : 'top',
  sender, progress, onClose, label, title, description, notice, action, onPrevious, onNext, nextLabel = 'Suivant', showLogo = true, className, style,
}: TourStepProps) {
  const hasHeader = !!(sender || progress || onClose);
  const horizontal = format === 'modal' && (imagePosition === 'left' || imagePosition === 'right');
  const img = image ? (horizontal
    ? <div role="img" aria-label="" className={cx(styles.image, styles.imageSide)} style={{ backgroundImage: `url("${image}")` }} />
    : <img src={image} alt="" className={styles.image} />) : null;
  const body = (
    <div className={styles.column}>
      {hasHeader && (
        <div className={styles.header}>
          <div className={styles.headRow}>
            {sender ? (
              <span className={styles.sender}>
                {sender.avatar ? <img src={sender.avatar} alt="" className={styles.avatar} /> : null}
                <span>{sender.name}</span>
              </span>
            ) : progress ? (
              <span className={styles.progress} role="progressbar" aria-valuemin={1} aria-valuemax={progress.total} aria-valuenow={progress.current}>
                {Array.from({ length: progress.total }, (_, i) => <span key={i} className={cx(styles.seg, i < progress.current && styles.segOn)} />)}
              </span>
            ) : <span />}
            {onClose && <button type="button" className={styles.close} onClick={onClose} aria-label="Fermer"><Icon name="cancel-01" size={12} /></button>}
          </div>
          {sender && progress && (
            <span className={styles.progress}>
              {Array.from({ length: progress.total }, (_, i) => <span key={i} className={cx(styles.seg, i < progress.current && styles.segOn)} />)}
            </span>
          )}
        </div>
      )}
      <div className={cx(styles.content, !hasHeader && styles.contentTop)}>
        {label && <span className={styles.label}>{label}</span>}
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.desc}>{description}</p>}
        {notice && <div className={styles.notice}>{notice}</div>}
        {action && <div><Button size="md" onClick={action.onClick}>{action.label}</Button></div>}
      </div>
      {(onPrevious || onNext || showLogo) && (
        <div className={styles.foot}>
          {showLogo ? <Logo size="xs" theme={tone === 'dark' ? 'dark' : 'light'} /> : <span />}
          <div className={styles.nav}>
            {onPrevious && <WidgetButton variant="ghost" size="sm" onClick={onPrevious}>Précédent</WidgetButton>}
            {onNext && <WidgetButton size="sm" onClick={onNext}>{nextLabel}</WidgetButton>}
          </div>
        </div>
      )}
    </div>
  );
  return (
    <div
      data-theme={tone}
      className={cx(styles.step, styles[format], horizontal && styles.row, className)}
      style={{ ['--tour-bg' as string]: color, ...style }}
    >
      {horizontal && imagePosition === 'left' && img}
      {!horizontal && imagePosition === 'top' && img}
      {body}
      {!horizontal && imagePosition === 'bottom' && img}
      {horizontal && imagePosition === 'right' && img}
    </div>
  );
}

export type TourArrow = 'top-left' | 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left';

export interface TourBubbleProps extends Omit<TourStepProps, 'format'> {
  /** Position de la flèche qui pointe l'élément expliqué (Widget-tour, 3715:41441). */
  arrow?: TourArrow;
}

/** Bulle ancrée : étape widget + flèche de 24 dans 8 positions. */
export function TourBubble({ arrow = 'top', ...rest }: TourBubbleProps) {
  return (
    <div className={cx(styles.bubble, styles[`arrow-${arrow}`])} style={{ ['--tour-bg' as string]: rest.color ?? '#196f97' }}>
      <span className={styles.arrow} aria-hidden="true" />
      <TourStep format="widget" {...rest} />
    </div>
  );
}

export interface TourWelcomeProps {
  /** minimal : titre et bouton ; extend : avec texte et image ; resume : sommaire des étapes à gauche. */
  variant?: 'minimal' | 'extend' | 'resume';
  tone?: 'dark' | 'light';
  color?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Sommaire (tour-resume-list) : la ligne active est mise en avant. */
  steps?: ReactNode[];
  activeStep?: number;
  image?: string;
  /** Étape affichée à droite (resume) ou contenu (extend). */
  children?: ReactNode;
  onStart?: () => void;
  startLabel?: ReactNode;
}

/** Modale d'accueil du tour (welcome-modale-tour, 3738:158203). */
export function TourWelcome({ variant = 'extend', tone = 'dark', color = '#20263a', title, subtitle, steps, activeStep = 0, image, children, onStart, startLabel = 'Commencer' }: TourWelcomeProps) {
  return (
    <div data-theme={tone} className={cx(styles.welcome, variant === 'resume' && styles.welcomeResume)} style={{ ['--tour-bg' as string]: color }}>
      {variant === 'resume' && (
        <aside className={styles.summary}>
          <h2 className={styles.welcomeTitle}>{title}</h2>
          {subtitle && <p className={styles.welcomeSub}>{subtitle}</p>}
          {steps && (
            <ol className={styles.list}>
              {steps.map((s, i) => <li key={i} className={cx(styles.item, i === activeStep && styles.itemOn)}><Icon name="arrow-right-02" size={14} variant="stroke" />{s}</li>)}
            </ol>
          )}
          {image && <img src={image} alt="" className={styles.summaryImg} />}
        </aside>
      )}
      <div className={styles.welcomeBody}>
        {variant !== 'resume' && image && <img src={image} alt="" className={styles.welcomeImg} />}
        {variant !== 'resume' && <h2 className={styles.welcomeTitle}>{title}</h2>}
        {variant !== 'resume' && subtitle && <p className={styles.welcomeSub}>{subtitle}</p>}
        {children}
        {onStart && <div className={styles.foot}><Logo size="xs" theme={tone === 'dark' ? 'dark' : 'light'} /><WidgetButton size="sm" onClick={onStart}>{startLabel}</WidgetButton></div>}
      </div>
    </div>
  );
}
