import type { Meta, StoryObj } from '@storybook/react-vite';
import { StartScreen, EndScreen, RewardBlock, Countdown, SocialLinks, type ScreenLayout, type ScreenContext } from './StartEndScreen';
import { Logo } from '../Logo/Logo';
import { useState } from 'react';
import { PositionPicker, type Position } from '../OptionSidebar/PositionPicker';
import { GroupTab } from '../Tabs/Tabs';

const meta = { title: 'Composants/Écrans de début et de fin', component: StartScreen, parameters: { layout: 'padded' } } satisfies Meta<typeof StartScreen>;
export default meta;

const svg = encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7c6cf2"/><stop offset="1" stop-color="#1a63ff"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/><rect x="120" y="110" width="560" height="380" rx="16" fill="#fff" opacity=".92"/><rect x="160" y="160" width="220" height="18" rx="6" fill="#c9d2dc"/><rect x="160" y="210" width="480" height="60" rx="8" fill="#eef1f5"/><rect x="160" y="290" width="480" height="60" rx="8" fill="#eef1f5"/><rect x="520" y="420" width="120" height="36" rx="8" fill="#1a63ff"/></svg>');
const media = { src: `data:image/svg+xml,${svg}`, alt: 'Aperçu de Comptoir' };
const end = {
  title: 'Merci, c’est tout pour aujourd’hui !',
  description: 'Ta réponse nous aide à améliorer Comptoir. Voici un petit cadeau pour te remercier.',
  actions: [{ label: 'Essayer gratuitement' }, { label: 'Revoir' }],
  reward: { type: 'code' as const, title: 'Ton code de réduction', description: '−15 % sur ton prochain mois', code: 'TOLD15', condition: 'Valable jusqu’au 31 décembre' },
};
const start = { title: 'Découvre les relevés automatiques', description: '2 minutes pour voir comment Comptoir rapproche tes relevés tout seul.' };

const grid = (ctx: ScreenContext, kind: 'start' | 'end') => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start', zoom: ctx === 'widget' ? 1 : ctx === 'vertical' ? 0.5 : 0.45 }}>
    {(['centered', 'split', 'cover'] as ScreenLayout[]).filter((l) => !(ctx === 'widget' && l === 'split')).map((l) => kind === 'start'
      ? <StartScreen key={l} layout={l} context={ctx} logo={<Logo size="sm" theme={l === 'cover' && ctx !== 'widget' ? 'dark' : 'light'} />} media={media} {...start} actions={[{ label: ctx === 'widget' ? 'Commencer' : 'Lancer l’annonce' }]} />
      : <EndScreen key={l} layout={l} context={ctx} logo={<Logo size="sm" theme={l === 'cover' && ctx !== 'widget' ? 'dark' : 'light'} />} media={l === 'centered' ? undefined : media} {...end} />)}
  </div>
);

export const Debut: StoryObj = { name: 'Début · slide', render: () => grid('slide', 'start') };
export const Fin: StoryObj = { name: 'Fin · slide', render: () => grid('slide', 'end') };
export const FinVerticale: StoryObj = { name: 'Fin · vertical 9:16', render: () => grid('vertical', 'end') };
export const Widget: StoryObj = { name: 'Début et fin · widget', render: () => <div style={{ display: 'grid', gap: 24 }}>{grid('widget', 'start')}{grid('widget', 'end')}</div> };
export const Pieces: StoryObj = {
  name: 'Pièces',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <RewardBlock {...end.reward} />
      <RewardBlock type="link" title="Ton cadeau t’attend" description="Un mois offert sur l’offre Pro" />
      <RewardBlock type="points" title="+50 points" description="Cumulés sur ton compte fidélité" />
      <Countdown until={Date.now() + 2 * 86400e3 + 5 * 3600e3} />
      <SocialLinks links={[{ network: 'linkedin', href: '#' }, { network: 'x', href: '#' }, { network: 'facebook', href: '#' }, { network: 'instagram', href: '#' }, { network: 'youtube', href: '#' }]} />
    </div>
  ),
};

/** Position du texte (PositionPicker item="text") : 9 places, le texte s'aligne comme les deux lignes de la case choisie. */
export const PositionDuTexte: StoryObj = {
  name: 'Position du texte',
  render: () => {
    const [pos, setPos] = useState<Position>('bottom-left');
    const [layout, setLayout] = useState<ScreenLayout>('split');
    return (
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <div style={{ display: 'grid', gap: 16, width: 220 }}>
          <GroupTab label="Style" value={layout} onChange={(v) => setLayout(v as ScreenLayout)} items={[{ value: 'centered', label: 'Centré' }, { value: 'split', label: 'Partagé' }, { value: 'cover', label: 'Couverture' }]} />
          <PositionPicker label="Position du texte" item="text" value={pos} onChange={setPos} />
        </div>
        <div style={{ zoom: 0.6 }}>
          <StartScreen layout={layout} textPosition={pos} logo={<Logo size="sm" theme={layout === 'cover' ? 'dark' : 'light'} />} media={media} {...start} actions={[{ label: 'Lancer l’annonce' }]} />
        </div>
      </div>
    );
  },
};
