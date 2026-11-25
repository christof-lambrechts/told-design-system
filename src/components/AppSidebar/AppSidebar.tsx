import { forwardRef, useId, useState, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ComponentType, type ReactNode } from 'react';
import { NavButtonItem } from '../Nav/NavButtonItem';
import { Icon, type IconName } from '../Icon/Icon';
import { ButtonIcon } from '../Button/Button';
import styles from './AppSidebar.module.css';

const cx = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(' ');
type LinkAs = ComponentType<AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>;

/** Une entrée du menu. Les entrées sont des données : rien de Told ou de Told Record n'est écrit dans le composant. */
export interface AppSidebarItem {
  id: string;
  label: string;
  icon?: IconName;
  /** Lien (rendu en `<a>` ou avec `linkAs`). Sans `href`, l'entrée est un bouton (`onClick`). */
  href?: string;
  onClick?: () => void;
  /** Entrée de la page courante : fond de sélection, icône pleine, `aria-current="page"`. */
  selected?: boolean;
  /** Compteur ou étiquette à droite. */
  tag?: ReactNode;
  /** Action « + » au survol (créer un élément de cette rubrique). */
  onAdd?: () => void;
  /** Libellé lu du « + » (« Créer un scénario »). */
  addLabel?: string;
  /** Sous-entrées : l'entrée se déplie (chevron). */
  children?: AppSidebarItem[];
  defaultExpanded?: boolean;
}

/** Un groupe d'entrées, avec un titre (CRÉER, ANALYSER, MARQUE). Replié, le titre devient un séparateur. */
export interface AppSidebarSection {
  id: string;
  title?: string;
  items: AppSidebarItem[];
}

export interface AppSidebarProps {
  /** Groupes du haut. Menu commun Told + Told Record (24/11, piste B) : Accueil ; CRÉER ; ANALYSER ; MARQUE. */
  sections: AppSidebarSection[];
  /** Entrées du bas, au-dessus du compte (Réglages, Aide). */
  footer?: AppSidebarItem[];
  /** Sélecteur d'organisation et de projet (ProjectSwitcher). */
  switcher?: ReactNode;
  /** Carte « passer à l'offre supérieure » ou autre bloc, au-dessus du compte. */
  promo?: ReactNode;
  /** Carte du compte (AccountCard), tout en bas. */
  account?: ReactNode;
  /** Menu replié (72 de large, icônes seules). Contrôlé si fourni. */
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Affiche le bouton qui replie et déplie le menu. */
  collapsible?: boolean;
  /** Composant de lien du routeur (TanStack Router, Next.js `Link`) pour toutes les entrées à `href`. */
  linkAs?: LinkAs;
  /** Nom de la navigation pour les lecteurs d'écran. */
  'aria-label'?: string;
  className?: string;
}

function Entry({ item, collapsed, linkAs, level = 'primary' }: { item: AppSidebarItem; collapsed: boolean; linkAs?: LinkAs; level?: 'primary' | 'secondary' }) {
  const [open, setOpen] = useState(item.defaultExpanded ?? !!item.children?.some((c) => c.selected));
  const subId = useId();
  const hasChildren = !!item.children?.length;
  const childSelected = !!item.children?.some((c) => c.selected);
  return (
    <li className={styles.entry}>
      <div className={styles.row}>
        <NavButtonItem
          icon={item.icon}
          level={level}
          selected={item.selected || (collapsed && childSelected)}
          tag={collapsed ? undefined : item.tag}
          expanded={hasChildren && !collapsed ? open : undefined}
          aria-controls={hasChildren && !collapsed ? subId : undefined}
          href={hasChildren ? undefined : item.href}
          linkAs={linkAs}
          title={collapsed ? item.label : undefined}
          aria-label={collapsed ? item.label : undefined}
          onClick={hasChildren && !collapsed ? () => setOpen((o) => !o) : item.onClick}
          className={cx(styles.item, collapsed && styles.itemCollapsed)}
        >
          {collapsed ? <span className={styles.srOnly}>{item.label}</span> : item.label}
        </NavButtonItem>
        {item.onAdd && !collapsed && (
          <span className={styles.add}>
            <ButtonIcon icon="add-01" appearance="ghost" color="neutral" size="xs" label={item.addLabel ?? `Ajouter : ${item.label}`} onClick={item.onAdd} />
          </span>
        )}
      </div>
      {hasChildren && !collapsed && open && (
        <ul id={subId} className={styles.sub}>
          {item.children!.map((c) => <Entry key={c.id} item={c} collapsed={false} linkAs={linkAs} level="secondary" />)}
        </ul>
      )}
    </li>
  );
}

/**
 * AppSidebar (Figma 8:14681, type=main) : menu latéral de l'application, commun à Told et Told Record.
 * Sélecteur de projet en haut, groupes d'entrées (titres CRÉER, ANALYSER, MARQUE), entrées du bas (Réglages, Aide),
 * puis carte du compte. Toujours transparent, posé sur le fond de page (menus principal et secondaires, 24/11). 264 de large, 72 replié (icônes seules, titres remplacés par des séparateurs, libellés en infobulle).
 */
