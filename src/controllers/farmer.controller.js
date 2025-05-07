import { getAllFarmers } from "../services/farmer.service.js";

// ---------------
// getFarmers
// ---------------
// get all farmers from db
// Not used for the moment
// Maybe for a wiki later
// ---------------
// Param : 
// villageId
// servantId
// ---------------
export const getFarmers = async (req, res) => {
  try {
    const farmers = await getAllFarmers();
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
