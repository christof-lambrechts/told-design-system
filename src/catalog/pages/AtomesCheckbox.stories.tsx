// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"Checkbox","validated":true,"entries":[{"name":"Checkbox","id":"4554:111425","size":"4904x400","description":"Case à cocher avec libellé.","props":[{"kind":"text","name":"labelText"},{"kind":"bool","name":"hasLabel"},{"kind":"text","name":"descriptionText"},{"kind":"bool","name":"hasDescription"},{"kind":"bool","name":"hasIcon"},{"kind":"bool","name":"hasBadge"},{"kind":"bool","name":"hasButtonLink"},{"kind":"variant","name":"size","options":["lg","md"]},{"kind":"variant","name":"state","options":["default","disabled","error"]},{"kind":"variant","name":"checked","options":["false","true"]},{"kind":"variant","name":"boxed","options":["false","true"]},{"kind":"variant","name":"checkPlacement","options":["left","right"]},{"kind":"variant","name":"descriptionPlacement","options":["below","inline"]}],"image":"catalog/4554-111425.webp","coded":"composants-saisie-et-choix-checkbox-radio-switch--docs"},{"name":"CheckboxItem","id":"4554:110759","size":"160x200","description":"Case seule.","props":[{"kind":"variant","name":"state","options":["default","disabled","error"]},{"kind":"variant","name":"color","options":["brand","neutral"]},{"kind":"variant","name":"checked","options":["false","true"]}],"image":"catalog/4554-110759.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/Checkbox',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
