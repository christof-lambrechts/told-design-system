import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChoicePicker } from './ChoicePicker';
import { ChoiceIllustration, type ChoiceIllustrationName } from './illustrations';
import { FormatOptionGroup } from './FormatOption';
import { GroupTab } from '../Tabs/Tabs';

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

/** Choix du format dans le panneau Options (Record, 21/11) : FormatOptionGroup, réglages sous la ligne choisie. */
export const FormatOptions: StoryObj = {
  name: 'FormatOption',
  render: () => {
    const [f, setF] = useState('announcement');
    const [o, setO] = useState('landscape');
    return (
      <div style={{ width: 328 }}>
        <FormatOptionGroup aria-label="Format" value={f} onChange={setF}
          options={[
            { value: 'demo', title: 'Démo guidée', description: 'On clique, étape par étape.', illustration: 'demo' },
            { value: 'announcement', title: 'Annonce', description: 'Vidéo courte à tes couleurs.', illustration: 'announcement' },
            { value: 'inapp', title: 'Animation in-app', description: 'Boucle muette, sans texte.', illustration: 'inapp' },
          ]}
          settings={<GroupTab size="sm" label="Orientation" value={o} onChange={setO} items={[{ value: 'landscape', label: 'Paysage 16:9' }, { value: 'portrait', label: 'Vertical 9:16' }]} />} />
      </div>
    );
  },
};
