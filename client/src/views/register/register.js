import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { registerRequest } from '../api/auth'; // Importa la función de registro

function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    id_card: "",
    password: "",
    email: "",
    username: "",
    photo: "",
  });

  const navigate = useNavigate(); // Inicializa useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envía los datos al backend usando la función registerRequest
      const response = await registerRequest(formData);
      console.log("Registro exitoso:", response);
  
      // Almacena el token en localStorage o en el estado global
      localStorage.setItem('token', response.token);
  
      // Redirige al usuario al dashboard
      navigate('/dashboard'); // Usa navigate para redirigir
  
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Error en el registro. Por favor, intenta de nuevo.");
    }
  };
  return (
    <div>
      <h1>Register page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">First Name:</label><br />
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
        /><br /><br />

        <label htmlFor="lastname">Last Name:</label><br />
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
        /><br /><br />

        <label htmlFor="id_card">ID Card:</label><br />
        <input
          type="text"
          id="id_card"
          name="id_card"
          value={formData.id_card}
          onChange={handleChange}
          required
        /><br /><br />

        <label htmlFor="password">Password:</label><br />
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        /><br /><br />

        <label htmlFor="email">Email:</label><br />
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        /><br /><br />

        <label htmlFor="username">Username:</label><br />
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        /><br /><br />

        <label htmlFor="photo">Photo URL:</label><br />
        <input
          type="text"
          id="photo"
          name="photo"
          value={formData.photo}
          onChange={handleChange}
        /><br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Register;