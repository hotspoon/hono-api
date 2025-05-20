import { db } from "../db/database"

export const getGenres = () => db.query("SELECT * FROM genres").all()

export const getGenreById = (id: string) =>
  db.query("SELECT * FROM genres WHERE GenreId = ?").get(id)

export const createGenre = (name: string) => {
  const stmt = db.prepare("INSERT INTO genres (Name) VALUES (?)")
  return stmt.run(name)
}

export const updateGenre = (id: string, name: string) => {
  const stmt = db.prepare("UPDATE genres SET Name = ? WHERE GenreId = ?")
  return stmt.run(name, id)
}

export const deleteGenre = (id: string) => {
  const stmt = db.prepare("DELETE FROM genres WHERE GenreId = ?")
  return stmt.run(id)
}
