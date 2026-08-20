import { useVacancies } from './useVacancies';
import { VacancyCard } from './components/VacancyCard';
import { FiltersPanel } from './components/FiltersPanel';
import { Hero } from './components/Hero';
import { Pagination } from './components/Pagination';
import { EmptyState } from './components/EmptyState';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorBanner } from './components/ErrorBanner';

function App() {
  const {
    vacancies,
    categories,
    loading,
    error,
    filters,
    currentPage,
    hasNextPage,
    hasPreviousPage,
    setFilters,
    resetFilters,
    updateVacancyStatus,
    deleteInactiveVacancies,
    startScraping,
    goToPage,
  } = useVacancies();

  const handleStatusChange = async (vacancyId: number, status: string | null) => {
    await updateVacancyStatus(vacancyId, status);
  };

  const handleDeleteInactive = async () => {
    if (window.confirm('Видалити всі неактивні вакансії? Цю дію не можна буде скасувати.')) {
      await deleteInactiveVacancies();
    }
  };

  const handleStartScraping = async () => {
    await startScraping();
    window.location.reload();
  };

  const hasActiveFilters = !!(filters.search || filters.category || filters.status || filters.is_active);

  return (
    <div className="app">
      {/* Background Scene */}
      <div className="bg-scene" aria-hidden="true">
        <div className="orb orb-a"></div>
        <div className="orb orb-b"></div>
        <div className="orb orb-c"></div>
        <div className="grid-veil"></div>
      </div>

      {/* Command Bar */}
      <header className="commandbar">
        <div className="cb-inner">
          <div className="brand">
            <div className="brand-mark" aria-hidden="true">
              <svg className="ic">
                <use href="#i-briefcase" />
              </svg>
            </div>
            <div className="brand-text">
              <strong>VacancyMonitor</strong>
              <span>jobs.dou.ua · трекер</span>
            </div>
          </div>
          <div className="cb-right">
            <div className="chip chip-clock" title="Поточний час">
              <svg className="ic-s">
                <use href="#i-clock" />
              </svg>
              <span className="mono" id="clock">{new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="chip chip-status">
              <span className="dot-live"></span> Моніторинг активний
            </div>
          </div>
        </div>
      </header>

      <main className="shell">
        {/* Hero Section */}
        <Hero
          totalCount={vacancies.length}
          hasActiveFilters={hasActiveFilters}
          onStartScraping={handleStartScraping}
          onDeleteInactive={handleDeleteInactive}
        />

        {/* Error Banner */}
        {error && <ErrorBanner message={error} />}

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Filters Panel */}
        {!loading && (
          <FiltersPanel
            categories={categories}
            filters={filters}
            onFilterChange={setFilters}
            onReset={resetFilters}
            hasActiveFilters={hasActiveFilters}
          />
        )}

        {/* Vacancy List */}
        {!loading && vacancies.length > 0 && (
          <>
            <div className="vacancy-list">
              {vacancies.map((vacancy, index) => (
                <VacancyCard
                  key={vacancy.id}
                  vacancy={vacancy}
                  index={index}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>

            {/* Pagination */}
            {(hasNextPage || hasPreviousPage) && (
              <Pagination
                currentPage={currentPage}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
                onPageChange={goToPage}
                filters={filters}
              />
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && vacancies.length === 0 && (
          <EmptyState
            hasActiveFilters={hasActiveFilters}
            onResetFilters={resetFilters}
            onStartScraping={handleStartScraping}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer reveal-on-scroll">
        <div>© VacancyMonitor — трекер вакансій для розробників</div>
        <div className="mono">jobs.dou.ua · fluent ui</div>
      </footer>

      {/* SVG Icons Sprite */}
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }} aria-hidden="true">
        <symbol id="i-briefcase" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3.5" y="7.5" width="17" height="12" rx="2" /><path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 7v1h2.5A1.5 1.5 0 0 1 19 9.5v6A1.5 1.5 0 0 1 17.5 17h-11A1.5 1.5 0 0 1 5 15.5v-6A1.5 1.5 0 0 1 6.5 8H9Z" />
        </symbol>
        <symbol id="i-rocket" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </symbol>
        <symbol id="i-trash" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18" /><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" /><path d="m19 6-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" />
        </symbol>
        <symbol id="i-filter" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 5h18l-7 8v5l-4 2v-7L3 5z" />
        </symbol>
        <symbol id="i-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" />
        </symbol>
        <symbol id="i-calendar" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" />
        </symbol>
        <symbol id="i-tag" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" /><circle cx="7.5" cy="7.5" r=".8" fill="currentColor" />
        </symbol>
        <symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 12.5l5 5L20 6.5" />
        </symbol>
        <symbol id="i-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </symbol>
        <symbol id="i-circle-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="8" /><path d="M8.5 12h7" />
        </symbol>
        <symbol id="i-external" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 4h6v6" /><path d="M20 4l-9 9" /><path d="M20 13.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19V6a1.5 1.5 0 0 1 1.5-1.5H11" />
        </symbol>
        <symbol id="i-building" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="3" width="14" height="18" rx="1.5" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M11 21v-3h2v3" />
        </symbol>
        <symbol id="i-home" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 11l8-7 8 7" /><path d="M6 9.5V20h12V9.5" /><path d="M10 20v-5h4v5" />
        </symbol>
        <symbol id="i-info" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" /><path d="M12 8h.01M12 12v5" />
        </symbol>
        <symbol id="i-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
        </symbol>
        <symbol id="i-reset" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 0 2.6-6.3L3 8" /><path d="M3 3v5h5" />
        </symbol>
        <symbol id="i-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </symbol>
        <symbol id="i-sparkle" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.2 5.8L20 10l-5.8 2.2L12 18l-2.2-5.8L4 10l5.8-2.2L12 2z" />
        </symbol>
      </svg>
    </div>
  );
}

export default App;
