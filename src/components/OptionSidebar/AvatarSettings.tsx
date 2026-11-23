import { useId, type ReactNode } from 'react';
import { ChoiceChips } from '../ChoiceChips/ChoiceChips';
import { ColorField } from '../Contrast/Contrast';
import { PositionPicker, type Position } from './PositionPicker';
import styles from './AvatarSettings.module.css';

export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarShape = 'round' | 'rounded' | 'square';
/** Cadre de RecordAvatar : none, color (couleur choisie), glass-light, glass-dark. `border` (blanc de 4) reste la valeur des démos existantes. */
export type AvatarFrame = 'none' | 'color' | 'glass-light' | 'glass-dark' | 'border';

export interface AvatarSettingsProps {
  /** Choix de l'avatar : AvatarPicker, ou ChoiceChips avec `avatar` en attendant. */
  avatar?: ReactNode;
  position: Position;
  onPositionChange: (p: Position) => void;
  /** Places proposées (5 par défaut : 4 coins et bas au centre). */
  positions?: 9 | 5 | Position[];
  size: AvatarSize;
  onSizeChange: (s: AvatarSize) => void;
  shape: AvatarShape;
  onShapeChange: (s: AvatarShape) => void;
  frame: AvatarFrame;
  onFrameChange: (f: AvatarFrame) => void;
  /** Couleur du contour (#RRGGBB), visible avec frame="color". Couleur du kit par défaut. */
  frameColor?: string;
  onFrameColorChange?: (hex: string) => void;
  /** Phrase sous les réglages ; `false` pour la masquer. */
  note?: ReactNode | false;
  disabled?: boolean;
}

const SIZES = [{ value: 'sm', label: 'Petit' }, { value: 'md', label: 'Moyen' }, { value: 'lg', label: 'Grand' }];
const SHAPES = [{ value: 'round', label: 'Rond' }, { value: 'rounded', label: 'Arrondi' }, { value: 'square', label: 'Carré' }];
const FRAMES = [{ value: 'none', label: 'Aucun' }, { value: 'color', label: 'Couleur' }, { value: 'glass-light', label: 'Verre clair' }, { value: 'glass-dark', label: 'Verre sombre' }];

/** AvatarSettings (Figma 9808:3487) : contenu du réglage Avatar de l'éditeur Record, à poser dans un OptionItem ouvert. Avatar, Position, Taille, Forme, Contour, Couleur du contour. */
export function AvatarSettings(p: AvatarSettingsProps) {
  const id = useId();
  const field = (key: string, label: string, control: (lid: string) => ReactNode) => (
    <div className={styles.field}><span id={`${id}-${key}`} className={styles.label}>{label}</span>{control(`${id}-${key}`)}</div>
  );
  return (
    <div className={styles.root}>
      {p.avatar}
      <PositionPicker label="Position" item="avatar" positions={p.positions ?? 5} value={p.position} onChange={p.onPositionChange} disabled={p.disabled} />
      {field('size', 'Taille', (l) => <ChoiceChips aria-labelledby={l} options={SIZES} value={p.size} onChange={(v) => p.onSizeChange(v as AvatarSize)} disabled={p.disabled} />)}
      {field('shape', 'Forme', (l) => <ChoiceChips aria-labelledby={l} options={SHAPES} value={p.shape} onChange={(v) => p.onShapeChange(v as AvatarShape)} disabled={p.disabled} />)}
      <div className={styles.group}>
        {field('frame', 'Contour', (l) => <ChoiceChips aria-labelledby={l} options={FRAMES} value={p.frame === 'border' ? 'color' : p.frame} onChange={(v) => p.onFrameChange(v as AvatarFrame)} disabled={p.disabled} />)}
        {(p.frame === 'color' || p.frame === 'border') && (
          <ColorField label="Couleur du contour" value={p.frameColor ?? '#FFFFFF'} onChange={p.onFrameColorChange} hideContrast />
        )}
      </div>
      {p.note !== false && <p className={styles.note}>{p.note ?? 'Ces réglages valent pour tous les slides.'}</p>}
    </div>
  );
}
