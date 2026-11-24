import type { ReactNode } from 'react';
import styles from './AppLayout.module.css';

export interface AppLayoutProps {
  /** Menu de gauche (AppSidebar), posé directement sur le fond. */
  sidebar: ReactNode;
  /** Barre du haut (TopBar), en haut de la carte de contenu. */
  topbar?: ReactNode;
  /** En-tête de page (PageHeader) puis contenu. */
  children: ReactNode;
  /**
   * @deprecated 24/11 : seule la version transparente reste (Figma Layout type=page et type=settings) ; `filled` est archivée dans Figma.
   */
  menu?: 'transparent' | 'filled';
  className?: string;
}

/**
 * AppLayout = Figma **Layout** `type=page` (Accueil, listes) et `type=settings` (réglages, AppSidebar en menu secondaire), page 📐 Templates / Layout.
 * Menu transparent posé sur le fond de page ; l'ancienne version « menu avec fond » est archivée (24/11).
 * Un seul en-tête : TopBar (icône, titre, description, recherche, options, actions secondaire et principale).
 * Fond Neutral/surface/page ; menu à gauche ; contenu dans une carte blanche
 * (Neutral/surface/default, filet Neutral/border/subtle, rayon 16, ombre shadow-flat-1), marges 12 en haut, à droite, en bas.
 */
export function AppLayout({ sidebar, topbar, children, menu = 'transparent', className }: AppLayoutProps) {
  return (
    <div className={[styles.layout, styles[menu], className].filter(Boolean).join(' ')}>
      <aside className={styles.sidebar}>{sidebar}</aside>
      <div className={styles.card}>
        {topbar && <div className={styles.topbar}>{topbar}</div>}
        <main className={styles.page}>{children}</main>
      </div>
    </div>
  );
}
