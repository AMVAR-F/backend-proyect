import { Router } from "express";
import {
  getTreasurersController,
  getTreasurerController,
  createTreasurerController,
  updateTreasurerByIdController,
  deactivateTreasurerController,
  activateTreasurerController,
} from "../controllers/treasurer.controller.js";

import upload from "../midleware/multer.js";
const router = Router();
// Rutas específicas para delegados
router.get("/treasurers", getTreasurersController);
router.get("/treasurers/:id", getTreasurerController);
router.post("/treasurers", upload.single("photo"), createTreasurerController);
router.put(
  "/treasurers/:id",upload.single("photo"),updateTreasurerByIdController);
router.patch("/treasurers/:id/deactivate", deactivateTreasurerController);
router.patch("/treasurers/:id/activate", activateTreasurerController);
export default router;
