import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from './Logo';

const meta = { title: 'Composants/Visuels/Logo', component: Logo } satisfies Meta<typeof Logo>;
export default meta;

export const Defaut: StoryObj<typeof Logo> = { name: 'Logo', args: { size: 'md', theme: 'light', mini: false } };

export const Declinaisons: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 32 }}>
      {(['light', 'dark'] as const).map((t) => (
        <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 24, borderRadius: 16, background: t === 'dark' ? '#0d0f11' : '#fff' }}>
          {(['lg', 'md', 'sm', 'xs'] as const).map((s) => (
            <div key={s} style={{ display: 'flex', gap: 20, alignItems: 'center' }}><Logo size={s} theme={t} /><Logo size={s} theme={t} mini /></div>
          ))}
        </div>
      ))}
    </div>
  ),
};
