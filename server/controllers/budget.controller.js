import Budget from '../models/budget.model.js'

const createBudget = async (req, res) => {
    try {
        const userId = req.user.userId
        const budgetData = {
            ...req.body,
            user: userId,
        }
        const newBudget = new Budget(budgetData)
        const savedBudget = await newBudget.save()
        res.status(201).json(savedBudget)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAllBudgets = async (req, res) => {
    try {
        const userId = req.user.userId
        const budgets = await Budget.find({ user: userId })
        res.status(200).json(budgets)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const getBudgetById = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id)
        if (!budget || budget.user.toString() !== req.user.userId) {
            return res.status(404).json({ message: "Budget not found or user mismatch" })
        }
        res.status(200).json(budget)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const updateBudgetById = async (req, res) => {
    try {
        const userId = req.user.userId
        const budgetUpdate = {
            ...req.body,
            user: userId,
        }
        const updatedBudget = await Budget.findByIdAndUpdate(req.params.id, budgetUpdate, { new: true })
        res.status(200).json(updatedBudget)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteBudgetById = async (req, res) => {
    try {
        const userId = req.user.userId
        const budget = await Budget.findById(req.params.id)
        if (!budget || budget.user.toString() !== userId) {
            return res.status(404).json({ message: "Budget not found or user mismatch" })
        }
        await Budget.findByIdAndDelete(req.params.id, { user: req.user.userId })
        res.status(204).send()
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const budgetController = {
    createBudget,
    getAllBudgets,
    getBudgetById,
    updateBudgetById,
    deleteBudgetById
}

export default budgetController
