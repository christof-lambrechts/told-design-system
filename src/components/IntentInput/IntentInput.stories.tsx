import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IntentInput, IntentPanel, PromptChip, QuickSuggestion } from './IntentInput';

const meta = { title: 'Composants/Saisie et choix/Champ IA', component: IntentInput } satisfies Meta<typeof IntentInput>;
export default meta;

const controls = (
  <>
    <PromptChip icon="internet-antenna-01">Site marketing</PromptChip>
    <PromptChip>Français</PromptChip>
    <PromptChip>Ton direct</PromptChip>
  </>
);

export const Champ: StoryObj = {
  name: 'IntentInput',
  render: () => {
    const [v, setV] = useState('');
    const [w, setW] = useState('Montre comment créer une facture et l’envoyer à un client');
    const [l, setL] = useState(false);
    return (
      <div style={{ display: 'grid', gap: 20, width: 720 }}>
        <IntentInput value={v} onChange={setV} onSubmit={() => {}} controls={controls} onMic={() => setL(!l)} listening={l} />
        <IntentInput value={w} onChange={setW} onSubmit={() => {}} emphasis="ai" controls={controls} onMic={() => {}} />
        <IntentInput size="compact" value={v} onChange={setV} onSubmit={() => {}} onMic={() => {}} />
      </div>
    );
  },
};

export const Suggestions: StoryObj = {
  name: 'QuickSuggestion',
  render: () => {
    const [s, setS] = useState(1);
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {['Créer une facture', 'Inviter un collaborateur', 'Exporter le grand livre'].map((t, i) => <QuickSuggestion key={t} selected={s === i} onClick={() => setS(i)}>{t}</QuickSuggestion>)}
      </div>
    );
  },
};

export const Panneau: StoryObj = {
  name: 'IntentPanel',
  render: () => {
    const [v, setV] = useState('');
    return (
      <div style={{ width: 760 }}>
        <IntentPanel
          input={<IntentInput value={v} onChange={setV} onSubmit={() => {}} controls={controls} onMic={() => {}} />}
          secondaryText="Ou enregistre-le toi-même : chaque clic devient une étape."
          secondaryAction={{ label: 'Enregistrer', onClick: () => {}, color: 'rec' }}
          suggestions={['Créer une facture', 'Inviter un collaborateur', 'Exporter le grand livre', 'Rapprocher un relevé'].map((t) => <QuickSuggestion key={t} onClick={() => setV(t)}>{t}</QuickSuggestion>)}
        />
      </div>
    );
  },
};
