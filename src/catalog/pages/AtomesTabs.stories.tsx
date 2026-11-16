// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"Tabs","validated":true,"entries":[{"name":"TextTab","id":"20:14461","size":"460x112","description":"Onglet texte.","props":[{"kind":"bool","name":"hasIconLeft"},{"kind":"bool","name":"hasIconRight"},{"kind":"text","name":"label"},{"kind":"swap","name":"iconLeft"},{"kind":"swap","name":"iconRight"},{"kind":"bool","name":"hasCount"},{"kind":"text","name":"count"},{"kind":"variant","name":"state","options":["default","hover","selected","disabled"]}],"image":"catalog/20-14461.webp","coded":"composants-navigation-onglets--texte"},{"name":"ButtonTab","id":"3594:233176","size":"1376x2608","description":"Onglet de l’éditeur (EditionNav, Langues).","props":[{"kind":"variant","name":"style","options":["fill","outline","ghost","subtle"]},{"kind":"variant","name":"size","options":["lg","md","sm"]},{"kind":"variant","name":"state","options":["default","hover","selected","disabled"]},{"kind":"variant","name":"font","options":["medium","semibold"]},{"kind":"variant","name":"current","options":["false","true"]},{"kind":"variant","name":"color","options":["brand","inverse"]}],"image":"catalog/3594-233176.webp","coded":"composants-navigation-onglets--bouton"},{"name":"GroupTab","id":"20:13981","size":"1844x400","description":"Contrôle segmenté : de 2 à 4 segments, un seul actif (selectedTab).","props":[{"kind":"bool","name":"hasText"},{"kind":"bool","name":"hasIcon"},{"kind":"variant","name":"size","options":["sm","lg"]},{"kind":"variant","name":"tabNumber","options":["2","3","4"]},{"kind":"variant","name":"selectedTab","options":["1","2","3","4"]}],"image":"catalog/20-13981.webp","coded":"composants-navigation-onglets--groupe"}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/Tabs',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
