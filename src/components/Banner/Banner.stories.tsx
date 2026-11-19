import type { Meta, StoryObj } from '@storybook/react-vite';
import { Banner } from './Banner';

const meta = { title: 'Composants/Statut et aide/Banner', component: Banner } satisfies Meta<typeof Banner>;
export default meta;

export const Types: StoryObj = {
  name: 'Banner',
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Banner type="brand" actionText="Voir la démo publiée" onClose={() => {}}>Tu consultes une version en cours de relecture.</Banner>
      <Banner type="warning" actionText="Passer à l'offre Pro">Tu as utilisé 80 % de tes démos ce mois-ci.</Banner>
      <Banner type="error" actionText="Réessayer">La capture de l'étape 4 n'a pas pu être envoyée.</Banner>
      <Banner type="success" onClose={() => {}}>Démo publiée, le lien est à jour.</Banner>
      <Banner type="neutral">Lecture seule : seul le propriétaire du projet peut modifier.</Banner>
    </div>
  ),
};
