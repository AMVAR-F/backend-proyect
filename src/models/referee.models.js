import { pool } from "../database/conection.js";

// Obtener todos los árbitros
export const getAllReferees = async (showInactive = false) => {
  try {
    const query = showInactive
      ? "SELECT * FROM referees WHERE status = false"
      : "SELECT * FROM referees WHERE status = true";
    
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Error fetching referees:", error);
    throw error;
  }
};

// Obtener un árbitro por ID
export const getRefereeById = async (id) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM referees WHERE id_referee = $1",
      [id]
    );
    
    if (rows.length === 0) {
      throw { status: 404, message: "Árbitro no encontrado" };
    }
    
    return rows[0];
  } catch (error) {
    console.error(`Error fetching referee ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo árbitro
export const createReferee = async ({
  id_card,
  firstname,
  lastname,
  photo,
  gen,
  date_of_birth,
  status = true
}) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Verificar si la cédula ya existe
    const { rows: existing } = await client.query(
      "SELECT id_card FROM referees WHERE id_card = $1",
      [id_card]
    );
    
    if (existing.length > 0) {
      throw { status: 409, message: "La cédula ya está registrada" };
    }

    // Insertar nuevo árbitro
    const { rows } = await client.query(
      `INSERT INTO referees (
        id_card, firstname, lastname, photo, gen, date_of_birth, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING id_referee, id_card, firstname, lastname, status`,
      [id_card, firstname, lastname, photo, gen, date_of_birth, status]
    );

    await client.query("COMMIT");
    return rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating referee:", error);
    throw error;
  } finally {
    client.release();
  }
};

// Actualizar un árbitro
export const updateReferee = async (id, {
  id_card,
  firstname,
  lastname,
  photo,
  gen,
  date_of_birth
}) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Verificar si el árbitro existe
    const { rows: existing } = await client.query(
      "SELECT id_referee FROM referees WHERE id_referee = $1",
      [id]
    );
    
    if (existing.length === 0) {
      throw { status: 404, message: "Árbitro no encontrado" };
    }

    // Actualizar árbitro
    const { rows } = await client.query(
      `UPDATE referees SET
        id_card = COALESCE($1, id_card),
        firstname = COALESCE($2, firstname),
        lastname = COALESCE($3, lastname),
        photo = COALESCE($4, photo),
        gen = COALESCE($5, gen),
        date_of_birth = COALESCE($6, date_of_birth)
      WHERE id_referee = $7
      RETURNING id_referee, id_card, firstname, lastname, status`,
      [id_card, firstname, lastname, photo, gen, date_of_birth, id]
    );

    await client.query("COMMIT");
    return rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(`Error updating referee ${id}:`, error);
    throw error;
  } finally {
    client.release();
  }
};

// Desactivar un árbitro
export const deactivateReferee = async (id) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Verificar si el árbitro existe
    const { rows: existing } = await client.query(
      "SELECT id_referee FROM referees WHERE id_referee = $1 AND status = true",
      [id]
    );
    
    if (existing.length === 0) {
      throw { status: 404, message: "Árbitro no encontrado o ya está inactivo" };
    }

    // Desactivar árbitro
    await client.query(
      "UPDATE referees SET status = false WHERE id_referee = $1",
      [id]
    );

    // Desactivar relaciones en otras tablas
    try {
      await client.query(
        "UPDATE game_referees SET status = false WHERE id_referee = $1",
        [id]
      );
    } catch (e) {
      console.log("Tabla game_referees no existe, omitiendo...");
    }
    try {
        await client.query(
          "UPDATE referee_reports SET status = false WHERE id_referee = $1",
          [id]
        );
      } catch (e) {
        console.log("Tabla referee_report no existe, omitiendo...");
      }

    await client.query("COMMIT");
    return { success: true, message: "Árbitro desactivado correctamente" };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(`Error deactivating referee ${id}:`, error);
    throw error;
  } finally {
    client.release();
  }
};

// Activar un árbitro
export const activateReferee = async (id) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Verificar si el árbitro existe
    const { rows: existing } = await client.query(
      "SELECT id_referee FROM referees WHERE id_referee = $1 AND status = false",
      [id]
    );
    try {
        await client.query(
          "UPDATE game_referees SET status = false WHERE id_referee = $1",
          [id]
        );
      } catch (e) {
        console.log("Tabla game_referees no existe, omitiendo...");
      }
      try {
          await client.query(
            "UPDATE referee_reports SET status = false WHERE id_referee = $1",
            [id]
          );
        } catch (e) {
          console.log("Tabla referee_report no existe, omitiendo...");
        }
// Si el árbitro existe, activarlo
    
    if (existing.length === 0) {
      throw { status: 404, message: "Árbitro no encontrado o ya está activo" };
    }

    // Activar árbitro
    await client.query(
      "UPDATE referees SET status = true WHERE id_referee = $1",
      [id]
    );

    await client.query("COMMIT");
    return { success: true, message: "Árbitro activado correctamente" };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(`Error activating referee ${id}:`, error);
    throw error;
  } finally {
    client.release();
  }
};