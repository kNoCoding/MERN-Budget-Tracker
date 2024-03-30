import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { httpService } from '../services/http.service'
import { showErrorMsg } from '../services/event-bus.service.js'


function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [authError, setAuthError] = useState('')
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value,
    }))
    setAuthError('')
  }

  const handleSubmit = async () => {
    const action = isLogin ? 'logged in' : 'registered'
    const authEndpoint = isLogin ? '/auth/login' : '/auth/register'
    try {
      const response = await httpService.post(authEndpoint, credentials)
      const { token } = response
      localStorage.setItem('token', token)
      navigate('/dashboard')
    } catch (error) {
      const errMsg = error.response?.data?.message || `Failed to ${action}, please try again.`
      setAuthError(errMsg)
      showErrorMsg(errMsg)
    }
  }

  return (
    <form onSubmit={(event) => event.preventDefault()} className='auth-form'>
      <input
        type="text"
        name="email"
        placeholder="Email/Username"
        value={credentials.email}
        onChange={handleChange}
        className={authError ? 'error' : ''}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        className={authError ? 'error' : ''}
      />
      <div>
        <a href="#" onClick={(e) => {
          e.preventDefault();
          setIsLogin(!isLogin);
        }}>
          {isLogin ? 'New user? Register' : 'Already registered? Login'}
        </a>
        {authError && <p className="auth-error">{authError}</p>}
      </div>
      <button onClick={handleSubmit}>{isLogin ? 'Login' : 'Register'}</button>
    </form>
  )
}

export default AuthForm