import type { HTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import styles from './Tooltip.module.css';

export type TooltipDirection = 'up' | 'upright' | 'upleft' | 'left' | 'right' | 'down' | 'downleft' | 'downright';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Côté du repère (le point qui montre l'élément visé). `up` : repère au-dessus de la bulle. */
  direction?: TooltipDirection;
  size?: 'sm' | 'md';
  iconLeft?: IconName;
  iconRight?: IconName;
}

/** Tooltip (20:9483) : bulle d'aide sombre avec un repère rond de 12. */
export function Tooltip({ children, direction = 'up', size = 'md', iconLeft, iconRight, className, ...rest }: TooltipProps) {
  const isz = size === 'md' ? 20 : 16;
  return (
    <div role="tooltip" className={[styles.tooltip, styles[direction], styles[size], className].filter(Boolean).join(' ')} {...rest}>
      <span className={styles.dot} aria-hidden="true" />
      <div className={styles.bubble}>
        {iconLeft && <Icon name={iconLeft} size={isz} />}
        <span>{children}</span>
        {iconRight && <Icon name={iconRight} size={isz} />}
      </div>
    </div>
  );
}
