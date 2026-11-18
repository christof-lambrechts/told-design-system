import type { HTMLAttributes } from 'react';
import styles from './Progress.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Avancement de 0 à 100. Figma l'arrondit à la dizaine (axe `length`), le code garde la valeur exacte. */
  value: number;
  direction?: 'horizontal' | 'vertical';
  /** sm : barre fine de 10, arrondie. lg : bande de 40, sans arrondi. */
  size?: 'sm' | 'lg';
  /** Texte lu par les lecteurs d'écran. */
  label?: string;
}

/** ProgressBar (556:57661) : avancement d'une tâche ou d'un parcours. Piste Neutral/surface/muted, remplissage Brand/surface/selected. */
export function ProgressBar({ value, direction = 'horizontal', size = 'sm', label = 'Progression', className, style, ...rest }: ProgressBarProps) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v)}
      className={cx(styles.bar, styles[size], styles[direction], className)}
      style={{ ['--value' as string]: `${v}%`, ...style }}
      {...rest}
    >
      <span className={styles.fill} />
    </div>
  );
}

export interface ProgressStepsProps extends HTMLAttributes<HTMLDivElement> {
  /** Nombre d'étapes. */
  total: number;
  /** Étape en cours, de 1 à total. */
  current: number;
  /** multi : un segment par étape. single : une seule barre. */
  appearance?: 'multi' | 'single';
  size?: 'sm' | 'lg';
}

/** ProgressBarWidget (787:72909) : progression dans le widget visiteur ou une étape de tour (segments de 3 de haut, écart 8). */
export function ProgressSteps({ total, current, appearance = 'multi', size = 'sm', className, style, ...rest }: ProgressStepsProps) {
  const c = Math.max(0, Math.min(total, current));
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={c}
      aria-label={`Étape ${c} sur ${total}`}
      className={cx(styles.steps, styles[`steps-${size}`], className)}
      style={style}
      {...rest}
    >
      {appearance === 'multi'
        ? Array.from({ length: total }, (_, i) => <span key={i} className={cx(styles.seg, i < c && styles.segOn)} />)
        : <span className={styles.seg} style={{ position: 'relative' }}><span className={styles.segFill} style={{ width: `${(c / total) * 100}%` }} /></span>}
    </div>
  );
}

export type LoaderSize = '3xs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
const loaderDim: Record<LoaderSize, [number, number, number, number]> = {
  // diamètre, épaisseur, taille du texte, écart
  '3xs': [16, 2, 11, 8], xxs: [20, 3, 11, 8], xs: [24, 3, 11, 12], sm: [32, 4, 12, 16], md: [48, 6, 12, 16], lg: [56, 6, 15, 16], xl: [64, 8, 20, 20],
};

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  size?: LoaderSize;
  /** line-spinner : arc sur piste grise. line-simple : arc seul. dot-circle : cercle en pointillés. */
  appearance?: 'line-spinner' | 'line-simple' | 'dot-circle';
  /** Propriété Figma `hasLabel`. */
  label?: string | false;
}

/** Loader (1156:85211) : chargement en cours, avec « Chargement… » dessous par défaut. */
export function Loader({ size = 'md', appearance = 'line-spinner', label = 'Chargement…', className, ...rest }: LoaderProps) {
  const [d, w, fs, gap] = loaderDim[size];
  const r = (d - w) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div role="status" aria-live="polite" className={cx(styles.loader, className)} style={{ gap }} {...rest}>
      <svg className={styles.spin} width={d} height={d} viewBox={`0 0 ${d} ${d}`} aria-hidden="true">
        {appearance === 'line-spinner' && <circle cx={d / 2} cy={d / 2} r={r} fill="none" strokeWidth={w} className={styles.track} />}
        <circle
          cx={d / 2} cy={d / 2} r={r} fill="none" strokeWidth={w} strokeLinecap="round" className={styles.arc}
          strokeDasharray={appearance === 'dot-circle' ? `0 ${w * 2.2}` : `${circ * 0.6} ${circ}`}
        />
      </svg>
      {label ? <span className={styles.label} style={{ fontSize: fs, lineHeight: `${Math.round(fs * 1.4)}px` }}>{label}</span> : <span className={styles.sr}>Chargement…</span>}
    </div>
  );
}

/** SkeletonLine (6057:97) : ligne de texte en attente, 12 de haut, rayon 6. */
export function SkeletonLine({ width = 200, className, style, ...rest }: HTMLAttributes<HTMLSpanElement> & { width?: number | string }) {
  return <span aria-hidden="true" className={cx(styles.line, className)} style={{ width, ...style }} {...rest} />;
}

/** SkeletonCard (6057:98) : carte en attente, trois lignes, fond Neutral/surface/subtle, rayon 8. */
export function SkeletonCard({ lines = [200, 160, 180], className, ...rest }: HTMLAttributes<HTMLDivElement> & { lines?: (number | string)[] }) {
  return (
    <div aria-busy="true" className={cx(styles.card, className)} {...rest}>
      {lines.map((w, i) => <SkeletonLine key={i} width={w} />)}
    </div>
  );
}
