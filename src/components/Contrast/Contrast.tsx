import { useEffect, useRef, useState, type HTMLAttributes } from 'react';
import { Icon } from '../Icon/Icon';
import { ColorPicker, type TextTone } from '../ColorPicker/ColorPicker';
import pickerStyles from '../ColorPicker/ColorPicker.module.css';
import { contrastRatio, contrastThreshold, fixContrast, formatRatio, type ContrastLevel } from './contrastMath';
import styles from './Contrast.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export interface ContrastBadgeProps extends Omit<HTMLAttributes<HTMLElement>, 'onClick'> {
  level?: ContrastLevel;
  /** Ratio mesuré ; le badge passe au vert ou au rouge selon le seuil du niveau. */
  ratio: number;
  /** Affiche le ratio après le niveau (hasRatio). */
  showRatio?: boolean;
  /** Chevron : le badge ouvre le menu de niveau (hasChevron). Rendu en bouton si `onClick`. */
  onClick?: () => void;
  expanded?: boolean;
}

/** ContrastBadge (8715:98116) : niveau AA ou AAA, coche verte ou croix rouge, ratio, chevron. */
export function ContrastBadge({ level = 'AA', ratio, showRatio = true, onClick, expanded, className, ...rest }: ContrastBadgeProps) {
  const ok = ratio >= contrastThreshold[level];
  const content = (
    <>
      <Icon name={ok ? 'tick-02' : 'cancel-01'} size={12} variant="solid" />
      <span>{level}</span>
      {showRatio && <span className={styles.ratio}>{formatRatio(ratio)}</span>}
      {onClick && <Icon name="arrow-down-01" size={12} />}
    </>
  );
  const cls = cx(styles.badge, ok ? styles.pass : styles.fail, className);
  const label = `Contraste ${formatRatio(ratio)}, ${ok ? 'conforme' : 'non conforme'} ${level}`;
  return onClick ? (
    <button type="button" className={cx(cls, styles.clickable)} aria-label={label} aria-haspopup="menu" aria-expanded={expanded} onClick={onClick} {...rest}>{content}</button>
  ) : (
    <span className={cls} aria-label={label} {...rest}>{content}</span>
  );
}

export interface ContrastMenuProps {
  level: ContrastLevel;
  onLevelChange: (l: ContrastLevel) => void;
  color: string;
  background: string;
  /** Applique la couleur corrigée. Masqué si la couleur passe déjà. */
  onFix?: (fixed: string) => void;
}

/** _ContrastMenu (8734:563) : choix du niveau et « Corriger la couleur » avec l'aperçu avant → après. */
export function ContrastMenu({ level, onLevelChange, color, background, onFix }: ContrastMenuProps) {
  const fixed = fixContrast(color, background, level);
  const needsFix = fixed !== color.toUpperCase();
  return (
    <div role="menu" className={styles.menu}>
      <div className={styles.menuTitle}>Niveau visé</div>
      {(['AA', 'AAA'] as const).map((l) => (
        <button key={l} type="button" role="menuitemradio" aria-checked={l === level} className={styles.menuItem} onClick={() => onLevelChange(l)}>
          <span className={styles.menuLabel}>
            <strong>{l}</strong> <span className={styles.menuHint}>{l === 'AA' ? 'ratio 4,5 minimum' : 'ratio 7 minimum'}</span>
          </span>
          {l === level && <Icon name="tick-02" size={16} className={styles.menuCheck} />}
        </button>
      ))}
      {needsFix && onFix && (
        <>
          <div className={styles.menuSep} />
          <button type="button" role="menuitem" className={styles.menuItem} onClick={() => onFix(fixed)}>
            <span className={styles.menuLabel}>
              <Icon name="paint-bucket" size={16} /> Corriger la couleur
            </span>
            <span className={styles.preview}>
              <span className={styles.swatch} style={{ background: color }} />
              <Icon name="arrow-right-01" size={12} />
              <span className={styles.swatch} style={{ background: fixed }} />
              <span className={styles.mono}>{formatRatio(contrastRatio(fixed, background))}</span>
            </span>
          </button>
        </>
      )}
    </div>
  );
}

