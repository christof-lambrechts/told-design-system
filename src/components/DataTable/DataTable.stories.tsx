import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useRef, useState, useEffect } from 'react';
import { DataTable, ColumnPicker, SaveReportModal, NpsScoreLabel, CellText, CellLanguage, CellDevice, CellRating, CellChoices, CellConsent, type DataTableColumn, type SortState, type ColumnPickerGroup } from './DataTable';
import { Layout } from '../Layout/Layout';
import { EditorHeader, ButtonEditionMenu, EditorSteps, type EditorStep } from '../EditorHeader/EditorHeader';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
import { ButtonGroup } from '../Button/ButtonGroup';
import { Popover as DsPopover } from '../Overlay/Overlay';
import { DropdownItem } from '../Select/Select';
import { Button, ButtonIcon } from '../Button/Button';
import { ButtonTab } from '../Tabs/Tabs';
import { Pagination } from '../Pagination/Pagination';
import { FilterBar, FilterChip, FilterLogic } from '../Filter/Filter';

const meta = {
  title: 'Composants/Tableau/DataTable',
  component: DataTable,
  parameters: { layout: 'padded', docs: { description: { component: 'Tableau des réponses (Figma page Table ✅ et Layout analyser-table / page-table). Colonnes figées à gauche (ombre au défilement), en-tête collant, menu de colonne (trier, filtrer, figer, masquer), panneau « Colonnes affichées » (chaque colonne, y compris Testeur, Date, Langue et chaque champ caché), texte trop long coupé avec infobulle.' } } },
} satisfies Meta<typeof DataTable>;
export default meta;

type Row = { id: string; tester: string; status: string; date: string; lang: 'fr' | 'gb'; device: 'desktop' | 'mobile' | 'tablet'; nps: number; why: string; improve: string; rating: number; choices: string[]; consent: boolean; email: string; plan: string };
const ROWS: Row[] = [
  { id: '084a55', tester: 'camille.martin@exemple.fr', status: 'Terminé', date: '27/10/2026 22:11', lang: 'gb', device: 'desktop', nps: 8, why: 'Rapide à prendre en main', improve: 'Plus d’exports', rating: 4, choices: ['Prix', 'Ergonomie', 'Support', 'Intégrations'], consent: true, email: 'camille.martin@exemple.fr', plan: 'Pro' },
  { id: '3ae9c6', tester: 'leo.bernard@exemple.fr', status: 'Terminé', date: '18/09/2026 13:14', lang: 'fr', device: 'mobile', nps: 9, why: 'Le support répond vite, et l’équipe prend le temps de comprendre notre besoin avant de proposer une solution', improve: 'Rien à signaler', rating: 5, choices: ['Support'], consent: true, email: 'leo.bernard@exemple.fr', plan: 'Starter' },
  { id: '906460', tester: 'ines.petit@exemple.fr', status: 'Abandonné à l’étape 3', date: '24/07/2026 10:52', lang: 'gb', device: 'desktop', nps: 5, why: 'Trop cher pour nous', improve: 'Une offre plus petite', rating: 2, choices: ['Prix', 'Ergonomie'], consent: false, email: 'ines.petit@exemple.fr', plan: 'Pro' },
  { id: '147dd2', tester: 'hugo.durand@exemple.fr', status: 'Terminé', date: '21/07/2026 16:44', lang: 'fr', device: 'tablet', nps: 10, why: 'Indispensable au quotidien', improve: 'Une app mobile', rating: 4, choices: ['Ergonomie', 'Prix', 'Support'], consent: true, email: 'hugo.durand@exemple.fr', plan: 'Business' },
  { id: '3d6e30', tester: 'lucie.fabre@exemple.fr', status: 'Terminé', date: '07/07/2026 17:51', lang: 'fr', device: 'mobile', nps: 4, why: 'Il manque des intégrations', improve: 'Connecter HubSpot', rating: 3, choices: ['Intégrations'], consent: true, email: 'lucie.fabre@exemple.fr', plan: 'Starter' },
];
const COLUMNS: DataTableColumn<Row>[] = [
  { id: 'tester', header: 'Testeur', width: 240, sortable: true, render: (r) => <CellText description={r.status}>{r.tester}</CellText> },
  { id: 'date', header: 'Date', width: 160, sortable: true, render: (r) => <CellText>{r.date}</CellText> },
  { id: 'lang', header: 'Langue', width: 140, render: (r) => <CellLanguage country={r.lang} label={r.lang === 'fr' ? 'Français' : 'Anglais'} /> },
  { id: 'device', header: 'Appareil', width: 150, render: (r) => <CellDevice device={r.device} /> },
  { id: 'nps', header: 'Quelle est la probabilité que vous recommandiez Told à un collègue ou à un ami ?', icon: 'questionnps', width: 200, sortable: true, render: (r) => <NpsScoreLabel score={r.nps} /> },
  { id: 'why', header: 'Pourquoi cette note ?', icon: 'questionopen', width: 240, render: (r) => <CellText>{r.why}</CellText> },
  { id: 'improve', header: 'Comment pouvons-nous nous améliorer ?', icon: 'questionopen', width: 240, render: (r) => <CellText>{r.improve}</CellText> },
  { id: 'rating', header: 'Comment évaluez-vous notre service ?', icon: 'questionscale', width: 180, sortable: true, render: (r) => <CellRating value={r.rating} /> },
  { id: 'choices', header: 'Ce qui compte pour vous', icon: 'questionmultiple', width: 240, render: (r) => <CellChoices choices={r.choices} /> },
  { id: 'consent', header: 'Consentement', icon: 'consent', width: 150, render: (r) => <CellConsent accepted={r.consent} /> },
  { id: 'email', header: 'email', icon: 'hiddenfield', width: 240, render: (r) => <CellText>{r.email}</CellText> },
  { id: 'plan', header: 'plan', icon: 'hiddenfield', width: 120, render: (r) => <CellText>{r.plan}</CellText> },
];
const GROUPS: { id: string; title: string; ids: string[] }[] = [
  { id: 'respondent', title: 'Répondant', ids: ['tester', 'date', 'lang', 'device'] },
  { id: 'hidden', title: 'Champs cachés', ids: ['email', 'plan'] },
  { id: 'questions', title: 'Questions', ids: ['nps', 'why', 'improve', 'rating', 'choices', 'consent'] },
];

