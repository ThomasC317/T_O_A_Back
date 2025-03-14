/* Skill */

import express from "express";
import { AddSkillPoint } from "../controllers/village.controller.js";

const router = express.Router();

router.post("/", AddSkillPoint);

export default router;