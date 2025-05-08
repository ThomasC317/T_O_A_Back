/* Village */

import express from "express";
import { GetVillage, UpdateLevel, UpdateResourcePerTick, UpdateResource, CreateVillage} from "../controllers/village.controller.js";

const router = express.Router();

router.get("/:id", GetVillage);
router.post("/", CreateVillage);
router.put("/:id/level", UpdateLevel)
router.put("/:id/resourcePerTick", UpdateResourcePerTick)
router.put("/:id/resource", UpdateResource)
// router.put("/:id/skillPoints", UpdateRemainingPoints)

export default router;