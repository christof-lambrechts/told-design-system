import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import styles from './GuidedPlayer.module.css';

/** Position et taille en fraction de l'image (0 à 1), pour qu'elles suivent l'image à toute taille. */
export interface GuidedRect { x: number; y: number; width?: number; height?: number }

/** Élément posé sur l'image à une position (contour d'une valeur, fenêtre de correction, repère). */
export interface GuidedOverlay extends GuidedRect {
  id: string;
  content: ReactNode;
}

export interface GuidedStep {
  id: string;
  /** Adresse de l'image (blob:, data: ou chemin local : rien de distant n'est requis). */
  image: string;
  /** Texte alternatif de l'image. */
  alt?: string;
  /** Taille de l'image en px (sinon lue au chargement). Sert au ratio. */
  width?: number;
  height?: number;
  /** Point cliqué (fraction de l'image). */
  cursor?: { x: number; y: number };
  /** Zoom centré sur un point (fraction de l'image), facteur 1 à 3. */
  zoom?: { x: number; y: number; scale: number };
  /** Infobulle affichée près du curseur. */
  tooltip?: ReactNode;
  /** Durée de l'étape en lecture, en ms (4000 par défaut). */
  duration?: number;
  /** Éléments posés sur l'image. */
  overlays?: GuidedOverlay[];
}

export interface GuidedScreen {
  title: ReactNode;
  description?: ReactNode;
  /** Boutons (WidgetButton conseillé). */
  actions?: ReactNode;
}

export interface GuidedPlayerLabels {
  play: string; pause: string; previous: string; next: string; replay: string; fullscreen: string; menu: string;
  counter: (current: number, total: number) => string; region: string; steps: string; nextInTooltip: string;
}
const DEFAULT_LABELS: GuidedPlayerLabels = {
  play: 'Lire', pause: 'Pause', previous: 'Étape précédente', next: 'Étape suivante', replay: 'Recommencer', fullscreen: 'Plein écran', menu: 'Plus d’options',
  counter: (c, t) => `${c} / ${t}`, region: 'Démo guidée', steps: 'Progression', nextInTooltip: 'Suivant',
};

export interface GuidedPlayerProps {
  steps: GuidedStep[];
  /**
   * start : écran de départ ; step : une étape affichée ; end : écran de fin.
   * Piloté par l'app pour montrer une étape précise (clic sur la pellicule) : state="step" + index.
   */
  state?: 'start' | 'step' | 'end';
  onStateChange?: (state: 'start' | 'step' | 'end') => void;
  /** Étape affichée (contrôlée). */
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  /** Appelé chaque fois qu'une étape est affichée et que son image est chargée (D-089 : suivi des images vues). */
  onStepShown?: (index: number) => void;
  /** Lecture automatique (contrôlée ou non). */
  playing?: boolean;
  defaultPlaying?: boolean;
  onPlayingChange?: (playing: boolean) => void;
  /** Recommence au début après la dernière étape, au lieu d'afficher l'écran de fin. */
  loop?: boolean;
  start?: GuidedScreen;
  end?: GuidedScreen;
  /** Cadre de fenêtre avec trois points (Figma GuidedPlayer). */
  frame?: 'browser' | 'none';
  /** Éléments posés sur l'image, en plus de `step.overlays`. */
  renderOverlays?: (step: GuidedStep, index: number) => ReactNode;
  /** Mention sous la barre (« Told Record »), `false` pour la masquer. */
  mention?: ReactNode | false;
  /** Afficher le temps (Figma hasTime). */
  showTime?: boolean;
  /** Bouton ⋯ de la barre (menu fourni par l'app). */
  menu?: ReactNode;
  labels?: Partial<GuidedPlayerLabels>;
  className?: string;
  style?: CSSProperties;
}

