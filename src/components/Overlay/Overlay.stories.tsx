import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover, Menu, TooltipTrigger, Accordion, AccordionItem, Toaster, toast, SidePanel, ScrollArea } from './Overlay';
import { Button, ButtonIcon } from '../Button/Button';
import { DropdownItem } from '../Select/Select';
import { Switch } from '../Choice/Choice';
import { ProjectSwitcher } from '../AppSidebar/AppSidebar';
import { TruncatedText } from '../DataTable/DataTable';

const meta = { title: 'Composants/Calques/Popover, Menu, Tooltip', component: Popover, parameters: { layout: 'padded' } } satisfies Meta<typeof Popover>;
export default meta;
type S = StoryObj;

export const PopoverAncre: S = {
  name: 'Popover ancré',
  render: () => (
    <div style={{ display: 'flex', gap: 16, padding: 40 }}>
      <Popover aria-label="Rapport" width={280} trigger={<Button variant="secondary-outline" iconLeft="files-01">Rapport global</Button>}>
        {(close) => (
          <div style={{ display: 'grid', gap: 12, padding: 12 }}>
            <strong>Rapports enregistrés</strong>
            <Switch label="Avec la langue" checkPlacement="right" />
            <Button size="sm" onClick={close}>Appliquer</Button>
          </div>
        )}
      </Popover>
    </div>
  ),
};

export const MenuAvecDeclencheur: S = {
  name: 'Menu avec son déclencheur',
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 40, alignItems: 'center' }}>
      <Menu aria-label="Actions" trigger={<ButtonIcon icon="more-horizontal" label="Plus d'actions" appearance="ghost" size="sm" />}>
        <DropdownItem icon="pencil-edit-02">Renommer</DropdownItem>
        <DropdownItem icon="copy-01">Dupliquer</DropdownItem>
        <DropdownItem icon="archive-02">Archiver</DropdownItem>
        <DropdownItem icon="delete-02" tone="danger">Supprimer</DropdownItem>
      </Menu>
      <div style={{ width: 240 }}>
        <Menu aria-label="Projets" placement="bottom-start" trigger={<ProjectSwitcher project="Told" organization="Evolt" />}>
          <DropdownItem selected>Told</DropdownItem>
          <DropdownItem>Told Record</DropdownItem>
        </Menu>
      </div>
    </div>
  ),
};

export const InfobulleAuSurvol: S = {
  name: 'Infobulle au survol',
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 60, alignItems: 'center' }}>
      <TooltipTrigger content="Archiver le Told"><ButtonIcon icon="archive-02" label="Archiver" appearance="ghost" /></TooltipTrigger>
      <TooltipTrigger content="Quelle est la probabilité que vous recommandiez Told à un collègue ou un ami ?" placement="bottom">
        <span tabIndex={0} style={{ display: 'block', width: 220 }}><TruncatedText>Quelle est la probabilité que vous recommandiez Told à un collègue ou un ami ?</TruncatedText></span>
      </TooltipTrigger>
    </div>
  ),
};

export const Accordeon: S = {
  name: 'Accordion',
  render: () => (
    <div style={{ width: 480 }}>
      <Accordion defaultOpen={['a']}>
        <AccordionItem id="a" icon="clock-01" title="Déclenchement" description="Quand le Told s'affiche">Après 5 secondes sur la page.</AccordionItem>
        <AccordionItem id="b" title="Ciblage" description="Qui voit le Told">Toute l'audience.</AccordionItem>
        <AccordionItem id="c" title="Fréquence">Une seule fois par personne.</AccordionItem>
      </Accordion>
    </div>
  ),
};

export const FileDeToasts: S = {
  name: 'File de toasts',
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Toaster />
      <Button onClick={() => toast({ type: 'success', title: 'Rapport enregistré' })}>Succès</Button>
      <Button variant="secondary-outline" onClick={() => toast({ type: 'error', title: 'Échec de l’export', description: 'Réessaie dans un instant.', duration: 0 })}>Erreur qui reste</Button>
      <Button variant="secondary-outline" onClick={() => toast({ title: 'Told archivé', action: { label: 'Annuler', onClick: () => toast('Told restauré') } })}>Avec action</Button>
    </div>
  ),
};

export const PanneauLateral: S = {
  name: 'SidePanel',
  render: function Render() {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Ouvrir le panneau</Button>
        <SidePanel open={open} onClose={() => setOpen(false)} title="Répondant #1042" description="Réponses du 24/11"
          footer={<><Button variant="secondary-outline" onClick={() => setOpen(false)}>Fermer</Button><Button>Exporter</Button></>}>
          {Array.from({ length: 20 }, (_, i) => <p key={i}>Réponse {i + 1} : très satisfait.</p>)}
        </SidePanel>
      </>
    );
  },
};

export const ZoneQuiDefile: S = {
  name: 'ScrollArea',
  render: () => (
    <div style={{ width: 280, border: '1px solid var(--neutral-border-default)', borderRadius: 12 }}>
      <ScrollArea maxHeight={200} aria-label="Colonnes">
        <div style={{ padding: 8 }}>{Array.from({ length: 24 }, (_, i) => <div key={i} style={{ padding: '6px 8px' }}>Colonne {i + 1}</div>)}</div>
      </ScrollArea>
    </div>
  ),
};
