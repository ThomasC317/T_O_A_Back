/* Users */

/* Add user */
/* Remove user */
/* update user email */
/* update password */
/* Update username */
/* Update updateDate */
import express from "express";
import { getUsers, createUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);

export default router;
