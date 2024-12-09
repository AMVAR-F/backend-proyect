import express from 'express';
import { PORT } from './config.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/use.routes.js'; // Corrección en el nombre del archivo
import teamRoutes from './routes/team.routes.js';
import tournamentRoutes from './routes/tournament.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser()); 

// Rutas
app.use('/api/users', userRoutes); // Prefijo para las rutas de usuarios
app.use('/api/teams', teamRoutes); // Prefijo para las rutas de equipos
app.use('/api/tournaments', tournamentRoutes); // Prefijo para las rutas de torneos
app.use('/api/auth', authRoutes); // Prefijo para las rutas de autenticación

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});