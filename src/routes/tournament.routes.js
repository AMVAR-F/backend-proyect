import { Router } from 'express';
import {
  getChampionships,
  getChampionshipById,
  insertChampionship,
  deleteChampionship,
  updateChampionship
} from '../controllers/tournament.controllers.js';

const router = Router();


router.get('/championships', getChampionships);
router.get('/championships/:championshipId', getChampionshipById);
router.post('/championships', insertChampionship);
router.delete('/championships/:championshipId', deleteChampionship);
router.put('/championships/:championshipId', updateChampionship);

export default router