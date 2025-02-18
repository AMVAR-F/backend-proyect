import { pool } from '../database/conection.js';
import { 
  getAllUsers, 
  getUserById, 
  insertUser, 
  deleteUserById, 
  updateUserById 
} from '../models/users.models.js';

export const getusers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving the users' });
  }
};

export const createusers = async (req, res) => {
  const { idUser } = req.params;
  try {
    const users = await getUserById(idUser);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(users[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error' });
  }
};


export const insertusers = async (req, res) => {
  const { firstname, lastname, id_card: idCard, photo = '', password, status = true, email, username, role } = req.body;

  if (!firstname || !lastname || !idCard || !password || !email || !role) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const validRoles = ['technical_director', 'treasurer', 'admin'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const user = await insertUser({ firstname, lastname, idCard, photo, password, status, email, username, role });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error inserting user' });
  }
};

export const deleteusers = async (req, res) => {
  const { idUser } = req.params;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Eliminar de las tablas de roles antes de eliminar el usuario
    await client.query('DELETE FROM technical_directors WHERE id_user = $1', [idUser]);
    await client.query('DELETE FROM treasurer WHERE id_user = $1', [idUser]);
    await client.query('DELETE FROM admins WHERE id_user = $1', [idUser]);

    const { rows, rowCount } = await deleteUserById(idUser, client);

    if (rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'User not found' });
    }

    await client.query('COMMIT');

    res.json({ message: 'User deleted successfully', user: rows[0] });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ message: 'Error deleting user' });
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
    const users = await updateUserById(idUser, { firstname, lastname, idCard, photo, password, status, email, username });
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(users[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user' });
  }
};
