// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"DropdownField","validated":false,"entries":[{"name":"DropdownField","id":"4855:20599","size":"1812x1600","description":"Champ de sélection.","props":[{"kind":"variant","name":"style","options":["default","flat","light"]},{"kind":"variant","name":"size","options":["sm","md","lg"]},{"kind":"variant","name":"state","options":["default","focus","error","disabled"]},{"kind":"variant","name":"placeholder","options":["true","false"]}],"image":"catalog/4855-20599.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/DropdownField',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'En cours', render: () => <CatalogPage page={page} /> };
