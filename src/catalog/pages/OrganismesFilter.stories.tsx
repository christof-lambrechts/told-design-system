// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Organismes","name":"Filter","validated":false,"entries":[{"name":"Event filtre base","id":"5571:24554","size":"855x276","description":"Élément de filtre.","props":[{"kind":"bool","name":"hasIcon"},{"kind":"bool","name":"hasComma"},{"kind":"bool","name":"hasChevron"},{"kind":"variant","name":"state","options":["default","hover","selected","disabled"]},{"kind":"variant","name":"type","options":["filtre","value"]},{"kind":"variant","name":"shape","options":["main-filter","text","operator","icon","nps"]},{"kind":"variant","name":"placeholder","options":["false","true"]}],"image":"catalog/5571-24554.webp","coded":null},{"name":"Frame 427320124","id":"5571:24673","size":"104x176","description":"Opérateur de filtre.","props":[{"kind":"variant","name":"state","options":["default","variant2","hover"]}],"image":"catalog/5571-24673.webp","coded":null},{"name":"Filtre line base","id":"5571:24709","size":"1060x461","description":"Ligne de filtre.","props":[{"kind":"bool","name":"hasEqual"},{"kind":"bool","name":"hasAndOr"},{"kind":"bool","name":"hasLineBreak"},{"kind":"variant","name":"number","options":["1","2","3","4"]},{"kind":"variant","name":"add","options":["false","true"]}],"image":"catalog/5571-24709.webp","coded":null},{"name":"FilterPanel","id":"5571:24844","size":"1134x728","description":"Panneau de filtres.","props":[{"kind":"variant","name":"filters","options":["default","1-line","2-and-more"]},{"kind":"variant","name":"style","options":["float","default"]}],"image":"catalog/5571-24844.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Organismes/Filter',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'En cours', render: () => <CatalogPage page={page} /> };
