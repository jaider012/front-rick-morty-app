export interface Character {
  id: string;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: Location;
  location: Location;
  image: string;
  episode: Episode[];
  created: string;
  favorite?: boolean;
}

export interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
}

export interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
}

export interface CharacterFilters {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  sortDirection?: "asc" | "desc";
  favoriteFilter?: "All" | "Starred" | "Others";
}
