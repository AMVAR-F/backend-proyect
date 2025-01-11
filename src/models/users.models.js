import { pool } from '../database/conection.js';

export const getAllUsers = async () => {
  const { rows } = await pool.query('SELECT * FROM users');
  return rows;
};

export const getUserById = async (idUser) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE id_user = $1', [idUser]);
  return rows;
};

export const insertUser = async ({ firstname, lastname, idCard, photo, password, status, email, username }) => {
  const { rows } = await pool.query(
    `INSERT INTO users (firstname, lastname, id_card, photo, password, status, username, email) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, 
    [firstname, lastname, idCard, photo, password, status, username, email]
  );
  return rows[0];
};

export const deleteUserById = async (idUser, client) => {
  const { rows, rowCount } = await client.query('DELETE FROM users WHERE id_user = $1 RETURNING *', [idUser]);
  return { rows, rowCount };
};

export const updateUserById = async (idUser, { firstname, lastname, idCard, photo, password, status, email, username }) => {
  const { rows } = await pool.query(
    `UPDATE users SET firstname = $1, lastname = $2, id_card = $3, photo = $4, password = $5, status = $6, username = $7, email = $8 WHERE id_user = $9 
    RETURNING *`, 
    [firstname, lastname, idCard, photo, password, status, username, email, idUser]
  );
  return rows;
};
