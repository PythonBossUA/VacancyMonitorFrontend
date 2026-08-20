import { VacanciesResponse, Filters } from './types';

const API_BASE = 'https://vacancy-monitor-backend.onrender.com/api';

export async function fetchVacancies(filters: Filters): Promise<VacanciesResponse> {
  const params = new URLSearchParams();
  
  if (filters.search) params.set('search', filters.search);
  if (filters.category) params.set('category', filters.category);
  if (filters.status) params.set('status', filters.status);
  if (filters.is_active !== undefined) params.set('is_active', String(filters.is_active));
  if (filters.page && filters.page > 1) params.set('page', String(filters.page));

  const response = await fetch(`${API_BASE}/?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch vacancies');
  }
  
  return response.json();
}

export async function updateVacancyStatus(vacancyId: number, status: string | null): Promise<void> {
  const response = await fetch(`${API_BASE}/status/${vacancyId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update vacancy status');
  }
}

export async function deleteInactiveVacancies(): Promise<void> {
  const response = await fetch(`${API_BASE}/delete`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete inactive vacancies');
  }
}

export async function startScraping(): Promise<void> {
  const response = await fetch(`${API_BASE}/scrap`, {
    method: 'POST',
  });
  
  if (!response.ok) {
    throw new Error('Failed to start scraping');
  }
}

export async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${API_BASE}/categories`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return response.json();
}
