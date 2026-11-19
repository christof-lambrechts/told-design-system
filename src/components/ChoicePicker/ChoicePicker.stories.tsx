import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChoicePicker } from './ChoicePicker';
import { ChoiceIllustration, type ChoiceIllustrationName } from './illustrations';

const meta = { title: 'Composants/Saisie et choix/Choix visuel', component: ChoicePicker } satisfies Meta<typeof ChoicePicker>;
export default meta;

const ratios = [['16-9', '16:9', '16 / 9'], ['4-3', '4:3', '4 / 3'], ['1-1', '1:1', '1 / 1'], ['3-4', '3:4', '3 / 4']] as const;

export const Ratio: StoryObj = {
  name: 'ChoicePicker · ratio',
  render: () => {
    const [v, setV] = useState('16-9');
    const r = ratios.find((x) => x[0] === v)!;
    return (
      <div style={{ width: 453 }}>
        <ChoicePicker label="Format de l’export" value={v} onChange={setV}
          options={ratios.map(([id, label]) => ({ value: id, label, illustration: `ratio-${id}` as ChoiceIllustrationName }))}
          preview={<div style={{ height: 216, aspectRatio: r[2], background: 'var(--neutral-surface-default)', borderRadius: 10, boxShadow: 'var(--shadow-flat-4)' }} />}
          helper="L’aperçu montre le vrai rendu de l’option choisie." />
      </div>
    );
  },
};

export const Format: StoryObj = {
  name: 'ChoicePicker · format',
  render: () => {
    const [v, setV] = useState('widget');
    const f = ['widget', 'modale', 'banniere', 'infobulle'] as const;
    return (
      <div style={{ width: 453 }}>
        <ChoicePicker label="Format du Told" value={v} onChange={setV}
          options={f.map((id) => ({ value: id, label: { widget: 'Widget', modale: 'Modale', banniere: 'Bannière', infobulle: 'Infobulle' }[id], illustration: id }))} />
      </div>
    );
  },
};

export const Illustrations: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {(['ratio-16-9', 'ratio-4-3', 'ratio-1-1', 'ratio-3-4', 'widget', 'modale', 'banniere', 'infobulle'] as const).map((n) => <ChoiceIllustration key={n} name={n} />)}
    </div>
  ),
};
