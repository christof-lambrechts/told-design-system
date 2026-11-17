import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import { Logo } from '../Logo/Logo';
import styles from './Widget.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

/* ---------- WidgetButton (8233:10717) ---------- */
export interface WidgetButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
  iconLeft?: IconName;
  iconRight?: IconName;
}

/** Boutons du widget côté répondant (noir sur clair, blanc sur sombre). */
export function WidgetButton({ children, variant = 'primary', size = 'md', iconLeft, iconRight, className, ...rest }: WidgetButtonProps) {
  return (
    <button type="button" className={cx(styles.wbtn, styles[`wb-${variant}`], styles[`wb-${size}`], className)} {...rest}>
      {iconLeft && <Icon name={iconLeft} variant="solid" size={16} />}
      {children}
      {iconRight && <Icon name={iconRight} variant="solid" size={16} />}
    </button>
  );
}

/* ---------- WidgetChoice (7995:1312) ---------- */
export interface WidgetChoiceProps {
  label: ReactNode;
  /** Lettre du raccourci clavier (A, B, C…). */
  letter?: string;
  selected?: boolean;
  /** Choix multiples : case à cocher au lieu d'un choix unique. */
  multiple?: boolean;
  onClick?: () => void;
}

/** Un choix du widget visiteur : lettre en touche clavier + libellé. */
export function WidgetChoice({ label, letter, selected, multiple, onClick }: WidgetChoiceProps) {
  return (
    <button type="button" role={multiple ? 'checkbox' : 'radio'} aria-checked={!!selected} className={cx(styles.choice, selected && styles.choiceSel)} onClick={onClick}>
      {letter && <kbd className={styles.letter}>{letter}</kbd>}
      <span className={styles.choiceLabel}>{label}</span>
    </button>
  );
}

/* ---------- ChecklistItem (8036:4506) ---------- */
export interface ChecklistItemProps {
  title: ReactNode;
  description?: ReactNode;
  state?: 'todo' | 'current' | 'done';
  actionLabel?: ReactNode;
  onAction?: () => void;
}

/** Un point de la checklist du widget : coche, titre, description, bouton « Me guider ». */
export function ChecklistItem({ title, description, state = 'todo', actionLabel = 'Me guider', onAction }: ChecklistItemProps) {
  return (
    <div className={cx(styles.check, styles[`ck-${state}`])}>
      <span className={styles.tick}>{state === 'done' && <Icon name="tick-02" size={12} />}</span>
      <div className={styles.checkText}>
        <span className={styles.checkTitle}>{title}</span>
        {description && <span className={styles.checkDesc}>{description}</span>}
        {state === 'current' && (
          <button type="button" className={styles.launch} onClick={onAction}><Icon name="play" size={12} />{actionLabel}</button>
        )}
      </div>
    </div>
  );
}

/* ---------- WidgetConsent (8018:3754) ---------- */
export interface WidgetConsentProps {
  title?: ReactNode;
  message: ReactNode;
  state?: 'ask' | 'accepted' | 'refused';
  onAccept?: () => void;
  onRefuse?: () => void;
  policyHref?: string;
}

/** Bloc de consentement du widget : message et deux boutons (croix, coche). */
export function WidgetConsent({ title = 'Confidentialité', message, state = 'ask', onAccept, onRefuse, policyHref }: WidgetConsentProps) {
  return (
    <div className={cx(styles.consent, state !== 'ask' && styles[`cs-${state}`])}>
      <div className={styles.consentBody}>
        <span className={styles.consentTitle}><Icon name="circle-lock-02" size={14} />{title}{policyHref && <a href={policyHref} className={styles.policy}>Lire la politique</a>}</span>
        <span className={styles.consentMsg}>{message}</span>
      </div>
      {state === 'ask' ? (
        <div className={styles.consentActions}>
          <button type="button" onClick={onRefuse} aria-label="Refuser"><Icon name="cancel-01" size={16} /></button>
          <button type="button" onClick={onAccept} aria-label="Accepter"><Icon name="tick-02" size={16} /></button>
        </div>
      ) : (
        <div className={styles.consentDone}><Icon name={state === 'accepted' ? 'tick-02' : 'cancel-01'} size={14} />{state === 'accepted' ? 'Accepté' : 'Refusé'}</div>
      )}
    </div>
  );
}

/* ---------- Widget (7999:3504) ---------- */
export interface WidgetProps {
  theme?: 'light' | 'dark';
  /** Expéditeur : avatar et nom (« Marc Honoré · Product designer »). */
  sender?: { name: ReactNode; avatar?: string };
  /** Progression : étape courante et nombre d'étapes. */
  progress?: { current: number; total: number };
  /** Image de couverture (propriété Figma `hasImage`). */
  image?: string;
  question: ReactNode;
  /** Bloc de réponse (WidgetChoice, champ, échelle…). */
  children?: ReactNode;
  /** Bloc de consentement au-dessus de la question. */
  consent?: ReactNode;
  onPrevious?: () => void;
  onNext?: () => void;
  nextLabel?: ReactNode;
  /** Logo Told en pied (propriété Figma `hasLogo`). */
  showLogo?: boolean;
  onClose?: () => void;
}

/** Widget visiteur : carte de 340, rayon 20, marge 16/20/20/20, écart 20. Le thème suit `theme`. */
export function Widget({ theme = 'light', sender, progress, image, question, children, consent, onPrevious, onNext, nextLabel = 'Suivant', showLogo = true, onClose }: WidgetProps) {
  return (
    <div data-theme={theme} className={styles.widget}>
      {image && <img src={image} alt="" className={styles.cover} />}
      <div className={styles.card}>
        <div className={styles.head}>
          {(sender || onClose) && (
            <div className={styles.sender}>
              {sender && (
                <span className={styles.senderId}>
                  {sender.avatar ? <img src={sender.avatar} alt="" className={styles.avatar} /> : <span className={styles.avatar} />}
                  <span>{sender.name}</span>
                </span>
              )}
              {onClose && <button type="button" className={styles.close} onClick={onClose} aria-label="Fermer"><Icon name="cancel-01" size={14} /></button>}
            </div>
          )}
          {progress && (
            <div className={styles.progress} role="progressbar" aria-valuemin={1} aria-valuemax={progress.total} aria-valuenow={progress.current}>
              {Array.from({ length: progress.total }, (_, i) => <span key={i} className={cx(styles.seg, i < progress.current && styles.segOn)} />)}
            </div>
          )}
          {consent}
        </div>
        <h2 className={styles.question}>{question}</h2>
        {children && <div className={styles.block}>{children}</div>}
        <div className={styles.foot}>
          {showLogo ? <Logo size="xs" theme={theme} /> : <span />}
          <div className={styles.nav}>
            {onPrevious && <WidgetButton variant="ghost" size="sm" onClick={onPrevious}>Précédent</WidgetButton>}
            {onNext && <WidgetButton size="sm" onClick={onNext}>{nextLabel}</WidgetButton>}
          </div>
        </div>
      </div>
    </div>
  );
}
