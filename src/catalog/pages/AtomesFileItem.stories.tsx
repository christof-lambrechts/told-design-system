// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"FileItem","validated":false,"entries":[{"name":"FilesItem","id":"5756:26793","size":"505x82","description":"Ligne de fichier envoyé.","props":[{"kind":"bool","name":"hasUploadFailed"}],"image":"catalog/5756-26793.webp","coded":null},{"name":"privacyPolitieItem","id":"6113:111395","size":"342x144","description":"Ligne de politique de confidentialité.","props":[{"kind":"variant","name":"withPolicy","options":["default","true"]}],"image":"catalog/6113-111395.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/FileItem',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'En cours', render: () => <CatalogPage page={page} /> };
