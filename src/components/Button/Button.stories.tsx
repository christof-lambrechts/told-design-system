import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, ButtonIcon, type ButtonColor, type ButtonSize, type ButtonType } from './Button';
import { iconNames } from '../Icon/Icon';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { CopyField } from '../CopyField/CopyField';
import { GroupTab } from '../Tabs/Tabs';

const meta = {
  title: 'Composants/Actions/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'Bouton d’action, validé ✅ dans Figma (`2754:16796`). Une seule primary par vue. Désactivé = opacité 38 %. Les couleurs viennent des jetons `Button/Button<Couleur>/<style>/*` (primary = fill, secondary = outline, tertiary = subtle, ghost = ghost), clairs et sombres.',
      },
    },
  },
  args: { children: 'Libellé', color: 'brand', variant: 'primary', size: 'md', disabled: false },
  argTypes: {
    color: { control: 'inline-radio', options: ['brand', 'neutral', 'danger', 'success', 'warning', 'purple'] },
    variant: { control: 'inline-radio', options: ['primary', 'primary-outline', 'secondary-outline', 'tertiary', 'ghost'] },
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] },
    iconLeft: { control: 'select', options: [undefined, ...iconNames] },
    iconRight: { control: 'select', options: [undefined, ...iconNames] },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { name: 'À régler' };

const row = { display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' as const };
const col = { display: 'flex', flexDirection: 'column' as const, gap: 16 };

export const Types: Story = {
  render: (a) => (
    <div style={row}>
      {(['primary', 'primary-outline', 'secondary-outline', 'tertiary', 'ghost'] as ButtonType[]).map((t) => (
        <Button key={t} {...a} variant={t}>
          {t[0].toUpperCase() + t.slice(1)}
        </Button>
      ))}
    </div>
  ),
};

export const Couleurs: Story = {
  render: (a) => (
    <div style={col}>
      {(['brand', 'neutral', 'danger', 'success', 'warning', 'purple'] as ButtonColor[]).map((c) => (
        <div key={c} style={row}>
          {(['primary', 'primary-outline', 'secondary-outline', 'tertiary', 'ghost'] as ButtonType[]).map((t) => (
            <Button key={t} {...a} color={c} variant={t}>
              {c}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Tailles: Story = {
  render: (a) => (
    <div style={row}>
      {(['xs', 'sm', 'md', 'lg'] as ButtonSize[]).map((s) => (
        <Button key={s} {...a} size={s} iconLeft="add-01">
          Taille {s}
        </Button>
      ))}
    </div>
  ),
};

export const AvecIcones: Story = {
  name: 'Avec icônes',
  args: { iconLeft: 'add-01', children: 'Créer un scénario' },
  render: (a) => (
    <div style={row}>
      <Button {...a} />
      <Button {...a} variant="primary-outline" iconLeft={undefined} iconRight="arrow-right-01">
        Continuer
      </Button>
      <Button {...a} color="danger" variant="ghost" iconLeft="delete-02">
        Supprimer
      </Button>
    </div>
  ),
};

export const Desactive: Story = {
  name: 'Désactivé',
  args: { disabled: true },
  render: (a) => (
    <div style={row}>
      <Button {...a} />
      <Button {...a} variant="primary-outline" />
      <Button {...a} variant="ghost" />
    </div>
  ),
};

export const BoutonIcone: StoryObj<typeof ButtonIcon> = {
  name: 'ButtonIcon',
  parameters: {
    docs: { description: { story: 'Bouton sans libellé (`5867:56798`) : `appearance` fill | outline | ghost | subtle. Toujours un `label` pour les lecteurs d’écran.' } },
  },
  render: () => (
    <div style={col}>
      {(['fill', 'outline', 'subtle', 'ghost'] as const).map((ap) => (
        <div key={ap} style={row}>
          {(['xs', 'sm', 'md', 'lg'] as ButtonSize[]).map((s) => (
            <ButtonIcon key={s} icon={ap === 'ghost' ? 'more-horizontal' : 'add-01'} label="Ajouter" appearance={ap} size={s} color="brand" />
          ))}
          <ButtonIcon icon="delete-02" label="Supprimer" appearance={ap} color="danger" />
          <ButtonIcon icon="search-01" label="Rechercher" appearance={ap} color="neutral" />
        </div>
      ))}
    </div>
  ),
};

/** color=ai (action IA, contour dégradé) et color=rec (démarrer un enregistrement). */
export const IaEtEnregistrement: StoryObj = {
  name: 'IA et enregistrement',
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['xs', 'sm', 'md', 'lg'] as const).map((s) => (
        <div key={s} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Button color="ai" size={s}>Générer avec l’IA</Button>
          <Button color="rec" size={s}>Enregistrer</Button>
        </div>
      ))}
    </div>
  ),
};

/** Échelle des contrôles (21/11) : sm 28, md 36, lg 44. Bouton, bouton icône, champ, liste et champ à copier de même taille s'alignent au pixel. */
export const HauteursAlignees: StoryObj = {
  name: 'Hauteurs alignées',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <div key={s} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Input size={s} placeholder={`Input ${s}`} aria-label="Champ" />
          <Select size={s} aria-label="Liste" options={[{ value: 'a', label: `Select ${s}` }]} value="a" onChange={() => {}} />
          {s !== 'sm' && <div style={{ width: 240 }}><CopyField size={s} value="https://told.club/s/avis" /></div>}
          <Button size={s}>Button {s}</Button>
          <ButtonIcon size={s} icon="add-01" label="Ajouter" />
          {s !== 'sm' && <GroupTab size={s} value="a" onChange={() => {}} items={[{ value: 'a', label: 'Paysage' }, { value: 'b', label: 'Vertical' }]} />}
        </div>
      ))}
    </div>
  ),
};
