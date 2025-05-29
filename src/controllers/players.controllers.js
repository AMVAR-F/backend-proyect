import {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deactivatePlayer,
  activatePlayer,
} from "../models/players.models.js";
import {uploadDir} from "../midleware/multer.js";

// Obtener todos los jugadores
export const getPlayers = async (req, res) => {
  try {
    const showInactive = req.query.inactive === "true";
    const players = await getAllPlayers(showInactive);
    res.status(200).json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(error.status || 500).json({
      message: error.message || "Error al obtener jugadores",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// Obtener un jugador por ID
export const getPlayer = async (req, res) => {
  try {
    const player = await getPlayerById(req.params.id);
    
    if (player.photo) {
      // Siempre devolver como base64
      player.photo = `data:image/jpeg;base64,${player.photo.toString('base64')}`;
    }
    
    res.status(200).json(player);
  } catch (error) {
    console.error(`Error fetching player ${req.params.id}:`, error);
    res.status(error.status || 500).json({
      message: error.message || "Error al obtener jugador",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// Crear un nuevo jugador

export const createNewPlayer = async (req, res) => {
  try {
    const photoPath = req.file?.path;
    
    if (req.file) {
      photoPath = req.file.path; // Usar la ruta del archivo guardado
    }

    const newPlayer = await createPlayer({
      id_card: req.body.id_card,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      date_of_birth: req.body.date_of_birth,
      photo: photoPath, // Enviar la ruta del archivo
      gen: req.body.gen,
      type_position: req.body.type_position,
      id_shirt: req.body.id_shirt,
    });

    res.status(201).json({
      success: true,
      message: "Jugador creado exitosamente",
      player: newPlayer,
    });
  } catch (error) {
  }
};

// Actualizar un jugador existente
export const updateExistingPlayer = async (req, res) => {
  try {
    const photoPath = req.file?.path;
    
    if (req.file) {
      photoPath = req.file.path; 
    }
    const updatedPlayer = await updatePlayer(req.params.id, {
      id_card: req.body.id_card,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      date_of_birth: req.body.date_of_birth,
      photo: photoPath,
      gen: req.body.gen,
      type_position: req.body.type_position,
      id_shirt: req.body.id_shirt,
    });

    res.status(200).json({
      success: true,
      message: "Jugador actualizado correctamente",
      player: updatedPlayer,
    });
  } catch (error) {
    console.error(`Error updating player ${req.params.id}:`, error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Error al actualizar jugador",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// Desactivar un jugador
export const deactivateExistingPlayer = async (req, res) => {
  try {
    const result = await deactivatePlayer(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error(`Error deactivating player ${req.params.id}:`, error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Error al desactivar jugador",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// Activar un jugador
export const activateExistingPlayer = async (req, res) => {
  try {
    const result = await activatePlayer(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error(`Error activating player ${req.params.id}:`, error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Error al activar jugador",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
