import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'

const BASE_URL = import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_API_URL
    : '//localhost:3000/api'

export const useHttpService = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    // This is creating a special version of Axios just for our app
    const axiosInstance = Axios.create({
      withCredentials: true,
      baseURL: BASE_URL
    })

    // We're telling Axios what to do if it gets a 401 error
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Take away the login token if we get a 401 error
          localStorage.removeItem('token')
          // But instead of going home, just stay and tell us about the error
          navigate('/')
        }
        // Make sure to pass on the error in case we need to do more with it
        return Promise.reject(error)
      }
    )

    // This is cleanup - it's like saying, "Forget those instructions if we're done with them."
    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor)
    }
  }, [navigate]) // Only re-run this if 'navigate' changes, which it really shouldn't
  
  // We're sending back our special Axios so we can use it in our app
  return axiosInstance
}