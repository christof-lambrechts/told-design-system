import type { ReactNode } from 'react';
import styles from './EmptyState.module.css';

export interface EmptyStateProps {
  /** Illustration (EmptyIllustration dans Figma, 256 × 168) : image ou SVG. */
  illustration?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Bouton principal (type=with-cta) et lien éventuel. */
  actions?: ReactNode;
  /** type=error : même mise en page, à utiliser avec l’illustration « error » et « Réessayer ». */
  role?: 'status' | 'alert';
}

/** EmptyState (7855:516) : écran vide, centré. Illustration, titre, description, actions. */
export function EmptyState({ illustration, title, description, actions, role = 'status' }: EmptyStateProps) {
  return (
    <div className={styles.root} role={role}>
      {illustration && <div className={styles.illu}>{illustration}</div>}
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.desc}>{description}</p>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
