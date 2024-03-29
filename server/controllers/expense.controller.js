import Expense from '../models/expense.js'

const createExpense = async (req, res) => {
    try {
        const userId = req.user.userId
        const expenseData = {
            ...req.body,
            user: userId,
        }
        const newExpense = new Expense(expenseData)
        const savedExpense = await newExpense.save()
        res.status(201).json(savedExpense)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.userId })
        res.status(200).json(expenses)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id, { user: req.user.userId })
        if (!expense) return res.status(404).json({ message: "Expense not found" })
        res.status(200).json(expense)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const updateExpenseById = async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true }, { user: req.user.userId })
        res.status(200).json(updatedExpense)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteExpenseById = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id, { user: req.user.userId })
        res.status(204).send()
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const expenseController = {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpenseById,
    deleteExpenseById
}

export default expenseController