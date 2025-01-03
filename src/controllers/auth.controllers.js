import { pool } from '../database/conection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Registrar un nuevo usuario
export const register = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (email, username, password) 
       VALUES ($1, $2, $3) RETURNING *`, 
      [email, username, hashedPassword]
    );

    const newUser = result.rows[0];
    delete newUser.password;

    const jwtSecret = process.env.JWT_SECRET || "secret123"; 
    jwt.sign(
      { id: newUser.id },
      jwtSecret,
      { expiresIn: '1h' }, 
      (err, token) => {
        if (err) {
          return res.status(500).json({ message: 'Error generating token' });
        }

        res.status(201).json({ token });
      }
    );

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating the user' });
  }
};

// Función de inicio de sesión
export const login = async (req, res) => { 
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const result = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    delete user.password;

    const adminResult = await pool.query(`SELECT * FROM admins WHERE id_user = $1`, [user.id_user]);
    const tdResult = await pool.query(`SELECT * FROM technical_directors WHERE id_user = $1`, [user.id_user]);

    if (adminResult.rows.length === 0 && tdResult.rows.length === 0) {
      return res.status(401).json({ message: 'You do not have permission to access' });
    }

    const isAdmin = adminResult.rows.length > 0;
    const isTechnicalDirector = tdResult.rows.length > 0;

    const jwtSecret = process.env.JWT_SECRET || "secret123";
    jwt.sign({ id: user.id_user, isAdmin, isTechnicalDirector }, jwtSecret, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        return res.status(500).json({ message: 'Error generating token' });
      }

      res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

      const welcomeMessage = isAdmin ? 'Welcome, Admin' : 'Welcome, Technical Director';

      res.json({ token, message: welcomeMessage });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

// Cerrar sesión
export const logout = (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production" });
  res.status(200).json({ message: "Successfully logged out" });
};

// Perfil (placeholder)
export const profile = (req, res) => res.send('profile');
