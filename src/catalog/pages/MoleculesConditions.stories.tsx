// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Molécules","name":"Conditions","validated":false,"entries":[{"name":"Condition","id":"1098:63109","size":"659x2252","description":"Logique conditionnelle d'une question.","props":[{"kind":"variant","name":"type","options":["default","avec-condition"]}],"image":"catalog/1098-63109.webp","coded":null},{"name":"Condition_item_SN","id":"1098:69308","size":"611x848","description":"Action d'une condition.","props":[{"kind":"variant","name":"condition","options":["aller-a-la-prochaine-question","aller-a-un-bloc-specifique","lien-externe"]}],"image":"catalog/1098-69308.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Molécules/Conditions',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'En cours', render: () => <CatalogPage page={page} /> };
