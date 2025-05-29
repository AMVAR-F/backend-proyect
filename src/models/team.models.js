import { pool } from '../database/conection.js';

export const getAllTeams = async () => {
    const { rows } = await pool.query('SELECT * FROM teams');
    return rows;
};
export const getTeamWithPlayersById = async (teamId) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        // Obtener información básica del equipo
        const teamQuery = await client.query(
            'SELECT * FROM teams WHERE team_id = $1', 
            [teamId]
        );
        
        if (teamQuery.rows.length === 0) {
            return null;
        }
        
        const team = teamQuery.rows[0];
        
        // Obtener jugadores del equipo
        const playersQuery = await client.query(
            `SELECT p.* FROM players p 
             JOIN team_players tp ON p.id_player = tp.id_player 
             WHERE tp.team_id = $1`,
            [teamId]
        );
        
        team.players = playersQuery.rows;
        
        // Obtener categoría del equipo (si existe)
        const categoryQuery = await client.query(
            'SELECT * FROM categories WHERE team_id = $1',
            [teamId]
        );
        
        team.category = categoryQuery.rows[0] || null;
        
        await client.query('COMMIT');
        return team;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};
export const createTeam = async (teamName, idTd, colorPrimarioId, colorSecundarioId, idTreasurer, players = [], status = true, createdAt = new Date()) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // 1. Crear el equipo principal
        const { rows: teamRows } = await client.query(
            `INSERT INTO teams (
                team_name, 
                id_td, 
                color_primario_id, 
                color_secundario_id, 
                id_treasurer, 
                status, 
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [teamName, idTd, colorPrimarioId, colorSecundarioId, idTreasurer, status, createdAt]
        );

        const teamId = teamRows[0].team_id;

        // 2. Agregar jugadores al equipo si se proporcionaron
        if (players && players.length > 0) {
            for (const playerId of players) {
                await client.query(
                    `INSERT INTO team_players (team_id, id_player) VALUES ($1, $2)`,
                    [teamId, playerId]
                );
            }
        }

        await client.query('COMMIT');
        
        // Obtener el equipo completo con sus jugadores para devolverlo
        const team = teamRows[0];
        const { rows: playerRows } = await client.query(
            `SELECT p.* FROM players p 
             JOIN team_players tp ON p.id_player = tp.id_player 
             WHERE tp.team_id = $1`,
            [teamId]
        );
        
        team.players = playerRows;
        
        return team;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
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

