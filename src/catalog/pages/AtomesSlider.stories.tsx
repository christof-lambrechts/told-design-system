// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"Slider","validated":false,"entries":[{"name":"ScrollBar","id":"635:63091","size":"316x284","description":"Barre de défilement.","props":[{"kind":"variant","name":"orientation","options":["vertical","horizontal"]}],"image":"catalog/635-63091.webp","coded":null},{"name":"SliderBar","id":"944:117082","size":"464x288","description":"Curseur de valeur.","props":[{"kind":"bool","name":"hasLabel"},{"kind":"bool","name":"hasPercentage"},{"kind":"variant","name":"state","options":["v-1","v-2"]},{"kind":"variant","name":"theme","options":["light"]},{"kind":"variant","name":"empty","options":["false","true"]}],"image":"catalog/944-117082.webp","coded":null},{"name":"SliderCapsule","id":"3696:120151","size":"464x168","description":"Curseur en capsule.","props":[{"kind":"bool","name":"hasLabel"},{"kind":"bool","name":"hasPercentage"},{"kind":"variant","name":"style","options":["double","empty","simple"]}],"image":"catalog/3696-120151.webp","coded":null},{"name":"Slider bar widget voting","id":"787:71352","size":"284x132","description":"Curseur de vote des widgets.","props":[{"kind":"variant","name":"state","options":["default"]},{"kind":"variant","name":"theme","options":["light","dark"]}],"image":"catalog/787-71352.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/Slider',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'En cours', render: () => <CatalogPage page={page} /> };
