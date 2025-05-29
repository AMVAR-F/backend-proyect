import {
  getAllReferees,
  getRefereeById,
  createReferee,
  updateReferee,
  deactivateReferee,
  activateReferee,
} from "../models/referee.models.js";

// Obtener todos los árbitros
export const getReferees = async (req, res) => {
  try {
    const showInactive = req.query.inactive === "true";
    const referees = await getAllReferees(showInactive);
    res.status(200).json(referees);
  } catch (error) {
    console.error("Error fetching referees:", error);
    const status = error.status || 500;
    res.status(status).json({
      message: error.message || "Error al obtener árbitros",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// Obtener un árbitro por ID
export const getReferee = async (req, res) => {
  const { id } = req.params;
  try {
    const referee = await getRefereeById(id);
    res.status(200).json(referee);
  } catch (error) {
    console.error(`Error fetching referee ${id}:`, error);
    const status = error.status || 500;
    res.status(status).json({
      message: error.message || "Error al obtener árbitro",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// Crear un nuevo árbitro
export const createRefereeController = async (req, res) => {
  try {
    console.log("Datos recibidos:", {
      body: req.body,
      file: req.file,
    });

    // Verificar campos requeridos
    if (!req.body.firstname || !req.body.lastname || !req.body.id_card) {
      return res.status(400).json({
        success: false,
        message: "Faltan campos requeridos",
        required: ["firstname", "lastname", "id_card"],
      });
    }

    const newReferee = await createReferee({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      id_card: req.body.id_card,
      gen: req.body.gen || "M",
      date_of_birth: req.body.date_of_birth
        ? new Date(req.body.date_of_birth)
        : null,
      photo: req.file?.buffer,
      status: true,
    });

    res.status(201).json({
      success: true,
      message: "Árbitro creado exitosamente",
      referee: newReferee,
    });
  } catch (error) {
    console.error("Error creating referee:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error al crear árbitro",
    });
  }
};
// Actualizar un árbitro
export const updateRefereeController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID no proporcionado" });
    }

    console.log("Datos recibidos:", req.body); // Para depuración

    const updatedReferee = await updateReferee(id, {
      ...req.body,
      photo: req.file?.buffer,
      date_of_birth: req.body.date_of_birth,
      gen: req.body.gen,
    });

    res.status(200).json({
      success: true,
      message: "Árbitro actualizado correctamente",
      referee: updatedReferee,
    });
  } catch (error) {
    console.error("Error updating referee:", error);
    const status = error.status || 500;
    res.status(status).json({
      success: false,
      message: error.message || "Error al actualizar árbitro",
    });
  }
};
// Desactivar un árbitro
export const deactivateRefereeController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID no proporcionado" });
    }

    const result = await deactivateReferee(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deactivating referee:", error);
    const status = error.status || 500;
    res.status(status).json({
      success: false,
      message: error.message || "Error al desactivar árbitro",
    });
  }
};

// Activar un árbitro
export const activateRefereeController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID no proporcionado" });
    }

    const result = await activateReferee(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error activating referee:", error);
    const status = error.status || 500;
    res.status(status).json({
      success: false,
      message: error.message || "Error al activar árbitro",
    });
  }
};
