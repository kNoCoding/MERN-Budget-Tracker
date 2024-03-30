import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ExpenseForm from './components/ExpenseForm.jsx'
import { UserMsg } from '../src/components/UserMsg.jsx'
import FooterNav from './components/FooterNav.jsx'

const Navigation = () => {
  const location = useLocation()

  return (
    <>
      {location.pathname !== '/' && <UserMsg />}
      {location.pathname !== '/' && <FooterNav />}
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
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
