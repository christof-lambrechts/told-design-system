import { useState, type ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import { ButtonIcon } from '../Button/Button';
import { ButtonLink } from '../Button/ButtonMisc';
import { PresenceAvatar } from '../Avatar/AvatarGroup';
import styles from './Comment.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export interface CommentCardProps {
  author: string;
  /** Date relative (« il y a 10 min »). */
  date: ReactNode;
  /** Message ; mettre les mentions dans <Mention>. */
  children: ReactNode;
  /** open (défaut), unread (pas encore lu), resolved (estompé, coche « Résolu »). */
  state?: 'open' | 'unread' | 'resolved';
  replies?: number;
  onReplies?: () => void;
  onResolve?: () => void;
  onReopen?: () => void;
  /** Menu ⋯ (visible au survol). */
  onMenu?: () => void;
  avatarSrc?: string;
}

/** Mention @ dans un commentaire (bleu). */
export const Mention = ({ children }: { children: ReactNode }) => <span className={styles.mention}>@{children}</span>;

/** CommentCard (8849:1591) : un fil de commentaire. */
export function CommentCard({ author, date, children, state = 'open', replies, onReplies, onResolve, onReopen, onMenu, avatarSrc }: CommentCardProps) {
  return (
    <article className={cx(styles.card, state === 'unread' && styles.unread, state === 'resolved' && styles.resolved)}>
      <header className={styles.head}>
        <PresenceAvatar name={author} src={avatarSrc} />
        <span className={styles.name}>{author}</span>
        <span className={styles.date}>{date}</span>
        {state === 'resolved' && <span className={styles.status}><Icon name="tick-02" size={12} variant="solid" />Résolu</span>}
        {state === 'unread' && <span className={styles.dot} aria-label="Non lu" />}
      </header>
      <div className={styles.message}>{children}</div>
      <footer className={styles.foot}>
        {replies ? <ButtonLink size="sm" padding={false} iconRight={null} onClick={onReplies}>{replies} réponse{replies > 1 ? 's' : ''}</ButtonLink> : <span />}
        <span className={styles.actions}>
          {state === 'resolved'
            ? onReopen && <ButtonLink size="sm" padding={false} iconRight={null} onClick={onReopen}>Rouvrir</ButtonLink>
            : onResolve && <ButtonLink size="sm" padding={false} iconRight={null} onClick={onResolve}>Résoudre</ButtonLink>}
          {onMenu && <ButtonIcon icon="more-horizontal" label="Plus d’actions" size="xs" className={styles.menu} onClick={onMenu} />}
        </span>
      </footer>
    </article>
  );
}

/** _CommentPin (8849:1598) : avatar épinglé sur le canevas, pointe vers l'endroit commenté. À positionner en absolu. */
export function CommentPin({ author, avatarSrc, onClick }: { author: string; avatarSrc?: string; onClick?: () => void }) {
  return <button type="button" className={styles.pin} aria-label={`Commentaire de ${author}`} onClick={onClick}><PresenceAvatar name={author} src={avatarSrc} /></button>;
}

/** CommentComposer (8849:1599) : champ pour écrire un commentaire, bouton Envoyer (flèche, sans fond, neutre). Entrée envoie, Maj+Entrée va à la ligne. */
export function CommentComposer({ onSend, placeholder = 'Commenter… @ pour mentionner' }: { onSend: (text: string) => void; placeholder?: string }) {
  const [text, setText] = useState('');
  const send = () => { const t = text.trim(); if (t) { onSend(t); setText(''); } };
  return (
    <div className={styles.composer}>
      <textarea className={styles.field} rows={1} value={text} placeholder={placeholder} aria-label="Commentaire"
        onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }} />
      <ButtonIcon icon="arrow-up-02" label="Envoyer" appearance="ghost" color="neutral" size="sm" onClick={send} disabled={!text.trim()} />
    </div>
  );
}
