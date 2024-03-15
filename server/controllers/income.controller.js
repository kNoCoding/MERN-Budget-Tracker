import Income from '../models/income.js'

const createIncome = async (req, res) => {
    try {
        const newIncome = new Income(req.body)
        const savedIncome = await newIncome.save()
        res.status(201).json(savedIncome)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAllIncomes = async (req, res) => {
    try {
        const incomes = await Income.find()
        res.status(200).json(incomes)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const getIncomeById = async (req, res) => {
    try {
        const income = await Income.findById(req.params.id)
        if (!income) return res.status(404).json({ message: "Income not found" })
        res.status(200).json(income)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const updateIncomeById = async (req, res) => {
    try {
        const updatedIncome = await Income.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedIncome)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteIncomeById = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id)
        res.status(204).send()
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const incomeController = {
    createIncome,
    getAllIncomes,
    getIncomeById,
    updateIncomeById,
    deleteIncomeById
}

export default incomeController