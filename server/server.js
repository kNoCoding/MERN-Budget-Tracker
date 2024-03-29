import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

import expensesRouter from './routes/expenses.js'
import incomesRouter from './routes/incomes.js'
import usersRouter from './routes/users.js'
import authRoutes from './routes/auth.js'

import authMiddleware from './middleware/authMiddleware.js'
import adminMiddleware from './middleware/adminMiddleware.js'
import loggingMiddleware from './middleware/loggingMiddleware.js'

const app = express()
const port = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB Connected!')
    }).catch(err => {
        console.error('MongoDB connection error:', err)
        process.exit(1)
    })


const corsOptions = {
    origin: function (origin, callback) {
        if (process.env.NODE_ENV === 'production') {
            const allowedOrigin = 'https://mern-budget-tracker-client.onrender.com'
            if (origin === allowedOrigin) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        } else {
            if (!origin) return callback(null, true)
            if (origin.startsWith('http://localhost')) {
                return callback(null, true)
            }
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}

app.use(cors(corsOptions))

app.use(express.json())

// API Routes with middleware
app.use('/api/auth', loggingMiddleware, authRoutes)
app.use('/api/users', authMiddleware, adminMiddleware, loggingMiddleware, usersRouter)
app.use('/api/expenses', authMiddleware, expensesRouter)
app.use('/api/incomes', authMiddleware, incomesRouter)

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'))
    })
}

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})