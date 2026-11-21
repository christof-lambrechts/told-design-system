import { useRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import { ButtonIcon, Button } from '../Button/Button';
import styles from './IntentInput.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export interface PromptChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: ReactNode;
  icon?: IconName;
  /** Menu ouvert : état « open ». Le menu lui-même (DropdownMenu) est posé par l'écran. */
  open?: boolean;
}

/** _PromptChip (8715:100255) : réglage dans le pied du champ (cible, langue, ton), 28 de haut, rayon 6, chevron. */
export function PromptChip({ children, icon, open, className, ...rest }: PromptChipProps) {
  return (
    <button type="button" aria-haspopup="menu" aria-expanded={!!open} className={cx(styles.chip, open && styles.chipOpen, className)} {...rest}>
      {icon && <Icon name={icon} size={14} />}
      <span>{children}</span>
      <Icon name="arrow-down-01" size={12} />
    </button>
  );
}

export interface IntentInputProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (v: string) => void;
  placeholder?: string;
  /** default : zone de 3 lignes et pied ; compact : une ligne de 40. */
  size?: 'default' | 'compact';
  /** ai : contour en dégradé violet → bleu et étoile devant le texte. */
  emphasis?: 'default' | 'ai';
  /** Réglages du pied (PromptChip), hasControls. */
  controls?: ReactNode;
  /** Aide du pied (hasHint). */
  hint?: ReactNode;
  /** Micro (hasMic) ; `listening` passe le champ en écoute. */
  onMic?: () => void;
  listening?: boolean;
  disabled?: boolean;
  'aria-label'?: string;
}

/** IntentInput (7865:516) : champ de consigne pour l'IA. Entrée envoie, Maj + Entrée va à la ligne. Envoyer est neutre tant que le champ est vide, de marque dès qu'il y a du texte. */
export function IntentInput({ value, onChange, onSubmit, placeholder = 'Que veux-tu obtenir ? Décris ton parcours', size = 'default', emphasis = 'default', controls, hint = 'Entrée pour envoyer, Maj + Entrée pour aller à la ligne', onMic, listening, disabled, ...rest }: IntentInputProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const filled = value.trim().length > 0;
  const submit = () => { if (filled && !disabled) onSubmit(value.trim()); };
  const send = (
    <ButtonIcon icon="arrow-up-02" label="Envoyer" size="sm" appearance={filled || listening ? 'fill' : 'ghost'} color={filled || listening ? 'brand' : 'neutral'} disabled={!filled || disabled} onClick={submit} />
  );
  const mic = onMic && <ButtonIcon icon="mic-01" label={listening ? 'Arrêter la dictée' : 'Dicter'} size="sm" appearance={listening ? 'subtle' : 'ghost'} color={listening ? 'brand' : 'neutral'} onClick={onMic} aria-pressed={!!listening} />;
  return (
    <div className={cx(styles.box, styles[size], emphasis === 'ai' && styles.ai, listening && styles.listening, disabled && styles.disabled)} onClick={() => ref.current?.focus()}>
      {size === 'compact' && <Icon name="ai-magic" size={18} variant="solid" className={styles.spark} />}
      <div className={styles.zone}>
        {size === 'default' && emphasis === 'ai' && <Icon name="ai-magic" size={16} variant="solid" className={styles.spark} />}
        <textarea ref={ref} className={styles.textarea} value={value} placeholder={placeholder} rows={size === 'compact' ? 1 : 3} disabled={disabled}
          aria-label={rest['aria-label'] ?? placeholder} onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); submit(); } }} />
      </div>
      <div className={styles.foot}>
        {size === 'default' && controls && <div className={styles.controls}>{controls}</div>}
        {size === 'default' && hint && <span className={styles.hint} aria-live="polite">{listening ? 'Je t’écoute, parle librement' : hint}</span>}
        {mic}
        {send}
      </div>
    </div>
  );
}

export interface QuickSuggestionProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: ReactNode;
  icon?: IconName | false;
  selected?: boolean;
}

/** QuickSuggestion (7866:506) : pilule de consigne prête à l'emploi sous le champ IA. Icône violette ; sélection en violet. */
export function QuickSuggestion({ children, icon = 'ai-magic', selected, className, ...rest }: QuickSuggestionProps) {
  return (
    <button type="button" aria-pressed={!!selected} className={cx(styles.suggestion, !icon && styles.suggestionNoIcon, selected && styles.suggestionSelected, className)} {...rest}>
      {icon && <Icon name={icon} size={14} variant="solid" className={styles.suggestionIcon} />}
      <span>{children}</span>
    </button>
  );
}

export interface IntentPanelProps {
  /** Le champ IntentInput. */
  input: ReactNode;
  /** Phrase et bouton de l'autre voie (hasSecondaryAction), ex. « Ou enregistre-le toi-même » + « Enregistrer ». */
  secondaryText?: ReactNode;
  secondaryAction?: { label: string; onClick: () => void; color?: 'rec' | 'neutral' };
  /** QuickSuggestion (hasSuggestions). */
  suggestions?: ReactNode;
}

/** IntentPanel (8715:100435) : bandeau gris (rayon 20) qui porte le champ et l'action secondaire, puis les suggestions rapides. */
export function IntentPanel({ input, secondaryText, secondaryAction, suggestions }: IntentPanelProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.band}>
        {input}
        {(secondaryText || secondaryAction) && (
          <div className={styles.secondary}>
            <span className={styles.secondaryText}>{secondaryText}</span>
            {secondaryAction && (
              <Button size="sm" color={secondaryAction.color ?? 'neutral'} variant={secondaryAction.color === 'rec' ? 'primary' : 'secondary-outline'} onClick={secondaryAction.onClick}>{secondaryAction.label}</Button>
            )}
          </div>
        )}
      </div>
      {suggestions && <div className={styles.suggestions}>{suggestions}</div>}
    </div>
  );
}
