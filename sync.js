const { sequelize } = require('./models');

async function syncModels() {
    try {
        await sequelize.sync({ force: false }); // if true This will drop and recreate all tables
        console.log('All tables have been (re)created!');
    } catch (error) {
        console.error('Error syncing models:', error);
    }
}

module.exports = syncModels;