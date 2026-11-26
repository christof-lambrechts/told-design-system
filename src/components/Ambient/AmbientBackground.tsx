import type { CSSProperties, ReactNode } from 'react';
import styles from './AmbientBackground.module.css';

export type AmbientTone = 'lavender' | 'brand';
export type AmbientIntensity = 'pale' | 'soft' | 'medium' | 'vivid';

export interface AmbientBackgroundProps {
  /** Figma `Tone` : lavender (fond IA) ou brand. */
  tone?: AmbientTone;
  /** Figma `Intensity`. */
  intensity?: AmbientIntensity;
  /** Trame de points (Figma « Points »). */
  dots?: boolean;
  /** Halos qui dérivent doucement (aucun mouvement avec prefers-reduced-motion). */
  animated?: boolean;
  /** Contenu posé sur le fond. */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * AmbientBackground (Figma 8301:923) : fond d'ambiance, trois halos flous sur une base teintée, trame de points en option.
 * Fond IA de la préparation et du résultat (D-089). Sans image ni ressource distante : uniquement des dégradés CSS.
 */
export function AmbientBackground({ tone = 'lavender', intensity = 'soft', dots = true, animated = false, children, className, style }: AmbientBackgroundProps) {
  const v = (n: number) => `var(--ambient-${tone}-${intensity}-halo-${n})`;
  return (
    <div className={[styles.root, animated && styles.animated, className].filter(Boolean).join(' ')}
      style={{ background: `var(--ambient-${tone}-base)`, ...style }}>
      <div className={styles.halos} aria-hidden="true">
        <span className={styles.h1} style={{ background: v(1) }} />
        <span className={styles.h2} style={{ background: v(2) }} />
        <span className={styles.h3} style={{ background: v(3) }} />
      </div>
      {dots && <div className={styles.dots} aria-hidden="true" />}
      {children !== undefined && <div className={styles.content}>{children}</div>}
    </div>
  );
}
