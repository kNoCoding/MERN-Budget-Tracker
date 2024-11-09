const TotalBudgets = ({ budgets }) => {
    const totalAmount = budgets.reduce((sum, budget) => sum + budget.amount, 0)

    return (
        <p>Total Budgets: {totalAmount}₪</p>
    )
}

export default TotalBudgets