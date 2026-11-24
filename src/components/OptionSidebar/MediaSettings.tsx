import type { ReactNode } from 'react';
import { GroupTab } from '../Tabs/Tabs';
import { ChoiceField } from './ChoiceField';
import { SliderCapsule } from '../Slider/SliderCapsule';
import { ButtonLink } from '../Button/ButtonMisc';
import { PositionPicker, type Position } from './PositionPicker';
import { PopoverField, ColorPreview } from '../Popover/OptionPopover';
import { FormatOptionGroup } from './FormatOption';
import { Icon } from '../Icon/Icon';
import type { ChoiceIllustrationName } from '../ChoicePicker/illustrations';
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

export type MediaPlacement = 'inset' | 'edge' | 'corner';

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
  /** Orientation de l'Annonce. En `portrait` (9:16), l'ordinateur n'est pas proposé et la tablette est en portrait. */
  slideOrientation?: MediaOrientation;
  /**
   * @deprecated 24/11 : remplacé par la position libre (`mediaScale`, `onRecenter`, glisser sur la slide).
   * Place du média sur la slide (AnnouncementSlide `media`) : `inset` avec la marge de la slide, `edge` collé au bord
   * extérieur (droite en paysage, bas en vertical), `corner` collé dans le coin bas droit. Absent : réglage masqué.
   */
  placement?: MediaPlacement;
  onPlacementChange?: (p: MediaPlacement) => void;
  /**
   * Position libre (24/11, remplace `placement` et MediaCropSettings) : taille du média (cadre + capture ensemble),
   * de 0,5 à 3 (1 = le média tient dans sa zone). On le place en le glissant sur la slide ; ce qui dépasse la zone
   * du média est coupé. Avec `mediaScale`, le réglage `placement` n'est plus montré.
   */
  mediaScale?: number;
  onMediaScaleChange?: (s: number) => void;
  /** Lien « Recentrer » : taille 1, média au centre de sa zone. */
  onRecenter?: () => void;
  /** Zoom de la capture dans l'écran de l'appareil (1 à 2). Absent : réglage masqué. */
  captureZoom?: number;
  onCaptureZoomChange?: (z: number) => void;
  /** Aide sous le zoom de la capture ; `false` pour la masquer. */
  captureHelp?: ReactNode | false;
  /** Modèles proposés ; `mediaDevices` par défaut. */
  devices?: typeof mediaDevices;
  /** Phrase sous les réglages ; `false` pour la masquer. Par défaut, elle dit comment la capture est rognée. */
  note?: ReactNode | false;
  disabled?: boolean;
}

/** Choix du cadre dans la micro-modale (liste illustrée, 24/11). */
const FRAME_CHOICES: Record<MediaFrameKind, { title: string; description: string; illustration: ChoiceIllustrationName; icon: 'image-03' | 'smart-phone-01' | 'tablet-01' | 'computer' }> = {
  none: { title: 'Aucun', description: 'Capture seule.', illustration: 'frame-none', icon: 'image-03' },
  mobile: { title: 'Mobile', description: 'Téléphone.', illustration: 'frame-mobile', icon: 'smart-phone-01' },
  tablet: { title: 'Tablette', description: 'Tablette.', illustration: 'frame-tablet', icon: 'tablet-01' },
  desktop: { title: 'Ordinateur', description: 'Écran d’ordinateur.', illustration: 'frame-desktop', icon: 'computer' },
};

const NOTES: Record<MediaFrameKind, string> = {
  none: 'La capture s’affiche seule, avec l’arrondi du kit.',
  mobile: 'La capture remplit l’écran : une capture d’ordinateur est rognée sur les côtés.',
  tablet: 'En portrait, une capture d’ordinateur est rognée sur les côtés.',
  desktop: 'La capture remplit l’écran du modèle choisi.',
};

