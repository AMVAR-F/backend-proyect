import{ pool } from "../database/conection.js";
// Obtener todos los delegados
export const getAllTreasurers = async () => {
    try {
      const query = `
        SELECT t.id_treasurer, u.firstname, u.lastname, u.id_card, u.gen, 
               u.date_of_birth, u.photo, u.status, 'treasurer' AS role
        FROM treasurers t
        JOIN users u ON t.id_user = u.id_user
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching treasurers:", error);
      throw error;
    }
  };
  
  // Obtener delegado por ID
  export const getTreasurerById = async (id) => {
    try {
      const query = `
        SELECT t.id_treasurer, u.firstname, u.lastname, u.id_card, u.gen,
               u.date_of_birth, u.photo, u.status, 'treasurer' AS role
        FROM treasurers t
        JOIN users u ON t.id_user = u.id_user
        WHERE t.id_treasurer = $1 OR t.id_user = $1
      `;
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error(`Error fetching treasurer ${id}:`, error);
      throw error;
    }
  };
  
  // Crear un nuevo delegado
  export const createTreasurer = async ({ firstname, lastname, id_card, photo, gen, date_of_birth }) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
  
      // Verificar si la cédula ya existe
      const { rows: existing } = await client.query(
        "SELECT id_card FROM users WHERE id_card = $1",
        [id_card]
      );
      if (existing.length > 0) {
        throw new Error("La cédula ya existe");
      }
  
      // Insertar en users
      const { rows: userRows } = await client.query(
        `INSERT INTO users (firstname, lastname, id_card, photo, gen, date_of_birth, status)
         VALUES ($1, $2, $3, $4, $5, $6, true)
         RETURNING id_user`,
        [firstname, lastname, id_card, photo, gen, date_of_birth]
      );
  
      // Insertar en treasurers
      const { rows: treasurerRows } = await client.query(
        `INSERT INTO treasurers (id_user)
         VALUES ($1)
         RETURNING id_treasurer`,
        [userRows[0].id_user]
      );
  
      await client.query("COMMIT");
  
      return {
        id_treasurer: treasurerRows[0].id_treasurer,
        id_user: userRows[0].id_user,
        firstname,
        lastname,
        id_card,
        role: 'treasurer'
      };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  };
  
  // Actualizar delegado
  export const updateTreasurerById = async (id, { firstname, lastname, id_card, photo, gen, date_of_birth }) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
  
      // 1. Obtener el id_user asociado al treasurer
      const { rows: treasurerRows } = await client.query(
        "SELECT id_user FROM treasurers WHERE id_treasurer = $1",
        [id]
      );
      
      if (treasurerRows.length === 0) {
        throw new Error("Delegado no encontrado");
      }
  
      const id_user = treasurerRows[0].id_user;
  
      // 2. Actualizar el usuario
      await client.query(
        `UPDATE users SET
          firstname = COALESCE($1, firstname),
          lastname = COALESCE($2, lastname),
          id_card = COALESCE($3, id_card),
          photo = COALESCE($4, photo),
          gen = COALESCE($5, gen),
          date_of_birth = COALESCE($6, date_of_birth)
         WHERE id_user = $7`,
        [firstname, lastname, id_card, photo, gen, date_of_birth, id_user]
      );
  
      await client.query("COMMIT");
  
      return { success: true, message: "Delegado actualizado correctamente" };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  };
  
  // Desactivar delegado
  export const deactivateTreasurerById = async (id) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
  
      // 1. Obtener el id_user asociado al treasurer
      const { rows: treasurerRows } = await client.query(
        "SELECT id_user FROM treasurers WHERE id_treasurer = $1",
        [id]
      );
      
      if (treasurerRows.length === 0) {
        throw new Error("Delegado no encontrado");
      }
  
      const id_user = treasurerRows[0].id_user;
  
      // 2. Desactivar en treasurers
      await client.query(
        "UPDATE treasurers SET status = false WHERE id_treasurer = $1",
        [id]
      );
  
      // 3. Desactivar en users
      await client.query(
        "UPDATE users SET status = false WHERE id_user = $1",
        [id_user]
      );
  
      // 4. Desactivar relaciones (equipos, pagos)
      try {
        await client.query(
          "UPDATE teams SET id_treasurer = NULL WHERE id_treasurer = $1",
          [id]
        );
      } catch (e) {
        console.log("Tabla teams no existe o no tiene columna id_treasurer, omitiendo...");
      }
  
      try {
        await client.query(
          "UPDATE payment SET id_treasurer = NULL WHERE id_treasurer = $1",
          [id]
        );
      } catch (e) {
        console.log("Tabla payment no existe, omitiendo...");
      }
  
      await client.query("COMMIT");
  
      return { success: true, message: "Delegado desactivado correctamente" };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  };
  
  // Activar delegado
  export const activateTreasurerById = async (id) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
  
      // 1. Verificar si el delegado existe y está inactivo
      const { rows: treasurerRows } = await client.query(
        "SELECT id_user FROM treasurers WHERE id_treasurer = $1 AND status = false",
        [id]
      );
      
      if (treasurerRows.length === 0) {
        throw new Error("Delegado no encontrado o ya está activo");
      }
  
      const id_user = treasurerRows[0].id_user;
  
      // 2. Activar en treasurers
      await client.query(
        "UPDATE treasurers SET status = true WHERE id_treasurer = $1",
        [id]
      );
  
      // 3. Activar en users
      await client.query(
        "UPDATE users SET status = true WHERE id_user = $1",
        [id_user]
      );
  
      await client.query("COMMIT");
  
      return { success: true, message: "Delegado activado correctamente" };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  };