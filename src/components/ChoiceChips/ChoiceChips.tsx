import { useRef, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import styles from './ChoiceChips.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export interface ChoiceChipOption {
  value: string;
  label: ReactNode;
  /** lead=icon */
  icon?: IconName;
  /** lead=color : couleur ou dégradé CSS (thème). */
  color?: string;
  /** lead=thumb : vignette 26 × 18. */
  thumb?: string;
  /** lead=avatar : photo ronde 22, avec bouton Écouter si `onListen`. */
  avatar?: string;
  onListen?: () => void;
  /** lead=glyph : « Aa », qui porte l'animation d'apparition au survol. */
  glyph?: string;
  /** Classe ajoutée au glyphe (animation propre à l'option). */
  glyphClassName?: string;
  /** Aide de l'option (ex. « Différente du reste de la démo »), lue par les lecteurs d'écran. */
  title?: string;
  /** Option désactivée. */
  disabled?: boolean;
}

export interface ChoiceChipsProps {
  options: ChoiceChipOption[];
  value: string;
  onChange: (value: string) => void;
  'aria-label'?: string;
  /** Nommer le groupe par un libellé existant (ex. l'id du libellé d'OptionItem). */
  'aria-labelledby'?: string;
  /** Tout le groupe désactivé (lecture seule, réglage tenu par un collègue). */
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** ChoiceChips (9056:5575) : choix compact en pastilles (3 à 5), un seul sélectionné, retour à la ligne. Pièce : _ChoiceChip. */
export function ChoiceChips({ options, value, onChange, disabled, className, style, ...rest }: ChoiceChipsProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const enabled = options.map((o, i) => (!disabled && !o.disabled ? i : -1)).filter((i) => i >= 0);
  const current = options.findIndex((o) => o.value === value);
  const tabbable = enabled.includes(current) ? current : enabled[0];
  const onKey = (e: KeyboardEvent, i: number) => {
    const k = e.key; if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(k)) return;
    e.preventDefault(); if (!enabled.length) return;
    const pos = enabled.indexOf(i);
    const next = k === 'Home' ? enabled[0] : k === 'End' ? enabled[enabled.length - 1]
      : enabled[(pos + (k === 'ArrowRight' || k === 'ArrowDown' ? 1 : -1) + enabled.length) % enabled.length];
    refs.current[next]?.focus(); onChange(options[next].value);
  };
  return (
    <div role="radiogroup" aria-label={rest['aria-label']} aria-labelledby={rest['aria-labelledby']} aria-disabled={disabled || undefined} className={cx(styles.group, disabled && styles.disabled, className)} style={style}>
      {options.map((o, i) => {
        const on = o.value === value;
        const off = disabled || o.disabled;
        return (
          <span key={o.value} className={cx(styles.chip, on && styles.selected, o.avatar && styles.withAvatar, !(o.icon || o.color || o.thumb || o.avatar || o.glyph) && styles.noLead, off && styles.disabled)} title={o.title}>
            <button ref={(el) => { refs.current[i] = el; }} type="button" role="radio" aria-checked={on} disabled={off} tabIndex={i === tabbable ? 0 : -1} aria-description={o.title} className={styles.hit} onKeyDown={(e) => onKey(e, i)} onClick={() => onChange(o.value)}>
              {o.icon && <Icon name={o.icon} size={16} />}
              {o.color && <span className={styles.color} style={{ background: o.color }} />}
              {o.thumb && <img className={styles.thumb} src={o.thumb} alt="" />}
              {o.avatar && <img className={styles.avatar} src={o.avatar} alt="" />}
              {o.glyph && <span className={cx(styles.glyph, o.glyphClassName)} aria-hidden="true">{o.glyph}</span>}
              <span>{o.label}</span>
            </button>
            {o.onListen && <button type="button" className={styles.listen} disabled={off} aria-label={`Écouter ${typeof o.label === 'string' ? o.label : ''}`} onClick={o.onListen}><Icon name="play" size={14} variant="solid" /></button>}
          </span>
        );
      })}
    </div>
  );
}
