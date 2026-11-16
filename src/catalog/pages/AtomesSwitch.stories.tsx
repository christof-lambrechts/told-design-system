// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"Switch","validated":true,"entries":[{"name":"Switch","id":"5905:70473","size":"5220x1222","description":"Interrupteur avec libellé.","props":[{"kind":"text","name":"labelText"},{"kind":"bool","name":"hasLabel"},{"kind":"text","name":"descriptionText"},{"kind":"bool","name":"hasDescription"},{"kind":"bool","name":"hasIcon"},{"kind":"bool","name":"hasBadge"},{"kind":"bool","name":"hasButtonLink"},{"kind":"variant","name":"size","options":["lg","md","sm"]},{"kind":"variant","name":"state","options":["default","disabled","error"]},{"kind":"variant","name":"checked","options":["false","true"]},{"kind":"variant","name":"boxed","options":["false","true"]},{"kind":"variant","name":"checkPlacement","options":["left","right"]},{"kind":"variant","name":"descriptionPlacement","options":["below","inline"]}],"image":"catalog/5905-70473.webp","coded":"composants-saisie-et-choix-checkbox-radio-switch--docs"},{"name":"SwitchItem","id":"4552:110688","size":"100x1660","description":"Interrupteur seul.","props":[{"kind":"variant","name":"size","options":["lg","md","sm"]},{"kind":"variant","name":"color","options":["brand","shamrock","mustard"]},{"kind":"variant","name":"checked","options":["true","false"]},{"kind":"variant","name":"disabled","options":["false","true"]}],"image":"catalog/4552-110688.webp","coded":null},{"name":"SwitchOptionCard","id":"5563:21578","size":"680x86","description":"Carte de réglage avec interrupteur.","props":[],"image":"catalog/5563-21578.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/Switch',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
