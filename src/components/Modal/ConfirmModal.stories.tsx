import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConfirmModal } from './ConfirmModal';
import { Button } from '../Button/Button';

const meta = { title: 'Composants/Modales/ConfirmModal', component: ConfirmModal } satisfies Meta<typeof ConfirmModal>;
export default meta;

export const Confirmation: StoryObj = {
  name: 'ConfirmModal',
  render: () => {
    const [open, setOpen] = useState(true);
    const [danger, setDanger] = useState(true);
    return (
      <>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button onClick={() => { setDanger(true); setOpen(true); }} color="danger">Supprimer</Button>
          <Button onClick={() => { setDanger(false); setOpen(true); }}>Publier</Button>
        </div>
        <ConfirmModal
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
          danger={danger}
          hasClose
          title={danger ? 'Supprimer cette démo ?' : 'Publier les changements ?'}
          description={danger ? 'Le lien et l’intégration cesseront de fonctionner. Cette action est définitive.' : 'Le lien et l’intégration afficheront la nouvelle version, sans changer d’adresse.'}
          confirmLabel={danger ? 'Supprimer' : 'Publier'}
        />
      </>
    );
  },
};
