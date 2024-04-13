import IncomePreview from './IncomePreview.jsx'

const IncomeList = ({ incomes, onDelete }) => {
    return (
        <ul className='income-list'>
            {incomes.map(income => (
                <IncomePreview
                    key={income._id}
                    income={income}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    )
}

export default IncomeList
