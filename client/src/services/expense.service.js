import { httpService } from './http.service.js'

const BASE_URL = 'expenses/'

export const expenseService = {
    query,
    getById,
    save,
    remove,
}

function query(filterBy = {}) {
    const queryStr = _buildQueryString(filterBy)
    return httpService.get(`${BASE_URL}?${queryStr}`)
}

function getById(expenseId) {
    return httpService.get(BASE_URL + expenseId)
}

function save(expense) {
    if (expense._id) {
        return httpService.put(`${BASE_URL}${expense._id}`, expense)
    } else {
        return httpService.post(BASE_URL, expense)
    }
}

function remove(expenseId) {
    return httpService.delete(BASE_URL + expenseId)
}


function _buildQueryString(params) {
    return Object.keys(params)
        .filter(key => params[key] !== '' && params[key] != null)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&')
}