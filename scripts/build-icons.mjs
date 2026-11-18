// Génère src/components/Icon/icons.ts depuis catalog/icons-*.txt (tracés exportés de Figma, page Icons).
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
const out = {};
for (const f of readdirSync('catalog').filter((f) => /^icons-\d+\.txt$/.test(f)).sort()) {
  for (const line of readFileSync(`catalog/${f}`, 'utf8').split('\n')) {
    if (!line.trim()) continue;
    const [name, body] = line.split('|');
    out[name] = body.split(/;(?=[EN]S?[\d.]*:)/).map((p) => {
      const [flag, d] = [p.slice(0, p.indexOf(':')), p.slice(p.indexOf(':') + 1)];
      return flag.startsWith('E') ? [d, 1] : [d];
    });
  }
}
const names = Object.keys(out);
writeFileSync('src/components/Icon/icons.ts', `// Fichier généré par scripts/build-icons.mjs (${names.length} icônes HugeIcons du fichier Figma). Ne pas modifier.
/** Chaque icône : liste de tracés [d, evenodd?] dans un carré 24 × 24. */
export const icons = ${JSON.stringify(out)} as const satisfies Record<string, readonly (readonly [string] | readonly [string, 1])[]>;
`);
console.log(names.length + ' icônes');

// Version contour (stroke-rounded) : paquet libre @hugeicons/core-free-icons (MIT), même nom d'icône en PascalCase.
import { createRequire } from 'node:module';
const req = createRequire(import.meta.url);
const free = req('@hugeicons/core-free-icons');
const pascal = (n) => n.split(/[-_ ]/).map((p) => p[0].toUpperCase() + p.slice(1)).join('') + 'Icon';
// Le contour libre ne ressemble pas toujours au plein du fichier : on prend alors un dessin plus proche (même choix que dans Figma).
const alias = { 'cursor-magic-selection-01': 'CursorMagicSelection03Icon', 'logout-02': 'Logout01Icon', 'ai-chat-02': 'AiChat01Icon', invoice: 'Invoice02Icon' };
const stroke = {};
const missing = [];
for (const n of names) {
  const data = free[alias[n] ?? pascal(n.replace(/-stroke$/, ''))];
  if (!data) { missing.push(n); continue; }
  stroke[n] = data.map(([tag, a]) => {
    const { key, stroke: s, strokeLinecap, strokeLinejoin, strokeWidth, ...rest } = a;
    if (rest.fill === 'currentColor') rest.fill = 'currentColor';
    return [tag, rest];
  });
}
// Contours dessinés dans Figma (icônes HugeIcons Pro ajoutées depuis la banque) : prioritaires.
for (const line of readFileSync('catalog/icons-stroke-figma.txt', 'utf8').split('\n')) {
  if (!line.trim() || line.startsWith('#')) continue;
  const [name, body] = line.split('|');
  stroke[name] = body.split(/;(?=[EN]:)/).map((p) => {
    const [flag, d] = [p.slice(0, 1), p.slice(2)];
    return ['path', flag === 'E' ? { d, fill: 'currentColor', stroke: 'none', fillRule: 'evenodd', clipRule: 'evenodd' } : { d, fill: 'currentColor', stroke: 'none' }];
  });
  const i = missing.indexOf(name); if (i >= 0) missing.splice(i, 1);
}
writeFileSync('src/components/Icon/iconsStroke.ts', `// Fichier généré par scripts/build-icons.mjs : version contour (HugeIcons stroke-rounded, MIT). Ne pas modifier.
/** Icônes sans version contour (dessins maison) : ${missing.join(', ')}. Elles restent pleines. */
export const iconsStroke: Record<string, [string, Record<string, string>][]> = ${JSON.stringify(stroke)};
`);
console.log(Object.keys(stroke).length + ' icônes contour, sans contour : ' + missing.join(', '));
