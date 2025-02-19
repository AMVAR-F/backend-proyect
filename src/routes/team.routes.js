// routes/teams.js
import express from 'express';
import {
    getTeams,
    getTeamById,
    insertTeam,
    deleteTeam,
    updateTeam,
    addPlayer,
    removePlayer,
    getPlayersByTeam
} from '../controllers/team.controllers.js';

const router = express.Router();

// Obtener todos los usuarios
router.get('/teams/', getTeams)

// Obtener un usuario por ID
router.get('/teams/:teamId', getTeamById)

// Crear un nuevo usuario
router.post('/teams', insertTeam)

// Eliminar un usuario por ID
router.delete('/teams/:teamId', deleteTeam)
router.put('/teams :teamId', updateTeam)

// Player routes
router.post('/:teamId/players', addPlayer);
router.delete('/:teamId/players', removePlayer);
router.get('/:teamId/players', getPlayersByTeam);

export default router;
