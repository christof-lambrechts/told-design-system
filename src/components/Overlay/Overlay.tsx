import {
  cloneElement, createContext, isValidElement, useContext, useCallback, useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore,
  type CSSProperties, type MouseEvent as RMouseEvent, type ReactElement, type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { Icon, type IconName } from '../Icon/Icon';
import { ButtonIcon } from '../Button/Button';
import { DropdownMenu } from '../Select/Select';
import { Tooltip as TooltipBubble, type TooltipDirection } from '../Tooltip/Tooltip';
import { Toast, type ToastType } from '../Toast/Toast';
import styles from './Overlay.module.css';

const cx = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(' ');

/* =================================================================== Positionnement */
export type Placement = 'bottom-start' | 'bottom-end' | 'bottom' | 'top-start' | 'top-end' | 'top' | 'right-start' | 'left-start';

function place(anchor: DOMRect, w: number, h: number, placement: Placement, gap: number) {
  const vw = window.innerWidth, vh = window.innerHeight, m = 8;
  const [side, align = 'center'] = placement.split('-') as [string, string?];
  let top = 0, left = 0;
  const horiz = () => (align === 'start' ? anchor.left : align === 'end' ? anchor.right - w : anchor.left + anchor.width / 2 - w / 2);
  const vert = () => (align === 'start' ? anchor.top : anchor.top + anchor.height / 2 - h / 2);
  if (side === 'bottom') { top = anchor.bottom + gap; left = horiz(); if (top + h > vh - m && anchor.top - gap - h > m) top = anchor.top - gap - h; }
  if (side === 'top') { top = anchor.top - gap - h; left = horiz(); if (top < m) top = anchor.bottom + gap; }
  if (side === 'right') { left = anchor.right + gap; top = vert(); if (left + w > vw - m) left = anchor.left - gap - w; }
  if (side === 'left') { left = anchor.left - gap - w; top = vert(); if (left < m) left = anchor.right + gap; }
  return { top: Math.max(m, Math.min(top, vh - h - m)), left: Math.max(m, Math.min(left, vw - w - m)) };
}

/** Position fixe d'un calque collé à son ancre, recalculée au défilement et au redimensionnement. */
export function useAnchoredPosition(anchor: HTMLElement | null, layer: HTMLElement | null, open: boolean, placement: Placement, gap = 6) {
  const [pos, setPos] = useState<CSSProperties>({ position: 'fixed', top: -9999, left: -9999 });
  const update = useCallback(() => {
    if (!anchor || !layer) return;
    const r = layer.getBoundingClientRect();
    const p = place(anchor.getBoundingClientRect(), r.width, r.height, placement, gap);
    setPos({ position: 'fixed', top: p.top, left: p.left });
  }, [anchor, layer, placement, gap]);
  useLayoutEffect(() => { if (open) update(); }, [open, update]);
  useEffect(() => {
    if (!open) return;
    window.addEventListener('scroll', update, true); window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update, true); window.removeEventListener('resize', update); };
  }, [open, update]);
  return pos;
}

/** Enveloppe sans boîte : sert d'ancre quel que soit le bouton (avec ou sans ref transmise). */
function anchorOf(span: HTMLSpanElement | null): HTMLElement | null { return (span?.firstElementChild as HTMLElement | null) ?? span; }

type TriggerEl = ReactElement<{ onClick?: (e: RMouseEvent) => void; 'aria-expanded'?: boolean; 'aria-haspopup'?: string; 'aria-controls'?: string }>;

/* =================================================================== Popover (D-071) */
export interface PopoverProps {
  /** Le bouton qui ouvre et ferme (Button, ButtonIcon…) : il reçoit ref, onClick, aria-expanded. */
  trigger: ReactElement;
  children: ReactNode | ((close: () => void) => ReactNode);
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: Placement;
  /** Largeur du calque (sinon : celle du contenu). */
  width?: number;
  /** false : pas de fond ni de contour (le contenu porte sa propre surface, ex. ColumnPicker). */
  surface?: boolean;
  'aria-label'?: string;
  /** Rôle du calque (dialog par défaut ; menu pour Menu). */
  role?: string;
  className?: string;
}

