// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"Logos","validated":true,"entries":[{"name":"logoTold2025","id":"4:4766","size":"160x646","description":"Logo Told 2025.","props":[{"kind":"variant","name":"theme","options":["light","dark"]},{"kind":"variant","name":"size","options":["lg","md","sm","xs"]},{"kind":"variant","name":"background","options":["no"]},{"kind":"variant","name":"version","options":["2025"]},{"kind":"variant","name":"mini","options":["false","true"]}],"image":"catalog/4-4766.webp","coded":null},{"name":"LogoPartner","id":"4:13217","size":"64x1280","description":"Logos de partenaires et d'outils.","props":[{"kind":"variant","name":"company","options":["tol","figma","marvel","jira","maze","notion","trello","drive","…+31"]}],"image":"catalog/4-13217.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/Logos',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
