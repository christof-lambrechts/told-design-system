import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { GettingStarted, GettingStartedStep, type StepState } from './GettingStarted';
import { Button } from '../Button/Button';

const meta = { title: 'Composants/Cartes/GettingStarted', component: GettingStarted, parameters: { layout: 'padded' } } satisfies Meta<typeof GettingStarted>;
export default meta;

const titles = ['Créez votre premier Told', 'Installez Told sur votre site', 'Publiez et suivez les réponses', 'Invitez votre équipe'];

export const Bloc: StoryObj = {
  name: 'GettingStarted',
  render: () => {
    const [cur, setCur] = useState(1);
    const state = (i: number): StepState => (i < cur ? 'done' : i === cur ? 'current' : 'todo');
    return (
      <div style={{ maxWidth: 900 }}>
        <GettingStarted
          steps={titles.map((t, i) => ({ title: t, state: state(i) }))}
          onStepClick={setCur}
          detail={{
            title: titles[cur],
            text: 'Copiez ce snippet juste avant la balise </head> de votre site. Told se charge en moins de 120 ms.',
            actions: <><Button size="sm" onClick={() => setCur(Math.min(cur + 1, 3))}>Copier le snippet</Button><Button size="sm" variant="ghost">Documentation</Button></>,
            illustration: <div style={{ height: 152, borderRadius: 12, background: 'var(--brand-surface-muted)' }} />,
          }}
        />
      </div>
    );
  },
};

export const Etapes: StoryObj = {
  name: 'GettingStartedStep',
  render: () => (
    <div style={{ width: 280, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {(['done', 'current', 'todo'] as const).map((s, i) => (
        <GettingStartedStep key={s} number={i + 1} state={s} title="Créez votre premier Told" description="Un questionnaire, un product tour ou une annonce, à partir d’un modèle." />
      ))}
    </div>
  ),
};
