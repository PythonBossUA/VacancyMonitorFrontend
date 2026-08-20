interface HeroProps {
  totalCount: number;
  hasActiveFilters: boolean;
  onStartScraping: () => void;
  onDeleteInactive: () => void;
}

export function Hero({ totalCount, hasActiveFilters, onStartScraping, onDeleteInactive }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-main">
        <div className="hero-eyebrow">
          <span className="pulse-dot"></span> Панель моніторингу
        </div>

        <h1 className="hero-title">
          Вакансії
          <svg className="sparkle" aria-hidden="true">
            <use href="#i-sparkle" />
          </svg>
        </h1>
        <svg className="title-underline" viewBox="0 0 120 8" preserveAspectRatio="none" aria-hidden="true">
          <path d="M2 6 C 30 1, 90 1, 118 5" />
        </svg>

        <p className="hero-sub">
          Знайдено
          <b className="count" data-count={totalCount}>{totalCount}</b>
          вакансій
          {hasActiveFilters && ' за фільтром'}
        </p>

        <div className="hero-actions">
          <button onClick={onStartScraping} className="btn btn-accent btn-lg">
            <svg className="ic">
              <use href="#i-rocket" />
            </svg>
            Запустити скрапінг
          </button>

          <button onClick={onDeleteInactive} className="btn btn-danger-subtle btn-lg">
            <svg className="ic">
              <use href="#i-trash" />
            </svg>
            Видалити всі неактивні вакансії
          </button>
        </div>
      </div>

      {/* Decorative live scraper terminal */}
      <div className="hero-term" aria-hidden="true">
        <div className="term-bar">
          <span className="tdot r"></span>
          <span className="tdot y"></span>
          <span className="tdot g"></span>
          <span className="term-title">dou-scraper — worker</span>
          <span className="term-live">live</span>
        </div>
        <div className="term-body">
          <p className="tl" style={{ '--d': 0 } as React.CSSProperties}>
            <span className="t-time">09:12:01</span> GET /jobs.dou.ua/companies <em>200 OK</em>
          </p>
          <p className="tl" style={{ '--d': 1 } as React.CSSProperties}>
            <span className="t-time">09:12:03</span> parse :: 24 вакансії
          </p>
          <p className="tl" style={{ '--d': 2 } as React.CSSProperties}>
            <span className="t-time">09:12:07</span> GET /jobs.dou.ua/categories <em>200 OK</em>
          </p>
          <p className="tl" style={{ '--d': 3 } as React.CSSProperties}>
            <span className="t-time">09:12:11</span> filter :: дублікати відсіяно
          </p>
          <p className="tl" style={{ '--d': 4 } as React.CSSProperties}>
            <span className="t-time">09:12:14</span> db :: INSERT batch <em>done</em>
          </p>
          <p className="tl" style={{ '--d': 5 } as React.CSSProperties}>
            <span className="t-time">09:12:16</span> sync :: статуси оновлено <span className="t-caret"></span>
          </p>
        </div>
      </div>
    </section>
  );
}
