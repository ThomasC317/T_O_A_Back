import { getAllItems } from "../services/item.service.js";

// Récupérer tous les items
export const getItems = async (req, res) => {
  try {
    const items = await getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