/**
 * Popover : calque ancré à son bouton (D-071). S'ouvre au clic, se ferme au clic dehors, à Échap (le focus revient au bouton),
 * se replace s'il manque de place. Base de Menu ; à utiliser pour « Rapport », « Colonnes », un sélecteur.
 */
export function Popover({ trigger, children, open: openProp, onOpenChange, placement = 'bottom-start', width, surface = true, role = 'dialog', className, ...rest }: PopoverProps) {
  const [inner, setInner] = useState(false);
  const open = openProp ?? inner;
  const set = useCallback((v: boolean) => { if (openProp === undefined) setInner(v); onOpenChange?.(v); }, [openProp, onOpenChange]);
  const [wrap, setWrap] = useState<HTMLSpanElement | null>(null);
  const anchor = anchorOf(wrap);
  const [layer, setLayer] = useState<HTMLDivElement | null>(null);
  const id = useId();
  const pos = useAnchoredPosition(anchor, layer, open, placement);
  const close = useCallback(() => { set(false); anchor?.focus(); }, [set, anchor]);
  useEffect(() => {
    if (!open) return;
    const down = (e: PointerEvent) => { const t = e.target as Node; if (!layer?.contains(t) && !anchor?.contains(t)) set(false); };
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.stopPropagation(); close(); } };
    window.addEventListener('pointerdown', down); window.addEventListener('keydown', key);
    return () => { window.removeEventListener('pointerdown', down); window.removeEventListener('keydown', key); };
  }, [open, layer, anchor, set, close]);
  const t = trigger as TriggerEl;
  const triggerEl = isValidElement(t) ? cloneElement(t, {
    onClick: (e: RMouseEvent) => { t.props.onClick?.(e); if (!e.defaultPrevented) set(!open); },
    'aria-expanded': open, 'aria-haspopup': role === 'menu' ? 'menu' : 'dialog', 'aria-controls': open ? id : undefined,
  }) : trigger;
  return (
    <>
      <span ref={setWrap} className={styles.anchor}>{triggerEl}</span>
      {open && createPortal(
        <div ref={setLayer} id={id} role={role === 'menu' ? undefined : role} aria-label={rest['aria-label']} data-theme="light"
          className={cx(styles.layer, surface && styles.surface, className)} style={{ ...pos, width }}>
          {typeof children === 'function' ? children(close) : children}
        </div>,
        document.body,
      )}
    </>
  );
}

/* =================================================================== Menu (D-074) */
export interface MenuProps extends Omit<PopoverProps, 'children' | 'role' | 'surface'> {
  /** DropdownItem, DropdownSection… : un clic sur une entrée ferme le menu. */
  children: ReactNode;
}

/** Menu : DropdownMenu kind="menu" ouvert par son bouton (D-074). Flèches, Début, Fin, Échap ; une entrée choisie ferme le menu. */
export function Menu({ children, width = 240, placement = 'bottom-end', ...rest }: MenuProps) {
  return (
    <Popover {...rest} placement={placement} width={width} surface={false} role="menu">
      {(close) => (
        <DropdownMenu kind="menu" autoFocus aria-label={rest['aria-label']} onEscape={close}
          onClick={(e) => { if ((e.target as HTMLElement).closest('[role="menuitem"]:not([aria-disabled="true"])')) close(); }}>
          {children}
        </DropdownMenu>
      )}
    </Popover>
  );
}

/* =================================================================== Infobulle au survol (D-065) */
export interface TooltipTriggerProps {
  /** Texte de la bulle. */
  content: ReactNode;
  /** Un seul élément focusable (bouton, lien, texte avec tabIndex). */
  children: ReactElement;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Délai avant l'ouverture, en ms. */
  delay?: number;
  size?: 'sm' | 'md';
  /** false : n'affiche rien (ex. texte non coupé). */
  enabled?: boolean;
}
const DIR: Record<NonNullable<TooltipTriggerProps['placement']>, { p: Placement; d: TooltipDirection }> = {
  top: { p: 'top', d: 'down' }, bottom: { p: 'bottom', d: 'up' }, left: { p: 'left-start', d: 'right' }, right: { p: 'right-start', d: 'left' },
};

