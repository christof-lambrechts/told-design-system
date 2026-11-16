// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Molécules","name":"BlockHeaders","validated":false,"entries":[{"name":"EditionCardHeader","id":"554:39303","size":"660x68","description":"En-tête des cartes d’édition.","props":[{"kind":"bool","name":"hasLeftIcons"},{"kind":"bool","name":"hasMandatoryIcon"},{"kind":"bool","name":"hasRequiredToggle"},{"kind":"bool","name":"hasPremiumBadge"},{"kind":"bool","name":"hasAibutton"},{"kind":"text","name":"title"},{"kind":"bool","name":"hasFormat"},{"kind":"bool","name":"hasActiveToggle"},{"kind":"variant","name":"state","options":["default"]}],"image":"catalog/554-39303.webp","coded":null},{"name":"headerCards","id":"1045:140468","size":"1440x188","description":"En-tête de carte.","props":[{"kind":"bool","name":"hasDate"},{"kind":"bool","name":"hasTextOption"},{"kind":"variant","name":"divider","options":["false","true"]}],"image":"catalog/1045-140468.webp","coded":null},{"name":"OptionSectionTitle","id":"1265:46404","size":"1440x364","description":"Titre de section d'options.","props":[{"kind":"text","name":"description"},{"kind":"text","name":"title"},{"kind":"bool","name":"hasToggle"},{"kind":"bool","name":"hasNumber"},{"kind":"bool","name":"hasIcon"},{"kind":"bool","name":"hasButtonLink"},{"kind":"bool","name":"hasDescription"},{"kind":"variant","name":"divider","options":["false","true"]},{"kind":"variant","name":"padding","options":["true","false"]}],"image":"catalog/1265-46404.webp","coded":null},{"name":"PremiumItem","id":"554:39885","size":"1440x91","description":"Ligne de fonction payante.","props":[{"kind":"bool","name":"hasPremiumTag"},{"kind":"variant","name":"device","options":["desktop","mobile"]}],"image":"catalog/554-39885.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Molécules/BlockHeaders',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'En cours', render: () => <CatalogPage page={page} /> };
