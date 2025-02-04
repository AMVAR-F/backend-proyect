import { pool } from '../database/conection.js';
import {
  getAllReports,
  getReportById,
  insertReport,
  deleteReportById,
  updateReportById
} from '../models/reports.models.js';

export const getReports = async (req, res) => {
  try {
    const reports = await getAllReports();
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving the reports' });
  }
};

export const getReport = async (req, res) => {
  const { reportId } = req.params;
  try {
    const reports = await getReportById(reportId);
    if (reports.length === 0) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json(reports[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving the report' });
  }
};

export const createReport = async (req, res) => {
  const { description, game_id: gameId, status = true } = req.body;

  if (!description || !gameId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const report = await insertReport({ description, gameId, status });
    res.status(201).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating the report' });
  }
};

export const deleteReport = async (req, res) => {
  const { reportId } = req.params;

  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Eliminar relaciones en game_referees y referee_reports
    await client.query('DELETE FROM referee_reports WHERE report_id = $1', [reportId]);
    
    // Eliminar el informe
    const { rows, rowCount } = await deleteReportById(reportId, client);

    if (rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'Report not found' });
    }

    await client.query('COMMIT');
    
    res.json({ message: 'Report deleted successfully', report: rows[0] });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ message: 'Error deleting the report' });
  } finally {
    client.release();
  }
};

export const updateReport = async (req, res) => {
  const { reportId } = req.params;
  const { description, game_id: gameId, status } = req.body;

  if (!description || !gameId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const reports = await updateReportById(reportId, { description, gameId, status });
    
    if (reports.length === 0) {
      return res.status(404).json({ message: 'Report not found' });
    }
    
    res.json(reports[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating the report' });
  }
};