/** TooltipTrigger : Tooltip au survol et au focus (D-065), relié par aria-describedby, fermé par Échap. */
export function TooltipTrigger({ content, children, placement = 'top', delay = 400, size = 'sm', enabled = true }: TooltipTriggerProps) {
  const [open, setOpen] = useState(false);
  const [wrap, setWrap] = useState<HTMLSpanElement | null>(null);
  const anchor = anchorOf(wrap);
  const [layer, setLayer] = useState<HTMLDivElement | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const id = useId();
  const pos = useAnchoredPosition(anchor, layer, open, DIR[placement].p, 4);
  const show = () => { if (!enabled) return; window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setOpen(true), delay); };
  const hide = () => { window.clearTimeout(timer.current); setOpen(false); };
  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => { if (!open) return; const k = (e: KeyboardEvent) => { if (e.key === 'Escape') hide(); }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [open]);
  const el = isValidElement(children) ? cloneElement(children as ReactElement<{ 'aria-describedby'?: string }>, { 'aria-describedby': open ? id : undefined }) : children;
  return (
    <>
      <span ref={setWrap} className={styles.anchor} onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>{el}</span>
      {open && createPortal(<div ref={setLayer} className={styles.tip} style={pos}><TooltipBubble id={id} size={size} direction={DIR[placement].d}>{content}</TooltipBubble></div>, document.body)}
    </>
  );
}

/* =================================================================== Accordéon (D-072) */
export interface AccordionProps {
  children: ReactNode;
  /** single : un seul ouvert à la fois. multiple : plusieurs. */
  type?: 'single' | 'multiple';
  defaultOpen?: string[];
  className?: string;
}
interface AccordionCtx { isOpen: (id: string) => boolean; toggle: (id: string) => void }
const AccCtx = createContext<AccordionCtx | null>(null);

/** Accordion (Figma 635:66388) : sections repliables hors panneau d'options (D-072). Titres en boutons, aria-expanded, contenu relié. */
export function Accordion({ children, type = 'single', defaultOpen = [], className }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultOpen);
  const ctx: AccordionCtx = { isOpen: (id) => open.includes(id), toggle: (id) => setOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : type === 'single' ? [id] : [...o, id])) };
  return <AccCtx.Provider value={ctx}><div className={cx(styles.accordion, className)}>{children}</div></AccCtx.Provider>;
}

export interface AccordionItemProps {
  id: string;
  title: ReactNode;
  /** Phrase sous le titre (Figma hasDescription). */
  description?: ReactNode;
  /** Icône à gauche du titre (Figma icon). */
  icon?: IconName;
  /** Élément à droite du titre, avant le chevron (badge, compteur). */
  aside?: ReactNode;
  children: ReactNode;
}
export function AccordionItem({ id, title, description, icon, aside, children }: AccordionItemProps) {
  const ctx = useContext(AccCtx); const uid = useId();
  const open = ctx?.isOpen(id) ?? false;
  return (
    <div className={cx(styles.accItem, open && styles.accOpen)}>
      <h3 className={styles.accHead}>
        <button type="button" className={styles.accBtn} aria-expanded={open} aria-controls={uid} onClick={() => ctx?.toggle(id)}>
          {icon && <Icon name={icon} size={14} className={styles.accIcon} />}
          <span className={styles.accTitles}><span className={styles.accTitle}>{title}</span>{description && <span className={styles.accDesc}>{description}</span>}</span>
          {aside}
          <Icon name="arrow-right-01" size={14} className={styles.accChevron} />
        </button>
      </h3>
      <div id={uid} role="region" hidden={!open} className={styles.accBody}>{children}</div>
    </div>
  );
}

