const API_URL = 'http://localhost:4001/api/players/players/'

export const fetchPlayers = async (showInactive = false) => {
  try {
    const url = showInactive ? `${API_URL}?inactive=true` : API_URL
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Error al obtener jugadores')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching players:', error)
    throw error
  }
}

export const getPlayer = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}`)
    if (!response.ok) {
      throw new Error('Error al obtener jugador')
    }
    const player = await response.json()

    // Handle photo data properly
    if (player.photo) {
      // If photo is a Buffer (from backend)
      if (player.photo.type === 'Buffer' && player.photo.data) {
        // Convert buffer to base64 string
        const base64String = btoa(String.fromCharCode(...new Uint8Array(player.photo.data)))
        player.photo = `data:image/jpeg;base64,${base64String}`
      }
      // If photo is already a string but not a full URL
      else if (
        typeof player.photo === 'string' &&
        !player.photo.startsWith('data:') &&
        !player.photo.startsWith('http')
      ) {
        player.photo = `http://localhost:4001${player.photo}`
      }
    }

    return player
  } catch (error) {
    console.error(`Error fetching player ${id}:`, error)
    throw error
  }
}
export const createPlayer = async (formData) => {
  try {
    if (formData.photo instanceof File) {
      const fd = new FormData()
      Object.keys(formData).forEach((key) => {
        fd.append(key, formData[key])
      })
      formData = fd
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear jugador')
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating player:', error)
    throw error
  }
}

export const updatePlayer = async (id, formData) => {
  try {
    const response = await fetch(`${API_URL}${id}`, {
      method: 'PUT',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar jugador')
    }

    return await response.json()
  } catch (error) {
    console.error('Error updating player:', error)
    throw error
  }
}

export const deactivatePlayer = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}/deactivate`, {
      method: 'PATCH',
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al desactivar jugador')
    }

    return await response.json()
  } catch (error) {
    console.error('Error deactivating player:', error)
    throw error
  }
}

export const activatePlayer = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}/activate`, {
      method: 'PATCH',
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al activar jugador')
    }

    return await response.json()
  } catch (error) {
    console.error('Error activating player:', error)
    throw error
  }
}
