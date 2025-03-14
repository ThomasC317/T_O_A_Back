/* VillageFarmers */

import express from "express";
import { CreateVillageFarmer, SetVillageFarmerLevel, SetVillagerIsActive, GetVillageFarmers } from "../controllers/village.controller.js";

const router = express.Router();

router.post("/", CreateVillageFarmer);
router.get("/", GetVillageFarmers);
router.put("/:id/level", SetVillageFarmerLevel);
router.put("/:id/isActive", SetVillagerIsActive);

export default router;