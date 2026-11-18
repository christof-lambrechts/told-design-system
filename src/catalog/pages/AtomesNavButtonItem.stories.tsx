// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"NavButtonItem","validated":true,"entries":[{"name":"NavButtonItem","id":"1023:80470","size":"1176x552","description":"Élément de navigation du menu latéral.","props":[{"kind":"bool","name":"hasIconLeft"},{"kind":"bool","name":"hasIconRight"},{"kind":"bool","name":"hasLabel"},{"kind":"bool","name":"hasTag"},{"kind":"text","name":"label"},{"kind":"swap","name":"iconBoxed"},{"kind":"swap","name":"icon"},{"kind":"swap","name":"iconRight"},{"kind":"bool","name":"hasShortcut"},{"kind":"variant","name":"state","options":["default","hover","selected","disabled"]},{"kind":"variant","name":"level","options":["primary","secondary"]},{"kind":"variant","name":"style","options":["default","dropdown"]},{"kind":"variant","name":"iconType","options":["default","boxed"]}],"image":"catalog/1023-80470.webp","coded":"composants-navigation-navbuttonitem--menu"},{"name":"ButtonEditionMenu","id":"1018:49167","size":"73x128","description":"Bouton du menu d'édition.","props":[{"kind":"variant","name":"state","options":["default","hover","actif"]}],"image":"catalog/1018-49167.webp","coded":null},{"name":"Avatar","id":"541:9850","size":"119x109","description":"Avatar de navigation.","props":[{"kind":"variant","name":"type","options":["multi","single"]}],"image":"catalog/541-9850.webp","coded":"composants-visuels-avatar--docs"},{"name":"Profile","id":"635:66174","size":"284x168","description":"Accès au profil.","props":[{"kind":"variant","name":"state","options":["default","hover","press-select"]}],"image":"catalog/635-66174.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/NavButtonItem',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
