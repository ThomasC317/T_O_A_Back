/* Users */

/* Add user */
/* Remove user */
/* update user email */
/* update password */
/* Update username */
/* Update updateDate */
import express from "express";
import { getUsers, createUser, removeUser,updateUser} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.delete("/:id", removeUser)
router.put("/:id", updateUser)


export default router;
