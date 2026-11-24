import type { ReactNode } from 'react';
import { ChoiceField } from './ChoiceField';
import { ColorField } from '../Contrast/Contrast';
import { PositionPicker, positionLabels, type Position } from './PositionPicker';
import { PopoverField, PositionPreview, ColorPreview } from '../Popover/OptionPopover';
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

const frameLabel = (f: AvatarFrame, c?: string) => (f === 'color' || f === 'border' ? `Couleur · ${(c ?? '#FFFFFF').toUpperCase()}` : FRAMES.find((x) => x.value === f)?.label ?? '');

/** AvatarSettings (Figma 9808:3487) : contenu du réglage Avatar de l'éditeur Record, à poser dans un OptionItem ouvert. Avatar, Position (champ + micro-modale, 24/11), Taille, Forme, Contour et sa couleur (champ + micro-modale). */
export function AvatarSettings(p: AvatarSettingsProps) {
  return (
    <div className={styles.root}>
      {p.avatar}
      <PopoverField label="Position" title="Position de l’avatar" disabled={p.disabled} value={positionLabels[p.position]} preview={<PositionPreview position={p.position} />}>
        <PositionPicker aria-label="Position de l’avatar" item="avatar" positions={p.positions ?? 5} value={p.position} onChange={p.onPositionChange} disabled={p.disabled} />
      </PopoverField>
      <ChoiceField label="Taille" options={SIZES} value={p.size} onChange={(v) => p.onSizeChange(v as AvatarSize)} disabled={p.disabled} />
      <ChoiceField label="Forme" options={SHAPES} value={p.shape} onChange={(v) => p.onShapeChange(v as AvatarShape)} disabled={p.disabled} />
      <PopoverField label="Contour" disabled={p.disabled} value={frameLabel(p.frame, p.frameColor)}
        preview={p.frame === 'none' ? undefined : <ColorPreview color={p.frame === 'glass-light' ? 'rgb(255 255 255 / 60%)' : p.frame === 'glass-dark' ? 'rgb(0 0 0 / 35%)' : p.frameColor ?? '#FFFFFF'} />}>
        <ChoiceField label="Contour" options={FRAMES} value={p.frame === 'border' ? 'color' : p.frame} onChange={(v) => p.onFrameChange(v as AvatarFrame)} disabled={p.disabled} />
        {(p.frame === 'color' || p.frame === 'border') && (
          <ColorField label="Couleur du contour" value={p.frameColor ?? '#FFFFFF'} onChange={p.onFrameColorChange} hideContrast />
        )}
      </PopoverField>
      {p.note !== false && <p className={styles.note}>{p.note ?? 'Ces réglages valent pour tous les slides.'}</p>}
    </div>
  );
}
