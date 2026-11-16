import 'flag-icons/css/flag-icons.min.css';
import type { HTMLAttributes } from 'react';

export interface FlagProps extends HTMLAttributes<HTMLSpanElement> {
  /** Code pays ISO à deux lettres (ex. `fr`, `gb`, `eu`), comme le début des noms Figma « fr-france ». */
  country: string;
  /** Hauteur en pixels ; largeur au format 4:3. */
  size?: number;
  /** Nom lu par les lecteurs d'écran. */
  label?: string;
}

/** FlagCountry (567:57115) : drapeau rectangulaire aux coins arrondis (bibliothèque flag-icons). */
export function Flag({ country, size = 16, label, style, className, ...rest }: FlagProps) {
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={['fi', `fi-${country.toLowerCase().slice(0, 2)}`, className].filter(Boolean).join(' ')}
      style={{ width: (size * 4) / 3, height: size, lineHeight: 1, borderRadius: 2, backgroundSize: 'cover', flex: 'none', boxShadow: '0 0 0 0.5px rgba(0,0,0,0.08)', ...style }}
      {...rest}
    />
  );
}
