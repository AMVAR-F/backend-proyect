const API_URL = 'http://localhost:4001/api/referees/referees/'

export const fetchReferees = async (showInactive = false) => {
  try {
    const url = showInactive ? `${API_URL}?inactive=true` : API_URL
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data.map((referee) => normalizeRefereePhoto(referee))
  } catch (error) {
    console.error('Error fetching referees:', error)
    return []
  }
}

export const getRefereeById = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}`)

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return normalizeRefereePhoto(data)
  } catch (error) {
    console.error(`Error fetching referee ${id}:`, error)
    throw error
  }
}
export const createReferee = async (refereeData) => {
  try {
    // Crear un nuevo FormData
    const formData = new FormData();
    
    // Agregar campos al FormData
    Object.entries(refereeData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        // Manejar fecha especial
        if (key === 'date_of_birth' && value) {
          const date = new Date(value);
          formData.append(key, date.toISOString());
        } 
        // Manejar archivo de imagen
        else if (key === 'photo' && value instanceof File) {
          formData.append(key, value);
        }
        // Campos normales
        else {
          formData.append(key, value);
        }
      }
    });

    // Verificar campos requeridos
    if (!formData.get('firstname') || !formData.get('lastname') || !formData.get('id_card')) {
      throw new Error('Faltan campos requeridos: nombre, apellido o DNI');
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear árbitro');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en createReferee:', error);
    throw error;
  }
};

export const updateReferee = async (id, refereeData) => {
  try {
    const formData = new FormData()

    // Agregar todos los campos al FormData
    Object.entries(refereeData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        // Formatear fecha correctamente
        if (key === 'date_of_birth' && value) {
          formData.append(key, new Date(value).toISOString())
        } else {
          formData.append(key, value)
        }
      }
    })

    const response = await fetch(`${API_URL}${id}`, {
      method: 'PUT',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar árbitro')
    }

    const result = await response.json()

    // Asegurar que la respuesta incluya todos los campos actualizados
    return {
      ...result,
      referee: {
        ...result.referee,
        date_of_birth: refereeData.date_of_birth || result.referee.date_of_birth,
        gen: refereeData.gen || result.referee.gen,
      },
    }
  } catch (error) {
    console.error('Error updating referee:', error)
    throw error
  }
}

export const deactivateReferee = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}/deactivate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al desactivar árbitro')
    }

    return await response.json()
  } catch (error) {
    console.error('Error deactivating referee:', error)
    throw error
  }
}

export const activateReferee = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}/activate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al activar árbitro')
    }

    return await response.json()
  } catch (error) {
    console.error('Error activating referee:', error)
    throw error
  }
}
const normalizeRefereePhoto = (referee) => {
  if (!referee.photo) return referee
  // Si la foto ya es una URL o base64, no hacer nada
  if (
    typeof referee.photo === 'string' &&
    (referee.photo.startsWith('data:') || referee.photo.startsWith('http'))
  ) {
    return referee
  }

  // Si es un buffer (desde el backend)
  if (referee.photo.type === 'Buffer' && referee.photo.data) {
    const base64String = btoa(String.fromCharCode(...new Uint8Array(referee.photo.data)))
    return {
      ...referee,
      photo: `data:image/jpeg;base64,${base64String}`,
    }
  }

  // Si es un objeto File (desde el frontend)
  if (referee.photo instanceof File) {
    return {
      ...referee,
      photo: URL.createObjectURL(referee.photo),
    }
  }

  // Si no reconocemos el formato, eliminamos la foto
  const { photo, ...rest } = referee
  return rest
}
