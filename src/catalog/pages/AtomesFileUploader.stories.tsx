// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"FileUploader","validated":true,"entries":[{"name":"FileUploader","id":"2547:103458","size":"540x948","description":"Zone de dépôt de fichier.","props":[{"kind":"bool","name":"hasRecommendedSize"},{"kind":"bool","name":"hasWeightFileTag"},{"kind":"variant","name":"state","options":["hover","fill","default","file-drop"]}],"image":"catalog/2547-103458.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/FileUploader',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
