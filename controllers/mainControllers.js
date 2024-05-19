const HealthCheck = require('../models/healthCheckModel');

exports.getHello = (req, res) => {
    res.send('hi bro!')
}

exports.getHealthCheck = async (req, res) => {
    try {
        const healthChecks = await HealthCheck.findAll();
        res.status(200).json({ success: true, data: healthChecks });
    } catch (error) {
        console.error('Error fetching health check data:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};