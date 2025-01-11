import { pool } from '../database/conection.js'

// Obtener todos los campeonatos
export const getAllChampionships = async () => {
    const { rows } = await pool.query('SELECT * FROM championships')
    return rows;
}

// Obtener un campeonato por ID
export const getChampionshipById = async (championshipId) => {
    const { rows } = await pool.query('SELECT * FROM championships WHERE championship_id = $1', [championshipId])
    return rows;
}

// Insertar un nuevo campeonato
export const insertChampionship = async ({ championshipName, status, createdAt, startDate, endDate, startInscriptions, endInscriptions }) => {
  const { rows } = await pool.query(
    `INSERT INTO championships (championship_name, status, created_at, start_date, end_date, start_inscriptions, end_inscriptions)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [championshipName, status, createdAt, startDate, endDate, startInscriptions, endInscriptions]
  );
  return rows[0];
}

// Eliminar un campeonato por ID
export const deleteChampionship = async (championshipId, client) => {
    const { rows, rowCount } = await client.query('DELETE FROM championships WHERE championship_id = $1 RETURNING *', [championshipId])
   return { rows, rowCount }
}

// Actualizar un campeonato por ID
export const updateChampionship = async (championshipId, { championshipName, status, startDate, endDate, startInscriptions, endInscriptions }) => {
  const { rows } = await pool.query(
    `UPDATE championships 
     SET championship_name = $1, status = $2, start_date = $3, end_date = $4, start_inscriptions = $5, end_inscriptions = $6
     WHERE championship_id = $7 RETURNING *`,
    [championshipName, status, startDate, endDate, startInscriptions, endInscriptions, championshipId]
  );
  return rows;
};