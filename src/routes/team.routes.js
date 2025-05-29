// routes/teams.js
import express from 'express';
import {
    getTeams,
    getTeamWithPlayers,
    insertTeam,
    deleteTeam,
    updateTeam,
    addPlayer,
    removePlayer,
} from '../controllers/team.controllers.js';

const router = express.Router();

// Obtener todos los equipos
router.get('/teams/', getTeams)

// Obtener un usuario por ID
router.get('/teams/:teamId/with-players', getTeamWithPlayers);

// Crear un nuevo usuario
router.post('/teams', insertTeam)

// Eliminar un usuario por ID
router.delete('/teams/:teamId', deleteTeam)
router.put('/teams :teamId', updateTeam)

// Player routes
router.post('/:teamId/players', addPlayer);
router.delete('/:teamId/players', removePlayer);

export default router;
