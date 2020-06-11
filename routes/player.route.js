
const express = require("express")
const router = express.Router();
const playerController = require('../controllers/players.controller')

// Get
router.get('/add', playerController.addPlayerPage);
router.get('/edit/:id', playerController.editPlayerPage);

// Post
router.post('/add', playerController.addPlayer);
router.post('/edit/:id', playerController.editPlayer);
//router.get('/delete/:id', playerController.deletePlayer);

module.exports = router;
