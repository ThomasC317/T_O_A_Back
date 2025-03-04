/* Users */

/* Add user */
/* Remove user */
/* update user email */
/* update password */
/* Update username */
/* Update updateDate */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.get)