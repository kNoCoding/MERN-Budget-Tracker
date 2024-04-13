import { useNavigate } from "react-router-dom"

const IncomePreview = ({ income, onDelete }) => {
    const navigate = useNavigate()

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return (
        <li className='income-preview'>
            <div>
                <div className='income-title-and-category'>
                    <h3>{income.name}: {income.amount}₪</h3>
                    <p>{income.category}</p>
                </div>
                <p>{income.description}</p>
                <small>{formatDate(income.date)}</small>
            </div>
            <div className='income-action-buttons'>
                <button onClick={() => navigate(`/income-form/${income._id}`)}>Edit</button>
                <button onClick={() => onDelete(income._id)}>Delete</button>
            </div>
        </li>
    )
}

export default IncomePreview
