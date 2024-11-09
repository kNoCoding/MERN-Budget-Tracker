export const SET_BUDGETS = 'SET_BUDGETS'
export const ADD_BUDGET = 'ADD_BUDGET'
export const UPDATE_BUDGET = 'UPDATE_BUDGET'
export const DELETE_BUDGET = 'DELETE_BUDGET'

const initialState = {
    budgets: [],
}

function budgetReducer(state = initialState, action) {
    switch (action.type) {
        case SET_BUDGETS:
            return { ...state, budgets: action.budgets }
        case ADD_BUDGET:
            return { ...state, budgets: [...state.budgets, action.budget] }
        case UPDATE_BUDGET:
            return { ...state, budgets: state.budgets.map(budget => budget._id === action.budget._id ? action.budget : budget) }
        case DELETE_BUDGET:
            return { ...state, budgets: state.budgets.filter(budget => budget._id !== action.budgetId) }
        default:
            return state
    }
}

export default budgetReducer
