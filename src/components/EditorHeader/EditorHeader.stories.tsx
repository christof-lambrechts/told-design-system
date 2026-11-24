import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { EditorChanges, EditorHeader, EditorSaveState, editorHeaderGhostButton, ButtonEditionMenu, EditorSteps, type EditorStep } from './EditorHeader';
import { ButtonGroup } from '../Button/ButtonGroup';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
import { AvatarGroup } from '../Avatar/AvatarGroup';
import { Button, ButtonIcon } from '../Button/Button';
import { ButtonTab } from '../Tabs/Tabs';
import { Badge } from '../Badge/Badge';

const meta = { title: 'Composants/Navigation/En-tête éditeur Record', component: EditorHeader, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof EditorHeader>;
export default meta;

const Header = ({ status }: { status: 'brouillon' | 'relecture' | 'publiee' }) => {
  const [t, setT] = useState('Créer une facture');
  const [tab, setTab] = useState('steps');
  const badge = { brouillon: <Badge dot color="light-gray">Brouillon</Badge>, relecture: <Badge dot color="orange">En relecture</Badge>, publiee: <Badge dot color="green">Publiée</Badge> }[status];
  return (
    <EditorHeader
      start={<><ButtonIcon icon="grid-view" label="Menu" size="sm" className={editorHeaderGhostButton} /><Breadcrumb theme="dark" items={[{ label: 'Inqom' }]} current={t} onRename={setT} /></>}
      end={<>
        <AvatarGroup surface="dark" people={[{ name: 'Camille Martin', color: 'teal' }, { name: 'Jonathan Morel', color: 'pink' }]} />
        <Button size="sm" color="neutral" variant="secondary-outline" className={editorHeaderGhostButton}>Demander une relecture</Button>
        <ButtonIcon icon="share-07" label="Partager" size="sm" className={editorHeaderGhostButton} />
        <Button size="sm" iconLeft="view" className={editorHeaderGhostButton}>Aperçu</Button>
        <Button size="sm">{status === 'publiee' ? 'Republier' : 'Publier'}</Button>
      </>}
      tabs={<>
        {[['steps', 'Étapes'], ['end', 'Écran de fin'], ['design', 'Design']].map(([id, l]) => <ButtonTab key={id} size="sm" appearance="ghost" selected={tab === id} onClick={() => setTab(id)}>{l}</ButtonTab>)}
      </>}
      status={<>
        <EditorSaveState>Enregistré il y a 12 s</EditorSaveState>
        {status === 'publiee' && <EditorChanges>3 changements non publiés</EditorChanges>}
        {badge}
      </>}
    />
  );
};

export const Brouillon: StoryObj = { render: () => <Header status="brouillon" /> };
export const Relecture: StoryObj = { render: () => <Header status="relecture" /> };
export const Publiee: StoryObj = { name: 'Publiée', render: () => <Header status="publiee" /> };

/** EditorHeaderRecord V1 (Figma 8749:4650) : barre noire seule, étapes au centre, présence, Aperçu, Publier. */
const V1 = ({ published }: { published: boolean }) => {
  const [t, setT] = useState('Nom de la démo');
  const [step, setStep] = useState<EditorStep>('build');
  const action = !published ? <Button size="sm" iconLeft="play">Publier</Button>
    : step === 'build' ? <Button size="sm" iconLeft="play">Publier les modifications</Button>
    : step === 'publish' ? <Button size="sm" color="danger" iconLeft="pause">Mettre en pause</Button> : null;
  return (
    <EditorHeader
      start={<><ButtonEditionMenu /><Breadcrumb theme="dark" items={[{ label: 'Mon projet' }]} current={t} onRename={setT} /></>}
      center={<EditorSteps value={step} onChange={setStep} published={published} />}
      end={<>
        <AvatarGroup surface="dark" people={[{ name: 'Claire Lemaire', color: 'teal' }, { name: 'Marc André', color: 'pink' }, { name: 'Jonathan S', color: 'orange' }]} />
        <ButtonGroup appearance="inverse">
          {step === 'analyze' && <Button size="sm" color="neutral" iconLeft="share-03">Partager</Button>}
          {step === 'analyze'
            ? <Button size="sm" color="neutral" iconLeft="download-05">Extraire</Button>
            : <Button size="sm" color="neutral" iconLeft="view">Aperçu</Button>}
        </ButtonGroup>
        {action}
      </>}
    />
  );
};
export const V1Brouillon: StoryObj = { name: 'V1 · brouillon', render: () => <V1 published={false} /> };
export const V1EnLigne: StoryObj = { name: 'V1 · en ligne', render: () => <V1 published /> };
