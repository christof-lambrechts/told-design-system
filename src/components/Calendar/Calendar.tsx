import { useMemo, useState } from 'react';
import { Radio } from '../Choice/Choice';
import { Input } from '../Input/Input';
import { Button, ButtonIcon } from '../Button/Button';
import styles from './Calendar.module.css';

export type CalendarMode = 'since' | 'last' | 'period';
export interface DateRange { start: Date; end: Date }

const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const DAYS = ['lu', 'ma', 'me', 'je', 've', 'sa', 'di'];
const fmt = (d: Date) => d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
const same = (a: Date, b: Date) => a.toDateString() === b.toDateString();

export interface CalendarProps {
  value: DateRange;
  onApply?: (range: DateRange, mode: CalendarMode) => void;
  onCancel?: () => void;
  /** Colonne des modes (Depuis le / Les derniers / Période), propriété Figma `hasModes`. */
  showModes?: boolean;
}

/** Calendar (20:16545) : sélecteur de période, 444 de large avec les modes, rayon 16. */
export function Calendar({ value, onApply, onCancel, showModes = true }: CalendarProps) {
  const [mode, setMode] = useState<CalendarMode>('period');
  const [range, setRange] = useState<DateRange>(value);
  const [picking, setPicking] = useState<Date | null>(null);
  const [month, setMonth] = useState(new Date(value.end.getFullYear(), value.end.getMonth(), 1));

  const cells = useMemo(() => {
    const first = (month.getDay() + 6) % 7;
    const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    return [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1))];
  }, [month]);

  const pick = (d: Date) => {
    if (!picking) { setPicking(d); setRange({ start: d, end: d }); }
    else { setRange(d < picking ? { start: d, end: picking } : { start: picking, end: d }); setPicking(null); }
  };
  const nbDays = Math.round((range.end.getTime() - range.start.getTime()) / 86400000) + 1;

  return (
    <div className={styles.cal}>
      {showModes && (
        <div className={styles.modes} role="radiogroup" aria-label="Type de période">
          <Radio size="lg" name="cal-mode" label="Depuis le" checked={mode === 'since'} onChange={() => setMode('since')} />
          <Radio size="lg" name="cal-mode" label="Les derniers" checked={mode === 'last'} onChange={() => setMode('last')} />
          <Radio size="lg" name="cal-mode" label="Période" checked={mode === 'period'} onChange={() => setMode('period')} />
        </div>
      )}
      <div className={styles.main}>
        <div className={styles.inputs}>
          <Input aria-label="Début" value={fmt(range.start)} readOnly />
          <Input aria-label="Fin" value={fmt(range.end)} readOnly />
        </div>
        <div className={styles.month}>
          <div className={styles.monthHead}>
            <ButtonIcon icon="arrow-left-01-stroke" label="Mois précédent" size="xs" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} />
            <span className={styles.monthName}>{MONTHS[month.getMonth()]} {month.getFullYear()}</span>
            <ButtonIcon icon="arrow-right-01-stroke" label="Mois suivant" size="xs" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} />
          </div>
          <div className={styles.grid} role="grid">
            {DAYS.map((d) => <span key={d} className={styles.dow}>{d}</span>)}
            {cells.map((d, i) =>
              d ? (
                <button
                  key={i}
                  type="button"
                  className={[
                    styles.day,
                    d >= range.start && d <= range.end && styles.inRange,
                    (same(d, range.start) || same(d, range.end)) && styles.edge,
                    same(d, new Date()) && styles.today,
                  ].filter(Boolean).join(' ')}
                  onClick={() => pick(d)}
                >
                  {d.getDate()}
                </button>
              ) : <span key={i} />,
            )}
          </div>
          <span className={styles.summary}>{nbDays} jour{nbDays > 1 ? 's' : ''} · du {range.start.getDate()} au {range.end.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
        <div className={styles.foot}>
          <Button size="sm" variant="ghost" color="neutral" onClick={onCancel}>Annuler</Button>
          <Button size="sm" onClick={() => onApply?.(range, mode)}>Appliquer</Button>
        </div>
      </div>
    </div>
  );
}
