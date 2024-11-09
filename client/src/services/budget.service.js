import { httpService } from './http.service.js'

const BASE_URL = 'budgets/'

export const budgetService = {
    query,
    getById,
    save,
    remove,
}

function query(filterBy = {}) {
    const queryStr = _buildQueryString(filterBy)
    return httpService.get(`${BASE_URL}?${queryStr}`)
}

function getById(budgetId) {
    return httpService.get(BASE_URL + budgetId)
}

function save(budget) {
    if (budget._id) {
        return httpService.put(`${BASE_URL}${budget._id}`, budget)
    } else {
        return httpService.post(BASE_URL, budget)
    }
}

function remove(budgetId) {
    return httpService.delete(BASE_URL + budgetId)
}


function _buildQueryString(params) {
    return Object.keys(params)
        .filter(key => params[key] !== '' && params[key] != null)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&')
}