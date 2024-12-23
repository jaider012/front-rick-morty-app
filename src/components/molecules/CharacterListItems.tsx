import { Heart } from "lucide-react";
import { Character } from "../../types/character";
import clsx from "clsx";

interface CharacterListItemProps {
  character: Character;
  onToggleFavorite: (id: string) => void;
  isSelected?: boolean;
  onSelect: (id: string) => void;
  isStarred?: boolean;
}

export function CharacterListItem({
  character,
  onToggleFavorite,
  isSelected,
  onSelect,
  isStarred,
}: CharacterListItemProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-between p-4 transition-colors cursor-pointer",
        isSelected
          ? "bg-[#EEE3FF] dark:bg-purple-900/30"
          : isStarred
          ? "bg-purple-50 dark:bg-purple-900/20"
          : "hover:bg-gray-50 dark:hover:bg-gray-800",
        "border-b border-gray-100 dark:border-gray-800"
      )}
      onClick={() => {
        onSelect(character.id);
        console.log("CharacterListItemProps", character);
      }}
    >
      <div className="flex items-center gap-3 flex-1">
        <img
          src={character.image}
          alt={character.name}
          className="h-10 w-10 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <h3 className="font-medium text-gray-900 dark:text-gray-100">
            {character.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {character.species}
          </p>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(character.id);
        }}
        className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Heart
          className={clsx("h-5 w-5", {
            "fill-green-500 text-green-500": character.isFavorite,
            "text-gray-400": !character.isFavorite,
          })}
        />
      </button>
    </div>
  );
}
