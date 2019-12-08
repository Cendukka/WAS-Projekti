"use strict"

const express = require('express');
const router = express.Router();
const homeController = require("../controllers/homeController");


router.get("/", homeController.showHome);
router.get("/naytaIlmoitukset", homeController.showShow);


module.exports = router;