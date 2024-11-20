import { httpService } from "./http.service.js"

const BASE_URL = 'assets/'

export const assetService = {
    query,
    getById,
    save,
    remove,
}

function query(filterBy = {}) {
    const queryStr = _buildQueryString(filterBy)
    return httpService.get(`${BASE_URL}?${queryStr}`)
}

function getById(assetId) {
    return httpService.get(BASE_URL + assetId)
}

function save(asset) {
    if (asset._id) {
        return httpService.put(`${BASE_URL}${asset._id}`, asset)
    } else {
        return httpService.post(BASE_URL, asset)
    }
}

function remove(assetId) {
    return httpService.delete(BASE_URL + assetId)
}

function _buildQueryString(params) {
    return Object.keys(params)
        .filter(key => params[key] !== '' && params[key] != null)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&')
}