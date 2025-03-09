import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Récupérer tous les items
export const getAllItems = async () => {
  return await prisma.item.findMany();
};