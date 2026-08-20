// API types based on FastAPI backend

export interface Vacancy {
  id: number;
  name: string;
  company_name: string;
  publication_date: string;
  original_url: string;
  status: 'applied' | 'not_interested' | null;
  is_active: boolean;
}

export interface VacanciesResponse {
  vacancies: Vacancy[];
  next_page: string | null;
  previous_page: string | null;
}

export interface Filters {
  search?: string;
  category?: string;
  status?: string;
  is_active?: boolean;
  page?: number;
}

export type StatusEnum = 'applied' | 'not_interested';
