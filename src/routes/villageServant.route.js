/* VillageServants */

import express from "express";
import { CreateVillageServant, GetVillageServants, } from "../controllers/village.controller.js";

const router = express.Router();

router.post("/", CreateVillageServant);
router.get("/", GetVillageServants);

export default router;