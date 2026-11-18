import { type ReactNode } from 'react';
import { Button } from '../Button/Button';
import { Flag } from '../Flag/Flag';
import { Switch } from '../Choice/Choice';
import { SkeletonLine } from '../Progress/Progress';
import styles from './Languages.module.css';

const flagOf = (code: string) => ({ en: 'gb', ja: 'jp', zh: 'cn', ko: 'kr', sv: 'se', da: 'dk', cs: 'cz', el: 'gr', uk: 'ua' } as Record<string, string>)[code] ?? code;

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export interface Language {
  /** Code ISO (fr, en, es, de, it…), sert aussi au drapeau. */
  code: string;
  label: ReactNode;
  /** Langue par défaut : colonne fixe à gauche. */
  isDefault?: boolean;
}

export interface TranslationRow {
  id: string;
  /** Colonne « Élément » (Question, Description, Bouton · Suivant…). */
  label: ReactNode;
  /** Texte par code de langue. Absent = à traduire ; null = traduction en cours (squelette). */
  values: Record<string, string | null | undefined>;
}

export interface TranslationGroup {
  /** « Étape 1 · Votre avis », « Textes communs ». */
  title: ReactNode;
  /** Sous-titres de page (« Page 1 ») avec leurs lignes, ou lignes directes. */
  pages?: { title: ReactNode; rows: TranslationRow[] }[];
  rows?: TranslationRow[];
}

export interface TranslationTableProps {
  languages: Language[];
  groups: TranslationGroup[];
  /** Résumé sous le titre (« 3 langues · 4 textes à traduire »). */
  summary?: ReactNode;
  onTranslateWithAI?: () => void;
  onChange?: (rowId: string, lang: string, value: string) => void;
}

/** Tableau de traduction (TranslationTable, 8245:4085). « Élément » 220 et langue par défaut 320 restent fixes ; les autres langues font 320 au moins et défilent à l'horizontale. */
export function TranslationTable({ languages, groups, summary, onTranslateWithAI, onChange }: TranslationTableProps) {
  const ordered = [...languages].sort((a, b) => Number(!!b.isDefault) - Number(!!a.isDefault));
  const cols = `220px ${ordered.map(() => 'minmax(320px, 1fr)').join(' ')}`;
  const renderRow = (r: TranslationRow) => (
    <div key={r.id} className={styles.row} style={{ gridTemplateColumns: cols }} role="row">
      <div className={cx(styles.cell, styles.key, styles.sticky0)} role="rowheader">{r.label}</div>
      {ordered.map((l, i) => {
        const v = r.values[l.code];
        return (
          <div key={l.code} className={cx(styles.cell, i === 0 && styles.sticky1, v === undefined && styles.missing)} role="cell">
            {v === null ? <SkeletonLine width="70%" /> : (
              <textarea className={styles.input} rows={1} value={v ?? ''} placeholder={v === undefined ? 'À traduire' : undefined}
                aria-label={`${typeof r.label === 'string' ? r.label : 'Texte'} · ${typeof l.label === 'string' ? l.label : l.code}`}
                onChange={(e) => onChange?.(r.id, l.code, e.target.value)} />
            )}
          </div>
        );
      })}
    </div>
  );
  return (
    <div className={styles.wrap}>
      <div className={styles.bar}>
        <div className={styles.titles}><h2 className={styles.title}>Langues</h2>{summary && <span className={styles.summary}>{summary}</span>}</div>
        {onTranslateWithAI && <Button variant="primary-outline" color="purple" size="sm" iconLeft="ai-magic" onClick={onTranslateWithAI}>Traduire avec l’IA</Button>}
      </div>
      <div className={styles.scroller} role="table">
        <div className={cx(styles.card, styles.head)} role="rowgroup">
          <div className={styles.row} style={{ gridTemplateColumns: cols }} role="row">
            <div className={cx(styles.cell, styles.th, styles.sticky0)} role="columnheader">Élément</div>
            {ordered.map((l, i) => (
              <div key={l.code} className={cx(styles.cell, styles.th, i === 0 && styles.sticky1)} role="columnheader">
                <Flag country={flagOf(l.code)} size={12} />{l.label}{l.isDefault && <span className={styles.defaultTag}>Par défaut</span>}
              </div>
            ))}
          </div>
        </div>
        {groups.map((g, gi) => (
          <div key={gi} className={styles.card} role="rowgroup">
            <div className={cx(styles.group, styles.sticky0)}>{g.title}</div>
            {g.rows?.map(renderRow)}
            {g.pages?.map((p, pi) => (
              <div key={pi}>
                <div className={cx(styles.page, styles.sticky0)}>{p.title}</div>
                {p.rows.map(renderRow)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export interface LanguageItemProps {
  code: string;
  label: ReactNode;
  isDefault?: boolean;
  selected?: boolean;
  /** Interrupteur d'activation de la langue (hasToggle). */
  enabled?: boolean;
  onEnabledChange?: (enabled: boolean) => void;
  onClick?: () => void;
}

/** Ligne de langue (LanguageItem, 8051:24798) : drapeau, nom, badge « Par défaut », interrupteur. */
export function LanguageItem({ code, label, isDefault, selected, enabled, onEnabledChange, onClick }: LanguageItemProps) {
  return (
    <div className={cx(styles.lang, selected && styles.langOn)}>
      <button type="button" className={styles.langMain} onClick={onClick}>
        <Flag country={flagOf(code)} size={12} /><span className={styles.langLabel}>{label}</span>
        {isDefault && <span className={styles.defaultTag}>Par défaut</span>}
      </button>
      {onEnabledChange && !isDefault && <Switch size="sm" checked={!!enabled} onChange={(e) => onEnabledChange(e.target.checked)} aria-label={`Activer ${typeof label === 'string' ? label : code}`} />}
    </div>
  );
}
