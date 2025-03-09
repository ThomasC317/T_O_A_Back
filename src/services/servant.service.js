import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Récupérer tous les serviteurs
export const getAllServants = async () => {
  return await prisma.servant.findMany();
};