import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { httpService } from '../services/http.service'


function AuthForm() {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await httpService.post('/auth/login', credentials)
      console.log('Login/Register successful:', response)
      const { token } = response
      localStorage.setItem('token', token)
      console.log('FUCK YEAHHHHHH~!!!!')
      navigate('/dashboard')
    } catch (error) {
      console.error('Login/Register failed:', error.response ? error.response.data : error)
      // Handle error (e.g., display error message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        placeholder="Username"
        value={credentials.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
      />
      <button type="submit">Login/Register</button>
    </form>
  )
}

export default AuthForm