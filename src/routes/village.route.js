/* Village */

import express from "express";
import { GetVillage, UpdateLevel, UpdateResourcePerSecond, UpdateResource, UpdateRemainingPoints, CreateVillage} from "../controllers/village.controller.js";

const router = express.Router();

router.get("/:id", GetVillage);
router.post("/", CreateVillage);
router.put("/:id/level", UpdateLevel)
router.put("/:id/resourcePerSecond", UpdateResourcePerSecond)
router.put("/:id/resource", UpdateResource)
router.put("/:id/skillPoints", UpdateRemainingPoints)

export default router;