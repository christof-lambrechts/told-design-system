import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import { IconBoxedColor, type IconBoxedColorName } from '../IconBoxed/IconBoxedColor';
import { ButtonIcon, Button } from '../Button/Button';
import { DropdownMenu, DropdownItem } from '../Select/Select';
import { Tooltip } from '../Tooltip/Tooltip';
import { Checkbox, Switch } from '../Choice/Choice';
import { Flag } from '../Flag/Flag';
import { Badge } from '../Badge/Badge';
import { SearchBar, Input } from '../Input/Input';
import { Modal } from '../Modal/Modal';
import styles from './DataTable.module.css';

const cx = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(' ');

/* ---------------------------------------------------------------- Texte tronqué + infobulle */
/** Une ligne coupée par « … » ; au survol ou au focus, Tooltip avec le texte entier (seulement s'il est coupé). */
export function TruncatedText({ children, lines = 1, className }: { children: string; lines?: 1 | 2; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [cut, setCut] = useState(false);
  const [show, setShow] = useState(false);
  useLayoutEffect(() => { const el = ref.current; if (el) setCut(el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1); }, [children]);
  return (
    <span className={cx(styles.truncWrap, className)} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} onFocus={() => setShow(true)} onBlur={() => setShow(false)}>
      <span ref={ref} className={cx(styles.trunc, lines === 2 && styles.trunc2)} tabIndex={cut ? 0 : undefined}>{children}</span>
      {cut && show && <Tooltip size="sm" direction="up" className={styles.truncTip}>{children}</Tooltip>}
    </span>
  );
}

/* ---------------------------------------------------------------- NpsScoreLabel (9997:30813) */
export type NpsCategory = 'promoter' | 'passive' | 'detractor';
export const npsCategory = (score: number): NpsCategory => (score >= 9 ? 'promoter' : score >= 7 ? 'passive' : 'detractor');
const NPS_LABEL: Record<NpsCategory, string> = { promoter: 'Promoteur', passive: 'Passif', detractor: 'Détracteur' };

/** NpsScoreLabel : catégorie sur fond clair (largeur de « Détracteur ») + note sur deux chiffres sur fond soutenu. */
export function NpsScoreLabel({ score, category, labels = NPS_LABEL }: { score: number; category?: NpsCategory; labels?: Record<NpsCategory, string> }) {
  const cat = category ?? npsCategory(score);
  return (
    <span className={cx(styles.nps, styles[`nps-${cat}`])}>
      <span className={styles.npsLabel}>{labels[cat]}</span>
      <span className={styles.npsScore}>{String(score).padStart(2, '0')}</span>
    </span>
  );
}

