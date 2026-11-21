import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import { ChoiceIllustration, type ChoiceIllustrationName } from '../ChoicePicker/illustrations';
import styles from './FormatOption.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export interface FormatOptionData {
  value: string;
  title: ReactNode;
  description?: ReactNode;
  /** Illustration 64 × 44 (_ChoiceIllustration) : demo, announcement, inapp, widget, modale… */
  illustration: ChoiceIllustrationName;
  disabled?: boolean;
}

export interface FormatOptionGroupProps {
  options: FormatOptionData[];
  value: string;
  onChange: (value: string) => void;
  /** Réglages du format choisi, affichés sous la ligne sélectionnée (ex. Orientation : GroupTab avec `label`). */
  settings?: ReactNode;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

/** FormatOption (21/11) : choix du format dans le panneau Options. Lignes compactes (illustration, titre, phrase, coche ronde) ; la ligne choisie a un fond bleu pâle et porte ses réglages. Groupe radio, flèches au clavier. */
export function FormatOptionGroup({ options, value, onChange, settings, ...rest }: FormatOptionGroupProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const enabled = options.map((o, i) => (o.disabled ? -1 : i)).filter((i) => i >= 0);
  const onKey = (e: KeyboardEvent, i: number) => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(e.key)) return;
    e.preventDefault();
    const pos = enabled.indexOf(i);
    const next = enabled[(pos + (e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1) + enabled.length) % enabled.length];
    refs.current[next]?.focus(); onChange(options[next].value);
  };
  return (
    <div role="radiogroup" aria-label={rest['aria-label']} aria-labelledby={rest['aria-labelledby']} className={styles.group}>
      {options.map((o, i) => {
        const on = o.value === value;
        return (
          <div key={o.value} className={cx(styles.option, on && styles.selected, o.disabled && styles.disabled)}>
            <button ref={(el) => { refs.current[i] = el; }} type="button" role="radio" aria-checked={on} disabled={o.disabled}
              tabIndex={on || (!enabled.includes(options.findIndex((x) => x.value === value)) && i === enabled[0]) ? 0 : -1}
              className={styles.row} onClick={() => onChange(o.value)} onKeyDown={(e) => onKey(e, i)}>
              <ChoiceIllustration name={o.illustration} />
              <span className={styles.text}>
                <span className={styles.title}>{o.title}</span>
                {o.description && <span className={styles.desc}>{o.description}</span>}
              </span>
              <span className={styles.check} aria-hidden="true">{on && <Icon name="tick-02" size={12} />}</span>
            </button>
            {on && settings && <div className={styles.settings}>{settings}</div>}
          </div>
        );
      })}
    </div>
  );
}
