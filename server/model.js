const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    category: String,
    date: Date,
    description: String,
})

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense