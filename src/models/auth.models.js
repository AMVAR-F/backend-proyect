import { pool } from '../database/conection.js';
import bcrypt from 'bcrypt';


export const createUser = async (email, username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO users (email, username, password) 
     VALUES ($1, $2, $3) RETURNING *`, 
    [email, username, hashedPassword]
  );
  return result.rows[0];
};


export const findUserByUsername = async (username) => {
  const result = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
  return result.rows[0];
};

export const findUserById = async (userId) => {
  const result = await pool.query(`SELECT * FROM users WHERE id_user = $1`, [userId]);
  return result.rows[0]; 
};

export const findAdminByUserId = async (userId) => {
  const result = await pool.query(`SELECT * FROM admins WHERE id_user = $1`, [userId]);
  return result.rows;
};

export const findTechnicalDirectorByUserId = async (userId) => {
  const result = await pool.query(`SELECT * FROM technical_directors WHERE id_user = $1`, [userId]);
  return result.rows;
};

// Método para actualizar el perfil del usuario
export const updateUserProfile = async (userId, updates) => {
  const { firstname, lastname, idCard, photo, password, status, username, email } = updates; 

  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  await pool.query(
    `UPDATE users SET firstname = $1, lastname = $2, id_card = $3, photo = $4, password = $5, status = $6, username = $7, email = $8 WHERE id_user = $9 
    RETURNING *`, 
    [firstname, lastname, idCard, photo, hashedPassword || null, status, username, email, userId]
  );
};
// Método para encontrar un usuario por correo electrónico
export const findUserByEmail = async (email) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0]; 
};
 // Método para actualizar la contraseña del usuario
// export const updateUserPassword = async (userId, newPassword) => {
//   const hashedPassword = await bcrypt.hash(newPassword, 10); // Hashea la nueva contraseña
//   await pool.query(
//     `UPDATE users SET password = $1 WHERE id_user = $2`,
//     [hashedPassword, userId]
//   );
// };
