import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = req.cookies.token; 
  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || "secret123";
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // Almacena la información del usuario en el objeto de solicitud
    next(); // Pasa al siguiente middleware o controlador
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
