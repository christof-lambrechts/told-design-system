// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = {"level":"Organismes","name":"ProductTour","validated":false,"entries":[{"name":"label tour","id":"5361:41221","size":"356x208","description":"Étiquette de visite guidée.","props":[{"kind":"variant","name":"style","options":["text","badge"]},{"kind":"variant","name":"size","options":["sm","lg"]}],"image":"catalog/5361-41221.webp","coded":null},{"name":"tour-resume-list","id":"3738:45455","size":"219x146","description":"Sommaire de visite guidée.","props":[{"kind":"variant","name":"active","options":["true","false"]},{"kind":"variant","name":"textColor","options":["dark","white"]}],"image":"catalog/3738-45455.webp","coded":null},{"name":"welcome-modale-tour","id":"3738:158203","size":"5869x576","description":"Modale d'accueil de visite guidée.","props":[{"kind":"bool","name":"hasLabel"},{"kind":"bool","name":"hasTitle"},{"kind":"bool","name":"hasMedia"},{"kind":"variant","name":"text","options":["white","black"]},{"kind":"variant","name":"miniature","options":["false","true"]},{"kind":"variant","name":"summaryList","options":["true","false"]},{"kind":"variant","name":"variant","options":["minimal","extend","resume"]}],"image":"catalog/3738-158203.webp","coded":null},{"name":"TourItemBase","id":"3712:40132","size":"5315x3343","description":"Étape de visite guidée.","props":[{"kind":"bool","name":"hasTitle"},{"kind":"bool","name":"hasImage"},{"kind":"bool","name":"hasWithFooter"},{"kind":"bool","name":"hasGlassShape"},{"kind":"bool","name":"hasLight"},{"kind":"variant","name":"format","options":["widget","modal","welcome"]},{"kind":"variant","name":"image","options":["right","left","bottom","top"]},{"kind":"variant","name":"header","options":["none","progress-bar","avatar"]},{"kind":"variant","name":"close","options":["true","false"]}],"image":"catalog/3712-40132.webp","coded":null},{"name":"Widget-tour","id":"3715:41441","size":"2485x1623","description":"Bulle de visite guidée avec flèche.","props":[{"kind":"variant","name":"arrow","options":["top-left","top","bottom-left","bottom","left","right","bottom-right","top-right"]},{"kind":"variant","name":"text","options":["white","black"]},{"kind":"variant","name":"format","options":["widget","modal"]}],"image":"catalog/3715-41441.webp","coded":null}]} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/Organismes/ProductTour',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: 'En cours', render: () => <CatalogPage page={page} /> };
