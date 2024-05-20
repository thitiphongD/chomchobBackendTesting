const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Crypto = sequelize.define('Crypto', {
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
    tableName: 'crypto',
    timestamps: false
});

module.exports = Crypto;
