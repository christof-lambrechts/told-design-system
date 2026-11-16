// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"Flag","validated":true,"entries":[{"name":"FlagCountry","id":"567:57115","size":"720x520","description":"Drapeaux des pays et continents.","props":[{"kind":"variant","name":"country","options":["al-albania","dz-algeria","be-belgium","fr-france","es-spain","pt-portugal","de-germany","jp-japan","…+208"]}],"image":"catalog/567-57115.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/Flag',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
