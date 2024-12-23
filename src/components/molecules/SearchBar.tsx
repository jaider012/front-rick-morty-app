import { useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

type FavoriteFilterType = "All" | "Starred" | "Others";

interface Filter {
  favoriteFilter: FavoriteFilterType;
  species: "All" | "Human" | "Alien";
}

interface SearchFilterBarProps {
  value: string;
  onSearch: (value: string) => void;
  onFilterChange: (filters: {
    favoriteFilter?: FavoriteFilterType;
    species?: string;
  }) => void;
}

export default function SearchFilterBar({
  value,
  onSearch,
  onFilterChange,
}: SearchFilterBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Filter>({
    favoriteFilter: "All",
    species: "All",
  });
  const [tempFilters, setTempFilters] = useState<Filter>({
    favoriteFilter: "All",
    species: "All",
  });

  useEffect(() => {
    if (value.length > 0) {
      setIsFilterOpen(false);
    }
  }, [value]);

  const handleFilterSelect = (
    category: keyof Filter,
    value: Filter[keyof Filter]
  ) => {
    setTempFilters((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleApplyFilters = () => {
    setSelectedFilters(tempFilters);
    onFilterChange({
      favoriteFilter:
        tempFilters.favoriteFilter !== "All"
          ? tempFilters.favoriteFilter
          : undefined,
      species: tempFilters.species !== "All" ? tempFilters.species : undefined,
    });
    setIsFilterOpen(false);
  };

  const handleOpenFilters = () => {
    setTempFilters(selectedFilters);
    setIsFilterOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Search Bar */}
      <div className="flex items-center gap-2 rounded-2xl bg-gray-100 px-4 py-3">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search or filter results"
          className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none"
        />
        <button
          onClick={handleOpenFilters}
          className="rounded-lg p-2"
        >
          <SlidersHorizontal className="h-5 w-5 text-[#8054C7]" />
        </button>
      </div>

      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="absolute z-10 right-0 top-full mt-2 w-full rounded-2xl bg-white p-4 shadow-lg">
          {/* Character Filter */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-700">Character</h3>
            <div className="grid grid-cols-3 gap-2">
              {(["All", "Starred", "Others"] as FavoriteFilterType[]).map(
                (option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterSelect("favoriteFilter", option)}
                    className={`rounded-xl px-4 py-2 text-sm transition-colors ${
                      tempFilters.favoriteFilter === option
                        ? "bg-[#EEE3FF] text-[#8054C7]"
                        : "bg-[#F3F4F6] text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {option}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Species Filter */}
          <div className="mt-4 space-y-3">
            <h3 className="text-lg font-medium text-gray-700">Species</h3>
            <div className="grid grid-cols-3 gap-2">
              {["All", "Human", "Alien"].map((option) => (
                <button
                  key={option}
                  onClick={() =>
                    handleFilterSelect("species", option as Filter["species"])
                  }
                  className={`rounded-xl px-4 py-2 text-sm transition-colors ${
                    tempFilters.species === option
                      ? "bg-[#EEE3FF] text-[#8054C7]"
                      : "bg-[#F3F4F6] text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Button */}
          <button
            onClick={handleApplyFilters}
            className="mt-4 w-full rounded-xl bg-[#8054C7] py-2 text-white hover:bg-[#8054C7]/90"
          >
            Filter
          </button>
        </div>
      )}
    </div>
  );
}
