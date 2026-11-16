import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd, KbdCombo } from './Kbd';

const meta = {
  title: 'Composants/Statut et aide/Kbd',
  component: Kbd,
  parameters: {
    docs: {
      description: {
        component:
          'Touche clavier ✅ (`7952:80274`). `size` xs (menus denses), sm (champs, menus), md (réponses du widget) ; `tone="brand"` pour la réponse choisie ; `shape="auto"` pour un mot (Esc, Entrée). **KbdCombo** ✅ assemble un raccourci, une touche par caractère.',
      },
    },
  },
  args: { keys: 'K', size: 'sm', tone: 'neutral', shape: 'square' },
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md'] },
    tone: { control: 'inline-radio', options: ['neutral', 'brand'] },
    shape: { control: 'inline-radio', options: ['square', 'auto'] },
  },
} satisfies Meta<typeof Kbd>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { name: 'À régler' };

const row = { display: 'flex', gap: 16, alignItems: 'center' };

export const Tailles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['xs', 'sm', 'md'] as const).map((s) => (
        <div key={s} style={row}>
          <Kbd keys="K" size={s} />
          <Kbd keys="⌘" size={s} />
          <Kbd keys="Esc" size={s} shape="auto" />
          <Kbd keys="A" size={s} tone="brand" />
          <KbdCombo keys={['⌘', 'K']} size={s} />
        </div>
      ))}
    </div>
  ),
};

export const ReponsesAuClavier: Story = {
  name: 'Réponses au clavier',
  parameters: { docs: { description: { story: 'Dans un choix multiple : Kbd md « A », « B »… et `tone="brand"` sur le choix sélectionné.' } } },
  render: () => (
    <div style={row}>
      <Kbd keys="A" size="md" />
      <Kbd keys="B" size="md" tone="brand" />
      <Kbd keys="C" size="md" />
    </div>
  ),
};
