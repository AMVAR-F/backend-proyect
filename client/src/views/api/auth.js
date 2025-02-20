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
  
    // if (!response.ok) {
    //   throw new Error('Error en el inicio de sesión');
    // }
  
    return response.json();
  };

 

 export const lockAccountRequest = async (userId) => {
     const token = localStorage.getItem('jwtToken'); // Obtén el token del localStorage

     try {
      const response = await fetch('http://localhost:4001/api/auth/locked', {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}` // Incluye el token en la cabecera de autorización
             },
         });

         if (!response.ok) {
             const errorData = await response.json();
             const errorMessage = errorData.message || response.statusText;
             throw new Error(errorMessage);
         }
        return response.json();
     } catch (error) {
         console.error("Error en lockAccountRequest:", error);
         throw error;
     }
 };

export const logoutRequest = async () => {
    const token = localStorage.getItem('jwtToken'); // Obtén el token del localStorage

    try {
      const response = await fetch('http://localhost:4001/api/auth/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || response.statusText;
            throw new Error(errorMessage);
        }

        return response.json();
    } catch (error) {
        console.error("Error en logoutRequest:", error);
        throw error;
    }
};
 