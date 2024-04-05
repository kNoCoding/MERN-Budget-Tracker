import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ExpenseList from '../components/ExpenseList.jsx'
import { loadExpenses, deleteExpense } from '../store/actions/expense.action.js'
import TotalExpenses from '../components/TotalExpenses.jsx'

function Dashboard() {
    const dispatch = useDispatch()
    const { expenses } = useSelector(state => state.expenseModule)

    useEffect(() => {
        dispatch(loadExpenses())
    }, [dispatch])

    return (
        <main className='container'>
            <h1>Dashboard 🧮</h1>

            <div>
                <h2>Expenses 🤔</h2>
                <TotalExpenses />
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
