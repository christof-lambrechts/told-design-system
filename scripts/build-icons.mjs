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
