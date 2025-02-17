import React, { useState } from 'react'
import '../../css/login.css'
import { FaRegUser, FaUserLock } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { CAvatar } from '@coreui/react'
import Logo from '../../assets/images/logo_1.png'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
 const errorStyle = { color: 'red', fontWeight: 'bold'}
  
  
  const handleSubmit = (e) => {
    e.preventDefault()

    // Lógica de autenticación local basada en las credenciales
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      onLogin();
    } else if (username === 'angelo' && password === 'angelo123') {
      setIsAuthenticated(true);
      onLogin();
      if (username !== 'admin') {
        window.location.href = 'https://example.com/not-authorized';
      }
    } else {
      setIsAuthenticated(false);
      setError(<span style={errorStyle}>Invalid credentials</span>);
      
      
     
    }
  }
 
  return (
    <div className="login-body">
      <div className="login-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="img-container">
            <CAvatar src={Logo} className="logo-img" />
          </div>
          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaRegUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaUserLock className="icon" />
          </div>
          {error && <p className="error-message">{error}</p>} {/* Mostrar error si existe */}
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <br />
          <button type="submit">Login</button>
          <div className="register-link">
            <p>
              Don't have an account? <a href="#">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
