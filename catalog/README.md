# Catalogue Figma

`figma-components.txt` est extrait du fichier Figma DS (UzceYU5fzcWKqlgISYpS8V) par un script use_figma.
Une ligne `#Page` ouvre une page Figma. Ensuite, une ligne par composant :
`Nom|id Figma|largeur x hauteur|propriétés|description courte|conteneur:id|x,y dans le conteneur`.
Propriétés : `axe=a,b,c` (variante), `?nom` (booléen), `"nom` (texte), `@nom` (échange d'icône).
Les captures sont dans `public/catalog/<id>.png`. `node scripts/build-catalog.mjs` génère les histoires.
