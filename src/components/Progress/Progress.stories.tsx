import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar, ProgressSteps, Loader, SkeletonLine, SkeletonCard } from './Progress';

const meta = {
  title: 'Composants/Statut et aide/Progression et chargement',
  component: ProgressBar,
  parameters: { docs: { description: { component: 'ProgressBar : avancement d’une tâche (sm fine et arrondie, lg en bande). ProgressSteps : étapes du widget ou d’un tour. Loader : chargement en cours. Skeleton : contenu en attente, à la place des vrais blocs.' } } },
} satisfies Meta<typeof ProgressBar>;
export default meta;

export const Barre: StoryObj<typeof ProgressBar> = {
  args: { value: 60, size: 'sm', direction: 'horizontal' },
  argTypes: { value: { control: { type: 'range', min: 0, max: 100, step: 10 } }, size: { control: 'inline-radio', options: ['sm', 'lg'] }, direction: { control: 'inline-radio', options: ['horizontal', 'vertical'] } },
  render: (a) => <div style={{ width: a.direction === 'vertical' ? 'auto' : 389, height: a.direction === 'vertical' ? 200 : 'auto' }}><ProgressBar {...a} /></div>,
};

export const Longueurs: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, width: 389 }}>
      {[0, 20, 40, 60, 80, 100].map((v) => <ProgressBar key={v} value={v} />)}
      <ProgressBar value={60} size="lg" />
    </div>
  ),
};

export const Etapes: StoryObj = {
  name: 'Étapes (widget)',
  render: () => (
    <div style={{ display: 'grid', gap: 16, width: 276 }}>
      <ProgressSteps total={5} current={1} />
      <ProgressSteps total={5} current={3} />
      <ProgressSteps total={5} current={3} appearance="single" />
    </div>
  ),
};

export const Chargement: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {(['line-spinner', 'line-simple', 'dot-circle'] as const).map((s) => (
        <div key={s} style={{ display: 'flex', gap: 32, alignItems: 'flex-end' }}>
          {(['3xs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((z) => <Loader key={z} size={z} appearance={s} />)}
        </div>
      ))}
    </div>
  ),
};

export const Squelette: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <SkeletonCard />
      <div style={{ display: 'grid', gap: 8 }}><SkeletonLine width={240} /><SkeletonLine width={180} /></div>
    </div>
  ),
};
