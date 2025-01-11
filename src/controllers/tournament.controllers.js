import { pool } from '../database/conection.js'
import {
  getAllChampionships as getAllChampionshipsM,
  getChampionshipById as getChampionshipByIdM,
  insertChampionship as insertChampionshipM,
  deleteChampionship as deleteChampionshipM,
  updateChampionship as updateChampionshipM
} from '../models/tournament.models.js'

// Obtener todos los campeonatos
export const getAllChampionships = async (req, res) => {
  try {
    const championships = await getAllChampionshipsM()
    res.json(championships)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error retrieving the championships' })
  }
}

// Obtener un campeonato por ID
export const getChampionshipById = async (req, res) => {
  const { championshipId } = req.params
  try {
    const championships = await getChampionshipByIdM(championshipId);
    if (championships.length === 0) {
      return res.status(404).json({ message: 'championship not found' })
    }
    res.json(championships[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error' })
  }
}

// Insertar un nuevo campeonato
export const insertChampionship = async (req, res) => {

  const {
    championship_name: championshipName,
    status = true,
    created_at: createdAt = new Date(),
    start_date: startDate,
    end_date: endDate,
    start_inscriptions: startInscriptions,
    end_inscriptions: endInscriptions
  } = req.body

  if (!championshipName|| !startDate|| !endDate|| !startInscriptions|| !endInscriptions) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    const championships = await insertChampionshipM ({championshipName, status, createdAt, startDate, endDate, startInscriptions, endInscriptions})
    res.status(201).json(championships)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creating the championship' })
  }
}

// Eliminar un campeonato por ID
export const deleteChampionship = async (req, res) => {
  const { championshipId } = req.params

  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    // Borrar relaciones con tablas relacionadas
    await client.query('DELETE FROM champion_teams WHERE championship_id = $1', [championshipId])
    await client.query('DELETE FROM phases WHERE championship_id = $1', [championshipId])
    await client.query('DELETE FROM "group" WHERE championship_id = $1', [championshipId])
    await client.query('DELETE FROM champion_games WHERE championship_id = $1', [championshipId])

    // Borrar el campeonato
    const { rows, rowCount } = await deleteChampionshipM (championshipId,client)
    if (rowCount === 0) {
      await client.query('ROLLBACK')
      return res.status(404).json({ message: 'Campeonato no encontrado' })
    }

    await client.query('COMMIT')

    res.json({ message: 'Campeonato eliminado exitosamente', championship: rows[0] })
  } catch (error) {
    await client.query('ROLLBACK')
    console.error(error)
    res.status(500).json({ message: 'Error delleting the championship' })
  } finally {
    client.release()
  }
}

// Actualizar un campeonato por ID
export const updateChampionship = async (req, res) => {
  const { championshipId } = req.params

  const {
    championship_name: championshipName,
    status = true,
    start_date: startDate,
    end_date: endDate,
    start_inscriptions: startInscriptions,
    end_inscriptions: endInscriptions
  } = req.body;
  
  if (!championshipName) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    const championships = await updateChampionshipM (championshipId, {championshipName, status, startDate, endDate, startInscriptions, endInscriptions})
    if (championships.length === 0) {
      return res.status(404).json({ message: 'Championship not found' })
    }
    res.json(championships[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error updating the championship' })
  }
}
