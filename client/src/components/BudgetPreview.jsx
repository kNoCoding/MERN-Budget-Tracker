import { useNavigate } from "react-router-dom"

const BudgetPreview = ({ budget, onDelete }) => {
    const navigate = useNavigate()

    return (
        <li className='budget-preview'>
            <div>
                <div className='budget-title-and-category'>
                    <h3>{budget.category}{budget.name}: {budget.amount}₪</h3>
                </div>
            </div>
            <div className='budget-action-buttons'>
                <button onClick={() => navigate(`/budget-form/${budget._id}`)}>Edit</button>
                <button onClick={() => onDelete(budget._id)}>Delete</button>
            </div>
        </li>
    )
}

export default BudgetPreview
