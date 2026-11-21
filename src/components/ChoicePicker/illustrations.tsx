/* _ChoiceIllustration (8773:100705) : aplats sans contour, 4 teintes (fond, carte, traits, accent de marque). 64 × 44. */
import type { ReactElement } from 'react';

export type ChoiceIllustrationName = 'ratio-16-9' | 'ratio-1-1' | 'ratio-4-3' | 'ratio-3-4' | 'widget' | 'modale' | 'banniere' | 'infobulle' | 'demo' | 'announcement' | 'inapp';

const BG = 'var(--ci-bg, var(--neutral-surface-muted))';
const CARD = 'var(--ci-card, var(--neutral-surface-default))';
const LINE = 'var(--ci-line, var(--brand-neutral-50, #DFE5EA))';
const ACC = 'var(--ci-accent, var(--brand-primary-500))';

const screen = (
  <>
    <rect x="8" y="7" width="48" height="30" rx="4" fill={CARD} />
    <rect x="13" y="12" width="18" height="3" rx="1.5" fill={LINE} />
    <rect x="13" y="17" width="12" height="3" rx="1.5" fill={LINE} />
  </>
);
const ratio = (x: number, y: number, w: number, h: number) => (
  <>
    <rect x={x} y={y} width={w} height={h} rx="4" fill={CARD} />
    <rect x={x + 4} y={y + 4} width={Math.round(w * 0.46)} height="3" rx="1.5" fill={LINE} />
    <rect x={x + 4} y={y + 9} width={Math.round(w * 0.3)} height="3" rx="1.5" fill={LINE} />
    <circle cx={x + w - 8} cy={y + h - 8} r="3" fill={ACC} />
  </>
);

const shapes: Record<ChoiceIllustrationName, ReactElement> = {
  'ratio-16-9': ratio(8, 8.5, 48, 27),
  'ratio-1-1': ratio(17, 7, 30, 30),
  'ratio-4-3': ratio(12, 7, 40, 30),
  'ratio-3-4': ratio(19, 5, 26, 34),
  widget: <>{screen}<rect x="38" y="24" width="14" height="9" rx="3" fill={ACC} /></>,
  modale: <>{screen}<rect x="20" y="13" width="24" height="18" rx="4" fill={LINE} /><rect x="22" y="15" width="20" height="14" rx="3" fill={CARD} /><rect x="26" y="24" width="12" height="3" rx="1.5" fill={ACC} /></>,
  banniere: <>{screen}<path d="M8 11a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v2H8z" fill={ACC} /></>,
  /* Formats Told Record (21/11) */
  demo: <><rect x="8" y="7" width="48" height="30" rx="4" fill={CARD} /><rect x="8" y="7" width="12" height="30" rx="4" fill={LINE} opacity=".5" /><rect x="24" y="12" width="20" height="3" rx="1.5" fill={LINE} /><rect x="24" y="17" width="28" height="8" rx="2" fill={LINE} opacity=".6" /><circle cx="44" cy="28" r="6" fill={ACC} opacity=".25" /><circle cx="44" cy="28" r="3" fill={ACC} /><path d="M46 28v9l2.5-2.2 1.8 3.7 1.5-.7-1.8-3.7 3.2-.1z" fill="var(--content-default-default)" stroke={CARD} strokeWidth="1" /></>,
  announcement: <><rect x="8" y="7" width="48" height="30" rx="4" fill={ACC} opacity=".14" /><rect x="12" y="12" width="6" height="3" rx="1.5" fill={ACC} /><rect x="12" y="17" width="16" height="3" rx="1.5" fill="var(--content-default-default)" opacity=".55" /><rect x="12" y="22" width="12" height="2" rx="1" fill="var(--content-default-default)" opacity=".3" /><rect x="12" y="29" width="9" height="4" rx="2" fill={ACC} /><rect x="31" y="11" width="21" height="22" rx="3" fill={CARD} /><rect x="31" y="11" width="21" height="3" rx="1.5" fill={LINE} /><rect x="34" y="18" width="14" height="2" rx="1" fill={LINE} /><rect x="34" y="22" width="10" height="2" rx="1" fill={LINE} /></>,
  inapp: <>{screen}<rect x="13" y="23" width="24" height="9" rx="3" fill={ACC} opacity=".14" /><rect x="16" y="26" width="12" height="3" rx="1.5" fill={ACC} /><path d="M51.2 23.5A5.5 5.5 0 1 1 46 20.5" stroke={ACC} strokeWidth="1.6" strokeLinecap="round" /><path d="M45 18l3.2 2.4-3.4 2z" fill={ACC} /></>,
  infobulle: <>{screen}<rect x="28" y="18" width="10" height="4" rx="2" fill={LINE} /><rect x="24" y="25" width="20" height="8" rx="3" fill={ACC} /><path d="M34 22L36.17 25H31.83Z" fill={ACC} /></>,
};

export function ChoiceIllustration({ name }: { name: ChoiceIllustrationName }) {
  return (
    <svg width="64" height="44" viewBox="0 0 64 44" fill="none" aria-hidden="true">
      <rect width="64" height="44" rx="8" fill={BG} />
      {shapes[name]}
    </svg>
  );
}
