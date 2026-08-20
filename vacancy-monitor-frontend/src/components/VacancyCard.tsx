import { Vacancy } from '../types';

interface VacancyCardProps {
  vacancy: Vacancy;
  index: number;
  onStatusChange: (vacancyId: number, status: string | null) => void;
}

export function VacancyCard({ vacancy, index, onStatusChange }: VacancyCardProps) {
  const companyInitial = vacancy.company_name.charAt(0).toUpperCase();
  const formattedDate = vacancy.publication_date 
    ? new Date(vacancy.publication_date).toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : '';

  return (
    <article className={`vacancy-card reveal ${vacancy.is_active ? 'is-active' : 'is-inactive'} ${vacancy.status === 'applied' ? 'st-applied' : ''} ${vacancy.status === 'not_interested' ? 'st-not-interested' : ''}`} style={{ '--i': index } as React.CSSProperties}>
      <div className={`vc-rail ${vacancy.is_active ? 'rail-on' : 'rail-off'}`} aria-hidden="true"></div>

      <div className="vc-body">
        <div className="vc-top">
          <div className="vc-avatar" aria-hidden="true">{companyInitial}</div>

          <div className="vc-head">
            <h2 className="vacancy-title">
              <a href={vacancy.original_url} target="_blank" rel="noopener noreferrer">
                {vacancy.name}
                <svg className="ext">
                  <use href="#i-external" />
                </svg>
              </a>
            </h2>

            <div className="vacancy-company">
              <svg className="ic">
                <use href="#i-building" />
              </svg>
              {vacancy.company_name}
            </div>
          </div>
        </div>

        <div className="vacancy-meta">
          {formattedDate && (
            <span className="badge badge-gray">
              <svg className="ic-s">
                <use href="#i-calendar" />
              </svg>
              {formattedDate}
            </span>
          )}

          {vacancy.status === 'applied' && (
            <span className="badge badge-green">
              <svg className="ic-s">
                <use href="#i-check" />
              </svg> Відгукнувся
            </span>
          )}
          {vacancy.status === 'not_interested' && (
            <span className="badge badge-red">
              <svg className="ic-s">
                <use href="#i-x" />
              </svg> Не цікаво
            </span>
          )}
          {!vacancy.status && (
            <span className="badge badge-gray">
              <svg className="ic-s">
                <use href="#i-circle-off" />
              </svg> Без статусу
            </span>
          )}

          {vacancy.is_active ? (
            <span className="badge badge-green">
              <span className="dot pulse"></span> Активна
            </span>
          ) : (
            <span className="badge badge-red">
              <span className="dot"></span> Неактивна
            </span>
          )}
        </div>

        <div className="vacancy-actions">
          <a href={vacancy.original_url} target="_blank" rel="noopener noreferrer" className="btn btn-standard btn-sm">
            Переглянути на DOU
            <svg className="ic-s">
              <use href="#i-external" />
            </svg>
          </a>

          {vacancy.status !== 'applied' && (
            <button
              onClick={() => onStatusChange(vacancy.id, 'applied')}
              disabled={!vacancy.is_active}
              className="btn btn-accent btn-sm"
            >
              <svg className="ic-s">
                <use href="#i-check" />
              </svg> Відгукнувся
            </button>
          )}

          {vacancy.status !== 'not_interested' && (
            <button
              onClick={() => onStatusChange(vacancy.id, 'not_interested')}
              disabled={!vacancy.is_active}
              className="btn btn-standard btn-sm"
            >
              <svg className="ic-s">
                <use href="#i-x" />
              </svg> Не цікаво
            </button>
          )}

          {vacancy.status && (
            <button
              onClick={() => onStatusChange(vacancy.id, null)}
              disabled={!vacancy.is_active}
              className="btn btn-subtle btn-sm"
            >
              <svg className="ic-s">
                <use href="#i-reset" />
              </svg> Скинути статус
            </button>
          )}

          {!vacancy.is_active && (
            <span className="lock-note" title="Вакансія неактивна — зміна статусу недоступна">
              <svg className="ic-s">
                <use href="#i-lock" />
              </svg>
              Дії заблоковано
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
