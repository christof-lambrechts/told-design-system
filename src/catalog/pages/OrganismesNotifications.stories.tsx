// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Organismes","name":"Notifications","validated":true,"entries":[{"name":"NotificationItem","id":"7967:10662","size":"424x320","description":"Une notification du centre de notifications.","props":[{"kind":"text","name":"title"},{"kind":"text","name":"message"},{"kind":"text","name":"time"},{"kind":"bool","name":"hasMessage"},{"kind":"variant","name":"state","options":["unread","read","hover"]}],"image":"catalog/7967-10662.webp","coded":null},{"name":"NotificationCenter","id":"7967:10663","size":"400x549","description":"Centre de notifications.","props":[],"image":"catalog/7967-10663.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Organismes/Notifications',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
