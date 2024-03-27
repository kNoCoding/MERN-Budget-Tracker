import { useNavigate } from "react-router-dom"

const ExpensePreview = ({ expense, onDelete }) => {
    const navigate = useNavigate()

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return (
        <li className='expense-preview'>
            <div>
                <div className='expense-title-and-category'>
                    <h3>{expense.name}: {expense.amount}₪</h3>
                    <p>{expense.category}</p>
                </div>
                <p>{expense.description}</p>
                <small>{formatDate(expense.date)}</small>
            </div>
            <div className='expense-action-buttons flex'>
                <button onClick={() => navigate(`/expense-form/${expense._id}`)}>Edit</button>
                <button onClick={() => onDelete(expense._id)}>Delete</button>
            </div>
        </li>
    )
}

export default ExpensePreview