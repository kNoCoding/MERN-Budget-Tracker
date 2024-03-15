import fs from 'fs'
import path from 'path'
import os from 'os'

// Helper function to convert a file URL to a path
const fileURLToPath = (fileURL) => {
    const url = new URL(fileURL)
    return url.protocol === 'file:' ? decodeURIComponent(url.pathname).replace(/^[/\\]*([A-Za-z]:)/, '$1') : url.pathname
}

// Properly join the directory path
const logFilePath = fileURLToPath(new URL('../logs/app.log', import.meta.url))

// Ensure the logs directory exists
const logsDir = path.dirname(logFilePath)
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true })
}

function logMessage(level, message) {
    const timestamp = new Date().toISOString()
    const log = `${timestamp} [${level.toUpperCase()}] - ${message}${os.EOL}`
    fs.appendFileSync(logFilePath, log, { encoding: 'utf8' })
}

export function info(message) {
    logMessage('info', message)
}

export function error(message) {
    logMessage('error', message)
}
