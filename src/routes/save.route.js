/* Get all saves */
/* set is active */
/* get active save */
/* delete save */
/* Users */

import express from "express";
import { getSave, getSaves,createSave, updateLastDisconnectDateForSave,updateIsActiveForSave,removeSave} from "../controllers/save.controller.js";

const router = express.Router();

router.get("/", getSaves);
router.get("/:id", getSave);
router.post("/", createSave);
router.delete("/:id",removeSave)
router.put("/:id/disconnect", updateLastDisconnectDateForSave)
router.put("/:id/activate", updateIsActiveForSave)

export default router;
