import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import clsx from 'clsx';
import { Character } from '../../types/character';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';

interface CharacterCardProps {
  character: Character;
  onToggleFavorite: (id: string) => void;
}

export function CharacterCard({ character, onToggleFavorite }: CharacterCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md dark:bg-gray-900">
      <Link to={`/character/${character.id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={character.image}
            alt={character.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex items-center justify-between">
          <Typography variant="h4" className="line-clamp-1">
            {character.name}
          </Typography>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleFavorite(character.id)}
            className="rounded-full p-2"
          >
            <Heart
              className={clsx('h-5 w-5', {
                'fill-red-500 text-red-500': character.isFavorite,
                'text-gray-400': !character.isFavorite,
              })}
            />
          </Button>
        </div>
        
        <Typography variant="small" className="mt-1">
          {character.species}
        </Typography>
        
        <div className="mt-2">
          <span
            className={clsx('inline-flex rounded-full px-2 py-1 text-xs font-medium', {
              'bg-green-100 text-green-700': character.status === 'Alive',
              'bg-red-100 text-red-700': character.status === 'Dead',
              'bg-gray-100 text-gray-700': character.status === 'unknown',
            })}
          >
            {character.status}
          </span>
        </div>
      </div>
    </div>
  );
}