import { useId, type ReactNode } from 'react';
import { Switch, Checkbox, Radio } from '../Choice/Choice';
import { Select, type SelectOption } from '../Select/Select';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { Alert } from '../Alert/Alert';
import { Icon, type IconName } from '../Icon/Icon';
import { SliderCapsule } from '../Slider/SliderCapsule';
import { ColorField } from '../Contrast/Contrast';
import { ToneChoice, type TextTone } from '../ColorPicker/ColorPicker';
import { OptionChoiceGroup } from '../OptionSidebar/OptionCard';
import { ProUpsellCard } from '../OptionSidebar/BrandSettings';
import styles from './Customisation.module.css';

/*
 * Réglages d'apparence (Figma OptionCustomisation 1043:135563, cadre « Réglages d'apparence Told »).
 * Un composant par `type` Figma, posé dans le contenu d'une OptionItem ouverte. Les couleurs (bg-color-*,
 * color, font-color-light) sont le ColorPicker ; la position est le PositionPicker.
 * Tout est contrôlé : l'app garde les valeurs et reçoit les changements.
 */

/** Interrupteur en tête d'un réglage (libellé à gauche, interrupteur à droite). */
function Head({ label, checked, onChange, disabled }: { label: string; checked: boolean; onChange?: (on: boolean) => void; disabled?: boolean }) {
  return <Switch size="sm" label={label} checkPlacement="right" checked={checked} disabled={disabled} onChange={(e) => onChange?.(e.target.checked)} />;
}

/** Emplacement d'image (avatar, couverture, logo) : aperçu ou picto, et « Ajouter » / « Changer ». */
function ImageSlot({ image, icon, onPick, label }: { image?: ReactNode; icon: IconName; onPick?: () => void; label: string }) {
  return (
    <div className={styles.slot}>
      <span className={styles.thumb} aria-hidden={!image}>{image ?? <Icon name={icon} size={20} />}</span>
      <Button variant="secondary-outline" color="neutral" size="sm" iconLeft={image ? undefined : 'add-01'} onClick={onPick} aria-label={`${image ? 'Changer' : 'Ajouter'} : ${label}`}>
        {image ? 'Changer' : 'Ajouter'}
      </Button>
    </div>
  );
}

// type=overlay -------------------------------------------------------------
export interface OverlaySettingsProps { enabled: boolean; onEnabledChange?: (on: boolean) => void; tone: TextTone; onToneChange?: (t: TextTone) => void; blur: boolean; onBlurChange?: (on: boolean) => void }
/** Voile derrière le widget : clair ou sombre, avec ou sans flou. */
export function OverlaySettings({ enabled, onEnabledChange, tone, onToneChange, blur, onBlurChange }: OverlaySettingsProps) {
  return (
    <div className={styles.root}>
      <Head label="Voile" checked={enabled} onChange={onEnabledChange} />
      {enabled && <>
        <ToneChoice label="Teinte du voile" value={tone} onChange={(t) => onToneChange?.(t)} />
        <Head label="Flou" checked={blur} onChange={onBlurChange} />
      </>}
    </div>
  );
}

// type=progress-bar --------------------------------------------------------
export interface ProgressSettingsProps { enabled: boolean; onEnabledChange?: (on: boolean) => void; style: string; onStyleChange?: (s: string) => void; styles?: SelectOption[] }
const PROGRESS_STYLES: SelectOption[] = [{ value: 'steps', label: 'Étapes' }, { value: 'bar', label: 'Barre continue' }, { value: 'count', label: 'Compteur (2 / 5)' }];
/** Barre de progression : affichée ou non, et son style. */
export function ProgressSettings({ enabled, onEnabledChange, style, onStyleChange, styles: options = PROGRESS_STYLES }: ProgressSettingsProps) {
  return (
    <div className={styles.root}>
      <Head label="Barre de progression" checked={enabled} onChange={onEnabledChange} />
      {enabled && <Select label="Style" size="sm" options={options} value={style} onChange={onStyleChange} />}
    </div>
  );
}

// type=footer ----------------------------------------------------------------
export interface FooterSettingsProps { hideFooter: boolean; onHideFooterChange?: (on: boolean) => void; hideBadge: boolean; onHideBadgeChange?: (on: boolean) => void; plan: 'free' | 'paid'; onUpgrade?: () => void }
/** Pied de page et badge Told. En offre gratuite, le badge reste : la case est désactivée et la carte Marque blanche s'affiche. */
export function FooterSettings({ hideFooter, onHideFooterChange, hideBadge, onHideBadgeChange, plan, onUpgrade }: FooterSettingsProps) {
  const free = plan === 'free';
  return (
    <div className={styles.root}>
      <Head label="Cacher le pied de page" checked={hideFooter} onChange={onHideFooterChange} />
      <Checkbox label="Cacher le badge Told" checked={!free && hideBadge} disabled={free} onChange={(e) => onHideBadgeChange?.(e.target.checked)} />
      {free && <ProUpsellCard title="Marque blanche" description="✨ Retire le badge Told de tes enquêtes et fais briller ta marque avec Told Pro." onAction={onUpgrade} />}
    </div>
  );
}

