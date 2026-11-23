import { useId, type ReactNode } from 'react';
import { GroupTab } from '../Tabs/Tabs';
import { ChoiceChips } from '../ChoiceChips/ChoiceChips';
import { SliderCapsule } from '../Slider/SliderCapsule';
import { ButtonLink } from '../Button/ButtonMisc';
import { PositionPicker, type Position } from './PositionPicker';
import styles from './AvatarSettings.module.css';

export type MediaFrameKind = 'none' | 'mobile' | 'tablet' | 'desktop';
export type MediaOrientation = 'portrait' | 'landscape';
export type MediaShadow = 'none' | 'soft' | 'strong';

/** Ombre ajoutée en code sous la photo de l'appareil (les photos n'en ont pas) : `filter` CSS à poser sur l'image de l'appareil. */
export const mediaShadows: Record<MediaShadow, string> = {
  none: 'none',
  soft: 'drop-shadow(0 0 40px rgb(15 20 31 / 22%))',
  strong: 'drop-shadow(0 24px 48px rgb(15 20 31 / 35%))',
};

export interface MediaDeviceOption { value: string; label: string; /** Coloris proposés pour ce modèle (photos) ; absent = pas de coloris. */ finishes?: { value: string; label: string; color: string }[] }

/** Modèles par défaut (DeviceMockup et MediaFrame dans Figma). */
export const mediaDevices: Record<Exclude<MediaFrameKind, 'none'>, MediaDeviceOption[]> = {
  mobile: [
    { value: 'phone', label: 'Simple' },
    { value: 'android', label: 'Android', finishes: [
      { value: 'pink', label: 'Rose', color: '#DED2D0' }, { value: 'navy', label: 'Marine', color: '#5A5E68' },
      { value: 'silver', label: 'Argent', color: '#D4D4D4' }, { value: 'mint', label: 'Menthe', color: '#CFDCD5' }] },
    { value: 'iphone', label: 'iPhone', finishes: [
      { value: 'black', label: 'Noir', color: '#35323A' }, { value: 'silver', label: 'Argent', color: '#D6D6D6' },
      { value: 'plum', label: 'Prune', color: '#7A4B52' }, { value: 'blue', label: 'Bleu', color: '#C9D3E2' }] },
  ],
  tablet: [
    { value: 'tablet', label: 'iPad', finishes: [
      { value: 'gray', label: 'Gris', color: '#67676A' }, { value: 'black', label: 'Noir', color: '#262626' }] },
  ],
  desktop: [
    { value: 'browser', label: 'Navigateur' },
    { value: 'laptop', label: 'Portable' },
    { value: 'imac', label: 'iMac', finishes: [
      { value: 'silver', label: 'Argent', color: '#BDBEC0' }, { value: 'yellow', label: 'Jaune', color: '#E3BC6E' },
      { value: 'blue', label: 'Bleu', color: '#ABBFD2' }, { value: 'green', label: 'Vert', color: '#A6C6BA' },
      { value: 'orange', label: 'Orange', color: '#F8B09A' }, { value: 'purple', label: 'Violet', color: '#BAB8E2' },
      { value: 'pink', label: 'Rose', color: '#E3B3AB' }] },
    { value: 'display', label: 'Écran' },
    { value: 'macbook', label: 'MacBook', finishes: [
      { value: 'space-gray', label: 'Gris sidéral', color: '#3A3B3F' }, { value: 'silver', label: 'Argent', color: '#C8C9CC' }] },
  ],
};

export interface MediaFrameSettingsProps {
  kind: MediaFrameKind;
  onKindChange: (k: MediaFrameKind) => void;
  device?: string;
  onDeviceChange?: (d: string) => void;
  finish?: string;
  onFinishChange?: (f: string) => void;
  /** Tablette : portrait ou paysage. */
  orientation?: MediaOrientation;
  onOrientationChange?: (o: MediaOrientation) => void;
  /** Ombre sous l'appareil (photos seulement) : rendu avec `mediaShadows`. */
  shadow?: MediaShadow;
  onShadowChange?: (s: MediaShadow) => void;
  /** Modèles proposés ; `mediaDevices` par défaut. */
  devices?: typeof mediaDevices;
  /** Phrase sous les réglages ; `false` pour la masquer. Par défaut, elle dit comment la capture est rognée. */
  note?: ReactNode | false;
  disabled?: boolean;
}

const NOTES: Record<MediaFrameKind, string> = {
  none: 'La capture s’affiche seule, avec l’arrondi du kit.',
  mobile: 'La capture remplit l’écran : une capture d’ordinateur est rognée sur les côtés.',
  tablet: 'En portrait, une capture d’ordinateur est rognée sur les côtés.',
  desktop: 'La capture remplit l’écran du modèle choisi.',
};

