import type { ReactNode } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import styles from './ConfirmModal.module.css';

export interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: ReactNode;
  description?: ReactNode;
  /** Libellé du bouton principal : le verbe de l'action (« Supprimer », « Publier »). */
  confirmLabel: string;
  cancelLabel?: string;
  /** Action destructive : bouton rouge. */
  danger?: boolean;
  /** Croix en haut à droite (hasClose), neutre fond léger. */
  hasClose?: boolean;
  /** Illustration au-dessus du titre (hasToldies). */
  illustration?: ReactNode;
  loading?: boolean;
}

/** ConfirmModal (7950:1584) : sur ModalBase, 500 de large, titre H4 et description centrés, Annuler en neutre tertiaire. */
export function ConfirmModal({ open, onClose, onConfirm, title, description, confirmLabel, cancelLabel = 'Annuler', danger, hasClose = false, illustration, loading }: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      hasClose={hasClose}
      centered
      title={<span className={styles.titleWrap}>{illustration && <span className={styles.illu}>{illustration}</span>}{title}</span>}
      description={description}
      footer={
        <div className={styles.actions}>
          <Button color="neutral" variant="tertiary" onClick={onClose}>{cancelLabel}</Button>
          <Button color={danger ? 'danger' : 'brand'} onClick={onConfirm} disabled={loading}>{confirmLabel}</Button>
        </div>
      }
    />
  );
}