/** MediaFrameSettings (Figma 9828:6305) : contenu du réglage « Cadre du média » de l'Annonce Record (OptionItem ouvert, picto `device`). Cadre (champ + micro-modale illustrée, 24/11), Position, Orientation pour la tablette, Appareil et Coloris (un champ + micro-modale), Ombre. */
export function MediaFrameSettings({ kind, onKindChange, device, onDeviceChange, finish, onFinishChange, orientation = 'portrait', onOrientationChange, shadow = 'soft', onShadowChange, slideOrientation = 'landscape', placement, onPlacementChange, mediaScale, onMediaScaleChange, onRecenter, captureZoom, onCaptureZoomChange, captureHelp, devices = mediaDevices, note, disabled }: MediaFrameSettingsProps) {
  const vertical = slideOrientation === 'portrait';
  const list = kind === 'none' ? [] : devices[kind];
  const current = list.find((d) => d.value === device) ?? list[0];
  return (
    <div className={styles.root}>
      <PopoverField label="Cadre" disabled={disabled} value={FRAME_CHOICES[kind].title} preview={<Icon name={FRAME_CHOICES[kind].icon} size={18} />}>
        <FormatOptionGroup aria-label="Cadre" value={kind} onChange={(v) => onKindChange(v as MediaFrameKind)}
          options={(vertical ? (['none', 'mobile', 'tablet'] as const) : (['none', 'mobile', 'tablet', 'desktop'] as const)).map((k) => ({ value: k, ...FRAME_CHOICES[k] }))} />
      </PopoverField>
      {mediaScale !== undefined && (
        <div className={styles.field}>
          <span className={styles.label}>Taille et place du média</span>
          <SliderCapsule label="Taille" min={0.5} max={3} step={0.05} value={mediaScale} onChange={(v) => onMediaScaleChange?.(v)} defaultValue={1}
            format={(v) => `× ${v.toFixed(2).replace(/0$/, '').replace(/\.0$/, '').replace('.', ',')}`} disabled={disabled} />
          {onRecenter && <div><ButtonLink iconRight={null} padding={false} onClick={onRecenter} disabled={disabled}>Recentrer</ButtonLink></div>}
        </div>
      )}
      {placement && mediaScale === undefined && (
        <GroupTab label="Position" value={placement} onChange={(v) => onPlacementChange?.(v as MediaPlacement)}
          items={[{ value: 'inset', label: 'Avec marge' }, { value: 'edge', label: vertical ? 'En bas' : 'À droite' }, { value: 'corner', label: 'Dans le coin' }]} />
      )}
      {kind === 'tablet' && !vertical && (
        <GroupTab label="Orientation" value={orientation} onChange={(v) => onOrientationChange?.(v as MediaOrientation)}
          items={[{ value: 'portrait', label: 'Portrait' }, { value: 'landscape', label: 'Paysage' }]} />
      )}
      {kind !== 'none' && (list.length > 1 || current?.finishes) && (() => {
        const fin = current?.finishes?.find((f) => f.value === finish) ?? current?.finishes?.[0];
        return (
          <PopoverField label="Appareil" disabled={disabled} value={fin ? `${current.label} · ${fin.label}` : current?.label}
            preview={fin ? <ColorPreview color={fin.color} /> : <Icon name={FRAME_CHOICES[kind].icon} size={18} />}>
            {list.length > 1 && (
              <ChoiceField label="Appareil" disabled={disabled} value={current?.value ?? ''} onChange={(v) => onDeviceChange?.(v)}
                options={list.map((d) => ({ value: d.value, label: d.label }))} />
            )}
            {current?.finishes && (
              <ChoiceField label="Coloris" disabled={disabled} value={fin?.value ?? ''} onChange={(v) => onFinishChange?.(v)}
                options={current.finishes.map((f) => ({ value: f.value, label: f.label, color: f.color }))} />
            )}
          </PopoverField>
        );
      })()}
      {current?.finishes && (
        <ChoiceField label="Ombre" disabled={disabled} value={shadow} onChange={(v) => onShadowChange?.(v as MediaShadow)}
          options={[{ value: 'none', label: 'Aucune' }, { value: 'soft', label: 'Douce' }, { value: 'strong', label: 'Marquée' }]} />
      )}
      {kind !== 'none' && captureZoom !== undefined && (
        <div className={styles.field}>
          <span className={styles.label}>Capture dans l’écran</span>
          <SliderCapsule label="Zoom" min={1} max={2} step={0.05} value={captureZoom} onChange={(v) => onCaptureZoomChange?.(v)} defaultValue={1}
            format={(v) => `× ${v.toFixed(2).replace(/0$/, '').replace('.', ',')}`} disabled={disabled} />
          {captureHelp !== false && <p className={styles.note}>{captureHelp ?? 'Pour choisir la partie visible d’une étape : Recadrer (R).'}</p>}
        </div>
      )}
      {note !== false && <p className={styles.note}>{note ?? (vertical && kind === 'mobile' ? 'Annonce verticale : ordinateur non proposé. Enregistre au format mobile pour un rendu net.' : vertical && kind === 'tablet' ? 'Annonce verticale : la tablette est en portrait. Une capture d’ordinateur est rognée sur les côtés.' : NOTES[kind])}</p>}
    </div>
  );
}

/** Cadres proposés selon l'orientation de l'Annonce (pour corriger un choix devenu impossible, ex. Ordinateur puis passage en vertical). */
export function allowedMediaFrames(slideOrientation: MediaOrientation): MediaFrameKind[] {
  return slideOrientation === 'portrait' ? ['none', 'mobile', 'tablet'] : ['none', 'mobile', 'tablet', 'desktop'];
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

/** @deprecated 24/11 : remplacé par la position libre de MediaFrameSettings (`mediaScale`), qui agrandit et place le cadre et la capture ensemble.
 * MediaCropSettings (Figma 9825:6305) : contenu du réglage « Cadrage du média ». Zoom ×1 à ×3, point de zoom (PositionPicker item=media), lien « Réinitialiser le cadrage ». Sur la slide, le média se glisse et s'agrandit aussi par ses poignées (_MediaHandles). */
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
