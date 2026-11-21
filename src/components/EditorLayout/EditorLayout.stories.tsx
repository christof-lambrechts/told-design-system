import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { EditorLayout } from './EditorLayout';
import { Card, CardHeader, ChannelSection, SelectionCardGroup } from '../Card/Card';
import { InfoCard } from '../Card/InfoCard';
import { OptionCard } from '../OptionSidebar/OptionCard';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';

const meta = { title: 'Gabarits/EditorLayout', component: EditorLayout, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof EditorLayout>;
export default meta;

const Box = ({ h, label }: { h: number; label: string }) => <div style={{ height: h, padding: 16, color: 'var(--content-muted-default)', font: '13px var(--font-family-body)' }}>{label}</div>;

export const Record: StoryObj = {
  name: 'EditorLayout',
  render: () => (
    <div style={{ height: 640 }}>
      <EditorLayout header={<div style={{ height: 60, background: 'var(--neutral-surface-inverse)' }} />} left={<Box h={600} label="StepList" />} right={<Box h={600} label="OptionSidebar" />}>
        <div style={{ width: 560, height: 315, borderRadius: 12, background: 'var(--neutral-surface-default)', boxShadow: '0 1px 2px rgb(0 0 0 / .08)' }} />
      </EditorLayout>
    </div>
  ),
};

/**
 * Diffuser (Record) : même gabarit que l'éditeur. Colonne gauche = menu des canaux (SelectionCardGroup) collé à gauche,
 * fond blanc et filet ; centre sur le canevas, colonne de lecture (content="page", 680 max) : InfoCard du canal puis la Card. Pas de 3e colonne.
 */
export const Diffuser: StoryObj = {
  name: 'Diffuser (Record)',
  render: () => {
    const [v, setV] = useState('link');
    return (
      <div style={{ height: 900 }}>
        <EditorLayout content="page" header={<div style={{ height: 60, background: 'var(--neutral-surface-inverse)' }} />}
          left={<div style={{ padding: 16 }}><SelectionCardGroup aria-label="Canaux" value={v} onChange={setV} options={[
            { value: 'link', icon: 'link-03', title: 'Partager par lien', description: 'Publie la démo, copie son lien ou intègre-la sur tes sites.' },
            { value: 'iframe', icon: 'web-design-02', title: 'Intégrer dans une page', description: 'Place la démo sur ton site avec un morceau de code.' },
            { value: 'video', icon: 'film-01', title: 'Exporter en vidéo', description: 'Un fichier MP4 à poster sur les réseaux ou à envoyer.' },
          ]} /></div>} leftWidth={300}>
          {v === 'iframe'
            ? <InfoCard type="iframe" title="Intègre ta démo dans une page" description="Colle ce code sur ton site, là où la démo doit apparaître." />
            : v === 'video'
              ? <InfoCard type="video" title="Partage ta démo en vidéo" description="Exporte ta démo en MP4 pour l'envoyer ou la poster sur les réseaux." />
              : <InfoCard type="link" title="Partage ta démo grâce à un lien" description="Toute personne qui a le lien voit la démo, une fois publiée." />}
          <Card header={<CardHeader icon={v === 'iframe' ? 'iframe' : v === 'video' ? 'player' : 'link'} title={v === 'iframe' ? 'Intégrer dans une page' : v === 'video' ? 'Exporter en vidéo' : 'Partager par lien'} />}>
            <ChannelSection number={1} title="Publie ta démo" description="Le lien ne montre la démo qu'une fois publiée." aside={<Badge color="light-gray" dot>Brouillon</Badge>}><Button size="lg" iconLeft="play" fullWidth>Publier</Button></ChannelSection>
            <ChannelSection number={2} title="Règle le lien"><OptionCard icon="repeat" title="En boucle" description="La démo recommence au début une fois finie." toggle={{ checked: true, onChange: () => {} }} /></ChannelSection>
          </Card>
        </EditorLayout>
      </div>
    );
  },
};
