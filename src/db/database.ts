import { Database } from "bun:sqlite"
import path from "path"

function initializeDatabase(): Database {
  try {
    // Initialize SQLite database
    const dbPath = path.join(process.cwd(), "chinook.db")
    const db = new Database(dbPath)
    console.log("Database connection established successfully.")

    return db
  } catch (error) {
    console.error("Failed to initialize the database:", error)
    process.exit(1) // Exit the process if the database setup fails
  }
}

export const db = initializeDatabase()
