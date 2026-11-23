import { useId } from 'react';
import { GroupTab } from '../Tabs/Tabs';
import { ChoiceChips, type ChoiceChipOption } from '../ChoiceChips/ChoiceChips';
import styles from './AvatarSettings.module.css';

export interface ChoiceFieldProps {
  label: string;
  options: ChoiceChipOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

/** Choix d'une option dans un panneau, selon la règle du DS (23/11) : 3 choix ou moins en texte → GroupTab (onglets, pleine largeur) ; plus de 3, ou des choix avec couleur, avatar, vignette, icône ou glyphe → ChoiceChips. Libellé au style des options au-dessus. */
export function ChoiceField({ label, options, value, onChange, disabled }: ChoiceFieldProps) {
  const id = useId();
  const rich = options.some((o) => o.icon || o.color || o.avatar || o.thumb || o.glyph);
  if (options.length <= 3 && !rich && !disabled) {
    return <GroupTab label={label} value={value} onChange={onChange} items={options.map((o) => ({ value: o.value, label: o.label }))} />;
  }
  return (
    <div className={styles.field}>
      <span id={id} className={styles.label}>{label}</span>
      <ChoiceChips aria-labelledby={id} options={options} value={value} onChange={onChange} disabled={disabled} />
    </div>
  );
}
