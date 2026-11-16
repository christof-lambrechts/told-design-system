import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import styles from './UserStory.module.css';

export interface UserStoryProps {
  id: string;
  title: ReactNode;
  asA: ReactNode;
  iWant: ReactNode;
  soThat: ReactNode;
  criteria?: ReactNode[];
  screens?: ReactNode;
  persona?: { name: ReactNode; detail?: ReactNode; initials: string };
  version?: ReactNode;
  status?: 'À rédiger' | 'À valider' | 'Validée';
}

const statusTone = { 'À rédiger': 'gray', 'À valider': 'orange', Validée: 'green' } as const;

/** User story (7806:3673) : fiche de parcours, 720 de large, marge 48, rayon 24. */
export function UserStory({ id, title, asA, iWant, soThat, criteria = [], screens, persona, version, status = 'À rédiger' }: UserStoryProps) {
  return (
    <article className={styles.card}>
      <header className={styles.head}>
        <span className={styles.eyebrow}>User story · {id}</span>
        <span className={[styles.status, styles[statusTone[status]]].join(' ')}>{status}</span>
      </header>
      <h2 className={styles.title}>{title}</h2>
      <dl className={styles.story}>
        <div><dt>En tant que</dt><dd>{asA}</dd></div>
        <div><dt>Je veux</dt><dd>{iWant}</dd></div>
        <div><dt>Afin de</dt><dd>{soThat}</dd></div>
      </dl>
      {criteria.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.eyebrow}>Critères d’acceptation</h3>
          <ul className={styles.criteria}>
            {criteria.map((c, i) => <li key={i}><Icon name="checkmark-circle-02" size={20} className={styles.tick} />{c}</li>)}
          </ul>
        </section>
      )}
      {screens && (
        <section className={styles.section}>
          <h3 className={styles.eyebrow}>Écrans du parcours</h3>
          <p className={styles.screens}>{screens}</p>
        </section>
      )}
      {(persona || version) && (
        <footer className={styles.foot}>
          {persona && <span className={styles.avatar}>{persona.initials}</span>}
          {persona && <span className={styles.persona}><strong>{persona.name}</strong>{persona.detail && <span>{persona.detail}</span>}</span>}
          {version && <span className={styles.version}>{version}</span>}
        </footer>
      )}
    </article>
  );
}
