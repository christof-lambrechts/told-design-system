// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Organismes","name":"Survey","validated":true,"entries":[{"name":"🏞️ Image-survey-link","id":"1588:169298","size":"629x1700","description":"Fond d'un questionnaire par lien.","props":[{"kind":"bool","name":"hasLogo"},{"kind":"variant","name":"type","options":["image","color"]},{"kind":"variant","name":"device","options":["desktop","mobile"]}],"image":"catalog/1588-169298.webp","coded":null},{"name":"📝 survey_content","id":"4091:189506","size":"5578x1429","description":"Contenu d'un questionnaire.","props":[{"kind":"variant","name":"type","options":["text-field","message-field","calendar","forms","scale-meteo","scale-star-lt5","…+5"]},{"kind":"variant","name":"color","options":["dark","light"]},{"kind":"variant","name":"device","options":["lg","sm"]}],"image":"catalog/4091-189506.webp","coded":null},{"name":"Link-survey","id":"1588:169302","size":"14862x3465","description":"Questionnaire par lien.","props":[{"kind":"bool","name":"hasGdprConsent"},{"kind":"bool","name":"hasConfetti"},{"kind":"bool","name":"hasLogo"},{"kind":"variant","name":"device","options":["desktop","mobile"]},{"kind":"variant","name":"shape","options":["capsule","full-page"]},{"kind":"variant","name":"scroll","options":["false","true"]},{"kind":"variant","name":"style","options":["white","light","dark","glass-dark"]}],"image":"catalog/1588-169302.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Organismes/Survey',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
