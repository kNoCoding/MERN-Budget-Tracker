import { incomeService } from "../../services/income.service.js"
import { SET_INCOMES, ADD_INCOME, UPDATE_INCOME, DELETE_INCOME } from "../reducers/income.reducer.js"
import { showSuccessMsg, showErrorMsg } from "../../services/event-bus.service.js"

export function loadIncomes(filters = {}) {
    return async (dispatch) => {
        try {
            const incomes = await incomeService.query(filters)
            dispatch({ type: SET_INCOMES, incomes })
        } catch (err) {
            console.error('income action -> Cannot load incomes', err)
            showErrorMsg('Failed to load incomes.')
            throw err
        }
    }
}

export function addIncome(income) {
    return async (dispatch) => {
        try {
            const savedIncome = await incomeService.save(income)
            dispatch({ type: ADD_INCOME, income: savedIncome })
            showSuccessMsg('Income added successfully!')
        } catch (err) {
            console.error('income action -> Cannot add income', err)
            showErrorMsg('Failed to load income.')
            throw err
        }
    }
}

export function updateIncome(income) {
    return async (dispatch) => {
        try {
            const updatedIncome = await incomeService.save(income)
            dispatch({ type: UPDATE_INCOME, income: updatedIncome })
            showSuccessMsg('Income updated successfully!')
        } catch (err) {
            console.error('income action -> Cannot update income', err)
            showErrorMsg('Failed to update income.')
            throw err
        }
    }
}

export function deleteIncome(incomeId) {
    return async (dispatch) => {
        try {
            await incomeService.remove(incomeId)
            dispatch({ type: DELETE_INCOME, incomeId })
            showSuccessMsg('Income deleted successfully!')
        } catch (err) {
            console.error('income action -> Cannot delete income', err)
            showErrorMsg('Failed to delete income.')
            throw err
        }
    }
}
