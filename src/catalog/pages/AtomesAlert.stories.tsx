// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"Alert","validated":false,"entries":[{"name":"Alert","id":"6259:87310","size":"461x1252","description":"Message en ligne : succès, erreur, avertissement, information.","props":[{"kind":"bool","name":"hasIcon"},{"kind":"bool","name":"hasTitle"},{"kind":"text","name":"descriptionText"},{"kind":"text","name":"titleText"},{"kind":"bool","name":"hasDescription"},{"kind":"bool","name":"hasCloseButton"},{"kind":"bool","name":"hasButtonLink"},{"kind":"bool","name":"hasMiniButton"},{"kind":"bool","name":"hasActionButtons"},{"kind":"variant","name":"size","options":["lg","sm"]},{"kind":"variant","name":"type","options":["error","success","warning","brand","neutral","neutral-light","neutral-dark"]}],"image":"catalog/6259-87310.webp","coded":"composants-statut-et-aide-alert--types"},{"name":"UpgradePromptBanner","id":"6259:87626","size":"1236x72","description":"Bandeau d'invitation à changer d'offre.","props":[],"image":"catalog/6259-87626.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/Alert',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'En cours', render: () => <CatalogPage page={page} /> };
