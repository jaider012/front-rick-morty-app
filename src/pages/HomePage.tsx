import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CHARACTERS, TOGGLE_FAVORITE } from "../graphql/queries";
import { MainLayout } from "../components/templates/MainLayout";
import { Typography } from "../components/atoms/Typography";
import { CharacterFilters } from "../types/character";
import { CharacterList } from "../components/organisms/CharacterList";
import { CharacterDetail } from "../components/organisms/CharacterDetail";
import SearchFilterBar from "../components/molecules/SearchBar";

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
  const [searchValue, setSearchValue] = useState("");

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: {
      page: 1,
      filter: {
        name: searchValue || undefined,
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

  const characters = data?.characters.results || [];

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleFilterChange = (selectedFilters: {
    character: string;
    species: string;
  }) => {
    const newFilters: CharacterFilters = {
      ...filters,
      species: selectedFilters.species === "All" ? "" : selectedFilters.species,
    };
    setFilters(newFilters);
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
            <Typography variant="h2" className="mb-4 ">
              Rick and Morty
            </Typography>
            <SearchFilterBar
              value={searchValue}
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
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
