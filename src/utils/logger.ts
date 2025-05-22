import pino from "pino"
import path from "path"
import fs from "fs"

const logPath = path.join(process.cwd(), "logs", "app.log")

// Ensure the logs directory exists (optional, for first run)
const logDir = path.dirname(logPath)
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true })
}

export const logger = pino(pino.destination({ dest: logPath, sync: false }))
