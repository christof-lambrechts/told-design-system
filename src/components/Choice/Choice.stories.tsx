import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Checkbox, Radio, Switch } from './Choice';

const meta = {
  title: 'Composants/Saisie et choix/Checkbox, Radio, Switch',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          'Validés ✅ dans Figma. **Switch** = effet immédiat ; **Checkbox** = choix validés ensemble ; **Radio** = un choix parmi 2 à 5. `boxed` pour les listes de réglages ; `descriptionPlacement="inline"` pour une ligne tronquée, bloc deux fois moins haut.',
      },
    },
  },
  args: {
    label: 'Inclure les réponses partielles',
    description: 'Les réponses non terminées comptent dans les résultats.',
    boxed: false,
    disabled: false,
    error: false,
  },
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

const col = { display: 'flex', flexDirection: 'column' as const, gap: 16, width: 360 };

export const CaseACocher: Story = {
  name: 'Checkbox',
  render: (a) => {
    const [on, setOn] = useState(true);
    return (
      <div style={col}>
        <Checkbox {...a} checked={on} onChange={(e) => setOn(e.target.checked)} />
        <Checkbox {...a} label="Non cochée" description={undefined} />
        <Checkbox {...a} label="En erreur" description="Cochez pour continuer." error />
        <Checkbox {...a} label="Désactivée" description={undefined} disabled defaultChecked />
        <Checkbox {...a} label="Taille lg" description={undefined} size="lg" />
      </div>
    );
  },
};

export const Encadre: Story = {
  name: 'Encadré (boxed)',
  render: (a) => {
    const [on, setOn] = useState(true);
    return (
      <div style={col}>
        <Checkbox {...a} boxed checked={on} onChange={(e) => setOn(e.target.checked)} />
        <Checkbox {...a} boxed label="Afficher le logo Told" description="En bas du bloc, discret." descriptionPlacement="inline" />
        <Switch {...a} boxed label="Recevoir les alertes par e-mail" description="Un résumé des nouvelles réponses." defaultChecked />
      </div>
    );
  },
};

export const Radios: Story = {
  name: 'Radio',
  render: () => {
    const [v, setV] = useState('semaine');
    const opts = [
      ['jour', 'Chaque jour', 'Un résumé quotidien à 9 h.'],
      ['semaine', 'Une fois par semaine', 'Un récapitulatif chaque lundi.'],
      ['jamais', 'Jamais', undefined],
    ] as const;
    return (
      <div style={col} role="radiogroup" aria-label="Fréquence">
        {opts.map(([id, label, desc]) => (
          <Radio key={id} name="freq" value={id} label={label} description={desc} checked={v === id} onChange={() => setV(id)} />
        ))}
      </div>
    );
  },
};

export const Interrupteurs: Story = {
  name: 'Switch',
  render: () => {
    const [a, setA] = useState(true);
    const [b, setB] = useState(false);
    return (
      <div style={col}>
        <Switch size="sm" label="Taille sm" checked={a} onChange={(e) => setA(e.target.checked)} />
        <Switch label="Recevoir les alertes par e-mail" description="Un résumé des nouvelles réponses." checked={b} onChange={(e) => setB(e.target.checked)} />
        <Switch size="lg" label="Taille lg" defaultChecked />
        <Switch label="Interrupteur à droite" checkPlacement="right" defaultChecked />
        <Switch label="Désactivé" disabled />
      </div>
    );
  },
};
