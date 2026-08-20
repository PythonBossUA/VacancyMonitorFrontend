import { Filters } from '../types';

interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
  filters: Filters;
}

export function Pagination({ currentPage, hasNextPage, hasPreviousPage, onPageChange }: PaginationProps) {
  return (
    <nav className="pagination reveal-on-scroll" aria-label="Пагінація">
      {hasPreviousPage ? (
        <>
          <button onClick={() => onPageChange(1)}>« Перша</button>
          <button onClick={() => onPageChange(currentPage - 1)}>← Попередня</button>
        </>
      ) : (
        <>
          <span className="disabled">« Перша</span>
          <span className="disabled">← Попередня</span>
        </>
      )}

      <span className="current">{currentPage}</span>

      {hasNextPage ? (
        <>
          <button onClick={() => onPageChange(currentPage + 1)}>Наступна →</button>
          <button onClick={() => onPageChange(currentPage + 10)}>Остання »</button>
        </>
      ) : (
        <>
          <span className="disabled">Наступна →</span>
          <span className="disabled">Остання »</span>
        </>
      )}
    </nav>
  );
}
