import { Key, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_CHARACTER,
  ADD_COMMENT,
  TOGGLE_FAVORITE,
  SOFT_DELETE_CHARACTER,
} from "../../graphql/queries";
import { CharacterAttribute } from "../atoms/CharacterAttribute";
import { Typography } from "../atoms/Typography";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { Heart, Trash2 } from "lucide-react";
import clsx from "clsx";

interface CharacterDetailProps {
  id: string;
}

export function CharacterDetail({ id }: CharacterDetailProps) {
  const [newComment, setNewComment] = useState("");

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id },
  });

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: GET_CHARACTER, variables: { id } }],
  });

  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    refetchQueries: [{ query: GET_CHARACTER, variables: { id } }],
  });

  const [softDeleteCharacter] = useMutation(SOFT_DELETE_CHARACTER);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await addComment({
        variables: {
          characterId: id,
          content: newComment.trim(),
        },
      });
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#8054C7] border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <Typography variant="p" className="text-red-500">
          Error: {error.message}
        </Typography>
      </div>
    );
  }

  const character = data?.character;

  return (
    <div className="h-full">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={character.image}
            alt={character.name}
            className="h-16 w-16 rounded-full object-cover"
          />
          <Typography variant="h1" className="text-gray-900">
            {character.name}
          </Typography>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => toggleFavorite({ variables: { id: character.id } })}
          >
            <Heart
              className={clsx("h-6 w-6", {
                "fill-[#53C629] text-[#53C629]": character.favorite,
                "text-gray-300": !character.favorite,
              })}
            />
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete this character?"
                )
              ) {
                softDeleteCharacter({ variables: { id: character.id } });
              }
            }}
          >
            <Trash2 className="h-6 w-6 text-gray-400" />
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <CharacterAttribute label="Specie" value={character.species} />
        <CharacterAttribute label="Status" value={character.status} />
        <CharacterAttribute label="Gender" value={character.gender} />
        <CharacterAttribute label="Origin" value={character.origin} />
        <CharacterAttribute label="Location" value={character.location} />
      </div>

      {/* Comments Section */}
      <div className="rounded-lg bg-gray-50 p-6">
        <Typography variant="h3" className="mb-4">
          Comments
        </Typography>

        <div className="mb-6 flex gap-2">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 bg-white"
          />
          <Button onClick={handleAddComment}>Post</Button>
        </div>

        <div className="space-y-4">
          {character.comments?.map(
            (comment: {
              id: Key;
              content: string;
              created: string | number | Date;
            }) => (
              <div
                key={comment.id}
                className="rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md"
              >
                <Typography variant="p">{comment.content}</Typography>
                <Typography variant="small" className="mt-2">
                  {new Date(comment.created).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
