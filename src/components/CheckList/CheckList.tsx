import type { ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import { ButtonLink } from '../Button/ButtonMisc';
import { Loader } from '../Progress/Progress';
import styles from './CheckList.module.css';

export type CheckState = 'pass' | 'fail' | 'warning' | 'pending';
const ICON: Record<Exclude<CheckState, 'pending'>, IconName> = { pass: 'checkmark-circle-02', fail: 'cancel-circle', warning: 'alert-02' };

export interface CheckRowProps {
  state: CheckState;
  title: ReactNode;
  /** Détail ou raison, en une phrase (hasDetail). */
  detail?: ReactNode;
  /** Lien pour corriger (hasAction) : « Voir l’étape 3 », « Réessayer ». */
  actionLabel?: string;
  onAction?: () => void;
}

/** CheckRow (8241:1467) : un point vérifié. pass, fail (bloquant), warning (à savoir), pending (en cours). */
export function CheckRow({ state, title, detail, actionLabel, onAction }: CheckRowProps) {
  return (
    <li className={styles.row} data-state={state}>
      <span className={styles.icon}>{state === 'pending' ? <Loader size="3xs" label={false} appearance="line-simple" /> : <Icon name={ICON[state]} size={16} variant="solid" />}</span>
      <span className={styles.text}>
        <span className={styles.title}>{title}</span>
        {detail && <span className={styles.detail}>{detail}</span>}
      </span>
      {actionLabel && <ButtonLink size="sm" padding={false} iconRight={null} onClick={onAction}>{actionLabel}</ButtonLink>}
    </li>
  );
}

/** CheckList (8792:103436) : « Avant de publier », résumé, puis les CheckRow (bloquants d’abord). */
export function CheckList({ title, summary, children }: { title: ReactNode; summary?: ReactNode; children: ReactNode }) {
  return (
    <section className={styles.list}>
      <header className={styles.head}><span className={styles.listTitle}>{title}</span>{summary && <span className={styles.summary}>{summary}</span>}</header>
      <ul className={styles.rows}>{children}</ul>
    </section>
  );
}
