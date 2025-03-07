import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Récupérer tous les utilisateurs
export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

// Créer un utilisateur
export const createNewUser = async ({ username, email, password }) => {
  return await prisma.user.create({
    data: { username, email, password },
  });
};

// Supprimer un utilisateur
export const deleteUser = async ({ userId }) => {
    const convertedId = parseInt(userId, 10);  // Convertir userId en nombre entier
    if (isNaN(convertedId)) {
      throw new Error("ID invalide");
    }
    return await prisma.user.delete({
      where: { id: convertedId },
    });
  };

// Update un utilisateur
export const putUser = async ({userId, username, email, password }) => {
  const id = parseInt(userId, 10);  // Assurez-vous que userId est un nombre entier
  console.log(id);
  if (isNaN(id)) {
    throw new Error("ID invalide");
  }
  
  return await prisma.user.update({
    where: { id: id },  // ID de l'utilisateur à mettre à jour
    data: {
      username: username,  // Nouveau username
      email: email,        // Nouveau email
      password: password
    },
  });
};