function useTableState() {
  const [pinned, setPinned] = useState<string[]>(['tester', 'nps']);
  const [hidden, setHidden] = useState<string[]>(['device']);
  const [sort, setSort] = useState<SortState>(null);
  const [order, setOrder] = useState(GROUPS);
  const rows = useMemo(() => {
    if (!sort) return ROWS;
    const k = sort.id as keyof Row; const m = sort.dir === 'asc' ? 1 : -1;
    return [...ROWS].sort((a, b) => (a[k] > b[k] ? m : a[k] < b[k] ? -m : 0));
  }, [sort]);
  const columns = useMemo(() => order.flatMap((g) => g.ids).map((id) => COLUMNS.find((c) => c.id === id)!), [order]);
  const groups: ColumnPickerGroup[] = order.map((g) => ({ id: g.id, title: g.title, items: g.ids.map((id) => { const c = COLUMNS.find((x) => x.id === id)!; return { id, label: c.header, icon: c.icon, visible: !hidden.includes(id), pinned: pinned.includes(id) }; }) }));
  const picker = (
    <ColumnPicker groups={groups}
      onToggleVisible={(id, v) => setHidden(v ? hidden.filter((x) => x !== id) : [...hidden, id])}
      onTogglePinned={(id, p) => setPinned(p ? [...pinned, id] : pinned.filter((x) => x !== id))}
      onReorder={(gid, ids) => setOrder(order.map((g) => (g.id === gid ? { ...g, ids } : g)))}
      onShowAll={() => setHidden([])} onReset={() => { setHidden(['device']); setPinned(['tester', 'nps']); setOrder(GROUPS); }} />
  );
  const changed = hidden.join() !== 'device' || pinned.join() !== 'tester,nps' || !!sort;
  return { pinned, setPinned, hidden, setHidden, sort, setSort, rows, columns, picker, changed, reset: () => { setHidden(['device']); setPinned(['tester', 'nps']); setSort(null); setOrder(GROUPS); } };
}

function Popover({ label, icon, children, align = 'right' }: { label: string; icon: 'left-to-right-list-bullet' | 'chart-01'; children: React.ReactNode; align?: 'left' | 'right' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!open) return; const d = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); }; window.addEventListener('pointerdown', d); return () => window.removeEventListener('pointerdown', d); }, [open]);
  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <Button size="sm" color="neutral" iconLeft={icon} iconRight="arrow-down-01" aria-expanded={open} onClick={() => setOpen(!open)}>{label}</Button>
      {open && <div data-theme="light" style={{ position: 'absolute', top: 'calc(100% + 6px)', [align]: 0, zIndex: 50 }}>{children}</div>}
    </div>
  );
}

