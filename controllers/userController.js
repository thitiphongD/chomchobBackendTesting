const { v4: uuidv4 } = require('uuid');
const User = require('../models/Users');
const Crypto = require('../models/Crypto');
const CryptoDetails = require('../models/CryptoDetails');


const isAdmin = async (userId) => {
    try {
        const user = await User.findOne({ where: { id: userId } });
        if (user) {
            return user.role === 'Admin';
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
};



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
        const { userId, name } = req.body;
        const checkAdmin = await isAdmin(userId)

        if (checkAdmin) {
            role = "User"
            balance = 0
            const newUser = await User.create({
                id,
                name,
                balance,
                role
            });
            res.status(201).json({ data: newUser });
        } else {
            res.status(400).json({ error: 'Not Admin!' });
        }
    } catch (error) {
        console.error('Error create User:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.increaseUserBalance = async (req, res) => {
    try {
        const { adminId, userId, amount } = req.body;
        const checkAdmin = await isAdmin(adminId)
        if (checkAdmin) {
            const user = await User.findOne({ where: { id: userId } });
            if (user) {
                user.balance += parseFloat(amount);
                await user.save();
                res.status(200).json({ message: 'Increase success' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }

        } else {
            res.status(400).json({ error: 'Not Admin!' });
        }
    } catch (error) {
        console.error('Error increase User Balance:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.decreaseUserBalance = async (req, res) => {
    try {
        const { adminId, userId, amount } = req.body;
        const checkAdmin = await isAdmin(adminId)
        if (checkAdmin) {
            const user = await User.findOne({ where: { id: userId } });
            if (user) {
                user.balance -= parseFloat(amount);
                await user.save();
                res.status(200).json({ message: 'Decrease success' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }

        } else {
            res.status(400).json({ error: 'Not Admin!' });
        }
    } catch (error) {
        console.error('Error increase User Balance:', error);
        res.status(500).json({ error: 'Server error' });
    }
}