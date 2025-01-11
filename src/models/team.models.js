import { pool } from '../database/conection.js';

export const getAllTeams = async () => {
  const { rows } = await pool.query('SELECT * FROM teams');
  return rows;
};

export const getTeamById = async (teamId) => {
  const { rows } = await pool.query('SELECT * FROM teams WHERE team_id = $1', [teamId]);
  return rows;
};

export const createTeam = async (teamName, idScolor, idTd, status, createdAt) => {
  const { rows } = await pool.query(
    `INSERT INTO teams (team_name, id_scolor, id_td, status, created_at)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [teamName, idScolor, idTd, status, createdAt]
  );
  return rows[0];
};

export const deleteTeamById = async (client, teamId) => {
  const { rows, rowCount } = await client.query(
    'DELETE FROM teams WHERE team_id = $1 RETURNING *',
    [teamId]
  );
  return { rows, rowCount };
};

export const deleteTeamRelations = async (client, teamId) => {
  await client.query('DELETE FROM team_players WHERE team_id = $1', [teamId]);
  await client.query('DELETE FROM champion_teams WHERE team_id = $1', [teamId]);
};

export const updateTeamById = async (teamId, teamName, idScolor, idTd, status) => {
  const { rows } = await pool.query(
    `UPDATE teams SET team_name = $1, id_scolor = $2, id_td = $3, status = $4
     WHERE team_id = $5 RETURNING *`,
    [teamName, idScolor, idTd, status, teamId]
  );
  return rows;
};
