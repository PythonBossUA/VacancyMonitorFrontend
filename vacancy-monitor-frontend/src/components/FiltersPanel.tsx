import { Filters } from '../types';

interface FiltersPanelProps {
  categories: string[];
  filters: Filters;
  onFilterChange: (filters: Partial<Filters>) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

export function FiltersPanel({ categories, filters, onFilterChange, onReset, hasActiveFilters }: FiltersPanelProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="panel filters-panel">
      <div className="panel-head">
        <div className="panel-title">
          <span className="pi">
            <svg className="ic">
              <use href="#i-filter" />
            </svg>
          </span>
          Фільтри
        </div>
        <span className="filters-hint">Підказка: натисніть <kbd>/</kbd> для швидкого пошуку</span>
      </div>

      <form onSubmit={handleSubmit} className="filters">
        <div className="filters-grid">
          <div className="field-block" style={{ '--d': 0 } as React.CSSProperties}>
            <label className="field-label" htmlFor="search">
              <svg className="ic-s">
                <use href="#i-search" />
              </svg> Пошук
            </label>
            <div className="search-wrap">
              <svg className="ic">
                <use href="#i-search" />
              </svg>
              <input
                type="text"
                id="search"
                value={filters.search || ''}
                onChange={(e) => onFilterChange({ search: e.target.value || undefined })}
                placeholder="Назва вакансії або компанія"
                className="field"
              />
              <span className="kbd-hint"><kbd>/</kbd></span>
            </div>
          </div>

          <div className="field-block" style={{ '--d': 1 } as React.CSSProperties}>
            <label className="field-label" htmlFor="category">
              <svg className="ic-s">
                <use href="#i-tag" />
              </svg> Категорія
            </label>
            <select
              id="category"
              value={filters.category || ''}
              onChange={(e) => onFilterChange({ category: e.target.value || undefined })}
              className="field"
            >
              <option value="">Усі категорії</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="field-block" style={{ '--d': 2 } as React.CSSProperties}>
            <label className="field-label" htmlFor="status">
              <svg className="ic-s">
                <use href="#i-circle-off" />
              </svg> Статус
            </label>
            <select
              id="status"
              value={filters.status || ''}
              onChange={(e) => onFilterChange({ status: e.target.value || undefined })}
              className="field"
            >
              <option value="">Усі статуси</option>
              <option value="applied">Відгукнувся</option>
              <option value="not_interested">Не цікаво</option>
              <option value="null">Без статусу</option>
            </select>
          </div>

          <div className="field-block" style={{ '--d': 3 } as React.CSSProperties}>
            <label className="field-label" htmlFor="is_active">
              <svg className="ic-s">
                <use href="#i-check" />
              </svg> Активність
            </label>
            <select
              id="is_active"
              value={filters.is_active === undefined ? '' : String(filters.is_active)}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '') {
                  onFilterChange({ is_active: undefined });
                } else {
                  onFilterChange({ is_active: val === 'true' });
                }
              }}
              className="field"
            >
              <option value="">Усі</option>
              <option value="true">Активні</option>
              <option value="false">Неактивні</option>
            </select>
          </div>

          <div className="filters-actions field-block" style={{ '--d': 4 } as React.CSSProperties}>
            <button type="submit" className="btn btn-accent">
              <svg className="ic">
                <use href="#i-search" />
              </svg>
              Шукати
            </button>
          </div>
        </div>

        {hasActiveFilters && (
          <button type="button" onClick={onReset} className="reset-link">
            <svg className="ic-s">
              <use href="#i-x" />
            </svg> Скинути фільтри
          </button>
        )}
      </form>
    </section>
  );
}
