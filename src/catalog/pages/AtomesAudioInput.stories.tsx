// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"AudioInput","validated":false,"entries":[{"name":"AnswerInput","id":"6351:59142","size":"2560x1526","description":"Champ de réponse texte ou voix.","props":[{"kind":"bool","name":"hasHelper"},{"kind":"text","name":"placeholderText"},{"kind":"text","name":"helperText"},{"kind":"bool","name":"hasRequired"},{"kind":"variant","name":"style","options":["brand","neutral"]},{"kind":"variant","name":"size","options":["sm","md","lg"]},{"kind":"variant","name":"state","options":["default","hover","focus","error","disabled","listening"]},{"kind":"variant","name":"placeholder","options":["false","true"]}],"image":"catalog/6351-59142.webp","coded":null},{"name":"Voice","id":"6350:51626","size":"414x656","description":"Commandes de saisie vocale.","props":[{"kind":"bool","name":"hasTextStyle"},{"kind":"variant","name":"size","options":["sm","md","lg"]},{"kind":"variant","name":"type","options":["recording","listening","answering"]}],"image":"catalog/6350-51626.webp","coded":null},{"name":"TextEditorControls","id":"6351:60023","size":"152x232","description":"Barre d'outils d'édition, en pied.","props":[{"kind":"bool","name":"hasTextStyle"},{"kind":"bool","name":"hasImprove"},{"kind":"bool","name":"hasMicro"},{"kind":"variant","name":"positition","options":["footer"]},{"kind":"variant","name":"size","options":["sm","md","lg"]},{"kind":"variant","name":"type","options":["default"]}],"image":"catalog/6351-60023.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/AudioInput',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'En cours', render: () => <CatalogPage page={page} /> };
