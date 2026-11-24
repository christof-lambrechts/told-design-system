import type { ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import { SearchBar, type SearchBarProps } from '../Input/Input';
import styles from './TopBar.module.css';

export interface TopBarProps {
  /** Titre de la page (h1). Un seul en-tête par écran : ne pas poser PageHeader dessous pour le répéter. */
  title: ReactNode;
  /** Ligne sous le titre : compteurs, statuts (hasDescription). */
  description?: ReactNode;
  /** Icône de la rubrique (hasIcon), la même que dans AppSidebar. */
  icon?: IconName;
  /**
   * Recherche ⌘K (hasSearch). `true` = SearchBar par défaut, un objet = ses réglages,
   * un nœud = votre propre champ. À éteindre quand la barre IA est affichée.
   */
  search?: boolean | SearchBarProps | ReactNode;
  /** Barre IA (hasIntent) : IntentInput `size="compact" emphasis="ai"`, en largeur libre à droite du titre. Une seule barre IA par écran. */
  intent?: ReactNode;
  /** Boutons icône (hasOptions) : ButtonIcon ghost neutral md. */
  options?: ReactNode;
  /** Action secondaire (hasSecondaryAction) : Button secondary-outline md. */
  secondaryAction?: ReactNode;
  /** Action principale (hasAction) : Button primary md. */
  action?: ReactNode;
  /** Notifications (hasNotifications) : NotificationBell. */
  notifications?: ReactNode;
  className?: string;
}

function isSearchProps(v: unknown): v is SearchBarProps {
  return typeof v === 'object' && v !== null && !('$$typeof' in (v as object));
}

/**
 * TopBar (Figma 7858:1613, page Headers) : barre du haut de l'application, en haut de la carte de contenu de
 * Layout `type="page"` et `type="settings"`. Hauteur 64, marges 24, filet bas Neutral/border/default.
 * Pas de sélecteur d'environnement (EnvironmentButton reste dans Figma, release 1 sans environnement).
 */
export function TopBar({ title, description, icon, search, intent, options, secondaryAction, action, notifications, className }: TopBarProps) {
  let searchNode: ReactNode = null;
  if (search === true) searchNode = <SearchBar placeholder="Rechercher" />;
  else if (isSearchProps(search)) searchNode = <SearchBar placeholder="Rechercher" {...search} />;
  else if (search) searchNode = search;

  return (
    <header className={[styles.bar, className].filter(Boolean).join(' ')}>
      {icon && <span className={styles.icon} aria-hidden="true"><Icon name={icon} size={24} /></span>}
      <div className={styles.titles}>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {intent ? <div className={styles.intent}>{intent}</div> : <div className={styles.spacer} />}
      {searchNode && <div className={styles.search} role="search">{searchNode}</div>}
      {options && <div className={styles.options}>{options}</div>}
      {secondaryAction}
      {action}
      {notifications}
    </header>
  );
}
