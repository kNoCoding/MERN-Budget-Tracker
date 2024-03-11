import express from 'express'
import controller from '../controllers/expense.controller.js'

const router = express.Router()

router.post('/', controller.createExpense)
router.get('/', controller.getAllExpenses)
router.get('/:id', controller.getExpenseById)
router.put('/:id', controller.updateExpenseById)
router.delete('/:id', controller.deleteExpenseById)

export default router