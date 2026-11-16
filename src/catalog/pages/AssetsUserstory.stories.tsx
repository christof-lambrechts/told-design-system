// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Assets","name":"User story","validated":true,"entries":[{"name":"User story","id":"7806:3673","size":"2320x980","description":"Fiche user story pour les parcours.","props":[{"kind":"text","name":"ID"},{"kind":"text","name":"Title"},{"kind":"text","name":"As a"},{"kind":"text","name":"I want"},{"kind":"text","name":"So that"},{"kind":"text","name":"Screens"},{"kind":"text","name":"Persona"},{"kind":"text","name":"Persona detail"},{"kind":"text","name":"Version"},{"kind":"text","name":"Criterion 1"},{"kind":"bool","name":"Show criterion 1"},{"kind":"text","name":"Criterion 2"},{"kind":"bool","name":"Show criterion 2"},{"kind":"text","name":"Criterion 3"},{"kind":"bool","name":"Show criterion 3"},{"kind":"text","name":"Criterion 4"},{"kind":"bool","name":"Show criterion 4"},{"kind":"variant","name":"Status","options":["À rédiger","À valider","Validée"]}],"image":"catalog/7806-3673.webp","coded":"composants-assets-user-story--defaut"}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Assets/User story',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
