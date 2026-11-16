import type { HTMLAttributes } from 'react';

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  /** Divider (6055:89) horizontal, DividerVertical (6055:90) vertical. */
  orientation?: 'horizontal' | 'vertical';
}

/** Séparateur : trait de 1 px, couleur Neutral/border/default. */
export function Divider({ orientation = 'horizontal', style, ...rest }: DividerProps) {
  const vertical = orientation === 'vertical';
  return (
    <hr
      aria-orientation={orientation}
      style={{
        border: 0,
        margin: 0,
        flex: 'none',
        background: 'var(--neutral-border-default)',
        ...(vertical ? { width: 1, alignSelf: 'stretch', minHeight: 16 } : { height: 1, width: '100%' }),
        ...style,
      }}
      {...rest}
    />
  );
}