/* =================================================================== Toasts (D-060, D-073) */
export interface ToastOptions { title: ReactNode; description?: ReactNode; type?: ToastType; action?: { label: string; onClick: () => void }; duration?: number }
type ToastItem = ToastOptions & { id: number };
let items: ToastItem[] = []; let seq = 0; const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());
/** Ferme une notification. */
export function dismissToast(id: number) { items = items.filter((t) => t.id !== id); emit(); }
/** Affiche une notification dans le Toaster (pile en bas à droite, 5 s par défaut, 0 = reste). Renvoie son id. */
export function toast(o: ToastOptions | string) {
  const t: ToastItem = { ...(typeof o === 'string' ? { title: o } : o), id: ++seq };
  items = [...items, t].slice(-4); emit();
  const d = t.duration ?? 5000; if (d > 0) window.setTimeout(() => dismissToast(t.id), d);
  return t.id;
}

/** Toaster : à poser une fois dans l'application ; affiche la file de `toast()` (D-060, D-073). Annoncé aux lecteurs d'écran. */
export function Toaster() {
  const list = useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f); }, () => items, () => items);
  if (typeof document === 'undefined') return null;
  return createPortal(
    <div className={styles.toaster} role="region" aria-label="Notifications" aria-live="polite">
      {list.map((t) => (
        <Toast key={t.id} type={t.type ?? 'neutral-dark'} title={t.title} description={t.description} size={t.description ? 'lg' : 'sm'}
          action={t.action && <button type="button" className={styles.toastAction} onClick={() => { t.action!.onClick(); dismissToast(t.id); }}>{t.action.label}</button>}
          onClose={() => dismissToast(t.id)} />
      ))}
    </div>,
    document.body,
  );
}

/* =================================================================== SidePanel (D-070) */
export interface SidePanelProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  /** Largeur (480 par défaut). */
  width?: number;
  /** Fond assombri derrière le panneau (vrai par défaut). */
  overlay?: boolean;
  closeLabel?: string;
}

/** SidePanel : panneau qui glisse depuis la droite (D-070) : en-tête, contenu qui défile, pied. Échap et le fond ferment ; le focus revient. */
export function SidePanel({ open, onClose, title, description, children, footer, width = 480, overlay = true, closeLabel = 'Fermer' }: SidePanelProps) {
  const panel = useRef<HTMLDivElement>(null); const tid = useId();
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null; panel.current?.focus();
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', k);
    return () => { document.removeEventListener('keydown', k); prev?.focus?.(); };
  }, [open, onClose]);
  if (!open) return null;
  return createPortal(
    <div className={styles.sideRoot} data-theme="light">
      {overlay && <div className={styles.sideOverlay} onClick={onClose} aria-hidden="true" />}
      <div ref={panel} role="dialog" aria-modal={overlay} aria-labelledby={tid} tabIndex={-1} className={styles.side} style={{ width }}>
        <header className={styles.sideHead}>
          <div className={styles.sideTitles}><h2 id={tid} className={styles.sideTitle}>{title}</h2>{description && <p className={styles.sideDesc}>{description}</p>}</div>
          <ButtonIcon icon="cancel-01" label={closeLabel} appearance="ghost" size="sm" onClick={onClose} />
        </header>
        <div className={styles.sideBody}>{children}</div>
        {footer && <footer className={styles.sideFoot}>{footer}</footer>}
      </div>
    </div>,
    document.body,
  );
}

/* =================================================================== ScrollArea (D-074) */
export interface ScrollAreaProps { children: ReactNode; maxHeight?: number | string; className?: string; 'aria-label'?: string }
/** ScrollArea : zone qui défile avec une barre fine et une ombre en haut et en bas quand il reste du contenu (D-074). */
export function ScrollArea({ children, maxHeight, className, ...rest }: ScrollAreaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ top: false, bottom: false });
  const check = () => { const el = ref.current; if (!el) return; setEdges({ top: el.scrollTop > 0, bottom: el.scrollTop + el.clientHeight < el.scrollHeight - 1 }); };
  useLayoutEffect(check, [children]);
  return (
    <div ref={ref} onScroll={check} tabIndex={0} aria-label={rest['aria-label']} className={cx(styles.scroll, edges.top && styles.scrollTop, edges.bottom && styles.scrollBottom, className)} style={{ maxHeight }}>
      {children}
    </div>
  );
}
