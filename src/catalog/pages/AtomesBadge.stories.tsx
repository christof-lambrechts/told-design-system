// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"Badge","validated":false,"entries":[{"name":"Badge","id":"2794:179295","size":"368x1364","description":"Statut figé d’un objet, et aussi étiquette non cliquable (ancien Tag fusionné ici).","props":[{"kind":"variant","name":"size","options":["xs","sm","md","lg"]},{"kind":"variant","name":"color","options":["blue","tree","green","orange","red","purple","light-gray","white","pink-gradient"]},{"kind":"variant","name":"style","options":["outline","fill","subtle"]}],"image":"catalog/2794-179295.webp","coded":"composants-statut-et-aide-badge-et-tag--docs"},{"name":"FloatBadge","id":"3613:133857","size":"273x42","description":"Mini badge flottant (indicateur).","props":[{"kind":"variant","name":"size","options":["lg","sm","md"]}],"image":"catalog/3613-133857.webp","coded":null},{"name":"_TagBase","id":"4:1557","size":"202x86","description":"Base des étiquettes.","props":[{"kind":"bool","name":"hasClose"},{"kind":"bool","name":"hasIconLeft"},{"kind":"variant","name":"size","options":["m","l"]},{"kind":"variant","name":"rounded","options":["false"]}],"image":"catalog/4-1557.webp","coded":null},{"name":"Tag","id":"569:60860","size":"325x676","description":"Étiquette de catégorie colorée.","props":[{"kind":"variant","name":"shape","options":["default"]},{"kind":"variant","name":"color","options":["apple","green","pink","peach","orange","mustard","yellow","tree","…+8"]},{"kind":"variant","name":"size","options":["sm","lg"]}],"image":"catalog/569-60860.webp","coded":"composants-statut-et-aide-badge-et-tag--tags"},{"name":"NotificationDot — color=default","id":"6057:105","size":"8x8","description":"Pastille de notification, neutre.","props":[],"image":"catalog/6057-102.webp","coded":null},{"name":"NotificationDot — color=danger","id":"6057:107","size":"8x8","description":"Pastille de notification, danger.","props":[],"image":"catalog/6057-102.webp","coded":null},{"name":"NotificationDot — color=success","id":"6057:109","size":"8x8","description":"Pastille de notification, succès.","props":[],"image":"catalog/6057-102.webp","coded":null},{"name":"NotificationDot — color=warning","id":"6057:111","size":"8x8","description":"Pastille de notification, avertissement.","props":[],"image":"catalog/6057-102.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/Badge',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'En cours', render: () => <CatalogPage page={page} /> };
