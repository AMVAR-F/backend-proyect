// src/components/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();  // Hook para redirigir

  const handleLogout = () => {
    onLogout();  // Ejecuta el logout
    navigate('/home/');  // Redirige al home después de logout
  };

  return (
    <div className="logout-body">
      <p>You are logged in!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
