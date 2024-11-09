import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ExpenseList from '../components/ExpenseList.jsx'
import IncomeList from '../components/IncomeList.jsx'
import BudgetList from '../components/BudgetList.jsx'
import { loadExpenses, deleteExpense } from '../store/actions/expense.action.js'
import { loadIncomes, deleteIncome } from '../store/actions/income.action.js'
import { loadBudgets, deleteBudget } from '../store/actions/budget.action.js'
import TotalExpenses from '../components/TotalExpenses.jsx'
import TotalIncomes from '../components/TotalIncomes.jsx'
import TotalBudgets from '../components/TotalBudgets.jsx'
import FilterBar from '../components/FilterBar.jsx'
import { ChartComponent } from '../components/ChartComponent.jsx'

function Dashboard() {
    const dispatch = useDispatch()
    const { expenses } = useSelector(state => state.expenseModule)
    const { incomes } = useSelector(state => state.incomeModule)
    const { budgets } = useSelector(state => state.budgetModule)

    useEffect(() => {
        dispatch(loadExpenses())
        dispatch(loadIncomes())
        dispatch(loadBudgets())
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
            <div>
                <h2>Budgets 📑</h2>
                <TotalBudgets budgets={budgets} />
                <BudgetList budgets={budgets} onDelete={(id) => dispatch(deleteBudget(id))} />
            </div>
        </main>
    )
}

export default Dashboard
