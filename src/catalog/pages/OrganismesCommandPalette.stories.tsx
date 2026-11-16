// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Organismes","name":"CommandPalette","validated":false,"entries":[{"name":"CommandItem","id":"7967:10930","size":"664x140","description":"Ligne de la palette ⌘K.","props":[{"kind":"text","name":"label"},{"kind":"text","name":"detail"},{"kind":"bool","name":"hasDetail"},{"kind":"bool","name":"hasShortcut"},{"kind":"variant","name":"state","options":["default","selected"]}],"image":"catalog/7967-10930.webp","coded":null},{"name":"CommandPalette","id":"7967:10931","size":"640x408","description":"Palette de recherche ⌘K.","props":[],"image":"catalog/7967-10931.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Organismes/CommandPalette',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'En cours', render: () => <CatalogPage page={page} /> };
