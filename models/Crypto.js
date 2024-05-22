const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Users = require('./Users');
const CryptoDetails = require('./CryptoDetails');

const Crypto = sequelize.define('Crypto', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    cryptoId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: CryptoDetails,
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.DECIMAL(20, 8),
        allowNull: false
    }
}, {
    tableName: 'crypto',
    timestamps: false
});

module.exports = Crypto;
