import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { IconBoxedColor, iconBoxedColorNames, iconBoxedColorSubtle } from './IconBoxedColor';
import { boxedGroups } from './iconBoxedData';
import { Switch } from '../Choice/Choice';

const meta = {
  title: 'Composants/Visuels/Pictos de couleur',
  component: IconBoxedColor,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "IconBoxedColor (Figma `4:4197`) : une icône HugeIcons pleine dans une pastille de couleur. La couleur dit la famille (type de question, canal, format) : on choisit le picto par `icon`, jamais la couleur. `filled` par défaut ; `subtle` (teinté) pour les panneaux de réglage, seulement sur les types de question et les réglages du design. Tailles d'usage : 24, 32, 40.",
      },
    },
  },
  args: { icon: 'questionnps', appearance: 'filled', size: 32 },
  argTypes: {
    icon: { control: 'select', options: iconBoxedColorNames },
    appearance: { control: 'inline-radio', options: ['filled', 'subtle'] },
    size: { control: 'inline-radio', options: [24, 32, 40] },
  },
} satisfies Meta<typeof IconBoxedColor>;
export default meta;
type Story = StoryObj<typeof meta>;

export const ARegler: Story = { name: 'À régler' };

function Catalogue() {
  const [subtle, setSubtle] = useState(false);
  const [size, setSize] = useState(32);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: 'var(--font-family-body)', color: 'var(--content-default-default)' }}>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
        <Switch label="Teinté (subtle)" description="Seuls les pictos qui ont la version teintée changent." checked={subtle} onChange={(e) => setSubtle(e.target.checked)} />
        <div style={{ display: 'flex', gap: 6 }}>
          {[24, 32, 40].map((s) => (
            <button key={s} type="button" onClick={() => setSize(s)}
              style={{ height: 28, padding: '0 10px', borderRadius: 8, border: '1px solid var(--neutral-border-default, #d0d5dd)', font: 'inherit', fontSize: 12, cursor: 'pointer',
                background: s === size ? 'var(--content-default-default)' : 'transparent', color: s === size ? 'var(--neutral-surface-default, #fff)' : 'inherit' }}>
              {s} px
            </button>
          ))}
        </div>
      </div>
      {boxedGroups.map(([g, list]) => (
        <section key={g} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h3 style={{ margin: 0, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--content-subtle-default)' }}>{g}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(124px, 1fr))', gap: 8 }}>
            {list.map((n) => (
              <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '16px 6px 12px', borderRadius: 10, background: 'var(--neutral-surface-subtle, #f6f7f9)' }}>
                <IconBoxedColor icon={n as never} size={size} appearance={subtle ? 'subtle' : 'filled'} />
                <span style={{ fontSize: 11, lineHeight: '14px', color: 'var(--content-subtle-default)', textAlign: 'center' }}>{n}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export const Catalogue_: Story = { name: 'Catalogue', render: () => <Catalogue /> };

export const PleinOuTeinte: Story = {
  name: 'Plein ou teinté',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {iconBoxedColorSubtle.map((n) => (
        <div key={n} style={{ display: 'flex', gap: 6 }}>
          <IconBoxedColor icon={n} size={32} />
          <IconBoxedColor icon={n} size={32} appearance="subtle" />
        </div>
      ))}
    </div>
  ),
};
