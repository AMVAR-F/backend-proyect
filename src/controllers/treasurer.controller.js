import {
  getAllTreasurers,
  getTreasurerById,
  createTreasurer,
  updateTreasurerById, 
  deactivateTreasurerById,
  activateTreasurerById,
} from "../models/treasurer.model.js";
// Obtener todos los delegados

export const getTreasurersController = async (req, res) => {
  try {
    const showInactive = req.query.inactive === "true";
    const treasurers = await getAllTreasurers();

    const filtered = showInactive
      ? treasurers.filter((t) => t.status === false)
      : treasurers.filter((t) => t.status !== false);

    res.status(200).json(filtered);
  } catch (error) {
    console.error("Error fetching treasurers:", error);
    res.status(500).json({
      error: "Error fetching treasurers",
      details: error.message,
    });
  }
};

// Obtener delegado por ID
export const getTreasurerController = async (req, res) => {
  try {
    const treasurer = await getTreasurerById(req.params.id);
    if (!treasurer) {
      return res.status(404).json({ message: "Delegado no encontrado" });
    }
    res.status(200).json(treasurer);
  } catch (error) {
    console.error("Error fetching treasurer:", error);
    res.status(500).json({
      error: "Error fetching treasurer",
      details: error.message,
    });
  }
};

// Crear delegado
export const createTreasurerController = async (req, res) => {
  try {
    const { firstname, lastname, id_card, gen, date_of_birth } = req.body;

    if (!firstname || !lastname || !id_card) {
      return res.status(400).json({
        message: "Faltan campos requeridos",
        required: ["firstname", "lastname", "id_card"],
      });
    }

    const newTreasurer = await createTreasurer({
      firstname,
      lastname,
      id_card,
      photo: req.file?.buffer,
      gen,
      date_of_birth,
    });

    res.status(201).json({
      success: true,
      message: "Delegado creado exitosamente",
      treasurer: newTreasurer,
    });
  } catch (error) {
    console.error("Error creating treasurer:", error);
    const status = error.message === "La cédula ya existe" ? 409 : 500;
    res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};

// Actualizar delegado
export const updateTreasurerByIdController = async (req, res) => {
  try {
    const result = await updateTreasurerById(req.params.id, {
      ...req.body,
      photo: req.file?.buffer,
    });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating treasurer:", error);
    res.status(500).json({
      message: error.message || "Error al actualizar delegado",
    });
  }
};

// Desactivar delegado
export const deactivateTreasurerController = async (req, res) => {
  try {
    const result = await deactivateTreasurerById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deactivating treasurer:", error);
    res.status(500).json({
      message: error.message || "Error al desactivar delegado",
    });
  }
};

// Activar delegado
export const activateTreasurerController = async (req, res) => {
  try {
    const result = await activateTreasurerById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error activating treasurer:", error);
    res.status(500).json({
      message: error.message || "Error al activar delegado",
    });
  }
};
