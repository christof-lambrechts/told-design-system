// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"Toast","validated":true,"entries":[{"name":"Toast","id":"20:9454","size":"1257x849","description":"Notification flottante temporaire.","props":[{"kind":"bool","name":"hasIcon"},{"kind":"bool","name":"hasTitle"},{"kind":"text","name":"descriptionText"},{"kind":"text","name":"titleText"},{"kind":"bool","name":"hasDescription"},{"kind":"bool","name":"hasCloseButton"},{"kind":"bool","name":"hasButtonLink"},{"kind":"bool","name":"hasButton"},{"kind":"variant","name":"size","options":["lg","sm"]},{"kind":"variant","name":"type","options":["error","success","warning","brand","neutral","neutral-light","neutral-dark"]}],"image":"catalog/20-9454.webp","coded":null},{"name":"PremiumToast","id":"1985:148938","size":"1110x364","description":"Notification d'offre ou de limite atteinte.","props":[{"kind":"text","name":"gradientText"},{"kind":"bool","name":"hasGradientText"},{"kind":"text","name":"text"},{"kind":"bool","name":"hasButton"},{"kind":"bool","name":"hasText"},{"kind":"variant","name":"type","options":["premium","blocked"]},{"kind":"variant","name":"size","options":["sm","lg"]}],"image":"catalog/1985-148938.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/Toast',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