const fmt = (ms: number) => { const s = Math.round(ms / 1000); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
const pct = (n: number) => `${n * 100}%`;

/**
 * GuidedPlayer (Figma 8847:1765) : lecteur de démo guidée. Image de l'étape, point cliqué, zoom, infobulle, barre de lecture.
 * Tout se joue depuis les données passées (aucune ressource distante, pas d'eval) : compatible avec une page d'extension en CSP stricte.
 * Clavier sur le lecteur : Espace lecture et pause, flèches gauche et droite pour changer d'étape.
 */
export function GuidedPlayer({
  steps, state: stateProp, onStateChange, index: indexProp, defaultIndex = 0, onIndexChange, onStepShown,
  playing: playingProp, defaultPlaying = false, onPlayingChange, loop = false, start, end, frame = 'browser',
  renderOverlays, mention = 'Told Record', showTime = true, menu, labels, className, style,
}: GuidedPlayerProps) {
  const L = { ...DEFAULT_LABELS, ...labels };
  const total = steps.length;
  const [stateInner, setStateInner] = useState<'start' | 'step' | 'end'>(start ? 'start' : 'step');
  const state = stateProp ?? stateInner;
  const setState = useCallback((s: 'start' | 'step' | 'end') => { if (stateProp === undefined) setStateInner(s); onStateChange?.(s); }, [stateProp, onStateChange]);
  const [indexInner, setIndexInner] = useState(defaultIndex);
  const index = Math.min(Math.max(indexProp ?? indexInner, 0), Math.max(total - 1, 0));
  const setIndex = useCallback((i: number) => { if (indexProp === undefined) setIndexInner(i); onIndexChange?.(i); }, [indexProp, onIndexChange]);
  const [playingInner, setPlayingInner] = useState(defaultPlaying);
  const playing = playingProp ?? playingInner;
  const setPlaying = useCallback((p: boolean) => { if (playingProp === undefined) setPlayingInner(p); onPlayingChange?.(p); }, [playingProp, onPlayingChange]);
  const root = useRef<HTMLDivElement>(null);
  const step = steps[index];
  const [sizes, setSizes] = useState<Record<string, { w: number; h: number }>>({});
  const size = step && (step.width && step.height ? { w: step.width, h: step.height } : sizes[step.id]);
  const [loaded, setLoaded] = useState<string | null>(null);

  const go = useCallback((i: number) => {
    if (i >= total) { if (loop) { setIndex(0); setState('step'); } else { setPlaying(false); end ? setState('end') : setIndex(total - 1); } return; }
    setIndex(Math.max(0, i)); setState('step');
  }, [total, loop, end, setIndex, setState, setPlaying]);

  // Lecture : passe à l'étape suivante après sa durée.
  useEffect(() => {
    if (!playing || state !== 'step' || !step || loaded !== step.id) return;
    const t = window.setTimeout(() => go(index + 1), step.duration ?? 4000);
    return () => window.clearTimeout(t);
  }, [playing, state, step, index, loaded, go]);

  // Étape vue : image chargée et affichée.
  useEffect(() => { if (state === 'step' && step && loaded === step.id) onStepShown?.(index); }, [state, step, index, loaded, onStepShown]);

  const elapsed = steps.slice(0, index).reduce((a, s) => a + (s.duration ?? 4000), 0);
  const length = steps.reduce((a, s) => a + (s.duration ?? 4000), 0);

  const onKey = (e: KeyboardEvent) => {
    if ((e.target as HTMLElement).closest('input, textarea, [contenteditable="true"], [role="dialog"]')) return;
    if (e.key === ' ' && state === 'step') { e.preventDefault(); setPlaying(!playing); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
  };
  const fullscreen = () => { const el = root.current; if (!el) return; if (document.fullscreenElement) void document.exitFullscreen(); else void el.requestFullscreen?.(); };

  const zoom = step?.zoom && step.zoom.scale > 1 ? step.zoom : null;
  const zoomStyle: CSSProperties = zoom ? { transform: `scale(${zoom.scale})`, transformOrigin: `${pct(zoom.x)} ${pct(zoom.y)}` } : {};
  const ratio = size ? `${size.w} / ${size.h}` : '16 / 10';
  const overlays = step ? [...(step.overlays ?? [])] : [];
  // Position du curseur à l'écran, zoom compris (le zoom agrandit autour de son point).
  const cur = step?.cursor ? (zoom ? { x: zoom.x + (step.cursor.x - zoom.x) * zoom.scale, y: zoom.y + (step.cursor.y - zoom.y) * zoom.scale } : step.cursor) : null;
  const tipBelow = cur ? cur.y < 0.6 : true;

  return (
    <div ref={root} className={[styles.root, className].filter(Boolean).join(' ')} style={style} role="region" aria-label={L.region} tabIndex={0} onKeyDown={onKey}>
      {frame === 'browser' && <div className={styles.chrome} aria-hidden="true"><i /><i /><i /></div>}
      <div className={styles.stage} style={{ aspectRatio: ratio }}>
        {step && (
          <div className={styles.zoom} style={zoomStyle}>
            <img key={step.id} src={step.image} alt={step.alt ?? ''} className={styles.image} draggable={false}
              onLoad={(e) => { const im = e.currentTarget; setSizes((s) => (s[step.id] ? s : { ...s, [step.id]: { w: im.naturalWidth, h: im.naturalHeight } })); setLoaded(step.id); }}
              ref={(im) => { if (im?.complete && im.naturalWidth && loaded !== step.id) setLoaded(step.id); }} />
            <div className={styles.layer}>
              {overlays.map((o) => (
                <div key={o.id} className={styles.overlay} style={{ left: pct(o.x), top: pct(o.y), width: o.width !== undefined ? pct(o.width) : undefined, height: o.height !== undefined ? pct(o.height) : undefined }}>{o.content}</div>
              ))}
              {renderOverlays?.(step, index)}
              {state === 'step' && step.cursor && <span className={styles.click} style={{ left: pct(step.cursor.x), top: pct(step.cursor.y) }} aria-hidden="true"><span /></span>}
            </div>
          </div>
        )}
        {state === 'step' && step?.tooltip && (
          <div className={[styles.tip, tipBelow ? styles.tipBelow : styles.tipAbove].join(' ')}
            style={cur ? { left: `clamp(8px, calc(${pct(cur.x)} - 130px), calc(100% - 268px))`, top: tipBelow ? `calc(${pct(cur.y)} + 28px)` : undefined, bottom: tipBelow ? undefined : `calc(${pct(1 - cur.y)} + 28px)` } : { left: '50%', bottom: 16, transform: 'translateX(-50%)' }}>
            <p className={styles.tipText}>{step.tooltip}</p>
            <div className={styles.tipNav}>
              <button type="button" className={styles.iconBtn} aria-label={L.previous} onClick={() => go(index - 1)} disabled={index === 0}><Icon name="arrow-left-01" size={16} /></button>
              <span className={styles.counter}>{L.counter(index + 1, total)}</span>
              <button type="button" className={styles.tipNext} onClick={() => go(index + 1)}>{L.nextInTooltip}</button>
            </div>
          </div>
        )}
        {(state === 'start' && start) || (state === 'end' && end) ? (
          <div className={styles.veil}>
            <div className={styles.screen}>
              <h2 className={styles.screenTitle}>{(state === 'start' ? start : end)!.title}</h2>
              {(state === 'start' ? start : end)!.description && <p className={styles.screenDesc}>{(state === 'start' ? start : end)!.description}</p>}
              {(state === 'start' ? start : end)!.actions && <div className={styles.screenActions}>{(state === 'start' ? start : end)!.actions}</div>}
            </div>
          </div>
        ) : null}
      </div>
      <div className={styles.bar}>
        <button type="button" className={styles.iconBtn} aria-label={playing ? L.pause : L.play} aria-pressed={playing}
          onClick={() => { if (state !== 'step') go(state === 'end' ? 0 : index); setPlaying(!playing || state !== 'step'); }}>
          <Icon name={playing && state === 'step' ? 'pause' : 'play'} size={16} variant="solid" />
        </button>
        <div className={styles.segments} role="group" aria-label={L.steps}>
          {steps.map((s, i) => (
            <button key={s.id} type="button" aria-label={L.counter(i + 1, total)} aria-current={state === 'step' && i === index ? 'step' : undefined}
              className={[styles.seg, (i < index || state === 'end') && styles.segDone, state === 'step' && i === index && styles.segNow].filter(Boolean).join(' ')}
              onClick={() => go(i)}>
              {state === 'step' && i === index && <span className={styles.segFill} style={{ animationDuration: `${s.duration ?? 4000}ms`, animationPlayState: playing && loaded === s.id ? 'running' : 'paused' }} key={`${s.id}-${playing}`} />}
            </button>
          ))}
        </div>
        <div className={styles.nav}>
          <button type="button" className={styles.iconBtn} aria-label={L.previous} onClick={() => go(index - 1)} disabled={index === 0 && state === 'step'}><Icon name="arrow-left-01" size={14} /></button>
          <span className={styles.counter} aria-live="polite">{L.counter(state === 'step' ? index + 1 : state === 'end' ? total : 0, total)}</span>
          <button type="button" className={styles.iconBtn} aria-label={L.next} onClick={() => go(index + 1)}><Icon name="arrow-right-01" size={14} /></button>
        </div>
        {showTime && <span className={styles.time}>{fmt(state === 'end' ? length : elapsed)} / {fmt(length)}</span>}
        <button type="button" className={styles.iconBtn} aria-label={L.replay} onClick={() => { go(0); setPlaying(true); }}><Icon name="repeat" size={16} /></button>
        <button type="button" className={styles.iconBtn} aria-label={L.fullscreen} onClick={fullscreen}><Icon name="square-arrow-expand-02" size={16} /></button>
        {mention !== false && <span className={styles.mention}>{mention}</span>}
        {menu ?? null}
      </div>
    </div>
  );
}
