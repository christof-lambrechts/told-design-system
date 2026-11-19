import type { HTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import styles from './Ai.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export interface AiTagProps extends HTMLAttributes<HTMLSpanElement> {
  /** xs 16 (vignettes), sm 20 (à côté d'un titre). */
  size?: 'xs' | 'sm';
  /** Libellé, « IA » par défaut. */
  children?: ReactNode;
  /** `false` masque l'étoile (hasIcon). */
  icon?: boolean;
}

/** AiTag (8792:103308) : contenu écrit par l'IA et pas encore relu. Violet, non cliquable. Pour dire quoi faire, AiNotice. */
export function AiTag({ size = 'xs', children = 'IA', icon = true, className, ...rest }: AiTagProps) {
  return (
    <span className={cx(styles.tag, styles[size], className)} {...rest}>
      {icon && <Icon name="ai-magic" size={size === 'xs' ? 10 : 12} variant="solid" className={styles.tagIcon} />}
      {children}
    </span>
  );
}

export interface AiNoticeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** review : texte écrit par l'IA, à relire ; generating : l'IA travaille ; done : résultat avec Annuler. */
  state?: 'review' | 'generating' | 'done';
  children: ReactNode;
  /** Lien d'action (Voir, Arrêter, Annuler). */
  actionLabel?: string;
  onAction?: () => void;
  /** Second lien (Retirer ces textes). */
  secondaryLabel?: string;
  onSecondary?: () => void;
}

/** AiNotice (8792:103369) : bandeau violet d'une ligne. Une seule phrase, au plus deux liens. */
export function AiNotice({ state = 'review', children, actionLabel, onAction, secondaryLabel, onSecondary, className, ...rest }: AiNoticeProps) {
  return (
    <div role={state === 'generating' ? 'status' : undefined} aria-live={state === 'generating' ? 'polite' : undefined} className={cx(styles.notice, className)} {...rest}>
      {state === 'generating' ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : (
        <Icon name={state === 'done' ? 'checkmark-circle-02' : 'ai-magic'} size={14} variant="solid" className={styles.noticeIcon} />
      )}
      <span className={styles.message}>{children}</span>
      {actionLabel && <button type="button" className={styles.link} onClick={onAction}>{actionLabel}</button>}
      {secondaryLabel && <button type="button" className={styles.link} onClick={onSecondary}>{secondaryLabel}</button>}
    </div>
  );
}
