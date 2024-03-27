import ExpensePreview from './ExpensePreview.jsx'

const ExpenseList = ({ expenses, onDelete }) => {
    return (
        <ul className='expense-list clean-list'>
            {expenses.map(expense => (
                <ExpensePreview
                    key={expense._id}
                    expense={expense}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    )
}

export default ExpenseList