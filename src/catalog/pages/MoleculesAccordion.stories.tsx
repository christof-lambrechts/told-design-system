// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Molécules","name":"Accordion","validated":false,"entries":[{"name":"Accordion","id":"635:66388","size":"324x168","description":"Section repliable.","props":[{"kind":"text","name":"label"},{"kind":"swap","name":"icon"},{"kind":"swap","name":"icon2"},{"kind":"text","name":"description"},{"kind":"bool","name":"hasDescription"},{"kind":"variant","name":"state","options":["default","hover","click"]}],"image":"catalog/635-66388.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Molécules/Accordion',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'En cours', render: () => <CatalogPage page={page} /> };
