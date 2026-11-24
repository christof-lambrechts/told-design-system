import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
import { Layout } from './Layout';
import { AppSidebar, ProjectSwitcher, AccountCard, NotificationBell, type AppSidebarSection, type AppSidebarItem } from '../AppSidebar/AppSidebar';
import { EditorHeader, ButtonEditionMenu, EditorSteps, EditorSaveState, type EditorStep } from '../EditorHeader/EditorHeader';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
import { ButtonGroup } from '../Button/ButtonGroup';
import { Button } from '../Button/Button';
import { ButtonTab } from '../Tabs/Tabs';
import { NavButtonItem } from '../Nav/NavButtonItem';
import { TopBar } from '../TopBar/TopBar';

const meta = {
  title: 'Gabarits/Layout',
  component: Layout,
  parameters: { layout: 'fullscreen', docs: { description: { component: 'Base de toutes les pages de Told et de Told Record (Figma Layout 9967:20874). `type` : page (Accueil, listes), settings (réglages), editor (Construire, Diffuser), analyser (résultats). Les apps utilisent Layout ; AppLayout et EditorLayout en sont les briques.' } } },
} satisfies Meta<typeof Layout>;
export default meta;

const main = (current: string): { sections: AppSidebarSection[]; footer: AppSidebarItem[] } => {
  const it = (id: string, label: string, icon: AppSidebarItem['icon'], extra: Partial<AppSidebarItem> = {}): AppSidebarItem => ({ id, label, icon, href: `#${id}`, selected: id === current, ...extra });
  return {
    sections: [
      { id: 'home', items: [it('accueil', 'Accueil', 'home-09')] },
      { id: 'create', title: 'Créer', items: [it('scenarios', 'Scénarios', 'workflow-square-06', { onAdd: () => {}, addLabel: 'Créer un scénario' }), it('told', 'Told', 'layers-01', { onAdd: () => {}, addLabel: 'Créer un Told' }), it('told-record', 'Told Record', 'record', { onAdd: () => {}, addLabel: 'Nouvelle démo' })] },
      { id: 'analyse', title: 'Analyser', items: [it('resultats', 'Résultats', 'chart-01'), it('audiences', 'Audiences', 'user-group-02')] },
      { id: 'brand', title: 'Marque', items: [it('kit', 'Kit de marque', 'paint-brush-04'), it('medias', 'Médias', 'image-03'), it('ressources', 'Ressources', 'folder-01')] },
    ],
    footer: [it('reglages', 'Réglages', 'settings-02'), it('aide', 'Aide et documentation', 'book-open-01')],
  };
};
const account = <AccountCard name="Dylan Laborie" email="dylan.laborie@evolt.io" notifications={<NotificationBell count={3} />} />;
const Full = ({ children }: { children: ReactNode }) => <div style={{ height: '100vh' }}>{children}</div>;

export const Page: StoryObj = {
  name: 'page · Accueil et listes',
  render: () => { const m = main('told'); return <Full><Layout type="page" sidebar={<AppSidebar {...m} switcher={<ProjectSwitcher project="Mon premier projet" organization="Mon entreprise" appearance="outline" />} account={account} />}
    topbar={<TopBar title="Told" icon="layers-01" description="4 Told · 2 en ligne · 1 brouillon" search action={<Button iconLeft="add-01">Créer un Told</Button>} />}>
    <div style={{ padding: 24 }}>Contenu de la page.</div></Layout></Full>; },
};

