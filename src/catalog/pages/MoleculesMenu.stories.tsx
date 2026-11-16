// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Molécules","name":"Menu","validated":false,"entries":[{"name":"ActionMenu","id":"4772:5404","size":"150x174","description":"Menu d'actions contextuel.","props":[],"image":"catalog/4772-5404.webp","coded":null},{"name":"NavigationMenu","id":"4771:81917","size":"224x459","description":"Menu de navigation.","props":[],"image":"catalog/4771-81917.webp","coded":null},{"name":"Listbox","id":"879:4729","size":"465x667","description":"Liste d'options flottante.","props":[{"kind":"bool","name":"hasScrollbar"},{"kind":"bool","name":"hasSearchbar"},{"kind":"bool","name":"hasFooter"},{"kind":"variant","name":"size","options":["lg","md","sm"]},{"kind":"variant","name":"type","options":["floating"]}],"image":"catalog/879-4729.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Molécules/Menu',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'En cours', render: () => <CatalogPage page={page} /> };
