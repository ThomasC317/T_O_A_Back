import { getAllUsers, createNewUser, deleteUser, putUser } from "../services/user.service.js";

// ---------------
// GetUsers
// ---------------
// Get all users from the db 
// not used for the moment (management)
// ---------------
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// TODO : check how to hash the password
// ---------------
// CreateUser
// ---------------
// Add a user to the db
// Used when the player first log in
// ---------------
// Param : 
// username
// email
// Password
// ---------------
export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await createNewUser({ username, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ---------------
// RemoveUser
// ---------------
// Delete user from the db
// Not used for the moment (management)
// ---------------
// Param : 
// userId
// ---------------
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

// ---------------
// UpdateUser
// ---------------
// Update user in the db
// Not used for the moment (management and account management)
// ---------------
// Param : 
// username
// email
// password
// ---------------
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