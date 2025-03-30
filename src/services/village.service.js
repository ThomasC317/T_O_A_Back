import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Récupérer le village
export const getVillage = async (villageId) => {
  return await prisma.village.findFirst({
    where: {
      id: villageId
    }
  });
};

// Créer un village
export const createVillage = async (villageName, saveId) => {
  return await prisma.village.create({
    data: { 
      villageName:villageName,
      saveId: saveId,      
    },
  });
};

// Update resources from village 
export const updateResource = async (villageId, newResource) => {
  return await prisma.village.update({
    where: { id: villageId },
    data: {
      resource: {
        increment: newResource
      },
      totalResource: {
        increment: newResource
      },
      lastActivity: new Date()
    }
  })
}

// Update les resources per second 
export const updateResourcePerSecond = async (villageId, newResourcePerSecond) => {
  return await prisma.village.update({
    where: { id: villageId },
    data: {
      resourcePerSecond: {
        increment: newResourcePerSecond
      }
    }
  })
}

// Update remaining point
export const updateRemainingPoints = async (villageId, pointsToAdd) => {
  return await prisma.village.update({
    where: { id: villageId },
    data: {
      remainingSkillPoints: {
        increment: pointsToAdd
      }
    }
  })
}

// Update level 
export const updateLevel = async (villageId) => {
  return await prisma.village.update({
    where: { id: villageId },
    data: {
      level: {
        increment: 1
      }
    }
  })
}

// UPdate nom village
export const updateVillageName = async (villageId, villageName) => {
  return await prisma.village.update({
    where: { id: villageId },
    data: {
      villageName: villageName 
    }
  })
}


// Add skill on level up talent
export const addSkillPoint = async (villageId, statId,level,assignedPoints) => {
  return await prisma.skill.create({
    data: {
      villageId: villageId,
      statId: statId,
      level: level,
      assignedPoints: assignedPoints
    }
  })
}


// Get villageFarmers
export const getAllVillageFarmers = async (villageId) => {
  return await prisma.villageFarmer.findMany({
    where: { villageId: villageId },
  });
};

// Add village farmer
export const createVillageFarmer = async (villageId, farmerId ) => {
  const villager = await prisma.farmer.findFirst({where:{
    id: farmerId
  }})
  return await prisma.villageFarmer.create({
    data: { 
      villageId:villageId,
      farmerId: villager.id,
      isActive:false,
      level:1,
      quality:villager.quality,
      resourcePerSecond:villager.resourcePerSecond
    },
  });
};

// Update village Farmer (is active)
export const setVillageFarmerIsActive = async (villageFarmerId, isActive) => {
  const villageFarmer = await prisma.villageFarmer.findUnique({
    where: { id: villageFarmerId },
    include: { village: true }, // Récupérer le village associé
  });

  if (!villageFarmer) {
    throw new Error("VillageFarmer non trouvé");
  }

  const resourceChange = isActive ? villageFarmer.resourcePerSecond : -villageFarmer.resourcePerSecond;

  return await prisma.$transaction([
    prisma.villageFarmer.update({
      where: { id: villageFarmerId },
      data: { isActive },
    }),
    prisma.village.update({
      where: { id: villageFarmer.villageId },
      data: { resource: { increment: resourceChange } },
    }),
  ]);
}

// Update village Farmer (level + nextupgradecost + resource per second)
export const setVillageFarmerLevel = async (villageFarmerId, nextUpgradeCost, newResourcePerSecond) => {
  const villageFarmer = await prisma.villageFarmer.findUnique({
    where: { id: villageFarmerId },
    include: { village: true }, // Récupérer le village associé
  });

  if (!villageFarmer) {
    throw new Error("VillageFarmer non trouvé");
  }
  
  return await prisma.$transaction([
    prisma.village.update({
      where: { id: villageFarmer.villageId },
      data: { 
        resource: { 
          decrement: villageFarmer.nextUpgradeCost 
        },
        resourcePerSecond: {
          increment: newResourcePerSecond
        }
       },
    }),
    prisma.villageFarmer.update({
      where: { id: villageFarmerId },
      data: { 
        resourcePerSecond:newResourcePerSecond,
        nextUpgradeCost: nextUpgradeCost 
      },
    })
  ]);
}




// Add village Item
export const createVillageItem = async (villageId, itemId ) => {
  return await prisma.villageItem.create({
    data: { 
      villageId:villageId,
      itemId: villager.id,
      apogeeLevel: 1,
    },
  });
};

// Get village items
export const getAllVillageItems = async (villageId) => {
  return await prisma.villageItem.findMany({
    where: { id: villageId },
  });
};

// Get apogeeVillage (get last)
export const getApogeeVillage = async (villageId) => {
  const villageApogee = await prisma.villageApogee.findUnique({
    where: { 
      villageId: villageId 
    },
    orderBy: {
      id: 'desc',
  },
  take: 1,
  });

  return await prisma.apogee.findUnique({
    where: {
      id:villageApogee.apogeeId
    }
  })
};


// Add apogeeVillage 
export const createApogeeVillage = async (villageId, apogeeId) => {
  return await prisma.villageApogee.create({
    data: { 
      villageId:villageId,
      apogeeId: apogeeId,
    },
  });
};

// Get VillageServants 
export const getAllVillageServants = async (villageId) => {
  return await prisma.villageServant.findMany({
    where: { villageId: villageId },
  });
};

// Add villageServant
export const createVillageServant = async (villageId, servantId ) => {
  return await prisma.villageFarmer.create({
    data: { 
      villageId:villageId,
      servantId: servantId,
    },
  });
};

// Add villageFarmerVillageItem
// Get villageFarmerVillageItem

// Get villageShop
// Set villageShop (get random items, reseted every day?)

// Update village Farmer (quality)

// Update total resource generated
