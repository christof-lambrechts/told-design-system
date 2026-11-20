// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Atomes","name":"ProgressBar","validated":true,"entries":[{"name":"ProgressBar","id":"556:57661","size":"421x2110","description":"Barre de progression.","props":[{"kind":"variant","name":"length","options":["0","10","20","30","40","50","60","70","…+3"]},{"kind":"variant","name":"direction","options":["horizontal","vertical"]},{"kind":"variant","name":"size","options":["lg","sm"]}],"image":"catalog/556-57661.webp","coded":"composants-statut-et-aide-progression-et-chargement--docs"},{"name":"ProgressSteps","id":"787:72909","size":"300x74","description":"Progression dans un widget.","props":[{"kind":"variant","name":"style","options":["multi","single"]},{"kind":"variant","name":"size","options":["sm","lg"]}],"image":"catalog/787-72909.webp","coded":"composants-statut-et-aide-progression-et-chargement--etapes"},{"name":"Loader","id":"1156:85211","size":"1026x477","description":"Indicateur de chargement.","props":[{"kind":"bool","name":"hasLabel"},{"kind":"variant","name":"style","options":["line-simple","line-spinner","dot-circle"]},{"kind":"variant","name":"size","options":["3xs","lg","md","sm","xl","xs","xxs"]}],"image":"catalog/1156-85211.webp","coded":"composants-statut-et-aide-progression-et-chargement--chargement"},{"name":"SkeletonLine","id":"6057:97","size":"200x12","description":"Ligne fantôme de chargement.","props":[],"image":"catalog/6057-94.webp","coded":"composants-statut-et-aide-progression-et-chargement--squelette"},{"name":"SkeletonCard","id":"6057:98","size":"240x1","description":"Carte fantôme de chargement.","props":[],"image":"catalog/6057-94.webp","coded":"composants-statut-et-aide-progression-et-chargement--squelette"}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Atomes/ProgressBar',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'Validé', render: () => <CatalogPage page={page} /> };
