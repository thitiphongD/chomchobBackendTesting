const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');
const HealthCheck = require('./healthCheckModel');

// Add other models here and set up associations if any

const db = {
    sequelize,
    HealthCheck,
    // Add other models here
};

module.exports = { db, Sequelize };
