import type { Meta, StoryObj } from '@storybook/react-vite';
import { TourBubble, TourStep, TourWelcome, type TourArrow } from './Tour';

const img = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b2f55"/><stop offset=".6" stop-color="#6a6f9a"/><stop offset="1" stop-color="#1c2033"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/><path d="M0 420 L260 300 L420 360 L560 250 L800 380 L800 600 L0 600Z" fill="#141826"/></svg>');

const meta = {
  title: 'Composants/Product Tour/Etapes du tour',
  component: TourStep,
  parameters: { docs: { description: { component: 'Visite guidée : étape en bulle ancrée (TourBubble), en modale (TourStep format="modal") ou modale d’accueil (TourWelcome). La couleur vient de la marque du client (`color`) ; `tone` dit si le texte est blanc (dark) ou noir (light). La croix est dans l’en-tête, jamais sur l’image.' } } },
} satisfies Meta<typeof TourStep>;
export default meta;

const base = { label: 'Nouvelle fonctionnalité', title: 'Découvrez le nouveau tableau de bord', description: 'Suivez vos réponses en temps réel et partagez les résultats avec votre équipe.', onPrevious: () => {}, onNext: () => {} };

export const Bulles: StoryObj = {
  name: 'Bulle ancrée',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {(['top', 'left', 'bottom-right'] as TourArrow[]).map((a) => <TourBubble key={a} arrow={a} {...base} />)}
      <TourBubble arrow="top-left" tone="light" color="#ffd46f" {...base} />
      <TourBubble arrow="top" progress={{ current: 2, total: 5 }} onClose={() => {}} {...base} />
    </div>
  ),
};

export const Modale: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gap: 32 }}>
      <TourStep format="modal" image={img} imagePosition="right" progress={{ current: 1, total: 5 }} onClose={() => {}}
        label="Nouvelle fonctionnalité" title="Anticipez sereinement la réforme de la facture électronique"
        description="La facturation électronique devient obligatoire en 2026 ! Activez dès maintenant la conformité réglementaire indispensable pour recevoir les factures de vos fournisseurs."
        notice="En cliquant ci-dessous, j’accepte que SEQINO devienne ma Plateforme Agréée officielle pour recevoir mes factures électroniques."
        action={{ label: 'Je valide mon inscription' }} onPrevious={() => {}} onNext={() => {}} />
      <TourStep format="modal" tone="light" color="#ffd46f" image={img} imagePosition="left" sender={{ name: 'Marc Honoré · Product designer' }} onClose={() => {}} {...base} />
    </div>
  ),
};

export const Accueil: StoryObj = {
  name: 'Modale d’accueil',
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
      <TourWelcome variant="extend" image={img} title="Quoi de neuf ?" subtitle="Les nouveautés de ce mois" onStart={() => {}} />
      <TourWelcome variant="resume" image={img} title="Quoi de neuf ?" subtitle="Les nouveautés de ce mois" steps={['Nouveauté 1', 'Nouveauté 2', 'Nouveauté 3', 'Nouveauté 4']} activeStep={0}>
        <TourStep format="widget" color="transparent" style={{ boxShadow: 'none', width: 'auto' }} {...base} />
      </TourWelcome>
    </div>
  ),
};
