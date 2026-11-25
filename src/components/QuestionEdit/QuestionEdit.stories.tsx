import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
import { ContentBlock, ConsentBlock, InputLink, SecondaryBlock, Preset } from './QuestionEdit';

const meta = {
  title: 'Composants/Édition/Blocs d’une étape',
  component: Preset,
  parameters: { layout: 'padded', docs: { description: { component: 'Figma page 🧩 Molécules / QuestionEdit. Une étape = Preset (Titre + Description en option + bloc du type + Consentement en option) et des SecondaryBlock (image, texte, vidéo, boutons liens, séparateur). Chaque bloc a ses réglages dans la colonne de droite. Les blocs par type (NPS, échelle, liste…) arrivent au lot 2.' } } },
} satisfies Meta<typeof Preset>;
export default meta;

const Col = ({ children }: { children: ReactNode }) => (
  <div style={{ width: 580, background: 'var(--neutral-surface-default)', borderRadius: 16, border: '1px solid var(--neutral-border-default)', overflow: 'hidden' }}>{children}</div>
);
const TypeSlot = ({ label }: { label: string }) => (
  <div style={{ margin: '0 20px 16px', padding: 16, borderRadius: 12, border: '1px dashed var(--neutral-border-default)', color: 'var(--content-muted-default)', font: '12px/18px var(--font-family-body)' }}>{label} (bloc du type, lot 2)</div>
);

function PresetDemo({ selected, dragging, consent }: { selected?: boolean; dragging?: boolean; consent?: boolean }) {
  const [title, setTitle] = useState('Recommanderiez-vous Told à un collègue ?');
  const [desc, setDesc] = useState('');
  const [url, setUrl] = useState('');
  return (
    <Col>
      <Preset type="nps" title={title} onTitleChange={setTitle} description={desc} onDescriptionChange={setDesc} selected={selected} dragging={dragging}
        consent={consent ? <ConsentBlock policyUrl={url} onPolicyUrlChange={setUrl} /> : undefined}>
        <TypeSlot label="Échelle NPS de 0 à 10" />
      </Preset>
    </Col>
  );
}

export const Defaut: StoryObj = { name: 'Preset', render: () => <PresetDemo /> };
export const Selectionne: StoryObj = { name: 'Preset sélectionné', render: () => <PresetDemo selected /> };
export const Deplace: StoryObj = { name: 'Preset en déplacement', render: () => <PresetDemo dragging /> };
export const AvecConsentement: StoryObj = { name: 'Preset avec consentement', render: () => <PresetDemo consent /> };

export const Message: StoryObj = {
  name: 'Preset message (titre)',
  render: () => { const [t, setT] = useState(''); return <Col><Preset type="message" title={t} onTitleChange={setT} titleError={t ? undefined : 'Le titre est obligatoire pour publier.'} /></Col>; },
};

export const Contenu: StoryObj = {
  name: 'ContentBlock',
  render: () => { const [a, setA] = useState(''); const [b, setB] = useState(''); return <Col><ContentBlock value={a} onChange={setA} /><ContentBlock type="description" value={b} onChange={setB} /></Col>; },
};

export const Secondaires: StoryObj = {
  name: 'SecondaryBlock (image, texte, vidéo, séparateur)',
  render: () => (
    <Col>
      <SecondaryBlock type="image" onDelete={() => {}} />
      <SecondaryBlock type="text" onDelete={() => {}} selected />
      <SecondaryBlock type="video" onDelete={() => {}} />
      <SecondaryBlock type="divider" onDelete={() => {}} />
    </Col>
  ),
};

export const BoutonsLiens: StoryObj = {
  name: 'SecondaryBlock boutons liens',
  render: () => {
    const [links, setLinks] = useState([{ label: 'Voir la documentation', url: 'https://exemple.fr/aide' }]);
    return (
      <Col>
        <SecondaryBlock type="button" onDelete={() => {}} replacesNext={links.length === 1} onOpenLogic={() => {}}
          onAddLink={links.length < 3 ? () => setLinks([...links, { label: '', url: '' }]) : undefined}>
          {links.map((l, i) => (
            <InputLink key={i} index={i + 1} label={l.label} url={l.url}
              onChange={(n) => setLinks(links.map((x, j) => (j === i ? n : x)))}
              onRemove={links.length > 1 ? () => setLinks(links.filter((_, j) => j !== i)) : undefined} />
          ))}
        </SecondaryBlock>
      </Col>
    );
  },
};
