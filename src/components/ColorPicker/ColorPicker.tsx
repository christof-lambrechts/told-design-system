import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent as RPointerEvent } from 'react';
import { GroupTab } from '../Tabs/Tabs';
import { Switch } from '../Choice/Choice';
import { Icon } from '../Icon/Icon';
import { contrastRatio, formatRatio } from '../Contrast/contrast';
import styles from './ColorPicker.module.css';

export type ColorFill =
  | { type: 'solid'; color: string }
  | { type: 'gradient'; from: string; to: string; /** Degrés, de -180 à 180. */ angle: number };
export type TextTone = 'light' | 'dark';
export type GlassTone = 'light' | 'dark';

/** Couleurs du texte « Clair » et « Sombre » (celles du player Told). */
export const textToneColor: Record<TextTone, string> = { light: '#FFFFFF', dark: '#161C36' };

export interface ColorPickerProps {
  value: ColorFill;
  onChange: (v: ColorFill) => void;
  /** Propose « Dégradé » à côté de « Unie ». */
  allowGradient?: boolean;
  /** Texte posé sur ce fond : onglets Fond | Texte, le texte se choisit Clair ou Sombre. */
  textTone?: TextTone;
  onTextToneChange?: (t: TextTone) => void;
  /** « Vos couleurs » : couleurs du kit de marque ou déjà utilisées. */
  swatches?: string[];
  onAddSwatch?: (hex: string) => void;
  /** Contour glass (avatar, cartes) : interrupteur puis Clair | Sombre. */
  glass?: { enabled: boolean; tone: GlassTone };
  onGlassChange?: (g: { enabled: boolean; tone: GlassTone }) => void;
  /** Animation du dégradé (dégradé seulement). */
  animated?: boolean;
  onAnimatedChange?: (on: boolean) => void;
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const HEX = /^#[0-9a-f]{6}$/i;
function hexToHsv(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  const r = ((n >> 16) & 255) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const max = Math.max(r, g, b), d = max - Math.min(r, g, b);
  let h = 0;
  if (d) h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [((h * 60) + 360) % 360, max ? d / max : 0, max];
}
function hsvToHex(h: number, s: number, v: number) {
  const f = (n: number) => { const k = (n + h / 60) % 6; return v - v * s * Math.max(0, Math.min(k, 4 - k, 1)); };
  return '#' + [f(5), f(3), f(1)].map((x) => Math.round(x * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
}

/** Glisser au pointeur dans une zone : renvoie la position (0 à 1) à chaque mouvement. */
function useDrag(onMove: (x: number, y: number) => void) {
  return (e: RPointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const at = (ev: { clientX: number; clientY: number }) => { const r = el.getBoundingClientRect(); onMove(clamp((ev.clientX - r.left) / r.width), clamp((ev.clientY - r.top) / r.height)); };
    el.setPointerCapture?.(e.pointerId);
    at(e);
    const move = (ev: PointerEvent) => at(ev);
    const up = () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
  };
}

/** Choix d'une couleur : zone saturation et luminosité, teinte, code hexa, pipette. */
function Picker({ hex, onChange, label }: { hex: string; onChange: (hex: string) => void; label: string }) {
  const [hsv, setHsv] = useState(() => hexToHsv(HEX.test(hex) ? hex : '#000000'));
  useEffect(() => { if (HEX.test(hex) && hsvToHex(...hsv) !== hex.toUpperCase()) setHsv(hexToHsv(hex)); }, [hex]); // eslint-disable-line react-hooks/exhaustive-deps
  const set = (h: number, s: number, v: number) => { setHsv([h, s, v]); onChange(hsvToHex(h, s, v)); };
  const [h, s, v] = hsv;
  const area = useDrag((x, y) => set(h, x, 1 - y));
  const hue = useDrag((x) => set(x * 360, s, v));
  const keys = (dx: number, dy: number) => (e: KeyboardEvent) => {
    const m: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] };
    const k = m[e.key]; if (!k) return; e.preventDefault();
    const step = e.shiftKey ? 10 : 1;
    if (dy) set(h, clamp(s + k[0] * step / 100), clamp(v + k[1] * step / 100));
    else set((h + k[0] * step * dx + 360) % 360, s, v);
  };
  return (
    <>
      <div className={styles.area} style={{ backgroundColor: `hsl(${h} 100% 50%)` }} onPointerDown={area}
        role="slider" tabIndex={0} aria-label={`${label} : saturation et luminosité`} aria-valuetext={hsvToHex(h, s, v)} onKeyDown={keys(0, 1)}>
        <span className={styles.areaThumb} style={{ left: `${s * 100}%`, top: `${(1 - v) * 100}%`, background: hsvToHex(h, s, v) }} />
      </div>
      <div className={styles.hue} onPointerDown={hue} role="slider" tabIndex={0} aria-label={`${label} : teinte`}
        aria-valuemin={0} aria-valuemax={360} aria-valuenow={Math.round(h)} onKeyDown={keys(1, 0)}>
        <span className={styles.hueThumb} style={{ left: `${(h / 360) * 100}%`, background: `hsl(${h} 100% 50%)` }} />
      </div>
    </>
  );
}

function HexRow({ hex, onChange, label }: { hex: string; onChange: (hex: string) => void; label: string }) {
  const [draft, setDraft] = useState(hex);
  useEffect(() => setDraft(hex), [hex]);
  const commit = (raw: string) => { const x = raw.startsWith('#') ? raw : `#${raw}`; if (HEX.test(x)) onChange(x.toUpperCase()); else setDraft(hex); };
  const Dropper = (globalThis as { EyeDropper?: new () => { open: () => Promise<{ sRGBHex: string }> } }).EyeDropper;
  return (
    <div className={styles.hexRow}>
      <span className={styles.chip} style={{ background: hex }} aria-hidden="true" />
      <input className={styles.hex} value={draft} maxLength={7} spellCheck={false} aria-label={`${label} : code hexa`}
        onChange={(e) => setDraft(e.target.value)} onBlur={(e) => commit(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') commit((e.target as HTMLInputElement).value); }} />
      {Dropper && (
        <button type="button" className={styles.dropper} aria-label={`${label} : pipette`}
          onClick={async () => { try { const r = await new Dropper().open(); onChange(r.sRGBHex.toUpperCase()); } catch { /* annulé */ } }}>
          <Icon name="color-picker" size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

function ContrastRow({ fg, bg }: { fg: string; bg: string }) {
  const r = contrastRatio(fg, bg);
  return (
    <div className={styles.section}>
      <span className={styles.label}>Vérification du contraste</span>
      <div className={styles.contrast}>
        <span className={styles.contrastSample} style={{ background: bg, color: fg }} aria-hidden="true">Aa</span>
        <span className={styles.ratio}>{formatRatio(r)} : 1</span>
        <span className={styles.levels}>
          {(['AA', 'AAA'] as const).map((l) => {
            const ok = r >= (l === 'AA' ? 4.5 : 7);
            return <span key={l} className={ok ? styles.ok : styles.ko}>{ok ? '✓' : '✕'} {l}</span>;
          })}
        </span>
      </div>
    </div>
  );
}

export interface ToneChoiceProps {
  value: TextTone;
  onChange: (t: TextTone) => void;
  /** Nom du choix, lu par les lecteurs d'écran (et affiché au-dessus avec `showLabel`). */
  label: string;
  showLabel?: boolean;
}

/**
 * ToneChoice (Figma 9897:8199) : version claire ou sombre d'un élément (logo, texte posé sur un fond,
 * contour glass). Deux lignes, soleil (Clair) et lune (Sombre), la ligne choisie surlignée et cochée.
 */
export function ToneChoice({ value, onChange, label, showLabel }: ToneChoiceProps) {
  return (
    <div className={styles.section}>
      {showLabel && <span className={styles.label} aria-hidden="true">{label}</span>}
      <div className={styles.tones} role="radiogroup" aria-label={label}>
        {(['light', 'dark'] as const).map((t) => (
          <button key={t} type="button" role="radio" aria-checked={value === t} className={styles.tone} onClick={() => onChange(t)}>
            <span className={styles.toneIcon} aria-hidden="true"><Icon name={t === 'light' ? 'sun-03' : 'moon-02'} variant="stroke" size={14} /></span>
            <span className={styles.toneLabel}>{t === 'light' ? 'Clair' : 'Sombre'}</span>
            {value === t && <Icon name="tick-02" variant="stroke" size={16} aria-hidden="true" />}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * ColorPicker (Figma OptionCustomisation, type=bg-color-text-*, 1043:135563) : sélecteur de couleur du DS.
 * Onglets Fond | Texte quand un texte est posé sur le fond (le texte se choisit Clair ou Sombre) ;
 * fond Unie ou Dégradé (deux couleurs, rotation, animation) ; zone et teinte ; code hexa et pipette ;
 * vérification du contraste avec le texte ; « Vos couleurs » ; contour glass Clair | Sombre.
 */
export function ColorPicker({ value, onChange, allowGradient, textTone, onTextToneChange, swatches, onAddSwatch, glass, onGlassChange, animated, onAnimatedChange }: ColorPickerProps) {
  const [tab, setTab] = useState<'bg' | 'text'>('bg');
  const [stop, setStop] = useState<'from' | 'to'>('from');
  const withText = !!onTextToneChange;
  const grad = value.type === 'gradient';
  const current = grad ? (stop === 'from' ? value.from : value.to) : value.color;
  const setCurrent = (hex: string) => onChange(grad ? { ...value, [stop]: hex } : { type: 'solid', color: hex });
  const fg = textToneColor[textTone ?? 'dark'];
  const css = grad ? `linear-gradient(${value.angle + 90}deg, ${value.from}, ${value.to})` : value.color;
  return (
    <div className={styles.root}>
      {withText && <GroupTab value={tab} onChange={(t) => setTab(t as 'bg' | 'text')} aria-label="Fond ou texte" fullWidth
        items={[{ value: 'bg', label: 'Fond' }, { value: 'text', label: 'Texte' }]} />}
      {tab === 'text' && withText ? (
        <>
          <ToneChoice value={textTone ?? 'dark'} onChange={onTextToneChange!} label="Couleur du texte" />
          <ContrastRow fg={fg} bg={grad ? value.from : value.color} />
        </>
      ) : (
        <>
          {allowGradient && (
            <div className={styles.kinds} role="radiogroup" aria-label="Type de fond">
              <button type="button" role="radio" aria-checked={!grad} className={styles.kind}
                onClick={() => grad && onChange({ type: 'solid', color: value.from })}><Icon name="paint-bucket" size={14} aria-hidden="true" />Unie</button>
              <button type="button" role="radio" aria-checked={grad} className={styles.kind}
                onClick={() => !grad && onChange({ type: 'gradient', from: value.color, to: '#161C36', angle: 0 })}><Icon name="paint-bucket" size={14} aria-hidden="true" />Dégradé</button>
            </div>
          )}
          {grad && (
            <div className={styles.bar} style={{ background: css }}>
              {(['from', 'to'] as const).map((k) => (
                <button key={k} type="button" className={styles.stop} aria-pressed={stop === k} style={{ background: value[k] }}
                  aria-label={k === 'from' ? 'Première couleur' : 'Seconde couleur'} onClick={() => setStop(k)} />
              ))}
            </div>
          )}
          <Picker hex={current} onChange={setCurrent} label={grad ? (stop === 'from' ? 'Première couleur' : 'Seconde couleur') : 'Couleur'} />
          <div className={styles.section}>
            <span className={styles.label}>Code hexa</span>
            {grad ? (
              <>
                <HexRow hex={value.from} onChange={(x) => onChange({ ...value, from: x })} label="Première couleur" />
                <HexRow hex={value.to} onChange={(x) => onChange({ ...value, to: x })} label="Seconde couleur" />
              </>
            ) : <HexRow hex={value.color} onChange={setCurrent} label="Couleur" />}
          </div>
          {grad && (
            <div className={styles.section}>
              <label className={styles.label} htmlFor="cp-angle">Rotation</label>
              <input id="cp-angle" type="range" min={-180} max={180} value={value.angle} className={styles.range}
                onChange={(e) => onChange({ ...value, angle: Number(e.target.value) })} />
              <span className={styles.rangeEnds}><span>-180</span><span>+180</span></span>
            </div>
          )}
          {withText && !grad && <ContrastRow fg={fg} bg={value.color} />}
          {(swatches || onAddSwatch) && (
            <div className={styles.section + ' ' + styles.sep}>
              <span className={styles.label}>Vos couleurs</span>
              <div className={styles.swatches}>
                {swatches?.map((c) => (
                  <button key={c} type="button" className={styles.swatch} style={{ background: c }} aria-label={c}
                    aria-pressed={current.toUpperCase() === c.toUpperCase()} onClick={() => setCurrent(c.toUpperCase())} />
                ))}
                {onAddSwatch && <button type="button" className={styles.add} aria-label="Ajouter la couleur actuelle" onClick={() => onAddSwatch(current)}><Icon name="add-01" size={14} aria-hidden="true" /></button>}
              </div>
            </div>
          )}
          {grad && onAnimatedChange && (
            <div className={styles.sep}><Switch size="sm" label="Animation du dégradé" checkPlacement="right" checked={!!animated} onChange={(e) => onAnimatedChange(e.target.checked)} /></div>
          )}
          {glass && onGlassChange && (
            <div className={styles.section + ' ' + styles.sep}>
              <Switch size="sm" label="Ajouter un contour glass" checkPlacement="right" checked={glass.enabled} onChange={(e) => onGlassChange({ ...glass, enabled: e.target.checked })} />
              {glass.enabled && <ToneChoice value={glass.tone} onChange={(t) => onGlassChange({ ...glass, tone: t })} label="Contour glass" />}
            </div>
          )}
        </>
      )}
    </div>
  );
}