export const Settings: StoryObj = {
  name: 'settings · Réglages',
  render: () => (
    <Full><Layout type="settings"
      sidebar={<AppSidebar aria-label="Réglages" switcher={<NavButtonItem icon="arrow-left-02" href="#projets">Retour aux projets</NavButtonItem>}
        sections={[
          { id: 'org', title: 'Organisation', items: [{ id: 'm', label: 'Membres', icon: 'user-multiple-02', href: '#m', selected: true }, { id: 'p', label: 'Plan et facturation', icon: 'invoice', href: '#p' }, { id: 'i', label: 'Intégrations', icon: 'puzzle', href: '#i' }] },
          { id: 'projet', title: 'Projet', items: [{ id: 's', label: 'Installation du script', icon: 'source-code', href: '#s' }, { id: 'd', label: 'Domaines', icon: 'link-03', href: '#d' }] },
          { id: 'marque', title: 'Marque', items: [{ id: 'k', label: 'Kit de marque', icon: 'paint-brush-04', href: '#k' }] },
          { id: 'ia', title: 'IA', items: [{ id: 'a', label: 'IA agent', icon: 'artificial-intelligence-02', href: '#a' }, { id: 'mcp', label: 'Connexion MCP', icon: 'artificial-intelligence-04', href: '#mcp' }] },
          { id: 'me', title: 'Mon compte', items: [{ id: 'pr', label: 'Mon profil', icon: 'user', href: '#pr' }, { id: 'e', label: 'Préférences email', icon: 'mail-02', href: '#e' }, { id: 'x', label: 'Extension Chrome', icon: 'plug-socket', href: '#x' }] },
        ]}
        footer={[{ id: 'out', label: 'Se déconnecter', icon: 'logout-02', onClick: () => {} }]} />}
      topbar={<TopBar title="Membres" icon="user-multiple-02" description="Les personnes qui ont accès à l’organisation" action={<Button iconLeft="add-01">Inviter</Button>} />}>
      <div style={{ padding: 24 }}>Contenu des réglages.</div></Layout></Full>
  ),
};

const Header = ({ step, setStep, tabs }: { step: EditorStep; setStep: (s: EditorStep) => void; tabs?: ReactNode }) => (
  <EditorHeader
    start={<><ButtonEditionMenu /><Breadcrumb theme="dark" items={[{ label: 'Mon projet' }]} current="Nom du questionnaire" /></>}
    center={<EditorSteps value={step} onChange={setStep} published />}
    end={<>
      <ButtonGroup appearance="inverse">
        {step === 'analyze' && <Button size="sm" color="neutral" iconLeft="share-03">Partager</Button>}
        {step === 'analyze' ? <Button size="sm" color="neutral" iconLeft="download-05">Extraire</Button> : <Button size="sm" color="neutral" iconLeft="view">Aperçu</Button>}
      </ButtonGroup>
      {step === 'build' && <Button size="sm" iconLeft="play">Publier les modifications</Button>}
    </>}
    tabs={tabs}
    status={<EditorSaveState>Enregistré il y a 12 s</EditorSaveState>}
  />
);
const Col = ({ children }: { children: ReactNode }) => <div style={{ padding: 16, display: 'grid', gap: 4 }}>{children}</div>;

export const Editor: StoryObj = {
  name: 'editor · Construire',
  render: () => { const [s, setS] = useState<EditorStep>('build'); return <Full><Layout type="editor" header={<Header step={s} setStep={setS} tabs={<><ButtonTab size="sm" appearance="ghost" selected>Étapes</ButtonTab><ButtonTab size="sm" appearance="ghost">Design</ButtonTab></>} />}
    left={<Col><NavButtonItem selected>Votre avis</NavButtonItem><NavButtonItem>Votre retour</NavButtonItem></Col>}
    right={<Col><strong>Options</strong></Col>}>
    <div style={{ width: 420, height: 320, background: 'var(--neutral-surface-default)', borderRadius: 16, border: '1px solid var(--neutral-border-default)' }} /></Layout></Full>; },
};

export const Analyser: StoryObj = {
  name: 'analyser · Résultats',
  render: () => { const [s, setS] = useState<EditorStep>('analyze'); return <Full><Layout type="analyser" header={<Header step={s} setStep={setS} tabs={<><ButtonTab size="sm" appearance="ghost" selected>Synthèse</ButtonTab><ButtonTab size="sm" appearance="ghost">Réponses</ButtonTab><ButtonTab size="sm" appearance="ghost">Parcours</ButtonTab></>} />}
    left={<Col><NavButtonItem selected>Comment évaluez-vous notre service ?</NavButtonItem><NavButtonItem>Recommanderiez-vous Told ?</NavButtonItem></Col>}>
    {['Vues', 'Réponses', 'Terminées'].map((t) => <div key={t} style={{ height: 120, background: 'var(--neutral-surface-default)', borderRadius: 16, border: '1px solid var(--neutral-border-default)', padding: 16 }}>{t}</div>)}
  </Layout></Full>; },
};
