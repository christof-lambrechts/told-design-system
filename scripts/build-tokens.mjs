// Transforme l'export Figma (tokens/figma/*.txt) en variables CSS (src/tokens/colors.css).
// Lancer : npm run tokens
import { readFileSync, writeFileSync } from 'node:fs';

const css = (name) =>
  '--' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const lines = (file) =>
  readFileSync(new URL(`../tokens/figma/${file}`, import.meta.url), 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'));

// Primitives : "nom=valeur" ou "nom=@autre/nom"
const primitives = lines('primitives.txt').map((l) => {
  const [name, value] = l.split('=');
  const v = value.startsWith('@') ? `var(${css(value.slice(1))})` : value;
  return `  ${css(name)}: ${v};`;
});

// Sémantique : déjà au format "--nom:valeur"
const sem = (file) =>
  lines(file).map((l) => {
    const i = l.indexOf(':');
    return `  ${l.slice(0, i)}: ${l.slice(i + 1)};`;
  });

const out = `/* Généré par scripts/build-tokens.mjs depuis l'export Figma. Ne pas modifier à la main. */

/* 00-color/primitive */
:root {
${primitives.join('\n')}
}

/* 01-color/semantic : Light mode */
:root,
[data-theme='light'] {
  color-scheme: light;
${sem('semantic-light.txt').join('\n')}
}

/* 01-color/semantic : Dark mode (seules les valeurs qui changent) */
[data-theme='dark'] {
  color-scheme: dark;
${sem('semantic-dark.txt').join('\n')}
}
`;

writeFileSync(new URL('../src/tokens/colors.css', import.meta.url), out);
console.log(`colors.css : ${primitives.length} primitives, ${sem('semantic-light.txt').length} sémantiques`);
