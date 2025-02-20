import express from 'express';
import { PORT } from './config.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/use.routes.js'; 
import teamRoutes from './routes/team.routes.js';
import tournamentRoutes from './routes/tournament.routes.js';
import authRoutes from './routes/auth.routes.js';
import paymentRoutes from './routes/payment.routes.js'
import ReportRoutes from './routes/reports.routes.js'
import cors from 'cors';
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser()); 

// Rutas
app.use('/api/users', userRoutes); 
app.use('/api/teams', teamRoutes); 
app.use('/api/tournaments', tournamentRoutes); 
app.use('/api/payments', paymentRoutes); 
app.use('/api/auth', authRoutes); 
app.use('/api/reports', ReportRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});