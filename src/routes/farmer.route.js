/* Farmer */


import express from "express";
import { getFarmers } from "../controllers/farmer.controller.js";

const router = express.Router();

router.get("/", getFarmers);


export default router;
