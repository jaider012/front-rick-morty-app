import { Filter, SortAsc, SortDesc } from "lucide-react";
import { CharacterFilters } from "../../types/character";
import { Typography } from "../atoms/Typography";
import { Button } from "../atoms/Button";

interface FilterPanelProps {
  filters: CharacterFilters;
  onFilterChange: (filters: CharacterFilters) => void;
}

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <Typography variant="h3">Filters</Typography>
        <Filter className="h-5 w-5" />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Typography variant="small">Status</Typography>
          <select
            value={filters.status}
            onChange={(e) =>
              onFilterChange({ ...filters, status: e.target.value })
            }
            className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800"
          >
            <option value="">All Status</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        <div className="space-y-2">
          <Typography variant="small">Species</Typography>
          <select
            value={filters.species}
            onChange={(e) =>
              onFilterChange({ ...filters, species: e.target.value })
            }
            className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800"
          >
            <option value="">All Species</option>
            <option value="Human">Human</option>
            <option value="Alien">Alien</option>
          </select>
        </div>

        <Button
          variant="secondary"
          onClick={() =>
            onFilterChange({
              ...filters,
              sortDirection: filters.sortDirection === "asc" ? "desc" : "asc",
            })
          }
          className="w-full"
        >
          {filters.sortDirection === "asc" ? (
            <SortAsc className="mr-2 h-4 w-4" />
          ) : (
            <SortDesc className="mr-2 h-4 w-4" />
          )}
          Sort {filters.sortDirection === "asc" ? "A-Z" : "Z-A"}
        </Button>
      </div>
    </div>
  );
}
