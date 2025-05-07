import { getAllItems } from "../services/item.service.js";

// ---------------
// GetItems
// ---------------
// Get all items from db
// Not used for the moment
// Maybe for a wiki later
// ---------------
// Param : 
// villageId
// servantId
// ---------------
export const getItems = async (req, res) => {
  try {
    const items = await getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// TODO : Random generate items list for the shop
// Refresh the list each 24 hours : lastgenerationdate in table ?
