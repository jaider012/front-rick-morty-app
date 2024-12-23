// CharacterListItem.tsx

import { Heart } from "lucide-react";
import { Character } from "../../types/character";
import clsx from "clsx";

interface CharacterListItemProps {
  character: Character;
  onToggleFavorite: (id: string) => void;
  isSelected?: boolean; // si está seleccionado, se muestra con fondo resaltado
  onSelect: (id: string) => void;
  isStarred?: boolean; // si es 'starred', el corazón irá en verde
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
        "flex items-center justify-between cursor-pointer transition-colors",
        "px-4 py-2 rounded-lg border-b border-gray-100",
        isSelected ? "bg-[#EEE3FF]" : "bg-white hover:bg-gray-50" // Caso normal (favoritos o no, pero NO seleccionado)
      )}
      onClick={() => onSelect(character.id)}
    >
      <div className="flex items-center gap-3 flex-1">
        <img
          src={character.image}
          alt={character.name}
          className="h-10 w-10 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <h4 className="font-semibold text-sm text-gray-900">
            {character.name}
          </h4>
          <p className="text-xs text-gray-500">{character.species}</p>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(character.id);
        }}
        className="rounded-full p-1 hover:bg-white/50"
      >
        <Heart
          className={clsx("h-5 w-5", {
            // si isStarred === true => verde, si no => gris
            "fill-[#53C629] text-[#53C629]": isStarred,
            "text-gray-300": !isStarred,
          })}
        />
      </button>
    </div>
  );
}
