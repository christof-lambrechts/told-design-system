import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorField, ContrastBadge, ContrastMenu } from './Contrast';
import type { ContrastLevel } from './contrast';

const meta = { title: 'Composants/Saisie et choix/Champ couleur et contraste', component: ColorField } satisfies Meta<typeof ColorField>;
export default meta;

export const ChampCouleur: StoryObj = {
  name: 'ColorField',
  render: () => {
    const [a, setA] = useState('#3B82F6');
    const [b, setB] = useState('#1A63FF');
    return (
      <div style={{ display: 'grid', gap: 24, width: 320 }}>
        <ColorField label="Couleur principale" value={a} onChange={setA} />
        <ColorField label="Couleur des boutons" value={b} onChange={setB} />
        <ColorField label="Décor (sans contrôle)" value="#F2F4F6" hideContrast />
      </div>
    );
  },
};

export const Badges: StoryObj = {
  name: 'ContrastBadge',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <ContrastBadge level="AA" ratio={4.52} />
      <ContrastBadge level="AA" ratio={3.68} />
      <ContrastBadge level="AAA" ratio={7.08} onClick={() => {}} />
      <ContrastBadge level="AAA" ratio={4.52} onClick={() => {}} />
      <ContrastBadge level="AA" ratio={4.52} showRatio={false} />
    </div>
  ),
};

export const Menu: StoryObj = {
  name: '_ContrastMenu',
  render: () => {
    const [l, setL] = useState<ContrastLevel>('AA');
    return <ContrastMenu level={l} onLevelChange={setL} color="#3B82F6" background="#FFFFFF" onFix={() => {}} />;
  },
};
