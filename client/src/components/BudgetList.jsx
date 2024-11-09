import BudgetPreview from './BudgetPreview.jsx'

const BudgetList = ({ budgets, onDelete }) => {
    return (
        <ul className='budget-list'>
            {budgets.map(budget => (
                <BudgetPreview
                    key={budget._id}
                    budget={budget}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    )
}

export default BudgetList
