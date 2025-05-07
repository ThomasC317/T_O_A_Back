import { getAllSaves, getActiveSave, createNewSave, deleteSave, setSaveLastDisconnectDate,setSaveIsActive } from "../services/save.service.js";

// ---------------
// GetSaves
// ---------------
// Get Saves from db
// Not used for the moment
// Will be used by the player if he want multiples villages
// Maybe the logic could be simplified. Like having multiple villages and no multiple saves.
// ---------------
// Param : 
// userId
// ---------------
export const getSaves = async (req, res) => {
  try {
    const users = await getAllSaves(req.userId);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ---------------
// GetSave
// ---------------
// get active save from db
// maybe not useful since we have the village logic
// ---------------
// Param : 
// userId
// ---------------
export const getSave = async (req, res) => {
    try {
      const users = await getActiveSave(req.userId);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  };

// ---------------
// CreateSave
// ---------------
// Add a save to the database
// maybe not useful since we have the village logic
// ---------------
export const createSave = async (req, res) => {
  try {
    const newSave = await createNewSave();
    res.status(201).json(newSave);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ---------------
// DeleteSave
// ---------------
// Remove a save from the db
// ---------------
// Param : 
// saveId
// ---------------
export const removeSave = async (req, res) => {
    try {
      const saveId = req.params.saveId;
      await deleteSave(req.userId,saveId);
      res.status(201).json({ message: "save supprimé !"});
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  };

// Update a save
export const updateLastDisconnectDateForSave = async (req, res) => {
  try {
    const { saveId } = req.body;
    const updatedSave = await setSaveLastDisconnectDate(req.userId,saveId);
    res.status(201).json(updatedSave);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const updateIsActiveForSave = async (req, res) => {
    try {
      const { saveId,isActive } = req.body;
      const updatedSave = await setSaveIsActive(req.userId,saveId, isActive);
      res.status(201).json(updatedSave);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  };