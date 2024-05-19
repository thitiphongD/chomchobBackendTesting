const HealthCheck = require('../models/healthCheckModel');

exports.getHello = (req, res) => {
    res.send('hi bro!')
}

exports.getHealthCheck = async (req, res) => {
    try {
        // Fetch health check data from the database
        const healthChecks = await HealthCheck.findAll(); // Assuming you're using Sequelize

        // If data is successfully retrieved, send it back to the client
        res.status(200).json({ success: true, data: healthChecks });
    } catch (error) {
        // If an error occurs while fetching data, send an error response
        console.error('Error fetching health check data:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};