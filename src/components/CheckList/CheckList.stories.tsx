import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckList, CheckRow } from './CheckList';

const meta = { title: 'Composants/Retours/CheckList', component: CheckList } satisfies Meta<typeof CheckList>;
export default meta;

export const AvantDePublier: StoryObj = {
  name: 'CheckList',
  render: () => (
    <div style={{ width: 360 }}>
      <CheckList title="Avant de publier" summary="1 bloquant · 1 à savoir">
        <CheckRow state="fail" title="Échec de l’envoi des captures" detail="La connexion a coupé pendant l’envoi." actionLabel="Réessayer" onAction={() => {}} />
        <CheckRow state="warning" title="2 zones sensibles à vérifier" detail="Floutage conseillé sur les étapes 3 et 5." actionLabel="Voir l’étape 3" onAction={() => {}} />
        <CheckRow state="pass" title="Titre et description" />
        <CheckRow state="pending" title="Vérification du lien public" />
      </CheckList>
    </div>
  ),
};
