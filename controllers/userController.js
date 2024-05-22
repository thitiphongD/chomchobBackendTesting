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
            const newUser = await User.create({
                id,
                name,
                role
            });
            res.status(201).json({ data: newUser });
        } else {
            res.status(403).json({ error: 'Not Admin!' });
        }
    } catch (error) {
        console.error('Error create User:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.increaseUserBalance = async (req, res) => {
    try {
        const { adminId, userId, cryptoId, amount } = req.body;

        const checkAdmin = await isAdmin(adminId);
        if (!checkAdmin) {
            return res.status(403).json({ error: 'Not Admin!' });
        }

        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ error: 'User not found!' });
        }

        let userCrypto = await Crypto.findOne({
            where: { userId: userId, cryptoId: cryptoId }
        });

        if (userCrypto) {
            userCrypto.amount += parseFloat(amount);
            await userCrypto.save();
        } else {
            userCrypto = await Crypto.create({
                id: uuidv4(),
                userId: userId,
                cryptoId: cryptoId,
                amount: parseFloat(amount)
            });
        }
        res.status(200).json({ message: 'User balance increase success' });
    } catch (error) {
        console.error('Error increasing user balance:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.decreaseUserBalance = async (req, res) => {
    try {
        const { adminId, userId, cryptoId, amount } = req.body;

        const checkAdmin = await isAdmin(adminId);
        if (!checkAdmin) {
            return res.status(403).json({ error: 'Not Admin!' });
        }

        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ error: 'User not found!' });
        }

        const cryptoDetail = await CryptoDetails.findOne({ where: { id: cryptoId } });
        if (!cryptoDetail) {
            return res.status(404).json({ error: 'Crypto not found!' });
        }

        let userCrypto = await Crypto.findOne({
            where: { userId: userId, cryptoId: cryptoId }
        });

        if (userCrypto) {
            const newAmount = userCrypto.amount - parseFloat(amount);
            if (newAmount < 0) {
                return res.status(400).json({ error: 'Amount less than 0' });
            }
            userCrypto.amount = newAmount;
            await userCrypto.save();
        } else {
            return res.status(404).json({ error: 'Crypto entry not found for user!' });
        }
        res.status(200).json({ message: 'User balance decrease success' });
    } catch (error) {
        console.error('Error increasing user balance:', error);
        res.status(500).json({ error: 'Server error' });
    }
}