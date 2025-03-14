/* Village Item */


/* Add Item (buy) */
/* Delete Item (sel) */
/* Set apogee Level */
import express from "express";
import { CreateVillageItem, GetVillageItems } from "../controllers/village.controller.js";

const router = express.Router();

router.post("/", CreateVillageItem);
router.get("/",GetVillageItems);

export default router;