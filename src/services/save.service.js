import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get all saves
export const getAllSaves = async ({userId}) => {
  return await prisma.save.findMany({
    where: {
        userId : userId
    }
  });
};

// Get save
export const getActiveSave = async ({userId}) => {
    return await prisma.save.findFirst({
        where: {AND:[{userId: userId}, {isActive:true}]  },
    });
  };

// Créer une save
export const createNewSave = async () => {
  return await prisma.save.create({
    data: { isActive:true },
  });
};

// Delete Save
export const deleteSave = async ({ userId, saveId }) => {
    const convertedUserId = parseInt(userId, 10);  
    if (isNaN(convertedUserId)) {
      throw new Error("User id invalide");
    }
    const convertedSaveId = parseInt(saveId, 10); 
    if (isNaN(convertedSaveId)) {
      throw new Error("Save id invalide");
    }
    return await prisma.save.delete({
        where: {AND:[{id: saveId}, {userId: userId}]  },
    });
  };

// Update save
export const setSaveLastDisconnectDate = async ({userId, saveId, lastDisconnectDate }) => {
    const convertedUserId = parseInt(userId, 10); 
    if (isNaN(convertedUserId)) {
      throw new Error("User id invalide");
    }
    const convertedSaveId = parseInt(saveId, 10);  
    if (isNaN(convertedSaveId)) {
      throw new Error("Save id invalide");
    }
  return await prisma.save.update({
    where: {AND:[{id: convertedSaveId}, {userId: convertedUserId}]  },
    data: {
      lastDisconnectDate: new Date()
    },
  });
};

export const setSaveIsActive = async ({userId, saveId, isActive }) => {
    const convertedUserId = parseInt(userId, 10); 
    if (isNaN(convertedUserId)) {
      throw new Error("User id invalide");
    }
    const convertedSaveId = parseInt(saveId, 10); 
    if (isNaN(convertedSaveId)) {
      throw new Error("Save id invalide");
    }
  return await prisma.save.update({
    where: {AND:[{id: convertedSaveId}, {userId: convertedUserId}]  }, 
    data: {
      isActive: isActive
    },
  });
};