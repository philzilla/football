const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Get
router.get('/register', authController.registerPage);

// Post
router.post('/register', authController.register);


module.exports = router;
