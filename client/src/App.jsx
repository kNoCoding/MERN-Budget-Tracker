import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ExpenseForm from './components/ExpenseForm.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expense-form" element={<ExpenseForm />} /> 
        <Route path="/expense-form/:expenseId" element={<ExpenseForm />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
