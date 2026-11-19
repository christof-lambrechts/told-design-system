import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StepGroup, StepList, StepThumb } from './Steps';
import { Button } from '../Button/Button';

const meta = { title: 'Composants/Éditeur de démo/Étapes', component: StepList } satisfies Meta<typeof StepList>;
export default meta;

const shot = (hue: number) => `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100"><rect width="160" height="100" fill="hsl(${hue} 70% 94%)"/><rect x="0" width="30" height="100" fill="hsl(${hue} 40% 86%)"/><rect x="40" y="14" width="70" height="8" rx="3" fill="#cfd6de"/><rect x="40" y="30" width="100" height="40" rx="4" fill="#fff"/><rect x="112" y="78" width="34" height="10" rx="3" fill="#1a63ff"/></svg>`)}`;

export const Colonne: StoryObj = {
  name: 'StepList',
  render: () => {
    const [sel, setSel] = useState(1);
    const thumb = (n: number, extra: Partial<Parameters<typeof StepThumb>[0]> = {}) => (
      <StepThumb key={n} number={n} label={`Étape ${n}`} src={shot(220 + n * 8)} selected={sel === n} onSelect={() => setSel(n)} {...extra} />
    );
    return (
      <div style={{ width: 234 }}>
        <StepList
          label="Étapes · 9"
          warning="1 étape à compléter"
          footer={<>
            <Button color="neutral" variant="secondary-outline" size="sm" fullWidth iconLeft="dot">Enregistrer la suite</Button>
            <Button color="neutral" variant="secondary-outline" size="sm" fullWidth iconLeft="add-01">Ajouter un écran</Button>
          </>}
        >
          <StepGroup badge="Slide 1" count={9}>
            {thumb(1)}{thumb(2, { ai: true })}
            <StepThumb number={3} label="Étape 3, à compléter" warning="À compléter" onSelect={() => setSel(3)} selected={sel === 3} />
            {thumb(4, { ai: true })}{thumb(5)}{thumb(6)}{thumb(7)}{thumb(8)}{thumb(9)}
          </StepGroup>
          <StepGroup badge="Slide 2" title="Exporte en CSV" defaultExpanded={false} count={3}>{thumb(10)}</StepGroup>
        </StepList>
      </div>
    );
  },
};
