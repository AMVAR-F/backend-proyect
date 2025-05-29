import { pool } from "../database/conection.js";

// Obtener todos los jugadores (activos por defecto)
export const getAllPlayers = async (showInactive = false) => {
  try {
    const query = showInactive
      ? "SELECT * FROM players WHERE status = false"
      : "SELECT * FROM players WHERE status = true";

    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
};

// Obtener un jugador por ID
export const getPlayerById = async (id) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM players WHERE id_player = $1",
      [id]
    );

    if (rows.length === 0) {
      throw { status: 404, message: "Jugador no encontrado" };
    }

    return rows[0];
  } catch (error) {
    console.error(`Error fetching player ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo jugador
export const createPlayer = async ({
  id_card,
  firstname,
  lastname,
  date_of_birth,
  photo,
  gen,
  type_position,
  id_shirt,
}) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Verificar si la cédula ya existe
    const { rows: existing } = await client.query(
      "SELECT id_card FROM players WHERE id_card = $1",
      [id_card]
    );

    if (existing.length > 0) {
      throw { status: 409, message: "La cédula ya está registrada" };
    }

    // Insertar nuevo jugador
    const { rows } = await client.query(
      `INSERT INTO players (
        id_card, firstname, lastname, date_of_birth, 
        photo, gen, type_position, id_shirt, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true)
      RETURNING id_player, id_card, firstname, lastname`,
      [
        id_card,
        firstname,
        lastname,
        date_of_birth,
        photo,
        gen,
        type_position,
        id_shirt,
      ]
    );

    await client.query("COMMIT");
    return rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating player:", error);
    throw error;
  } finally {
    client.release();
  }
};

// Actualizar un jugador
export const updatePlayer = async (
  id,
  {
    id_card,
    firstname,
    lastname,
    date_of_birth,
    photo,
    gen,
    type_position,
    id_shirt,
  }
) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Verificar si el jugador existe
    const { rows: existing } = await client.query(
      "SELECT id_player FROM players WHERE id_player = $1",
      [id]
    );

    if (existing.length === 0) {
      throw { status: 404, message: "Jugador no encontrado" };
    }

    // Verificar si la nueva cédula ya existe en otro jugador
    if (id_card) {
      const { rows: idConflict } = await client.query(
        "SELECT id_player FROM players WHERE id_card = $1 AND id_player != $2",
        [id_card, id]
      );

      if (idConflict.length > 0) {
        throw {
          status: 409,
          message: "La cédula ya está registrada en otro jugador",
        };
      }
    }

    // Actualizar jugador
    const { rows } = await client.query(
      `UPDATE players SET
        id_card = COALESCE($1, id_card),
        firstname = COALESCE($2, firstname),
        lastname = COALESCE($3, lastname),
        date_of_birth = COALESCE($4, date_of_birth),
        photo = COALESCE($5, photo),
        gen = COALESCE($6, gen),
        type_position = COALESCE($7, type_position),
        id_shirt = COALESCE($8, id_shirt)
      WHERE id_player = $9
      RETURNING id_player, id_card, firstname, lastname`,
      [
        id_card,
        firstname,
        lastname,
        date_of_birth,
        photo,
        gen,
        type_position,
        id_shirt,
        id,
      ]
    );

    await client.query("COMMIT");
    return rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(`Error updating player ${id}:`, error);
    throw error;
  } finally {
    client.release();
  }
};

// Desactivar un jugador
export const deactivatePlayer = async (id) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Verificar si el jugador existe
    const { rows: existing } = await client.query(
      "SELECT id_player FROM players WHERE id_player = $1 AND status = true",
      [id]
    );

    if (existing.length === 0) {
      throw {
        status: 404,
        message: "Jugador no encontrado o ya está inactivo",
      };
    }

    // Desactivar jugador
    await client.query(
      "UPDATE players SET status = false WHERE id_player = $1",
      [id]
    );

    // Desactivar relaciones (team_players, chronologies, etc.)
    try {
      await client.query(
        "UPDATE team_players SET status = false WHERE id_player = $1",
        [id]
      );
    } catch (e) {
      console.log("Tabla team_players no existe, omitiendo...");
    }

    try {
      await client.query(
        "UPDATE chronologies SET status = false WHERE id_player = $1",
        [id]
      );
    } catch (e) {
      console.log("Tabla chronologies no existe, omitiendo...");
    }

    await client.query("COMMIT");
    return { success: true, message: "Jugador desactivado correctamente" };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(`Error deactivating player ${id}:`, error);
    throw error;
  } finally {
    client.release();
  }
};

// Activar un jugador
export const activatePlayer = async (id) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Verificar si el jugador existe y está inactivo
    const { rows: existing } = await client.query(
      "SELECT id_player FROM players WHERE id_player = $1 AND status = false",
      [id]
    );

    if (existing.length === 0) {
      throw { status: 404, message: "Jugador no encontrado o ya está activo" };
    }

    // Activar jugador
    await client.query(
      "UPDATE players SET status = true WHERE id_player = $1",
      [id]
    );
    // Activar relaciones (team_players, chronologies, etc.)
    try {
      await client.query(
        "UPDATE team_players SET status = true WHERE id_player = $1",
        [id]
      );
    } catch (e) {
      console.log("Tabla team_players no existe, omitiendo...");
    }

    try {
      await client.query(
        "UPDATE chronologies SET status = true WHERE id_player = $1",
        [id]
      );
    } catch (e) {
      console.log("Tabla chronologies no existe, omitiendo...");
    }
    await client.query("COMMIT");
    return { success: true, message: "Jugador activado correctamente" };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(`Error activating player ${id}:`, error);
    throw error;
  } finally {
    client.release();
  }
};
