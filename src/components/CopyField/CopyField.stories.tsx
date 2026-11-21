import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeBlock, CopyField } from './CopyField';

const meta = { title: 'Composants/Saisie et choix/Champ à copier', component: CopyField } satisfies Meta<typeof CopyField>;
export default meta;

export const Champ: StoryObj = {
  name: 'CopyField',
  render: () => (
    <div style={{ display: 'grid', gap: 16, width: 420 }}>
      <CopyField label="Lien de partage" value="https://record.told.club/d/onboarding-inqom" />
      <CopyField size="md" value="https://record.told.club/d/onboarding-inqom" />
    </div>
  ),
};

export const Code: StoryObj = {
  name: 'CodeBlock',
  render: () => (
    <div style={{ width: 520 }}>
      <CodeBlock code={'<iframe src="https://record.told.club/embed/onboarding" width="100%" height="560" allow="fullscreen"></iframe>'} />
    </div>
  ),
};
