// src/services/technicalDirectors.js
const API_URL = 'http://localhost:4001/api/technical_directors/technical_directors'

export const fetchTechnicalDirectors = async (showInactive = false) => {
  try {
    const url = showInactive ? `${API_URL}?inactive=true` : API_URL
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    console.log('Directores técnicos obtenidos:', data)

    // Formatear datos para consistencia con el frontend
    const formattedData = data.map((director) => ({
      ...director,
      id: director.id_td,
      idType: 'technical_director',
      type: 'technical_director',
      role: 'technical_director',
    }))

    return formattedData
  } catch (error) {
    console.error('Error fetching technical directors:', error)
    return []
  }
}

export const getTechnicalDirectorsById = async (id) => {
  try {
    // Verificar que el ID exista y sea válido
    if (!id || (typeof id !== 'string' && typeof id !== 'number')) {
      console.error('ID no válido recibido:', id)
      throw new Error('ID de director técnico no válido')
    }

    // Extraer el ID numérico si está en formato "tipo-id"
    const actualId = typeof id === 'string' && id.includes('-') ? id.split('-')[1] : id

    const response = await fetch(`${API_URL}/${actualId}`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener director técnico')
    }

    const directorData = await response.json()

    // Normalizar la foto del director técnico
    if (
      directorData.photo &&
      !directorData.photo.startsWith('data:') &&
      !directorData.photo.startsWith('http')
    ) {
      directorData.photo = `http://localhost:4001${directorData.photo}`
    }

    // Añadir campos adicionales para consistencia
    return {
      ...directorData,
      id: directorData.id_td,
      idType: 'technical_director',
      type: 'technical_director',
      role: 'technical_director',
    }
  } catch (error) {
    console.error(`Error fetching technical director ${id}:`, error)
    throw error
  }
}

export const createTechnicalDirectors = async (formData) => {
  try {
    // Debug: Mostrar contenido del FormData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`)
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear director técnico')
    }

    const result = await response.json()

    // Formatear respuesta para consistencia
    return {
      ...result.director,
      id: result.director.id_td,
      idType: 'technical_director',
      type: 'technical_director',
      role: 'technical_director',
    }
  } catch (error) {
    console.error('Error en createTechnicalDirector:', error)
    throw error
  }
}

export const updateTechnicalDirectors = async (id, directorData) => {
  try {
    const formData = new FormData()

    // Agregar solo los campos que tienen valor
    Object.keys(directorData).forEach((key) => {
      if (directorData[key] !== null && directorData[key] !== undefined) {
        formData.append(key, directorData[key])
      }
    })

    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar director técnico')
    }

    const result = await response.json()

    // Formatear respuesta para consistencia
    return {
      ...result.director,
      id: result.director.id_td,
      idType: 'technical_director',
      type: 'technical_director',
      role: 'technical_director',
    }
  } catch (error) {
    console.error('Error updating technical director:', error)
    throw error
  }
}

export const deactivateTechnicalDirectors = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}/deactivate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al desactivar director técnico')
    }

    return await response.json()
  } catch (error) {
    console.error('Error deactivating technical director:', error)
    throw error
  }
}

export const activateTechnicalDirectors = async (id) => {
  try {
    console.log('Activando director técnico con ID:', id)

    if (!id) {
      throw new Error('ID de director técnico no proporcionado')
    }

    // Asegurarse de que el ID sea numérico
    const numericId = typeof id === 'string' && id.includes('-') ? id.split('-')[1] : id

    if (!numericId || isNaN(numericId)) {
      throw new Error(`ID no válido: ${id}`)
    }

    const response = await fetch(`${API_URL}/${numericId}/activate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('Respuesta del servidor:', response)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Error del servidor:', errorData)
      throw new Error(
        errorData.message || `Error al activar director técnico. Estado: ${response.status}`,
      )
    }

    const result = await response.json()
    console.log('Resultado de activación:', result)

    if (!result.success) {
      throw new Error(result.message || 'La activación falló en el servidor')
    }

    return result
  } catch (error) {
    console.error(`Error completo en activateTechnicalDirector para ID ${id}:`, {
      message: error.message,
      stack: error.stack,
      id,
    })
    throw error
  }
}
