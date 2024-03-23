import { httpService } from './http.service.js'

const BASE_URL = 'expenses/'

export const expenseService = {
    query,
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}