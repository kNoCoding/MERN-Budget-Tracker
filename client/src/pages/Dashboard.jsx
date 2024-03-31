import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import ExpenseList from '../components/ExpenseList.jsx'
import { loadExpenses, deleteExpense } from '../store/actions/expense.action.js'

function Dashboard() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { expenses } = useSelector(state => state.expenseModule)

    useEffect(() => {
        dispatch(loadExpenses())
    }, [dispatch])

    return (
        <main className='container'>
            <h1>Dashboard 🧮</h1>

            <div>
                <h2>Expenses 🤔</h2>
                <ExpenseList expenses={expenses} onDelete={(id) => dispatch(deleteExpense(id))}
                />
            </div>
            <div>
                <h2>Incomes 🤑</h2>
                <p>Incomes will be displayed here</p>
            </div>
        </main>
    )
}

export default Dashboard
