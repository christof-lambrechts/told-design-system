import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Icon, iconNames, type IconVariant } from './Icon';
import { Switch } from '../Choice/Choice';

const meta = {
  title: 'Composants/Visuels/Icons',
  component: Icon,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "Icônes HugeIcons du fichier Figma. Par défaut **contour** (stroke-rounded, trait 1,5) ; **plein** (Solid Standard, la version du fichier Figma) pour l'état actif : entrée de menu ou onglet sélectionné. `<Icon name=\"home-09\" variant=\"solid\" />`. Trois dessins maison (hint, productTour, widget) n'ont que la version pleine.",
      },
    },
  },
  args: { name: 'home-09', size: 24, variant: 'stroke' },
  argTypes: {
    name: { control: 'select', options: iconNames },
    variant: { control: 'inline-radio', options: ['stroke', 'solid'] },
    size: { control: 'inline-radio', options: [12, 14, 16, 18, 20, 24] },
  },
} satisfies Meta<typeof Icon>;
export default meta;
type Story = StoryObj<typeof meta>;

export const ARegler: Story = { name: 'À régler' };

function Gallery() {
  const [solid, setSolid] = useState(false);
  const [q, setQ] = useState('');
  const variant: IconVariant = solid ? 'solid' : 'stroke';
  const list = iconNames.filter((n) => n.includes(q.trim().toLowerCase()));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: 'var(--font-family-body)', color: 'var(--content-default-default)' }}>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
        <Switch label="Plein (état actif)" checked={solid} onChange={(e) => setSolid(e.target.checked)} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filtrer par nom"
          style={{ height: 34, padding: '0 10px', border: '1px solid var(--input-default-border, #d0d5dd)', borderRadius: 8, font: 'inherit', fontSize: 13, minWidth: 220 }}
        />
        <span className="text-body-12" style={{ color: 'var(--content-subtle-default)' }}>{list.length} icônes</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8 }}>
        {list.map((n) => (
          <div key={n} title={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '16px 6px 12px', borderRadius: 10, background: 'var(--neutral-surface-subtle, #f6f7f9)' }}>
            <Icon name={n} size={24} variant={variant} />
            <span style={{ fontSize: 11, lineHeight: '14px', color: 'var(--content-subtle-default)', textAlign: 'center', wordBreak: 'break-word' }}>{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const Galerie: Story = { name: 'Galerie', render: () => <Gallery /> };

export const ContourEtPlein: Story = {
  name: 'Contour ou plein',
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      {(['home-09', 'layers-01', 'workflow-square-06', 'user-group-02', 'chart-01', 'settings-02'] as const).map((n) => (
        <div key={n} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Icon name={n} size={24} />
          <Icon name={n} size={24} variant="solid" style={{ color: 'var(--content-brand-default, #1a5cff)' }} />
        </div>
      ))}
    </div>
  ),
};
