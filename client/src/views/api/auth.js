export const registerRequest = async (user) => {
    const response = await fetch('http://localhost:4001/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  
    if (!response.ok) {
      throw new Error('Error en el registro');
    }
  
    return response.json();
  };
  export const loginRequest = async (credentials) => {
    const response = await fetch('http://localhost:4001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      throw new Error('Error en el inicio de sesión');
    }
  
    return response.json();
  };