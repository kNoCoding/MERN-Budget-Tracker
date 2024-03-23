import { combineReducers, configureStore } from '@reduxjs/toolkit'
import expenseReducer from './reducers/expense.reducer.js'

// Create the root reducer
const rootReducer = combineReducers({
    expenseModule: expenseReducer,
})

// Configure the store
const store = configureStore({
    reducer: rootReducer,
})

export default store