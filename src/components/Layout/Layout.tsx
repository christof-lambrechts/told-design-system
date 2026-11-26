import type { ReactNode } from 'react';
import { AppLayout } from '../AppLayout/AppLayout';
import styles from './Layout.module.css';
import { EditorLayout } from '../EditorLayout/EditorLayout';

/** Page classique (Accueil, listes) ou réglages : menu à gauche (AppSidebar) sur le fond de page, contenu en carte blanche. */
export interface LayoutPageProps {
  type: 'page' | 'settings';
  /** AppSidebar : menu commun (page) ou menu des réglages, avec « Retour aux projets » (settings). */
  sidebar: ReactNode;
  /** TopBar (titre, recherche, actions), en haut de la carte. */
  topbar?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Éditeur (Construire, Diffuser) : en-tête, colonne gauche, canevas, colonne d'options. */
export interface LayoutEditorProps {
  type: 'editor';
  /** EditorHeader (Told ou Record). */
  header: ReactNode;
  /** EditionSidebar (Told) ou StepList (Record). */
  left: ReactNode;
  /** OptionSidebar. Absente en Diffuser. */
  right?: ReactNode;
  /** `center` : l'objet édité centré sur les points (Construire) ; `page` : colonne de lecture (Diffuser). */
  content?: 'center' | 'page';
  /** Largeur de la colonne gauche (272 par défaut, D-054). */
  leftWidth?: number;
  /** Largeur de la colonne d'options (356 par défaut, D-054). */
  rightWidth?: number;
  children: ReactNode;
}

/** Analyser : en-tête sur l'étape Analyser, colonne gauche (questions, répondants) facultative, centre sur le canevas uni, colonne de 720, colonne droite facultative. */
export interface LayoutAnalyserProps {
  type: 'analyser';
  header: ReactNode;
  /** Questions (ReportNavItem) ou répondants (RespondentItem), note de pied. Absente pour la vue Tableau pleine largeur. */
  left?: ReactNode;
  /** Largeur de la colonne de contenu (720 par défaut) ; `full` : tableau des réponses bord à bord, pleine page (Figma type=analyser-table). */
  width?: number | 'full';
  /**
   * Barre de filtres ouverte (FilterBar placement="page"), sous l'en-tête : elle pousse le contenu, elle ne le recouvre jamais.
   * Ouverte et fermée par le bouton « Filtres » de l'en-tête (accordéon) : ne rien passer quand elle est fermée.
   */
  filters?: ReactNode;
  /** Colonne droite facultative (D-055) : détail d'un répondant, inspecteur d'un filtre, commentaires. En pleine largeur, elle se pose à droite du tableau, qui se rétrécit. */
  right?: ReactNode;
  leftWidth?: number;
  rightWidth?: number;
  children: ReactNode;
}

export type LayoutProps = LayoutPageProps | LayoutEditorProps | LayoutAnalyserProps;

/**
 * Layout (Figma 9967:20874, page 📐 Templates / Layout) : la base de toutes les pages de Told et de Told Record.
 * - `page` : Accueil, listes (Scénarios, Told, Told Record, Résultats, Audiences, Kit de marque, Médias…).
 * - `settings` : réglages (Organisation, Projet, Marque, IA, Mon compte).
 * - `editor` : éditeur d'un Told ou d'une démo (Construire, Diffuser).
 * - `analyser` : résultats d'un Told ou d'une démo.
 * Assemble AppLayout (page, settings) et EditorLayout (editor, analyser) : utiliser Layout dans les apps.
 */
export function Layout(props: LayoutProps) {
  if (props.type === 'page' || props.type === 'settings') {
    const p = props;
    return <AppLayout sidebar={p.sidebar} topbar={p.topbar} className={p.className}>{p.children}</AppLayout>;
  }
  if (props.type === 'editor') {
    return <EditorLayout header={props.header} left={props.left} right={props.right} content={props.content} leftWidth={props.leftWidth} rightWidth={props.rightWidth}>{props.children}</EditorLayout>;
  }
  const a = props as LayoutAnalyserProps;
  const full = a.width === 'full';
  if (full) {
    return (
      <div className={styles.analyserTable}>
        <div className={styles.header}>{a.header}</div>
        {a.filters && <div className={styles.filters}>{a.filters}</div>}
        <div className={styles.tableRow}>
          <main className={styles.tableZone}>{a.children}</main>
          {a.right && <aside className={styles.tableRight} style={{ width: a.rightWidth ?? 356 }}>{a.right}</aside>}
        </div>
      </div>
    );
  }
  if (a.filters) {
    return (
      <div className={styles.withFilters}>
        <EditorLayout header={<>{a.header}<div className={styles.filters}>{a.filters}</div></>} left={a.left} right={a.right} leftWidth={a.leftWidth} rightWidth={a.rightWidth} content="page" dots={false} pageWidth={(a.width as number | undefined) ?? 720}>
          {a.children}
        </EditorLayout>
      </div>
    );
  }
  return (
    <EditorLayout header={a.header} left={a.left} right={a.right} leftWidth={a.leftWidth} rightWidth={a.rightWidth} content={full ? 'center' : 'page'} dots={false}
      pageWidth={full ? undefined : (a.width as number | undefined) ?? 720}>
      {a.children}
    </EditorLayout>
  );
}