/** MediaFrameSettings (Figma 9828:6305) : contenu du réglage « Cadre du média » de l'Annonce Record (OptionItem ouvert, picto `device`). Cadre Aucun | Mobile | Tablette | Ordinateur, puis Appareil (ou Orientation pour la tablette), Coloris et Ombre. */
export function MediaFrameSettings({ kind, onKindChange, device, onDeviceChange, finish, onFinishChange, orientation = 'portrait', onOrientationChange, shadow = 'soft', onShadowChange, devices = mediaDevices, note, disabled }: MediaFrameSettingsProps) {
  const id = useId();
  const list = kind === 'none' ? [] : devices[kind];
  const current = list.find((d) => d.value === device) ?? list[0];
  return (
    <div className={styles.root}>
      <GroupTab label="Cadre" value={kind} onChange={(v) => onKindChange(v as MediaFrameKind)}
        items={[{ value: 'none', label: 'Aucun' }, { value: 'mobile', label: 'Mobile' }, { value: 'tablet', label: 'Tablette' }, { value: 'desktop', label: 'Ordinateur' }]} />
      {kind === 'tablet' && (
        <GroupTab label="Orientation" value={orientation} onChange={(v) => onOrientationChange?.(v as MediaOrientation)}
          items={[{ value: 'portrait', label: 'Portrait' }, { value: 'landscape', label: 'Paysage' }]} />
      )}
      {kind !== 'none' && list.length > 1 && (
        <div className={styles.field}>
          <span id={`${id}-device`} className={styles.label}>Appareil</span>
          <ChoiceChips aria-labelledby={`${id}-device`} disabled={disabled} value={current?.value ?? ''} onChange={(v) => onDeviceChange?.(v)}
            options={list.map((d) => ({ value: d.value, label: d.label }))} />
        </div>
      )}
      {current?.finishes && (
        <div className={styles.field}>
          <span id={`${id}-finish`} className={styles.label}>Coloris</span>
          <ChoiceChips aria-labelledby={`${id}-finish`} disabled={disabled} value={finish ?? current.finishes[0].value} onChange={(v) => onFinishChange?.(v)}
            options={current.finishes.map((f) => ({ value: f.value, label: f.label, color: f.color }))} />
        </div>
      )}
      {current?.finishes && (
        <div className={styles.field}>
          <span id={`${id}-shadow`} className={styles.label}>Ombre</span>
          <ChoiceChips aria-labelledby={`${id}-shadow`} disabled={disabled} value={shadow} onChange={(v) => onShadowChange?.(v as MediaShadow)}
            options={[{ value: 'none', label: 'Aucune' }, { value: 'soft', label: 'Douce' }, { value: 'strong', label: 'Marquée' }]} />
        </div>
      )}
      {note !== false && <p className={styles.note}>{note ?? NOTES[kind]}</p>}
    </div>
  );
}

export interface MediaCropSettingsProps {
  /** Agrandissement du média dans sa zone : 1 (tout visible) à 3. */
  zoom: number;
  onZoomChange: (z: number) => void;
  /** Partie de l'écran qui reste visible quand on agrandit. */
  anchor: Position;
  onAnchorChange: (p: Position) => void;
  onReset?: () => void;
  /** Aide sous le point de zoom ; `false` pour la masquer. */
  help?: ReactNode | false;
  disabled?: boolean;
}

/** MediaCropSettings (Figma 9825:6305) : contenu du réglage « Cadrage du média ». Zoom ×1 à ×3, point de zoom (PositionPicker item=media), lien « Réinitialiser le cadrage ». Sur la slide, le média se glisse et s'agrandit aussi par ses poignées (_MediaHandles). */
export function MediaCropSettings({ zoom, onZoomChange, anchor, onAnchorChange, onReset, help, disabled }: MediaCropSettingsProps) {
  const fmt = (v: number) => `× ${v.toFixed(1).replace('.', ',')}`;
  return (
    <div className={styles.root}>
      <SliderCapsule label="Zoom" min={1} max={3} step={0.1} value={zoom} onChange={onZoomChange} defaultValue={1} format={fmt} disabled={disabled} />
      <PositionPicker label="Point de zoom" item="media" value={anchor} onChange={onAnchorChange} disabled={disabled || zoom <= 1} />
      {help !== false && <p className={styles.note}>{help ?? 'Tu peux aussi glisser le média sur la slide pour le placer, et tirer un coin pour l’agrandir.'}</p>}
      {onReset && <div><ButtonLink iconRight={null} onClick={onReset} disabled={disabled || (zoom === 1 && anchor === 'center')}>Réinitialiser le cadrage</ButtonLink></div>}
    </div>
  );
}
