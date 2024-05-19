const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db', 'db_user', 'db_password', {
    host: '127.0.0.1',
    port: 3304,
    dialect: 'mariadb',
    dialectOptions: {
        allowPublicKeyRetrieval: true,
    },
});

module.exports = sequelize
