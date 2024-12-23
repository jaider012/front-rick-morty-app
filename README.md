# Rick and Morty Explorer

Frontend application to explore Rick and Morty characters using React, GraphQL and TypeScript.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open `http://localhost:5173` in your browser

## Features

- Character browsing and search
- Filter by status and species
- Sort characters A-Z / Z-A
- Mark favorites
- Dark mode support

## Technologies

- React 18
- TypeScript
- Apollo Client
- TailwindCSS
- Vite

## Project Structure

```
src/
├── components/
│   ├── atoms/          # Basic components (Button, Input, etc)
│   ├── molecules/      # Simple combinations (SearchBar, etc)
│   ├── organisms/      # Complex components (CharacterGrid, etc)
│   └── templates/      # Page layouts
├── ui/                 # Shared UI components
├── graphql/           # GraphQL queries
├── lib/               # Utilities and config
├── pages/             # Route components
└── types/             # TypeScript types
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## GraphQL Endpoint

The app connects to `http://localhost:4000/graphql` by default. Update this in `src/lib/apollo-client.ts` if needed.