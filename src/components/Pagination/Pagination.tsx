import type { ButtonHTMLAttributes } from 'react';
import { ButtonIcon } from '../Button/Button';
import styles from './Pagination.module.css';

export interface PaginationButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  selected?: boolean;
}

/** PaginationButton (23:16467) : case de page 32 × 32, rayon 8. */
export function PaginationButton({ selected, className, ...rest }: PaginationButtonProps) {
  return <button type="button" aria-current={selected ? 'page' : undefined} className={[styles.page, selected && styles.selected, className].filter(Boolean).join(' ')} {...rest} />;
}

/** Pages à montrer : 1, 2, 3, …, dernière (et la page courante si elle est au milieu). */
function pageList(page: number, total: number): (number | '…')[] {
  if (total <= 6) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set([1, 2, 3, page, total].filter((p) => p >= 1 && p <= total));
  const sorted = [...set].sort((a, b) => a - b);
  const out: (number | '…')[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push('…');
    out.push(p);
  });
  return out;
}

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
  /** Nombre total de lignes, affiché à gauche (« 45 lignes »). */
  rowCount?: number;
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  onRowsPerPageChange?: (n: number) => void;
}

/** Pagination (1436:137865) : nombre de lignes, lignes par page, pages. */
export function Pagination({ page, pageCount, onPageChange, rowCount, rowsPerPage, rowsPerPageOptions = [10, 25, 50], onRowsPerPageChange }: PaginationProps) {
  return (
    <nav className={styles.bar} aria-label="Pagination">
      {rowCount != null && <span className={styles.count}>{rowCount} lignes</span>}
      {rowsPerPage != null && (
        <label className={styles.perPage}>
          Lignes par page
          <select value={rowsPerPage} onChange={(e) => onRowsPerPageChange?.(Number(e.target.value))} className={styles.select}>
            {rowsPerPageOptions.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
      )}
      <div className={styles.pages}>
        <ButtonIcon icon="arrow-left-01-stroke" label="Page précédente" size="sm" color="brand" disabled={page <= 1} onClick={() => onPageChange?.(page - 1)} />
        {pageList(page, pageCount).map((p, i) =>
          p === '…' ? <PaginationButton key={`e${i}`} disabled tabIndex={-1}>…</PaginationButton> : (
            <PaginationButton key={p} selected={p === page} onClick={() => onPageChange?.(p)}>{p}</PaginationButton>
          ),
        )}
        <ButtonIcon icon="arrow-right-01-stroke" label="Page suivante" size="sm" color="brand" disabled={page >= pageCount} onClick={() => onPageChange?.(page + 1)} />
      </div>
    </nav>
  );
}
