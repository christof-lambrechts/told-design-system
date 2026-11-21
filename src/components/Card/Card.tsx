import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import { IconBoxedColor, type IconBoxedColorName } from '../IconBoxed/IconBoxedColor';
import { Badge } from '../Badge/Badge';
import styles from './Card.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export interface CardHeaderProps {
  /** Picto du type (IconBoxedColor 20). */
  icon?: IconBoxedColorName;
  title: ReactNode;
  description?: ReactNode;
  /** Niveau du titre (h3 par défaut, `false` pour un simple texte). */
  headingLevel?: 2 | 3 | 4 | false;
  /** À droite : interrupteur Obligatoire, badge Format, Premium, bouton… */
  actions?: ReactNode;
  /** Filet sous l'en-tête (vrai par défaut). */
  divider?: boolean;
  className?: string;
}

/**
 * CardHeader (554:39303, ex-EditionCardHeader) : en-tête de carte commun à la plateforme
 * (cartes d'édition, résultats, Diffuser). Marges 16, titre Body/14/Semibold.
 */
export function CardHeader({ icon, title, description, headingLevel = 3, actions, divider = true, className }: CardHeaderProps) {
  const H = headingLevel ? (`h${headingLevel}` as const) : 'span';
  return (
    <div className={cx(styles.header, divider && styles.divider, className)}>
      <div className={styles.headText}>
        <div className={styles.headTitleRow}>
          {icon && <IconBoxedColor icon={icon} size={20} />}
          <H className={styles.headTitle}>{title}</H>
        </div>
        {description && <p className={styles.headDesc}>{description}</p>}
      </div>
      {actions && <div className={styles.headActions}>{actions}</div>}
    </div>
  );
}

export interface CardProps {
  header?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Carte : fond Neutral/surface/default, contour Neutral/border/default, rayon 16. Rubriques (ChannelSection) séparées par un filet. */
export function Card({ header, children, className }: CardProps) {
  return <section className={cx(styles.card, className)}>{header}{children}</section>;
}

export interface ChannelSectionProps {
  /** Numéro de la rubrique (pastille). */
  number?: number;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/** ChannelSection (9155:3205) : rubrique numérotée d'une carte de canal (Diffuser). Marges 20, écart 12. Boutons en lg dans les rubriques, champs md ou lg. */
export function ChannelSection({ number, title, description, children, className }: ChannelSectionProps) {
  return (
    <div className={cx(styles.section, className)}>
      <div className={styles.sectionHead}>
        <div className={styles.sectionTitleRow}>
          {number != null && <span className={styles.number} aria-hidden="true">{number}</span>}
          <h4 className={styles.sectionTitle}>{number != null && <span className={styles.srOnly}>{number}. </span>}{title}</h4>
        </div>
        {description && <p className={styles.sectionDesc}>{description}</p>}
      </div>
      {children && <div className={styles.sectionBody}>{children}</div>}
    </div>
  );
}

export interface SelectionCardData {
  value: string;
  title: ReactNode;
  description?: ReactNode;
  icon?: IconName;
  /** Badge (« Bientôt », « New »). */
  badge?: ReactNode;
  disabled?: boolean;
}

export interface SelectionCardGroupProps {
  options: SelectionCardData[];
  value: string;
  onChange: (value: string) => void;
  size?: 'md' | 'lg';
  /** `tabs` (défaut) : menu à onglets avec description (menu de l'éditeur, canaux de Diffuser) ; `radio` : choix dans un formulaire. */
  kind?: 'tabs' | 'radio';
  'aria-label'?: string;
  className?: string;
}

/**
 * SelectionCard (4625:104218) : cartes à icône, titre et description, une seule cochée.
 * Sert de menu à onglets avec description (EditionSidebar, canaux de Diffuser) : pas d'interrupteur dans la carte.
 */
export function SelectionCardGroup({ options, value, onChange, size = 'md', kind = 'tabs', className, ...rest }: SelectionCardGroupProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const enabled = options.map((o, i) => (o.disabled ? -1 : i)).filter((i) => i >= 0);
  const current = options.findIndex((o) => o.value === value);
  const tabbable = enabled.includes(current) ? current : enabled[0];
  const onKey = (e: KeyboardEvent, i: number) => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(e.key)) return;
    e.preventDefault();
    const pos = enabled.indexOf(i);
    const next = enabled[(pos + (e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1) + enabled.length) % enabled.length];
    refs.current[next]?.focus(); onChange(options[next].value);
  };
  const tabs = kind === 'tabs';
  return (
    <div role={tabs ? 'tablist' : 'radiogroup'} aria-orientation={tabs ? 'vertical' : undefined} aria-label={rest['aria-label']} className={cx(styles.selGroup, className)}>
      {options.map((o, i) => {
        const on = o.value === value;
        return (
          <button key={o.value} ref={(el) => { refs.current[i] = el; }} type="button" role={tabs ? 'tab' : 'radio'}
            aria-selected={tabs ? on : undefined} aria-checked={tabs ? undefined : on} disabled={o.disabled}
            tabIndex={i === tabbable ? 0 : -1} className={cx(styles.sel, styles[`sel-${size}`], on && styles.selOn)}
            onClick={() => onChange(o.value)} onKeyDown={(e) => onKey(e, i)}>
            <span className={styles.selTitleRow}>
              {o.icon && <Icon name={o.icon} size={size === 'lg' ? 18 : 16} />}
              <span className={styles.selTitle}>{o.title}</span>
              {o.badge && <Badge color="purple" size="sm" className={styles.selBadge}>{o.badge}</Badge>}
            </span>
            {o.description && <span className={styles.selDesc}>{o.description}</span>}
          </button>
        );
      })}
    </div>
  );
}
