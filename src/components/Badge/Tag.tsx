import type { HTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import styles from './Tag.module.css';

export type TagColor = 'primary' | 'gray' | 'black' | 'green' | 'success' | 'apple' | 'tree' | 'cyan' | 'ocean' | 'purple' | 'pink' | 'peach' | 'orange' | 'mustard' | 'yellow' | 'red';

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  children: ReactNode;
  color?: TagColor;
  size?: 'sm' | 'lg';
  icon?: IconName;
  /** Deuxième partie, plus foncée (pourcentage, compteur). */
  value?: ReactNode;
  /** Affiche une croix et la rend cliquable. */
  onRemove?: () => void;
  removeLabel?: string;
}

/** Tag (LabelTag 569:60860) : étiquette de catégorie ou de filtre, avec une valeur et une croix en option. */
export function Tag({ children, color = 'gray', size = 'sm', icon, value, onRemove, removeLabel = 'Retirer', className, ...rest }: TagProps) {
  const c = color === 'primary' ? 'brand-primary' : color === 'success' ? 'brand-success' : color === 'gray' || color === 'black' ? 'brand-neutral' : color;
  return (
    <span className={[styles.tag, styles[size], className].filter(Boolean).join(' ')} style={{ ['--c50' as string]: `var(--${c}-50)`, ['--c200' as string]: `var(--${c}-200)` }} {...rest}>
      <span className={styles.main}>
        {icon && <Icon name={icon} size={size === 'lg' ? 16 : 12} variant="solid" />}
        <span className={styles.text}>{children}</span>
      </span>
      {(value !== undefined || onRemove) && (
        <span className={styles.value}>
          {value !== undefined && <span className={styles.text}>{value}</span>}
          {onRemove && (
            <button type="button" className={styles.remove} onClick={onRemove} aria-label={removeLabel}>
              <Icon name="cancel-01" size={12} />
            </button>
          )}
        </span>
      )}
    </span>
  );
}
