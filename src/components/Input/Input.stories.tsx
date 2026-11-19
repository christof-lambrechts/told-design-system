import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input, SearchBar, TextArea } from './Input';

const col = { display: 'flex', flexDirection: 'column', gap: 16, width: 420 } as const;

const meta = { title: 'Composants/Saisie et choix/Champs', component: Input } satisfies Meta<typeof Input>;
export default meta;

export const Champ: StoryObj<typeof Input> = {
  name: 'Input',
  args: { label: 'Libellé', placeholder: 'Saisir une valeur', size: 'md', appearance: 'default' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] }, appearance: { control: 'inline-radio', options: ['default', 'flat', 'light'] } },
  render: (a) => <div style={{ width: 420 }}><Input {...a} /></div>,
};

export const Etats: StoryObj = {
  name: 'Input · états et styles',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 300px)', gap: 24 }}>
      {(['default', 'flat', 'light'] as const).map((a) => (
        <div key={a} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input appearance={a} label="Libellé" placeholder="Saisir une valeur" />
          <Input appearance={a} label="Nom" defaultValue="Marie Dupont" required />
          <Input appearance={a} label="E-mail" defaultValue="marie@" error="Ce champ est obligatoire" />
          <Input appearance={a} label="Désactivé" placeholder="Indisponible" disabled helper="Texte d’aide" />
        </div>
      ))}
    </div>
  ),
};

export const Tailles: StoryObj = {
  render: () => (
    <div style={col}>
      <Input size="sm" label="Petit (32)" placeholder="Saisir une valeur" />
      <Input size="md" label="Moyen (40)" placeholder="Saisir une valeur" iconLeft="link-03" />
      <Input size="lg" label="Grand (48)" placeholder="Saisir une valeur" />
    </div>
  ),
};

export const Recherche: StoryObj = {
  name: 'SearchBar',
  render: () => (
    <div style={col}>
      <SearchBar size="sm" />
      <SearchBar />
      <SearchBar size="lg" shortcut={false} placeholder="Rechercher un scénario" />
    </div>
  ),
};

export const Zone: StoryObj = {
  name: 'TextArea',
  render: () => (
    <div style={col}>
      <TextArea label="Libellé" placeholder="Décrivez votre besoin en quelques mots" />
      <TextArea label="Neutre" tone="neutral" defaultValue="Merci pour votre retour !" helper="160 caractères maximum" />
      <TextArea label="Erreur" error="Ce champ est obligatoire" />
    </div>
  ),
};

export const Compteur: StoryObj = {
  name: 'Avec compteur',
  render: () => (
    <div style={col}>
      <Input label="Titre de l’étape" defaultValue="Clique sur Nouvelle facture" counter="27 / 60" />
      <TextArea label="Texte de l’infobulle" defaultValue="Renseigne le client, puis ajoute une ligne par prestation." counter="94 / 280" />
      <TextArea label="Texte de l’infobulle" defaultValue="Un texte trop long…" counter="312 / 280" warning helper="Au-delà de 280 caractères, l’infobulle devient difficile à lire." />
    </div>
  ),
};
