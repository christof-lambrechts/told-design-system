import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import { ButtonIcon } from '../Button/Button';
import styles from './Breadcrumb.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export type Theme = 'light' | 'dark';

export interface EditableTitleProps {
  value: string;
  /** Appelé à la validation (Entrée ou perte du focus) si le titre a changé et n'est pas vide. */
  onChange?: (value: string) => void;
  /** Sur fond sombre (en-tête de l'éditeur). */
  theme?: Theme;
  maxLength?: number;
  'aria-label'?: string;
}

/** EditableTitle (8739:53341) : titre qui se renomme sur place. Survol : fond léger et crayon ; clic : champ. Échap annule. */
export function EditableTitle({ value, onChange, theme = 'light', maxLength = 120, ...rest }: EditableTitleProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { if (!editing) setDraft(value); }, [value, editing]);
  useEffect(() => { if (editing) input.current?.select(); }, [editing]);
  const commit = () => {
    const v = draft.trim();
    setEditing(false);
    if (v && v !== value) onChange?.(v); else setDraft(value);
  };
  const themeProps = theme === 'dark' ? { 'data-theme': 'dark' } : {};
  if (editing) {
    return (
      <span className={cx(styles.title, styles.editing)} {...themeProps}>
        <input ref={input} className={styles.input} value={draft} maxLength={maxLength} aria-label={rest['aria-label'] ?? 'Renommer'}
          size={Math.max(4, draft.length)} onChange={(e) => setDraft(e.target.value)} onBlur={commit}
          onKeyDown={(e) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setDraft(value); setEditing(false); } }} />
      </span>
    );
  }
  return (
    <button type="button" className={styles.title} onClick={() => setEditing(true)} title="Renommer" {...themeProps}>
      <span className={styles.text}>{value}</span>
      <Icon name="pencil-edit-02" size={14} className={styles.pencil} />
    </button>
  );
}

export interface BreadcrumbItem { label: ReactNode; href?: string; onClick?: () => void }

export interface BreadcrumbProps {
  /** Niveaux parents (projet, dossier), cliquables. */
  items: BreadcrumbItem[];
  /** Dernier niveau : la démo en cours, renommable si `onRename`. */
  current: string;
  onRename?: (v: string) => void;
  /** Flèche retour à gauche (hasBack). */
  onBack?: () => void;
  /** Badge de statut après le titre (hasStatus). */
  status?: ReactNode;
  theme?: Theme;
}

/** Breadcrumb (8739:53399) : retour, niveaux parents séparés par « / », titre courant modifiable, statut. Clair ou sombre. */
export function Breadcrumb({ items, current, onRename, onBack, status, theme = 'light' }: BreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane" className={styles.crumb} {...(theme === 'dark' ? { 'data-theme': 'dark' } : {})}>
      {onBack && <ButtonIcon icon="arrow-left-02" label="Retour" appearance="ghost" color="neutral" size="sm" onClick={onBack} />}
      <ol className={styles.list}>
        {items.map((it, i) => (
          <li key={i} className={styles.item}>
            {it.href ? <a href={it.href} className={styles.link} onClick={it.onClick}>{it.label}</a>
              : <button type="button" className={styles.link} onClick={it.onClick}>{it.label}</button>}
            <span className={styles.sep} aria-hidden="true">/</span>
          </li>
        ))}
        <li className={styles.item} aria-current="page">
          {onRename ? <EditableTitle value={current} onChange={onRename} theme={theme} /> : <span className={styles.current}>{current}</span>}
        </li>
      </ol>
      {status}
    </nav>
  );
}
