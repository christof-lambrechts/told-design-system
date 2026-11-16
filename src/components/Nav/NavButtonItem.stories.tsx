import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavButtonItem } from './NavButtonItem';

const meta = { title: 'Composants/Navigation/NavButtonItem', component: NavButtonItem } satisfies Meta<typeof NavButtonItem>;
export default meta;

export const Menu: StoryObj = {
  name: 'NavButtonItem',
  render: () => {
    const [sel, setSel] = useState('Accueil');
    const [open, setOpen] = useState(true);
    const item = (label: string, icon: Parameters<typeof NavButtonItem>[0]['icon'], extra = {}) => (
      <NavButtonItem icon={icon} selected={sel === label} onClick={() => setSel(label)} {...extra}>{label}</NavButtonItem>
    );
    return (
      <nav style={{ width: 260, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {item('Accueil', 'home-09', { shortcut: ['⌘', '1'] })}
        {item('Told', 'layers-01', { tag: 12 })}
        <NavButtonItem icon="workflow-square-06" expanded={open} onClick={() => setOpen(!open)}>Scénarios</NavButtonItem>
        {open && (
          <>
            <NavButtonItem level="secondary" selected={sel === 'En ligne'} onClick={() => setSel('En ligne')}>En ligne</NavButtonItem>
            <NavButtonItem level="secondary" selected={sel === 'Brouillons'} onClick={() => setSel('Brouillons')}>Brouillons</NavButtonItem>
          </>
        )}
        {item('Audience', 'user-group-02')}
        {item('Réglages', 'settings-02')}
        <NavButtonItem icon="circle-lock-02" disabled>Bientôt</NavButtonItem>
      </nav>
    );
  },
};
