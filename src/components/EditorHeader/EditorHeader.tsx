import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Logo } from '../Logo/Logo';
import { Icon, type IconName } from '../Icon/Icon';
import { ButtonTab } from '../Tabs/Tabs';
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

/** EditorHeader : gabarit des en-têtes EditorHeaderRecord (8749:4650) et EditorHeaderTold (1018:36318), toujours sombre. Barre de 60 en trois colonnes ; sous-navigation de 44 (absente en V1 de Record). Les enfants héritent du thème sombre. */
export function EditorHeader({ start, center, end, tabs, status }: EditorHeaderProps) {
  return (
    <header className={styles.header} data-theme="dark">
      <div className={[styles.main, center ? styles.withCenter : ''].filter(Boolean).join(' ')}>
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

/* ---------- ButtonEditionMenu ---------- */

export interface ButtonEditionMenuProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Nom lu par les lecteurs d'écran. */
  label?: string;
  /** Menu ouvert (state=actif). */
  open?: boolean;
}

/** ButtonEditionMenu (1018:49167) : bouton du menu de l'éditeur, à gauche de l'en-tête. Logo Told mini + chevron, fond blanc 5 %, filet blanc 10 %, rayon 8, 28 de haut. */
export function ButtonEditionMenu({ label = 'Menu de l’éditeur', open, className, ...rest }: ButtonEditionMenuProps) {
  return (
    <button type="button" aria-label={label} aria-haspopup="menu" aria-expanded={open} className={[styles.editionMenu, open && styles.editionMenuOpen, className].filter(Boolean).join(' ')} {...rest}>
      <Logo mini theme="dark" size="xs" aria-hidden="true" />
      <Icon name="arrow-down-01" size={18} variant="solid" />
    </button>
  );
}

/* ---------- EditorSteps ---------- */

export type EditorStep = 'build' | 'publish' | 'analyze';

export interface EditorStepsProps {
  value: EditorStep;
  onChange: (step: EditorStep) => void;
  /** Contenu en ligne : point vert sur Diffuser et Analyser accessible. Sinon point rouge et Analyser désactivé. */
  published?: boolean;
  /** Libellés (par défaut Construire, Diffuser, Analyser). */
  labels?: Partial<Record<EditorStep, string>>;
  /** Analyser accessible même sans publication. */
  analyzeAlwaysEnabled?: boolean;
}

const STEPS: { id: EditorStep; icon: IconName; label: string }[] = [
  { id: 'build', icon: 'wrench-01', label: 'Construire' },
  { id: 'publish', icon: 'megaphone-02', label: 'Diffuser' },
  { id: 'analyze', icon: 'chart-01', label: 'Analyser' },
];

/** Étapes de l'en-tête (cadre « Étapes » d'EditorHeaderTold et EditorHeaderRecord) : Construire › Diffuser › Analyser, ButtonTab ghost sm inverse, icône pleine sur l'étape en cours, point d'état sur Diffuser. À poser dans `center` d'EditorHeader. */
export function EditorSteps({ value, onChange, published, labels, analyzeAlwaysEnabled }: EditorStepsProps) {
  return (
    <nav aria-label="Étapes" className={styles.steps}>
      {STEPS.map((s, i) => (
        <span key={s.id} className={styles.stepItem}>
          {i > 0 && <Icon name="arrow-right-01" size={16} className={styles.stepChevron} aria-hidden="true" />}
          <ButtonTab appearance="ghost" size="sm" weight="semibold" color="inverse" icon={s.icon}
            selected={value === s.id} aria-current={value === s.id ? 'page' : undefined}
            disabled={s.id === 'analyze' && !published && !analyzeAlwaysEnabled}
            dot={s.id === 'publish' && published !== undefined ? (published ? 'success' : 'danger') : undefined}
            dotLabel={published ? 'En ligne' : 'Brouillon'}
            onClick={() => onChange(s.id)} role={undefined}>
            {labels?.[s.id] ?? s.label}
          </ButtonTab>
        </span>
      ))}
    </nav>
  );
}
