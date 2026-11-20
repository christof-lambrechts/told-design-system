import type { CSSProperties, ReactNode } from 'react';
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
}

export interface ChoiceChipsProps {
  options: ChoiceChipOption[];
  value: string;
  onChange: (value: string) => void;
  'aria-label': string;
  className?: string;
  style?: CSSProperties;
}

/** ChoiceChips (9056:5575) : choix compact en pastilles (3 à 5), un seul sélectionné, retour à la ligne. Pièce : _ChoiceChip. */
export function ChoiceChips({ options, value, onChange, className, style, ...rest }: ChoiceChipsProps) {
  return (
    <div role="radiogroup" aria-label={rest['aria-label']} className={cx(styles.group, className)} style={style}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <span key={o.value} className={cx(styles.chip, on && styles.selected, o.avatar && styles.withAvatar)}>
            <button type="button" role="radio" aria-checked={on} className={styles.hit} onClick={() => onChange(o.value)}>
              {o.icon && <Icon name={o.icon} size={16} />}
              {o.color && <span className={styles.color} style={{ background: o.color }} />}
              {o.thumb && <img className={styles.thumb} src={o.thumb} alt="" />}
              {o.avatar && <img className={styles.avatar} src={o.avatar} alt="" />}
              {o.glyph && <span className={cx(styles.glyph, o.glyphClassName)} aria-hidden="true">{o.glyph}</span>}
              <span>{o.label}</span>
            </button>
            {o.onListen && <button type="button" className={styles.listen} aria-label={`Écouter ${typeof o.label === 'string' ? o.label : ''}`} onClick={o.onListen}><Icon name="play" size={14} variant="solid" /></button>}
          </span>
        );
      })}
    </div>
  );
}
