import { pool } from '../database/conection.js';

export const getAllReports = async () => {
  const { rows } = await pool.query('SELECT * FROM reports');
  return rows;
};

export const getReportById = async (reportId) => {
  const { rows } = await pool.query('SELECT * FROM reports WHERE report_id = $1', [reportId]);
  return rows;
};

export const insertReport = async ({ description, gameId, status }) => {
  const { rows } = await pool.query(
    `INSERT INTO reports (description, game_id, status) 
     VALUES ($1, $2, $3) RETURNING *`, 
    [description, gameId, status]
  );
  
  return rows[0];
};

export const deleteReportById = async (reportId, client) => {
  const { rows, rowCount } = await client.query('DELETE FROM reports WHERE report_id = $1 RETURNING *', [reportId]);
  return { rows, rowCount };
};

export const updateReportById = async (reportId, { description, gameId, status }) => {
  const { rows } = await pool.query(
    `UPDATE reports SET description = $1, game_id = $2, status = $3 WHERE report_id = $4 
     RETURNING *`, 
    [description, gameId, status, reportId]
  );
  
  return rows;
};