// type=avatar ----------------------------------------------------------------
export interface WidgetAvatarSettingsProps { enabled: boolean; onEnabledChange?: (on: boolean) => void; image?: ReactNode; onPick?: () => void; name: string; onNameChange?: (name: string) => void }
/** Avatar du widget : photo et nom affichés en tête des questions. */
export function WidgetAvatarSettings({ enabled, onEnabledChange, image, onPick, name, onNameChange }: WidgetAvatarSettingsProps) {
  return (
    <div className={styles.root}>
      <Head label="Avatar" checked={enabled} onChange={onEnabledChange} />
      {enabled && <>
        <ImageSlot image={image} icon="user" onPick={onPick} label="photo de l’avatar" />
        <Input size="sm" aria-label="Nom de l’avatar" placeholder="Saisir un nom" value={name} onChange={(e) => onNameChange?.(e.target.value)} />
      </>}
    </div>
  );
}

// type=label -------------------------------------------------------------------
export interface LabelSettingsProps { enabled: boolean; onEnabledChange?: (on: boolean) => void; kind: 'badge' | 'text'; onKindChange?: (k: 'badge' | 'text') => void }
/** Étiquette au-dessus du titre : en badge ou en texte. */
export function LabelSettings({ enabled, onEnabledChange, kind, onKindChange }: LabelSettingsProps) {
  return (
    <div className={styles.root}>
      <Head label="Label" checked={enabled} onChange={onEnabledChange} />
      {enabled && <OptionChoiceGroup aria-label="Forme du label" value={kind} onChange={(v) => onKindChange?.(v as 'badge' | 'text')}
        options={[{ value: 'badge', label: 'Badge' }, { value: 'text', label: 'Texte' }]} />}
    </div>
  );
}

// type=close -------------------------------------------------------------------
export interface CloseSettingsProps { hideClose: boolean; onHideCloseChange?: (on: boolean) => void; tone: TextTone; onToneChange?: (t: TextTone) => void; hideSkip: boolean; onHideSkipChange?: (on: boolean) => void }
/** Fermeture du widget : croix claire ou sombre, et « Passer le tour ». Masquer les deux laisse l'utilisateur sans sortie : on prévient. */
export function CloseSettings({ hideClose, onHideCloseChange, tone, onToneChange, hideSkip, onHideSkipChange }: CloseSettingsProps) {
  return (
    <div className={styles.root}>
      <Head label="Masquer la fermeture" checked={hideClose} onChange={onHideCloseChange} />
      {!hideClose && <ToneChoice label="Couleur de la croix" showLabel value={tone} onChange={(t) => onToneChange?.(t)} />}
      <Head label="Masquer « Passer le tour »" checked={hideSkip} onChange={onHideSkipChange} />
      {(hideClose || hideSkip) && (
        <Alert type="warning" size="sm" title="Prévois une sortie">
          Sans fermeture ni « Passer le tour », ajoute un bouton ou un lien qui permet de quitter.
        </Alert>
      )}
    </div>
  );
}

// type=couverture / type=logo --------------------------------------------------
export interface ImageSettingsProps { enabled: boolean; onEnabledChange?: (on: boolean) => void; image?: ReactNode; onPick?: () => void }
/** Image de couverture en tête du widget. */
export function CoverSettings({ enabled, onEnabledChange, image, onPick }: ImageSettingsProps) {
  return (
    <div className={styles.root}>
      <Head label="Couverture" checked={enabled} onChange={onEnabledChange} />
      {enabled && <ImageSlot image={image} icon="image-03" onPick={onPick} label="image de couverture" />}
    </div>
  );
}
/** Logo en tête du widget. */
export function WidgetLogoSettings({ enabled, onEnabledChange, image, onPick }: ImageSettingsProps) {
  return (
    <div className={styles.root}>
      <Head label="Logo" checked={enabled} onChange={onEnabledChange} />
      {enabled && <ImageSlot image={image} icon="building-02" onPick={onPick} label="logo" />}
    </div>
  );
}

// type=sound-design ---------------------------------------------------------------
export interface SoundOption { value: string; label: string; description: string }
export interface SoundSettingsProps { enabled: boolean; onEnabledChange?: (on: boolean) => void; sound: string; onSoundChange?: (s: string) => void; sounds: SoundOption[]; onPlay?: (s: string) => void }
/** Sons du widget : une ambiance sonore parmi plusieurs, à écouter avant de choisir. */
export function SoundSettings({ enabled, onEnabledChange, sound, onSoundChange, sounds, onPlay }: SoundSettingsProps) {
  const name = useId();
  return (
    <div className={styles.root}>
      <Head label="Sound design" checked={enabled} onChange={onEnabledChange} />
      {enabled && <>
        <Button size="sm" iconLeft="play" onClick={() => onPlay?.(sound)} className={styles.full}>Écouter le son</Button>
        <div role="radiogroup" aria-label="Ambiance sonore" className={styles.list}>
          {sounds.map((s) => (
            <Radio key={s.value} boxed name={name} value={s.value} label={s.label} description={s.description}
              checked={s.value === sound} onChange={() => onSoundChange?.(s.value)} />
          ))}
        </div>
      </>}
    </div>
  );
}

