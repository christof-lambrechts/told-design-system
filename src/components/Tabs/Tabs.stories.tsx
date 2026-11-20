import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonTab, GroupTab, TextTab } from './Tabs';

const row = { display: 'flex', gap: 8, alignItems: 'center' } as const;

const meta = { title: 'Composants/Navigation/Onglets', component: TextTab } satisfies Meta<typeof TextTab>;
export default meta;

export const Texte: StoryObj = {
  name: 'TextTab',
  render: () => {
    const [v, setV] = useState('Réponses');
    return (
      <div role="tablist" style={{ ...row, gap: 16, borderBottom: '1px solid var(--neutral-border-default)' }}>
        {['Résumé', 'Réponses', 'Verbatims', 'Exports'].map((t) => (
          <TextTab key={t} selected={t === v} onClick={() => setV(t)} count={t === 'Réponses' ? 128 : undefined}>{t}</TextTab>
        ))}
      </div>
    );
  },
};

export const Bouton: StoryObj = {
  name: 'ButtonTab',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['fill', 'outline', 'ghost', 'subtle'] as const).map((a) => (
        <div key={a} role="tablist" style={row}>
          <ButtonTab appearance={a} icon="pen-01" selected>Construire</ButtonTab>
          <ButtonTab appearance={a} icon="paint-bucket">Design</ButtonTab>
          <ButtonTab appearance={a} icon="share-07">Diffuser</ButtonTab>
          <ButtonTab appearance={a} icon="chart-01" size="sm">Analyser</ButtonTab>
          <ButtonTab appearance={a} icon="translation" size="lg">Langues</ButtonTab>
          <ButtonTab appearance={a} disabled>Indisponible</ButtonTab>
        </div>
      ))}
    </div>
  ),
};

export const Groupe: StoryObj = {
  name: 'GroupTab',
  render: () => {
    const [v, setV] = useState('7j');
    const [w, setW] = useState('desktop');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        <GroupTab aria-label="Période" value={v} onChange={setV} items={[{ value: '7j', label: '7 jours' }, { value: '30j', label: '30 jours' }, { value: '90j', label: '90 jours' }]} />
        <GroupTab aria-label="Appareil" size="sm" value={w} onChange={setW} items={[{ value: 'desktop', label: 'Ordinateur', icon: 'computer' }, { value: 'mobile', label: 'Mobile', icon: 'smart-phone-01' }]} />
      </div>
    );
  },
};

export const GroupTabCompteur: StoryObj = {
  name: 'GroupTab avec compteur',
  render: () => {
    const [v, setV] = useState('all');
    return <GroupTab value={v} onChange={setV} items={[{ value: 'all', label: 'Toutes', count: 24 }, { value: 'draft', label: 'Brouillons', count: 6 }, { value: 'pub', label: 'Publiées', count: 18 }]} />;
  },
};

/** Libellé en petit au-dessus et pleine largeur (panneaux d'options, 21/11). */
export const GroupTabLibelle: StoryObj = {
  name: 'GroupTab avec libellé',
  render: () => {
    const [t, setT] = useState('md');
    const [f, setF] = useState('round');
    return (
      <div style={{ width: 328, display: 'grid', gap: 16 }}>
        <GroupTab size="sm" label="Taille" value={t} onChange={setT} items={[{ value: 'sm', label: 'Petit' }, { value: 'md', label: 'Moyen' }, { value: 'lg', label: 'Grand' }]} />
        <GroupTab size="sm" label="Forme" value={f} onChange={setF} items={[{ value: 'round', label: 'Rond' }, { value: 'rounded', label: 'Arrondi' }, { value: 'square', label: 'Carré' }]} />
      </div>
    );
  },
};
