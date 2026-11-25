import type { ReactNode } from 'react';
import { ButtonIcon, Button } from '../Button/Button';
import { SearchBar } from '../Input/Input';
import { ButtonTab } from '../Tabs/Tabs';
import { Kbd } from '../Kbd/Kbd';
import { IconBoxed, type IconBoxedColor } from '../IconBoxed/IconBoxed';
import type { IconName } from '../Icon/Icon';
import styles from './AddBlockModal.module.css';

export interface BlockType {
  id: string;
  label: string;
  icon: IconName;
  color: IconBoxedColor;
  /** Pastille « Pro » (propriété Figma `hasPro`). */
  pro?: boolean;
  description?: string;
}

/** BlockTypeItem (8133:86310) : ligne de type de bloc, 36 de haut, rayon 10. */
export function BlockTypeItem({ type, selected, onSelect, proLabel = 'Pro' }: { type: BlockType; selected?: boolean; onSelect?: () => void; proLabel?: string }) {
  return (
    <button type="button" role="option" aria-selected={!!selected} className={[styles.item, selected && styles.itemSel].filter(Boolean).join(' ')} onClick={onSelect}>
      <IconBoxed icon={type.icon} color={type.color} appearance="filled" size={24} />
      <span className={styles.itemLabel}>{type.label}</span>
      {type.pro && <span className={styles.pro}>{proLabel}</span>}
    </button>
  );
}

export interface AddBlockModalProps {
  groups: { title: string; types: BlockType[] }[];
  selected: string;
  onSelect: (id: string) => void;
  onAdd?: (id: string) => void;
  onClose?: () => void;
  /** Rappel de l'emplacement : « dans “Votre avis” · position 2 ». */
  context?: ReactNode;
  filters?: string[];
  filter?: string;
  onFilter?: (f: string) => void;
  /** Illustration du type choisi (BlockTypePreview). */
  preview?: ReactNode;
  /** Recherche pilotée par l'app (D-048) : filtrer `groups` côté app. */
  query?: string;
  onQueryChange?: (q: string) => void;
  /** Textes de l'interface (D-048), en français par défaut. */
  labels?: Partial<AddBlockModalLabels>;
}

export interface AddBlockModalLabels {
  title: string; search: string; close: string; types: string; add: string; example: string; pro: string;
  browse: string; addHint: string; closeHint: string; empty: string;
}
const DEFAULT_LABELS: AddBlockModalLabels = {
  title: 'Ajouter un bloc', search: 'Rechercher un type de bloc', close: 'Fermer', types: 'Types de bloc', add: 'Ajouter',
  example: 'Exemple', pro: 'Pro', browse: 'parcourir', addHint: 'ajouter', closeHint: 'fermer', empty: 'Aucun type de bloc ne correspond.',
};

/** AddBlockModal (8136:20553) : modale d'ajout de bloc, 1040 × 708, rayon 24. */
export function AddBlockModal({ groups, selected, onSelect, onAdd, onClose, context, filters = [], filter, onFilter, preview, query, onQueryChange, labels }: AddBlockModalProps) {
  const L = { ...DEFAULT_LABELS, ...labels };
  const shown = groups.filter((g) => g.types.length > 0);
  const empty = shown.length === 0;
  const sel = groups.flatMap((g) => g.types).find((t) => t.id === selected);
  const half = Math.ceil(shown.length / 2);
  return (
    <div role="dialog" aria-label={L.title} className={styles.modal}>
      <div className={styles.search}>
        <div className={styles.searchField}><SearchBar placeholder={L.search} shortcut={false} value={query} onChange={onQueryChange && ((e) => onQueryChange(e.target.value))} /></div>
        {context && <span className={styles.context}>{context}</span>}
        <ButtonIcon icon="cancel-01" label={L.close} size="sm" appearance="subtle" onClick={onClose} />
      </div>
      {filters.length > 0 && (
        <div role="tablist" className={styles.filters}>
          {filters.map((f) => <ButtonTab key={f} appearance="subtle" size="sm" selected={f === filter} onClick={() => onFilter?.(f)}>{f}</ButtonTab>)}
        </div>
      )}
      <div className={styles.body}>
        <div className={styles.types} role="listbox" aria-label={L.types}>
          {empty && <p className={styles.empty}>{L.empty}</p>}
          {[shown.slice(0, half), shown.slice(half)].map((col, ci) => (
            <div key={ci} className={styles.column}>
              {col.map((g) => (
                <div key={g.title} className={styles.group}>
                  <span className={styles.groupTitle}>{g.title}</span>
                  {g.types.map((t) => <BlockTypeItem key={t.id} type={t} selected={t.id === selected} onSelect={() => onSelect(t.id)} proLabel={L.pro} />)}
                </div>
              ))}
            </div>
          ))}
        </div>
        <aside className={styles.preview}>
          <div className={styles.previewHead}>
            <div>
              <span className={styles.previewTitle}>{sel?.label}</span>
              {sel?.description && <span className={styles.previewDesc}>{sel.description}</span>}
            </div>
            <Button size="sm" iconLeft="add-01" onClick={() => sel && onAdd?.(sel.id)}>{L.add}</Button>
          </div>
          <div className={styles.example}><span className={styles.exLine} /><span className={styles.exTag}>{L.example}</span><span className={styles.exLine} /></div>
          <div className={styles.illu}>{preview}</div>
        </aside>
      </div>
      <div className={styles.foot}>
        <span className={styles.hint}><Kbd keys="↑" /><Kbd keys="↓" />{L.browse}</span>
        <span className={styles.hint}><Kbd keys="↵" />{L.addHint}</span>
        <span className={styles.hint}><Kbd keys="Esc" shape="auto" />{L.closeHint}</span>
      </div>
    </div>
  );
}
