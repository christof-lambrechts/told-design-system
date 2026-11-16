import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flag } from './Flag';

const meta = { title: 'Composants/Visuels/Flag', component: Flag } satisfies Meta<typeof Flag>;
export default meta;

export const Defaut: StoryObj<typeof Flag> = { name: 'Flag', args: { country: 'fr', size: 24, label: 'Français' } };

export const Langues: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', maxWidth: 480 }}>
      {['fr', 'gb', 'us', 'es', 'de', 'it', 'pt', 'nl', 'be', 'ch', 'ca', 'jp', 'cn', 'br', 'eu', 'pl', 'se', 'dk', 'fi', 'gr'].map((c) => <Flag key={c} country={c} size={20} label={c} />)}
    </div>
  ),
};
