const { v4: uuidv4 } = require('uuid');
const User = require('../models/Users');
const Balance = require('../models/Balance');
const Crypto = require('../models/Crypto');


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ data: users });
    } catch (error) {
        console.error('Error get all users', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const id = uuidv4();
        const { name, role } = req.body;
        const newUser = await User.create({
            id,
            name,
            role
        });
        res.status(201).json({ data: newUser });
    } catch (error) {
        console.error('Error create User:', error);
        res.status(500).json({ error: 'Server error' });
    }
}