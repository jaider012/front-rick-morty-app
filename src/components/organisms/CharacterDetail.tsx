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

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
        <Typography variant="h4" className="text-red-600 dark:text-red-400">
          Error: {error.message}
        </Typography>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  const character = data?.character;

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-6">
        <img
          src={character.image}
          alt={character.name}
          className="h-48 w-48 rounded-lg object-cover"
        />
        <div className="space-y-4 flex-1">
          <div className="flex items-start justify-between">
            <Typography variant="h1">{character.name}</Typography>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={() =>
                  toggleFavorite({ variables: { id: character.id } })
                }
              >
                <Heart
                  className={clsx("h-5 w-5", {
                    "fill-red-500 text-red-500": character.favorite,
                    "text-gray-400": !character.favorite,
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
                <Trash2 className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <CharacterAttribute label="Species" value={character.species} />
            <CharacterAttribute label="Status" value={character.status} />
            <CharacterAttribute label="Gender" value={character.gender} />
            <CharacterAttribute label="Origin" value={character.origin} />
            <CharacterAttribute label="Location" value={character.location} />
            <CharacterAttribute
              label="Created"
              value={new Date(character.createdAt).toLocaleDateString()}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Typography variant="h3">Comments</Typography>
        <div className="flex gap-2">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1"
          />
          <Button onClick={handleAddComment}>Add Comment</Button>
        </div>
        <div className="space-y-4">
          {character.comments?.map(
            (comment: {
              id: Key | null | undefined;
              content: string;
              created: string | number | Date;
            }) => (
              <div
                key={comment.id}
                className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
              >
                <Typography>{comment.content}</Typography>
                <Typography variant="small">
                  {new Date(comment.created).toLocaleString()}
                </Typography>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
