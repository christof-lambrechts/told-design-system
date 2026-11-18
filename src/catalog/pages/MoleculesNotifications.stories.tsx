// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Molécules","name":"Notifications","validated":true,"entries":[{"name":"notificationItem","id":"2794:198377","size":"1011x1292","description":"Notification.","props":[{"kind":"variant","name":"state","options":["default","hover","pressed"]},{"kind":"variant","name":"notification","options":["false","true"]},{"kind":"variant","name":"style","options":["default","feature"]}],"image":"catalog/2794-198377.webp","coded":null},{"name":"Notification_sidebar","id":"2795:214336","size":"607x1102","description":"Panneau des notifications.","props":[{"kind":"variant","name":"device","options":["desktop"]}],"image":"catalog/2795-214336.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Molécules/Notifications',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
