import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Dashboard from './components/Dashboard.jsx';
import ExpenseForm from './components/ExpenseForm.jsx'; // Make sure this import path is correct

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expense-form" element={<ExpenseForm />} /> {/* For adding a new expense */}
        <Route path="/expense-form/:expenseId" element={<ExpenseForm />} /> {/* For editing an existing expense */}
        {/* Add other routes here as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
