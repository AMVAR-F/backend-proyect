import { Router } from "express";
import upload from "../midleware/multer.js";
import {
  getTechnicalDirectorsController,
  getTechnicalDirectorController,
  createTechnicalDirectorController,
  updateTechnicalDirectorController,
  deactivateTechnicalDirectorController,
  activateTechnicalDirectorController,
} from "../controllers/technicalDirectors.controllers.js";

const router = Router();

// Obtener todos los directores técnicos
router.get("/technical_directors", getTechnicalDirectorsController);

// Obtener un director técnico por ID
router.get("/technical_directors/:id", getTechnicalDirectorController);

// Crear un nuevo director técnico
router.post(
  "/technical_directors",
  upload.single("photo"),
  createTechnicalDirectorController
);

// Actualizar un director técnico
router.put(
  "/technical_directors/:id",
  upload.single("photo"),
  updateTechnicalDirectorController
);

// Desactivar un director técnico
router.patch(
  "/technical_directors/:id/deactivate",
  deactivateTechnicalDirectorController
);

// Activar un director técnico
router.patch(
  "/technical_directors/:id/activate",
  activateTechnicalDirectorController
);

export default router;
