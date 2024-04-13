import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addIncome, updateIncome } from '../store/actions/income.action.js'
import { useSelector } from 'react-redux'

function IncomeForm() {
    const { incomeId } = useParams() // For edit mode
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { incomes } = useSelector(state => state.incomeModule)
    const [income, setIncome] = useState({
        name: '',
        amount: '',
        category: '',
        date: '',
        description: '',
    })

    useEffect(() => {
        if (incomeId) {
            const existingIncome = incomes.find(i => i._id === incomeId)
            if (existingIncome) setIncome({ ...existingIncome, date: existingIncome.date.split('T')[0] })
        }
    }, [incomeId, incomes])

    const handleChange = (e) => {
        const { name, value } = e.target
        setIncome(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const actionFn = incomeId ? updateIncome : addIncome;
        try {
            dispatch(actionFn({ ...income, _id: incomeId }))
            navigate('/dashboard')
        } catch (error) {
            console.error('Failed to process income.', error)
        }
    }

    return (
        <main className='income-form container'>
            <h1>{incomeId ? 'Update Income' : 'Add Income'}</h1>

            <form onSubmit={handleSubmit}>
                <label>Name:
                    <input name="name" value={income.name} onChange={handleChange} placeholder="Income name" required />
                </label>
                <label>Amount:
                    <input type="number" name="amount" value={income.amount} onChange={handleChange} placeholder="Amount" required />
                </label>
                <label>Category:
                    <input name="category" value={income.category} onChange={handleChange} placeholder="Category" />
                </label>
                <label>Date:
                    <input type="date" name="date" value={income.date} onChange={handleChange} required />
                </label>
                <label>Description:
                    <textarea name="description" value={income.description} onChange={handleChange} placeholder="Description"></textarea>
                </label>
                <button type="submit">{incomeId ? 'Update Income' : 'Add Income'}</button>
            </form>
        </main>
    )
}

export default IncomeForm
