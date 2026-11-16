// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Molécules","name":"GettingStarted","validated":true,"entries":[{"name":"GettingStartedStep","id":"7903:1087","size":"328x320","description":"Étape du bloc Pour commencer.","props":[{"kind":"text","name":"title"},{"kind":"text","name":"description"},{"kind":"bool","name":"hasDescription"},{"kind":"text","name":"number"},{"kind":"variant","name":"state","options":["done","current","todo"]}],"image":"catalog/7903-1087.webp","coded":null},{"name":"GettingStarted","id":"7903:1169","size":"955x2608","description":"Bloc « Pour commencer » de l'accueil.","props":[{"kind":"bool","name":"hasStep4"},{"kind":"variant","name":"layout","options":["wide","column"]},{"kind":"variant","name":"current","options":["2","1","3","4"]}],"image":"catalog/7903-1169.webp","coded":null},{"name":"GettingStartedIllustration","id":"8272:91810","size":"1224x208","description":"Illustrations des étapes de « Pour commencer ».","props":[{"kind":"variant","name":"step","options":["install","create","tour","publish","invite"]}],"image":"catalog/8272-91810.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Molécules/GettingStarted',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
