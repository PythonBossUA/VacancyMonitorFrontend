interface EmptyStateProps {
  hasActiveFilters: boolean;
  onResetFilters: () => void;
  onStartScraping: () => void;
}

export function EmptyState({ hasActiveFilters, onResetFilters, onStartScraping }: EmptyStateProps) {
  return (
    <div className="empty-state panel">
      <div className="empty-art" aria-hidden="true">
        <svg viewBox="0 0 200 150" fill="none">
          <g className="e-monitor">
            <rect x="34" y="18" width="132" height="88" rx="10" fill="#ffffff" stroke="#d5dde6" strokeWidth="2"/>
            <rect x="44" y="30" width="80" height="8" rx="4" fill="#e8f2fb"/>
            <rect x="44" y="46" width="112" height="6" rx="3" fill="#eef2f6"/>
            <rect x="44" y="58" width="96" height="6" rx="3" fill="#eef2f6"/>
            <rect x="44" y="70" width="104" height="6" rx="3" fill="#eef2f6"/>
            <path d="M84 106h32l6 14H78z" fill="#dde5ee"/>
          </g>
          <g className="e-mag">
            <circle cx="140" cy="92" r="24" fill="rgba(76,194,255,.12)" stroke="#0067c0" strokeWidth="5"/>
            <path d="M158 110l16 16" stroke="#0067c0" strokeWidth="6" strokeLinecap="round"/>
          </g>
          <path className="e-spark s1" d="M30 14l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#f5a623"/>
          <path className="e-spark s2" d="M178 30l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z" fill="#4cc2ff"/>
          <path className="e-spark s3" d="M16 84l1.4 3.4 3.4 1.4-3.4 1.4-1.4 3.4-1.4-3.4-3.4-1.4 3.4-1.4z" fill="#0067c0"/>
        </svg>
      </div>

      <h2>Вакансій не знайдено</h2>

      {hasActiveFilters ? (
        <p>
          Спробуйте змінити фільтри або
          <button onClick={onResetFilters} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', textDecoration: 'underline' }}> очистити їх</button>.
        </p>
      ) : (
        <p>База даних порожня. Запустіть скрапінг для заповнення.</p>
      )}

      {!hasActiveFilters && (
        <button onClick={onStartScraping} className="btn btn-accent btn-lg">
          <svg className="ic">
            <use href="#i-rocket" />
          </svg>
          Запустити скрапінг
        </button>
      )}
    </div>
  );
}