/* ---------------------------------------------------------------- Cellules (_TableContentItem 418:38915) */
export function CellText({ children, description, align }: { children: ReactNode; description?: ReactNode; align?: 'start' | 'end' }) {
  return (
    <span className={cx(styles.cellText, align === 'end' && styles.alignEnd)}>
      <span className={styles.main}>{children}</span>
      {description && <span className={styles.desc}>{description}</span>}
    </span>
  );
}
export const CellNumber = ({ value, locale = 'fr-FR' }: { value: number; locale?: string }) => <CellText align="end">{value.toLocaleString(locale)}</CellText>;
export const CellLanguage = ({ country, label }: { country: string; label: ReactNode }) => (
  <span className={styles.inline}><span className={styles.flagBox}><Flag country={country} size={11} /></span><span className={styles.main}>{label}</span></span>
);
export type Device = 'desktop' | 'mobile' | 'tablet';
const DEVICE: Record<Device, { icon: IconName; label: string }> = { desktop: { icon: 'computer', label: 'Ordinateur' }, mobile: { icon: 'smart-phone-01', label: 'Mobile' }, tablet: { icon: 'tablet-01', label: 'Tablette' } };
export const CellDevice = ({ device, label }: { device: Device; label?: ReactNode }) => (
  <span className={cx(styles.inline, styles.mutedIcon)}><Icon name={DEVICE[device].icon} size={16} /><span className={styles.main}>{label ?? DEVICE[device].label}</span></span>
);
export const CellRating = ({ value, max = 5 }: { value: number; max?: number }) => (
  <span className={styles.inline} aria-label={`${value} sur ${max}`}>
    <span className={styles.stars} aria-hidden="true">{Array.from({ length: max }, (_, i) => <Icon key={i} name="star" size={14} className={i < value ? styles.starOn : styles.starOff} />)}</span>
    <span className={styles.desc}>{value}/{max}</span>
  </span>
);
export const CellChoices = ({ choices, max = 2 }: { choices: string[]; max?: number }) => (
  <span className={styles.inline} title={choices.join(', ')}>
    {choices.slice(0, max).map((c) => <Badge key={c} size="sm" color="light-gray">{c}</Badge>)}
    {choices.length > max && <Badge size="sm" color="light-gray">+{choices.length - max}</Badge>}
  </span>
);
export const CellLink = ({ href, label }: { href: string; label?: ReactNode }) => (
  <a className={cx(styles.inline, styles.link)} href={href} target="_blank" rel="noopener noreferrer"><Icon name="link-03" size={16} /><span className={styles.main}>{label ?? href.replace(/^https?:\/\//, '')}</span></a>
);
export const CellConsent = ({ accepted }: { accepted: boolean }) => (
  <span className={cx(styles.inline, accepted ? styles.yes : styles.no)}><Icon name={accepted ? 'tick-02' : 'cancel-01'} size={16} /><span className={styles.main}>{accepted ? 'Accepté' : 'Refusé'}</span></span>
);

/* ---------------------------------------------------------------- Colonnes */
export interface DataTableColumn<R> {
  id: string;
  /** Titre de la colonne (la question, coupée sur deux lignes avec infobulle). */
  header: string;
  /** Picto du type de question (IconBoxedColor), dans l'en-tête et dans ColumnPicker. */
  icon?: IconBoxedColorName;
  /** Largeur en pixels (160 par défaut). */
  width?: number;
  render: (row: R) => ReactNode;
  sortable?: boolean;
  /** Bouton « … » et menu de colonne (trier, filtrer, figer, masquer). Vrai par défaut. */
  menu?: boolean;
}

export type SortState = { id: string; dir: 'asc' | 'desc' } | null;

export interface DataTableProps<R> {
  columns: DataTableColumn<R>[];
  rows: R[];
  getRowId: (row: R) => string;
  /** contained : tableau classique avec contour arrondi. full : bord à bord, pleine page (Analyser › Tableau). */
  variant?: 'contained' | 'full';
  /** Colonnes figées à gauche (restent visibles au défilement horizontal), dans l'ordre. */
  pinned?: string[];
  /** Colonnes masquées. */
  hidden?: string[];
  onPinnedChange?: (ids: string[]) => void;
  onHiddenChange?: (ids: string[]) => void;
  sort?: SortState;
  onSortChange?: (sort: SortState) => void;
  /** « Filtrer sur cette colonne » dans le menu de colonne. */
  onFilterColumn?: (id: string) => void;
  /** Cases à cocher dans la 1re colonne. */
  selected?: string[];
  onSelectedChange?: (ids: string[]) => void;
  onRowClick?: (row: R) => void;
  /** Pied du tableau (Pagination, ColumnNote). */
  footer?: ReactNode;
  empty?: ReactNode;
  'aria-label'?: string;
}

function ColumnMenu({ column, pinned, sortable, onSort, onFilter, onPin, onHide }: { column: string; pinned: boolean; sortable?: boolean; onSort?: (dir: 'asc' | 'desc') => void; onFilter?: () => void; onPin?: () => void; onHide?: () => void }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!open) return;
    const down = (e: PointerEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false); };
    window.addEventListener('pointerdown', down); return () => window.removeEventListener('pointerdown', down);
  }, [open]);
  const act = (fn?: () => void) => () => { setOpen(false); fn?.(); };
  return (
    <span ref={wrap} className={cx(styles.menuWrap, open && styles.menuOpen)}>
      <ButtonIcon icon="more-horizontal" label={`Options de la colonne ${column}`} appearance="ghost" size="xs" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)} />
      {open && (
        <DropdownMenu kind="menu" autoFocus aria-label={`Colonne ${column}`} className={styles.menu} onEscape={() => setOpen(false)}>
          {sortable && onSort && <DropdownItem icon="arrow-up-01" onClick={act(() => onSort('asc'))}>Trier de A à Z</DropdownItem>}
          {sortable && onSort && <DropdownItem icon="arrow-down-01" onClick={act(() => onSort('desc'))}>Trier de Z à A</DropdownItem>}
          {onFilter && <DropdownItem icon="filter" onClick={act(onFilter)}>Filtrer sur cette colonne</DropdownItem>}
          {onPin && <DropdownItem icon="pin" onClick={act(onPin)}>{pinned ? 'Libérer la colonne' : 'Figer la colonne'}</DropdownItem>}
          {onHide && <DropdownItem icon="view-off-slash" onClick={act(onHide)}>Masquer la colonne</DropdownItem>}
        </DropdownMenu>
      )}
    </span>
  );
}

