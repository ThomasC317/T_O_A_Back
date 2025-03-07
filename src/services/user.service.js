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