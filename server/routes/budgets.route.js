import express from 'express'
import controller from '../controllers/budget.controller.js'

const router = express.Router()

router.post('/', controller.createBudget)
router.get('/', controller.getAllBudgets)
router.get('/:id', controller.getBudgetById)
router.put('/:id', controller.updateBudgetById)
router.delete('/:id', controller.deleteBudgetById)

export default router