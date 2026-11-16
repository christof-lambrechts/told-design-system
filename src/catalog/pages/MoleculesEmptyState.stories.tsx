// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Molécules","name":"EmptyState","validated":false,"entries":[{"name":"EmptyState","id":"7855:516","size":"1360x471","description":"État vide d'une liste ou d'un écran.","props":[{"kind":"bool","name":"hasButton"},{"kind":"bool","name":"hasLink"},{"kind":"variant","name":"type","options":["default","with-cta","error"]}],"image":"catalog/7855-516.webp","coded":null},{"name":"DesktopOnlyNotice","id":"7941:80192","size":"390x844","description":"Écran mobile affiché quand on ouvre l’application sur téléphone.","props":[{"kind":"text","name":"title"},{"kind":"text","name":"description"}],"image":"catalog/7941-80192.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Molécules/EmptyState',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'En cours', render: () => <CatalogPage page={page} /> };
