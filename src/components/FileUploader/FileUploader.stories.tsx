import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileUploader } from './FileUploader';

const meta = { title: 'Composants/Saisie et choix/FileUploader', component: FileUploader } satisfies Meta<typeof FileUploader>;
export default meta;

export const Defaut: StoryObj<typeof FileUploader> = {
  name: 'FileUploader',
  args: { recommendedSize: 'Taille conseillée : 1200 × 630 px', maxWeight: '5 Mo max' },
  render: (a) => <div style={{ width: 500 }}><FileUploader {...a} /></div>,
};
