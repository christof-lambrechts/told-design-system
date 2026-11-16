// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"TextArea","validated":true,"entries":[{"name":"TextArea","id":"543:14037","size":"1660x1922","description":"Zone de texte sur plusieurs lignes.","props":[{"kind":"bool","name":"hasAiButton"},{"kind":"bool","name":"hasHeaderEditor"},{"kind":"bool","name":"hasHelper"},{"kind":"bool","name":"hasLabel"},{"kind":"text","name":"placeholderText"},{"kind":"text","name":"labelText"},{"kind":"text","name":"helperText"},{"kind":"bool","name":"hasTooltip"},{"kind":"bool","name":"hasDescription"},{"kind":"text","name":"descriptionText"},{"kind":"bool","name":"hasRequired"},{"kind":"text","name":"value"},{"kind":"variant","name":"style","options":["brand","neutral"]},{"kind":"variant","name":"size","options":["sm","md","lg"]},{"kind":"variant","name":"state","options":["default","focus","error","disabled"]},{"kind":"variant","name":"placeholder","options":["false","true"]}],"image":"catalog/543-14037.webp","coded":"composants-saisie-et-choix-champs--zone"},{"name":"TextEditorControls","id":"3542:67880","size":"414x200","description":"Barre d'outils d'édition, en tête.","props":[{"kind":"bool","name":"hasTextStyle"},{"kind":"bool","name":"hasImprove"},{"kind":"bool","name":"hasMicro"},{"kind":"variant","name":"positition","options":["header"]},{"kind":"variant","name":"size","options":["sm","md","lg"]},{"kind":"variant","name":"type","options":["default"]}],"image":"catalog/3542-67880.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/TextArea',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
