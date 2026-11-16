// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"ButtonIcon","validated":true,"entries":[{"name":"ButtonIcon","id":"5867:56798","size":"328x4840","description":"Bouton carré avec une seule icône.","props":[{"kind":"variant","name":"style","options":["fill","outline","ghost","subtle"]},{"kind":"variant","name":"size","options":["lg","md","sm","xs"]},{"kind":"variant","name":"state","options":["default","hover","selected","disabled"]},{"kind":"variant","name":"color","options":["brand","purple","success","danger","neutral"]}],"image":"catalog/5867-56798.webp","coded":"composants-actions-button--docs"}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/ButtonIcon',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
