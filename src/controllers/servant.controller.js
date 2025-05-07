import { getAllServants } from "../services/servant.service.js";

// ---------------
// GetServants
// ---------------
// Get All servants from db
// Not used for the moment
// Maybe for a wiki later
// ---------------
export const getServants = async (req, res) => {
  try {
    const servants = await getAllServants();
    res.json(servants);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
