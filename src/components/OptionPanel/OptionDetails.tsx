import { useId, type ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import { ButtonIcon } from '../Button/Button';
import { Switch } from '../Choice/Choice';
import { IconBoxedColor, type IconBoxedColorName } from '../IconBoxed/IconBoxedColor';
import styles from './OptionDetails.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export interface OptionToggleProps {
  label: ReactNode;
  /** Propriété Figma `active` : désactivé, seule la ligne s'affiche ; activé, les réglages apparaissent dessous. */
  active: boolean;
  onActiveChange: (active: boolean) => void;
  /** Réglages affichés quand l'option est active (Select, Input, upload…). */
  children?: ReactNode;
}

/**
 * Détail d'apparence (OptionProgressbarItem, OptionAvatarItem, OptionOverlayItem, OptionBlurItem, OptionCoverItem,
 * OptionLogoItem, OptionRadiusItem, OptionCloseItem, OptionSkipItem, OptionShadowItem, OptionSoundItem,
 * OptionFooterItem, OptionBadgeItem) : libellé + interrupteur lg, réglages dessous quand actif. Écart 10.
 */
export function OptionToggle({ label, active, onActiveChange, children }: OptionToggleProps) {
  const id = useId();
  return (
    <div className={styles.toggle}>
      <div className={styles.toggleRow}>
        <label htmlFor={id} className={styles.toggleLabel}>{label}</label>
        <Switch id={id} size="lg" checked={active} onChange={(e) => onActiveChange(e.target.checked)} aria-label={typeof label === 'string' ? label : undefined} />
      </div>
      {active && children && <div className={styles.toggleBody}>{children}</div>}
    </div>
  );
}

export interface FormatCardProps {
  icon: IconBoxedColorName;
  title: ReactNode;
  help?: ReactNode;
  /** Badge « Recommandé » (hasRecommended). */
  recommended?: boolean;
  selected?: boolean;
  onSelect?: () => void;
}

/** Carte de choix de format (FormatCard, 8115:12218) : 12 de marge, rayon 10 ; choisie sur Brand/surface/default, filet Brand/border/hover, coche. */
export function FormatCard({ icon, title, help, recommended, selected, onSelect }: FormatCardProps) {
  return (
    <button type="button" role="radio" aria-checked={!!selected} className={cx(styles.format, selected && styles.formatOn)} onClick={onSelect}>
      <IconBoxedColor icon={icon} size={24} />
      <span className={styles.formatText}>
        <span className={styles.formatName}>{title}{recommended && <span className={styles.reco}>Recommandé</span>}</span>
        {help && <span className={styles.formatHelp}>{help}</span>}
      </span>
      {selected && <Icon name="checkmark-circle-02" size={18} variant="solid" className={styles.formatCheck} />}
    </button>
  );
}

export interface LogicRuleProps {
  /** rule : « Si la réponse » + condition + destination ; else : « Sinon » + destination. */
  kind?: 'rule' | 'else';
  label?: ReactNode;
  /** Opérateur et valeur (Select sm + Input sm). */
  condition?: ReactNode;
  /** Destination (Select sm). */
  destination: ReactNode;
  onRemove?: () => void;
}

/** Règle de logique (LogicRule, 8115:6555) : carte Neutral/surface/subtle, rayon 12, marge 12, écart 8. */
export function LogicRule({ kind = 'rule', label = kind === 'rule' ? 'Si la réponse' : 'Sinon', condition, destination, onRemove }: LogicRuleProps) {
  return (
    <div className={styles.rule}>
      <div className={styles.ruleHead}>
        <span className={styles.ruleLabel}>{label}</span>
        {kind === 'rule' && onRemove && <ButtonIcon icon="delete-02" label="Supprimer la règle" appearance="ghost" color="neutral" size="xs" onClick={onRemove} />}
      </div>
      {kind === 'rule' && condition && <div className={styles.ruleCond}>{condition}</div>}
      <span className={styles.ruleLabel}>aller à</span>
      {destination}
    </div>
  );
}
