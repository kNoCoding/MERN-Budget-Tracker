import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    TimeScale, // Import the TimeScale
    TimeSeriesScale // If you are using Chart.js v3.7.0 or later, you don't need TimeSeriesScale.
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // This needs to be installed

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    TimeScale, // Register the TimeScale
    TimeSeriesScale // Register TimeSeriesScale if necessary
);

export const ChartComponent = () => {
    const expenses = useSelector((state) => state.expenseModule.expenses);
    const incomes = useSelector((state) => state.incomeModule.incomes);
    const [chartType, setChartType] = useState('expenses');

    const sortedData = useMemo(() => {
        const dataToSort = chartType === 'expenses' ? expenses : incomes;
        return [...dataToSort].sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [chartType, expenses, incomes]);

    const chartData = {
        labels: sortedData.map(data => data.date), // You may need to format these dates depending on your dataset
        datasets: [
            {
                label: chartType === 'expenses' ? 'Expenses' : 'Incomes',
                data: sortedData.map(data => ({
                    x: data.date, // Ensure these are date strings or Date objects
                    y: data.amount
                })),
                backgroundColor: chartType === 'expenses' ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 0.2)',
                borderColor: chartType === 'expenses' ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    // You can also add time formatting here if necessary
                },
                title: {
                    display: true,
                    text: 'Date'
                }
            },
        },
        maintainAspectRatio: false,
        responsive: true,
    };

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <div>
                <label>
                    <input
                        type="radio"
                        name="chartType"
                        value="expenses"
                        checked={chartType === 'expenses'}
                        onChange={(e) => setChartType(e.target.value)}
                    />
                    Show Expenses
                </label>
                <label>
                    <input
                        type="radio"
                        name="chartType"
                        value="incomes"
                        checked={chartType === 'incomes'}
                        onChange={(e) => setChartType(e.target.value)}
                    />
                    Show Incomes
                </label>
            </div>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};
