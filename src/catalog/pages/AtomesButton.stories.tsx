// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"Button","validated":true,"entries":[{"name":"Button","id":"2754:16796","size":"1834x1268","description":"Bouton principal de l'application.","props":[{"kind":"text","name":"label"},{"kind":"bool","name":"hasLabel"},{"kind":"bool","name":"hasIconLeft"},{"kind":"swap","name":"iconLeft"},{"kind":"bool","name":"hasIconRight"},{"kind":"swap","name":"iconRight"},{"kind":"variant","name":"color","options":["brand","success","neutral","danger","warning","purple"]},{"kind":"variant","name":"type","options":["primary","secondary","ghost","tertiary"]},{"kind":"variant","name":"size","options":["lg","md","sm","xs"]},{"kind":"variant","name":"state","options":["default","hover","disabled"]}],"image":"catalog/2754-16796.webp","coded":"composants-actions-button--docs"}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/Button',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
