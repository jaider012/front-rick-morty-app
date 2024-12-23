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
import { Heart, Trash2, Send, Rocket } from "lucide-react";
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
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#8054C7] border-t-transparent" />
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
    <div className="h-full p-6">
      {/* Header with image, name, and actions */}
      <div className="mb-12">
        <div className="flex items-start justify-between">
          <div className="relative inline-block">
            <img
              src={character.image}
              alt={character.name}
              className="h-20 w-20 rounded-full object-cover"
            />
            <Heart
              className={clsx(
                "absolute -right-1 -bottom-1 h-9 w-9 cursor-pointer rounded-full bg-white p-2",
                {
                  "fill-[#53C629] text-[#53C629]": character.favorite,
                  "text-gray-300": !character.favorite,
                }
              )}
              onClick={() =>
                toggleFavorite({ variables: { id: character.id } })
              }
            />
          </div>
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
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <Trash2 className="h-6 w-6 text-gray-400" />
          </Button>
        </div>
        <Typography variant="h1" className="mt-4 text-3xl font-bold">
          {character.name}
        </Typography>
      </div>

      {/* Character Attributes */}
      <div className="space-y-0">
        <CharacterAttribute label="Specie" value={character.species} />
        <CharacterAttribute label="Status" value={character.status} />
        <CharacterAttribute label="Occupation" value="Princess" />

        <div className="hidden">
          <CharacterAttribute label="Gender" value={character.gender} />
          <CharacterAttribute label="Origin" value={character.origin.name} />
          <CharacterAttribute
            label="Location"
            value={character.location.name}
          />
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-12">
        <Typography variant="h3" className="mb-6 text-xl font-semibold">
          Comments
        </Typography>

        {/* Comment Input */}
        <div className="mb-8">
          <div className="flex gap-2">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 rounded-lg border-gray-200 bg-white px-4 py-3"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddComment();
                }
              }}
            />
            <Button
              onClick={handleAddComment}
              variant="secondary"
              className=" bg-slate-50"
            >
              <Rocket className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {character.comments?.map(
            (comment: {
              id: Key;
              content: string;
              created: string | number | Date;
            }) => (
              <div
                key={comment.id}
                className="rounded-lg border border-gray-100 bg-white p-4 transition-all hover:border-[#53C629]/20"
              >
                <Typography variant="p" className="text-gray-800">
                  {comment.content}
                </Typography>
                <Typography variant="small" className="mt-2 text-[#53C629]">
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

          {!character.comments?.length && (
            <div className="text-center py-8">
              <Typography variant="p" className="text-gray-500">
                No comments yet. Be the first to comment!
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;
