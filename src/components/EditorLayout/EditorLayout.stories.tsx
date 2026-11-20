import type { Meta, StoryObj } from '@storybook/react-vite';
import { EditorLayout } from './EditorLayout';

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
