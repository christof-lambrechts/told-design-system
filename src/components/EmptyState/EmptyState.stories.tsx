import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './EmptyState';
import { Button } from '../Button/Button';

const meta = { title: 'Composants/Retours/EmptyState', component: EmptyState } satisfies Meta<typeof EmptyState>;
export default meta;

const Illu = () => (
  <svg viewBox="0 0 256 168" role="img" aria-label="">
    <rect width="256" height="168" rx="14" fill="var(--neutral-surface-muted)" />
    <rect x="12" y="28" width="232" height="128" rx="8" fill="var(--illustration-surface)" />
    <rect x="160" y="74" width="76" height="74" rx="10" fill="var(--illustration-accent)" />
    <rect x="24" y="40" width="90" height="6" rx="3" fill="var(--illustration-line)" />
  </svg>
);

export const AvecAction: StoryObj = {
  name: 'EmptyState',
  render: () => <EmptyState illustration={<Illu />} title="Aucun Told pour l’instant" description="Créez votre premier Told pour recueillir des avis ou guider vos utilisateurs." actions={<Button iconLeft="add-01">Créer un Told</Button>} />,
};
