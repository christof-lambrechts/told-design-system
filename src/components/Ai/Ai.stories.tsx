import type { Meta, StoryObj } from '@storybook/react-vite';
import { AiNotice, AiTag } from './Ai';

const meta = { title: 'Composants/Statut et aide/IA', component: AiNotice } satisfies Meta<typeof AiNotice>;
export default meta;

export const Etiquette: StoryObj = { name: 'AiTag', render: () => <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><AiTag /><AiTag size="sm" /><AiTag size="sm">Proposé par l’IA</AiTag></div> };

export const Bandeau: StoryObj = {
  name: 'AiNotice',
  render: () => (
    <div style={{ display: 'grid', gap: 12, width: 420 }}>
      <AiNotice state="review" actionLabel="Voir" secondaryLabel="Retirer ces textes">Textes écrits par l’IA, à relire</AiNotice>
      <AiNotice state="generating" actionLabel="Arrêter">L’IA rédige les textes vides. Ça prend jusqu’à une minute.</AiNotice>
      <AiNotice state="done" actionLabel="Annuler">8 infobulles rédigées</AiNotice>
    </div>
  ),
};
