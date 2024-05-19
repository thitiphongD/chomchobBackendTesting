const { db } = require('./models');

async function syncModels() {
    try {
        await db.sequelize.sync({ force: true }); // This will drop and recreate all tables
        console.log('All tables have been (re)created!');
    } catch (error) {
        console.error('Error syncing models:', error);
    } finally {
        try {
            await db.sequelize.close();
            console.log('Connection closed successfully.');
        } catch (closeError) {
            console.error('Error while closing connection:', closeError);
        }
    }
}

syncModels();
