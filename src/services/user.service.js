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