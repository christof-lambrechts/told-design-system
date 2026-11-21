import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardHeader, ChannelSection, SelectionCardGroup } from './Card';
import { OptionCard, OptionChoiceGroup } from '../OptionSidebar/OptionCard';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { CopyField } from '../CopyField/CopyField';
import { GroupTab } from '../Tabs/Tabs';
import { Switch } from '../Choice/Choice';

const meta = { title: 'Composants/Cartes/Carte et en-tête', component: Card, parameters: { layout: 'padded' } } satisfies Meta<typeof Card>;
export default meta;

/** CardHeader : en-tête commun (édition, résultats, Diffuser). */
export const EnTete: StoryObj = {
  name: 'CardHeader',
  render: () => (
    <div style={{ width: 640, display: 'grid', gap: 16 }}>
      <Card header={<CardHeader icon="questionopen" title="Question ouverte" actions={<Switch size="sm" label="Obligatoire" checkPlacement="right" />} divider={false} />}><span /></Card>
      <Card header={<CardHeader icon="link" title="Partager par lien" description="Copie le lien ou télécharge le QR code." divider={false} />}><span /></Card>
    </div>
  ),
};

/** Carte du canal Record · lien (Diffuser) : CardHeader, puis ChannelSection numérotées, OptionCard dans « Règle le lien ». */
export const CanalLien: StoryObj = {
  name: 'Canal · Partager par lien',
  render: () => {
    const [loop, setLoop] = useState(true);
    const [pwd, setPwd] = useState(true);
    const [exp, setExp] = useState(false);
    return (
      <div style={{ width: 720 }}>
        <Card header={<CardHeader icon="link" title="Partager par lien" />}>
          <ChannelSection number={1} title="Publie ta démo" description="Le lien ne montre la démo qu'une fois publiée.">
            <Button>Publier la démo</Button>
          </ChannelSection>
          <ChannelSection number={2} title="Règle le lien">
            <OptionCard icon="repeat" title="En boucle" description="La démo recommence au début une fois finie." toggle={{ checked: loop, onChange: setLoop }} />
            <OptionCard icon="circle-lock-02" title="Protéger par un mot de passe" description="Le mot de passe est demandé avant la première étape." toggle={{ checked: pwd, onChange: setPwd }}>
              <Input placeholder="Mot de passe" type="password" aria-label="Mot de passe" />
              <Button>Enregistrer</Button>
            </OptionCard>
            <OptionCard icon="calendar-03" title="Faire expirer le lien" description="Le lien ne marche plus après cette date." toggle={{ checked: exp, onChange: setExp }} />
          </ChannelSection>
          <ChannelSection number={3} title="Partage le lien" description="Copie le lien ou télécharge le QR code.">
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ flex: 1 }}><CopyField value="https://record.told.club/d/onboarding-factures" /></div>
              <Button color="neutral" variant="secondary-outline" size="lg" iconLeft="qr-code">QR code</Button>
            </div>
          </ChannelSection>
        </Card>
      </div>
    );
  },
};

/** Carte du canal Record · vidéo : OptionCard avec un contrôle à droite (Orientation), sans interrupteur. */
export const CanalVideo: StoryObj = {
  name: 'Canal · Exporter en vidéo',
  render: () => {
    const [o, setO] = useState('landscape');
    return (
      <div style={{ width: 720 }}>
        <Card header={<CardHeader icon="player" title="Exporter en vidéo" />}>
          <ChannelSection number={1} title="Règle la vidéo">
            <OptionCard icon="screen-rotation" title="Orientation" description="Le format de la vidéo exportée."
              control={<GroupTab size="lg" value={o} onChange={setO} items={[{ value: 'landscape', label: 'Paysage 16:9' }, { value: 'portrait', label: 'Vertical 9:16' }]} />} />
          </ChannelSection>
          <ChannelSection number={2} title="Lance le rendu" description="Compte environ une minute pour une démo de 10 étapes.">
            <Button iconLeft="film-01">Lancer le rendu</Button>
          </ChannelSection>
          <ChannelSection number={3} title="Télécharge la vidéo" description="Le MP4 reste disponible 7 jours.">
            <Button color="neutral" variant="secondary-outline" iconLeft="download-05">Télécharger le MP4</Button>
          </ChannelSection>
        </Card>
      </div>
    );
  },
};

/** SelectionCard : menu des canaux de Diffuser (onglets avec description, sans interrupteur). */
export const MenuCanaux: StoryObj = {
  name: 'SelectionCard · menu des canaux',
  render: () => {
    const [v, setV] = useState('link');
    return (
      <div style={{ width: 300 }}>
        <SelectionCardGroup aria-label="Canaux" value={v} onChange={setV} options={[
          { value: 'web', icon: 'computer', title: 'Site web', description: 'Sur toutes les pages de ton site ou de ton application web.' },
          { value: 'mobile', icon: 'smart-phone-01', title: 'App mobile', description: 'Dans ton application iOS ou Android.', badge: 'Bientôt', disabled: true },
          { value: 'link', icon: 'link-03', title: 'Partager par lien', description: 'Copie le lien ou télécharge le QR code pour partager ton questionnaire.' },
          { value: 'embed', icon: 'web-design-02', title: 'Intégrer dans une page', description: 'Place le questionnaire sur ton site avec un morceau de code.' },
          { value: 'email', icon: 'mail-02', title: 'Afficher dans un e-mail', description: "Ton audience répond directement depuis l'e-mail." },
        ]} />
      </div>
    );
  },
};

/** OptionChoice : liste de choix sous une option (personnalisation). */
export const ChoixOption: StoryObj = {
  name: 'OptionChoice',
  render: () => {
    const [v, setV] = useState('text');
    return (
      <div style={{ width: 300 }}>
        <OptionChoiceGroup aria-label="Style du logo" value={v} onChange={setV} options={[
          { value: 'text', icon: 'text', label: 'Texte' },
          { value: 'badge', icon: 'star', label: 'Badge', badge: 'New' },
          { value: 'none', icon: 'view-off-slash', label: 'Masqué', disabled: true },
        ]} />
      </div>
    );
  },
};
