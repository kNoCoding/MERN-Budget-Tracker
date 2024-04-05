import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


function TotalExpenses() {

    const { expenses } = useSelector(state => state.expenseModule)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0)
        setTotal(totalAmount)
    }, [expenses])

    return (
        <>
            <p>Total Expenses: {total}₪ spent</p>
        </>
    )
}

export default TotalExpenses
