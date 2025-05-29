const API_URL = 'http://localhost:4001/api/treasurers/treasurers/';

export const fetchTreasurers = async (showInactive = false) => {
  try {
    const url = showInactive ? `${API_URL}?inactive=true` : API_URL;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching treasurers:', error);
    return [];
  }
};

export const createTreasurer = async (formData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear delegado');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en createTreasurer:', error);
    throw error;
  }
};

export const getTreasurerById = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al obtener delegado');
    }
    const userData = await response.json();
    // Normalizar la foto del usuario
    if (userData.photo && !userData.photo.startsWith('data:') && !userData.photo.startsWith('http')) {
      userData.photo = `http://localhost:4001${userData.photo}`;
    }
    return userData;
  } catch (error) {
    console.error(`Error fetching treasurer ${id}:`, error);
    throw error;
  }
};

export const updateTreasurer = async (id, treasurerData) => {
  try {
    const formData = new FormData();
    Object.keys(treasurerData).forEach((key) => {
      if (treasurerData[key] !== null && treasurerData[key] !== undefined) {
        formData.append(key, treasurerData[key]);
      }
    });

    const response = await fetch(`${API_URL}${id}`, {
      method: 'PUT',
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al actualizar delegado');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating treasurer:', error);
    throw error;
  }
};

export const deactivateTreasurer = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}/deactivate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al desactivar delegado');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deactivating treasurer:', error);
    throw error;
  }
};

export const activateTreasurer = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}/activate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al activar delegado');
    }
    return await response.json();
  } catch (error) {
    console.error('Error activating treasurer:', error);
    throw error;
  }
};