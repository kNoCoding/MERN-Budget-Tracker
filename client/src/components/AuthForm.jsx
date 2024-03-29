import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { httpService } from '../services/http.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'


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
    const action = isLogin ? 'logged in' : 'registered'
    const authEndpoint = isLogin ? '/auth/login' : '/auth/register'
    try {
      const response = await httpService.post(authEndpoint, credentials)
      console.log('Auth successful:', response)
      const { token } = response
      localStorage.setItem('token', token)

      console.log('FUCK YEAHHHHHH~!!!!')
      showSuccessMsg(`You've successfully ${action}!~`)

      navigate('/dashboard')
    } catch (error) {
      console.error('Auth failed:', error.response ? error.response.data : error)
      const errMsg = error.response?.data?.message || `Failed to ${action}, please try again.`
      showErrorMsg(errMsg)
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