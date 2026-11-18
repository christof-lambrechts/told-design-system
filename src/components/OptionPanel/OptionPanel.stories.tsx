import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { OptionPanel, OptionPanelItem, PanelHeader } from './OptionPanel';
import { Switch } from '../Choice/Choice';
import { Select } from '../Select/Select';

const meta = { title: 'Composants/Panneaux/OptionPanel', component: OptionPanel, parameters: { layout: 'padded' } } satisfies Meta<typeof OptionPanel>;
export default meta;

function Demo() {
  const [scope, setScope] = useState('step');
  const [format, setFormat] = useState('widget');
  return (
    <div style={{ border: '1px solid var(--neutral-border-default)', borderRadius: 12, overflow: 'hidden', width: 356 }}>
      <OptionPanel
        header={<PanelHeader icon="questionscale" title="Échelle 1-5" description="Bloc question · obligatoire ·" onChangeType={() => {}} onMenu={() => {}} />}
        scopes={[{ value: 'step', label: 'Étape' }, { value: 'block', label: 'Bloc' }]}
        scope={scope}
        onScopeChange={setScope}
      >
        <OptionPanelItem icon="layout" label="Format" value="Widget" defaultOpen>
          <Select options={[{ value: 'widget', label: 'Widget' }, { value: 'modal', label: 'Modale' }, { value: 'banner', label: 'Bannière' }]} value={format} onChange={setFormat} aria-label="Format" />
        </OptionPanelItem>
        <OptionPanelItem icon="position" label="Position" value="Bas à droite">
          <Switch label="Masquer sur mobile" />
        </OptionPanelItem>
        <OptionPanelItem icon="time" label="Déclencheur" required>
          <Switch label="Après 5 secondes" defaultChecked />
        </OptionPanelItem>
        <OptionPanelItem icon="party" label="Confettis" pro>
          <Switch label="Lancer à la fin" />
        </OptionPanelItem>
      </OptionPanel>
    </div>
  );
}

export const Panneau: StoryObj = { name: 'Panneau', render: () => <Demo /> };

export const EnTete: StoryObj = {
  name: 'En-tête (PanelHeader)',
  render: () => (
    <div style={{ display: 'grid', gap: 24, width: 324 }}>
      <PanelHeader icon="questionnps" title="Question 1 · NPS" description="Bloc question · obligatoire ·" onChangeType={() => {}} onMenu={() => {}} />
      <PanelHeader icon="logo" title="Image" description="Bloc secondaire" backLabel="Question 1" onBack={() => {}} onMenu={() => {}} />
    </div>
  ),
};
