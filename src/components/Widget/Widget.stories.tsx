import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChecklistItem, Widget, WidgetButton, WidgetChoice, WidgetConsent } from './Widget';

const meta = { title: 'Composants/Widget/Widget visiteur', component: Widget } satisfies Meta<typeof Widget>;
export default meta;

const answers = ['Tous les jours', 'Plusieurs fois par semaine', 'Rarement', 'Jamais'];

function Demo({ theme }: { theme: 'light' | 'dark' }) {
  const [sel, setSel] = useState(1);
  const [consent, setConsent] = useState<'ask' | 'accepted' | 'refused'>('ask');
  return (
    <Widget
      theme={theme}
      sender={{ name: 'Marc Honoré · Product designer' }}
      progress={{ current: 1, total: 5 }}
      question="À quelle fréquence utilisez-vous notre produit ?"
      consent={<WidgetConsent state={consent} message="Acceptez-vous de partager vos réponses avec l’équipe produit ?" onAccept={() => setConsent('accepted')} onRefuse={() => setConsent('refused')} />}
      onPrevious={() => {}}
      onNext={() => {}}
      onClose={() => {}}
    >
      {answers.map((a, i) => <WidgetChoice key={a} letter={'ABCD'[i]} label={a} selected={sel === i} onClick={() => setSel(i)} />)}
    </Widget>
  );
}

export const Clair: StoryObj = { name: 'Widget · clair', render: () => <Demo theme="light" /> };
export const Sombre: StoryObj = { name: 'Widget · sombre', render: () => <Demo theme="dark" /> };

export const Boutons: StoryObj = {
  name: 'WidgetButton',
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      {(['light', 'dark'] as const).map((t) => (
        <div key={t} data-theme={t} style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 20, borderRadius: 16, background: 'var(--widget-surface-default)' }}>
          {(['primary', 'secondary', 'ghost'] as const).map((v) => (
            <div key={v} style={{ display: 'flex', gap: 8 }}>
              <WidgetButton variant={v}>Suivant</WidgetButton>
              <WidgetButton variant={v} size="sm">Suivant</WidgetButton>
              <WidgetButton variant={v} disabled>Suivant</WidgetButton>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Checklist: StoryObj = {
  name: 'ChecklistItem',
  render: () => (
    <div data-theme="light" style={{ width: 340, display: 'flex', flexDirection: 'column', gap: 8, padding: 20, borderRadius: 20, background: 'var(--widget-surface-default)' }}>
      <ChecklistItem state="done" title="Installer Told sur votre site" description="Une ligne de code." />
      <ChecklistItem state="current" title="Créer votre premier scénario" description="Deux minutes, guidé pas à pas." />
      <ChecklistItem title="Inviter votre équipe" description="Partagez les résultats." />
    </div>
  ),
};
