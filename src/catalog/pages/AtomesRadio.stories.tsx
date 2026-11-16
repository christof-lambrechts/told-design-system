// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"Radio","validated":true,"entries":[{"name":"Radio","id":"4554:113764","size":"2656x670","description":"Bouton radio avec libellé.","props":[{"kind":"text","name":"labelText"},{"kind":"bool","name":"hasLabel"},{"kind":"text","name":"descriptionText"},{"kind":"bool","name":"hasDescription"},{"kind":"bool","name":"hasIcon"},{"kind":"bool","name":"hasBadge"},{"kind":"variant","name":"size","options":["lg","md"]},{"kind":"variant","name":"state","options":["default","disabled","error"]},{"kind":"variant","name":"checked","options":["false","true"]},{"kind":"variant","name":"boxed","options":["false","true"]},{"kind":"variant","name":"descriptionPlacement","options":["below","inline"]}],"image":"catalog/4554-113764.webp","coded":"composants-saisie-et-choix-checkbox-radio-switch--docs"},{"name":"RadioItem","id":"7:2083","size":"160x360","description":"Bouton radio seul.","props":[{"kind":"variant","name":"state","options":["default","error","disabled"]},{"kind":"variant","name":"checked","options":["false","true"]},{"kind":"variant","name":"style","options":["check","dot"]},{"kind":"variant","name":"color","options":["brand","shamrock"]}],"image":"catalog/7-2083.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/Radio',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
