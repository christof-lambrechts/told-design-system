import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';
import { Button } from '../Button/Button';

const meta = { title: 'Composants/Statut et aide/Alert', component: Alert, parameters: { layout: 'padded' } } satisfies Meta<typeof Alert>;
export default meta;

/** Alert : message dans le contenu (carte, panneau, sous un champ). Banner, lui, est le bandeau pleine largeur en haut d'une page. */
export const Types: StoryObj = {
  render: () => (
    <div style={{ width: 560, display: 'grid', gap: 12 }}>
      <Alert type="warning" title="Modifications non publiées" actionText="Publier les modifications" onAction={() => {}}>Le lien et les intégrations restent les mêmes.</Alert>
      <Alert type="brand" title="Mise à jour disponible">Une nouvelle version de l'extension est prête.</Alert>
      <Alert type="error" title="Le script n'est pas détecté" actions={<><Button size="sm">Voir l'installation</Button><Button size="sm" color="neutral" variant="tertiary">Réessayer</Button></>}>Vérifie que le code est bien dans la page.</Alert>
      <Alert type="success" onClose={() => {}}>Ta démo est en ligne.</Alert>
      <Alert type="neutral-light" size="sm">Seul un responsable du projet peut publier.</Alert>
      <Alert type="neutral-dark" size="sm" icon={false}>Lecture seule : un collègue modifie cette étape.</Alert>
    </div>
  ),
};
