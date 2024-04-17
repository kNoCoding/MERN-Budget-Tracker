import { useSelector } from 'react-redux'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const ExpenseChart = () => {
    const { expenses } = useSelector((state) => state.expenseModule)

    const chartData = {
        labels: expenses.map(expense => expense.category),
        datasets: [
            {
                label: 'Expenses',
                data: expenses.map(expense => expense.amount),
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

    // return <Bar data={chartData} options={chartOptions} />
    return (
        <div style={{ height: '400px', maxWidth: '600px', margin: '0 auto' }}>
            <Bar data={chartData} options={chartOptions} />
        </div>
    )
}