export function AppSidebar({
  sections, footer, switcher, promo, account, collapsed: collapsedProp, onCollapsedChange, collapsible = false,
  linkAs, className, ...rest
}: AppSidebarProps) {
  const [inner, setInner] = useState(false);
  const collapsed = collapsedProp ?? inner;
  const toggle = () => { const n = !collapsed; if (collapsedProp === undefined) setInner(n); onCollapsedChange?.(n); };
  return (
    <div className={cx(styles.sidebar, collapsed && styles.collapsed, className)} data-collapsed={collapsed || undefined}>
      {(switcher || collapsible) && (
        <div className={styles.head}>
          {switcher && <div className={styles.switcher}>{switcher}</div>}
          {collapsible && (
            <ButtonIcon icon="sidebar-left" appearance="ghost" color="neutral" size="sm"
              label={collapsed ? 'Déplier le menu' : 'Replier le menu'} aria-expanded={!collapsed} onClick={toggle} className={styles.toggle} />
          )}
        </div>
      )}
      <nav aria-label={rest['aria-label'] ?? 'Menu principal'} className={styles.nav}>
        {sections.map((s, i) => (
          <div key={s.id} className={styles.section}>
            {s.title && (collapsed
              ? (i > 0 && <hr className={styles.sep} aria-hidden="true" />)
              : <h2 className={styles.title}>{s.title}</h2>)}
            <ul className={styles.list} aria-label={s.title}>
              {s.items.map((it) => <Entry key={it.id} item={it} collapsed={collapsed} linkAs={linkAs} />)}
            </ul>
          </div>
        ))}
      </nav>
      <div className={styles.bottom}>
        {footer && footer.length > 0 && (
          <nav aria-label="Réglages et aide" className={styles.footerNav}>
            <ul className={styles.list}>
              {footer.map((it) => <Entry key={it.id} item={it} collapsed={collapsed} linkAs={linkAs} />)}
            </ul>
          </nav>
        )}
        {promo && !collapsed && <div className={styles.promo}>{promo}</div>}
        {account && <div className={styles.account}>{account}</div>}
      </div>
    </div>
  );
}

type TriggerAttrs = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type'>;

/** D-051 : ref et attributs (aria-*, data-*, onKeyDown…) transmis au bouton, pour l'ancrer à un Menu ou un Popover. */
export interface ProjectSwitcherProps extends TriggerAttrs {
  /** Nom du projet courant. */
  project: string;
  /** Organisation, sous le projet. */
  organization?: string;
  /** Initiales ou logo du projet (par défaut les 2 premières lettres). */
  initials?: string;
  logo?: ReactNode;
  /** Ouvre le menu des projets et des organisations (ou poser le composant en `trigger` d'un Menu). */
  open?: boolean;
  /** default : sans contour ; outline : liseré (menu transparent). */
  appearance?: 'default' | 'outline';
  /** Version repliée : l'initiale seule. */
  compact?: boolean;
}

/** ProjectSwitcher (Figma 8575:1848) : projet courant + organisation, ouvre le choix du projet et de l'organisation. */
export const ProjectSwitcher = forwardRef<HTMLButtonElement, ProjectSwitcherProps>(function ProjectSwitcher({ project, organization, initials, logo, open, appearance = 'default', compact, className, ...rest }, ref) {
  const ini = (initials ?? project.split(/\s+/).map((w) => w[0]).join('').slice(0, 2)).toUpperCase();
  return (
    <button ref={ref} type="button" className={cx(styles.ps, appearance === 'outline' && styles.psOutline, compact && styles.psCompact, className)}
      aria-haspopup="menu" aria-expanded={open}
      aria-label={compact ? `Projet : ${project}${organization ? `, ${organization}` : ''}` : undefined} {...rest}>
      <span className={styles.psIni} aria-hidden="true">{logo ?? ini}</span>
      {!compact && (
        <span className={styles.psText}>
          <span className={styles.psName}>{project}</span>
          {organization && <span className={styles.psOrg}>{organization}</span>}
        </span>
      )}
      {!compact && <Icon name="unfold-more" size={14} className={styles.psChevron} />}
    </button>
  );
});

export interface NotificationBellProps {
  /** Nombre de notifications non lues (0 : pas de pastille). */
  count?: number;
  onClick?: () => void;
  open?: boolean;
}

/** NotificationBell : cloche des notifications, pastille rouge s'il y a des non lues. */
export function NotificationBell({ count = 0, onClick, open }: NotificationBellProps) {
  return (
    <span className={styles.bell}>
      <ButtonIcon icon="notification-03" appearance="ghost" color="neutral" size="sm" onClick={onClick}
        aria-haspopup="dialog" aria-expanded={open}
        label={count > 0 ? `Notifications, ${count} non lue${count > 1 ? 's' : ''}` : 'Notifications'} />
      {count > 0 && <span className={styles.dot} aria-hidden="true" />}
    </span>
  );
}

export interface AccountCardProps extends TriggerAttrs {
  name: string;
  email?: string;
  /** Photo ; sinon les initiales. */
  avatar?: ReactNode;
  /** Menu du compte ouvert (ou poser le composant en `trigger` d'un Menu : ref et attributs vont au bouton). */
  open?: boolean;
  /** Cloche à droite (NotificationBell). */
  notifications?: ReactNode;
  compact?: boolean;
}

/** AccountCard (Figma, AppSidebar › Compte) : avatar, nom, e-mail, cloche ; ouvre le menu du compte. */
export const AccountCard = forwardRef<HTMLButtonElement, AccountCardProps>(function AccountCard({ name, email, avatar, open, notifications, compact, className, ...rest }, ref) {
  const ini = name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className={cx(styles.ac, compact && styles.acCompact, className)}>
      <button ref={ref} type="button" className={styles.acBtn} aria-haspopup="menu" aria-expanded={open}
        aria-label={compact ? `Compte : ${name}` : undefined} {...rest}>
        <span className={styles.acAvatar} aria-hidden="true">{avatar ?? ini}</span>
        {!compact && (
          <span className={styles.acText}>
            <span className={styles.acName}>{name}</span>
            {email && <span className={styles.acMail}>{email}</span>}
          </span>
        )}
      </button>
      {notifications}
    </div>
  );
});
