const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Get
router.get('/login', authController.loginPage);
router.get('/register', authController.registerPage);

// Post
router.post('/register', authController.register);
router.post('/login', authController.login);


module.exports = router;
