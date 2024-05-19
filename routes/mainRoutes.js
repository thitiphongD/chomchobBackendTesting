const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainControllers')
const userController = require('../controllers/userController')

router.get('/check', mainController.getHello)
router.get('/query', mainController.getHealthCheck)
router.post('/create', mainController.createHealthCheck)

// User
router.get('/users', userController.getAllUsers)
router.post('/createUser', userController.createUser)





module.exports = router