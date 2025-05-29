import { pool } from "../database/conection.js";

import {
  getAllTeams,
  getTeamWithPlayersById,
  createTeam,
  deleteTeamById,
  deleteTeamRelations,
  updateTeamById,
  addPlayerToTeam,
  removePlayerFromTeam,
} from "../models/team.models.js";

export const getTeams = async (req, res) => {
  try {
    const teams = await getAllTeams();
    res.json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving the teams" });
  }
};

export const getTeamWithPlayers = async (req, res) => {
  const { teamId } = req.params;

  try {
    const team = await getTeamWithPlayersById(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving the team with players" });
  }
};
export const insertTeam = async (req, res) => {
  const {
    team_name: teamName,
    id_td: idTd,
    color_primario_id: colorPrimarioId,
    color_secundario_id: colorSecundarioId,
    id_treasurer: idTreasurer,
    players = [],
    status = true,
    created_at: createdAt = new Date(),
  } = req.body;

  // Validación de campos requeridos
  if (
    !teamName ||
    !idTd ||
    !colorPrimarioId ||
    !colorSecundarioId ||
    !idTreasurer
  ) {
    return res.status(400).json({
      message:
        "Missing required fields: team_name, id_td, color_primario_id, color_secundario_id, id_treasurer are required",
    });
  }

  try {
    // Validar que los jugadores existan antes de crear el equipo
    if (players.length > 0) {
      const { rows: existingPlayers } = await pool.query(
        "SELECT id_player FROM players WHERE id_player = ANY($1::int[])",
        [players]
      );

      if (existingPlayers.length !== players.length) {
        return res.status(400).json({
          message: "Some players do not exist in the database",
        });
      }
    }

    const team = await createTeam(
      teamName,
      idTd,
      colorPrimarioId,
      colorSecundarioId,
      idTreasurer,
      players,
      status,
      createdAt
    );

    res.status(201).json(team);
  } catch (error) {
    console.error(error);

    if (error.code === "23503") {
      // Foreign key violation
      const detail = error.detail.toLowerCase();
      let message = "Error creating team: ";

      if (detail.includes("id_td"))
        message += "Technical director does not exist";
      else if (
        detail.includes("color_primario_id") ||
        detail.includes("color_secundario_id")
      )
        message += "Color does not exist";
      else if (detail.includes("id_treasurer"))
        message += "Treasurer does not exist";
      else message += "Invalid reference data";

      return res.status(400).json({ message });
    }

    res.status(500).json({ message: "Error creating the team" });
  }
};
export const deleteTeam = async (req, res) => {
  const { teamId } = req.params;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await deleteTeamRelations(client, teamId);
    const { rows, rowCount } = await deleteTeamById(client, teamId);
    if (rowCount === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "Team not found" });
    }
    await client.query("COMMIT");
    res.json({ message: "Team deleted successfully", team: rows[0] });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);
    res.status(500).json({ message: "Error deleting the team" });
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
    id_treasurer: idTreasurer,
  } = req.body;

  if (!teamName || !idScolor || !idTd) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const rows = await updateTeamById(
      teamId,
      teamName,
      idScolor,
      idTd,
      status,
      idTreasurer
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating the team" });
  }
};

// Team Players Controllers

export const addPlayer = async (req, res) => {
  const { teamId } = req.params;
  const { id_player: idPlayer } = req.body;

  try {
    const teamPlayer = await addPlayerToTeam(teamId, idPlayer);
    res.status(201).json(teamPlayer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding player to team" });
  }
};

export const removePlayer = async (req, res) => {
  const { teamId } = req.params;
  const { id_player: idPlayer } = req.body;

  try {
    const rows = await removePlayerFromTeam(teamId, idPlayer);
    res.json({ message: "Player removed from team successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing player from team" });
  }
};
