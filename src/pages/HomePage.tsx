import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CHARACTERS, TOGGLE_FAVORITE } from "../graphql/queries";
import { MainLayout } from "../components/templates/MainLayout";
import { Typography } from "../components/atoms/Typography";
import { Character, CharacterFilters } from "../types/character";
import { SearchBar } from "../components/molecules/SearchBar";
import { CharacterList } from "../components/organisms/CharacterList";
import { CharacterDetail } from "../components/organisms/CharacterDetail";

export function HomePage() {
  const [filters, setFilters] = useState<CharacterFilters>({
    name: "",
    status: "",
    species: "",
    gender: "",
  });
  const [sort, setSort] = useState({
    field: "name",
    direction: "asc",
  });
  const [selectedCharacter, setSelectedCharacter] = useState<
    string | undefined
  >();

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: {
      page: 1,
      filter: {
        name: filters.name || undefined,
        status: filters.status || undefined,
        species: filters.species || undefined,
        gender: filters.gender || undefined,
      },
      sort: {
        field: sort.field,
        direction: sort.direction,
      },
    },
  });

  const [toggleFavoriteMutation] = useMutation(TOGGLE_FAVORITE, {
    refetchQueries: [GET_CHARACTERS],
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

  // No need to map isFavorite manually as it comes from the backend now
  const characters = data?.characters.results || [];

  const handleFilterChange = (newFilters: CharacterFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (direction: "asc" | "desc") => {
    setSort((prev) => ({
      ...prev,
      direction,
    }));
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
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="w-80 border-r border-gray-200 dark:border-gray-800">
          <div className="p-4">
            <Typography variant="h2" className="mb-4">
              Rick and Morty
            </Typography>
            <SearchBar
              value={filters.name || ""}
              onChange={(value) =>
                handleFilterChange({ ...filters, name: value })
              }
              onSearch={() => {
                // Refetch query is handled automatically by Apollo
              }}
            />
          </div>
          {!loading && characters && (
            <CharacterList
              characters={characters}
              onToggleFavorite={toggleFavorite}
              selectedCharacter={selectedCharacter}
              onSelectCharacter={setSelectedCharacter}
            />
          )}
        </div>
        <div className="flex-1 overflow-auto p-6">
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
