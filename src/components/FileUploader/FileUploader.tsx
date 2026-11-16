import { useId, useRef, useState, type ReactNode } from 'react';
import styles from './FileUploader.module.css';

export interface FileUploaderProps {
  title?: ReactNode;
  /** Formats acceptés, ex. ".jpg,.png,.webp,.gif". */
  accept?: string;
  /** Taille recommandée (propriété Figma `hasRecommendedSize`), ex. « 1200 × 630 px ». */
  recommendedSize?: ReactNode;
  /** Poids maximal (propriété Figma `hasWeightFileTag`), ex. « 5 Mo max ». */
  maxWeight?: ReactNode;
  multiple?: boolean;
  onFiles?: (files: File[]) => void;
}

/** FileUploader (2547:103458) : zone de dépôt en pointillés, rayon 16, marge 28/40. */
export function FileUploader({ title = 'Glisser & déposer votre fichier', accept = '.jpg,.png,.webp,.gif', recommendedSize, maxWeight, multiple, onFiles }: FileUploaderProps) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const formats = accept.split(',').map((f) => f.trim()).join(' ');
  return (
    <div
      className={[styles.zone, over && styles.over].filter(Boolean).join(' ')}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); onFiles?.(Array.from(e.dataTransfer.files)); }}
    >
      <svg width="66" height="66" viewBox="0 0 66 66" aria-hidden="true" className={styles.art}>
        <rect x="6" y="9" width="36" height="41" rx="4" transform="rotate(-8 24 30)" fill="var(--brand-neutral-20)" stroke="var(--brand-neutral-100)" strokeWidth="2" />
        <rect x="18" y="12" width="36" height="41" rx="4" fill="var(--brand-neutral-20)" stroke="var(--brand-neutral-100)" strokeWidth="2" />
        <path d="M24 44l7-8 5 5 4-4 8 7z" fill="var(--brand-neutral-300)" />
        <circle cx="30" cy="24" r="3" fill="var(--brand-neutral-300)" />
      </svg>
      <div className={styles.text}>
        <span className={styles.title}>{title}</span>
        <span className={styles.sub}>
          ou <button type="button" className={styles.browse} onClick={() => input.current?.click()}>parcourir les fichiers</button> (formats acceptés : {formats})
        </span>
      </div>
      {(recommendedSize || maxWeight) && (
        <div className={styles.tags}>
          {recommendedSize && <span className={styles.tag}>{recommendedSize}</span>}
          {maxWeight && <span className={styles.tag}>{maxWeight}</span>}
        </div>
      )}
      <input id={id} ref={input} type="file" accept={accept} multiple={multiple} hidden onChange={(e) => onFiles?.(Array.from(e.target.files ?? []))} />
    </div>
  );
}
