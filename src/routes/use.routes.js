import { Router } from 'express';
import {
  getusers,
  getuser,
  createusers, 
  updateusers,
  deleteusers
} from '../controllers/users.controllers.js';

const router = Router();

router.get('/users', getusers);
router.get('/users/:id', getuser);
router.post('/users', createusers); 
router.put('/users/:id', updateusers);
router.delete('/users/:id', deleteusers);

export default router;
