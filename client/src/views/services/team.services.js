// api.service.js
const API_BASE_URL = 'http://localhost:3000/api/teams'

export const TeamService = {
  // Obtener todos los equipos
  async getAllTeams() {
    try {
      const response = await fetch(`${API_BASE_URL}/teams`)
      if (!response.ok) {
        throw new Error('Error al obtener los equipos')
      }
      return await response.json()
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
  },

  // Obtener un equipo por ID con sus jugadores
  async getTeamById(teamId) {
    try {
      const response = await fetch(`${API_BASE_URL}/teams/${teamId}/with-players`)
      if (!response.ok) {
        throw new Error('Error al obtener el equipo')
      }
      return await response.json()
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
  },

  // Crear un nuevo equipo
  async createTeam(teamData) {
    try {
      const response = await fetch(`${API_BASE_URL}/teams`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          team_name: teamData.name_team,
          id_td: teamData.technical_director,
          color_primario_id: teamData.homeColor,
          color_secundario_id: teamData.awayColor,
          players: teamData.members.map((member) => member.id),
          status: teamData.isActive,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al crear el equipo')
      }
      return await response.json()
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
  },

  // Actualizar un equipo existente
  async updateTeam(teamId, teamData) {
    try {
      const response = await fetch(`${API_BASE_URL}/teams/${teamId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          team_name: teamData.name_team,
          id_td: teamData.technical_director,
          id_scolor: teamData.homeColor,
          status: teamData.isActive,
          players: teamData.members.map((member) => member.id),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al actualizar el equipo')
      }
      return await response.json()
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
  },

  // Manejar la subida de fotos (si es necesario)
  async uploadTeamPhoto(teamId, photoFile) {
    try {
      const formData = new FormData()
      formData.append('photo', photoFile)

      const response = await fetch(`${API_BASE_URL}/teams/${teamId}/photo`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Error al subir la foto')
      }
      return await response.json()
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
  },
}
