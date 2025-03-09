import { getAllFarmers } from "../services/farmer.service.js";

// Récupérer tous les serviteurs
export const getFarmers = async (req, res) => {
  try {
    const farmers = await getAllFarmers();
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
