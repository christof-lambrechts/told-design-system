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
  /**
   * Placement de la zone d'édition : `center` (défaut, l'objet édité centré) ou `page` (colonne de lecture en haut,
   * 680 de large au plus, écart 24 : Diffuser, réglages en cartes). Diffuser = `left` (SelectionCardGroup des canaux), `content="page"`, pas de `right`.
   */
  content?: 'center' | 'page';
  leftWidth?: number;
  rightWidth?: number;
  /**
   * Trame de points (DotGrid) sur le canevas. Par défaut : oui en `content="center"` (Construire), non en `content="page"`
   * (Diffuser, Analyser : fond uni). Décision de Christof, 21/11.
   */
  dots?: boolean;
}

/** EditorLayout (9020:101921) : en-tête puis trois colonnes collées, sans marge. Côtés blancs séparés par Neutral/border/divider, centre sur Neutral/surface/canvas à points. */
export function EditorLayout({ header, left, children, right, content = 'center', leftWidth = 272, rightWidth = 356, dots }: EditorLayoutProps) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>{header}</div>
      <div className={styles.cols}>
        <aside className={styles.left} style={{ width: leftWidth }}>{left}</aside>
        <main className={[styles.canvas, (dots ?? content === 'center') && styles.dots, content === 'page' && styles.page].filter(Boolean).join(' ')}>{content === 'page' ? <div className={styles.pageColumn}>{children}</div> : children}</main>
        {right && <aside className={styles.right} style={{ width: rightWidth }}>{right}</aside>}
      </div>
    </div>
  );
}
