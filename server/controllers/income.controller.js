import Income from '../models/income.model.js'

const createIncome = async (req, res) => {
    try {
        const userId = req.user.userId
        const incomeData = {
            ...req.body,
            user: userId,
        }
        const newIncome = new Income(incomeData)
        const savedIncome = await newIncome.save()
        res.status(201).json(savedIncome)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAllIncomes = async (req, res) => {
    try {
        let query = { user: req.user.userId };

        if (req.query.category) {
            query.category = req.query.category;
        }
        if (req.query.dateFrom) {
            query.date = { ...query.date, $gte: new Date(req.query.dateFrom) };
        }
        if (req.query.dateTo) {
            query.date = { ...query.date, $lte: new Date(req.query.dateTo) };
        }
        if (req.query.minAmount) {
            query.amount = { ...query.amount, $gte: parseInt(req.query.minAmount) };
        }
        if (req.query.maxAmount) {
            query.amount = { ...query.amount, $lte: parseInt(req.query.maxAmount) };
        }

        const incomes = await Income.find(query);
        res.status(200).json(incomes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getIncomeById = async (req, res) => {
    try {
        const income = await Income.findById(req.params.id)
        if (!income || income.user.toString() !== req.user.userId) {
            return res.status(404).json({ message: "Income not found or user mismatch" })
        }
        res.status(200).json(income)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const updateIncomeById = async (req, res) => {
    try {
        const updatedIncome = await Income.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedIncome) {
            return res.status(404).json({ message: "Income not found" });
        }
        res.status(200).json(updatedIncome);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteIncomeById = async (req, res) => {
    try {
        const income = await Income.findOne({ _id: req.params.id, user: req.user.userId })
        if (!income) {
            return res.status(404).json({ message: "Income not found" })
        }
        await income.remove()
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