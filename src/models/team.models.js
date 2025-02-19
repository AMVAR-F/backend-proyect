import { pool } from '../database/conection.js';

export const getAllTeams = async () => {
    const { rows } = await pool.query('SELECT * FROM teams');
    return rows;
};

export const getTeamById = async (teamId) => {
    const { rows } = await pool.query('SELECT * FROM teams WHERE team_id = $1', [teamId]);
    return rows;
};

export const createTeam = async (teamName, idScolor, idTd, status, createdAt, idTreasurer) => {
    const { rows } = await pool.query(
        `INSERT INTO teams (team_name, id_scolor, id_td, status, created_at, id_treasurer)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [teamName, idScolor, idTd, status, createdAt, idTreasurer]
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

export const updateTeamById = async (teamId, teamName, idScolor, idTd, status, idTreasurer) => {
    const { rows } = await pool.query(
        `UPDATE teams SET team_name = $1, id_scolor = $2, id_td = $3, status = $4, id_treasurer = $6
        WHERE team_id = $5 RETURNING *`,
        [teamName, idScolor, idTd, status, teamId, idTreasurer]
    );
    return rows;
};

// Team Players functionalities

export const addPlayerToTeam = async (teamId, idPlayer) => {
    const { rows } = await pool.query(
        `INSERT INTO team_players (team_id, id_player) VALUES ($1, $2) RETURNING *`,
        [teamId, idPlayer]
    );
    return rows[0];
};

export const removePlayerFromTeam = async (teamId, idPlayer) => {
    const { rows } = await pool.query(
        `DELETE FROM team_players WHERE team_id = $1 AND id_player = $2 RETURNING *`,
        [teamId, idPlayer]
    );
    return rows;
};

export const getTeamPlayers = async (teamId) => {
    const { rows } = await pool.query(
        `SELECT p.* FROM players p JOIN team_players tp ON p.id_player = tp.id_player WHERE tp.team_id = $1`,
        [teamId]
    );
    return rows;
};
