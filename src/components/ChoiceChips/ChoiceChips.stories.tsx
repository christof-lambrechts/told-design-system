import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChoiceChips } from './ChoiceChips';

const meta = { title: 'Composants/Formulaires/ChoiceChips', component: ChoiceChips } satisfies Meta<typeof ChoiceChips>;
export default meta;

export const Usages: StoryObj = {
  name: 'ChoiceChips',
  render: () => {
    const [t, setT] = useState('principal'); const [a, setA] = useState('fondu'); const [s, setS] = useState('titre');
    return (
      <div style={{ display: 'grid', gap: 20, width: 328 }}>
        <ChoiceChips aria-label="Thème" value={t} onChange={setT} options={[
          { value: 'principal', label: 'Principal', color: 'linear-gradient(135deg,#5ca18c,#1c2938)' },
          { value: 'nuit', label: 'Nuit', color: '#151a24' }, { value: 'clair', label: 'Clair', color: '#e6eff2' }]} />
        <ChoiceChips aria-label="Apparition des textes" value={a} onChange={setA} options={['Fondu', 'Glissement', 'Ligne à ligne', 'Mot à mot', 'Immédiate'].map((l) => ({ value: l === 'Fondu' ? 'fondu' : l, label: l, glyph: 'Aa' }))} />
        <ChoiceChips aria-label="Type d’écran" value={s} onChange={setS} options={[{ value: 'titre', label: 'Titre', icon: 'text' }, { value: 'apercu', label: 'Titre et aperçu', icon: 'view' }, { value: 'texte', label: 'Titre et texte', icon: 'left-to-right-list-bullet' }]} />
      </div>
    );
  },
};
