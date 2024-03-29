import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { httpService } from '../services/http.service'


function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
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
    const authEndpoint = isLogin ? '/auth/login' : '/auth/register'
    try {
      const response = await httpService.post(authEndpoint, credentials)
      console.log('Auth successful:', response)
      const { token } = response
      localStorage.setItem('token', token)
      console.log('FUCK YEAHHHHHH~!!!!')
      navigate('/dashboard')
    } catch (error) {
      console.error('Auth failed:', error.response ? error.response.data : error)
      // Handle error (e.g., display error message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email/Username"
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

        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'New user? Register' : 'Already registered? Login'}
        </p>
        <br />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
    </>
  )
}

export default AuthForm