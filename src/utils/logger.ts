import pino from "pino"
import path from "path"
import fs from "fs"

const logPath = path.join(process.cwd(), "logs", "app.log")

// Ensure the logs directory exists
const logDir = path.dirname(logPath)
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true })
}

export const logger = pino(
  {
    level: process.env.PINO_LOG_LEVEL || "info",
    formatters: {
      bindings: (bindings) => {
        return { pid: bindings.pid, host: bindings.hostname, node_version: process.version }
      },
      level(label) {
        return { level: label.toUpperCase() }
      }
    },
    // Custom timestamp property
    timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`
  },
  pino.destination({ dest: logPath, sync: false })
)
