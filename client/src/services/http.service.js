import Axios from 'axios'

const BASE_URL = import.meta.env.PROD ? import.meta.env.VITE_API_URL : '//localhost:3000/api'

const axiosInstance = Axios.create({
    withCredentials: true,
    baseURL: BASE_URL
})

axiosInstance.interceptors.request.use(function (config) {
    // Retrieving the token from localStorage
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}

async function ajax(endpoint, method = 'GET', data = null) {
    try {
        const res = await axiosInstance({
            url: `${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null,
        })
        return res.data
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data)
        console.dir(err)
        throw err
    }
}
