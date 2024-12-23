import { Filter, SortAsc, SortDesc } from 'lucide-react';
import { CharacterFilters } from '../types/character';

interface SearchFiltersProps {
  filters: CharacterFilters;
  onFilterChange: (filters: CharacterFilters) => void;
}

export function SearchFilters({ filters, onFilterChange }: SearchFiltersProps) {
  return (
    <div className="space-y-4 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Filter className="h-5 w-5" />
      </div>
      
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Search characters..."
          value={filters.name || ''}
          onChange={(e) => onFilterChange({ ...filters, name: e.target.value })}
          className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800"
        />
        
        <div className="grid grid-cols-2 gap-2">
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            className="rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800"
          >
            <option value="">All Status</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
          
          <select
            value={filters.species}
            onChange={(e) => onFilterChange({ ...filters, species: e.target.value })}
            className="rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800"
          >
            <option value="">All Species</option>
            <option value="Human">Human</option>
            <option value="Alien">Alien</option>
          </select>
        </div>
        
        <button
          onClick={() =>
            onFilterChange({
              ...filters,
              sortDirection: filters.sortDirection === 'asc' ? 'desc' : 'asc',
            })
          }
          className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-100 p-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          {filters.sortDirection === 'asc' ? (
            <SortAsc className="h-4 w-4" />
          ) : (
            <SortDesc className="h-4 w-4" />
          )}
          Sort {filters.sortDirection === 'asc' ? 'A-Z' : 'Z-A'}
        </button>
      </div>
    </div>
  );
}