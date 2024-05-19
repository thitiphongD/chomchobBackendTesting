const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const HealthCheck = sequelize.define('HealthCheck', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    boolean: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'health_check', // Explicitly specify table name
    timestamps: false // Disable automatic timestamp columns
});

module.exports = HealthCheck;
