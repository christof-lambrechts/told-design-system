// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"Avatar","validated":false,"entries":[{"name":"Avatar","id":"1053:144214","size":"741x358","description":"Avatar : initiales, icône, image, logo ou Toldies.","props":[{"kind":"text","name":"text"},{"kind":"variant","name":"size","options":["3xl","2xl","xl","lg","md","sm","xs"]},{"kind":"variant","name":"style","options":["text","icon","image","logo","toldies"]},{"kind":"variant","name":"outline","options":["false","true"]}],"image":"catalog/1053-144214.webp","coded":"composants-visuels-avatar--docs"}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/Avatar',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'En cours', render: () => <CatalogPage page={page} /> };
