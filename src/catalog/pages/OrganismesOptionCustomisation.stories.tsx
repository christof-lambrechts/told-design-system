// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Organismes","name":"OptionCustomisation","validated":false,"entries":[{"name":"OptionCustomisation","id":"1043:135563","size":"1060x5646","description":"Options de personnalisation.","props":[{"kind":"bool","name":"hasPreferenceColor"},{"kind":"variant","name":"type","options":["bg-color-text-light-solid","bg-color-text-dark-solid","bg-color-text-light-gradient","bg-color-text-dark-gradient","couverture","footer","…+14"]},{"kind":"variant","name":"active","options":["false","true"]},{"kind":"variant","name":"kind","options":["customisation"]}],"image":"catalog/1043-135563.webp","coded":null},{"name":"CustomisationPanel","id":"8172:103231","size":"2812x912","description":"Colonne de droite de l'onglet Design.","props":[{"kind":"variant","name":"section","options":["color","radius","position","avatar","logo","footer","confetti"]}],"image":"catalog/8172-103231.webp","coded":null},{"name":"PositionPreview","id":"8172:103367","size":"1584x1044","description":"Aperçu de la position du widget.","props":[{"kind":"variant","name":"position","options":["top-left","top-center","top-right","middle-left","center","middle-right","…+3"]}],"image":"catalog/8172-103367.webp","coded":null},{"name":"CustomisationPopover","id":"8208:237547","size":"300x218","description":"Carte flottante de réglage de l’onglet Design.","props":[],"image":"catalog/8208-237547.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Organismes/OptionCustomisation',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'En cours', render: () => <CatalogPage page={page} /> };
