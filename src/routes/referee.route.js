import { Router } from "express";
import upload from "../midleware/multer.js";
import {
  getReferees,
  getReferee,
  createRefereeController,
  updateRefereeController,
  deactivateRefereeController,
  activateRefereeController
} from "../controllers/referee.controllers.js";

const router = Router();

// Obtener todos los árbitros
router.get("/referees", getReferees);

// Obtener un árbitro específico por ID
router.get("/referees/:id", getReferee);

// Crear un nuevo árbitro
router.post("/referees", upload.single("photo"), createRefereeController);

// Actualizar un árbitro
router.put("/referees/:id", upload.single("photo"), updateRefereeController);

// Desactivar un árbitro
router.patch("/referees/:id/deactivate", deactivateRefereeController);

// Activar un árbitro
router.patch("/referees/:id/activate", activateRefereeController);

export default router;