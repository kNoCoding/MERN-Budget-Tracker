import { useState } from "react"

const FilterBar = ({ onApplyFilter }) => {
    const [showForm, setShowForm] = useState(false)
    const [filters, setFilters] = useState({
        category: '',
        dateFrom: '',
        dateTo: '',
        minAmount: '',
        maxAmount: '',
    });

    const { category, dateFrom, dateTo, minAmount, maxAmount } = filters;

    const isFilterApplied = category || dateFrom || dateTo || minAmount || maxAmount;

    const handleSubmit = (e) => {
        e.preventDefault()
        onApplyFilter(filters)
        setShowForm(false)
    }

    const handleResetFilters = () => {
        const resetFilters = {
            category: '',
            dateFrom: '',
            dateTo: '',
            minAmount: '',
            maxAmount: '',
        }
        setFilters(resetFilters)
        onApplyFilter(resetFilters)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }))
    }

    return (
        <div className="filter-form">
            <div className="filter-buttons">
                <button onClick={() => setShowForm(!showForm)}>Filters</button>
                {isFilterApplied && <button onClick={handleResetFilters}>Reset</button>}
            </div>
            {showForm && (
                <form onSubmit={handleSubmit} className="grid-form">
                    <div className="input-group category">
                        <label htmlFor="category">Category</label>
                        <input
                            name="category"
                            id="category"
                            type="text"
                            value={category}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="dateFrom">From Date</label>
                        <input
                            name="dateFrom"
                            id="dateFrom"
                            type="date"
                            value={dateFrom}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="dateTo">To Date</label>
                        <input
                            name="dateTo"
                            id="dateTo"
                            type="date"
                            value={dateTo}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="minAmount">Min Amount</label>
                        <input
                            name="minAmount"
                            id="minAmount"
                            type="number"
                            value={minAmount}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="maxAmount">Max Amount</label>
                        <input
                            name="maxAmount"
                            id="maxAmount"
                            type="number"
                            value={maxAmount}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="apply-filters">Apply Filters</button>
                </form>
            )}
        </div>
    )
}

export default FilterBar
