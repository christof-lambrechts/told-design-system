import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterBar, FilterChip, FilterLogic, FilterMenu } from './Filter';

const meta = { title: 'Composants/Données/Filter', component: FilterBar, parameters: { layout: 'padded' } } satisfies Meta<typeof FilterBar>;
export default meta;

function Demo({ placement }: { placement: 'page' | 'floating' }) {
  const [logic, setLogic] = useState<'and' | 'or'>('and');
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState('date');
  const types = [
    { title: 'Comportement', items: [{ id: 'date', icon: 'time' as const, label: 'Date' }, { id: 'page', icon: 'click' as const, label: 'Page visitée' }] },
    { title: 'Réponses', items: [{ id: 'nps', icon: 'questionnps' as const, label: 'NPS', detail: 'est entre 0 et 6 · détracteurs' }] },
  ];
  return (
    <div style={{ width: 900, minHeight: 360 }}>
      <FilterBar placement={placement} onAdd={() => setOpen(!open)} onClear={() => {}} onSaveView={() => {}}
        menu={open && <FilterMenu query={q} onQueryChange={setQ} groups={types} activeId={active} onActiveChange={setActive} onSelect={() => setOpen(false)} onClose={() => setOpen(false)} />}>
        <FilterChip icon="time" field="Date" operator="est" value="30 derniers jours" onRemove={() => {}} />
        <FilterLogic value={logic} onChange={setLogic} />
        <FilterChip icon="questionnps" field="Note" operator="≥" value="4" valueIcon="star" onRemove={() => {}} open />
        <FilterLogic value={logic} onChange={setLogic} />
        <FilterChip icon="click" field="Page" operator="contient" onRemove={() => {}} />
      </FilterBar>
    </div>
  );
}

export const Page: StoryObj = { name: 'FilterBar', render: () => <Demo placement="page" /> };
export const Flottante: StoryObj = { render: () => <Demo placement="floating" /> };
