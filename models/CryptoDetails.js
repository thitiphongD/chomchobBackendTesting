const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CryptoDetails = sequelize.define('CryptoDetails', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    symbol: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    value: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'crypto_details',
    timestamps: false
});

module.exports = CryptoDetails;
