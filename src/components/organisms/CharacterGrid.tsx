import { Character } from "../../types/character";
import { Spinner } from "../atoms/Spinner";
import { CharacterCard } from "../character-card";


interface CharacterGridProps {
  characters: Character[];
  isLoading: boolean;
  onToggleFavorite: (id: string) => void;
}

export function CharacterGrid({ characters, isLoading, onToggleFavorite }: CharacterGridProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-gray-500">No characters found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}