import express from 'express'
import controller from '../controllers/income.controller.js'

const router = express.Router()

router.post('/', controller.createIncome)
router.get('/', controller.getAllIncomes)
router.get('/:id', controller.getIncomeById)
router.put('/:id', controller.updateIncomeById)
router.delete('/:id', controller.deleteIncomeById)

export default router