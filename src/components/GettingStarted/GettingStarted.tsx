import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import styles from './GettingStarted.module.css';

export type StepState = 'done' | 'current' | 'todo';

export interface GettingStartedStepProps {
  number: number;
  title: ReactNode;
  description?: ReactNode;
  state?: StepState;
  onClick?: () => void;
}

/** GettingStartedStep (7903:1087) : étape cochée, en cours (bleue) ou à faire. */
export function GettingStartedStep({ number, title, description, state = 'todo', onClick }: GettingStartedStepProps) {
  return (
    <button type="button" className={[styles.step, styles[state]].join(' ')} onClick={onClick} aria-current={state === 'current' ? 'step' : undefined}>
      <span className={styles.marker}>{state === 'done' ? <Icon name="tick-02" size={12} /> : number}</span>
      <span className={styles.texts}>
        <span className={styles.title}>{title}</span>
        {description && <span className={styles.desc}>{description}</span>}
      </span>
    </button>
  );
}

export interface GettingStartedProps {
  steps: { title: ReactNode; description?: ReactNode; state: StepState }[];
  /** Détail de l'étape en cours : titre, explication, actions, illustration. */
  detail: { title: ReactNode; text: ReactNode; actions?: ReactNode; illustration?: ReactNode };
  onStepClick?: (index: number) => void;
  /** wide = colonne d'étapes + détail côte à côte ; column = empilés. */
  layout?: 'wide' | 'column';
}

/** GettingStarted (7903:1169) : bloc « Pour commencer » de l'accueil. */
export function GettingStarted({ steps, detail, onStepClick, layout = 'wide' }: GettingStartedProps) {
  return (
    <section className={[styles.block, styles[layout]].join(' ')} aria-label="Pour commencer">
      <div className={styles.steps}>
        {steps.map((s, i) => (
          <GettingStartedStep key={i} number={i + 1} title={s.title} state={s.state} onClick={() => onStepClick?.(i)} />
        ))}
      </div>
      <div className={styles.detail}>
        <div className={styles.detailText}>
          <h3 className={styles.detailTitle}>{detail.title}</h3>
          <p className={styles.detailBody}>{detail.text}</p>
          {detail.actions && <div className={styles.actions}>{detail.actions}</div>}
        </div>
        {detail.illustration && <div className={styles.illu}>{detail.illustration}</div>}
      </div>
    </section>
  );
}
