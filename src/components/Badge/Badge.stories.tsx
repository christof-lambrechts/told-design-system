import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
import { Tag } from './Tag';

const meta = {
  title: 'Composants/Statut et aide/Badge et Tag',
  component: Badge,
  parameters: { docs: { description: { component: 'Badge : statut figé ou étiquette non cliquable. Tag : catégorie ou filtre, avec une valeur et une croix en option. Si ça se clique, Tag ; si ça dit l’état d’un objet, Badge.' } } },
} satisfies Meta<typeof Badge>;
export default meta;

const colors = ['blue', 'tree', 'green', 'orange', 'red', 'purple', 'light-gray', 'pink-gradient'] as const;

export const Defaut: StoryObj<typeof Badge> = {
  name: 'Badge',
  args: { children: 'Brouillon', color: 'light-gray', appearance: 'subtle', size: 'sm' },
  argTypes: { color: { control: 'select', options: [...colors, 'white'] }, appearance: { control: 'inline-radio', options: ['subtle', 'outline', 'fill'] }, size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] } },
};

export const Badges: StoryObj = {
  name: 'Couleurs et styles',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 12, justifyContent: 'start', alignItems: 'center' }}>
      {colors.flatMap((c) => (['subtle', 'outline', 'fill'] as const).map((s) => <Badge key={c + s} color={c} appearance={s}>{c === 'pink-gradient' ? 'Pro' : c}</Badge>))}
    </div>
  ),
};

export const Tailles: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {(['xs', 'sm', 'md', 'lg'] as const).map((s) => <Badge key={s} size={s} color="blue">En ligne</Badge>)}
    </div>
  ),
};

export const Tags: StoryObj = {
  name: 'Tag',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Tag color="green" icon="pin" value="25 %">Promoteurs</Tag>
      <Tag color="orange" value="40 %">Passifs</Tag>
      <Tag color="red" value="35 %" onRemove={() => {}}>Détracteurs</Tag>
      <Tag color="primary" size="lg" icon="user">Comptes Pro</Tag>
      <Tag color="gray" onRemove={() => {}}>/results</Tag>
    </div>
  ),
};
