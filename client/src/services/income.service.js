import { httpService } from './http.service.js'

const BASE_URL = 'incomes/'

export const incomeService = {
    query,
    getById,
    save,
    remove,
}

function query(filterBy = {}) {
    const queryStr = _buildQueryString(filterBy)
    return httpService.get(`${BASE_URL}?${queryStr}`)
}

function getById(incomeId) {
    return httpService.get(BASE_URL + incomeId)
}

function save(income) {
    if (income._id) {
        return httpService.put(`${BASE_URL}${income._id}`, income)
    } else {
        return httpService.post(BASE_URL, income)
    }
}

function remove(incomeId) {
    return httpService.delete(BASE_URL + incomeId)
}

function _buildQueryString(params) {
    return Object.keys(params)
        .filter(key => params[key] !== '' && params[key] != null)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&')
}