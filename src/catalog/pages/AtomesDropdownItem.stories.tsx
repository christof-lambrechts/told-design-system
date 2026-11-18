// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"DropdownItem","validated":false,"entries":[{"name":"DropdownItem","id":"4544:102435","size":"1964x1008","description":"Ligne de menu ou d'option.","props":[{"kind":"variant","name":"state","options":["default","hover","selected","disabled"]},{"kind":"variant","name":"selected","options":["false","true"]},{"kind":"variant","name":"type","options":["accordion","checkbox","default","radio","switch"]},{"kind":"variant","name":"flat","options":["false","true"]},{"kind":"variant","name":"tone","options":["default","danger"]}],"image":"catalog/4544-102435.webp","coded":"composants-saisie-et-choix-select--liste"},{"name":"DropdownSection","id":"4554:111153","size":"317x150","description":"Titre ou séparateur de section dans un menu.","props":[{"kind":"bool","name":"hasTag"},{"kind":"variant","name":"divider","options":["true","false"]},{"kind":"variant","name":"type","options":["divider","title"]}],"image":"catalog/4554-111153.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/DropdownItem',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'En cours', render: () => <CatalogPage page={page} /> };
