import React, { useState } from 'react';
import axios from 'axios';

function AuthForm() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Adjust the URL to your API endpoint as needed
      const response = await axios.post('/api/auth/login', credentials);
      console.log('Login/Register successful:', response.data);
      // Handle success (e.g., navigate to dashboard, store tokens)
    } catch (error) {
      console.error('Login/Register failed:', error.response ? error.response.data : error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={credentials.username}
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
  );
}

export default AuthForm;