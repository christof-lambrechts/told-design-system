import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonGroup } from './ButtonGroup';
import { Button, ButtonIcon } from './Button';

const meta = { title: 'Composants/Actions/ButtonGroup', component: ButtonGroup } satisfies Meta<typeof ButtonGroup>;
export default meta;

export const Groupes: StoryObj = {
  name: 'ButtonGroup',
  render: () => (
    <div style={{ display: 'grid', gap: 20, justifyItems: 'start' }}>
      <ButtonGroup>
        <ButtonIcon icon="share-03" label="Partager" appearance="outline" color="neutral" size="sm" />
        <Button size="sm" color="neutral" variant="secondary-outline" iconLeft="view">Aperçu</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button size="md" color="neutral" variant="secondary-outline" iconLeft="share-03">Partager</Button>
        <Button size="md" color="neutral" variant="secondary-outline" iconLeft="view">Aperçu</Button>
        <Button size="md" color="neutral" variant="secondary-outline" iconLeft="copy-01">Dupliquer</Button>
      </ButtonGroup>
      <div style={{ background: 'var(--brand-neutral-950)', padding: 16, borderRadius: 12 }}>
        <ButtonGroup appearance="inverse">
          <ButtonIcon icon="share-03" label="Partager" size="sm" />
          <Button size="sm" iconLeft="view">Aperçu</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};
