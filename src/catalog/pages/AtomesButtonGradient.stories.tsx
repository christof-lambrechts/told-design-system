// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"ButtonGradient","validated":true,"entries":[{"name":"ButtonGradient","id":"4576:14773","size":"637x1208","description":"Bouton dégradé réservé aux offres (UpgradeCard, page Offres).","props":[{"kind":"variant","name":"style","options":["full","outline","flat","light"]},{"kind":"variant","name":"size","options":["lg","md","sm","xs"]},{"kind":"variant","name":"state","options":["default","hover","disabled"]}],"image":"catalog/4576-14773.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/ButtonGradient',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
