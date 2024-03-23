import { expenseService } from "../../services/expense.service.js"
import { SET_EXPENSES } from "../reducers/expense.reducer.js"
// import store from '../store.js'

export function loadExpenses() {
    return async (dispatch) => {
        try {
            const expenses = await expenseService.query();
            dispatch({ type: SET_EXPENSES, expenses }); // Correct usage
        } catch (err) {
            console.log('expense action -> Cannot load expenses', err);
            throw err;
        }
    }
}