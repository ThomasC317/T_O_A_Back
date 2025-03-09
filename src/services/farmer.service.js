import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Récupérer tous les farmers
export const getAllFarmers = async () => {
  return await prisma.servant.findMany();
};