// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"Select","validated":true,"entries":[{"name":"Select","id":"4855:20599","size":"1812x1600","description":"Champ de sélection.","props":[{"kind":"variant","name":"style","options":["default","flat","light"]},{"kind":"variant","name":"size","options":["sm","md","lg"]},{"kind":"variant","name":"state","options":["default","focus","error","disabled"]},{"kind":"variant","name":"placeholder","options":["true","false"]}],"image":"catalog/4855-20599.webp","coded":"composants-saisie-et-choix-select--docs"}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/Select',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