/**
 * DataTable (Figma page Table, Layout analyser-table et page-table) : en-tête collant, colonnes figées à gauche
 * avec une ombre, défilement horizontal, hauteur de ligne pilotée par la cellule la plus haute.
 */
export function DataTable<R>({ columns, rows, getRowId, variant = 'contained', pinned = [], hidden = [], onPinnedChange, onHiddenChange, sort, onSortChange, onFilterColumn, selected, onSelectedChange, onRowClick, footer, empty, ...rest }: DataTableProps<R>) {
  const scroller = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const visible = useMemo(() => {
    const shown = columns.filter((c) => !hidden.includes(c.id));
    const pins = pinned.map((id) => shown.find((c) => c.id === id)).filter(Boolean) as DataTableColumn<R>[];
    return [...pins, ...shown.filter((c) => !pinned.includes(c.id))];
  }, [columns, hidden, pinned]);
  const selectable = !!onSelectedChange;
  const checkW = selectable ? 40 : 0;
  const lefts: Record<string, number> = {};
  let acc = checkW;
  for (const c of visible) { if (pinned.includes(c.id)) { lefts[c.id] = acc; acc += c.width ?? 160; } }
  const totalWidth = checkW + visible.reduce((n, c) => n + (c.width ?? 160), 0);
  const lastPinned = [...visible].reverse().find((c) => pinned.includes(c.id))?.id;
  const allIds = rows.map(getRowId);
  const allChecked = selectable && allIds.length > 0 && allIds.every((id) => selected?.includes(id));
  const toggle = (id: string) => onSelectedChange?.(selected?.includes(id) ? selected.filter((x) => x !== id) : [...(selected ?? []), id]);
  const stick = (id: string): CSSProperties | undefined => (id in lefts ? { left: lefts[id] } : undefined);

  return (
    <div className={cx(styles.table, styles[variant], scrolled && styles.scrolled)}>
      <div ref={scroller} className={styles.scroller} onScroll={(e) => setScrolled(e.currentTarget.scrollLeft > 0)}>
        <table aria-label={rest['aria-label']} aria-rowcount={rows.length + 1} style={{ width: totalWidth }}>
          <colgroup>{selectable && <col style={{ width: checkW }} />}{visible.map((c) => <col key={c.id} style={{ width: c.width ?? 160 }} />)}</colgroup>
          <thead>
            <tr>
              {selectable && <th className={cx(styles.th, styles.pinned, styles.check)} style={{ left: 0 }}><Checkbox aria-label="Tout sélectionner" checked={allChecked} onChange={() => onSelectedChange?.(allChecked ? [] : allIds)} /></th>}
              {visible.map((c) => {
                const isPinned = pinned.includes(c.id);
                const s = sort?.id === c.id ? sort.dir : null;
                return (
                  <th key={c.id} scope="col" aria-sort={s === 'asc' ? 'ascending' : s === 'desc' ? 'descending' : undefined}
                    className={cx(styles.th, isPinned && styles.pinned, c.id === lastPinned && styles.lastPinned)} style={stick(c.id)}>
                    <span className={styles.thInner}>
                      {isPinned && <Icon name="pin" size={14} className={styles.pinIcon} aria-label="Colonne figée" />}
                      {c.icon && <IconBoxedColor icon={c.icon} size={20} />}
                      <TruncatedText lines={2} className={styles.thLabel}>{c.header}</TruncatedText>
                      {c.sortable && onSortChange && (
                        <button type="button" className={cx(styles.sortBtn, s && styles.sortActive)} aria-label={`Trier par ${c.header}`}
                          onClick={() => onSortChange(s === 'asc' ? { id: c.id, dir: 'desc' } : s === 'desc' ? null : { id: c.id, dir: 'asc' })}>
                          <Icon name={s === 'desc' ? 'arrow-down-01' : s === 'asc' ? 'arrow-up-01' : 'arrow-down-01'} size={14} />
                        </button>
                      )}
                      {c.menu !== false && (onPinnedChange || onHiddenChange || onFilterColumn || (c.sortable && onSortChange)) && (
                        <ColumnMenu column={c.header} pinned={isPinned} sortable={c.sortable}
                          onSort={onSortChange ? (dir) => onSortChange({ id: c.id, dir }) : undefined}
                          onFilter={onFilterColumn ? () => onFilterColumn(c.id) : undefined}
                          onPin={onPinnedChange ? () => onPinnedChange(isPinned ? pinned.filter((x) => x !== c.id) : [...pinned, c.id]) : undefined}
                          onHide={onHiddenChange ? () => onHiddenChange([...hidden, c.id]) : undefined} />
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const id = getRowId(r);
              const isSel = selected?.includes(id);
              return (
                <tr key={id} className={cx(isSel && styles.rowSelected, onRowClick && styles.clickable)} onClick={onRowClick ? () => onRowClick(r) : undefined}>
                  {selectable && <td className={cx(styles.td, styles.pinned, styles.check)} style={{ left: 0 }} onClick={(e) => e.stopPropagation()}><Checkbox aria-label="Sélectionner la ligne" checked={!!isSel} onChange={() => toggle(id)} /></td>}
                  {visible.map((c) => <td key={c.id} className={cx(styles.td, pinned.includes(c.id) && styles.pinned, c.id === lastPinned && styles.lastPinned)} style={stick(c.id)}>{c.render(r)}</td>)}
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows.length === 0 && <div className={styles.empty}>{empty ?? 'Aucune réponse pour ces filtres.'}</div>}
      </div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}

/* ---------------------------------------------------------------- ColumnPicker (9989:125355) */
export interface ColumnPickerItem { id: string; label: string; icon?: IconBoxedColorName; visible: boolean; pinned: boolean }
export interface ColumnPickerGroup { id: string; title: string; items: ColumnPickerItem[] }

export interface ColumnPickerProps {
  /** Répondant (Testeur, Date, Langue, Appareil), Champs cachés (un par un), Questions. */
  groups: ColumnPickerGroup[];
  onToggleVisible: (id: string, visible: boolean) => void;
  onTogglePinned: (id: string, pinned: boolean) => void;
  /** Glisser-déposer dans un groupe : nouvel ordre des identifiants du groupe. */
  onReorder?: (groupId: string, ids: string[]) => void;
  onShowAll?: () => void;
  onReset?: () => void;
  title?: string;
}

/** ColumnPicker : panneau « Colonnes affichées » (recherche, groupes, poignée, punaise, interrupteur, pied). */
export function ColumnPicker({ groups, onToggleVisible, onTogglePinned, onReorder, onShowAll, onReset, title = 'Colonnes affichées' }: ColumnPickerProps) {
  const [q, setQ] = useState('');
  const [drag, setDrag] = useState<{ group: string; id: string } | null>(null);
  const all = groups.flatMap((g) => g.items);
  const shown = all.filter((i) => i.visible).length;
  const match = (i: ColumnPickerItem) => !q || i.label.toLowerCase().includes(q.toLowerCase());
  const drop = (g: ColumnPickerGroup, target: string) => {
    if (!drag || drag.group !== g.id || drag.id === target || !onReorder) return;
    const ids = g.items.map((i) => i.id).filter((x) => x !== drag.id);
    ids.splice(ids.indexOf(target), 0, drag.id);
    onReorder(g.id, ids);
  };
  return (
    <div className={styles.picker} role="dialog" aria-label={title}>
      <div className={styles.pickerBody}>
        <div className={styles.pickerHead}><span className={styles.pickerTitle}>{title}</span><span className={styles.desc}>{shown} sur {all.length}</span></div>
        <SearchBar size="sm" shortcut={false} placeholder="Rechercher une colonne" value={q} onChange={(e) => setQ(e.target.value)} />
        {groups.map((g) => {
          const items = g.items.filter(match);
          if (!items.length) return null;
          return (
            <div key={g.id} role="group" aria-label={g.title}>
              <p className={styles.groupTitle}>{g.title}</p>
              <ul className={styles.pickList}>
                {items.map((i) => (
                  <li key={i.id} className={cx(styles.pickItem, !i.visible && styles.pickHidden)} draggable={!!onReorder && !q}
                    onDragStart={() => setDrag({ group: g.id, id: i.id })} onDragEnd={() => setDrag(null)}
                    onDragOver={(e) => { if (drag?.group === g.id) e.preventDefault(); }} onDrop={() => drop(g, i.id)}>
                    {onReorder && <Icon name="drag-drop-vertical" size={16} className={styles.grip} aria-hidden="true" />}
                    {i.icon && <IconBoxedColor icon={i.icon} size={20} />}
                    <TruncatedText className={styles.pickLabel}>{i.label}</TruncatedText>
                    <button type="button" className={cx(styles.pinBtn, i.pinned && styles.pinOn)} aria-pressed={i.pinned} aria-label={i.pinned ? `Libérer ${i.label}` : `Figer ${i.label}`} onClick={() => onTogglePinned(i.id, !i.pinned)}>
                      <Icon name="pin" size={14} />
                    </button>
                    <Switch size="sm" aria-label={`Afficher ${i.label}`} checked={i.visible} onChange={(e) => onToggleVisible(i.id, e.target.checked)} />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      {(onShowAll || onReset) && (
        <div className={styles.pickerFoot}>
          {onShowAll && <Button variant="ghost" color="neutral" size="sm" onClick={onShowAll}>Tout afficher</Button>}
          {onReset && <Button variant="ghost" color="neutral" size="sm" onClick={onReset}>Réinitialiser</Button>}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- SaveReportModal (9997:2218) */
export interface SavedReport { id: string; label: string }
export type SaveReportResult = { mode: 'update'; id: string } | { mode: 'new'; name: string; color: string };
export const reportColors = ['brand', 'ocean', 'cyan', 'tree', 'turquoise', 'shamrock', 'green', 'apple', 'yellow', 'mustard', 'orange'] as const;

export interface SaveReportModalProps {
  open: boolean;
  onClose: () => void;
  reports: SavedReport[];
  /** Rapport en cours (proposé à la mise à jour). */
  currentId: string;
  onSave: (result: SaveReportResult) => void;
}

/** SaveReportModal : « Enregistrer le rapport » (filtres et colonnes). Mettre à jour un rapport, ou en créer un nouveau (nom, couleur). */
export function SaveReportModal({ open, onClose, reports, currentId, onSave }: SaveReportModalProps) {
  const [asNew, setAsNew] = useState(false);
  const [target, setTarget] = useState(currentId);
  const [name, setName] = useState('');
  const [color, setColor] = useState<string>(reportColors[0]);
  useEffect(() => { if (open) { setAsNew(false); setTarget(currentId); setName(''); setColor(reportColors[0]); } }, [open, currentId]);
  const canSave = asNew ? name.trim().length > 0 : !!target;
  const save = () => { if (!canSave) return; onSave(asNew ? { mode: 'new', name: name.trim(), color } : { mode: 'update', id: target }); };
  return (
    <Modal open={open} onClose={onClose} title="Enregistrer le rapport" width={480} divider
      description="Les filtres et les colonnes affichées sont gardés dans le rapport. Sans enregistrement, ils sont réinitialisés en quittant la page."
      footer={<><Button variant="secondary-outline" onClick={onClose}>Annuler</Button><Button onClick={save} disabled={!canSave}>{asNew ? 'Créer le rapport' : 'Enregistrer'}</Button></>}>
      <div className={styles.saveBody}>
        {!asNew && (
          <label className={styles.saveField}>
            <span className={styles.saveLabel}>Rapport à mettre à jour</span>
            <select className={styles.saveSelect} value={target} onChange={(e) => setTarget(e.target.value)}>
              {reports.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
            </select>
          </label>
        )}
        <Switch label="Enregistrer comme nouveau rapport" description={asNew ? undefined : 'Par exemple : NPS négatifs, réponses mobiles.'} checkPlacement="right" checked={asNew} onChange={(e) => setAsNew(e.target.checked)} />
        {asNew && (
          <>
            <Input label="Nom du rapport" placeholder="Par exemple : NPS négatifs" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
            <fieldset className={styles.colors}>
              <legend className={styles.saveLabel}>Couleur</legend>
              {reportColors.map((c) => (
                <label key={c} className={styles.colorDot} style={{ background: `var(--brand-color-${c})` }}>
                  <input type="radio" name="report-color" value={c} checked={color === c} onChange={() => setColor(c)} aria-label={c} />
                </label>
              ))}
            </fieldset>
          </>
        )}
      </div>
    </Modal>
  );
}
