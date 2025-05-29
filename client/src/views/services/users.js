const API_URL = 'http://localhost:4001/api/users/users/'

export const fetchUsers = async (showInactive = false) => {
  try {
    const url = showInactive ? `${API_URL}?inactive=true` : API_URL

    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    console.log('Raw data from backend:', data)

    const formattedData = {
      technical_directors: data.technical_directors || [],
      referees: data.referees || [],
      players: data.players || [],
      treasurers: data.treasurers || [],
    }

    console.log('Formatted data:', formattedData)
    return formattedData
  } catch (error) {
    console.error('Error fetching users:', error)
    return { technical_directors: [], referees: [], players: [], treasurers: [] }
  }
}

export const createUser = async (formData) => {
  try {
    // Debug: Mostrar contenido del FormData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`)
    }

    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear usuario')
    }

    return await response.json()
  } catch (error) {
    console.error('Error en createUser:', error)
    throw error
  }
}
export const getUserById = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}`)
    if (!response.ok) {
      throw new Error('Error al obtener usuario')
    }
    const userData = await response.json()

    // Procesar la imagen
    if (userData.photo) {
      if (typeof userData.photo === 'string' && !userData.photo.startsWith('data:')) {
        userData.photo = `data:image/jpeg;base64,${userData.photo}`
      } else if (Buffer.isBuffer(userData.photo)) {
        userData.photo = `data:image/jpeg;base64,${userData.photo.toString('base64')}`
      }
    }

    return userData
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error)
    throw error
  }
} //actualizar usuario
export const updateUser = async (id, userData) => {
  try {
    const formData = new FormData()
    Object.keys(userData).forEach((key) => {
      if (userData[key] !== null && userData[key] !== undefined) {
        formData.append(key, userData[key])
      }
    })

    const response = await fetch(`${API_URL}${id}`, {
      method: 'PUT',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar usuario')
    }

    return await response.json()
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}
//desactivar usuario
export const deactivateUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}/deactivate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al desactivar usuario')
    }

    return await response.json()
  } catch (error) {
    console.error('Error deactivating user:', error)
    throw error
  }
}
export const activateUser = async (id) => {
  try {
    console.log('Activando usuario con ID:', id) // Debug

    if (!id) {
      throw new Error('ID de usuario no proporcionado')
    }

    // Asegurarse de que el ID sea numérico
    const numericId = typeof id === 'string' && id.includes('-') ? id.split('-')[1] : id

    if (!numericId || isNaN(numericId)) {
      throw new Error(`ID no válido: ${id}`)
    }

    const response = await fetch(`${API_URL}${numericId}/activate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('Respuesta del servidor:', response) // Debug

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Error del servidor:', errorData) // Debug
      throw new Error(errorData.message || `Error al activar usuario. Estado: ${response.status}`)
    }

    const result = await response.json()
    console.log('Resultado de activación:', result) // Debug

    if (!result.success) {
      throw new Error(result.message || 'La activación falló en el servidor')
    }

    return result
  } catch (error) {
    console.error(`Error completo en activateUser para ID ${id}:`, {
      message: error.message,
      stack: error.stack,
      id,
    })
    throw error
  }
}
