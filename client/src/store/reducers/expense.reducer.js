export const SET_EXPENSES = 'SET_EXPENSES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

const initialState = {
  expenses: [],
};

function expenseReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EXPENSES:
      return { ...state, expenses: action.expenses };
    case ADD_EXPENSE:
      return { ...state, expenses: [...state.expenses, action.expense] };
    case UPDATE_EXPENSE:
      return { ...state, expenses: state.expenses.map(expense => expense._id === action.expense._id ? action.expense : expense) };
    case DELETE_EXPENSE:
      return { ...state, expenses: state.expenses.filter(expense => expense._id !== action.expenseId) };
    default:
      return state;
  }
}

export default expenseReducer;
