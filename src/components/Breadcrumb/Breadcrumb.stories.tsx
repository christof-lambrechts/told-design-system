import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb, EditableTitle } from './Breadcrumb';
import { Badge } from '../Badge/Badge';

const meta = { title: "Composants/Navigation/Fil d'Ariane", component: Breadcrumb } satisfies Meta<typeof Breadcrumb>;
export default meta;

export const Clair: StoryObj = {
  name: 'Breadcrumb',
  render: () => {
    const [t, setT] = useState('Créer une facture');
    return (
      <div style={{ display: 'grid', gap: 20 }}>
        <Breadcrumb items={[{ label: 'Inqom' }]} current={t} onRename={setT} />
        <Breadcrumb items={[{ label: 'Inqom' }, { label: 'Onboarding' }]} current={t} onRename={setT} onBack={() => {}} status={<Badge dot color="light-gray">Brouillon</Badge>} />
      </div>
    );
  },
};

export const Sombre: StoryObj = {
  render: () => {
    const [t, setT] = useState('Créer une facture');
    return (
      <div style={{ background: 'var(--brand-neutral-950)', padding: 20, borderRadius: 12 }}>
        <Breadcrumb theme="dark" items={[{ label: 'Inqom' }, { label: 'Onboarding' }]} current={t} onRename={setT} />
      </div>
    );
  },
};

export const Titre: StoryObj = {
  name: 'EditableTitle',
  render: () => {
    const [t, setT] = useState('Ma démo');
    return <EditableTitle value={t} onChange={setT} />;
  },
};
