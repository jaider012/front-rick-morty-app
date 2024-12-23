// CharacterListItem.tsx
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
        "flex items-center justify-between px-4 py-3 cursor-pointer transition-colors",
        isSelected
          ? "bg-[#EEE3FF]"
          : isStarred
          ? "bg-[#F9F5FF]"
          : "hover:bg-gray-50",
        "border-b border-gray-100"
      )}
      onClick={() => onSelect(character.id)}
    >
      <div className="flex items-center gap-3 flex-1">
        <img
          src={character.image}
          alt={character.name}
          className="h-12 w-12 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {character.name}
          </h3>
          <p className="text-gray-500">{character.species}</p>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(character.id);
        }}
        className="rounded-full p-2 hover:bg-white/50"
      >
        <Heart
          className={clsx("h-6 w-6", {
            "fill-[#53C629] text-[#53C629]": character.favorite,
            "text-gray-300": !character.favorite,
          })}
        />
      </button>
    </div>
  );
}
