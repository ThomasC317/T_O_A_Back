import { getVillage,createVillage,updateResource,updateResourcePerTick,updateRemainingPoints,updateLevel,updateVillageName,addSkillPoint,getAllVillageFarmers,createVillageFarmer,setVillageFarmerIsActive,setVillageFarmerLevel,createVillageItem,getAllVillageItems,getApogeeVillage,createApogeeVillage,getAllVillageServants,createVillageServant} from "../services/village.service.js";

// TODO : ADD Village chief, farmers, servants
// ---------------
// GET Village
// ---------------
// Initialising village method
// Used when logging in
// ---------------
// Param : 
// villageId
export const GetVillage = async (req, res) => {
  try {
    const villageId = parseInt(req.params.id, 10);

    // Validation de l'ID
    if (isNaN(villageId)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    // Récupération du village
    const village = await getVillage(villageId);
    if (!village) {
      return res.status(404).json({ message: "Village non trouvé" });
    }

    console.log("Village récupéré", village);

    // Calcul du temps d'inactivité et des ressources AFK
    const time = (new Date() - new Date(village.lastActivity));  // Assurez-vous que lastActivity est une date valide
    if (isNaN(time)) {
      return res.status(400).json({ message: "Erreur lors du calcul du temps d'inactivité" });
    }
    const afkResources = Math.floor((time / 1000) * village.resourcePerSecond);

    // Mise à jour des ressources
    const result = await updateResource(villageId, afkResources);
    if (!result) {
      return res.status(404).json({ message: "Mise à jour des ressources échouée" });
    }

    // Récupérer le village après mise à jour (si vous souhaitez renvoyer l'état actualisé)
    const updatedVillage = await getVillage(villageId);

    // Répondre avec le village mis à jour et les ressources AFK calculées
    res.json({ village: updatedVillage, afkResources });
  } catch (error) {
    // Gestion des erreurs serveur avec détails supplémentaires
    console.error("Erreur serveur :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ---------------
// Create village
// ---------------
// Add a village in db for the current user
// Used by adding a new save in the game
// ---------------
// Param : 
// Village Name
// Save Id
// ---------------

export const CreateVillage = async (req, res) => {
  try {
    const { villageName, saveId } = req.body;
    const newUser = await createVillage({ villageName, saveId });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

//TODO : methode createchiefvillage
// ---------------
// Create chief village
// ---------------
// Add a chief village for the current village
// Used when creating a village and when the player want to do an apogee.
// No apogee bonus, so players can try multiples chiefs without constraint
// ---------------
// Param : 
// Village chief Id
// Village Id
// ---------------

export const CreateChiefVillage = async (req,res) => {
  try {
    const { villageChiefName, role, villageId } = req.body;
    const newChiefVillage = await createChiefVillage({ villageChiefName, role, villageId});
    res.status(201).json(newChiefVillage);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ---------------
// Update ressource
// ---------------
// Update resources for each tick
// Used by the front on every tick, and in the init method to calculate the resources earned
// while being AFK.
// ---------------
// Param : 
// villageId
// newResource
// ---------------

export const UpdateResource = async (req, res) => {
  try {
    // const { villageId, newResource } = req.body;
    const villageId = parseInt(req.params.id, 10);
    const newResource = parseInt(req.body.newResource, 10);
    console.log("VillageId", villageId);
    console.log("newResource", newResource);
    if (isNaN(villageId)) {
      return res.status(400).json({ message: "ID invalide" });
    }
    if (!newResource) {
      return res.status(400).json({ message: "Resource invalide" });
    }
    const updatedUser = await updateResource(villageId, newResource);
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// TODO : update by using villageStats
// ---------------
// Update Resource by second
// ---------------
// Update resource earned by each ticks
// Used when equiping an item, a farmer, a chief, a servant.
// ---------------
// Param : 
// villageId
// newResourcePerTick
// ---------------

export const UpdateResourcePerTick = async (req, res) => {
    try {
      const { villageId, newResourcePerTick } = req.body;
      const updatedUser = await updateResourcePerTick({villageId, newResourcePerTick});
      res.status(201).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  };

// Maybe later, when the achievements will be there, and could reward some skill points
// ---------------
// Update Remaining Skill points
// ---------------
// Add available skill points for user, to add new stats for the village
// Not used for the moment
// ---------------
// Param : 
// villageId
// newResourcePerTick
// ---------------
// export const UpdateRemainingPoints = async (req, res) => {
//     try {
//         const { villageId, pointsToAdd } = req.body;
//         const updatedUser = await updateRemainingPoints({villageId, pointsToAdd});
//         res.status(201).json(updatedUser);
//     } catch (error) {
//         res.status(500).json({ message: "Erreur serveur", error: error.message });
//     }
// };

// TODO : add unasigned talents points
// ---------------
// Update the village level
// ---------------
// Set level + 1 for the village
// Used when the player gained enough xp. 
// Give available skill points to player.
// ---------------
// Param : 
// villageId
// ---------------
export const UpdateLevel = async (req, res) => {
    try {
        const updatedLevel = await updateLevel(req.params.id);
        res.status(201).json(updatedLevel);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// TODO : lock name change to one time per week. Maybe paid feature later.
// ---------------
// Update Village Name
// ---------------
// Add available skill points for user, to add new stats for the village
// Not used for the moment
// ---------------
// Param : 
// villageId
// newVillageName
// ---------------
export const UpdateVillageName = async (req, res) => {
    try {
        const updatedVillageName = await updateVillageName(req.params.id,req.body);
        res.status(201).json(updatedVillageName);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// TODO : Edit village stat with new stats
// ---------------
// Add Skill point
// ---------------
// Transform unasigned skill into stat point
// Used on the level up popup
// ---------------
// Param : 
// villageId
// Array of statsToUpdate { statId, assignedPoints }
// level
// ---------------
export const AddSkillPoint = async (req, res) => {
    try {
      const { villageName, statId, level, assignedPoints } = req.body;
      const skill = await addSkillPoint({ villageName, statId, level, assignedPoints});
      res.status(201).json(skill);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  };

// ---------------
// Get Village farmers
// ---------------
// Get village farmers data
// Not used right now. Could be used for future features
// ---------------
// Param : 
// villageId
// ---------------
  export const GetVillageFarmers = async (req, res) => {
    try {
      const villageFarmers = await getAllVillageFarmers(req.villageId);
      res.json(villageFarmers);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  };

// TODO : Set stat = base stats
// ---------------
// Create village Farmer
// ---------------
// Add village farmer in base
// Used when the user by a new farmer, or get in a box opening later
// ---------------
// Param : 
// villageId
// farmerId
// ---------------
  export const CreateVillageFarmer = async (req, res) => {
    try {
      const { villageId, farmerId } = req.body;
      const villageFarmer = await createVillageFarmer(villageId,farmerId);
      res.json(villageFarmer);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  };

// TODO : effect on village 
// Take care of characteristics
// ---------------
// Set villager is active
// ---------------
// Set villageFarmer to active
// Used on village farmer management window
// ---------------
// Param : 
// villageFarmerId
// isActive
// ---------------
  export const SetVillagerIsActive = async (req, res) => {
    try {
      const { isActive } = req.body;
        const updatedFarmer = await setVillageFarmerIsActive(req.params.id, isActive);
        res.status(201).json(updatedFarmer);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

//TODO : update stats from farmer
// ---------------
// Set Village Farmer Level
// ---------------
// Update village farmer level
// Used on the farmer management window
// ---------------
// Param : 
// villageFarmerId
// nextUpgradeCost
// ---------------
export const SetVillageFarmerLevel = async (req, res) => {
  try {
    const { nextUpgradeCost, newResourcePerSecond } = req.body;
      const updatedFarmer = await setVillageFarmerLevel(req.params.id, nextUpgradeCost, newResourcePerSecond);
      res.status(201).json(updatedFarmer);
  } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ---------------
// CreateVillageItem
// ---------------
// Add a village item to the database
// Used by buying an item
// ---------------
// Param : 
// villageId
// itemId
// ---------------
export const CreateVillageItem = async (req, res) => {
  try {
    const { villageId, itemId } = req.body;
    const villageItem = await createVillageItem(villageId,itemId);
    res.json(villageItem);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ---------------
// Get Village Items
// ---------------
// Get village items
// no use for the moment
// ---------------
// Param : 
// villageId
// ---------------
export const GetVillageItems = async (req, res) => {
  try {
    const villageItems = await getAllVillageItems(req.villageId);
    res.json(villageItems);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ---------------
// Get Apogee Village
// ---------------
// Get apogee village from db
// not used for the moment
// ---------------
// Param : 
// villageId
// ---------------
export const GetApogeeVillage = async (req, res) => {
  try {
    const apogeeVillage = await getApogeeVillage(req.villageId);
    res.json(apogeeVillage);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ---------------
// CreateApogeeVillage
// ---------------
// Add an apogee village to the db
// Used by getting to level 50 and choosing the apogee.
// Note : maybe it should be also added when creating the village, and store the level.
// ---------------
// Param : 
// villageId
// apogeeId
// ---------------
export const CreateApogeeVillage = async (req, res) => {
  try {
    const { villageId, apogeeId } = req.body;
    const apogeeVillage = await createApogeeVillage(villageId,apogeeId);
    res.json(apogeeVillage);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ---------------
// GetVillageServants
// ---------------
// Get village servants from db
// not used for the moment
// ---------------
// Param : 
// villageId
// ---------------
export const GetVillageServants = async (req, res) => {
  try {
    const villageServants = await getAllVillageServants(req.villageId);
    res.json(villageServants);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ---------------
// CreateVillageServant
// ---------------
// Add a village servant to the db
// Used by buying servant to the shop
// ---------------
// Param : 
// villageId
// servantId
// ---------------
export const CreateVillageServant = async (req, res) => {
  try {
    const { villageId, servantId } = req.body;
    const villageServant = await createVillageServant(villageId,servantId);
    res.json(villageServant);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

