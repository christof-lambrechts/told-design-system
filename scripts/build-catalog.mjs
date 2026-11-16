// Génère le catalogue Figma du Storybook à partir de catalog/figma-*.txt.
// Lancer : npm run catalog. Ne pas modifier les fichiers générés à la main.
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';

const FILES = ['figma-atomes.txt', 'figma-molecules.txt', 'figma-organismes.txt'];
const OUT = 'src/catalog/pages';

// Composants déjà codés : nom Figma -> id de l'histoire Storybook.
const CODED = JSON.parse(readFileSync('catalog/coded.json', 'utf8'));

const parseProps = (s) =>
  s.split(';').filter(Boolean).map((p) => {
    if (p.startsWith('?')) return { kind: 'bool', name: p.slice(1) };
    if (p.startsWith('"')) return { kind: 'text', name: p.slice(1) };
    if (p.startsWith('@')) return { kind: 'swap', name: p.slice(1) };
    const [name, opts = ''] = p.split('=');
    return { kind: 'variant', name, options: opts.split(',') };
  });

const pages = [];
let page;
for (const f of FILES) {
  for (const raw of readFileSync(`catalog/${f}`, 'utf8').split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('#')) {
      const title = line.slice(1).trim();
      const validated = title.includes('✅');
      const [level, name] = title.replace(/[✅❌]/g, '').split('/').map((s) => s.trim());
      page = { level, name, validated, entries: [] };
      pages.push(page);
      continue;
    }
    const [name, id, size, props, description] = line.split('|');
    page.entries.push({
      name, id, size, description, props: parseProps(props || ''),
      image: existsSync(`public/catalog/${id.replace(':', '-')}.webp`) ? `catalog/${id.replace(':', '-')}.webp` : null,
      coded: CODED[name] || null,
    });
  }
}

// Pages entières montrées en une image (planches Figma).
for (const p of pages) {
  if (p.name === 'Icons') p.board = { id: '1:13141', image: 'catalog/1-13141.webp' };
  if (p.name === 'Illustrations') p.board = { id: '5871:63488', image: 'catalog/5871-63488.webp' };
  if (p.name === 'Badge') p.entries.forEach((e) => { if (e.name.startsWith('NotificationDot')) e.image = 'catalog/6057-102.webp'; });
  if (p.name === 'ProgressBar') p.entries.forEach((e) => { if (e.name.startsWith('Skeleton')) e.image = 'catalog/6057-94.webp'; });
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9]+/g, '');
for (const p of pages) {
  const level = p.level.replace('_', '');
  const file = `${OUT}/${slug(p.level)}${slug(p.name)}.stories.tsx`;
  const data = JSON.stringify(p, null, 0);
  writeFileSync(file, `// Fichier généré par scripts/build-catalog.mjs, ne pas modifier.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogPage, type CatalogPageData } from '../CatalogPage';

const page = ${data} as CatalogPageData;

const meta = {
  title: 'Catalogue Figma/${level}/${p.name.replace(/'/g, "\\'")}',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

export const Page: StoryObj = { name: '${p.validated ? 'Validé' : 'En cours'}', render: () => <CatalogPage page={page} /> };
`);
}
const total = pages.reduce((n, p) => n + p.entries.length, 0);
console.log(`${pages.length} pages, ${total} composants`);
