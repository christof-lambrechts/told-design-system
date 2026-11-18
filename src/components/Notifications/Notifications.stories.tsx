import type { Meta, StoryObj } from '@storybook/react-vite';
import { NotificationCenter, NotificationItem, type NotificationGroup } from './Notifications';

const meta = {
  title: 'Composants/Panneaux/Notifications',
  component: NotificationCenter,
  parameters: { docs: { description: { component: 'S’ouvre depuis la cloche du menu (NotificationBell) : panneau de 400, 4 px à droite du menu, aligné en bas. Groupé par période, onglet Non lues. Une notification dit ce qui s’est passé : titre, deux lignes de message au plus, date.' } } },
} satisfies Meta<typeof NotificationCenter>;
export default meta;

const groups: NotificationGroup[] = [
  { label: "Aujourd'hui", items: [
    { id: '1', title: '42 nouvelles réponses au NPS', message: 'Relance NPS des clients payants · score moyen +38', time: 'Il y a 2 h', unread: true, icon: 'type-nps' },
    { id: '2', title: 'Scénario mis en ligne en production', message: 'Accueil des nouveaux inscrits passe en v4', time: 'Il y a 5 h', unread: true, icon: 'type-producttour' },
  ] },
  { label: 'Cette semaine', items: [
    { id: '3', title: 'Camille Martin a rejoint le projet', message: 'Elle peut créer et modifier les scénarios', time: 'Lundi', icon: 'type-tout' },
    { id: '4', title: 'Quota de réponses atteint à 80 %', message: 'Passez à l’offre supérieure pour continuer à collecter', time: 'Lundi', icon: 'type-annonce' },
  ] },
];

export const Centre: StoryObj<typeof NotificationCenter> = {
  args: { groups, onClose: () => {}, onSettings: () => {}, onMarkAllRead: () => {} },
};

export const Etats: StoryObj = {
  name: 'États',
  render: () => (
    <div style={{ display: 'grid', gap: 12, width: 376 }}>
      <NotificationItem title="42 nouvelles réponses au NPS" message="Relance NPS des clients payants · score moyen +38" time="Il y a 2 h" unread />
      <NotificationItem title="42 nouvelles réponses au NPS" message="Relance NPS des clients payants · score moyen +38" time="Il y a 2 h" />
    </div>
  ),
};
