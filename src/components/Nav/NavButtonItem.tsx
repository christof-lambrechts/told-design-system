import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import { KbdCombo } from '../Kbd/Kbd';
import styles from './NavButtonItem.module.css';

export interface NavButtonItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: ReactNode;
  /** Icône à gauche (16). Pour une icône en pastille colorée (iconType=boxed), passer `leading`. */
  icon?: IconName;
  /** Élément libre à gauche (pastille colorée, avatar). Remplace `icon`. */
  leading?: ReactNode;
  selected?: boolean;
  /** primary = entrée de premier niveau ; secondary = sous-entrée, en retrait. */
  level?: 'primary' | 'secondary';
  /** Compteur ou étiquette à droite (propriété Figma `hasTag`). */
  tag?: ReactNode;
  /** Raccourci clavier (propriété Figma `hasShortcut`), ex. ['⌘', '1']. */
  shortcut?: string[];
  /** Entrée qui se déplie (style=dropdown) : chevron à droite. */
  expanded?: boolean;
}

/** NavButtonItem (1023:80470) : entrée de menu latéral, 40 de haut, marge 10, rayon 10. */
export function NavButtonItem({ children, icon, leading, selected, level = 'primary', tag, shortcut, expanded, className, ...rest }: NavButtonItemProps) {
  return (
    <button
      type="button"
      aria-current={selected ? 'page' : undefined}
      aria-expanded={expanded}
      className={[styles.item, selected && styles.selected, level === 'secondary' && styles.secondary, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {leading ?? (icon && <Icon name={icon} size={14} className={styles.icon} />)}
      <span className={styles.label}>{children}</span>
      {tag != null && <span className={styles.tag}>{tag}</span>}
      {shortcut && <KbdCombo keys={shortcut} size="xs" />}
      {expanded !== undefined && <Icon name={expanded ? 'arrow-up-01' : 'arrow-down-01'} size={14} className={styles.icon} />}
    </button>
  );
}
