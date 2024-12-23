import { Character } from "../../types/character";
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
  const starredCharacters = characters.filter((char) => char.favorite);
  const unstarredCharacters = characters.filter((char) => !char.favorite);

  return (
    <div className="flex h-[calc(100vh-120px)] flex-col">
      <div className="flex-1 overflow-y-auto">
        {starredCharacters.length > 0 && (
          <div>
            <div className="sticky top-0 bg-white px-4 py-3">
              <h2 className="text-sm font-medium text-gray-600">
                STARRED CHARACTERS ({starredCharacters.length})
              </h2>
            </div>
            <div>
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
          <div className="sticky top-0 bg-white px-4 py-3">
            <h2 className="text-sm font-medium text-gray-600">
              CHARACTERS ({unstarredCharacters.length})
            </h2>
          </div>
          <div>
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
    </div>
  );
}
