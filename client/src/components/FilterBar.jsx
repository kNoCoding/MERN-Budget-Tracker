import { useState } from "react"

const FilterBar = ({ onApplyFilter }) => {
    const [showForm, setShowForm] = useState(false)
    const [category, setCategory] = useState('')
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [minAmount, setMinAmount] = useState('')
    const [maxAmount, setMaxAmount] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onApplyFilter({ category, dateFrom, dateTo, minAmount, maxAmount })
        setShowForm(false)
    }

    return (
        <div className="filter-form">
            <button onClick={() => setShowForm(!showForm)}>Filters</button>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="category">Category</label>
                    <input
                        id="category"
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />

                    <label htmlFor="dateFrom">From Date</label>
                    <input
                        id="dateFrom"
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                    />

                    <label htmlFor="dateTo">To Date</label>
                    <input
                        id="dateTo"
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                    />

                    <label htmlFor="minAmount">Min Amount</label>
                    <input
                        id="minAmount"
                        type="number"
                        value={minAmount}
                        onChange={(e) => setMinAmount(e.target.value)}
                    />

                    <label htmlFor="maxAmount">Max Amount</label>
                    <input
                        id="maxAmount"
                        type="number"
                        value={maxAmount}
                        onChange={(e) => setMaxAmount(e.target.value)}
                    />
                    <button type="submit">Apply Filters</button>
                </form>
            )}
        </div>
    )
}

export default FilterBar