export interface ColorFieldProps {
  label?: string;
  /** Couleur au format #RRGGBB. */
  value: string;
  onChange?: (hex: string) => void;
  /** Fond sur lequel la couleur sera posée (blanc par défaut). */
  background?: string;
  level?: ContrastLevel;
  onLevelChange?: (l: ContrastLevel) => void;
  /** Masque le badge de contraste (couleur décorative). */
  hideContrast?: boolean;
  id?: string;
  /** « Vos couleurs » dans le sélecteur. */
  swatches?: string[];
  onAddSwatch?: (hex: string) => void;
  /** Texte posé sur cette couleur : le sélecteur montre Fond | Texte, le texte se choisit Clair ou Sombre. */
  textTone?: TextTone;
  onTextToneChange?: (t: TextTone) => void;
}

/** ColorField (8734:504) : pastille ronde, code hexa, badge de contraste qui ouvre le menu de niveau et de correction. Après correction, « Corrigée depuis #… · Annuler ». */
export function ColorField({ label, value, onChange, background = '#FFFFFF', level: levelProp, onLevelChange, hideContrast, id, swatches, onAddSwatch, textTone, onTextToneChange }: ColorFieldProps) {
  const [picking, setPicking] = useState(false);
  const [levelState, setLevelState] = useState<ContrastLevel>(levelProp ?? 'AA');
  const level = levelProp ?? levelState;
  const [open, setOpen] = useState(false);
  const [previous, setPrevious] = useState<string | null>(null);
  const [draft, setDraft] = useState(value);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => setDraft(value), [value]);
  useEffect(() => {
    if (!open && !picking) return;
    const close = (e: MouseEvent) => { if (!root.current?.contains(e.target as Node)) { setOpen(false); setPicking(false); } };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); setPicking(false); } };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc); };
  }, [open, picking]);
  const valid = /^#[0-9a-f]{6}$/i.test(value);
  const ratio = valid ? contrastRatio(value, background) : 1;
  const fid = id ?? `color-${label ?? 'field'}`;
  const commit = (v: string) => {
    const hex = v.startsWith('#') ? v : `#${v}`;
    if (/^#[0-9a-f]{6}$/i.test(hex)) { setPrevious(null); onChange?.(hex.toUpperCase()); } else setDraft(value);
  };
  return (
    <div className={styles.field} ref={root}>
      {label && <label htmlFor={fid} className={styles.label}>{label}</label>}
      <div className={cx(styles.box, valid && !hideContrast && ratio < contrastThreshold[level] && styles.boxFail)}>
        <button type="button" className={styles.picker} style={{ background: valid ? value : 'transparent' }} aria-label={`${label ?? 'Couleur'} : ouvrir le sélecteur`}
          aria-haspopup="dialog" aria-expanded={picking} onClick={() => { setOpen(false); setPicking((p) => !p); }} />
        <input id={fid} className={styles.hex} value={draft} maxLength={7} spellCheck={false}
          onChange={(e) => setDraft(e.target.value)} onBlur={(e) => commit(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') commit((e.target as HTMLInputElement).value); }} />
        {!hideContrast && valid && <ContrastBadge level={level} ratio={ratio} onClick={() => setOpen((o) => !o)} expanded={open} />}
      </div>
      {previous && (
        <span className={styles.note}>
          Corrigée depuis <span className={styles.mono}>{previous}</span> ·{' '}
          <button type="button" className={styles.undo} onClick={() => { onChange?.(previous); setPrevious(null); }}>Annuler</button>
        </span>
      )}
      {picking && (
        <div className={cx(styles.pop, pickerStyles.popover)} role="dialog" aria-label={label ?? 'Couleur'}>
          <ColorPicker value={{ type: 'solid', color: valid ? value : '#000000' }} onChange={(f) => { if (f.type === 'solid') { setPrevious(null); onChange?.(f.color); } }}
            swatches={swatches} onAddSwatch={onAddSwatch} textTone={textTone} onTextToneChange={onTextToneChange} />
        </div>
      )}
      {open && (
        <div className={styles.pop}>
          <ContrastMenu
            level={level}
            onLevelChange={(l) => { setLevelState(l); onLevelChange?.(l); }}
            color={value}
            background={background}
            onFix={(f) => { setPrevious(value.toUpperCase()); onChange?.(f); setOpen(false); }}
          />
        </div>
      )}
    </div>
  );
}
