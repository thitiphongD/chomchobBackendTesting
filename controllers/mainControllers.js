const { v4: uuidv4 } = require('uuid');
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

exports.createHealthCheck = async (req, res) => {
    try {
        const id = uuidv4();
        const { number, boolean } = req.body;
        const newHealthCheck = await HealthCheck.create({
            id,
            number,
            boolean
        });
        res.status(201).json({ success: true, data: newHealthCheck });
    } catch (error) {
        console.error('Error creating health check:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}