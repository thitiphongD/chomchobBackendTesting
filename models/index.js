const sequelize = require('../config/db');
const HealthCheck = require('./healthCheckModel');
const Users = require('./Users');
const CryptoDetails = require('./CryptoDetails');
const Crypto = require('./Crypto')

const db = {
    sequelize,
    HealthCheck,
    Users,
    CryptoDetails,
    Crypto
    // Add other models here
};

module.exports = db
