import type { HTMLAttributes, ReactNode } from 'react';
import styles from './ButtonGroup.module.css';

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** 2 ou 3 Button / ButtonIcon de même taille, actions liées (Partager + Aperçu). */
  children: ReactNode;
  /** outline : fond clair, contour gris commun (Button neutral secondary-outline) ; inverse : blanc 12 % sur en-tête sombre. */
  appearance?: 'outline' | 'inverse';
}

/** ButtonGroup (8810:1705) : boutons accolés, seuls les coins extérieurs arrondis. */
export function ButtonGroup({ children, appearance = 'outline', className, ...rest }: ButtonGroupProps) {
  return (
    <div role="group" className={[styles.group, styles[appearance], className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  );
}
