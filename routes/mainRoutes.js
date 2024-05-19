const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainControllers')

router.get('/check', mainController.getHello)
router.get('/query', mainController.getHealthCheck)


module.exports = router