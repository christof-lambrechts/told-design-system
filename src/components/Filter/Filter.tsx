import { useId, type KeyboardEvent, type ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import { IconBoxedColor, type IconBoxedColorName } from '../IconBoxed/IconBoxedColor';
import { Button, ButtonIcon } from '../Button/Button';
import { Kbd } from '../Kbd/Kbd';
import styles from './Filter.module.css';

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');

/* ---------- FilterChip (_FilterChip 8698:2136) ---------- */

export interface FilterChipProps {
  /** Picto du type (IconBoxedColor). */
  icon?: IconBoxedColorName;
  /** Champ filtré (« Date »). */
  field: ReactNode;
  /** Opérateur (« est », « contient »). */
  operator?: ReactNode;
  /** Valeur (« 30 derniers jours »). Absente : puce incomplète (« choisir… », contour en pointillés). */
  value?: ReactNode;
  /** valueType : texte (défaut), étoiles (chiffre + étoile), emoji ou météo (icônes passées dans `value`). */
  valueIcon?: IconName;
  /** Puce ouverte (son panneau d'édition est affiché). */
  open?: boolean;
  placeholder?: string;
  /** Ouvre le panneau d'édition de la puce. */
  onClick?: () => void;
  /** Croix (hasClose). */
  onRemove?: () => void;
  removeLabel?: string;
}

/** Puce de filtre : champ, opérateur, valeur. Rayon 8, 32 de haut, contour gris ; ouverte = fond et contour de marque ; incomplète = pointillés bleus. */
export function FilterChip({ icon, field, operator, value, valueIcon, open, placeholder = 'choisir…', onClick, onRemove, removeLabel = 'Retirer le filtre' }: FilterChipProps) {
  const incomplete = value == null || value === '';
  return (
    <span className={cx(styles.chip, open && styles.chipOpen, incomplete && styles.chipIncomplete)}>
      <button type="button" className={styles.chipHit} aria-expanded={open} aria-haspopup="dialog" onClick={onClick}>
        {icon && <IconBoxedColor icon={icon} size={20} />}
        <span className={styles.field}>{field}</span>
        {operator && <span className={styles.operator}>{operator}</span>}
        <span className={cx(styles.value, incomplete && styles.placeholder)}>
          {incomplete ? placeholder : value}
          {!incomplete && valueIcon && <Icon name={valueIcon} size={16} />}
        </span>
      </button>
      {onRemove && <ButtonIcon icon="cancel-01" label={removeLabel} size="xs" appearance="ghost" onClick={onRemove} />}
    </span>
  );
}

/* ---------- FilterLogic (_FilterLogic 5571:24673) ---------- */

export interface FilterLogicProps {
  value: 'and' | 'or';
  onChange: (value: 'and' | 'or') => void;
  labels?: { and: string; or: string };
}

/** Et / Ou entre deux puces : petit sélecteur (SelectionBox), un clic bascule. */
export function FilterLogic({ value, onChange, labels = { and: 'Et', or: 'Ou' } }: FilterLogicProps) {
  return (
    <button type="button" className={styles.logic} aria-label={`Relation entre les filtres : ${labels[value]}. Changer.`}
      onClick={() => onChange(value === 'and' ? 'or' : 'and')}>
      <span>{labels[value]}</span>
      <span className={styles.logicDrop}><Icon name="arrow-down-01" size={12} /></span>
    </button>
  );
}

/* ---------- FilterBar (8698:2515) ---------- */

export interface FilterBarProps {
  /** Puces (FilterChip) et relations (FilterLogic). */
  children?: ReactNode;
  /** « + Filtre » : ouvre FilterMenu. */
  onAdd?: () => void;
  addLabel?: string;
  /** Effacer les filtres (hasClear), en rouge. */
  onClear?: () => void;
  clearLabel?: string;
  /** Enregistrer la vue (hasSaveView). */
  onSaveView?: () => void;
  saveViewLabel?: string;
  /** page : bandeau avec filet, sous l'en-tête (Analyser) ; floating : barre flottante (rayon 12, ombre) ; block : bloc arrondi au-dessus d'un tableau classique (page-table). */
  placement?: 'page' | 'floating' | 'block';
  /** Menu d'ajout ouvert, posé sous « + Filtre ». */
  menu?: ReactNode;
  'aria-label'?: string;
}

/** Barre de filtres : puces qui passent à la ligne, « + Filtre », actions alignées en haut à droite. */
export function FilterBar({ children, onAdd, addLabel = 'Filtre', onClear, clearLabel = 'Effacer', onSaveView, saveViewLabel = 'Enregistrer la vue', placement = 'page', menu, ...rest }: FilterBarProps) {
  return (
    <div role="group" aria-label={rest['aria-label'] ?? 'Filtres'} className={cx(styles.bar, placement === 'floating' && styles.floating, placement === 'block' && styles.block)}>
      <div className={styles.chips}>
        {children}
        {onAdd && (
          <span className={styles.addWrap}>
            <Button size="sm" color="neutral" variant="ghost" iconLeft="add-01" onClick={onAdd} aria-haspopup="dialog" aria-expanded={!!menu}>{addLabel}</Button>
            {menu && <div className={styles.menuPos}>{menu}</div>}
          </span>
        )}
      </div>
      {(onClear || onSaveView) && (
        <div className={styles.actions}>
          {onClear && <Button size="sm" color="danger" variant="ghost" onClick={onClear}>{clearLabel}</Button>}
          {onSaveView && <Button size="sm" variant="secondary-outline" onClick={onSaveView}>{saveViewLabel}</Button>}
        </div>
      )}
    </div>
  );
}

/* ---------- FilterMenu (8698:2311) ---------- */

export interface FilterMenuItemData {
  id: string;
  icon?: IconBoxedColorName;
  label: ReactNode;
  /** Suggestion : « est entre 0 et 6 · détracteurs ». */
  detail?: ReactNode;
}

export interface FilterMenuProps {
  query: string;
  onQueryChange: (q: string) => void;
  /** Groupes : titre (« Comportement », « Réponses », « Suggestions ») et entrées. */
  groups: { title: ReactNode; items: FilterMenuItemData[] }[];
  onSelect: (id: string) => void;
  /** Entrée active (survol ou flèches), validée par Entrée. */
  activeId?: string;
  onActiveChange?: (id: string) => void;
  placeholder?: string;
  /** Raccourci affiché dans le champ (F). */
  shortcut?: string;
  onClose?: () => void;
}

/** Menu « + Filtre » : champ de recherche, puis types par famille (vide) ou filtres prêts à valider (en tapant). 340 de large, rayon 12, ombre flat-8. */
export function FilterMenu({ query, onQueryChange, groups, onSelect, activeId, onActiveChange, placeholder = 'Rechercher un filtre…', shortcut = 'F', onClose }: FilterMenuProps) {
  const lid = useId();
  const flat = groups.flatMap((g) => g.items);
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    const i = flat.findIndex((x) => x.id === activeId);
    if (e.key === 'ArrowDown') { e.preventDefault(); const n = flat[(i + 1) % flat.length]; if (n) onActiveChange?.(n.id); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); const n = flat[(i - 1 + flat.length) % flat.length]; if (n) onActiveChange?.(n.id); }
    else if (e.key === 'Enter' && activeId) { e.preventDefault(); onSelect(activeId); }
    else if (e.key === 'Escape') { e.preventDefault(); onClose?.(); }
  };
  return (
    <div className={styles.menu} role="dialog" aria-label="Ajouter un filtre">
      <label className={styles.search}>
        <Icon name="search-01" size={16} className={styles.searchIcon} />
        <input autoFocus value={query} placeholder={placeholder} onChange={(e) => onQueryChange(e.target.value)} onKeyDown={onKey}
          role="combobox" aria-expanded aria-controls={lid} aria-activedescendant={activeId ? `${lid}-${activeId}` : undefined} />
        {!query && shortcut && <Kbd keys={shortcut} size="xs" />}
      </label>
      <div id={lid} role="listbox" className={styles.list}>
        {groups.map((g, gi) => (
          <div key={gi} role="group" aria-label={typeof g.title === 'string' ? g.title : undefined}>
            <div className={styles.menuTitle}>{g.title}</div>
            {g.items.map((it) => (
              <div key={it.id} id={`${lid}-${it.id}`} role="option" aria-selected={it.id === activeId}
                className={cx(styles.item, it.id === activeId && styles.itemActive)}
                onMouseEnter={() => onActiveChange?.(it.id)} onMouseDown={(e) => e.preventDefault()} onClick={() => onSelect(it.id)}>
                {it.icon && <IconBoxedColor icon={it.icon} size={20} />}
                <span className={styles.itemLabel}>{it.label}</span>
                {it.detail && <span className={styles.itemDetail}>{it.detail}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
