import type { HTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import { ButtonIcon } from '../Button/Button';
import styles from './Banner.module.css';

export type BannerType = 'brand' | 'warning' | 'error' | 'success' | 'neutral';

const icons: Record<BannerType, IconName> = {
  brand: 'information-circle', warning: 'alert-02', error: 'cancel-circle', success: 'checkmark-circle-02', neutral: 'information-circle',
};

export interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  type?: BannerType;
  /** Une phrase : ce qui se passe. */
  children: ReactNode;
  /** Lien d'action à droite du message (hasAction + actionText). */
  actionText?: ReactNode;
  onAction?: () => void;
  /** Croix de fermeture (hasClose). */
  onClose?: () => void;
  /** `false` masque l'icône (hasIcon). */
  icon?: IconName | false;
}

/** Banner (8764:101293) : bandeau pleine largeur en haut d'une page ou d'un panneau (mode lecture seule, quota, démo non publiée). */
export function Banner({ type = 'brand', children, actionText, onAction, onClose, icon, className, ...rest }: BannerProps) {
  const ic = icon === false ? null : icon ?? icons[type];
  return (
    <div role={type === 'error' || type === 'warning' ? 'alert' : 'status'} className={[styles.banner, className].filter(Boolean).join(' ')} data-type={type} {...rest}>
      <div className={styles.content}>
        {ic && <Icon name={ic} size={16} variant="solid" className={styles.icon} />}
        <span className={styles.message}>{children}</span>
        {actionText && <button type="button" className={styles.action} onClick={onAction}>{actionText}</button>}
      </div>
      {onClose && <ButtonIcon icon="cancel-01" label="Fermer" appearance="ghost" color="neutral" size="sm" className={styles.close} onClick={onClose} />}
    </div>
  );
}
