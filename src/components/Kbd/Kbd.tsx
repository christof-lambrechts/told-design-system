import type { CSSProperties } from 'react';

export interface KbdProps {
  /** Texte de la touche : « K », « ⌘ », « Esc »… */
  keys: string;
  /** xs 16 (menus denses), sm 20 (champs, menus), md 24 (réponses du widget). */
  size?: 'xs' | 'sm' | 'md';
  /** brand : réponse choisie. */
  tone?: 'neutral' | 'brand';
  /** square : un caractère ; auto : un mot (Esc, Tab, Entrée). */
  shape?: 'square' | 'auto';
}

const dims = {
  xs: { h: 16, r: 'var(--component-kbd-xs)', font: 10, line: 14, pad: 4 },
  sm: { h: 20, r: 'var(--component-kbd-sm)', font: 12, line: 16, pad: 5 },
  md: { h: 24, r: 'var(--component-kbd-md)', font: 14, line: 20, pad: 6 },
};

/** Kbd ✅ (7952:80274). En Inter Semi Bold : Figtree n'a pas ⌘ ⇧ ⌥ ↵. */
export function Kbd({ keys, size = 'sm', tone = 'neutral', shape = 'square' }: KbdProps) {
  const d = dims[size];
  const style: CSSProperties = {
    boxSizing: 'border-box',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: d.h,
    minWidth: d.h,
    padding: shape === 'auto' ? `0 ${d.pad}px` : 0,
    borderRadius: d.r,
    border: `1px solid var(${tone === 'brand' ? '--brand-border-hover' : '--neutral-border-default'})`,
    background: `var(${tone === 'brand' ? '--brand-surface-default' : '--neutral-surface-muted'})`,
    color: `var(${tone === 'brand' ? '--content-default-selected' : '--content-muted-default'})`,
    font: `600 ${d.font}px/${d.line}px Inter, system-ui, sans-serif`,
  };
  return <kbd style={style}>{keys}</kbd>;
}

export interface KbdComboProps {
  keys: string[];
  size?: KbdProps['size'];
  tone?: KbdProps['tone'];
}

/** KbdCombo ✅ (7955:25615) : un raccourci, une touche par caractère, écart 2. */
export function KbdCombo({ keys, size = 'sm', tone = 'neutral' }: KbdComboProps) {
  return (
    <span style={{ display: 'inline-flex', gap: 'var(--base-025)' }}>
      {keys.map((k) => (
        <Kbd key={k} keys={k} size={size} tone={tone} shape={k.length > 1 ? 'auto' : 'square'} />
      ))}
    </span>
  );
}
