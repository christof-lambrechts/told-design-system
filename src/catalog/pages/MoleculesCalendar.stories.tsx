// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Molécules","name":"Calendar","validated":true,"entries":[{"name":"Calendar","id":"20:16545","size":"1776x434","description":"Sélecteur de dates.","props":[{"kind":"text","name":"summary"},{"kind":"bool","name":"hasModes"},{"kind":"variant","name":"side","options":["periode","all-time","last","single"]}],"image":"catalog/20-16545.webp","coded":"composants-saisie-et-choix-calendar--defaut"}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Molécules/Calendar',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
