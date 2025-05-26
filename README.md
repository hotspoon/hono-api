# Hono API

A RESTful API built with [Hono](https://hono.dev/) and SQLite (Chinook sample database) for managing artists, albums, tracks, employees, customers, genres, invoices, invoice items, playlists, and media types.

## Features

- JWT authentication for secure endpoints
- Feature-based folder structure for scalability
- CRUD operations for all major entities
- Query related data (e.g., albums by artist, tracks by album/genre)
- Pagination support for listing endpoints
- Input validation using Zod
- Error handling middleware
- Built-in logging with Pino
- Comprehensive integration tests with Bun

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

### Run Tests

```sh
bun test
```

## Project Structure

```
api/                # API entrypoint
src/
  db/               # Database connection
  features/         # Feature-based modules (artists, albums, etc.)
  middlewares/      # Custom middlewares
  routes/           # Main router
  tests/            # Additional tests
  utils/            # Utilities (logger, validators, etc.)
logs/               # Application logs
```

## API Endpoints

See [`openapi.json`](openapi.json) for the full OpenAPI spec.

### Auth

- `POST /auth/signup` — Register a new employee
- `POST /auth/signin` — Sign in and get JWT

### Artists

- `GET /artists` — List artists (`page`, `limit`)
- `GET /artists/:id` — Get artist by ID
- `POST /artists` — Create artist
- `PUT /artists/:id` — Update artist
- `DELETE /artists/:id` — Delete artist

### Albums

- `GET /albums` — List albums (`page`, `limit`)
- `GET /albums/:id` — Get album by ID
- `POST /albums` — Create album
- `PUT /albums/:id` — Update album
- `DELETE /albums/:id` — Delete album
- `GET /albums/artist/:artistId` — List albums by artist

### Tracks

- `GET /tracks` — List tracks (`page`, `limit`)
- `GET /tracks/:id` — Get track by ID
- `POST /tracks` — Create track
- `PUT /tracks/:id` — Update track
- `DELETE /tracks/:id` — Delete track
- `GET /tracks/album/:albumId/tracks` — List tracks by album
- `GET /tracks/genre/:genreId/tracks` — List tracks by genre

### Employees

- `GET /employees` — List employees
- `GET /employees/:id` — Get employee by ID
- `GET /employees/:id/reports` — Get employees reporting to this employee
- `POST /employees` — Create employee
- `PUT /employees/:id` — Update employee
- `DELETE /employees/:id` — Delete employee

### Customers

- `GET /customers` — List customers
- `GET /customers/:id` — Get customer by ID
- `GET /customers/:id/invoices` — Get invoices for a customer
- `POST /customers` — Create customer
- `PUT /customers/:id` — Update customer
- `DELETE /customers/:id` — Delete customer
- `GET /customers/email/:email` — Get customer by email

### Genres

- `GET /genres` — List genres
- `GET /genres/:id` — Get genre by ID
- `POST /genres` — Create genre
- `PUT /genres/:id` — Update genre
- `DELETE /genres/:id` — Delete genre

### Invoices

- `GET /invoices` — List invoices (`page`, `limit`)
- `GET /invoices/:id` — Get invoice by ID
- `GET /invoices/:id/items` — Get invoice items for an invoice
- `POST /invoices` — Create invoice
- `PUT /invoices/:id` — Update invoice
- `DELETE /invoices/:id` — Delete invoice

### Invoice Items

- `GET /invoice-items` — List invoice items (`page`, `limit`)
- `GET /invoice-items/:id` — Get invoice item by ID

### Playlists

- `GET /playlists` — List playlists
- `GET /playlists/:id` — Get playlist by ID
- `POST /playlists` — Create playlist
- `PUT /playlists/:id` — Update playlist
- `DELETE /playlists/:id` — Delete playlist
- `GET /playlists/:id/tracks` — List tracks in a playlist
- `POST /playlists/:id/tracks` — Add track to playlist
- `DELETE /playlists/:id/tracks/:trackId` — Remove track from playlist

### Media Types

- `GET /media-types` — List all media types
- `GET /media-types/:id` — Get media type by ID

## Environment Variables

- `JWT_SECRET` — Secret key for JWT signing (default: `your_jwt_secret`)

## License

MIT
