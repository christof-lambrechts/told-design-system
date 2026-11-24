import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { TopBar } from './TopBar';
import { Button, ButtonIcon } from '../Button/Button';
import { NotificationBell } from '../AppSidebar/AppSidebar';
import { IntentInput } from '../IntentInput/IntentInput';

const meta = {
  title: 'Gabarits/TopBar',
  component: TopBar,
  parameters: { layout: 'fullscreen', docs: { description: { component: 'Barre du haut de l’application (Figma TopBar 7858:1613), en haut de la carte de contenu de Layout `page` et `settings`. Un seul en-tête par écran : titre, description, recherche ⌘K, options, actions. Pas de sélecteur d’environnement en release 1.' } } },
} satisfies Meta<typeof TopBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Accueil: Story = {
  name: 'Accueil · titre et recherche',
  args: { title: 'Accueil', icon: 'home-09', search: true },
};

export const Liste: Story = {
  name: 'Liste · description et actions',
  args: {
    title: 'Told', icon: 'layers-01', description: '4 Told · 2 en ligne · 1 en test · 1 brouillon', search: true,
    options: <><ButtonIcon icon="filter" label="Filtrer" appearance="ghost" size="md" /><ButtonIcon icon="grid-view" label="Changer d’affichage" appearance="ghost" size="md" /></>,
    secondaryAction: <Button variant="secondary-outline">Exporter</Button>,
    action: <Button iconLeft="add-01">Créer un Told</Button>,
  },
};

export const Notifications: Story = {
  name: 'Avec notifications',
  args: { title: 'Résultats', icon: 'chart-01', search: true, notifications: <NotificationBell count={3} /> },
};

function IntentDemo() {
  const [v, setV] = useState('');
  return <TopBar title="Scénarios" icon="workflow-square-06"
    intent={<IntentInput size="compact" emphasis="ai" value={v} onChange={setV} onSubmit={() => setV('')} placeholder="Demande à Told : créer un scénario, analyser des résultats…" aria-label="Demander à Told" />} />;
}

export const BarreIA: Story = {
  name: 'Barre IA (sans recherche)',
  args: { title: 'Scénarios' },
  render: () => <IntentDemo />,
};
