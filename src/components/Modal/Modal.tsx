import { cloneElement, isValidElement, useCallback, useEffect, useId, useRef, useState, type MouseEvent as RMouseEvent, type ReactElement, type ReactNode } from 'react';
import { ButtonIcon } from '../Button/Button';
import styles from './Modal.module.css';

export interface ModalProps {
  /** Ouverture pilotée par l'app. Sans `open`, la modale s'ouvre avec son `trigger`. */
  open?: boolean;
  onClose?: () => void;
  /** Appelé à chaque ouverture et fermeture (avec ou sans `open`). */
  onOpenChange?: (open: boolean) => void;
  /** Bouton qui ouvre la modale (D-074) : il reçoit onClick et aria-haspopup. Le focus y revient à la fermeture. */
  trigger?: ReactElement;
  defaultOpen?: boolean;
  /** Pour `footer` : une fonction reçoit `close` (ex. bouton Annuler). */
  title: ReactNode;
  /** Une phrase : ce qui se passe et ce que la personne peut faire. */
  description?: ReactNode;
  /** Contenu libre (emplacement `modalContent`). Une fonction reçoit `close`. */
  children?: ReactNode | ((close: () => void) => ReactNode);
  /** Boutons du pied, de gauche à droite : secondaire puis principal (ou danger). Une fonction reçoit `close`. */
  footer?: ReactNode | ((close: () => void) => ReactNode);
  /** En-tête libre (D-074) à la place du titre et de la description affichés ; `title` reste le nom accessible. */
  header?: ReactNode;
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
export function Modal({ open: openProp, onClose: onCloseProp, onOpenChange, trigger, defaultOpen = false, title, description, header, children, footer, divider, hasClose = true, width = 500, closeLabel = 'Fermer', centered }: ModalProps) {
  const tid = useId();
  const panel = useRef<HTMLDivElement>(null);
  const [inner, setInner] = useState(defaultOpen);
  const open = openProp ?? inner;
  const onClose = useCallback(() => { if (openProp === undefined) setInner(false); onOpenChange?.(false); onCloseProp?.(); }, [openProp, onOpenChange, onCloseProp]);
  const t = trigger as ReactElement<{ onClick?: (e: RMouseEvent) => void; 'aria-haspopup'?: string }> | undefined;
  const triggerEl = t && isValidElement(t) ? cloneElement(t, {
    onClick: (e: RMouseEvent) => { t.props.onClick?.(e); if (e.defaultPrevented) return; if (openProp === undefined) setInner(true); onOpenChange?.(true); },
    'aria-haspopup': 'dialog',
  }) : null;
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); prev?.focus?.(); };
  }, [open, onClose]);
  if (!open) return triggerEl;
  const body = typeof children === 'function' ? children(onClose) : children;
  const foot = typeof footer === 'function' ? footer(onClose) : footer;
  return (
    <>
    {triggerEl}
    <div className={styles.overlay} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>
      <div ref={panel} role="dialog" aria-modal="true" aria-labelledby={tid} tabIndex={-1} className={[styles.modal, divider && styles.divider, centered && styles.centered].filter(Boolean).join(' ')} style={{ width }}>
        {hasClose && <ButtonIcon icon="cancel-01" label={closeLabel} appearance="subtle" color="neutral" size="md" className={styles.close} onClick={onClose} />}
        {header ? <div className={styles.head}><h2 id={tid} className={styles.srOnly}>{title}</h2>{header}</div> : (
          <div className={styles.head}>
            <h2 id={tid} className={styles.title}>{title}</h2>
            {description && <p className={styles.desc}>{description}</p>}
          </div>
        )}
        {body && <div className={styles.body}>{body}</div>}
        {foot && <div className={styles.foot}>{foot}</div>}
      </div>
    </div>
    </>
  );
}
