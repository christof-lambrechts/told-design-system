// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"Tooltip","validated":true,"entries":[{"name":"Tooltip","id":"20:9483","size":"223x956","description":"Bulle d'aide contextuelle.","props":[{"kind":"text","name":"text"},{"kind":"bool","name":"hasIconRight"},{"kind":"bool","name":"hasIconLeft"},{"kind":"swap","name":"iconLeft"},{"kind":"swap","name":"iconRight"},{"kind":"variant","name":"direction","options":["up","upright","upleft","left","right","down","downleft","downright"]},{"kind":"variant","name":"size","options":["sm","md"]}],"image":"catalog/20-9483.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/Tooltip',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
