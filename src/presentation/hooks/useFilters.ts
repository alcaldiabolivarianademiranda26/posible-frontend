import { useState } from 'react';

export function useFilters<T>(initialFilters: T) {
  const [filters, setFilters] = useState<T>(initialFilters);

  const updateFilter = (key: keyof T, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  return {
    filters,
    updateFilter,
    clearFilters
  };
}
