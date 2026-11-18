// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Molécules","name":"Languages","validated":true,"entries":[{"name":"LanguageItem","id":"8051:24798","size":"920x256","description":"Une langue du Told.","props":[{"kind":"text","name":"label"},{"kind":"bool","name":"hasToggle"},{"kind":"variant","name":"state","options":["default","hover","selected"]},{"kind":"variant","name":"isDefault","options":["false","true"]},{"kind":"variant","name":"boxed","options":["true","false"]}],"image":"catalog/8051-24798.webp","coded":"composants-langues-et-reglages-traduction--liste-des-langues"},{"name":"LanguagePanel","id":"8174:4121","size":"356x332","description":"Colonne de droite de l’onglet Langues.","props":[],"image":"catalog/8174-4121.webp","coded":null},{"name":"TranslationTable","id":"8245:4085","size":"1158x1320","description":"Traduction d’un Told, une ligne par texte.","props":[{"kind":"bool","name":"hasEnglish"},{"kind":"bool","name":"hasSpanish"},{"kind":"bool","name":"hasGerman"},{"kind":"bool","name":"hasItalian"},{"kind":"bool","name":"hasScrollbar"},{"kind":"variant","name":"scrolled","options":["false","true"]}],"image":"catalog/8245-4085.webp","coded":"composants-langues-et-reglages-traduction--tableau"},{"name":"Langues","id":"1145:49152","size":"878x132","description":"Sélecteur de langues.","props":[{"kind":"variant","name":"languages","options":["single","multiple"]}],"image":"catalog/1145-49152.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Molécules/Languages',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
