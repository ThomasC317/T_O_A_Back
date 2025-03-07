import { getAllUsers, createNewUser } from "../services/user.service.js";

// Récupérer tous les utilisateurs
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Créer un utilisateur
export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await createNewUser({ username, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};