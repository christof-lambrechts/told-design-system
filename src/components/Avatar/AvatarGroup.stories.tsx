import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarGroup, PresenceAvatar, presenceColors } from './AvatarGroup';

const meta = { title: 'Composants/Visuels/Présence', component: AvatarGroup } satisfies Meta<typeof AvatarGroup>;
export default meta;

const people = ['Camille Martin', 'Jonathan Morel', 'Léa Dubois', 'Hugo Bernard', 'Inès Petit', 'Nora Lefèvre'].map((name, i) => ({ name, color: presenceColors[i] }));

export const Pile: StoryObj = {
  name: 'AvatarGroup',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {[2, 3, 4, 6].map((n) => <AvatarGroup key={n} people={people.slice(0, n)} />)}
      <div style={{ background: 'var(--brand-neutral-950)', padding: 16, borderRadius: 12, display: 'grid', gap: 16 }}>
        {[3, 6].map((n) => <AvatarGroup key={n} people={people.slice(0, n)} surface="dark" />)}
      </div>
    </div>
  ),
};

export const Teintes: StoryObj = {
  name: '_PresenceAvatar',
  render: () => <div style={{ display: 'flex', gap: 8 }}>{presenceColors.map((c) => <PresenceAvatar key={c} name={`Ada ${c}`} color={c} />)}</div>,
};
