import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';

const meta = { title: 'Composants/Statut et aide/Tooltip', component: Tooltip } satisfies Meta<typeof Tooltip>;
export default meta;

export const Defaut: StoryObj<typeof Tooltip> = {
  name: 'Tooltip',
  args: { children: 'Texte d’aide', direction: 'up', size: 'md', iconLeft: 'information-circle' },
  argTypes: { direction: { control: 'select', options: ['up', 'upright', 'upleft', 'left', 'right', 'down', 'downleft', 'downright'] }, size: { control: 'inline-radio', options: ['sm', 'md'] } },
};

export const Directions: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: 24, alignItems: 'center' }}>
      {(['up', 'upleft', 'upright', 'left', 'right', 'down', 'downleft', 'downright'] as const).map((d) => (
        <Tooltip key={d} direction={d} size="sm">{d}</Tooltip>
      ))}
    </div>
  ),
};
