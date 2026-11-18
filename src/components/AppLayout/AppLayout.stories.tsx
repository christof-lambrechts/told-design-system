import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppLayout } from './AppLayout';
import { NavButtonItem } from '../Nav/NavButtonItem';
import { SearchBar } from '../Input/Input';
import { Button } from '../Button/Button';

const meta = {
  title: 'Gabarits/AppLayout',
  component: AppLayout,
  parameters: { layout: 'fullscreen', docs: { description: { component: 'Gabarit de l’application (piste B, décision du 18/11) : menu à gauche sur le fond de page, contenu dans une carte blanche avec filet, rayon 16 et ombre légère. AppSidebar et TopBar ne sont pas encore codés : ici des contenus de démonstration.' } } },
} satisfies Meta<typeof AppLayout>;
export default meta;

const side = (
  <nav style={{ width: 300, padding: '12px 14px', display: 'grid', gap: 2, alignContent: 'start' }}>
    {['Accueil', 'Scénarios', 'Told', 'Audiences', 'Résultats'].map((l, i) => <NavButtonItem key={l} selected={i === 2}>{l}</NavButtonItem>)}
  </nav>
);
const top = (
  <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: '1px solid var(--neutral-border-default)' }}>
    <strong style={{ fontSize: 18 }}>Told</strong>
    <div style={{ width: 264 }}><SearchBar placeholder="Rechercher" /></div>
  </div>
);

export const Defaut: StoryObj<typeof AppLayout> = {
  name: 'Défaut',
  args: { sidebar: side, topbar: top, children: (
    <div style={{ padding: 24, display: 'grid', gap: 16, justifyItems: 'start' }}>
      <p style={{ margin: 0 }}>Aucun Told pour l’instant.</p>
      <Button iconLeft="add-01">Créer un Told</Button>
    </div>
  ) },
};

export const MenuAvecFond: StoryObj<typeof AppLayout> = {
  name: 'Menu avec fond',
  args: { ...Defaut.args, menu: 'filled' },
};
