import { Router } from 'express';
import {
  getReports,
  getReport,
  createReport,
  deleteReport,
  updateReport
} from '../controllers/reports.controllers.js';

const router = Router();

// Obtener todos los informes
router.get('/reports', getReports);

// Obtener un informe por ID
router.get('/reports/:reportId', getReport);

// Crear un nuevo informe
router.post('/reports', createReport);

// Eliminar un informe por ID
router.delete('/reports/:reportId', deleteReport);

// Actualizar un informe por ID
router.put('/reports/:reportId', updateReport);

export default router;
