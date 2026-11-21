// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"Selection","validated":false,"entries":[{"name":"SelectionCard","id":"4625:104218","size":"682x724","description":"Carte de choix.","props":[{"kind":"text","name":"labelText"},{"kind":"bool","name":"hasLabel"},{"kind":"text","name":"descriptionText"},{"kind":"bool","name":"hasDescription"},{"kind":"bool","name":"hasIcon"},{"kind":"bool","name":"hasBadge"},{"kind":"bool","name":"hasNumber"},{"kind":"swap","name":"icon"},{"kind":"variant","name":"size","options":["lg","md"]},{"kind":"variant","name":"state","options":["default","hover","pressed","checked","disabled","error"]},{"kind":"variant","name":"checked","options":["false","true"]}],"image":"catalog/4625-104218.webp","coded":"composants-cartes-carte-et-en-tête--menu-canaux"},{"name":"SelectionItem","id":"4722:47894","size":"336x388","description":"Ligne de choix.","props":[{"kind":"text","name":"labelText"},{"kind":"bool","name":"hasLabel"},{"kind":"bool","name":"hasIcon"},{"kind":"bool","name":"hasBadge"},{"kind":"variant","name":"checked","options":["false","true"]},{"kind":"variant","name":"state","options":["default","hover","pressed","checked","disabled"]}],"image":"catalog/4722-47894.webp","coded":null},{"name":"SelectableCard","id":"6258:86451","size":"349x1688","description":"Carte sélectionnable.","props":[{"kind":"text","name":"labelText"},{"kind":"bool","name":"hasLabel"},{"kind":"text","name":"descriptionText"},{"kind":"bool","name":"hasDescription"},{"kind":"bool","name":"hasBadge"},{"kind":"variant","name":"size","options":["lg","md"]},{"kind":"variant","name":"state","options":["default","hover","pressed","checked","disabled","error"]},{"kind":"variant","name":"checked","options":["false","true"]}],"image":"catalog/6258-86451.webp","coded":null},{"name":"Template cards","id":"1506:7664","size":"3732x408","description":"Carte de modèle de départ.","props":[{"kind":"bool","name":"hasTag"},{"kind":"variant","name":"style","options":["from-scratch","template"]},{"kind":"variant","name":"states","options":["default","pressed","hover","current"]},{"kind":"variant","name":"version","options":["horizontal","vertical"]}],"image":"catalog/1506-7664.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/Selection',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'En cours', render: () => <CatalogPage page={page} /> };
