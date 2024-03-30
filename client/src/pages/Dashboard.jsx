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
        <div className='main-layout'>
            <h1>Expenses 🧮🪙</h1>
            {/* <button onClick={() => navigate('/expense-form')}>Add Expense</button> */}
            <ExpenseList
                expenses={expenses}
                onDelete={(id) => dispatch(deleteExpense(id))}
            />
        </div>
    )
}

export default Dashboard
