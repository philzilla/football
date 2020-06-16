const express = require("express");
const router = express.Router();
const homeController = require('../controllers/admin.controller');

router.get('/', homeController.getAdminPage);

module.exports = router;
