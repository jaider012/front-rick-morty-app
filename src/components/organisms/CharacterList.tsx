import { Character } from "../../types/character";
import { Typography } from "../atoms/Typography";
import { CharacterListItem } from "../molecules/CharacterListItems";

interface CharacterListProps {
  characters: Character[];
  onToggleFavorite: (id: string) => void;
  selectedCharacter?: string;
  onSelectCharacter: (id: string) => void;
}

export function CharacterList({
  characters,
  onToggleFavorite,
  selectedCharacter,
  onSelectCharacter,
}: CharacterListProps) {
  const starredCharacters = characters.filter((char) => char.isFavorite);
  const unstarredCharacters = characters.filter((char) => !char.isFavorite);

  return (
    <div className="h-full overflow-auto">
      {starredCharacters.length > 0 && (
        <div className="mb-6">
          <Typography variant="small" className="px-4 py-2 uppercase">
            Starred Characters ({starredCharacters.length})
          </Typography>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {starredCharacters.map((character) => (
              <CharacterListItem
                key={character.id}
                character={character}
                onToggleFavorite={onToggleFavorite}
                isSelected={selectedCharacter === character.id}
                onSelect={onSelectCharacter}
                isStarred
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <Typography variant="small" className="px-4 py-2 uppercase">
          Characters ({unstarredCharacters.length})
        </Typography>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {unstarredCharacters.map((character) => (
            <CharacterListItem
              key={character.id}
              character={character}
              onToggleFavorite={onToggleFavorite}
              isSelected={selectedCharacter === character.id}
              onSelect={onSelectCharacter}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
