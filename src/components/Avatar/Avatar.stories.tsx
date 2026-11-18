import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta = { title: 'Composants/Visuels/Avatar', component: Avatar } satisfies Meta<typeof Avatar>;
export default meta;

export const Defaut: StoryObj<typeof Avatar> = {
  name: 'Avatar',
  args: { name: 'Dylan Laborie', size: 'xl' },
  argTypes: { size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] }, appearance: { control: 'inline-radio', options: ['text', 'icon', 'image', 'logo'] } },
};

export const Tailles: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['text', 'icon'] as const).map((a) => (
        <div key={a} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const).map((s) => <Avatar key={s} size={s} appearance={a} name="Quentin Vidal" />)}
        </div>
      ))}
      <div style={{ display: 'flex' }}>
        {['Dylan Laborie', 'Jonathan Morel', 'Christof Lambrechts'].map((n, i) => <Avatar key={n} name={n} size="2xl" outline style={{ marginLeft: i ? -8 : 0 }} />)}
      </div>
    </div>
  ),
};
