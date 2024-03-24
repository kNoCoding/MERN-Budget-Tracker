import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadExpenses, deleteExpense } from '../store/actions/expense.action.js';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { expenses } = useSelector(state => state.expenseModule);

    useEffect(() => {
        dispatch(loadExpenses());
    }, [dispatch]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div>
            <h1>This is the dashboard 🧮🪙</h1>
            <button onClick={() => navigate('/expense-form')}>Add Expense</button>
            <ul>
                {expenses.map(expense => (
                    <li key={expense._id} className='expense-preview'>
                        <div>
                            <h3>{expense.name}: {expense.amount}</h3>
                            <p>{expense.description}</p>
                            <small>{formatDate(expense.date)}</small>
                        </div>
                        <div>
                            <button onClick={() => navigate(`/expense-form/${expense._id}`)}>Edit</button>
                            <button onClick={() => dispatch(deleteExpense(expense._id))}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
