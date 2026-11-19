import type { ReactNode } from 'react';
import styles from './EditorHeader.module.css';

export interface EditorHeaderProps {
  /** Gauche : menu de l'éditeur puis Breadcrumb theme="dark". */
  start: ReactNode;
  /** Centre de la barre principale (optionnel). */
  center?: ReactNode;
  /** Droite : AvatarGroup surface="dark", Demander une relecture, Partager, Aperçu, Publier. */
  end: ReactNode;
  /** Sous-navigation : ButtonTab (Étapes, Écran de fin, Design). */
  tabs?: ReactNode;
  /** Droite de la sous-navigation : EditorSaveState, EditorChanges, Badge de statut. */
  status?: ReactNode;
}

/** EditionNavRecord (8749:4650) : en-tête de l'éditeur, toujours sombre. Barre de 60 en trois colonnes, sous-navigation de 54. Les enfants héritent du thème sombre. */
export function EditorHeader({ start, center, end, tabs, status }: EditorHeaderProps) {
  return (
    <header className={styles.header} data-theme="dark">
      <div className={styles.main}>
        <div className={styles.start}>{start}</div>
        <div className={styles.center}>{center}</div>
        <div className={styles.end}>{end}</div>
      </div>
      {(tabs || status) && (
        <div className={styles.sub}>
          <div role="tablist" className={styles.tabs}>{tabs}</div>
          <div className={styles.status}>{status}</div>
        </div>
      )}
    </header>
  );
}

/** Pastille « Enregistré il y a 12 s » (état d'enregistrement automatique). */
export function EditorSaveState({ children, saving }: { children: ReactNode; saving?: boolean }) {
  return (
    <span className={styles.pill} aria-live="polite">
      <span className={[styles.dot, saving ? styles.dotSaving : styles.dotSaved].join(' ')} />
      {children}
    </span>
  );
}

/** Pastille « 3 changements non publiés », cliquable pour voir le détail. */
export function EditorChanges({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button type="button" className={[styles.pill, styles.changes].join(' ')} onClick={onClick}>
      <span className={[styles.dot, styles.dotChanges].join(' ')} />
      {children}
    </button>
  );
}

/** Style des boutons Partager et Aperçu de l'en-tête : blanc transparent 12 %, texte blanc. À passer en className à Button ou ButtonIcon. */
export const editorHeaderGhostButton = styles.lightButton;
