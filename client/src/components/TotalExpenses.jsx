

function TotalExpenses({ expenses }) {
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0)

    return (
        <p>Total Expenses: {totalAmount}₪ spent</p>
    )
}

export default TotalExpenses
