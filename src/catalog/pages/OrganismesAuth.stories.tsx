// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Organismes","name":"Auth","validated":true,"entries":[{"name":"CodeDigit","id":"8181:83342","size":"290x106","description":"Une case du code à usage unique.","props":[{"kind":"text","name":"digit"},{"kind":"variant","name":"state","options":["default","focus","filled","error"]}],"image":"catalog/8181-83342.webp","coded":null},{"name":"CodeInput","id":"8181:83416","size":"1546x184","description":"Code à usage unique en 6 cases (3 + 3).","props":[{"kind":"bool","name":"hasCountdown"},{"kind":"variant","name":"state","options":["default","focus","filled","error"]}],"image":"catalog/8181-83416.webp","coded":null},{"name":"PasswordStrength","id":"8182:1187","size":"1770x116","description":"Force du mot de passe.","props":[{"kind":"bool","name":"hasRules"},{"kind":"variant","name":"level","options":["weak","medium","good","excellent"]}],"image":"catalog/8182-1187.webp","coded":null},{"name":"DividerLabel","id":"8182:1188","size":"400x18","description":"Séparateur avec un texte centré (« ou »).","props":[],"image":"catalog/8182-1188.webp","coded":null},{"name":"SocialButton","id":"8182:1247","size":"450x146","description":"Connexion par un fournisseur.","props":[{"kind":"variant","name":"provider","options":["google","microsoft"]}],"image":"catalog/8182-1247.webp","coded":null},{"name":"AuthPanel","id":"8182:1367","size":"3050x950","description":"Panneau visuel des écrans de connexion.","props":[{"kind":"text","name":"title"},{"kind":"text","name":"subtitle"},{"kind":"bool","name":"hasSubtitle"},{"kind":"variant","name":"theme","options":["default","website","mobile","email"]}],"image":"catalog/8182-1367.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Organismes/Auth',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
