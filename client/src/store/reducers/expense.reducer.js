export const SET_EXPENSES = 'SET_EXPENSES'

const initialState = {
  expenses: [],
}

function expenseReducer(state = initialState, action = {}) {
  let expenses
  let lastExpenses
  switch (action.type) {
    //Expenses
    case SET_EXPENSES:
      lastExpenses = [...action.expenses]
      return { ...state, expenses: action.expenses, lastExpenses }

    default:
      return state
  }
}

export default expenseReducer
