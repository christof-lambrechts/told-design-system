import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AddBlockModal, BlockTypeItem, type BlockType } from './AddBlockModal';
import { WidgetChoice } from '../Widget/Widget';

const meta = { title: 'Composants/Modales/AddBlockModal', component: AddBlockModal, parameters: { layout: 'padded' } } satisfies Meta<typeof AddBlockModal>;
export default meta;

const groups: { title: string; types: BlockType[] }[] = [
  { title: 'IA', types: [{ id: 'ai-agent', label: 'Agent IA', icon: 'ai-magic', color: 'purple', pro: true, description: 'Une conversation qui creuse chaque réponse.' }] },
  { title: 'Choix', types: [
    { id: 'multiple-choice', label: 'Choix multiple', icon: 'check-list', color: 'brand', description: 'Une ou plusieurs réponses parmi une liste.' },
    { id: 'dropdown', label: 'Liste déroulante', icon: 'arrow-down-01', color: 'cyan', description: 'Beaucoup de choix, peu de place.' },
  ] },
  { title: 'Échelles', types: [
    { id: 'nps', label: 'NPS', icon: 'dashboard-speed-02', color: 'purple', description: 'Recommanderiez-vous… de 0 à 10.' },
    { id: 'scale', label: 'Échelle', icon: 'star', color: 'yellow', description: 'Étoiles, émojis, météo ou chiffres.' },
    { id: 'ranking', label: 'Classement', icon: 'ranking', color: 'orange', description: 'Ordonner les choix par préférence.' },
  ] },
  { title: 'Texte', types: [
    { id: 'open', label: 'Question ouverte', icon: 'message-01', color: 'pink', description: 'Une réponse libre, écrite ou dictée.' },
    { id: 'contact', label: 'Coordonnées', icon: 'contact-book', color: 'green', description: 'Nom, e-mail, téléphone.' },
  ] },
  { title: 'Contenu', types: [
    { id: 'message', label: 'Message', icon: 'news-01', color: 'gray', description: 'Un texte sans question.' },
    { id: 'calendar', label: 'Prise de rendez-vous', icon: 'calendar-03', color: 'red', pro: true, description: 'Un créneau dans votre agenda.' },
  ] },
];

export const Modale: StoryObj = {
  name: 'AddBlockModal',
  render: () => {
    const [sel, setSel] = useState('multiple-choice');
    const [f, setF] = useState('Tous');
    return (
      <AddBlockModal
        groups={groups}
        selected={sel}
        onSelect={setSel}
        context="dans « Votre avis » · position 2"
        filters={['Tous', 'Questions', 'Contenu', 'IA', 'Intégrations']}
        filter={f}
        onFilter={setF}
        preview={
          <div data-theme="light" style={{ width: 260, padding: 16, borderRadius: 16, background: 'var(--widget-surface-default)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <strong style={{ fontFamily: 'var(--font-family-heading)', fontSize: 14 }}>Comment nous avez-vous connus ?</strong>
            {['Bouche à oreille', 'Réseaux sociaux', 'Un collègue'].map((l, i) => <WidgetChoice key={l} letter={'ABC'[i]} label={l} selected={i === 1} />)}
          </div>
        }
      />
    );
  },
};

export const Ligne: StoryObj = {
  name: 'BlockTypeItem',
  render: () => (
    <div style={{ width: 240, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <BlockTypeItem type={groups[1].types[0]} selected />
      <BlockTypeItem type={groups[0].types[0]} />
      <BlockTypeItem type={groups[2].types[0]} />
    </div>
  ),
};
