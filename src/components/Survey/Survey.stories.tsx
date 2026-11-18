import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LinkSurvey, NpsAnswer, ScaleAnswer } from './Survey';
import { WidgetConsent } from '../Widget/Widget';

const img = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b2f55"/><stop offset=".6" stop-color="#6a6f9a"/><stop offset="1" stop-color="#1c2033"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/><path d="M0 420 L260 300 L420 360 L560 250 L800 380 L800 600 L0 600Z" fill="#141826"/></svg>');

const meta = {
  title: 'Composants/Survey/Questionnaire par lien',
  component: LinkSurvey,
  parameters: { layout: 'fullscreen', docs: { description: { component: 'Le questionnaire ouvert depuis un lien. Mêmes pièces que le widget, à la taille du format : pleine page = lg, capsule = md, mobile = sm. ScaleAnswer et NpsAnswer servent aussi dans le widget (size="sm").' } } },
} satisfies Meta<typeof LinkSurvey>;
export default meta;

const Stars = ({ size }: { size: 'sm' | 'md' | 'lg' }) => { const [v, setV] = useState(4); return <ScaleAnswer kind="star" value={v} onChange={setV} size={size} />; };

export const Capsule: StoryObj = {
  render: () => (
    <div style={{ height: 800, display: 'flex' }}>
      <LinkSurvey shape="capsule" image={img} sender={{ name: 'Marc Honoré · Product designer' }} progress={{ current: 1, total: 5 }} onClose={() => {}}
        label="Nouvelle fonctionnalité" question="Que pensez-vous de notre nouvelle fonctionnalité ?" description="Notez de 1 à 5, une seule réponse."
        consent={<WidgetConsent message="Acceptez-vous de partager vos réponses avec Acme ?" onAccept={() => {}} onRefuse={() => {}} />}
        onPrevious={() => {}} onNext={() => {}}><Stars size="md" /></LinkSurvey>
    </div>
  ),
};

export const PleinePage: StoryObj = {
  name: 'Pleine page sombre',
  render: () => (
    <LinkSurvey shape="full-page" appearance="dark" image={img} progress={{ current: 2, total: 5 }} onClose={() => {}}
      question="Quelle est la probabilité que vous nous recommandiez ?" onPrevious={() => {}} onNext={() => {}}>
      <NpsAnswer value={8} size="lg" />
    </LinkSurvey>
  ),
};

export const Mobile: StoryObj = {
  render: () => (
    <div style={{ height: 760, display: 'flex' }}>
      <LinkSurvey device="mobile" appearance="light" image={img} progress={{ current: 3, total: 5 }} onClose={() => {}}
        question="Comment vous sentez-vous aujourd’hui ?" onNext={() => {}}><ScaleAnswer kind="emoji" value={4} size="sm" /></LinkSurvey>
    </div>
  ),
};

export const Echelles: StoryObj = {
  name: 'Échelles aux trois tailles',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <div key={s} style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <ScaleAnswer kind="star" value={4} size={s} />
          <ScaleAnswer kind="number" value={3} size={s} />
          <ScaleAnswer kind="emoji" value={4} size={s} />
          <ScaleAnswer kind="meteo" value={4} size={s} />
          <div style={{ width: s === 'sm' ? 300 : s === 'md' ? 520 : 600 }}><NpsAnswer value={7} size={s} /></div>
        </div>
      ))}
    </div>
  ),
};
