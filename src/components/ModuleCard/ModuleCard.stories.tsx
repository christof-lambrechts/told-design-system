import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DropZone, FlowDivider, InsertBar, MessageCard, ModuleCard, SubStepItem } from './ModuleCard';

const meta = { title: 'Composants/Cartes/ModuleCard', component: ModuleCard } satisfies Meta<typeof ModuleCard>;
export default meta;

export const Colonne: StoryObj = {
  name: 'Colonne de construction',
  render: () => {
    const [sel, setSel] = useState('nps');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 16, background: 'var(--neutral-surface-canvas)', borderRadius: 12 }}>
        <FlowDivider kind="start" />
        <MessageCard kind="welcome" preview="Bonjour ! Deux minutes pour nous aider ?" selected={sel === 'welcome'} onClick={() => setSel('welcome')} />
        <FlowDivider kind="content" />
        <ModuleCard title="Votre avis" format="Modale" selected={sel === 'nps' || sel === 'open'} onAdd={() => {}}>
          <SubStepItem typeIcon="dashboard-speed-02" typeColor="purple" label="Recommanderiez-vous Told ?" selected={sel === 'nps'} onClick={() => setSel('nps')} />
          <SubStepItem typeIcon="message-01" typeColor="pink" label="Qu’est-ce qui vous ferait mettre 10 ?" condition missingTranslation selected={sel === 'open'} onClick={() => setSel('open')} />
        </ModuleCard>
        <InsertBar dropTarget />
        <DropZone />
        <FlowDivider kind="end" />
        <MessageCard kind="thanks" preview="Merci pour votre retour !" selected={sel === 'thanks'} onClick={() => setSel('thanks')} />
      </div>
    );
  },
};
