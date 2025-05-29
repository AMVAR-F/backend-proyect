
import { pool } from "../database/conection.js";

// Obtener todos los directores técnicos
export const getAllTechnicalDirectors = async (showInactive = false) => {
  try {
    const query = `
      SELECT 
        td.id_td, 
        u.id_user,
        u.firstname, 
        u.lastname, 
        u.id_card, 
        u.gen,
        u.date_of_birth, 
        u.photo, 
        u.status
      FROM technical_directors td
      JOIN users u ON td.id_user = u.id_user
      ${showInactive ? "WHERE u.status = false" : "WHERE u.status = true"}
    `;
    
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Error fetching technical directors:", error);
    throw error;
  }
};

// Obtener un director técnico por ID
export const getTechnicalDirectorById = async (id) => {
  try {
    const query = `
      SELECT 
        td.id_td, 
        u.id_user,
        u.firstname, 
        u.lastname, 
        u.id_card, 
        u.gen,
        u.date_of_birth, 
        u.photo, 
        u.status
      FROM technical_directors td
      JOIN users u ON td.id_user = u.id_user
      WHERE td.id_td = $1 OR u.id_user = $1
    `;
    
    const { rows } = await pool.query(query, [id]);
    
    if (rows.length === 0) {
      throw { status: 404, message: "Director técnico no encontrado" };
    }
    
    return rows[0];
  } catch (error) {
    console.error(`Error fetching technical director ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo director técnico
export const createTechnicalDirector = async ({
  firstname,
  lastname,
  id_card,
  photo,
  gen,
  date_of_birth,
  status = true
}) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    
    // Verificar si la cédula ya existe
    const { rows: existingUsers } = await client.query(
      "SELECT id_card FROM users WHERE id_card = $1",
      [id_card]
    );
    
    if (existingUsers.length > 0) {
      throw { status: 409, message: "La cédula ya existe" };
    }
    
    // Insertar en tabla users
    const { rows: userRows } = await client.query(
      `INSERT INTO users (
        firstname, 
        lastname, 
        id_card, 
        photo,
        gen,
        date_of_birth,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id_user`,
      [firstname, lastname, id_card, photo, gen, date_of_birth, status]
    );
    
    const userId = userRows[0].id_user;
    
    // Insertar en tabla technical_directors
    const { rows: tdRows } = await client.query(
      `INSERT INTO technical_directors (id_user)
      VALUES ($1)
      RETURNING id_td`,
      [userId]
    );
    
    await client.query("COMMIT");
    
    return {
      id_td: tdRows[0].id_td,
      id_user: userId,
      firstname,
      lastname,
      id_card,
      status
    };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating technical director:", error);
    throw error;
  } finally {
    client.release();
  }
};

// Actualizar un director técnico
export const updateTechnicalDirector = async (id, {
  firstname,
  lastname,
  id_card,
  photo,
  gen,
  date_of_birth,
  status
}) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    
    // 1. Obtener el id_user asociado al director técnico
    const { rows: tdRows } = await client.query(
      "SELECT id_user FROM technical_directors WHERE id_td = $1",
      [id]
    );
    
    if (tdRows.length === 0) {
      throw { status: 404, message: "Director técnico no encontrado" };
    }
    
    const userId = tdRows[0].id_user;
    
    // 2. Actualizar datos en tabla users
    const updateQuery = `
      UPDATE users SET
        firstname = COALESCE($1, firstname),
        lastname = COALESCE($2, lastname),
        id_card = COALESCE($3, id_card),
        photo = COALESCE($4, photo),
        gen = COALESCE($5, gen),
        date_of_birth = COALESCE($6, date_of_birth),
        status = COALESCE($7, status)
      WHERE id_user = $8
      RETURNING *
    `;
    
    const { rows: updatedUser } = await client.query(updateQuery, [
      firstname,
      lastname,
      id_card,
      photo,
      gen,
      date_of_birth,
      status,
      userId
    ]);
    
    await client.query("COMMIT");
    
    return {
      id_td: id,
      ...updatedUser[0]
    };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(`Error updating technical director ${id}:`, error);
    throw error;
  } finally {
    client.release();
  }
};

// Desactivar un director técnico
export const deactivateTechnicalDirector = async (id) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    
    // 1. Obtener el id_user asociado al director técnico
    const { rows: tdRows } = await client.query(
      "SELECT id_user FROM technical_directors WHERE id_td = $1",
      [id]
    );
    
    if (tdRows.length === 0) {
      throw { status: 404, message: "Director técnico no encontrado" };
    }
    
    const userId = tdRows[0].id_user;
    
    // 2. Desactivar en tabla technical_directors
    await client.query(
      "UPDATE technical_directors SET status = false WHERE id_td = $1",
      [id]
    );
    
    // 3. Desactivar en tabla users
    await client.query(
      "UPDATE users SET status = false WHERE id_user = $1",
      [userId]
    );
    
    // 4. Eliminar referencias en equipos (si existe la tabla)
    try {
      await client.query(
        "UPDATE teams SET id_td = NULL WHERE id_td = $1",
        [id]
      );
    } catch (e) {
      console.log("Tabla teams no existe o no tiene columna id_td, omitiendo...");
    }
    
    await client.query("COMMIT");
    
    return {
      success: true,
      message: "Director técnico desactivado correctamente",
      id_td: id
    };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(`Error deactivating technical director ${id}:`, error);
    throw error;
  } finally {
    client.release();
  }
};

// Activar un director técnico
export const activateTechnicalDirector = async (id) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    
    // 1. Obtener el id_user asociado al director técnico
    const { rows: tdRows } = await client.query(
      "SELECT id_user FROM technical_directors WHERE id_td = $1 AND status = false",
      [id]
    );
    
    if (tdRows.length === 0) {
      // Verificar si ya está activo
      const { rows: activeCheck } = await client.query(
        "SELECT 1 FROM technical_directors WHERE id_td = $1 AND status = true",
        [id]
      );
      
      if (activeCheck.length > 0) {
        throw { status: 400, message: "El director técnico ya está activo" };
      } else {
        throw { status: 404, message: "Director técnico inactivo no encontrado" };
      }
    }
    
    const userId = tdRows[0].id_user;
    
    // 2. Activar en tabla technical_directors
    await client.query(
      "UPDATE technical_directors SET status = true WHERE id_td = $1",
      [id]
    );
    
    // 3. Activar en tabla users
    await client.query(
      "UPDATE users SET status = true WHERE id_user = $1",
      [userId]
    );
    
    await client.query("COMMIT");
    
    return {
      success: true,
      message: "Director técnico activado correctamente",
      id_td: id
    };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(`Error activating technical director ${id}:`, error);
    throw error;
  } finally {
    client.release();
  }
};