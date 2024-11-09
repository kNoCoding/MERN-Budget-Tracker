import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ExpenseForm from './components/ExpenseForm.jsx'
import IncomeForm from './components/IncomeForm.jsx'
import BudgetForm from './components/BudgetForm.jsx'
import { UserMsg } from '../src/components/UserMsg.jsx'
import FooterNav from './components/FooterNav.jsx'
import HeaderNav from './components/HeaderNav.jsx'

const FooterNavigation = () => {
  const location = useLocation()
  return (
    <>
      {location.pathname !== '/' && <UserMsg />}
      {location.pathname !== '/' && <FooterNav />}
    </>
  )
}

const HeaderNavigation = () => {
  const location = useLocation()
  return (
    <>
      {location.pathname !== '/' && <HeaderNav />}
    </>
  )
}

const App = () => {
  return (
    <div className="main-layout">
      <BrowserRouter>
        <HeaderNavigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expense-form" element={<ExpenseForm />} />
          <Route path="/income-form" element={<IncomeForm />} />
          <Route path="/budget-form" element={<BudgetForm />} />
          <Route path="/expense-form/:expenseId" element={<ExpenseForm />} />
          <Route path="/income-form/:incomeId" element={<IncomeForm />} />
          <Route path="/budget-form/:budgetId" element={<BudgetForm />} />
        </Routes>
        <FooterNavigation />
      </BrowserRouter>
    </div>
  )
}

export default App
