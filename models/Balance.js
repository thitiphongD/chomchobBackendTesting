// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const Balance = sequelize.define('Balance', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'Users',
//             key: 'id'
//         }
//     },
//     cryptoId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'Crypto',
//             key: 'id'
//         }
//     },
//     amount: {
//         type: DataTypes.DECIMAL(20, 8),
//         allowNull: false
//     }
// }, {
//     tableName: 'balances',
//     timestamps: false
// });

// module.exports = Balance;