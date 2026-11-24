import { useId, useState, type ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import { Button, ButtonIcon } from '../Button/Button';
import { ButtonLink } from '../Button/ButtonMisc';
import { GroupTab } from '../Tabs/Tabs';
import { Badge } from '../Badge/Badge';
import { IconBoxedColor, type IconBoxedColorName } from '../IconBoxed/IconBoxedColor';
import { Switch } from '../Choice/Choice';
import styles from './OptionSidebar.module.css';

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');

/* ---------- PanelHeader ---------- */

export interface PanelHeaderProps {
  /** Picto du type (instance exposée « Type »). */
  icon: IconBoxedColorName;
  title: ReactNode;
  description?: ReactNode;
  /** Lien « Changer de type » (`hasChangeType`). */
  onChangeType?: () => void;
  changeTypeLabel?: string;
  /** Lien de retour (« ← Question 1 ») quand un bloc ou un mini-bloc est sélectionné (`hasBack` + `backLabel`). */
  backLabel?: ReactNode;
  onBack?: () => void;
  /** Menu « … » à droite. */
  onMenu?: () => void;
  menuLabel?: string;
}

/** PanelHeader (7851:8151) : en-tête de contexte du panneau d'options. Picto 32, titre Body/16 SemiBold, description Body/12. */
export function PanelHeader({ icon, title, description, onChangeType, changeTypeLabel = 'Changer de type', backLabel, onBack, onMenu, menuLabel = 'Plus d’actions' }: PanelHeaderProps) {
  return (
    <div className={styles.header}>
      {backLabel && (
        <button type="button" className={styles.back} onClick={onBack}>
          <Icon name="arrow-left-01" size={14} />
          <span>{backLabel}</span>
        </button>
      )}
      <div className={styles.headRow}>
        <IconBoxedColor icon={icon} size={32} />
        <div className={styles.headText}>
          <div className={styles.headTitle}>{title}</div>
          {(description || onChangeType) && (
            <div className={styles.headSub}>
              {description && <span className={styles.headDesc}>{description}</span>}
              {onChangeType && <ButtonLink size="sm" padding={false} iconRight={null} onClick={onChangeType}>{changeTypeLabel}</ButtonLink>}
            </div>
          )}
        </div>
        {onMenu && <ButtonIcon icon="more-horizontal" label={menuLabel} size="xs" onClick={onMenu} />}
      </div>
    </div>
  );
}

/* ---------- OptionItem ---------- */

export interface OptionItemProps {
  /** Sorte de ligne (OptionItem type=generic, 20/11) : row = valeur et action ou interrupteur à droite, sans contenu ; collapsible = chevron ; open = contenu toujours visible. Absent : ancien comportement (bouton « Modifier »). */
  variant?: 'row' | 'collapsible' | 'open';
  icon?: IconBoxedColorName;
  label: ReactNode;
  /** Résumé du réglage en cours (badge gris à côté du libellé, ex. « Widget »). */
  value?: ReactNode;
  /** Astérisque d'obligation (`require`). */
  required?: boolean;
  /** Badge « Pro » (`hasPro`). */
  pro?: boolean;
  /** Ouvert : affiche le contenu (`state=open`). Contrôlé si fourni. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Libellé du bouton quand l'option est fermée. */
  actionLabel?: string;
  /** Réglages de l'option (FormatCard, champs, ChoiceChips, SliderCapsule…). */
  children?: ReactNode;
  /** Lien d'action à droite (« Sélectionner », « Recadrer »). */
  onAction?: () => void;
  /**
   * Réglage court posé directement sur la ligne (hasControl, 21/11). Avec `variant="row"`, sans `value` :
   * pas de badge ni de dépliage, on gagne un clic.
   * - Une valeur à choisir (Durée « Auto · 3 s ») : Button neutre secondary-outline md + chevron, qui ouvre un DropdownMenu.
   * - Une action (« Recadrer », « Déplacer », « Régler », « Changer de page ») : Button primary-outline xs (23/11), comme « Modifier ».
   */
  control?: ReactNode;
  /** Interrupteur à droite (hasToggle). `disabled` : lecture seule ou réglage tenu par un collègue. */
  toggle?: { checked: boolean; onChange: (checked: boolean) => void; label?: string; disabled?: boolean };
  /** Aide de l'icône (i) (hasInfo) : bouton focalisable, lue par les lecteurs d'écran. */
  info?: string;
  /** Collaboration : nom du collègue qui modifie ce réglage (« Léa modifie ce réglage », texte bleu et point). */
  holder?: ReactNode;
  /** Collaboration : réglage en conflit (point orange après le libellé). */
  conflict?: boolean;
  /** Texte du conflit, lu par les lecteurs d'écran. */
  conflictLabel?: string;
  /** Id du libellé, pour nommer les champs de la section (`aria-labelledby`). Généré si absent. */
  labelId?: string;
  /** Niveau du titre de section (défaut 3). `false` : pas de titre. */
  headingLevel?: 2 | 3 | 4 | false;
}

/** OptionItem (6031:85291) : une option repliable de la colonne de réglages. Marge 12/14, filet bas Neutral/border/default. */
export function OptionItem({ variant, icon, label, value, required, pro, open, defaultOpen = false, onOpenChange, actionLabel = 'Modifier', children, onAction, control: inline, toggle: sw, info, holder, conflict, conflictLabel = 'Réglage en conflit', labelId, headingLevel = 3 }: OptionItemProps) {
  const [inner, setInner] = useState(defaultOpen);
  const isOpen = variant === 'open' ? true : variant === 'row' ? false : (open ?? inner);
  const cid = useId();
  const lid = labelId ?? `${cid}-label`;
  const toggle = () => { const n = !isOpen; if (open === undefined) setInner(n); onOpenChange?.(n); };
  if (variant) {
    const head = (
      <>
        {icon && <IconBoxedColor icon={icon} size={20} />}
        <span id={lid} className={styles.itemLabel}>{label}{required && <span className={styles.required} aria-label="obligatoire">*</span>}</span>
        {conflict && <span className={styles.conflict} role="img" aria-label={conflictLabel} />}
        {pro && <Badge color="pink-gradient" appearance="fill" size="xs">Pro</Badge>}
        {value && <Badge color="light-gray" size="xs">{value}</Badge>}
      </>
    );
    const control = variant === 'collapsible'
      ? <button type="button" className={styles.itemToggle} aria-expanded={isOpen} aria-controls={cid} onClick={toggle}>{head}</button>
      : <div className={styles.itemToggle}>{head}</div>;
    const H = headingLevel ? (`h${headingLevel}` as 'h2' | 'h3' | 'h4') : null;
    return (
      <section className={cx(styles.item, isOpen && styles.itemOpen)} aria-labelledby={lid}>
        <div className={styles.itemHead}>
          {H ? <H className={styles.itemHeading}>{control}</H> : control}
          {info && <button type="button" className={styles.info} aria-label={info} title={info}><Icon name="information-circle" size={14} variant="solid" /></button>}
          {onAction && <ButtonLink size="sm" padding={false} iconRight={null} onClick={onAction}>{actionLabel}</ButtonLink>}
          {inline && <span className={styles.inlineControl}>{inline}</span>}
          {sw && <Switch size="sm" checked={sw.checked} disabled={sw.disabled} onChange={(e) => sw.onChange(e.currentTarget.checked)} aria-label={sw.label ?? (typeof label === 'string' ? label : undefined)} />}
          {variant === 'collapsible' && <span className={styles.chevronHit} onClick={toggle} aria-hidden="true"><Icon name={isOpen ? 'arrow-up-01' : 'arrow-down-01'} size={16} className={styles.chevron} /></span>}
        </div>
        {holder && <p className={styles.holder}><span className={styles.holderDot} aria-hidden="true" />{holder} modifie ce réglage</p>}
        {isOpen && children && <div id={cid} className={styles.itemBody}>{children}</div>}
      </section>
    );
  }
  return (
    <section className={cx(styles.item, isOpen && styles.itemOpen)}>
      <div className={styles.itemHead}>
        <button type="button" className={styles.itemToggle} aria-expanded={isOpen} aria-controls={cid} onClick={toggle}>
          {icon && <IconBoxedColor icon={icon} size={20} />}
          <span className={styles.itemLabel}>{label}{required && <span className={styles.required} aria-label="obligatoire">*</span>}</span>
          {pro && <Badge color="pink-gradient" appearance="fill" size="xs">Pro</Badge>}
          {value && <Badge color="light-gray" size="xs">{value}</Badge>}
        </button>
        {!isOpen && children && <Button variant="primary-outline" size="xs" onClick={toggle}>{actionLabel}</Button>}
        {isOpen && <ButtonIcon icon="arrow-up-01" label="Replier" size="xs" onClick={toggle} />}
      </div>
      {isOpen && children && <div id={cid} className={styles.itemBody}>{children}</div>}
    </section>
  );
}

/* ---------- OptionSidebar ---------- */

export interface OptionSidebarProps {
  /** En-tête (PanelHeader). */
  header: ReactNode;
  /** Bascule Étape / Bloc (GroupTab sm). Absente si non fournie. */
  scopes?: { value: string; label: ReactNode }[];
  scope?: string;
  onScopeChange?: (value: string) => void;
  /** Bloc « Demander à Told » ou autre, entre la bascule et les options. */
  assist?: ReactNode;
  /** Les OptionItem. */
  children: ReactNode;
  width?: number;
}

/** OptionSidebar (6031:85898) : colonne d'options de l'éditeur. 356 de large, en-tête 16/16/12, bascule 4/16/12, puis les options. */
export function OptionSidebar({ header, scopes, scope, onScopeChange, assist, children, width = 356 }: OptionSidebarProps) {
  return (
    <aside className={styles.panel} style={{ width }} data-option-sidebar="">
      <div className={styles.panelHead}>{header}</div>
      {scopes && scope !== undefined && (
        <div className={styles.panelScope}>
          <GroupTab size="sm" items={scopes} value={scope} onChange={onScopeChange} aria-label="Portée des réglages" />
        </div>
      )}
      {assist}
      <div className={styles.options}>{children}</div>
    </aside>
  );
}

/** @deprecated Ancien nom (avant le 20/11) : utiliser OptionSidebar. */
export const OptionPanel = OptionSidebar;
/** @deprecated Ancien nom (avant le 20/11) : utiliser OptionItem. */
export const OptionPanelItem = OptionItem;
/** @deprecated Ancien nom : utiliser OptionSidebarProps. */
export type OptionPanelProps = OptionSidebarProps;
/** @deprecated Ancien nom : utiliser OptionItemProps. */
export type OptionPanelItemProps = OptionItemProps;