export const Classique: StoryObj = {
  name: 'Tableau classique (contour)',
  render: () => {
    const t = useTableState();
    const [sel, setSel] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    return (
      <div style={{ display: 'grid', gap: 12, maxWidth: 1100 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Popover label={`Colonnes · ${COLUMNS.length - t.hidden.length} sur ${COLUMNS.length}`} icon="left-to-right-list-bullet">{t.picker}</Popover></div>
        <DataTable aria-label="Réponses" columns={t.columns} rows={t.rows} getRowId={(r) => r.id} pinned={t.pinned} hidden={t.hidden}
          onPinnedChange={t.setPinned} onHiddenChange={t.setHidden} sort={t.sort} onSortChange={t.setSort} onFilterColumn={() => {}}
          selected={sel} onSelectedChange={setSel}
          footer={<Pagination page={page} pageCount={3} onPageChange={setPage} rowCount={24} />} />
      </div>
    );
  },
};

export const Labels: StoryObj = {
  name: 'NpsScoreLabel',
  render: () => <div style={{ display: 'grid', gap: 8 }}>{[10, 9, 8, 7, 6, 4, 0].map((s) => <NpsScoreLabel key={s} score={s} />)}</div>,
};

export const AnalyserTableau: StoryObj = {
  name: 'Analyser › Tableau (bord à bord, filtres, enregistrement)',
  parameters: { layout: 'fullscreen' },
  render: () => {
    const t = useTableState();
    const [step, setStep] = useState<EditorStep>('analyze');
    const [filtersOpen, setFiltersOpen] = useState(true);
    const [filtered, setFiltered] = useState(true);
    const [saving, setSaving] = useState(false);
    const [reports, setReports] = useState([{ id: 'global', label: 'Rapport global' }, { id: 'neg', label: 'NPS négatifs' }]);
    const [current, setCurrent] = useState('global');
    const [page, setPage] = useState(1);
    const changes = t.changed || filtered;
    const header = (
      <EditorHeader
        start={<><ButtonEditionMenu /><Breadcrumb theme="dark" items={[{ label: 'Mon projet' }]} current="Nom du questionnaire" /></>}
        center={<EditorSteps value={step} onChange={setStep} published />}
        end={<><span data-theme="light" style={{ display: 'inline-flex' }}><Button size="sm" color="neutral" variant="secondary-outline" iconLeft="share-03">Partager</Button></span><Button size="sm" iconLeft="download-05">Extraire</Button></>}
        tabs={<><ButtonTab size="sm" appearance="ghost" icon="dashboard-speed-02">Synthèse</ButtonTab><ButtonTab size="sm" appearance="ghost" icon="message-multiple-02">Réponses</ButtonTab><ButtonTab size="sm" appearance="ghost" icon="layout-table-01" selected>Tableau</ButtonTab><ButtonTab size="sm" appearance="ghost" icon="user-multiple-02">Parcours</ButtonTab></>}
        status={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ButtonGroup appearance="inverse">
            <DsPopover aria-label="Rapports" placement="bottom-end" width={220}
              trigger={<Button size="sm" color="neutral" iconLeft="chart-01" iconRight="arrow-down-01">{reports.find((r) => r.id === current)!.label}</Button>}>
              {(close) => reports.map((r) => <DropdownItem key={r.id} selected={r.id === current} onClick={() => { setCurrent(r.id); close(); }}>{r.label}</DropdownItem>)}
            </DsPopover>
            <DsPopover aria-label="Colonnes" placement="bottom-end" surface={false}
              trigger={<Button size="sm" color="neutral" iconLeft="left-to-right-list-bullet" iconRight="arrow-down-01">Colonnes</Button>}>
              {t.picker}
            </DsPopover>
            <Button size="sm" color="neutral" iconLeft="filter" iconRight="arrow-down-01" aria-expanded={filtersOpen} onClick={() => setFiltersOpen(!filtersOpen)}>Filtres</Button>
          </ButtonGroup>
          {changes && <><Button size="sm" onClick={() => setSaving(true)}>Enregistrer</Button><ButtonIcon icon="cancel-01" label="Annuler les modifications" appearance="ghost" size="sm" onClick={() => { t.reset(); setFiltered(false); }} /></>}
        </span>}
      />
    );
    return (
      <div style={{ height: '100vh' }}>
        <Layout type="analyser" width="full" header={header}
          filters={filtersOpen ? (
            <FilterBar onAdd={() => {}} onClear={() => setFiltered(false)}>
              {filtered && <><FilterChip field="NPS" operator="est entre" value="0 et 6" onRemove={() => setFiltered(false)} /><FilterLogic value="and" onChange={() => {}} /><FilterChip field="Date" operator="est" value="30 derniers jours" /></>}
            </FilterBar>
          ) : undefined}>
          <DataTable aria-label="Réponses" variant="full" columns={t.columns} rows={filtered ? t.rows.filter((r) => r.nps <= 6) : t.rows} getRowId={(r) => r.id}
            pinned={t.pinned} hidden={t.hidden} onPinnedChange={t.setPinned} onHiddenChange={t.setHidden} sort={t.sort} onSortChange={t.setSort} onFilterColumn={() => setFiltersOpen(true)}
            footer={<Pagination page={page} pageCount={3} onPageChange={setPage} rowCount={24} />} />
        </Layout>
        <SaveReportModal open={saving} onClose={() => setSaving(false)} reports={reports} currentId={current}
          onSave={(r) => { if (r.mode === 'new') { const id = String(Date.now()); setReports([...reports, { id, label: r.name }]); setCurrent(id); } setSaving(false); }} />
      </div>
    );
  },
};
