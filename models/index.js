const sequelize = require('../config/db');
const HealthCheck = require('./healthCheckModel');
const Users = require('./Users');
const Crypto = require('./Crypto');
const Balance = require('./Balance')

const db = {
    sequelize,
    HealthCheck,
    Users,
    Crypto,
    // Balance
    // Add other models here
};

module.exports = db
