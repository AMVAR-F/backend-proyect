import { pool } from '../database/conection.js'

// Obtener todos los campeonatos
export const getChampionships = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM championships')
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener los campeonatos' })
  }
}

// Obtener un campeonato por ID
export const getChampionshipById = async (req, res) => {
  const { championshipId } = req.params
  try {
    const { rows } = await pool.query('SELECT * FROM championships WHERE championship_id = $1', [championshipId])
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Campeonato no encontrado' })
    }
    res.json(rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener el campeonato' })
  }
}

// Insertar un nuevo campeonato
export const insertChampionship = async (req, res) => {

  const {
    championship_name: championshipName,
    status = true,
    created_at: createdAt = new Date(),
    start_date: Startdate,
    end_date: endDate,
    start_inscriptions: startInscriptions,
    end_inscriptions: endInscriptions
  } = req.body

  if (!championshipName) {
    return res.status(400).json({ message: 'Faltan campos requeridos' })
  }

  try {
    const result = await pool.query(
      `INSERT INTO championships (championship_name, status, created_at, start_date, end_date, start_inscriptions, end_inscriptions)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [championshipName, status, createdAt, Startdate, endDate, startInscriptions, endInscriptions]
    )
    res.status(201).json(result.rows[0])
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
    const { rows, rowCount } = await client.query('DELETE FROM championships WHERE championship_id = $1 RETURNING *', [championshipId])
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
    start_date: Startdate,
    end_date: endDate,
    start_inscriptions: startInscriptions,
    end_inscriptions: endInscriptions
  } = req.body;
  
  if (!championshipName) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    const { rows } = await pool.query(
      `UPDATE championships SET championship_name = $1, status = $2, start_date = $3, end_date = $4, start_inscriptions = $5, end_inscriptions = $6
       WHERE championship_id = $7 RETURNING *`,
      [championshipName, status, Startdate, endDate, startInscriptions, endInscriptions, championshipId]
    )
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Championship not found' })
    }
    res.json(rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error updating the championship' })
  }
}
