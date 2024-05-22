const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainControllers')
const userController = require('../controllers/userController')
const cryptoController = require('../controllers/cryptoController')

router.get('/check', mainController.getHello)
router.get('/query', mainController.getHealthCheck)
router.post('/create', mainController.createHealthCheck)

// User
router.get('/users', userController.getAllUsers)
router.post('/createUser', userController.createUser)
router.post('/increase', userController.increaseUserBalance)
router.post('/decrease', userController.decreaseUserBalance)

// Crypto
router.get('/cryptos', cryptoController.getAllCryptos)
router.post('/createCryptos', cryptoController.createCrypto)
router.post('/transfer', cryptoController.calTransfer)

module.exports = router