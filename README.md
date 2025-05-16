# Hono API

A RESTful API built with [Hono](https://hono.dev/) and SQLite (Chinook sample database) for managing artists, albums, and tracks.

## Features

- CRUD operations for Artists, Albums, and Tracks
- Pagination support for listing endpoints
- Input validation using Zod
- Error handling middleware
- Built-in logging

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- `chinook.db` SQLite database file in the project root

### Install dependencies

```sh
bun install
```

### Run the API

```sh
bun run dev
```

The server will start on [http://localhost:3000](http://localhost:3000).

## API Endpoints

### Artists

- `GET /artists` — List artists (supports `page` and `limit` query params)
- `GET /artists/:id` — Get artist by ID
- `POST /artists` — Create artist
- `PUT /artists/:id` — Update artist
- `DELETE /artists/:id` — Delete artist

### Albums

- `GET /albums` — List albums (supports `page` and `limit`)
- `GET /albums/:id` — Get album by ID
- `POST /albums` — Create album
- `PUT /albums/:id` — Update album
- `DELETE /albums/:id` — Delete album
- `GET /albums/artist/:artistId` — List albums by artist

### Tracks

- `GET /tracks` — List tracks (supports `page` and `limit`)
- `GET /tracks/:id` — Get track by ID
- `POST /tracks` — Create track
- `PUT /tracks/:id` — Update track
- `DELETE /tracks/:id` — Delete track
- `GET /tracks/album/:albumId/tracks` — List tracks by album
- `GET /tracks/genre/:genreId/tracks` — List tracks by genre

## Project Structure

```
src/
  index.ts                # Entry point
  db/
    database.ts           # SQLite database connection
  middlewares/
    errorHandler.ts       # Error handling middleware
    notFoundHandler.ts    # 404 handler
  routes/
    artists.ts            # Artists endpoints
    albums.ts             # Albums endpoints
    tracks.ts             # Tracks endpoints
  schema/
    artists.ts            # Zod schema for artists
    albums.ts             # Zod schema for albums
    tracks.ts             # Zod schema for tracks
```

## License

MIT
