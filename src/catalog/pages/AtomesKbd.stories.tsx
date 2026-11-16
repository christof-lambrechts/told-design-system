// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"Kbd","validated":true,"entries":[{"name":"Kbd","id":"7952:80274","size":"312x120","description":"Touche clavier.","props":[{"kind":"text","name":"keys"},{"kind":"variant","name":"size","options":["xs","sm","md"]},{"kind":"variant","name":"tone","options":["neutral","brand"]},{"kind":"variant","name":"shape","options":["auto","square"]}],"image":"catalog/7952-80274.webp","coded":"composants-statut-et-aide-kbd--docs"},{"name":"KbdCombo","id":"7955:25615","size":"222x72","description":"Raccourci à plusieurs touches, une touche Kbd par caractère (⌘ + K, ⌘ + ⇧ + P).","props":[{"kind":"bool","name":"hasKey3"},{"kind":"variant","name":"size","options":["xs","sm","md"]}],"image":"catalog/7955-25615.webp","coded":"composants-statut-et-aide-kbd--docs"}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/Kbd',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
