import React, { useState } from 'react';
import '../../css/login.css';
import { FaRegUser, FaUserLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate para redireccionar
import { CAvatar } from '@coreui/react';
import Logo from '../../assets/images/logo_1.png';
import { loginRequest } from '../api/auth'; // Importa la función de inicio de sesión

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate(); // Hook para redireccionar

  const errorStyle = { color: 'red', fontWeight: 'bold' };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const credentials = { username, password };
      console.log('Credenciales enviadas:', credentials);
  
      const response = await loginRequest(credentials);
      console.log('Respuesta del servidor:', response);
  
      setIsAuthenticated(true);
      onLogin();
      navigate('/dashboard');
    } catch (error) {
      setIsAuthenticated(false);
      setError(<span style={errorStyle}>{error.message || 'Invalid credentials'}</span>);
      console.error('Error en el inicio de sesión:', error);
    }
  };

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
          <div className="mber-forgot">
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
  );
};

export default LoginForm;