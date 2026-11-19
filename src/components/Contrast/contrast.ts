/** Outils de contraste WCAG 2.1 : ratio entre deux couleurs et correction d'une couleur en gardant sa teinte. */

export type ContrastLevel = 'AA' | 'AAA';
/** Seuils pour un texte courant. */
export const contrastThreshold: Record<ContrastLevel, number> = { AA: 4.5, AAA: 7 };

const hexToRgb = (hex: string): [number, number, number] => {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h.slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const rgbToHex = (r: number, g: number, b: number) =>
  '#' + [r, g, b].map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')).join('').toUpperCase();

const luminance = (hex: string) => {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** Ratio de contraste, de 1 à 21. */
export function contrastRatio(fg: string, bg: string): number {
  const a = luminance(fg), b = luminance(bg);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

/** Ratio affiché à la française : « 4,52 ». */
export const formatRatio = (r: number) => r.toFixed(2).replace('.', ',');

export const passes = (fg: string, bg: string, level: ContrastLevel) => contrastRatio(fg, bg) >= contrastThreshold[level];

function rgbToHsl(hex: string): [number, number, number] {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h / 6, s, l];
}
function hslToHex(h: number, s: number, l: number) {
  if (s === 0) return rgbToHex(l * 255, l * 255, l * 255);
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
  const f = (t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return rgbToHex(f(h + 1 / 3) * 255, f(h) * 255, f(h - 1 / 3) * 255);
}

/** Couleur la plus proche qui atteint le niveau : même teinte et saturation, clarté ajustée (assombrie sur fond clair, éclaircie sur fond sombre). Renvoie la couleur d'origine si elle passe déjà. */
export function fixContrast(fg: string, bg: string, level: ContrastLevel): string {
  if (passes(fg, bg, level)) return fg.toUpperCase();
  const [h, s, l] = rgbToHsl(fg);
  const darken = luminance(bg) > 0.18;
  for (let i = 1; i <= 100; i++) {
    const nl = darken ? l - i / 200 : l + i / 200;
    if (nl < 0 || nl > 1) break;
    const c = hslToHex(h, s, nl);
    if (passes(c, bg, level)) return c;
  }
  return darken ? '#000000' : '#FFFFFF';
}
