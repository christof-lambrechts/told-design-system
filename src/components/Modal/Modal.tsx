import { useEffect, useId, useRef, type ReactNode } from 'react';
import { ButtonIcon } from '../Button/Button';
import styles from './Modal.module.css';

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title: ReactNode;
  /** Une phrase : ce qui se passe et ce que la personne peut faire. */
  description?: ReactNode;
  /** Contenu libre (emplacement `modalContent`). */
  children?: ReactNode;
  /** Boutons du pied, de gauche à droite : secondaire puis principal (ou danger). */
  footer?: ReactNode;
  /** Filets sous l'en-tête et au-dessus du pied (variante `divider=true`). */
  divider?: boolean;
  /** Croix en haut à droite (`hasClose`). */
  hasClose?: boolean;
  width?: number;
  closeLabel?: string;
  /** Titre, description et pied centrés (confirmation). */
  centered?: boolean;
}

/** Modal (ModalBase 6234:9287) : fenêtre de 500, rayon 12, en-tête 40/40/20, contenu 12/40, pied 20/40/40. Échap et clic sur le voile ferment. */
export function Modal({ open, onClose, title, description, children, footer, divider, hasClose = true, width = 500, closeLabel = 'Fermer', centered }: ModalProps) {
  const tid = useId();
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); prev?.focus?.(); };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className={styles.overlay} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>
      <div ref={panel} role="dialog" aria-modal="true" aria-labelledby={tid} tabIndex={-1} className={[styles.modal, divider && styles.divider, centered && styles.centered].filter(Boolean).join(' ')} style={{ width }}>
        {hasClose && <ButtonIcon icon="cancel-01" label={closeLabel} appearance="subtle" color="neutral" size="md" className={styles.close} onClick={onClose} />}
        <div className={styles.head}>
          <h2 id={tid} className={styles.title}>{title}</h2>
          {description && <p className={styles.desc}>{description}</p>}
        </div>
        {children && <div className={styles.body}>{children}</div>}
        {footer && <div className={styles.foot}>{footer}</div>}
      </div>
    </div>
  );
}
