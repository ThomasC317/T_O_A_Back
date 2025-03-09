/* Items */

import express from "express";
import { getItems } from "../controllers/item.controller.js";

const router = express.Router();

router.get("/", getItems);


export default router;
