// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Organismes","name":"OptionPanel","validated":false,"entries":[{"name":"OptionPanel","id":"6031:85898","size":"1228x3040","description":"Colonne d'options de l'éditeur.","props":[{"kind":"bool","name":"hasIA"},{"kind":"variant","name":"contentType","options":["survey","tour","announcement"]},{"kind":"variant","name":"scope","options":["step","block","secondary"]}],"image":"catalog/6031-85898.webp","coded":null},{"name":"PanelHeader","id":"7851:8151","size":"304x70","description":"En-tête du panneau d'édition d'un bloc.","props":[{"kind":"text","name":"title"},{"kind":"text","name":"description"},{"kind":"bool","name":"hasChangeType"},{"kind":"bool","name":"hasMenu"},{"kind":"bool","name":"hasBack"},{"kind":"text","name":"backLabel"}],"image":"catalog/7851-8151.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Organismes/OptionPanel',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'En cours', render: () => <CatalogPage page={page} /> };
