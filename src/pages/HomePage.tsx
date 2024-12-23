import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CHARACTERS, TOGGLE_FAVORITE } from "../graphql/queries";
import { MainLayout } from "../components/templates/MainLayout";
import { Typography } from "../components/atoms/Typography";
import { CharacterFilters } from "../types/character";
import { CharacterList } from "../components/organisms/CharacterList";
import { CharacterDetail } from "../components/organisms/CharacterDetail";
import SearchFilterBar from "../components/molecules/SearchBar";

type FavoriteFilterType = "All" | "Starred" | "Others";

export function HomePage() {
  const [filters, setFilters] = useState<CharacterFilters>({
    name: "",
    status: "",
    species: "",
    gender: "",
    favoriteFilter: "All" as FavoriteFilterType,
  });
  const [sort, setSort] = useState({
    field: "name",
    direction: "asc" as const,
  });
  const [selectedCharacter, setSelectedCharacter] = useState<
    string | undefined
  >();
  const [searchValue, setSearchValue] = useState("");

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: {
      page: 1,
      filter: {
        name: searchValue || undefined,
        status: filters.status || undefined,
        species: filters.species || undefined,
        gender: filters.gender || undefined,
        // Convert UI filter values to backend expectations
        favoriteFilter:
          filters.favoriteFilter === "Starred"
            ? true
            : filters.favoriteFilter === "Others"
            ? false
            : undefined,
      },
      sort: {
        field: sort.field,
        direction: sort.direction,
      },
    },
  });

  const [toggleFavoriteMutation] = useMutation(TOGGLE_FAVORITE, {
    refetchQueries: [
      {
        query: GET_CHARACTERS,
        variables: {
          page: 1,
          filter: {
            name: searchValue || undefined,
            species: filters.species || undefined,
            favoriteFilter:
              filters.favoriteFilter === "Starred"
                ? true
                : filters.favoriteFilter === "Others"
                ? false
                : undefined,
          },
          sort,
        },
      },
    ],
  });

  const toggleFavorite = async (id: string) => {
    try {
      await toggleFavoriteMutation({
        variables: { id },
      });
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  const characters = data?.characters.results || [];

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleFilterChange = (selectedFilters: {
    favoriteFilter?: FavoriteFilterType;
    species?: string;
  }) => {
    setFilters({
      ...filters,
      favoriteFilter: selectedFilters.favoriteFilter,
      species: selectedFilters.species === "All" ? "" : selectedFilters.species,
    });
  };

  if (error) {
    return (
      <MainLayout>
        <div className="text-center">
          <Typography variant="h2" className="text-red-500">
            Error loading characters
          </Typography>
          <Typography className="mt-2">{error.message}</Typography>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex h-screen">
        <div className="w-[420px] border-r border-gray-200 bg-white">
          <div className="p-4">
            <Typography variant="h2" className="mb-4">
              Rick and Morty
            </Typography>
            <SearchFilterBar
              value={searchValue}
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className="h-[calc(100vh-116px)] p-4">
            {!loading && characters && (
              <CharacterList
                characters={characters}
                onToggleFavorite={toggleFavorite}
                filters={filters}
                selectedCharacter={selectedCharacter}
                onSelectCharacter={setSelectedCharacter}
              />
            )}
          </div>
        </div>
        <div className="flex-1 overflow-auto px-12 py-8">
          {selectedCharacter ? (
            <CharacterDetail id={selectedCharacter} />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Typography variant="h2" className="text-gray-400">
                Select a character to view details
              </Typography>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
