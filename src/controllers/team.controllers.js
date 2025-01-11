import { pool } from '../database/conection.js';
import {
  getAllTeams,
  getTeamById as getTeamByIdModel,
  createTeam,
  deleteTeamById,
  deleteTeamRelations,
  updateTeamById,
} from '../models/team.models.js';


export const getTeams = async (req, res) => {
  try {
    const teams = await getAllTeams();
    res.json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving the teams' });
  }
};

export const getTeamById = async (req, res) => {
  const { teamId } = req.params;
  try {
    const rows = await getTeamByIdModel(teamId);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving the team' });
  }
};

export const insertTeam = async (req, res) => {
  const {
    team_name: teamName,
    id_scolor: idScolor,
    id_td: idTd,
    status = true,
    created_at: createdAt = new Date(),
  } = req.body;

  if (!teamName || !idScolor || !idTd) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const team = await createTeam(teamName, idScolor, idTd, status, createdAt);
    res.status(201).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating the team' });
  }
};

export const deleteTeam = async (req, res) => {
  const { teamId } = req.params;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await deleteTeamRelations(client, teamId);
    const { rows, rowCount } = await deleteTeamById(client, teamId);

    if (rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'Team not found' });
    }

    await client.query('COMMIT');
    res.json({ message: 'Team deleted successfully', team: rows[0] });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ message: 'Error deleting the team' });
  } finally {
    client.release();
  }
};

export const updateTeam = async (req, res) => {
  const { teamId } = req.params;
  const {
    team_name: teamName,
    id_scolor: idScolor,
    id_td: idTd,
    status = true,
  } = req.body;

  if (!teamName || !idScolor || !idTd) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const rows = await updateTeamById(teamId, teamName, idScolor, idTd, status);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating the team' });
  }
};
