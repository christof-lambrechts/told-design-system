// Refuse two paths that differ only by case: on macOS and Windows (case-insensitive
// file systems) they collide, and an import resolves to the wrong file (v0.52.1).
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const clashes = [];
function walk(dir) {
  const seen = new Map();
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name.startsWith('.')) continue;
    // A module is reached without its extension: compare the names without it too.
    const key = name.toLowerCase().replace(/\.(tsx?|jsx?|mjs|css)$/, '');
    const full = join(dir, name);
    const other = seen.get(key);
    // Same name once lowercased and without extension: Contrast.tsx and contrast.ts, or Foo.ts and Foo.tsx.
    if (other) clashes.push(`${join(dir, other)}  ↔  ${full}`);
    seen.set(key, name);
    if (statSync(full).isDirectory()) walk(full);
  }
}
for (const root of process.argv.slice(2).length ? process.argv.slice(2) : ['src', 'scripts']) walk(root);
if (clashes.length) {
  console.error('Noms qui ne diffèrent que par la casse (cassent sur macOS) :\n' + clashes.join('\n'));
  process.exit(1);
}
console.log('Casse des fichiers : OK');
