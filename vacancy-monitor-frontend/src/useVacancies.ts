import { useState, useEffect, useCallback } from 'react';
import { fetchVacancies, fetchCategories, updateVacancyStatus as apiUpdateStatus, deleteInactiveVacancies as apiDeleteInactive, startScraping } from './api';
import { Vacancy, Filters } from './types';

interface UseVacanciesResult {
  vacancies: Vacancy[];
  categories: string[];
  loading: boolean;
  error: string | null;
  filters: Filters;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalCount: number;
  setFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;
  updateVacancyStatus: (id: number, status: string | null) => Promise<void>;
  deleteInactiveVacancies: () => Promise<void>;
  startScraping: () => Promise<void>;
  goToPage: (page: number) => void;
}

export function useVacancies(): UseVacanciesResult {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<Filters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const loadData = useCallback(async (page: number, currentFilters: Filters) => {
    setLoading(true);
    setError(null);
    
    try {
      const [vacanciesData, categoriesData] = await Promise.all([
        fetchVacancies({ ...currentFilters, page }),
        fetchCategories(),
      ]);
      
      setVacancies(vacanciesData.vacancies);
      setCategories(categoriesData);
      setHasNextPage(!!vacanciesData.next_page);
      setHasPreviousPage(!!vacanciesData.previous_page);
      setTotalCount(vacanciesData.vacancies.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(currentPage, filters);
  }, [currentPage, filters.search, filters.category, filters.status, filters.is_active, loadData]);

  const setFilters = (newFilters: Partial<Filters>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFiltersState({});
    setCurrentPage(1);
  };

  const updateVacancyStatus = async (id: number, status: string | null) => {
    await apiUpdateStatus(id, status);
    // Refresh the current page
    await loadData(currentPage, filters);
  };

  const deleteInactiveVacancies = async () => {
    await apiDeleteInactive();
    await loadData(currentPage, filters);
  };

  const startScrapingTask = async () => {
    await startScraping();
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return {
    vacancies,
    categories,
    loading,
    error,
    filters,
    currentPage,
    hasNextPage,
    hasPreviousPage,
    totalCount,
    setFilters,
    resetFilters,
    updateVacancyStatus,
    deleteInactiveVacancies,
    startScraping: startScrapingTask,
    goToPage,
  };
}
