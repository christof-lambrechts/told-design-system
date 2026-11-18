import type { ReactNode } from 'react';
import styles from './AppLayout.module.css';

export interface AppLayoutProps {
  /** Menu de gauche (AppSidebar), posé directement sur le fond. */
  sidebar: ReactNode;
  /** Barre du haut (TopBar), en haut de la carte de contenu. */
  topbar?: ReactNode;
  /** En-tête de page (PageHeader) puis contenu. */
  children: ReactNode;
  className?: string;
}

/**
 * AppLayout (8544:4323, page 📐 Templates / AppLayout) : gabarit de l'application, piste B.
 * Fond Neutral/surface/page ; menu à gauche ; contenu dans une carte blanche
 * (Neutral/surface/default, filet Neutral/border/subtle, rayon 16, ombre shadow-flat-1), marges 12 en haut, à droite, en bas.
 */
export function AppLayout({ sidebar, topbar, children, className }: AppLayoutProps) {
  return (
    <div className={[styles.layout, className].filter(Boolean).join(' ')}>
      <aside className={styles.sidebar}>{sidebar}</aside>
      <div className={styles.card}>
        {topbar && <div className={styles.topbar}>{topbar}</div>}
        <main className={styles.page}>{children}</main>
      </div>
    </div>
  );
}
