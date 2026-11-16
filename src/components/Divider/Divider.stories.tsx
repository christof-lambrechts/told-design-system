import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';

const meta = { title: 'Composants/Structure/Divider', component: Divider, parameters: { layout: 'padded' } } satisfies Meta<typeof Divider>;
export default meta;

export const Horizontal: StoryObj<typeof Divider> = { args: { orientation: 'horizontal' }, render: (a) => <div style={{ width: 480 }}><Divider {...a} /></div> };
export const Vertical: StoryObj<typeof Divider> = {
  render: () => (
    <div className="text-body-14" style={{ display: 'flex', gap: 12, alignItems: 'center', height: 24 }}>
      Questionnaire <Divider orientation="vertical" /> 4 étapes <Divider orientation="vertical" /> 1 min
    </div>
  ),
};
