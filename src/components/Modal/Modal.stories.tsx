import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

const meta = { title: 'Composants/Modales/Modal', component: Modal, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Modal>;
export default meta;

function Demo({ divider, danger }: { divider?: boolean; danger?: boolean }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ minHeight: 560, padding: 24 }}>
      <Button onClick={() => setOpen(true)}>Ouvrir</Button>
      <Modal open={open} onClose={() => setOpen(false)} divider={divider}
        title={danger ? 'Supprimer ce Told ?' : 'Renommer le Told'}
        description={danger ? 'Les réponses déjà reçues seront supprimées. Cette action est définitive.' : 'Le nom n’est visible que par votre équipe.'}
        footer={<>
          <Button color="neutral" variant="tertiary" onClick={() => setOpen(false)}>Annuler</Button>
          <Button color={danger ? 'danger' : 'brand'} onClick={() => setOpen(false)}>{danger ? 'Supprimer' : 'Enregistrer'}</Button>
        </>}>
        {!danger && <Input label="Nom" defaultValue="Votre avis" />}
      </Modal>
    </div>
  );
}

export const Defaut: StoryObj = { name: 'Modal', render: () => <Demo /> };
export const AvecFilets: StoryObj = { name: 'Avec filets', render: () => <Demo divider /> };
export const Danger: StoryObj = { render: () => <Demo danger /> };

export const AvecDeclencheur: StoryObj = {
  name: 'Ouverte par son bouton (D-074)',
  render: () => (
    <Modal title="Renommer le Told" trigger={<Button>Renommer</Button>}
      header={<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><strong style={{ font: 'var(--font-weight-semibold) 18px/26px var(--font-family-heading)' }}>Renommer le Told</strong></div>}
      footer={(close) => <><Button color="neutral" variant="tertiary" onClick={close}>Annuler</Button><Button onClick={close}>Renommer</Button></>}>
      <Input label="Nom" defaultValue="Satisfaction après une action" />
    </Modal>
  ),
};
