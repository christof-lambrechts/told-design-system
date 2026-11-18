import { createElement, type ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import { Logo } from '../Logo/Logo';
import { WidgetButton } from '../Widget/Widget';
import { scaleIcons } from './scaleIcons';
import styles from './Survey.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

/** Taille du contenu de question (WidgetBlock, 7996:3648) : sm widget, md capsule, lg pleine page. */
export type AnswerSize = 'sm' | 'md' | 'lg';

const Glyph = ({ name, size }: { name: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    {scaleIcons[name].map(([tag, attrs], i) => createElement(tag, { key: i, ...attrs }))}
  </svg>
);

export interface ScaleAnswerProps {
  /** Échelle d'étoiles, de chiffres, d'émotions ou de météo. */
  kind?: 'star' | 'number' | 'emoji' | 'meteo';
  /** Nombre de points (emoji et météo : 5). */
  count?: number;
  value?: number;
  onChange?: (value: number) => void;
  /** Libellés sous l'échelle : début, milieu, fin. */
  labels?: [ReactNode, ReactNode?, ReactNode?];
  size?: AnswerSize;
}

/** Échelle de notation (Rating scale - Question) : cases de 48 (sm) ou 64 (md, lg), écart 8, case choisie sur Widget/choice/background/selected. */
export function ScaleAnswer({ kind = 'star', count = 5, value, onChange, labels = ['Pas du tout', 'Moyen', 'Tout à fait'], size = 'sm' }: ScaleAnswerProps) {
  const n = kind === 'emoji' || kind === 'meteo' ? 5 : count;
  const many = n > 5;
  const box = many ? (size === 'sm' ? 24 : 40) : size === 'sm' ? 48 : 64;
  const glyph = Math.round(box * 0.55);
  return (
    <div className={cx(styles.scale, styles[size])} role="radiogroup">
      <div className={styles.scaleRow}>
        {Array.from({ length: n }, (_, i) => {
          const v = i + 1;
          const on = value !== undefined && (kind === 'star' ? v <= value : v === value);
          const sel = value === v;
          return (
            <button key={v} type="button" role="radio" aria-checked={sel} aria-label={`${v} sur ${n}`}
              className={cx(styles.cell, on && styles.cellOn)} style={{ width: box, height: box }} onClick={() => onChange?.(v)}>
              {kind === 'star' && <Icon name="star" size={glyph} variant={on ? 'solid' : 'stroke'} />}
              {kind === 'number' && <span className={styles.num}>{v}</span>}
              {(kind === 'emoji' || kind === 'meteo') && <Glyph name={`${kind}-${v}`} size={glyph} />}
            </button>
          );
        })}
      </div>
      <div className={styles.scaleLabels}><span>{labels[0]}</span><span>{labels[1]}</span><span>{labels[2]}</span></div>
    </div>
  );
}

export interface NpsAnswerProps {
  value?: number;
  onChange?: (value: number) => void;
  labels?: [ReactNode, ReactNode];
  size?: AnswerSize;
}

/** NPS de 0 à 10 (NPS Component) : 11 cases, écart 4 (sm) ou 8 (md, lg). */
export function NpsAnswer({ value, onChange, labels = ['0 = Pas du tout probable', '10 = Très probable'], size = 'sm' }: NpsAnswerProps) {
  return (
    <div className={cx(styles.nps, styles[size])} role="radiogroup">
      <div className={styles.npsRow}>
        {Array.from({ length: 11 }, (_, v) => (
          <button key={v} type="button" role="radio" aria-checked={value === v} className={cx(styles.npsCell, value === v && styles.cellOn)} onClick={() => onChange?.(v)}>{v}</button>
        ))}
      </div>
      <div className={styles.npsLabels}><span>{labels[0]}</span><span>{labels[1]}</span></div>
    </div>
  );
}

export interface LinkSurveyProps {
  /** capsule : carte centrée à côté d'une image ; full-page : colonne sur toute la hauteur. */
  shape?: 'capsule' | 'full-page';
  device?: 'desktop' | 'mobile';
  /** white | light | dark | glass-dark : fond et couleurs (dark et glass-dark passent en mode sombre). */
  appearance?: 'white' | 'light' | 'dark' | 'glass-dark';
  /** Image ou couleur de la marque à côté du questionnaire (Image-survey-link). */
  image?: string;
  brandLogo?: ReactNode;
  sender?: { name: ReactNode; avatar?: string };
  progress?: { current: number; total: number };
  onClose?: () => void;
  label?: ReactNode;
  question: ReactNode;
  description?: ReactNode;
  consent?: ReactNode;
  /** Bloc de réponse : ScaleAnswer, NpsAnswer, WidgetChoice… à la taille du format. */
  children?: ReactNode;
  onPrevious?: () => void;
  onNext?: () => void;
  nextLabel?: ReactNode;
}

/** Questionnaire par lien (Link-survey, 1588:169302). Taille du contenu : lg en pleine page, md en capsule, sm en mobile. Le contenu défile entre l'en-tête et le pied. */
export function LinkSurvey({ shape = 'capsule', device = 'desktop', appearance = 'white', image, brandLogo, sender, progress, onClose, label, question, description, consent, children, onPrevious, onNext, nextLabel = 'Suivant' }: LinkSurveyProps) {
  const size: AnswerSize = device === 'mobile' ? 'sm' : shape === 'full-page' ? 'lg' : 'md';
  const dark = appearance === 'dark' || appearance === 'glass-dark';
  const visual = (
    <div className={styles.visual} style={image ? { backgroundImage: `url("${image}")` } : undefined}>
      {brandLogo && <div className={styles.brand}>{brandLogo}</div>}
    </div>
  );
  return (
    <div className={cx(styles.page, styles[`ap-${appearance}`], styles[shape], styles[device])} data-theme={dark ? 'dark' : 'light'}>
      <div className={styles.frame}>
        {(shape === 'capsule' || device === 'mobile') && visual}
        <section className={cx(styles.column, styles[size])}>
          <header className={styles.head}>
            <div className={styles.headRow}>
              {sender ? <span className={styles.sender}>{sender.avatar && <img src={sender.avatar} alt="" className={styles.avatar} />}{sender.name}</span> : <span />}
              {onClose && <button type="button" className={styles.close} onClick={onClose} aria-label="Fermer"><Icon name="cancel-01" size={size === 'sm' ? 12 : 14} /></button>}
            </div>
            {progress && (
              <div className={styles.progress} role="progressbar" aria-valuemin={1} aria-valuemax={progress.total} aria-valuenow={progress.current}>
                {Array.from({ length: progress.total }, (_, i) => <span key={i} className={cx(styles.seg, i < progress.current && styles.segOn)} />)}
              </div>
            )}
          </header>
          <div className={styles.scroll}>
            {label && <span className={styles.label}>{label}</span>}
            <h1 className={styles.question}>{question}</h1>
            {description && <p className={styles.desc}>{description}</p>}
            {consent}
            {children && <div className={styles.answer}>{children}</div>}
          </div>
          <footer className={styles.foot}>
            <Logo size="xs" theme={dark ? 'dark' : 'light'} />
            <div className={styles.nav}>
              {onPrevious && <WidgetButton variant="ghost" size={size === 'sm' ? 'sm' : 'md'} onClick={onPrevious}>Précédent</WidgetButton>}
              {onNext && <WidgetButton size={size === 'sm' ? 'sm' : 'md'} onClick={onNext}>{nextLabel}</WidgetButton>}
            </div>
          </footer>
        </section>
        {shape === 'full-page' && device === 'desktop' && visual}
      </div>
    </div>
  );
}
