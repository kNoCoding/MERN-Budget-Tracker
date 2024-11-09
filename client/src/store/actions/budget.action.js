import { budgetService } from "../../services/budget.service.js"
import { SET_BUDGETS, ADD_BUDGET, UPDATE_BUDGET, DELETE_BUDGET } from "../reducers/budget.reducer.js"
import { showSuccessMsg, showErrorMsg } from "../../services/event-bus.service.js"

export function loadBudgets(filters = {}) {
    return async (dispatch) => {
        try {
            const budgets = await budgetService.query(filters)
            dispatch({ type: SET_BUDGETS, budgets })
        } catch (err) {
            console.error('budget action -> Cannot load budgets', err)
            showErrorMsg('Failed to load budgets.')
            throw err
        }
    }
}

export function addBudget(budget) {
    return async (dispatch) => {
        try {
            const savedBudget = await budgetService.save(budget)
            dispatch({ type: ADD_BUDGET, budget: savedBudget })
            showSuccessMsg('Budgets added successfully!')
        } catch (err) {
            console.error('budget action -> Cannot add budget', err)
            showErrorMsg('Failed to load budget.')
            throw err
        }
    }
}

export function updateBudget(budget) {
    return async (dispatch) => {
        try {
            const updatedBudget = await budgetService.save(budget)
            dispatch({ type: UPDATE_BUDGET, budget: updatedBudget })
            showSuccessMsg('Budgets updated successfully!')
        } catch (err) {
            console.error('budget action -> Cannot update budget', err)
            showErrorMsg('Failed to update budget.')
            throw err
        }
    }
}

export function deleteBudget(budgetId) {
    return async (dispatch) => {
        try {
            await budgetService.remove(budgetId)
            dispatch({ type: DELETE_BUDGET, budgetId })
            showSuccessMsg('Budgets deleted successfully!')
        } catch (err) {
            console.error('budget action -> Cannot delete budget', err)
            showErrorMsg('Failed to delete budget.')
            throw err
        }
    }
}
