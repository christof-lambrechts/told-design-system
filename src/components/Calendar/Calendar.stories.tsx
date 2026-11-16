import type { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar } from './Calendar';

const meta = { title: 'Composants/Saisie et choix/Calendar', component: Calendar } satisfies Meta<typeof Calendar>;
export default meta;

export const Defaut: StoryObj<typeof Calendar> = {
  name: 'Calendar',
  args: { value: { start: new Date(2026, 9, 10), end: new Date(2026, 9, 17) }, showModes: true },
};
