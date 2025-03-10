import { getAllUsers, createNewUser, deleteUser, putUser } from "../services/user.service.js";

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

// Supprimer un utilisateur
export const removeUser = async (req, res) => {
    try {
      const userId = req.params.id; 
      console.log(req.params.id)
      await deleteUser({ userId });
      res.status(201).json({ message: "User supprimé !"});
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  };

  // Créer un utilisateur
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, password } = req.body;
    const updatedUser = await putUser({ userId,username, email, password });
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};