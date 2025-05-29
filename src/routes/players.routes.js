import { Router } from "express";
import upload from "../midleware/multer.js";
import {
  getPlayers,
  getPlayer,
  createNewPlayer,
  updateExistingPlayer,
  deactivateExistingPlayer,
  activateExistingPlayer,
} from "../controllers/players.controllers.js";

const router = Router();

// Obtener todos los jugadores
router.get("/players", getPlayers);

// Obtener un jugador específico por ID
router.get("/players/:id", getPlayer);

// Crear un nuevo jugador (con manejo de foto)
router.post("/players", upload.single("photo"), createNewPlayer);

// Actualizar un jugador existente (con manejo de foto)
router.put("/players/:id", upload.single("photo"), updateExistingPlayer);

// Desactivar un jugador
router.patch("/players/:id/deactivate", deactivateExistingPlayer);

// Activar un jugador
router.patch("/players/:id/activate", activateExistingPlayer);

export default router;
