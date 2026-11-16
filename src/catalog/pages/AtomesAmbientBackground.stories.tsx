// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"AmbientBackground","validated":false,"entries":[{"name":"AmbientBackground","id":"8301:923","size":"2080x736","description":"Fond d'ambiance en dégradé doux (halos flous + trame de points blancs tous les 6).","props":[{"kind":"variant","name":"Tone","options":["Lavender","Brand"]},{"kind":"variant","name":"Intensity","options":["Pale","Soft","Medium","Vivid"]}],"image":"catalog/8301-923.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/AmbientBackground',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'En cours', render: () => <CatalogPage page={page} /> };
