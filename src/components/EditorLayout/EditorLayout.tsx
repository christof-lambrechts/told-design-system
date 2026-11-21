import type { ReactNode } from 'react';
import styles from './EditorLayout.module.css';

export interface EditorLayoutProps {
  /** En-tête de l’éditeur (EditorHeader). */
  header: ReactNode;
  /** Colonne gauche : EditionSidebar (Told) ou StepList (Record). */
  left: ReactNode;
  /** Zone d’édition, centrée sur le canevas à points. */
  children: ReactNode;
  /** Colonne droite : OptionSidebar. */
  right?: ReactNode;
  leftWidth?: number;
  rightWidth?: number;
  /**
   * @deprecated Le fond à points (DotGrid) est réservé aux Scénarios (décision de Christof, 21/11) :
   * la zone d'édition est un fond uni Neutral/surface/canvas. Faux par défaut.
   */
  dots?: boolean;
}

/** EditorLayout (9020:101921) : en-tête puis trois colonnes collées, sans marge. Côtés blancs séparés par Neutral/border/divider, centre sur Neutral/surface/canvas à points. */
export function EditorLayout({ header, left, children, right, leftWidth = 272, rightWidth = 356, dots = false }: EditorLayoutProps) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>{header}</div>
      <div className={styles.cols}>
        <aside className={styles.left} style={{ width: leftWidth }}>{left}</aside>
        <main className={dots ? `${styles.canvas} ${styles.dots}` : styles.canvas}>{children}</main>
        {right && <aside className={styles.right} style={{ width: rightWidth }}>{right}</aside>}
      </div>
    </div>
  );
}
