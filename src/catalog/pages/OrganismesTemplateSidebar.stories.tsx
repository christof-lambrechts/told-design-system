// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Organismes","name":"TemplateSidebar","validated":false,"entries":[{"name":"TemplateSidebar","id":"1633:132419","size":"804x1064","description":"Colonne des modèles.","props":[{"kind":"bool","name":"hasVideoTutorial"},{"kind":"variant","name":"level","options":["fistlevel","secondlevel"]}],"image":"catalog/1633-132419.webp","coded":null},{"name":"TemplateVideoCards","id":"1633:138958","size":"393x156","description":"Cartes de tutoriel vidéo.","props":[],"image":"catalog/1633-138958.webp","coded":null},{"name":"QuestionTemplate","id":"1635:138984","size":"412x540","description":"Modèle de question.","props":[{"kind":"bool","name":"hasCondition"},{"kind":"variant","name":"type","options":["nps","multi-choice","message","scale","contact-info","calendar","open-text"]}],"image":"catalog/1635-138984.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Organismes/TemplateSidebar',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'En cours', render: () => <CatalogPage page={page} /> };
