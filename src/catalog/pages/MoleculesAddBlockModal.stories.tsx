// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Molécules","name":"AddBlockModal","validated":true,"entries":[{"name":"QuestionCard","id":"1280:91800","size":"4568x318","description":"Carte de type de question.","props":[{"kind":"variant","name":"question","options":["mutiplechoice","ranking","text","smiley","meteo","numbers","nps","google-review","…+4"]}],"image":"catalog/1280-91800.webp","coded":null},{"name":"BlockTypePreview","id":"8133:10329","size":"2440x1561","description":"Illustration d'un type de bloc, colonne de droite d'AddBlockModal.","props":[{"kind":"variant","name":"type","options":["ai-agent","multiple-choice","dropdown","scale","nps","ranking","review","open","…+19"]}],"image":"catalog/8133-10329.webp","coded":null},{"name":"BlockTypeItem","id":"8133:86310","size":"816x84","description":"Ligne de la liste des types d'AddBlockModal.","props":[{"kind":"text","name":"label"},{"kind":"bool","name":"hasPro"},{"kind":"variant","name":"state","options":["default","hover","selected"]}],"image":"catalog/8133-86310.webp","coded":"composants-modales-addblockmodal--ligne"},{"name":"AddBlockModal","id":"8136:20553","size":"3440x7172","description":"Modale d'ajout de bloc du questionnaire.","props":[{"kind":"variant","name":"selected","options":["multiple-choice","ai-agent","dropdown","scale","nps","ranking","review","open","…+19"]}],"image":"catalog/8136-20553.webp","coded":"composants-modales-addblockmodal--modale"}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Molécules/AddBlockModal',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
