import type { ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import { ButtonIcon } from '../Button/Button';
import { ButtonLink } from '../Button/ButtonMisc';
import styles from './Alert.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export type AlertType = 'brand' | 'warning' | 'error' | 'success' | 'neutral' | 'neutral-light' | 'neutral-dark';

export interface AlertProps {
  /** Couleur du message (Figma `type`). */
  type?: AlertType;
  /** lg (défaut) : marges 14 / 16, rayon 12 ; sm : marges 10 / 12, rayon 10. */
  size?: 'sm' | 'lg';
  title?: ReactNode;
  /** Description (Body/14/Regular, teinte du type). */
  children?: ReactNode;
  /** Icône du type par défaut ; `false` pour aucune, ou une autre icône. */
  icon?: IconName | false;
  /** Lien d'action sous le texte (hasButtonLink), ex. « Publier les modifications ». */
  actionText?: string;
  onAction?: () => void;
  /** Boutons sous le texte (hasActionButtons), ex. deux Button sm. */
  actions?: ReactNode;
  /** Croix de fermeture (hasCloseButton). */
  onClose?: () => void;
  closeLabel?: string;
  className?: string;
}

const defaultIcon: Record<AlertType, IconName> = {
  brand: 'information-circle', warning: 'alert-02', error: 'alert-02', success: 'checkmark-circle-02',
  neutral: 'information-circle', 'neutral-light': 'information-circle', 'neutral-dark': 'information-circle',
};

/**
 * Alert (6259:87310) : message dans le contenu (dans une carte, sous un champ, dans un panneau), aligné à gauche,
 * icône, titre, description, lien ou boutons d'action. À ne pas confondre avec Banner, bandeau pleine largeur en haut d'une page.
 */
export function Alert({ type = 'brand', size = 'lg', title, children, icon, actionText, onAction, actions, onClose, closeLabel = 'Fermer', className }: AlertProps) {
  const ic = icon === false ? null : (icon ?? defaultIcon[type]);
  const role = type === 'error' || type === 'warning' ? 'alert' : 'status';
  return (
    <div role={role} data-type={type} className={cx(styles.alert, styles[size], className)}>
      {ic && <span className={styles.icon} aria-hidden="true"><Icon name={ic} size={14} variant="solid" /></span>}
      <div className={styles.body}>
        {(title || children) && (
          <div className={styles.text}>
            {title && <p className={styles.title}>{title}</p>}
            {children && <div className={styles.desc}>{children}</div>}
          </div>
        )}
        {actionText && onAction && <ButtonLink size="sm" padding={false} iconRight={null} onClick={onAction}>{actionText}</ButtonLink>}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      {onClose && <ButtonIcon className={styles.close} icon="cancel-01" label={closeLabel} size="sm" appearance="ghost" color="neutral" onClick={onClose} />}
    </div>
  );
}