// type=radius ----------------------------------------------------------------------
export type RadiusChoice = 'none' | 'sm' | 'md' | 'lg';
/** Arrondi des éléments du widget (cartes, boutons, champs). */
export function RadiusSettings({ value, onChange }: { value: RadiusChoice; onChange?: (v: RadiusChoice) => void }) {
  return (
    <div className={styles.root}>
      <span className={styles.label}>Arrondi des éléments</span>
      <OptionChoiceGroup aria-label="Arrondi des éléments" value={value} onChange={(v) => onChange?.(v as RadiusChoice)}
        options={[{ value: 'none', label: 'Angle droit' }, { value: 'sm', label: 'Légèrement arrondi' }, { value: 'md', label: 'Très arrondi' }, { value: 'lg', label: 'Arrondi' }]} />
    </div>
  );
}

// type=boutons-icons ------------------------------------------------------------------
export interface NavButton { icon: string; label: string }
export interface NavButtonsSettingsProps { right: NavButton; left: NavButton; onChange?: (side: 'right' | 'left', b: NavButton) => void; icons?: SelectOption[] }
const NAV_ICONS: SelectOption[] = [{ value: 'none', label: 'Aucune' }, { value: 'arrow-right-01', label: 'Flèche droite', icon: 'arrow-right-01' }, { value: 'arrow-left-01', label: 'Flèche gauche', icon: 'arrow-left-01' }];
/** Boutons Suivant et Précédent : icône et libellé par défaut, personnalisables étape par étape. */
export function NavButtonsSettings({ right, left, onChange, icons = NAV_ICONS }: NavButtonsSettingsProps) {
  const side = (key: 'right' | 'left', title: string, b: NavButton) => (
    <fieldset className={styles.group}>
      <legend className={styles.label}>{title}</legend>
      <Select size="sm" aria-label={`${title} : icône`} options={icons} value={b.icon} onChange={(icon) => onChange?.(key, { ...b, icon })} />
      <Input size="sm" label="Libellé par défaut" value={b.label} onChange={(e) => onChange?.(key, { ...b, label: e.target.value })} />
    </fieldset>
  );
  return (
    <div className={styles.root}>
      {side('right', 'Bouton droit', right)}
      {side('left', 'Bouton gauche', left)}
      <Alert type="brand" size="sm">Ce sont les textes par défaut des boutons. Tu peux les changer pour chaque étape dans l’option « Bouton ».</Alert>
    </div>
  );
}

// type=shadow -------------------------------------------------------------------------
export interface ShadowSettingsProps { enabled: boolean; onEnabledChange?: (on: boolean) => void; level: string; onLevelChange?: (l: string) => void; opacity: number; onOpacityChange?: (o: number) => void; color: string; onColorChange?: (c: string) => void }
/** Ombre du widget : intensité, opacité et couleur. */
export function ShadowSettings({ enabled, onEnabledChange, level, onLevelChange, opacity, onOpacityChange, color, onColorChange }: ShadowSettingsProps) {
  return (
    <div className={styles.root}>
      <Head label="Ombre" checked={enabled} onChange={onEnabledChange} />
      {enabled && <>
        <Select size="sm" aria-label="Intensité de l’ombre" options={[{ value: 'light', label: 'Légère' }, { value: 'medium', label: 'Moyenne' }, { value: 'strong', label: 'Marquée' }]} value={level} onChange={onLevelChange} />
        <SliderCapsule label="Opacité" min={0} max={100} value={opacity} onChange={(v) => onOpacityChange?.(v)} format={(v) => `${v} %`} />
        <ColorField label="Couleur" value={color} onChange={onColorChange} hideContrast />
      </>}
    </div>
  );
}

// type=glass ---------------------------------------------------------------------------
export interface GlassSettingsProps { shadow: boolean; onShadowChange?: (on: boolean) => void; animatedLight: boolean; onAnimatedLightChange?: (on: boolean) => void }
/** Effets du verre : ombre et lumière animée sur le contour. */
export function GlassSettings({ shadow, onShadowChange, animatedLight, onAnimatedLightChange }: GlassSettingsProps) {
  return (
    <div className={styles.root}>
      <Head label="Ombre" checked={shadow} onChange={onShadowChange} />
      <Head label="Lumière animée" checked={animatedLight} onChange={onAnimatedLightChange} />
    </div>
  );
}
