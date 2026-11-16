// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"ButtonMisc","validated":true,"entries":[{"name":"ButtonDropdown","id":"5937:42255","size":"772x1000","description":"Bouton avec chevron qui ouvre un menu.","props":[{"kind":"variant","name":"style","options":["fill","outline","flat","light"]},{"kind":"variant","name":"size","options":["lg","md","sm","xs"]},{"kind":"variant","name":"state","options":["default","hover","selected","disabled"]}],"image":"catalog/5937-42255.webp","coded":"composants-actions-autres-boutons--menu"},{"name":"ButtonLink","id":"125:22418","size":"430x692","description":"Bouton texte présenté comme un lien.","props":[{"kind":"bool","name":"hasIconLeft"},{"kind":"bool","name":"hasIconRight"},{"kind":"text","name":"label"},{"kind":"swap","name":"iconLeft"},{"kind":"swap","name":"iconRight"},{"kind":"variant","name":"color","options":["brand","purple"]},{"kind":"variant","name":"state","options":["default","hover","disabled"]},{"kind":"variant","name":"padding","options":["true","false"]},{"kind":"variant","name":"size","options":["lg","md","sm"]}],"image":"catalog/125-22418.webp","coded":"composants-actions-autres-boutons--lien"},{"name":"ButtonScaleQuestion","id":"635:77498","size":"1283x96","description":"Bouton de note d'une question à échelle.","props":[{"kind":"variant","name":"type","options":["emoji","meteo","star","number"]},{"kind":"variant","name":"actif","options":["false","true"]},{"kind":"variant","name":"device","options":["desktop","mobile"]}],"image":"catalog/635-77498.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/ButtonMisc',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
