import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import expensesRouter from './routes/expenses.js'
import incomesRouter from './routes/incomes.js'
import authRoutes from './routes/auth.js'

const app = express()
const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB Connected!')
    }).catch(err => {
        console.error('MongoDB connection error:', err)
        process.exit(1)
    });

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/expenses', expensesRouter)
app.use('/incomes', incomesRouter)

// app.get('/', (req, res) => {
//     res.send('hello world!')
// })

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})