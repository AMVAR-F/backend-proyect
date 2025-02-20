import * as UserModel from '../models/auth.models.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newUser = await UserModel.createUser(email, username, password);
    delete newUser.password;

    const jwtSecret = process.env.JWT_SECRET || "secret123"; 
    const token = jwt.sign({ id: newUser.id }, jwtSecret, { expiresIn: '1h' });

    res.status(201).json({ token });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'This email already exists'});
  }
};


export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const user = await UserModel.findUserByUsername(username);
    console.log('Usuario encontrado:', user);

    if (!user) {
        return res.status(401).json({ message: 'Incorrect username' });
    }

    console.log('Contraseña proporcionada:', password); // Contraseña en texto plano (para depuración)
    console.log('Contraseña almacenada:', user.password); // Hash almacenado

    const hashIngresado = await bcrypt.hash(password, 10); // Hash de la contraseña ingresada
    console.log('Hash de la contraseña ingresada:', hashIngresado); // Imprime el hash

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('¿Contraseña válida?', isPasswordValid); // Debe ser true si las contraseñas coinciden

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect password' });
    }

    

    const jwtSecret = process.env.JWT_SECRET || "secret123";
    const token = jwt.sign({ id: user.id_user }, jwtSecret, { expiresIn: '1h' });

    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

    res.json({ token, message: 'Login successful', user });

  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

export const logout = (req, res) => {
  
  res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: 'strict' });
  res.status(200).json({ message: "Successfully logged out" });
};

// Perfil con funcionalidad de editar
export const profile = async (req, res) => {
  try {

    const userId = req.user.id; 
    const userProfileData = await UserModel.findUserById(userId); 

    if (!userProfileData) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(userProfileData);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching profile data', error: error.message });
  }
};

// Método para actualizar el perfil
// export const updateProfile = async (req, res) => {
//   try {
//     const userId = req.user.id; 
   
//    // Si se proporciona una nueva contraseña
//    if(req.body.password){
//       req.body.password = await bcrypt.hash(req.body.password, 10);
//    }

//    await UserModel.updateUserProfile(userId, req.body);
    
//    res.status(200).json({ message: 'Profile updated successfully' });
    
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error updating profile', error: error.message });
//   }
// };

// // Función para solicitar el restablecimiento de contraseña
// export const requestResetPassword = async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: 'Email is required' });
//   }

//   try {
//     const user = await UserModel.findUserByEmail(email); 

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const token = jwt.sign({ id: user.id_user }, process.env.JWT_SECRET || "secret123", { expiresIn: '1h' });

//     // Configura Nodemailer para enviar el correo electrónico
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       port: 587,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Restablecimiento de Contraseña',
//       text: `Haz clic en el siguiente enlace para restablecer tu contraseña: http://localhost:3000/api/auth/reset-password/${token}`,
//     };

//     await transporter.sendMail(mailOptions);
    
//     res.status(200).json({ message: 'Correo enviado para restablecer la contraseña' });
    
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error al solicitar el restablecimiento de contraseña', error: error.message });
//   }
// };

// // Función para restablecer la contraseña
// export const resetPassword = async (req, res) => {
//   const { token } = req.params;
//   const { newPassword } = req.body;

//   if (!newPassword) {
//     return res.status(400).json({ message: 'New password is required' });
//   }

//   try {
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
    
//     await UserModel.updateUserPassword(decodedToken.id, hashedPassword); // Asegúrate de agregar este método en tu modelo

//     res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
    
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: 'Token inválido o expirado', error: error.message });
//   }
// };
