import { pool } from '../database/conection.js';

// Obtener todos los usuarios
export const getAllUsers = async () => {
  const { rows } = await pool.query('SELECT * FROM users');
  return rows;
};

// Obtener usuario por ID
export const getUserById = async (idUser) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE id_user = $1', [idUser]);
  return rows;
};

export const insertUser = async ({ firstname, lastname, idCard, photo, password, status, email, username, role, date_of_birth, gen, type_position }) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Insertar usuario en `users`
    const { rows } = await client.query(
      `INSERT INTO users (firstname, lastname, id_card, photo, password, status, username, email) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_user`,
      [firstname, lastname, idCard, photo, password, status, username, email]
    );

    const userId = rows[0].id_user;

    // Insertar en la tabla de roles correspondiente
    if (role === 'technical_director') {
      await client.query(`INSERT INTO technical_directors (id_user) VALUES ($1)`, [userId]);
    } else if (role === 'treasurer') {
      await client.query(`INSERT INTO treasurers (id_user) VALUES ($1)`, [userId]);
    } else if (role === 'admin') {
      await client.query(`INSERT INTO admins (id_user) VALUES ($1)`, [userId]);
    } else if (role === 'player') {
      if (!date_of_birth || !gen || !type_position) {
        throw new Error('Player role requires date_of_birth, gen, and type_position fields');
      }
      await client.query(
        `INSERT INTO players (id_card, firstname, last_name, date_of_birth, photo, gen, type_position) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [idCard, firstname, lastname, date_of_birth, photo, gen, type_position]
      );
    }

    await client.query('COMMIT');
    return { id_user: userId, firstname, lastname, email, role };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};


// Actualizar usuario y permitir cambio de rol
export const updateUserById = async (idUser, { firstname, lastname, idCard, photo, password, status, email, username, role, date_of_birth, gen, type_position }) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Obtener el id_card antes de modificar el usuario
    const { rows: userRows } = await client.query('SELECT id_card FROM users WHERE id_user = $1', [idUser]);
    if (userRows.length === 0) {
      await client.query('ROLLBACK');
      return null;
    }
    const oldIdCard = userRows[0].id_card;

    // Si el usuario era un `player`, eliminamos referencias en `chronologies` y `team_players`
    await client.query('DELETE FROM chronologies WHERE id_player = (SELECT id_player FROM players WHERE id_card = $1)', [oldIdCard]);
    await client.query('DELETE FROM team_players WHERE id_player = (SELECT id_player FROM players WHERE id_card = $1)', [oldIdCard]);

    //  Eliminar rol anterior
    await client.query('DELETE FROM technical_directors WHERE id_user = $1', [idUser]);
    await client.query('DELETE FROM treasurers WHERE id_user = $1', [idUser]);
    await client.query('DELETE FROM admins WHERE id_user = $1', [idUser]);
    await client.query('DELETE FROM players WHERE id_card = $1', [oldIdCard]);

    // Actualizar datos del usuario
    const { rows } = await client.query(
      `UPDATE users SET firstname = $1, lastname = $2, id_card = $3, photo = $4, password = $5, status = $6, username = $7, email = $8 
      WHERE id_user = $9 RETURNING *`,
      [firstname, lastname, idCard, photo, password, status, username, email, idUser]
    );

    if (rows.length === 0) {
      await client.query('ROLLBACK');
      return null;
    }

    // Insertar nuevo rol
    if (role === 'technical_director') {
      await client.query(`INSERT INTO technical_directors (id_user) VALUES ($1)`, [idUser]);
    } else if (role === 'treasurer') {
      await client.query(`INSERT INTO treasurers (id_user) VALUES ($1)`, [idUser]);
    } else if (role === 'admin') {
      await client.query(`INSERT INTO admins (id_user) VALUES ($1)`, [idUser]);
    } else if (role === 'player') {
      if (!date_of_birth || !gen || !type_position) {
        throw new Error('Player role requires date_of_birth, gen, and type_position fields');
      }
      await client.query(
        `INSERT INTO players (id_card, firstname, last_name, date_of_birth, photo, gen, type_position) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [idCard, firstname, lastname, date_of_birth, photo, gen, type_position]
      );
    }

    await client.query('COMMIT');
    return rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};



export const deleteUserById = async (idUser) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Obtener id_card del usuario antes de eliminarlo
    const { rows: userRows } = await client.query('SELECT id_card FROM users WHERE id_user = $1', [idUser]);
    if (userRows.length === 0) {
      await client.query('ROLLBACK');
      return null;
    }
    const idCard = userRows[0].id_card;

    // Eliminar referencias en `chronologies` y `team_players`
    await client.query('DELETE FROM chronologies WHERE id_player = (SELECT id_player FROM players WHERE id_card = $1)', [idCard]);
    await client.query('DELETE FROM team_players WHERE id_player = (SELECT id_player FROM players WHERE id_card = $1)', [idCard]);

    // Eliminar el usuario de las tablas de roles
    await client.query('DELETE FROM technical_directors WHERE id_user = $1', [idUser]);
    await client.query('DELETE FROM treasurers WHERE id_user = $1', [idUser]);
    await client.query('DELETE FROM admins WHERE id_user = $1', [idUser]);
    await client.query('DELETE FROM players WHERE id_player = $1', [idCard]);

    // Eliminar usuario de `users`
    const { rows, rowCount } = await client.query('DELETE FROM users WHERE id_user = $1 RETURNING *', [idUser]);

    if (rowCount === 0) {
      await client.query('ROLLBACK');
      return null;
    }

    await client.query('COMMIT');
    return rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
