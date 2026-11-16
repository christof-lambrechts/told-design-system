// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Organismes","name":"EditionSidebar","validated":false,"entries":[{"name":"EditionSidebar","id":"8:14494","size":"4820x1022","description":"Colonne de gauche de l'éditeur.","props":[{"kind":"bool","name":"hasScrollbar"},{"kind":"bool","name":"hasInsertBar"},{"kind":"variant","name":"menu","options":["customisation","question","questionreport","configurationinapp","configurationsurvey","connexion","…+5"]},{"kind":"variant","name":"feature","options":["announcement","longformsurvey","inapp"]},{"kind":"variant","name":"state","options":["default","empty","hover","empty-hover"]}],"image":"catalog/8-14494.webp","coded":null},{"name":"QuestionNavItem","id":"782:34719","size":"296x320","description":"Ligne de question de l'éditeur.","props":[{"kind":"bool","name":"hasTranslation"},{"kind":"bool","name":"hasRequired"},{"kind":"bool","name":"hasCondition"},{"kind":"bool","name":"hasMenu"},{"kind":"text","name":"label"},{"kind":"bool","name":"hasHandle"},{"kind":"variant","name":"state","options":["default","hover","selected","focus","disabled"]},{"kind":"variant","name":"questionType","options":["open"]}],"image":"catalog/782-34719.webp","coded":null},{"name":"StepTransition","id":"7941:4375","size":"248x24","description":"Transition entre deux étapes.","props":[{"kind":"text","name":"transition"}],"image":"catalog/7941-4375.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Organismes/EditionSidebar',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'En cours', render: () => <CatalogPage page={page} /> };
