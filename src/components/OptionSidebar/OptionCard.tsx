import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import { Switch } from '../Choice/Choice';
import { Badge } from '../Badge/Badge';
import styles from './OptionCard.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export interface OptionCardProps {
  /** Picto 18 dans le carré blanc de 36. */
  icon: IconName;
  title: ReactNode;
  description?: ReactNode;
  /**
   * Interrupteur à droite (Figma `control=switch`). Seul l'interrupteur porte l'état : la carte reste grise.
   * Sans `toggle`, passer `control` (Figma `control=custom`).
   */
  toggle?: { checked: boolean; onChange: (checked: boolean) => void; disabled?: boolean };
  /** Contrôle au choix à droite, à la place de l'interrupteur (ex. GroupTab Paysage / Vertical). Taille md ou lg, jamais sm. */
  control?: ReactNode;
  /** Contenu ouvert sous la ligne quand l'option est active (champ md + bouton). Affiché si `toggle.checked`, ou toujours sans `toggle`. */
  children?: ReactNode;
  className?: string;
}

/**
 * OptionCard (9153:113883, ex-SwitchOptionCard) : ligne d'option d'un canal (Diffuser) ou d'un réglage.
 * Fond Neutral/surface/subtle dans tous les états, rayon 12, marges 16, picto dans un carré blanc.
 */
export function OptionCard({ icon, title, description, toggle, control, children, className }: OptionCardProps) {
  const open = toggle ? toggle.checked : true;
  return (
    <div className={cx(styles.card, className)}>
      <div className={styles.row}>
        <span className={styles.picto} aria-hidden="true"><Icon name={icon} size={18} /></span>
        {toggle ? (
          <Switch className={styles.switch} size="md" checkPlacement="right" label={title} description={description}
            checked={toggle.checked} disabled={toggle.disabled} onChange={(e) => toggle.onChange(e.currentTarget.checked)} />
        ) : (
          <>
            <span className={styles.text}>
              <span className={styles.title}>{title}</span>
              {description && <span className={styles.desc}>{description}</span>}
            </span>
            {control && <span className={styles.control}>{control}</span>}
          </>
        )}
      </div>
      {open && children && <div className={styles.content}>{children}</div>}
    </div>
  );
}

export interface OptionChoiceData {
  value: string;
  label: ReactNode;
  /** Picto 14 dans le petit carré à contour. */
  icon?: IconName;
  /** Badge facultatif (« New », « Pro »). */
  badge?: ReactNode;
  disabled?: boolean;
}

export interface OptionChoiceGroupProps {
  options: OptionChoiceData[];
  value: string;
  onChange: (value: string) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  className?: string;
}

/**
 * OptionChoice (4722:47894, ex-SelectionItem) : liste de choix ouverte sous une OptionItem (personnalisation, popover).
 * Picto dans un petit carré, libellé, badge ; un seul choix (radio), fond bleu pâle sur le choix coché. Flèches au clavier.
 */
export function OptionChoiceGroup({ options, value, onChange, className, ...rest }: OptionChoiceGroupProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const enabled = options.map((o, i) => (o.disabled ? -1 : i)).filter((i) => i >= 0);
  const current = options.findIndex((o) => o.value === value);
  const tabbable = enabled.includes(current) ? current : enabled[0];
  const onKey = (e: KeyboardEvent, i: number) => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(e.key)) return;
    e.preventDefault();
    const pos = enabled.indexOf(i);
    const next = enabled[(pos + (e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1) + enabled.length) % enabled.length];
    refs.current[next]?.focus(); onChange(options[next].value);
  };
  return (
    <div role="radiogroup" aria-label={rest['aria-label']} aria-labelledby={rest['aria-labelledby']} className={cx(styles.choices, className)}>
      {options.map((o, i) => {
        const on = o.value === value;
        return (
          <button key={o.value} ref={(el) => { refs.current[i] = el; }} type="button" role="radio" aria-checked={on} disabled={o.disabled}
            tabIndex={i === tabbable ? 0 : -1} className={cx(styles.choice, on && styles.choiceOn)}
            onClick={() => onChange(o.value)} onKeyDown={(e) => onKey(e, i)}>
            {o.icon && <span className={styles.choiceIcon} aria-hidden="true"><Icon name={o.icon} size={14} /></span>}
            <span className={styles.choiceLabel}>{o.label}</span>
            {o.badge && <Badge color="purple" size="xs">{o.badge}</Badge>}
          </button>
        );
      })}
    </div>
  );
}
