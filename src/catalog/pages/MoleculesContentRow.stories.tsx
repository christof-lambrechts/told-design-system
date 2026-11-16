// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Molécules","name":"ContentRow","validated":false,"entries":[{"name":"ContentRow","id":"7887:1174","size":"1156x1642","description":"Ligne de la liste des Told.","props":[{"kind":"text","name":"title"},{"kind":"text","name":"kind"},{"kind":"text","name":"surface"},{"kind":"text","name":"responses"},{"kind":"text","name":"activity"},{"kind":"swap","name":"icon"},{"kind":"bool","name":"hasMenu"},{"kind":"bool","name":"hasStatus"},{"kind":"variant","name":"state","options":["default","hover","selected"]},{"kind":"variant","name":"contentType","options":["neutral","questionnaire","product-tour","annonce","nps","checklist"]}],"image":"catalog/7887-1174.webp","coded":null},{"name":"ContentRowHeader","id":"7887:1178","size":"1092x39","description":"En-tête de colonnes de la liste, aligné sur ContentRow.","props":[{"kind":"bool","name":"hasStatus"}],"image":"catalog/7887-1178.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Molécules/ContentRow',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'En cours', render: () => <CatalogPage page={page} /> };
