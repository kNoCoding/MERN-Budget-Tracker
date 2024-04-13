import { combineReducers, configureStore } from '@reduxjs/toolkit'
import expenseReducer from './reducers/expense.reducer.js'
import incomeReducer from './reducers/income.reducer.js'

const rootReducer = combineReducers({
    expenseModule: expenseReducer,
    incomeModule: incomeReducer,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store