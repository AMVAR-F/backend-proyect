import {
  getAllUsers,
  getUserById,
  insertUser,
  deleteUserById,
  updateUserById
} from '../models/users.models.js';

// Obtener todos los usuarios
export const getusers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Obtener un usuario por ID
export const getuser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user.length) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

// Crear un usuario
export const createusers = async (req, res) => {
  const { firstname, lastname, idCard, photo, password, status, email, username, role, date_of_birth, gen, type_position } = req.body;
  try {
    if (role === 'player' && (!date_of_birth || !gen || !type_position)) {
      return res.status(400).json({ error: 'Player role requires date_of_birth, gen, and type_position fields' });
    }
    const newUser = await insertUser({ firstname, lastname, idCard, photo, password, status, email, username, role, date_of_birth, gen, type_position });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Actualizar un usuario
export const updateusers = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, idCard, photo, password, status, email, username, role, date_of_birth, gen, type_position } = req.body;
  try {
    if (role === 'player' && (!date_of_birth || !gen || !type_position)) {
      return res.status(400).json({ error: 'Player role requires date_of_birth, gen, and type_position fields' });
    }
    const updatedUser = await updateUserById(id, { firstname, lastname, idCard, photo, password, status, email, username, role, date_of_birth, gen, type_position });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

// Eliminar un usuario
export const deleteusers = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUserById(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};
