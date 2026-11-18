import { useState, type ReactNode } from 'react';

import { Button, ButtonIcon } from "../Button/Button";
import { ButtonTab } from '../Tabs/Tabs';
import { IconBoxedColor, type IconBoxedColorName } from '../IconBoxed/IconBoxedColor';
import styles from './Notifications.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export interface NotificationItemProps {
  title: ReactNode;
  /** Deux lignes au plus. Propriété Figma `message` + `hasMessage`. */
  message?: ReactNode;
  /** Date relative : « Il y a 2 h », « Hier », puis la date. */
  time: ReactNode;
  unread?: boolean;
  /** Picto du type d'événement (type-nps, type-questionnaire…). */
  icon?: IconBoxedColorName;
  /** Remplace le picto (Avatar quand une personne est à l'origine). */
  leading?: ReactNode;
  onClick?: () => void;
}

/** NotificationItem (7967:10662) : 376 de large, marge 9/10, écart 10 ; non lue sur Brand/surface/default avec pastille bleue de 8. */
export function NotificationItem({ title, message, time, unread, icon = 'type-nps', leading, onClick }: NotificationItemProps) {
  return (
    <button type="button" className={cx(styles.item, unread && styles.unread)} onClick={onClick}>
      <span className={styles.lead}>{leading ?? <IconBoxedColor icon={icon} size={24} />}</span>
      <span className={styles.body}>
        <span className={styles.title}>{title}</span>
        {message && <span className={styles.message}>{message}</span>}
        <span className={styles.time}>{time}</span>
      </span>
      {unread && <span className={styles.dot} aria-label="Non lue" />}
    </button>
  );
}

export interface NotificationGroup {
  label: string;
  items: (NotificationItemProps & { id: string })[];
}

export interface NotificationCenterProps {
  groups: NotificationGroup[];
  onMarkAllRead?: () => void;
  onClose?: () => void;
  onSettings?: () => void;
  onOpen?: (id: string) => void;
  className?: string;
}

/** NotificationCenter (7967:10663) : panneau de 400 ouvert depuis la cloche du menu, 4 px à droite du menu, aligné en bas. */
export function NotificationCenter({ groups, onMarkAllRead, onClose, onSettings, onOpen, className }: NotificationCenterProps) {
  const [tab, setTab] = useState<'all' | 'unread'>('all');
  const all = groups.flatMap((g) => g.items);
  const unreadCount = all.filter((i) => i.unread).length;
  const shown = groups.map((g) => ({ ...g, items: tab === 'unread' ? g.items.filter((i) => i.unread) : g.items })).filter((g) => g.items.length);
  return (
    <section className={cx(styles.center, className)} aria-label="Notifications">
      <header className={styles.header}>
        <div className={styles.headRow}>
          <h2 className={styles.heading}>Notifications</h2>
          <span className={styles.actions}>
            {unreadCount > 0 && <Button variant="tertiary" size="sm" onClick={onMarkAllRead}>Tout marquer comme lu</Button>}
            {onClose && <ButtonIcon appearance="ghost" color="neutral" size="sm" icon="cancel-01" label="Fermer" onClick={onClose} />}
          </span>
        </div>
        <div role="tablist" className={styles.tabs}>
          <ButtonTab appearance="subtle" size="sm" selected={tab === 'all'} onClick={() => setTab('all')}>Toutes <span className={styles.count}>{all.length}</span></ButtonTab>
          <ButtonTab appearance="subtle" size="sm" selected={tab === 'unread'} onClick={() => setTab('unread')}>Non lues <span className={styles.count}>{unreadCount}</span></ButtonTab>
        </div>
      </header>
      <div className={styles.list}>
        {shown.length === 0 && <p className={styles.empty}>Aucune notification non lue.</p>}
        {shown.map((g) => (
          <div key={g.label} className={styles.group}>
            <p className={styles.groupLabel}>{g.label}</p>
            {g.items.map(({ id, ...it }) => <NotificationItem key={id} {...it} onClick={() => onOpen?.(id)} />)}
          </div>
        ))}
      </div>
      {onSettings && (
        <footer className={styles.footer}>
          <Button variant="ghost" color="neutral" size="sm" iconLeft="settings-02" onClick={onSettings}>Réglages des notifications</Button>
        </footer>
      )}
    </section>
  );
}
