import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

interface Character {
  id: string;
  name: string;
  species: string;
  status: "Alive" | "Dead" | "unknown";
  image: string;
  isFavorite?: boolean;
}

interface CharacterCardProps {
  character: Character;
  onToggleFavorite: (id: string) => void;
}

export function CharacterCard({
  character,
  onToggleFavorite,
}: CharacterCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md dark:bg-gray-800">
      <Link to={`/character/${character.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={character.image}
            alt={character.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="line-clamp-1 text-lg font-semibold text-gray-900 dark:text-white">
            {character.name}
          </h3>
          <button
            onClick={() => onToggleFavorite(character.id)}
            className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={
              character.isFavorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            <Heart
              className={`h-5 w-5 ${
                character.isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            />
          </button>
        </div>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {character.species}
        </p>

        <div className="mt-2">
          <span
            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
              character.status === "Alive"
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : character.status === "Dead"
                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
            }`}
          >
            {character.status}
          </span>
        </div>
      </div>
    </div>
  );
}
