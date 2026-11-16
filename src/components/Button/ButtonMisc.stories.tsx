import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonDropdown, ButtonGradient, ButtonLink } from './ButtonMisc';

const row = { display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' } as const;
const col = { display: 'flex', flexDirection: 'column', gap: 16 } as const;

const meta = { title: 'Composants/Actions/Autres boutons', component: ButtonGradient } satisfies Meta<typeof ButtonGradient>;
export default meta;

export const Degrade: StoryObj<typeof ButtonGradient> = {
  name: 'ButtonGradient',
  args: { children: 'Voir les offres', appearance: 'full', size: 'md' },
  argTypes: { appearance: { control: 'inline-radio', options: ['full', 'outline', 'flat', 'light'] }, size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] } },
};

export const DegradeStyles: StoryObj = {
  name: 'ButtonGradient · styles et tailles',
  render: () => (
    <div style={col}>
      {(['lg', 'md', 'sm', 'xs'] as const).map((s) => (
        <div key={s} style={row}>
          {(['full', 'outline', 'flat', 'light'] as const).map((a) => <ButtonGradient key={a} appearance={a} size={s}>Voir les offres</ButtonGradient>)}
          <ButtonGradient size={s} disabled>Voir les offres</ButtonGradient>
        </div>
      ))}
    </div>
  ),
};

export const Menu: StoryObj = {
  name: 'ButtonDropdown',
  render: () => (
    <div style={col}>
      {(['fill', 'outline', 'flat', 'light'] as const).map((a) => (
        <div key={a} style={row}>
          {(['lg', 'md', 'sm', 'xs'] as const).map((s) => <ButtonDropdown key={s} appearance={a} size={s} iconLeft="add-01">Ajouter</ButtonDropdown>)}
          <ButtonDropdown appearance={a} open>Ouvert</ButtonDropdown>
        </div>
      ))}
    </div>
  ),
};

export const Lien: StoryObj = {
  name: 'ButtonLink',
  render: () => (
    <div style={col}>
      <div style={row}>
        <ButtonLink size="lg">Voir les résultats</ButtonLink>
        <ButtonLink>Voir les résultats</ButtonLink>
        <ButtonLink size="sm">Voir les résultats</ButtonLink>
        <ButtonLink color="purple">Passer à Pro</ButtonLink>
        <ButtonLink disabled>Indisponible</ButtonLink>
      </div>
      <p className="text-body-14" style={{ margin: 0 }}>
        Dans un texte : <ButtonLink padding={false} size="sm" iconRight={null}>modifier le ciblage</ButtonLink> en un clic.
      </p>
    </div>
  ),
};
