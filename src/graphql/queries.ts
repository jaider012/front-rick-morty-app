import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: CharacterFilter, $sort: SortInput) {
    characters(page: $page, filter: $filter, sort: $sort) {
      results {
        id
        name
        status
        species
        type
        gender
        origin
        location
        image
        apiId
        favorite
        deleted
        createdAt
        updatedAt
        comments {
          id
          content
          created
          createdAt
          updatedAt
        }
      }
      info {
        count
        pages
        next
        prev
      }
    }
  }
`;

// Helper type for frontend use
export interface CharacterFilter {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  origin?: string;
  favorite?: boolean;
  favoriteFilter?: "Starred" | "All" | "Others";
}

// Helper type for sort parameters
export interface SortInput {
  field: string;
  direction: "asc" | "desc";
}

export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin
      location
      image
      apiId
      favorite
      comments {
        id
        content
        created
        createdAt
        updatedAt
      }
      deleted
      createdAt
      updatedAt
    }
  }
`;

export const TOGGLE_FAVORITE = gql`
  mutation ToggleFavorite($id: ID!) {
    toggleFavorite(id: $id) {
      id
      favorite
      updatedAt
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($characterId: ID!, $content: String!) {
    addComment(characterId: $characterId, content: $content) {
      id
      content
      created
      createdAt
      updatedAt
      characterId
    }
  }
`;

export const SOFT_DELETE_CHARACTER = gql`
  mutation SoftDeleteCharacter($id: ID!) {
    softDeleteCharacter(id: $id) {
      id
      deleted
      updatedAt
    }
  }
`;
