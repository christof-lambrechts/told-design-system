import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { AppSidebar, ProjectSwitcher, AccountCard, NotificationBell, type AppSidebarSection, type AppSidebarItem } from './AppSidebar';
import { AppLayout } from '../AppLayout/AppLayout';

const meta = {
  title: 'Gabarits/AppSidebar',
  component: AppSidebar,
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'Menu latéral commun à Told et Told Record (Figma AppSidebar 8:14681, piste B validée le 24/11) : Accueil ; CRÉER Scénarios, Told, Told Record ; ANALYSER Résultats, Audiences ; MARQUE Kit de marque, Ressources ; en bas Réglages et Aide, puis le compte. Les entrées sont des données (`sections`, `footer`) : le composant ne connaît aucun produit. Les liens se branchent sur le routeur avec `linkAs` (TanStack Router pour Told, Next.js pour Record).' } },
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
      { id: 'ressources', label: 'Ressources', icon: 'folder-01', children: [
        { id: 'medias', label: 'Médias', href: '#medias' },
        { id: 'modeles', label: 'Modèles', href: '#modeles' },
      ] },
    ] },
  ].map((s) => ({ ...s, items: s.items.map((i) => ({ ...i, selected: i.id === current, children: (i as AppSidebarItem).children?.map((c) => ({ ...c, selected: c.id === current })) })) })) as AppSidebarSection[],
  footer: [
    { id: 'reglages', label: 'Réglages', icon: 'settings-02', href: '#reglages', selected: current === 'reglages' },
    { id: 'aide', label: 'Aide et documentation', icon: 'book-open-01', href: '#aide' },
  ],
});

const Sidebar = ({ collapsed = false, current = 'told-record', surface }: { collapsed?: boolean; current?: string; surface?: 'transparent' | 'filled' }) => {
  const [c, setC] = useState(collapsed);
  const { sections, footer } = menuCommun(current);
  return (
    <AppSidebar sections={sections} footer={footer} collapsed={c} onCollapsedChange={setC} collapsible surface={surface}
      switcher={<ProjectSwitcher project="Mon premier projet" organization="Mon entreprise" appearance="outline" compact={c} />}
      account={<AccountCard name="Dylan Laborie" email="dylan.laborie@evolt.io" compact={c} notifications={<NotificationBell count={3} />} />} />
  );
};

const frame = (node: React.ReactNode) => <div style={{ height: '100vh', background: 'var(--neutral-surface-page)', display: 'flex' }}>{node}</div>;

export const MenuCommun: StoryObj = { name: 'Menu commun (Told + Told Record)', render: () => frame(<Sidebar />) };
export const Replie: StoryObj = { name: 'Replié', render: () => frame(<Sidebar collapsed />) };
export const AvecFond: StoryObj = { name: 'Avec fond (menu filled)', render: () => <div style={{ height: '100vh', padding: 12, background: 'var(--neutral-surface-default)', display: 'flex', boxSizing: 'border-box' }}><Sidebar surface="filled" current="resultats" /></div> };
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
