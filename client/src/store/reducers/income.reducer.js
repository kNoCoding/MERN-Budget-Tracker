export const SET_INCOMES = 'SET_INCOMES'
export const ADD_INCOME = 'ADD_INCOME'
export const UPDATE_INCOME = 'UPDATE_INCOME'
export const DELETE_INCOME = 'DELETE_INCOME'

const initialState = {
  incomes: [],
}

function incomeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_INCOMES:
      return { ...state, incomes: action.incomes }
    case ADD_INCOME:
      return { ...state, incomes: [...state.incomes, action.income] }
    case UPDATE_INCOME:
      return { ...state, incomes: state.incomes.map(income => income._id === action.income._id ? action.income : income) }
    case DELETE_INCOME:
      return { ...state, incomes: state.incomes.filter(income => income._id !== action.incomeId) }
    default:
      return state
  }
}

export default incomeReducer