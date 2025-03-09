/* Servants */

import express from "express";
import { getServants} from "../controllers/servant.controller.js";

const router = express.Router();

router.get("/", getServants);


export default router;
