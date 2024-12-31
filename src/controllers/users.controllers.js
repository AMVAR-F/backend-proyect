import { pool } from '../database/conection.js';

export const getusers = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving the users' });
  }
};

export const createusers = async (req, res) => {
  const { idUser } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id_user = $1', [idUser]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error' });
  }
};

export const insertusers = async (req, res) => {
  const { firstname, lastname, id_card: idCard, photo = '', password, status = true, email, username } = req.body;

  if (!firstname || !lastname || !idCard || !password || !email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO users (firstname, lastname, id_card, photo, password, status, username, email) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, 
      [firstname, lastname, idCard, photo, password, status, username, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error' });
  }
};

export const deleteusers = async (req, res) => {
  const { idUser } = req.params;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query('DELETE FROM teams WHERE id_td = $1', [idUser]);
    await client.query('DELETE FROM admins WHERE id_user = $1', [idUser]);
    await client.query('DELETE FROM technical_directors WHERE id_user = $1', [idUser]);
    await client.query('DELETE FROM treasurers WHERE id_user = $1', [idUser]);

    const { rows, rowCount } = await client.query('DELETE FROM users WHERE id_user = $1 RETURNING *', [idUser]);

    if (rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'User not found' });
    }

    await client.query('COMMIT');

    res.json({ message: 'User deleted successfully', user: rows[0] });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  } finally {
    client.release();
  }
};

export const updateusers = async (req, res) => {
  const { idUser } = req.params;
  const { firstname, lastname, id_card: idCard, photo = '', password, status = true, email, username } = req.body;

  if (!firstname || !lastname || !idCard || !password || !email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const { rows } = await pool.query(
      `UPDATE users SET firstname = $1, lastname = $2, id_card = $3, photo = $4, password = $5, status = $6, username = $7, email = $8 WHERE id_user = $9 
      RETURNING *`, 
      [firstname, lastname, idCard, photo, password, status, username, email, idUser]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};
