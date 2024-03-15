import { info } from './logger.js'

export default function loggingMiddleware(req, res, next) {
    res.on('finish', () => {
        info(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    })
    next()
}