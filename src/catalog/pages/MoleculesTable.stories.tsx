// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Molécules","name":"Table","validated":false,"entries":[{"name":"TableHeaderCell","id":"418:10486","size":"382x125","description":"En-tête de colonne.","props":[{"kind":"bool","name":"hasSort"},{"kind":"bool","name":"hasText"},{"kind":"text","name":"text2"},{"kind":"bool","name":"hasCheckbox"},{"kind":"bool","name":"hasFlag"},{"kind":"bool","name":"isDefault"},{"kind":"variant","name":"empty","options":["false","true"]},{"kind":"variant","name":"background","options":["true","false"]}],"image":"catalog/418-10486.webp","coded":null},{"name":"TableCell","id":"418:26173","size":"686x779","description":"Cellule de tableau.","props":[{"kind":"variant","name":"state","options":["default","actif","disabled"]},{"kind":"variant","name":"size","options":["lg","sm"]},{"kind":"variant","name":"hover","options":["false","true"]},{"kind":"variant","name":"noContent","options":["false","true"]},{"kind":"variant","name":"hasdivider","options":["true","false"]}],"image":"catalog/418-26173.webp","coded":null},{"name":"DomaineTable","id":"1532:126431","size":"1192x463","description":"Tableau des domaines.","props":[{"kind":"variant","name":"validated","options":["true","false"]},{"kind":"variant","name":"row","options":["2","1"]}],"image":"catalog/1532-126431.webp","coded":null},{"name":"TranslationCell","id":"8024:2562","size":"1080x277","description":"Cellule du tableau de traduction.","props":[{"kind":"text","name":"text"},{"kind":"variant","name":"state","options":["source","filled","empty","focus","loading"]},{"kind":"variant","name":"kind","options":["url","text"]}],"image":"catalog/8024-2562.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Molécules/Table',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'En cours', render: () => <CatalogPage page={page} /> };
