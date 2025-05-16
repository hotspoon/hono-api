import { Database } from "bun:sqlite"

function initializeDatabase(): Database {
  try {
    // Initialize SQLite database
    const db = new Database("./chinook.db")
    console.log("Database connection established successfully.")

    return db
  } catch (error) {
    console.error("Failed to initialize the database:", error)
    process.exit(1) // Exit the process if the database setup fails
  }
}

export const db = initializeDatabase()
