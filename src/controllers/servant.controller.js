import { getAllServants } from "../services/servant.service.js";

// Récupérer tous les serviteurs
export const getServants = async (req, res) => {
  try {
    const servants = await getAllServants();
    res.json(servants);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
