import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadExpenses } from '../store/actions/expense.action.js'

function Dashboard() {
    const dispatch = useDispatch()
    const { expenses } = useSelector(state => state.expenseModule)

    useEffect(() => {
        dispatch(loadExpenses())
    }, [dispatch])

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return (
        <div>
            <h1>This is the dashboard 🧮🪙</h1>
            <ul>
                {expenses.map(expense => (
                    <li key={expense._id}>{expense.name}: {expense.amount} - {formatDate(expense.date)}</li>
                ))}
            </ul>
        </div>
    )
}

export default Dashboard