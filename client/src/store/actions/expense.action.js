import { expenseService } from "../../services/expense.service";
import { SET_EXPENSES, ADD_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE } from "../reducers/expense.reducer";

export function loadExpenses() {
    return async (dispatch) => {
        try {
            const expenses = await expenseService.query();
            dispatch({ type: SET_EXPENSES, expenses });
        } catch (err) {
            console.error('expense action -> Cannot load expenses', err);
            throw err;
        }
    }
}

export function addExpense(expense) {
    return async (dispatch) => {
        try {
            const savedExpense = await expenseService.save(expense);
            dispatch({ type: ADD_EXPENSE, expense: savedExpense });
        } catch (err) {
            console.error('expense action -> Cannot add expense', err);
            throw err;
        }
    }
}

export function updateExpense(expense) {
    return async (dispatch) => {
        try {
            const updatedExpense = await expenseService.save(expense);
            dispatch({ type: UPDATE_EXPENSE, expense: updatedExpense });
        } catch (err) {
            console.error('expense action -> Cannot update expense', err);
            throw err;
        }
    }
}

export function deleteExpense(expenseId) {
    return async (dispatch) => {
        try {
            await expenseService.remove(expenseId);
            dispatch({ type: DELETE_EXPENSE, expenseId });
        } catch (err) {
            console.error('expense action -> Cannot delete expense', err);
            throw err;
        }
    }
}
