import type { ReactNode } from 'react';
import styles from './InfoCard.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export type InfoCardType = 'link' | 'iframe' | 'video' | 'embed' | 'email';

export interface InfoCardProps {
  /** Canal (Figma InfoCard `type`) : link = liens (bleu), iframe (jaune), video (bleu), embed = integrer (orange), email (vert). */
  type: InfoCardType;
  title: ReactNode;
  description?: ReactNode;
  /** Bouton facultatif sous le texte (ex. « Documentation »). */
  action?: ReactNode;
  className?: string;
}

/** Fenêtre de navigateur commune aux illustrations (fond blanc, trois pastilles, barre de titre). */
function Window({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 176 132" width="176" height="132" aria-hidden="true" className={styles.svg}>
      <rect x="0.5" y="0.5" width="175" height="131" rx="8" fill="#fff" stroke="rgba(10,20,40,.06)" />
      <circle cx="10" cy="8" r="2" fill="#ff5f57" /><circle cx="17" cy="8" r="2" fill="#febc2e" /><circle cx="24" cy="8" r="2" fill="#28c840" />
      <rect x="36" y="6.5" width="128" height="3" rx="1.5" fill="#eef0f3" />
      <rect x="10" y="18" width="156" height="92" rx="4" fill="#f3f5f7" />
      {children}
    </svg>
  );
}

const cursor = (x: number, y: number) => (
  <path transform={`translate(${x} ${y})`} d="M0 0 L0 17 L4.5 13 L7.5 19.5 L10.5 18 L7.5 11.5 L13 11.5 Z" fill="#1f2429" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
);

const illustrations: Record<InfoCardType, ReactNode> = {
  link: (
    <Window>
      <rect x="24" y="52" width="128" height="20" rx="10" fill="#f0f4ff" stroke="#5a71d9" strokeWidth="2" />
      <rect x="32" y="60" width="72" height="4" rx="2" fill="#c9d3f5" />
      <rect x="124" y="54" width="26" height="16" rx="8" fill="#5a71d9" />
      <path d="M134 62.5l3.5-3.5M133 60.5l-1.2 1.2a2 2 0 0 0 2.8 2.8l1.2-1.2M139 63.5l1.2-1.2a2 2 0 0 0-2.8-2.8l-1.2 1.2" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {cursor(140, 70)}
    </Window>
  ),
  iframe: (
    <Window>
      <rect x="30" y="32" width="100" height="62" rx="6" fill="var(--peach-50)" stroke="var(--orange-400)" strokeWidth="2" />
      <path d="M82 33h41a6 6 0 0 1 6 6v48a6 6 0 0 1-6 6H82z" fill="#fff" />
      <rect x="90" y="44" width="30" height="3" rx="1.5" fill="#dfe5ea" /><rect x="90" y="52" width="22" height="3" rx="1.5" fill="#dfe5ea" />
      <rect x="90" y="64" width="16" height="16" rx="4" fill="#1f2429" />
      {cursor(116, 82)}
    </Window>
  ),
  video: (
    <Window>
      <rect x="28" y="28" width="120" height="68" rx="6" fill="#f0f4ff" />
      <circle cx="88" cy="58" r="13" fill="#5a71d9" />
      <path d="M85 52.5v11l9-5.5z" fill="#fff" />
      <rect x="28" y="100" width="120" height="3" rx="1.5" fill="#dbe0ea" /><rect x="28" y="100" width="48" height="3" rx="1.5" fill="#5a71d9" />
      {cursor(108, 66)}
    </Window>
  ),
  embed: (
    <Window>
      <rect x="20" y="40" width="136" height="42" rx="6" fill="var(--orange-400)" />
      <path d="M78 55l-6 6 6 6M98 55l6 6-6 6M91 52l-6 18" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {cursor(134, 88)}
    </Window>
  ),
  email: (
    <svg viewBox="0 0 176 132" width="176" height="132" aria-hidden="true" className={styles.svg}>
      <rect x="28" y="8" width="120" height="84" rx="6" fill="#fff" stroke="rgba(10,20,40,.06)" />
      <rect x="40" y="20" width="70" height="3" rx="1.5" fill="#dfe5ea" /><rect x="40" y="28" width="50" height="3" rx="1.5" fill="#dfe5ea" />
      {[0, 1, 2, 3].map((i) => <circle key={i} cx={56 + i * 20} cy="52" r="7" fill="#fff" stroke="#9aa5b1" strokeWidth="1.4" />)}
      <path d="M16 70l72 40 72-40v52a6 6 0 0 1-6 6H22a6 6 0 0 1-6-6z" fill="#45d6a4" />
      {cursor(92, 52)}
    </svg>
  ),
};

/**
 * InfoCard (4782:14777) : bandeau en tête d'un canal (Diffuser) ou d'un réglage : titre Body/16/Semibold,
 * description, illustration à droite, fond teinté par canal. `iframe` = bandeau jaune des intégrations.
 */
export function InfoCard({ type, title, description, action, className }: InfoCardProps) {
  return (
    <section className={cx(styles.card, styles[type], className)}>
      <div className={styles.text}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.desc}>{description}</p>}
        {action && <div className={styles.action}>{action}</div>}
      </div>
      <div className={styles.illustration}>{illustrations[type]}</div>
    </section>
  );
}
