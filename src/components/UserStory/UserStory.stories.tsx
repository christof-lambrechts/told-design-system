import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserStory } from './UserStory';

const meta = { title: 'Composants/Assets/User story', component: UserStory, parameters: { layout: 'padded' } } satisfies Meta<typeof UserStory>;
export default meta;

export const Defaut: StoryObj<typeof UserStory> = {
  name: 'User story',
  args: {
    id: 'US-012',
    status: 'À valider',
    title: 'Traiter une alerte critique',
    asA: 'responsable qualité d’un site',
    iWant: 'voir les alertes critiques en premier et les prendre en charge en un clic',
    soThat: 'réagir avant la rupture de la chaîne du froid',
    criteria: ['Les alertes critiques sont en tête de liste.', 'Un clic sur « Prendre en charge » m’assigne l’alerte.', 'La fiche s’ouvre dans le panneau latéral.', 'L’alerte prise en charge reste visible pour l’équipe.'],
    screens: '01 Journal d’alertes  →  02 Détail  →  03 Prise en charge',
    persona: { initials: 'RQ', name: 'Persona · Responsable qualité', detail: 'Pharma Lyon · 3 sites' },
    version: 'v2.5 · 16/10/2026',
  },
};
