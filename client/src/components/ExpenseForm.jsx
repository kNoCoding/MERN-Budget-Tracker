import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addExpense, updateExpense, loadExpenses } from '../store/actions/expense.action.js'
import { useSelector } from 'react-redux'

function ExpenseForm() {
    const { expenseId } = useParams() // For edit mode
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { expenses } = useSelector(state => state.expenseModule)
    const [expense, setExpense] = useState({
        name: '',
        amount: '',
        category: '',
        date: '',
        description: '',
    })

    useEffect(() => {
        if (expenseId) {
            // Find the expense in the store and set it to the state
            const existingExpense = expenses.find(e => e._id === expenseId)
            if (existingExpense) setExpense({ ...existingExpense, date: existingExpense.date.split('T')[0] }) // Adjust date format if necessary
        }
    }, [expenseId, expenses])

    const handleChange = (e) => {
        const { name, value } = e.target
        setExpense(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (expenseId) {
            dispatch(updateExpense({ ...expense, _id: expenseId }))
        } else {
            dispatch(addExpense(expense))
        }
        navigate('/dashboard')
    }

    return (
        <div className='expense-form'>
            <h1>{expenseId ? 'Update Expense' : 'Add Expense'}</h1>

            <form onSubmit={handleSubmit} >
                <label>
                    Name:
                    <input name="name" value={expense.name} onChange={handleChange} placeholder="Expense name" required />
                </label>
                <label>
                    Amount:
                    <input type="number" name="amount" value={expense.amount} onChange={handleChange} placeholder="Amount" required />
                </label>
                <label>
                    Category:
                    <input name="category" value={expense.category} onChange={handleChange} placeholder="Category" />
                </label>
                <label>
                    Date:
                    <input type="date" name="date" value={expense.date} onChange={handleChange} required />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={expense.description} onChange={handleChange} placeholder="Description"></textarea>
                </label>
                <button type="submit">{expenseId ? 'Update Expense' : 'Add Expense'}</button>
            </form>
        </div>
    )
}

export default ExpenseForm
