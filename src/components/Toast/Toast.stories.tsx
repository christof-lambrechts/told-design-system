import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from './Toast';

const meta = { title: 'Composants/Statut et aide/Toast', component: Toast } satisfies Meta<typeof Toast>;
export default meta;

export const Defaut: StoryObj<typeof Toast> = {
  name: 'Toast',
  args: { type: 'success', size: 'lg', title: 'Told publié', description: 'Votre questionnaire est en ligne sur votre site.' },
  argTypes: { type: { control: 'select', options: ['success', 'error', 'warning', 'brand', 'neutral', 'neutral-light', 'neutral-dark'] }, size: { control: 'inline-radio', options: ['sm', 'lg'] } },
};

export const Types: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 400px)', gap: 16 }}>
      {(['success', 'error', 'warning', 'brand', 'neutral', 'neutral-light', 'neutral-dark'] as const).flatMap((t) => [
        <Toast key={t + 'lg'} type={t} title="Told publié" description="Votre questionnaire est en ligne sur votre site." onClose={() => {}} />,
        <Toast key={t + 'sm'} type={t} size="sm" title="Told publié" description="Votre questionnaire est en ligne." />,
      ])}
    </div>
  ),
};
