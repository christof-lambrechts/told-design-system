import type { HTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import { ButtonIcon } from '../Button/Button';
import styles from './Toast.module.css';

export type ToastType = 'success' | 'error' | 'warning' | 'brand' | 'neutral' | 'neutral-light' | 'neutral-dark';

const defaultIcon: Record<ToastType, IconName> = {
  success: 'checkmark-circle-02',
  error: 'cancel-circle',
  warning: 'alert-02',
  brand: 'information-circle',
  neutral: 'information-circle',
  'neutral-light': 'information-circle',
  'neutral-dark': 'information-circle',
};

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  type?: ToastType;
  /** lg : titre et description l'un sous l'autre ; sm : sur une ligne. */
  size?: 'sm' | 'lg';
  title: ReactNode;
  description?: ReactNode;
  /** `false` masque l'icône (propriété Figma `hasIcon`). */
  icon?: IconName | false;
  /** Action à droite (bouton ou lien). */
  action?: ReactNode;
  /** Affiche la croix de fermeture (propriété Figma `hasCloseButton`). */
  onClose?: () => void;
}

/** Toast (20:9454) : notification flottante temporaire. */
export function Toast({ type = 'neutral-dark', size = 'lg', title, description, icon, action, onClose, className, ...rest }: ToastProps) {
  const ic = icon === false ? null : icon ?? defaultIcon[type];
  return (
    <div role="status" className={[styles.toast, styles[type], styles[size], className].filter(Boolean).join(' ')} {...rest}>
      {ic && <span className={styles.icon}><Icon name={ic} size={16} /></span>}
      <div className={styles.text}>
        <span className={styles.title}>{title}</span>
        {description && <span className={styles.desc}>{description}</span>}
      </div>
      {action}
      {onClose && <ButtonIcon icon="cancel-01" label="Fermer" size="xs" appearance="ghost" color="neutral" onClick={onClose} className={styles.close} />}
    </div>
  );
}
