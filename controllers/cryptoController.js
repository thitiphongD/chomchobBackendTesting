const { v4: uuidv4 } = require('uuid');
const CryptoDetails = require('../models/CryptoDetails');
const User = require('../models/Users');
const Crypto = require('../models/Crypto');

exports.getAllCryptos = async (req, res) => {
    try {
        const cryptos = await CryptoDetails.findAll();
        res.status(200).json({ data: cryptos });
    } catch (error) {
        console.error('Error get all Crypto', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createCrypto = async (req, res) => {
    try {
        const { name, symbol, value } = req.body;
        if (!name || !symbol || value === undefined) {
            return res.status(400).json({ error: 'name, symbol, and value are required' });
        }

        if (typeof value !== 'number' || value < 0) {
            return res.status(400).json({ error: 'value must be a non-negative number' });
        }
        const existingCrypto = await CryptoDetails.findOne({ $or: [{ name }, { symbol }] });
        if (existingCrypto.name === name || existingCrypto.symbol === symbol) {
            return res.status(400).json({ error: 'Cryptowith the same name already exists' });
        }

        const id = uuidv4();

        const newCrypto = await CryptoDetails.create({
            id,
            name,
            symbol,
            value,
        });

        res.status(201).json({ data: newCrypto });
    } catch (error) {
        console.error('Error create Crypto:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.transfer = async (req, res) => {
    try {
        const { amount, senderId, receiverId, cryptoSendId, cryptoReceiveId } = req.body;

        if (amount <= 0) {
            return res.status(400).json({ error: 'Invalid transfer amount' });
        }

        const sender = await User.findOne({ where: { id: senderId } });
        if (!sender) {
            return res.status(404).json({ error: 'Sender not found' });
        }

        const receiver = await User.findOne({ where: { id: receiverId } });
        if (!receiver) {
            return res.status(404).json({ error: 'Receiver not found' });
        }

        const senderCrypto = await Crypto.findOne({
            where: { userId: senderId, cryptoId: cryptoSendId }
        });

        const receiverCrypto = await Crypto.findOne({
            where: { userId: receiverId, cryptoId: cryptoReceiveId }
        });

        if (!senderCrypto || !receiverCrypto || senderCrypto.amount < amount) {
            return res.status(400).json({ error: 'balance or crypto not found for sender' });
        }

        const senderCryptoDetails = await CryptoDetails.findOne({ where: { id: cryptoSendId } });
        const receiverCryptoDetails = await CryptoDetails.findOne({ where: { id: cryptoReceiveId } });

        if (!senderCryptoDetails || !receiverCryptoDetails) {
            return res.status(404).json({ error: 'Crypto details not found' });
        }

        const senderToReceiverRate = senderCryptoDetails.value / receiverCryptoDetails.value;
        const amountReceive = amount * senderToReceiverRate;

        senderCrypto.amount -= parseFloat(amount);
        receiverCrypto.amount += parseFloat(amountReceive);

        await senderCrypto.save();
        await receiverCrypto.save();

        res.status(200).json({ message: 'Transfer successful', amountReceive });
    } catch (error) {
        console.error('Error during transfer:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

