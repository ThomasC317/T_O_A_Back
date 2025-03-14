import { getVillage,createVillage,updateResource,updateResourcePerSecond,updateRemainingPoints,updateLevel,updateVillageName,addSkillPoint,getAllVillageFarmers,createVillageFarmer,setVillageFarmerIsActive,setVillageFarmerLevel,createVillageItem,getAllVillageItems,getApogeeVillage,createApogeeVillage,getAllVillageServants,createVillageServant} from "../services/village.service.js";

export const GetVillage = async (req, res) => {
  try {
    const users = await getVillage(req.villageId);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};


export const CreateVillage = async (req, res) => {
  try {
    const { villageName, saveId } = req.body;
    const newUser = await createVillage({ villageName, saveId });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const UpdateResource = async (req, res) => {
  try {
    const { villageId, newResource } = req.body;
    const updatedUser = await updateResource({ villageId, newResource});
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const UpdateResourcePerSecond = async (req, res) => {
    try {
      const { villageId, newResourcePerSecond } = req.body;
      const updatedUser = await updateResourcePerSecond({villageId, newResourcePerSecond});
      res.status(201).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  };

export const UpdateRemainingPoints = async (req, res) => {
    try {
        const { villageId, pointsToAdd } = req.body;
        const updatedUser = await updateRemainingPoints({villageId, pointsToAdd});
        res.status(201).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

export const UpdateLevel = async (req, res) => {
    try {
        const updatedLevel = await updateLevel(req.params.id);
        res.status(201).json(updatedLevel);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// export const UpdateVillageName = async (req, res) => {
//     try {
//         const updatedVillageName = await updateVillageName(req.params.id,req.body);
//         res.status(201).json(updatedVillageName);
//     } catch (error) {
//         res.status(500).json({ message: "Erreur serveur", error: error.message });
//     }
// };


export const AddSkillPoint = async (req, res) => {
    try {
      const { villageName, statId, level, assignedPoints } = req.body;
      const skill = await addSkillPoint({ villageName, statId, level, assignedPoints});
      res.status(201).json(skill);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  };

  export const GetVillageFarmers = async (req, res) => {
    try {
      const villageFarmers = await getAllVillageFarmers(req.villageId);
      res.json(villageFarmers);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  };


  export const CreateVillageFarmer = async (req, res) => {
    try {
      const { villageId, farmerId } = req.body;
      const villageFarmer = await createVillageFarmer(villageId,farmerId);
      res.json(villageFarmer);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  };

  export const SetVillagerIsActive = async (req, res) => {
    try {
      const { isActive } = req.body;
        const updatedFarmer = await setVillageFarmerIsActive(req.params.id, isActive);
        res.status(201).json(updatedFarmer);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

export const SetVillageFarmerLevel = async (req, res) => {
  try {
    const { nextUpgradeCost, newResourcePerSecond } = req.body;
      const updatedFarmer = await setVillageFarmerLevel(req.params.id, nextUpgradeCost, newResourcePerSecond);
      res.status(201).json(updatedFarmer);
  } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};


export const CreateVillageItem = async (req, res) => {
  try {
    const { villageId, itemId } = req.body;
    const villageItem = await createVillageItem(villageId,itemId);
    res.json(villageItem);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const GetVillageItems = async (req, res) => {
  try {
    const villageItems = await getAllVillageItems(req.villageId);
    res.json(villageItems);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const GetApogeeVillage = async (req, res) => {
  try {
    const villageItems = await getApogeeVillage(req.villageId);
    res.json(villageItems);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const CreateApogeeVillage = async (req, res) => {
  try {
    const { villageId, apogeeId } = req.body;
    const apogeeVillage = await createApogeeVillage(villageId,apogeeId);
    res.json(apogeeVillage);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const GetVillageServants = async (req, res) => {
  try {
    const villageFarmers = await getAllVillageServants(req.villageId);
    res.json(villageFarmers);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const CreateVillageServant = async (req, res) => {
  try {
    const { villageId, servantId } = req.body;
    const apogeeVillage = await createVillageServant(villageId,servantId);
    res.json(apogeeVillage);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

