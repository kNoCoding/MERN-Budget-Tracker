import { expenseService } from "../../services/expense.service"
import { SET_EXPENSES, ADD_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE } from "../reducers/expense.reducer"
import { showSuccessMsg, showErrorMsg } from "../../services/event-bus.service.js"

export function loadExpenses() {
    return async (dispatch) => {
        try {
            const expenses = await expenseService.query()
            dispatch({ type: SET_EXPENSES, expenses })
            // showSuccessMsg('Expenses loaded successfully!')
        } catch (err) {
            console.error('expense action -> Cannot load expenses', err)
            showErrorMsg('Failed to load expenses.')
            throw err
        }
    }
}

export function addExpense(expense) {
    return async (dispatch) => {
        try {
            const savedExpense = await expenseService.save(expense)
            dispatch({ type: ADD_EXPENSE, expense: savedExpense })
            showSuccessMsg('Expenses added successfully!')
        } catch (err) {
            console.error('expense action -> Cannot add expense', err)
            showErrorMsg('Failed to load expense.')
            throw err
        }
    }
}

export function updateExpense(expense) {
    return async (dispatch) => {
        try {
            const updatedExpense = await expenseService.save(expense)
            dispatch({ type: UPDATE_EXPENSE, expense: updatedExpense })
            showSuccessMsg('Expenses updated successfully!')
        } catch (err) {
            console.error('expense action -> Cannot update expense', err)
            showErrorMsg('Failed to update expense.')
            throw err
        }
    }
}

export function deleteExpense(expenseId) {
    return async (dispatch) => {
        try {
            await expenseService.remove(expenseId)
            dispatch({ type: DELETE_EXPENSE, expenseId })
            showSuccessMsg('Expenses deleted successfully!')
        } catch (err) {
            console.error('expense action -> Cannot delete expense', err)
            showErrorMsg('Failed to delete expense.')
            throw err
        }
    }
}
