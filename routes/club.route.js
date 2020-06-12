
const express = require("express")
const router = express.Router();
const clubController = require('../controllers/clubs.controller')

// Get
router.get('/add', clubController.addClubPage);
//router.get('/edit/:id', clubController.editClubPage);

// Post
router.post('/add', clubController.addClub);
// router.post('/edit/:id', clubController.editClub);
// router.get('/delete/:id', clubController.deleteClub);

module.exports = router;
