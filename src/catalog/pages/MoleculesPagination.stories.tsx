// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Molécules","name":"Pagination","validated":true,"entries":[{"name":"PaginationButton","id":"23:16467","size":"119x227","description":"Bouton de page.","props":[{"kind":"text","name":"textInput"},{"kind":"variant","name":"state","options":["default","hover","pressed","selected"]},{"kind":"variant","name":"device","options":["desktop","mobile"]}],"image":"catalog/23-16467.webp","coded":null},{"name":"PaginationDot","id":"23:16476","size":"44x132","description":"Point de pagination.","props":[{"kind":"variant","name":"color","options":["grey","blue"]},{"kind":"variant","name":"size","options":["lg","sm"]}],"image":"catalog/23-16476.webp","coded":null},{"name":"PaginationSquare","id":"23:16485","size":"44x76","description":"Carré de pagination.","props":[{"kind":"variant","name":"state","options":["default","select"]}],"image":"catalog/23-16485.webp","coded":null},{"name":"Pagination","id":"1436:137865","size":"438x168","description":"Pagination de liste.","props":[{"kind":"bool","name":"hasRowCount"},{"kind":"bool","name":"hasRowsPerPage"},{"kind":"variant","name":"device","options":["desktop","mobile"]}],"image":"catalog/1436-137865.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Molécules/Pagination',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
