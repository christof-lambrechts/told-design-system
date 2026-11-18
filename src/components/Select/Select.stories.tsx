import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Select, DropdownMenu, DropdownItem } from './Select';

const meta = { title: 'Composants/Saisie et choix/Select', component: Select, parameters: { layout: 'padded' } } satisfies Meta<typeof Select>;
export default meta;

const opts = [
  { value: 'widget', label: 'Widget', boxedIcon: 'format-widget' as const },
  { value: 'modal', label: 'Modale', boxedIcon: 'format-modale' as const },
  { value: 'banner', label: 'Bannière', boxedIcon: 'format-banniere' as const },
  { value: 'tooltip', label: 'Infobulle', boxedIcon: 'format-infobulle' as const, disabled: true },
];

function Demo(props: Partial<React.ComponentProps<typeof Select>>) {
  const [v, setV] = useState<string | undefined>(props.value);
  return <div style={{ width: 320, minHeight: 220 }}><Select label="Format" options={opts} {...props} value={v} onChange={setV} /></div>;
}

export const Defaut: StoryObj = { name: 'Select', render: () => <Demo placeholder="Choisir un format" /> };
export const Tailles: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      {(['sm', 'md', 'lg'] as const).map((s) => <Demo key={s} size={s} value="widget" label={`Taille ${s}`} />)}
    </div>
  ),
};
export const Erreur: StoryObj = { render: () => <Demo error="Choisissez un format." /> };
export const Liste: StoryObj = {
  name: 'Liste (DropdownItem)',
  render: () => (
    <DropdownMenu style={{ width: 260 }}>
      <DropdownItem icon="pencil-edit-02" shortcut="⌘ E">Renommer</DropdownItem>
      <DropdownItem icon="copy-01" selected>Dupliquer</DropdownItem>
      <DropdownItem icon="share-07" description="Lien public en lecture">Partager</DropdownItem>
      <DropdownItem icon="delete-02" tone="danger">Supprimer</DropdownItem>
    </DropdownMenu>
  ),
};
