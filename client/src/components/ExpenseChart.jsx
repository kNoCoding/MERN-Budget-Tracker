import { useSelector } from 'react-redux'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const ExpenseChart = () => {
    const { expenses } = useSelector((state) => state.expenseModule)

    const sortedExpenses = expenses.slice().sort((a, b) => new Date(a.date) - new Date(b.date))

    const chartData = {
        labels: sortedExpenses.map(expense => expense.date.split('T')[0]),
        datasets: [
            {
                label: 'Expenses',
                data: sortedExpenses.map(expense => expense.amount),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    }


    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        maintainAspectRatio: false,
    }

    return (
        <div style={{ height: '400px' }}>
            <Bar data={chartData} options={chartOptions} />
        </div>
    )
}
