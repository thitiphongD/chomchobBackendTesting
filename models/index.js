const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');
const HealthCheck = require('./healthCheckModel');
const Users = require('./Users');

// Add other models here and set up associations if any

const db = {
    sequelize,
    HealthCheck,
    Users
    // Add other models here
};

module.exports = db
