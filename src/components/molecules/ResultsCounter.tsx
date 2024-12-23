import { Typography } from "../atoms/Typography";
import { CharacterFilters } from "../../types/character";

interface ResultsCounterProps {
  totalResults: number;
  filters: CharacterFilters;
}

export function ResultsCounter({ totalResults, filters }: ResultsCounterProps) {
  const activeFilters = Object.entries(filters).reduce(
    (count, [key, value]) => {
      if (
        value &&
        value !== "" &&
        value !== "All" &&
        key !== "name" &&
        key !== "favoriteFilter"
      ) {
        return count + 1;
      }
      return count;
    },
    0
  );

  return (
    <div className="flex  justify-between items-center gap-3 px-1 py-1 mx-3">
      <Typography
        variant="small"
        className="text-xs text-[#4263EB]  font-semibold"
      >
        {totalResults} Results
      </Typography>

      {activeFilters > 0 && (
        <div className=" flex justify-center items-center rounded-full bg-[#63D83833] px-3 py-2">
          <Typography variant="small" className="text-xs text-[#3B8520] font-semibold">
            {activeFilters} {activeFilters === 1 ? "Filter" : "Filters"}
          </Typography>
        </div>
      )}
    </div>
  );
}
