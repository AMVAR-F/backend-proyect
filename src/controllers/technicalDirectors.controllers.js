import {
  getAllTechnicalDirectors,
  getTechnicalDirectorById,
  createTechnicalDirector,
  updateTechnicalDirector,
  deactivateTechnicalDirector,
  activateTechnicalDirector,
} from "../models/technicalDirectors.models.js";
import { bufferToBase64 } from "../utils/helpers.js";

// Obtener todos los directores técnicos
export const getTechnicalDirectorsController = async (req, res) => {
  try {
    const showInactive = req.query.inactive === "true";
    const technicalDirectors = await getAllTechnicalDirectors(showInactive);

    // Convertir imágenes a base64 si es necesario
    const formattedDirectors = technicalDirectors.map((director) => ({
      ...director,
      photo: bufferToBase64(director.photo),
    }));

    res.status(200).json(formattedDirectors);
  } catch (error) {
    console.error("Error fetching technical directors:", error);
    const status = error.status || 500;
    res.status(status).json({
      message: error.message || "Error al obtener directores técnicos",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// Obtener un director técnico por ID
export const getTechnicalDirectorController = async (req, res) => {
  try {
    const { id } = req.params;
    const director = await getTechnicalDirectorById(id);

    // Convertir imagen a base64 si es necesario
    const formattedDirector = {
      ...director,
      photo: bufferToBase64(director.photo),
    };

    res.status(200).json(formattedDirector);
  } catch (error) {
    console.error(`Error fetching technical director ${req.params.id}:`, error);
    const status = error.status || 500;
    res.status(status).json({
      message: error.message || "Error al obtener director técnico",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// Crear un nuevo director técnico
export const createTechnicalDirectorController = async (req, res) => {
  try {
    // Validar campos requeridos
    if (!req.body.firstname || !req.body.lastname || !req.body.id_card) {
      return res.status(400).json({
        message: "Faltan campos requeridos",
        required: ["firstname", "lastname", "id_card"],
      });
    }

    const newDirector = await createTechnicalDirector({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      id_card: req.body.id_card,
      photo: req.file?.buffer,
      gen: req.body.gen,
      date_of_birth: req.body.date_of_birth,
      status: true,
    });

    res.status(201).json({
      success: true,
      message: "Director técnico creado exitosamente",
      director: newDirector,
    });
  } catch (error) {
    console.error("Error creating technical director:", error);
    const status = error.status || 500;
    res.status(status).json({
      success: false,
      message: error.message || "Error al crear director técnico",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// Actualizar un director técnico
export const updateTechnicalDirectorController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDirector = await updateTechnicalDirector(id, {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      id_card: req.body.id_card,
      photo: req.file?.buffer,
      gen: req.body.gen,
      date_of_birth: req.body.date_of_birth,
      status: req.body.status,
    });

    res.status(200).json({
      success: true,
      message: "Director técnico actualizado correctamente",
      director: updatedDirector,
    });
  } catch (error) {
    console.error(`Error updating technical director ${req.params.id}:`, error);
    const status = error.status || 500;
    res.status(status).json({
      success: false,
      message: error.message || "Error al actualizar director técnico",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// Desactivar un director técnico
export const deactivateTechnicalDirectorController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deactivateTechnicalDirector(id);

    res.status(200).json(result);
  } catch (error) {
    console.error(
      `Error deactivating technical director ${req.params.id}:`,
      error
    );
    const status = error.status || 500;
    res.status(status).json({
      success: false,
      message: error.message || "Error al desactivar director técnico",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// Activar un director técnico
export const activateTechnicalDirectorController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await activateTechnicalDirector(id);

    res.status(200).json(result);
  } catch (error) {
    console.error(
      `Error activating technical director ${req.params.id}:`,
      error
    );
    const status = error.status || 500;
    res.status(status).json({
      success: false,
      message: error.message || "Error al activar director técnico",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
