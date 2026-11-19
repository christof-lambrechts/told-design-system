import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FloatingToolbar, ToolbarDivider, ToolbarItem } from './FloatingToolbar';

const meta = { title: "Composants/Actions/Barre d'outils flottante", component: FloatingToolbar } satisfies Meta<typeof FloatingToolbar>;
export default meta;

const tools = [
  { id: 'cursor', icon: 'cursor-02', label: 'Curseur' },
  { id: 'zoom', icon: 'search-add', label: 'Zoom' },
  { id: 'tip', icon: 'message-01', label: 'Infobulle' },
  { id: 'target', icon: 'target-02', label: 'Zone' },
  { id: 'blur', icon: 'blur', label: 'Flouter' },
] as const;

const Bar = ({ theme, labels }: { theme: 'light' | 'dark'; labels: boolean }) => {
  const [a, setA] = useState('cursor');
  return (
    <FloatingToolbar theme={theme}>
      {tools.slice(0, 3).map((t) => <ToolbarItem key={t.id} icon={t.icon} label={t.label} showLabel={labels} active={a === t.id} onClick={() => setA(t.id)} />)}
      <ToolbarDivider />
      {tools.slice(3).map((t) => <ToolbarItem key={t.id} icon={t.icon} label={t.label} showLabel={labels} active={a === t.id} onClick={() => setA(t.id)} />)}
    </FloatingToolbar>
  );
};

export const Barre: StoryObj = {
  name: 'FloatingToolbar',
  render: () => (
    <div style={{ display: 'grid', gap: 20, justifyItems: 'start' }}>
      <Bar theme="light" labels />
      <Bar theme="light" labels={false} />
      <div style={{ background: 'var(--brand-neutral-950)', padding: 20, borderRadius: 12, display: 'grid', gap: 20 }}>
        <Bar theme="dark" labels />
        <Bar theme="dark" labels={false} />
      </div>
    </div>
  ),
};
