import { useState } from 'react';
import styles from './CatalogPage.module.css';

const FIGMA = 'https://www.figma.com/design/UzceYU5fzcWKqlgISYpS8V/?node-id=';

type Prop =
  | { kind: 'variant'; name: string; options: string[] }
  | { kind: 'bool' | 'text' | 'swap'; name: string };

type Entry = {
  name: string; id: string; size: string; description: string;
  props: Prop[]; image: string | null; coded: string | null;
};

export type CatalogPageData = {
  level: string; name: string; validated: boolean;
  board?: { id: string; image: string };
  entries: Entry[];
};

const KIND_LABEL = { bool: 'Option', text: 'Texte', swap: 'Icône' } as const;

function Card({ entry }: { entry: Entry }) {
  const [zoom, setZoom] = useState(false);
  const variants = entry.props.filter((p) => p.kind === 'variant') as Extract<Prop, { kind: 'variant' }>[];
  const others = entry.props.filter((p) => p.kind !== 'variant') as Extract<Prop, { kind: 'bool' | 'text' | 'swap' }>[];
  return (
    <article className={styles.card}>
      <header className={styles.cardHead}>
        <div>
          <h3 className={styles.cardTitle}>{entry.name}</h3>
          {entry.description && <p className={styles.desc}>{entry.description}</p>}
        </div>
        <div className={styles.links}>
          {entry.coded && (
            <a className={styles.coded} href={`?path=/docs/${entry.coded}`} target="_top">Voir le code</a>
          )}
          <a className={styles.figma} href={FIGMA + entry.id.replace(':', '-')} target="_blank" rel="noreferrer">Ouvrir dans Figma</a>
        </div>
      </header>
      {entry.image && (
        <button type="button" className={`${styles.preview} ${zoom ? styles.zoom : ''}`} onClick={() => setZoom(!zoom)} aria-label={zoom ? 'Réduire l’aperçu' : 'Agrandir l’aperçu'}>
          <img src={entry.image} alt={`Aperçu Figma de ${entry.name}`} loading="lazy" />
        </button>
      )}
      {(variants.length > 0 || others.length > 0) && (
        <dl className={styles.props}>
          {variants.map((v) => (
            <div key={v.name} className={styles.row}>
              <dt>{v.name}</dt>
              <dd>{v.options.map((o) => <span key={o} className={styles.chip}>{o}</span>)}</dd>
            </div>
          ))}
          {others.length > 0 && (
            <div className={styles.row}>
              <dt>Réglages</dt>
              <dd>{others.map((o) => <span key={o.kind + o.name} className={styles.chip} title={KIND_LABEL[o.kind]}><em>{KIND_LABEL[o.kind]}</em> {o.name}</span>)}</dd>
            </div>
          )}
        </dl>
      )}
      <p className={styles.meta}>Figma {entry.id} · {entry.size.replace('x', ' × ')}</p>
    </article>
  );
}

/** Fiche d'une page Figma : un bloc par composant, avec aperçu, propriétés et lien Figma. */
export function CatalogPage({ page }: { page: CatalogPageData }) {
  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={styles.level}>{page.level}</p>
        <h1 className={styles.title}>{page.name}</h1>
        <span className={page.validated ? styles.ok : styles.wip}>{page.validated ? 'Validé dans Figma' : 'En cours dans Figma'}</span>
        <p className={styles.intro}>
          Aperçu tiré du fichier Figma. {page.validated
            ? 'Composant validé : il est (ou sera) codé dans la partie Composants.'
            : 'Composant pas encore validé : la référence reste Figma, il sera codé une fois validé.'}
        </p>
      </header>
      {page.board && (
        <a className={styles.board} href={FIGMA + page.board.id.replace(':', '-')} target="_blank" rel="noreferrer">
          <img src={page.board.image} alt={`Planche Figma ${page.name}`} loading="lazy" />
        </a>
      )}
      <div className={styles.list}>
        {page.entries.map((e) => <Card key={e.id} entry={e} />)}
      </div>
    </div>
  );
}
