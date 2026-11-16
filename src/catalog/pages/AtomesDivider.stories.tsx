// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"Divider","validated":true,"entries":[{"name":"Divider","id":"6055:89","size":"1440x1","description":"Séparateur horizontal.","props":[],"image":"catalog/6055-89.webp","coded":null},{"name":"DividerVertical","id":"6055:90","size":"1x156","description":"Séparateur vertical.","props":[],"image":"catalog/6055-90.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/Divider',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
