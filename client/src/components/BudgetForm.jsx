import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { addBudget, updateBudget } from '../store/actions/budget.action.js'


function BudgetForm() {
    const { budgetId } = useParams() // For edit mode
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { budgets } = useSelector(state => state.budgetModule)
    const [budget, setBudget] = useState({
        category: '',
        amount: ''
    })

    useEffect(() => {
        if (budgetId) {
            const existingBudget = budgets.find(e => e._id === budgetId)
            if (existingBudget) setBudget({ ...existingBudget, existingBudget })
        }
    }, [budgetId, budgets])

    const handleChange = (e) => {
        const { name, value } = e.target
        setBudget(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const actionFn = budgetId ? updateBudget : addBudget;
        try {
            dispatch(actionFn({ ...budget, _id: budgetId }))
            navigate('/dashboard')
        } catch (error) {
            console.error('Failed to process budget.', error)
        }
    }

    return (
        <main className='budget-form container'>
            <h1>{budgetId ? 'Update Budget' : 'Add Budget'}</h1>

            <form onSubmit={handleSubmit} >
                <label>Category:
                    <input name="category" value={budget.category} onChange={handleChange} placeholder="Category" />
                </label>
                <label>Amount:
                    <input type="number" name="amount" value={budget.amount} onChange={handleChange} placeholder="Amount" required />
                </label>
                <button type="submit">{budgetId ? 'Update Budget' : 'Add Budget'}</button>
            </form>
        </main>
    )
}

export default BudgetForm