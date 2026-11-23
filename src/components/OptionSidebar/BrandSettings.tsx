import type { ReactNode } from 'react';
import { GroupTab } from '../Tabs/Tabs';
import { ColorField } from '../Contrast/Contrast';
import { ButtonLink, ButtonGradient } from '../Button/ButtonMisc';
import { Logo } from '../Logo/Logo';
import { Icon } from '../Icon/Icon';
import styles from './BrandSettings.module.css';

export type EyebrowStyle = 'badge' | 'text';

export interface EyebrowSettingsProps {
  /** badge = avec fond (label tour style=badge), text = sans fond. */
  variant: EyebrowStyle;
  onVariantChange: (s: EyebrowStyle) => void;
  /** Couleur du fond (badge) ou du texte (text), #RRGGBB. */
  color: string;
  onColorChange: (hex: string) => void;
  /** Fond de la slide, pour mesurer le contraste du texte seul. */
  slideBackground?: string;
}

/** EyebrowSettings (Figma 9832:22834) : réglages du surtitre (« Nouveau ») de l'Annonce : avec ou sans fond, couleur. */
export function EyebrowSettings({ variant, onVariantChange, color, onColorChange, slideBackground = '#FFFFFF' }: EyebrowSettingsProps) {
  return (
    <div className={styles.root}>
      <GroupTab label="Style" value={variant} onChange={(v) => onVariantChange(v as EyebrowStyle)}
        items={[{ value: 'badge', label: 'Avec fond' }, { value: 'text', label: 'Sans fond' }]} />
      <ColorField label={variant === 'badge' ? 'Couleur du fond' : 'Couleur du texte'} value={color} onChange={onColorChange}
        background={variant === 'badge' ? '#0D0F11' : slideBackground} hideContrast={variant === 'badge'} />
      <p className={styles.note}>{variant === 'badge'
        ? 'Le texte passe en noir ou en blanc selon le fond, pour rester lisible.'
        : 'Sans fond, le surtitre prend la couleur choisie : vérifie le contraste avec le fond de la slide.'}</p>
    </div>
  );
}

export type BrandLogoChoice = 'told' | 'custom' | 'none';

export interface LogoSettingsProps {
  /** free : logo Told imposé (encart Offre Pro) ; paid : Told, le logo du kit ou aucun. */
  plan: 'free' | 'paid';
  value: BrandLogoChoice;
  onChange?: (v: BrandLogoChoice) => void;
  /** Logo du kit de marque (image) ; absent avec « Le mien » : on invite à l'ajouter. */
  customLogo?: ReactNode;
  kitName?: string;
  onOpenBrandKit?: () => void;
  onUpgrade?: () => void;
}

/** LogoSettings (Figma 9832:22916) : logo en bas de la slide. Offre gratuite : logo Told, non désactivable. Offre payante : Told | Le mien (kit de marque) | Aucun. L'offre est vérifiée côté serveur : ce composant ne fait que l'afficher. */
export function LogoSettings({ plan, value, onChange, customLogo, kitName = 'Kit principal', onOpenBrandKit, onUpgrade }: LogoSettingsProps) {
  if (plan === 'free') {
    return (
      <div className={styles.root}>
        <div className={styles.row}><Logo size="sm" aria-hidden="true" /><span>Logo Told affiché en bas de la slide</span></div>
        <ProUpsellCard title="Marque blanche" description="✨ Retire le logo Told de tes démos et mets le tien avec Told Pro." onAction={onUpgrade} />
      </div>
    );
  }
  return (
    <div className={styles.root}>
      <GroupTab label="Logo" value={value} onChange={(v) => onChange?.(v as BrandLogoChoice)}
        items={[{ value: 'told', label: 'Told' }, { value: 'custom', label: 'Le mien' }, { value: 'none', label: 'Aucun' }]} />
      {value === 'custom' && (
        <>
          <div className={styles.kit}>
            <span className={styles.thumb}>{customLogo}</span>
            <span>{customLogo ? `Logo du kit « ${kitName} »` : 'Pas encore de logo dans le kit'}</span>
          </div>
          {onOpenBrandKit && <div><ButtonLink iconRight={null} padding={false} onClick={onOpenBrandKit}>{customLogo ? 'Changer dans le kit de marque' : 'Ajouter mon logo au kit'}</ButtonLink></div>}
        </>
      )}
      <p className={styles.note}>{({ told: 'Le logo Told s’affiche en bas de la slide.', custom: 'Ton logo vient du kit de marque.', none: 'Aucun logo en bas de la slide.' } as const)[value]}</p>
    </div>
  );
}

export interface OptionContextHeaderProps {
  /** Élément sélectionné sur la slide : Média, Avatar, Surtitre, Titre… */
  title: ReactNode;
  hint?: ReactNode;
  onBack: () => void;
}

/** OptionContextHeader (Figma 9834:15423) : en-tête du panneau Options quand un élément de la slide est sélectionné. Le panneau ne montre alors que ses réglages ; le retour (ou Échap, géré par l'app) revient aux réglages de la slide. */
export function OptionContextHeader({ title, hint = 'Sélectionné sur la slide · Échap pour revenir', onBack }: OptionContextHeaderProps) {
  return (
    <div className={styles.context}>
      <button type="button" className={styles.back} onClick={onBack} aria-label="Revenir aux réglages de la slide">
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8.3 6.3a1 1 0 0 1 1.4 1.4L6.4 11H20a1 1 0 1 1 0 2H6.4l3.3 3.3a1 1 0 0 1-1.4 1.4l-5-5a1 1 0 0 1 0-1.4l5-5Z" /></svg>
      </button>
      <span className={styles.contextText}><strong>{title}</strong>{hint && <span>{hint}</span>}</span>
    </div>
  );
}

export interface ProUpsellCardProps {
  title: ReactNode;
  description: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

/** ProUpsellCard (Figma 9835:6785) : encart de montée en offre Told Pro (carte sombre, titre avec badge, phrase, ButtonGradient). Repris de la carte « Marque blanche » du widget Told. */
export function ProUpsellCard({ title, description, actionLabel = 'Essayez Told Pro', onAction }: ProUpsellCardProps) {
  return (
    <div className={styles.pro}>
      <span className={styles.proTitle}>
        <Icon name="new-releases" size={16} aria-hidden="true" />
        {title}
      </span>
      <p>{description}</p>
      {onAction && <ButtonGradient size="md" onClick={onAction} className={styles.proButton}>{actionLabel}</ButtonGradient>}
    </div>
  );
}
