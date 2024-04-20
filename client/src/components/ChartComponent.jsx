import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TimeScale } from 'chart.js'
import 'chartjs-adapter-date-fns'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TimeScale)

export const ChartComponent = () => {
    const expenses = useSelector((state) => state.expenseModule.expenses)
    const incomes = useSelector((state) => state.incomeModule.incomes)
    const [chartType, setChartType] = useState('expenses')

    const sortedData = useMemo(() => {
        const dataToSort = chartType === 'expenses' ? expenses : incomes
        return [...dataToSort].sort((a, b) => new Date(a.date) - new Date(b.date))
    }, [chartType, expenses, incomes])

    const chartData = {
        labels: sortedData.map(data => data.date),
        datasets: [
            {
                label: chartType === 'expenses' ? 'Expenses' : 'Incomes',
                data: sortedData.map(data => ({
                    x: data.date,
                    y: data.amount
                })),
                backgroundColor: chartType === 'expenses' ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 0.2)',
                borderColor: chartType === 'expenses' ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    }

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                },
                title: {
                    display: false,
                    text: 'Date'
                }
            },
        },
        maintainAspectRatio: false,
        responsive: true,
    }

    return (
        <div className="chart-container">
            <div className="chart-header">
                <label>
                    <input
                        type="radio"
                        name="chartType"
                        value="expenses"
                        checked={chartType === 'expenses'}
                        onChange={(e) => setChartType(e.target.value)}
                    />
                    <span className="radio-label">Show Expenses</span>
                </label>
                <label>
                    <input
                        type="radio"
                        name="chartType"
                        value="incomes"
                        checked={chartType === 'incomes'}
                        onChange={(e) => setChartType(e.target.value)}
                    />
                    <span className="radio-label">Show Incomes</span>
                </label>
            </div>
            <div className="bar-chart">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    )
}
