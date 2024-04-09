import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const expenseSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    category: String,
    date: Date,
    description: String,
    user: {
        type: ObjectId,
        ref: 'User',
        required: true,
    }
})

const Expense = mongoose.model('Expense', expenseSchema)

export default Expense