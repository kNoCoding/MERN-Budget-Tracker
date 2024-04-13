const TotalIncomes = ({ incomes }) => {
    const totalAmount = incomes.reduce((sum, income) => sum + income.amount, 0)

    return (
        <p>Total Incomes: {totalAmount}₪ earned</p>
    )
}

export default TotalIncomes