import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';
import styles from './CopyField.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

/** Copie dans le presse-papiers et passe à l'état « copié » 2 secondes. */
function useCopy(text: string, onCopy?: () => void) {
  const [copied, setCopied] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(t.current), []);
  const copy = async () => {
    try { await navigator.clipboard?.writeText(text); } catch { /* presse-papiers refusé : l'état reste lisible */ }
    setCopied(true);
    onCopy?.();
    clearTimeout(t.current);
    t.current = setTimeout(() => setCopied(false), 2000);
  };
  return { copied, copy };
}

export interface CopyFieldProps {
  label?: ReactNode;
  /** Texte à copier (lien de partage, identifiant). Lecture seule. */
  value: string;
  /** md 34, lg 44 (échelle des contrôles). `sm` : ancien nom de md. Défaut lg. */
  size?: 'sm' | 'md' | 'lg';
  copyLabel?: string;
  copiedLabel?: string;
  onCopy?: () => void;
}

/** CopyField (8732:7906) : champ en lecture seule et bouton « Copier » qui devient « Copié ». sm 32, md 40. */
export function CopyField({ label, value, size = 'lg', copyLabel = 'Copier', copiedLabel = 'Copié', onCopy }: CopyFieldProps) {
  const { copied, copy } = useCopy(value, onCopy);
  return (
    <div className={styles.field}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={cx(styles.box, styles[size])}>
        <input className={styles.value} value={value} readOnly onFocus={(e) => e.currentTarget.select()} aria-label={typeof label === 'string' ? label : 'Lien'} />
        <button type="button" className={cx(styles.copy, copied && styles.copied)} onClick={copy} aria-live="polite">
          <Icon name={copied ? 'tick-02' : 'copy-01'} size={14} />
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>
    </div>
  );
}

export interface CodeBlockProps {
  /** Code à afficher et copier (code d'intégration). */
  code: string;
  /** Coloration HTML simple : balises, attributs, valeurs. */
  language?: 'html' | 'text';
  copyLabel?: string;
  copiedLabel?: string;
  onCopy?: () => void;
}

const highlightHtml = (code: string) => {
  const out: ReactNode[] = [];
  const re = /(<\/?[a-zA-Z][\w-]*)|(\s[\w:-]+)(?==)|("[^"]*")|(\/?>)/g;
  let last = 0, m: RegExpExecArray | null, k = 0;
  while ((m = re.exec(code))) {
    if (m.index > last) out.push(code.slice(last, m.index));
    const cls = m[1] || m[4] ? styles.tag : m[2] ? styles.attr : styles.str;
    out.push(<span key={k++} className={cls}>{m[0]}</span>);
    last = m.index + m[0].length;
  }
  out.push(code.slice(last));
  return out;
};

/** CodeBlock (8732:7937) : fond Neutral/surface/code, contour Neutral/border/code, bouton « Copier le code » → « Copié ». */
export function CodeBlock({ code, language = 'html', copyLabel = 'Copier le code', copiedLabel = 'Copié', onCopy }: CodeBlockProps) {
  const { copied, copy } = useCopy(code, onCopy);
  return (
    <div className={styles.block}>
      <pre className={styles.pre}><code>{language === 'html' ? highlightHtml(code) : code}</code></pre>
      <div className={styles.foot}>
        <Button size="sm" color={copied ? 'success' : 'neutral'} variant="primary" iconLeft={copied ? 'tick-02' : 'copy-01'} onClick={copy} aria-live="polite">
          {copied ? copiedLabel : copyLabel}
        </Button>
      </div>
    </div>
  );
}
