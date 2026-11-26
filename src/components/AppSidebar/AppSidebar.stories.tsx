import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { AppSidebar, ProjectSwitcher, AccountCard, NotificationBell, type AppSidebarSection, type AppSidebarItem } from './AppSidebar';
import { Toldie, TOLDIE_NAMES } from '../Toldie/Toldie';
import { AppLayout } from '../AppLayout/AppLayout';
import { NavButtonItem } from '../Nav/NavButtonItem';

const meta = {
  title: 'Gabarits/AppSidebar',
  component: AppSidebar,
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'Menu latéral commun à Told et Told Record (Figma AppSidebar 8:14681, piste B validée le 24/11) : Accueil ; Créer : Scénarios, Told, Told Record ; Analyser : Résultats, Audiences ; Marque : Kit de marque, Médias, Ressources ; en bas Réglages et Aide, puis le compte. Les entrées sont des données (`sections`, `footer`) : le composant ne connaît aucun produit. Les liens se branchent sur le routeur avec `linkAs` (TanStack Router pour Told, Next.js pour Record).' } },
  },
} satisfies Meta<typeof AppSidebar>;
export default meta;

/** Menu commun (piste B). `current` = l'entrée de la page affichée. */
const menuCommun = (current = 'told-record', onAdd?: (id: string) => void): { sections: AppSidebarSection[]; footer: AppSidebarItem[] } => ({
  sections: [
    { id: 'home', items: [{ id: 'accueil', label: 'Accueil', icon: 'home-09', href: '#accueil' }] },
    { id: 'create', title: 'Créer', items: [
      { id: 'scenarios', label: 'Scénarios', icon: 'workflow-square-06', href: '#scenarios', onAdd: () => onAdd?.('scenarios'), addLabel: 'Créer un scénario' },
      { id: 'told', label: 'Told', icon: 'layers-01', href: '#told', onAdd: () => onAdd?.('told'), addLabel: 'Créer un Told' },
      { id: 'told-record', label: 'Told Record', icon: 'record', href: '#record', onAdd: () => onAdd?.('told-record'), addLabel: 'Nouvelle démo' },
    ] },
    { id: 'analyse', title: 'Analyser', items: [
      { id: 'resultats', label: 'Résultats', icon: 'chart-01', href: '#resultats' },
      { id: 'audiences', label: 'Audiences', icon: 'user-group-02', href: '#audiences' },
    ] },
    { id: 'brand', title: 'Marque', items: [
      { id: 'kit', label: 'Kit de marque', icon: 'paint-brush-04', href: '#kit' },
      { id: 'medias', label: 'Médias', icon: 'image-03', href: '#medias' },
      { id: 'ressources', label: 'Ressources', icon: 'folder-01', children: [
        { id: 'modeles', label: 'Modèles', href: '#modeles' },
      ] },
    ] },
  ].map((s) => ({ ...s, items: s.items.map((i) => ({ ...i, selected: i.id === current, children: (i as AppSidebarItem).children?.map((c) => ({ ...c, selected: c.id === current })) })) })) as AppSidebarSection[],
  footer: [
    { id: 'reglages', label: 'Réglages', icon: 'settings-02', href: '#reglages', selected: current === 'reglages' },
    { id: 'aide', label: 'Aide et documentation', icon: 'book-open-01', href: '#aide' },
  ],
});

const Sidebar = ({ collapsed = false, current = 'told-record' }: { collapsed?: boolean; current?: string }) => {
  const [c, setC] = useState(collapsed);
  const { sections, footer } = menuCommun(current);
  return (
    <AppSidebar sections={sections} footer={footer} collapsed={c} onCollapsedChange={setC} collapsible
      switcher={<ProjectSwitcher project="Mon premier projet" organization="Mon entreprise" appearance="outline" compact={c} />}
      account={<AccountCard name="Dylan Laborie" email="dylan.laborie@evolt.io" compact={c} notifications={<NotificationBell count={3} />} />} />
  );
};

const frame = (node: React.ReactNode) => <div style={{ height: '100vh', background: 'var(--neutral-surface-page)', display: 'flex' }}>{node}</div>;

export const MenuCommun: StoryObj = { name: 'Menu commun (Told + Told Record)', render: () => frame(<Sidebar />) };
export const Replie: StoryObj = { name: 'Replié', render: () => frame(<Sidebar collapsed />) };
export const DansAppLayout: StoryObj = {
  name: 'Dans AppLayout',
  render: () => (
    <div style={{ height: '100vh' }}>
      <AppLayout sidebar={<Sidebar current="told-record" />}>
        <div style={{ padding: 24 }}><h1 style={{ margin: 0, fontSize: 20 }}>Told Record</h1><p>Contenu de la page (TopBar à venir).</p></div>
      </AppLayout>
    </div>
  ),
};

/** Menu secondaire des réglages (Layout type=settings) : même composant, transparent, « Retour aux projets » en tête. */
export const Reglages: StoryObj = {
  name: 'Réglages (menu secondaire)',
  render: () => frame(
    <AppSidebar aria-label="Réglages"
      switcher={<NavButtonItem icon="arrow-left-02" href="#projets">Retour aux projets</NavButtonItem>}
      sections={[
        { id: 'org', title: 'Organisation', items: [
          { id: 'membres', label: 'Membres', icon: 'user-multiple-02', href: '#membres', selected: true },
          { id: 'plan', label: 'Plan et facturation', icon: 'invoice', href: '#plan' },
          { id: 'integrations', label: 'Intégrations', icon: 'puzzle', href: '#integrations' },
        ] },
        { id: 'projet', title: 'Projet', items: [
          { id: 'script', label: 'Installation du script', icon: 'source-code', href: '#script' },
          { id: 'domaines', label: 'Domaines', icon: 'link-03', href: '#domaines' },
        ] },
        { id: 'marque', title: 'Marque', items: [
          { id: 'kit', label: 'Kit de marque', icon: 'paint-brush-04', href: '#kit' },
        ] },
        { id: 'ia', title: 'IA', items: [
          { id: 'agent', label: 'IA agent', icon: 'artificial-intelligence-02', href: '#agent' },
          { id: 'mcp', label: 'Connexion MCP', icon: 'artificial-intelligence-04', href: '#mcp' },
        ] },
        { id: 'compte', title: 'Mon compte', items: [
          { id: 'profil', label: 'Mon profil', icon: 'user', href: '#profil' },
          { id: 'mails', label: 'Préférences email', icon: 'mail-02', href: '#mails' },
          { id: 'extension', label: 'Extension Chrome', icon: 'plug-socket', href: '#extension' },
        ] },
      ]}
      footer={[{ id: 'logout', label: 'Se déconnecter', icon: 'logout-02', onClick: () => {} }]} />,
  ),
};

const LOGO_DEMO = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#0f172a"/><path d="M8 22 16 8l8 14z" fill="#38bdf8"/></svg>');

export const LogoDuProjet: StoryObj = {
  name: 'Logo du projet (Toldie ou logo importé)',
  render: () => (
    <div style={{ display: 'grid', gap: 24, width: 272 }}>
      <ProjectSwitcher project="Told Café" organization="Evolt" appearance="outline" toldie="packman-peach" />
      <ProjectSwitcher project="Inqom" organization="Evolt" appearance="outline" toldieSeed="team-inqom" />
      <ProjectSwitcher project="KLR" organization="Evolt" appearance="outline" logoUrl={LOGO_DEMO} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{TOLDIE_NAMES.map((n) => <Toldie key={n} name={n} label={n} />)}</div>
    </div>
  ),
};
