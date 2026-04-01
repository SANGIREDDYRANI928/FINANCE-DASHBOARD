import React from 'react';
import { Search, Filter, X, RotateCcw } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';
import { categories } from '../../data/mockData';

export const TransactionFilters = () => {
  const { filters, setFilters, resetFilters } = useApp();

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories.map((c) => ({ value: c.value, label: c.label })),
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
  ];

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'amount', label: 'Amount' },
    { value: 'category', label: 'Category' },
  ];

  const hasActiveFilters =
    filters.search ||
    filters.type !== 'all' ||
    filters.category !== 'all' ||
    filters.dateRange !== 'all';

  return (
    <div className="space-y-4">
      {/* Search */}
      <Input
        placeholder="Search transactions..."
        icon={Search}
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select
          value={filters.type}
          onChange={(e) => setFilters({ type: e.target.value })}
          options={typeOptions}
          className="w-full sm:w-auto sm:min-w-[140px]"
        />
        
        <Select
          value={filters.category}
          onChange={(e) => setFilters({ category: e.target.value })}
          options={categoryOptions}
          className="w-full sm:w-auto sm:min-w-[160px]"
        />
        
        <Select
          value={filters.dateRange}
          onChange={(e) => setFilters({ dateRange: e.target.value })}
          options={dateRangeOptions}
          className="w-full sm:w-auto sm:min-w-[140px]"
        />

        <Select
          value={filters.sortBy}
          onChange={(e) => setFilters({ sortBy: e.target.value })}
          options={sortOptions}
          className="w-full sm:w-auto sm:min-w-[120px]"
        />

        <Button
          variant="outline"
          onClick={() =>
            setFilters({
              sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc',
            })
          }
          className="w-full sm:w-auto"
        >
          {filters.sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={resetFilters}
            icon={RotateCcw}
            className="w-full sm:w-auto text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            Reset
          </Button>
        )}
      </div>
    </div>
  );
};
