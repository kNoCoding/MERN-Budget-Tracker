import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import expensesRouter from './routes/expenses.js'
import incomesRouter from './routes/incomes.js'
import usersRouter from './routes/users.js'
import authRoutes from './routes/auth.js'

import authMiddleware from './middleware/authMiddleware.js'
import adminMiddleware from './middleware/adminMiddleware.js'
import loggingMiddleware from './middleware/loggingMiddleware.js'

const app = express()
const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB Connected!')
    }).catch(err => {
        console.error('MongoDB connection error:', err)
        process.exit(1)
    });


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())

// NO MIDDLEWARE FOR DEVELOPMENT
// app.use('/api/auth', loggingMiddleware, authRoutes)
// app.use('/api/users', loggingMiddleware, usersRouter)
// app.use('/api/expenses', loggingMiddleware, expensesRouter)
// app.use('/api/incomes', loggingMiddleware, incomesRouter)

// WITH MIDDLEWARE FOR PRODUCTION
app.use('/api/auth', loggingMiddleware, authRoutes)
app.use('/api/users', authMiddleware, adminMiddleware, loggingMiddleware, usersRouter)
app.use('/api/expenses', authMiddleware, expensesRouter)
app.use('/api/incomes', authMiddleware, incomesRouter)

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})