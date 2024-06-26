import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ExpenseList from '../components/ExpenseList.jsx'
import IncomeList from '../components/IncomeList.jsx'
import { loadExpenses, deleteExpense } from '../store/actions/expense.action.js'
import { loadIncomes, deleteIncome } from '../store/actions/income.action.js'
import TotalExpenses from '../components/TotalExpenses.jsx'
import TotalIncomes from '../components/TotalIncomes.jsx'
import FilterBar from '../components/FilterBar.jsx'
import { ChartComponent } from '../components/ChartComponent.jsx'

function Dashboard() {
    const dispatch = useDispatch()
    const { expenses } = useSelector(state => state.expenseModule)
    const { incomes } = useSelector(state => state.incomeModule)

    useEffect(() => {
        dispatch(loadExpenses())
        dispatch(loadIncomes())
    }, [dispatch])

    const handleFilterApply = (filters) => {
        dispatch(loadExpenses(filters))
        dispatch(loadIncomes(filters))
    }

    return (
        <main className='container'>
            <h1>Dashboard 🧮</h1>
            <FilterBar onApplyFilter={handleFilterApply} />
            <ChartComponent />
            <div>
                <h2>Expenses 🤔</h2>
                <TotalExpenses expenses={expenses} />
                <ExpenseList expenses={expenses} onDelete={(id) => dispatch(deleteExpense(id))}
                />
            </div>
            <div>
                <h2>Incomes 🤑</h2>
                <TotalIncomes incomes={incomes} />
                <IncomeList incomes={incomes} onDelete={(id) => dispatch(deleteIncome(id))} />
            </div>
        </main>
    )
}

export default Dashboard
